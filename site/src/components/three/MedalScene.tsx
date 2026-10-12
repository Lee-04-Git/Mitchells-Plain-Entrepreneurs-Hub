import { useEffect, useMemo, useRef, useState, type RefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Lightformer, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

const R = 1.6 // coin radius
const T = 0.2 // coin thickness

/* ---------- Face artwork, drawn once into canvases ---------- */

type Face = 'front' | 'back'

function circularText(ctx: CanvasRenderingContext2D, text: string, cx: number, cy: number, radius: number, start: number) {
  const chars = [...text]
  const step = (Math.PI * 2) / chars.length
  chars.forEach((ch, i) => {
    const a = start + i * step
    ctx.save()
    ctx.translate(cx + Math.cos(a) * radius, cy + Math.sin(a) * radius)
    ctx.rotate(a + Math.PI / 2)
    ctx.fillText(ch, 0, 0)
    ctx.restore()
  })
}

/** Draws a face twice: a colour map (gold tones) and a bump map (relief). */
function drawFace(face: Face, mode: 'color' | 'bump') {
  const S = 1024
  const c = document.createElement('canvas')
  c.width = c.height = S
  const ctx = c.getContext('2d')!
  const raised = mode === 'color' ? '#f6d27a' : '#ffffff'
  const field = mode === 'color' ? '#c99232' : '#5a5a5a'
  const mid = mode === 'color' ? '#e2b04c' : '#9a9a9a'

  ctx.fillStyle = field
  ctx.fillRect(0, 0, S, S)
  if (mode === 'color') {
    const g = ctx.createRadialGradient(S * 0.4, S * 0.35, 10, S / 2, S / 2, S * 0.6)
    g.addColorStop(0, 'rgba(255,236,180,0.35)')
    g.addColorStop(1, 'rgba(90,60,10,0.25)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, S, S)
  }

  const cx = S / 2
  ctx.strokeStyle = mid
  ctx.lineWidth = 6
  ctx.beginPath()
  ctx.arc(cx, cx, S * 0.4, 0, Math.PI * 2)
  ctx.stroke()
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(cx, cx, S * 0.385, 0, Math.PI * 2)
  ctx.stroke()

  ctx.fillStyle = raised
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = '600 44px "IBM Plex Mono", monospace'
  const ring = face === 'front' ? 'MITCHELLS PLAIN ✦ GOLDEN JUBILEE ✦ 2026 ✦ ' : 'MITCHELLS PLAIN ENTREPRENEURS HUB ✦ CAPE FLATS ✦ '
  circularText(ctx, ring, cx, cx, S * 0.448, -Math.PI / 2)

  if (face === 'front') {
    ctx.font = '900 430px "Big Shoulders", "Arial Narrow", sans-serif'
    ctx.fillText('50', cx, cx - 30)
    ctx.font = '600 64px "IBM Plex Mono", monospace'
    ctx.fillText('Y E A R S', cx, cx + 220)
  } else {
    ctx.font = '900 260px "Big Shoulders", "Arial Narrow", sans-serif'
    ctx.fillText('MPEH', cx, cx - 20)
    ctx.font = 'italic 500 58px "Newsreader", Georgia, serif'
    ctx.fillText('strong businesses,', cx, cx + 150)
    ctx.fillText('strong communities', cx, cx + 215)
  }

  const tex = new THREE.CanvasTexture(c)
  tex.anisotropy = 8
  if (mode === 'color') tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function drawReeding() {
  const c = document.createElement('canvas')
  c.width = 2048
  c.height = 8
  const ctx = c.getContext('2d')!
  for (let i = 0; i < 2048; i += 8) {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(i, 0, 4, 8)
    ctx.fillStyle = '#404040'
    ctx.fillRect(i + 4, 0, 4, 8)
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = THREE.RepeatWrapping
  return tex
}

function useFaceTextures() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    let alive = true
    Promise.all([
      document.fonts.load('900 100px "Big Shoulders"'),
      document.fonts.load('600 40px "IBM Plex Mono"'),
      document.fonts.load('italic 500 40px "Newsreader"'),
    ])
      .catch(() => undefined)
      .then(() => alive && setReady(true))
    return () => {
      alive = false
    }
  }, [])
  return useMemo(() => {
    if (!ready) return null
    return {
      frontColor: drawFace('front', 'color'),
      frontBump: drawFace('front', 'bump'),
      backColor: drawFace('back', 'color'),
      backBump: drawFace('back', 'bump'),
      reeding: drawReeding(),
    }
  }, [ready])
}

/* ---------- The medal ---------- */

// Resting pose shared with the still poster image (public/images/medal-poster.webp),
// so the live medal can crossfade in over it without a jump.
export const POSE_ANGLE = -0.3

function Medal({ animate, active, drag, onReady }: { animate: boolean; active: boolean; drag: RefObject<{ down: boolean; dx: number }>; onReady?: () => void }) {
  const tex = useFaceTextures()
  const group = useRef<THREE.Group>(null!)
  // `turn` runs 0 → 1 once: a single full spin when the medal is first seen.
  const spin = useRef({ angle: POSE_ANGLE, vel: 0, t: 0, seen: 0, turn: animate ? 0 : 1 })

  const reported = useRef(false)

  const goldBase = { metalness: 1, roughness: 0.24, clearcoat: 0.5, clearcoatRoughness: 0.15, envMapIntensity: 1.6 }

  useFrame((state, raw) => {
    if (!group.current) return // textures (and so the mesh) not ready yet
    if (!reported.current) {
      reported.current = true
      requestAnimationFrame(() => onReady?.()) // after the first frame is on screen
    }
    const dt = Math.min(raw, 0.1)
    const s = spin.current
    s.t += dt
    if (active) s.seen += dt
    // Wait for the crossfade from the poster to finish, then spin once.
    if (s.turn < 1 && s.seen > 0.7) s.turn = Math.min(1, s.turn + dt / 1.8)
    const d = drag.current
    const turnOffset = -Math.pow(1 - s.turn, 4) * Math.PI * 2 // −2π → 0, ease-out

    if (d.down) {
      if (s.turn < 1) {
        s.angle += turnOffset // hand the spin over to the drag without a jump
        s.turn = 1
      }
      s.vel = d.dx * 0.012 / Math.max(dt, 1 / 120)
      s.angle += d.dx * 0.012
      d.dx = 0
    } else {
      // Inertia, then settle on whichever face is nearest.
      s.vel *= Math.pow(0.04, dt)
      s.angle += s.vel * dt
      if (Math.abs(s.vel) < 0.6) {
        const target = Math.round(s.angle / Math.PI) * Math.PI + (animate ? POSE_ANGLE * Math.cos(s.t * 0.5) : POSE_ANGLE)
        s.angle = THREE.MathUtils.damp(s.angle, target, 2.2, dt)
      }
    }

    group.current.rotation.y = s.angle + turnOffset
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -state.pointer.y * 0.18 + (animate ? Math.sin(s.t * 0.8) * 0.04 : 0), 3, dt)
    group.current.position.y = animate ? Math.sin(s.t * 0.9) * 0.05 : 0
  })

  if (!tex) return null
  return (
    <group ref={group}>
      {/* Reeded edge */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[R, R, T, 128, 1, true]} />
        <meshPhysicalMaterial color="#e3b04a" bumpMap={tex.reeding} bumpScale={1.2} {...goldBase} roughness={0.3} />
      </mesh>
      {/* Faces */}
      <mesh position={[0, 0, T / 2]}>
        <circleGeometry args={[R, 128]} />
        <meshPhysicalMaterial map={tex.frontColor} bumpMap={tex.frontBump} bumpScale={2.4} {...goldBase} />
      </mesh>
      <mesh position={[0, 0, -T / 2]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[R, 128]} />
        <meshPhysicalMaterial map={tex.backColor} bumpMap={tex.backBump} bumpScale={2.4} {...goldBase} />
      </mesh>
      {/* Raised rims */}
      {[T / 2, -T / 2].map((z) => (
        <mesh key={z} position={[0, 0, z]}>
          <torusGeometry args={[R - 0.05, 0.055, 16, 160]} />
          <meshPhysicalMaterial color="#f0c461" {...goldBase} roughness={0.18} />
        </mesh>
      ))}
    </group>
  )
}

