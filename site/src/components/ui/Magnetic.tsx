import { useRef, type PointerEvent, type ReactNode } from 'react'
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/** Pulls its child gently toward the cursor; springs back on leave. Mouse only. */
export function Magnetic({ children, strength = 0.22, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.5 })
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18, mass: 0.5 })

  const move = (e: PointerEvent) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const leave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.span ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ x, y }} className={`inline-block ${className ?? ''}`}>
      {children}
    </m.span>
  )
}
