import { useRef, type ReactNode, type PointerEvent } from 'react'
import { m, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import clsx from 'clsx'

const spring = { stiffness: 170, damping: 20, mass: 0.6 }

/**
 * Card that leans toward the cursor in 3D with a soft specular glare.
 * Mouse only; touch and reduced-motion users get a flat card.
 */
export function TiltCard({
  children,
  className,
  max = 6,
  glare = true,
  lift = 20,
}: {
  children: ReactNode
  className?: string
  max?: number
  glare?: boolean
  lift?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const z = useSpring(0, spring)
  const glareOpacity = useSpring(0, spring)
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glareBg = useMotionTemplate`radial-gradient(480px circle at ${gx} ${gy}, rgb(255 240 200 / 0.20), transparent 55%)`

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onEnter = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    z.set(lift)
    glareOpacity.set(1)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    z.set(0)
    glareOpacity.set(0)
  }

  return (
    <div className="h-full [perspective:1200px]">
      <m.div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, z, transformStyle: 'preserve-3d' }}
        className={clsx('relative h-full', className)}
      >
        {children}
        {glare && (
          <m.span aria-hidden className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]" style={{ background: glareBg, opacity: glareOpacity }} />
        )}
      </m.div>
    </div>
  )
}
