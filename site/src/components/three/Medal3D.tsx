import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import clsx from 'clsx'

const loadScene = () => import('./MedalScene')
const MedalScene = lazy(loadScene)

class WebGLBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

const hasWebGL = () => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Still render of the 3D medal in its resting pose (scripts/medal-poster.mjs).
 * Sized like the 3D camera frames the coin, so the swap is seamless.
 */
function Poster({ hidden }: { hidden?: boolean }) {
  return (
    <img
      src="/images/medal-poster.webp"
      alt=""
      width={962}
      height={962}
      decoding="async"
      draggable={false}
      className={clsx(
        'pointer-events-none absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2 select-none transition-opacity duration-700',
        hidden ? 'opacity-0' : 'opacity-100',
      )}
    />
  )
}

/**
 * The medal is always on screen: the poster shows instantly, while the
 * three.js chunk loads in the background once the page is idle (or as
 * the section approaches) and crossfades in at the same pose.
 * The live scene only renders while it's on screen.
 */
export function Medal3D({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = !!useReducedMotion()
  const [mount, setMount] = useState(false)
  const [visible, setVisible] = useState(false)
  const [ready, setReady] = useState(false)
  const [supported] = useState(() => typeof window === 'undefined' || hasWebGL())
  const onReady = useCallback(() => setReady(true), [])

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting)
        if (e.isIntersecting) setMount(true)
      },
      { rootMargin: '600px 0px' },
    )
    if (ref.current) io.observe(ref.current)

    // Warm up after the page settles, so it's ready before anyone scrolls there.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1))
    const t = window.setTimeout(() => idle(() => setMount(true), { timeout: 2500 }), 1800)
    return () => {
      io.disconnect()
      window.clearTimeout(t)
    }
  }, [])

  return (
    <div ref={ref} className={clsx('relative overflow-hidden', className)} role="img" aria-label="3D commemorative medal for the Mitchells Plain 50th Golden Jubilee — drag to spin">
      <Poster hidden={supported && ready} />
      {supported && mount && (
        <WebGLBoundary fallback={null}>
          <Suspense fallback={null}>
            <div className={clsx('absolute inset-0 transition-opacity duration-700', ready ? 'opacity-100' : 'opacity-0')}>
              <MedalScene active={visible} reducedMotion={reduce} onReady={onReady} />
            </div>
          </Suspense>
        </WebGLBoundary>
      )}
    </div>
  )
}