function Studio() {
  // Procedural studio lighting baked once into the env map — no HDR download.
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#1c2b27']} />
      <Lightformer form="rect" intensity={3.4} color="#fff3d6" position={[0, 5, -1]} rotation-x={Math.PI / 2} scale={[12, 1.6, 1]} />
      <Lightformer form="rect" intensity={2.4} color="#ffd98c" position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[10, 2.4, 1]} />
      <Lightformer form="rect" intensity={2.8} color="#ffffff" position={[6, 0, 2]} rotation-y={-Math.PI / 2} scale={[10, 1, 1]} />
      <Lightformer form="rect" intensity={3.2} color="#f6cf75" position={[0, -1.5, 9]} scale={[12, 6, 1]} />
      <Lightformer form="ring" intensity={4} color="#ffe6ad" position={[3, 3, 6]} scale={2} />
    </Environment>
  )
}

export default function MedalScene({ active, reducedMotion, onReady }: { active: boolean; reducedMotion: boolean; onReady?: () => void }) {
  const drag = useRef({ down: false, dx: 0, lastX: 0 })
  const mobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
  const maxDpr = typeof window === 'undefined' ? 1 : Math.min(window.devicePixelRatio, mobile ? 1.5 : 2)
  // Adaptive resolution: start a notch below the device ratio, drop to 1x
  // if frames start missing, climb back when there's headroom.
  const [dpr, setDpr] = useState(Math.min(maxDpr, 1.5))

  return (
    <div
      className="size-full cursor-grab touch-pan-y active:cursor-grabbing"
      onPointerDown={(e) => {
        drag.current.down = true
        drag.current.lastX = e.clientX
        ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!drag.current.down) return
        drag.current.dx += e.clientX - drag.current.lastX
        drag.current.lastX = e.clientX
      }}
      onPointerUp={() => (drag.current.down = false)}
      onPointerCancel={() => (drag.current.down = false)}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 6.2], fov: 32 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        // 'demand' while off-screen still renders one frame on mount, so shaders
        // compile ~300px before the medal scrolls in instead of as it appears.
        frameloop={active ? 'always' : 'demand'}
      >
        <PerformanceMonitor onIncline={() => setDpr(maxDpr)} onDecline={() => setDpr(1)} onFallback={() => setDpr(1)} flipflops={3} />
        <ambientLight intensity={0.45} />
        <directionalLight position={[3, 4, 5]} intensity={0.9} color="#fff4dc" />
        <Medal animate={!reducedMotion} active={active} drag={drag} onReady={onReady} />
        <Studio />
      </Canvas>
    </div>
  )
}
