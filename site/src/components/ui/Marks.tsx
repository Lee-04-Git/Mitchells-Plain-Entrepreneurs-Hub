import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import clsx from 'clsx'

/*
  Hand-drawn marks in clay ink — an underline and a loose circle —
  that draw themselves when they scroll into view. Paths are
  deliberately wobbly so they read as a pen, not a vector tool.
*/

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { pathLength: { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const, delay }, opacity: { duration: 0.01, delay } },
})

const paths = {
  underline: { viewBox: '0 0 300 24', d: 'M3 15 C 60 7, 120 5, 178 9 S 262 15, 297 7 M 40 20 C 110 15, 190 14, 262 17' },
  circle: {
    viewBox: '0 0 300 120',
    d: 'M152 9 C 72 6, 10 26, 9 60 C 8 98, 92 113, 168 110 C 246 107, 293 84, 291 54 C 289 22, 214 6, 132 12 C 108 14, 86 19, 70 25',
  },
  strike: { viewBox: '0 0 300 24', d: 'M4 14 C 80 9, 170 15, 296 10' },
} as const

/** Wraps inline text and draws a mark over/under it. */
export function Marked({
  children,
  kind = 'underline',
  delay = 0.3,
  className,
  color = 'text-clay',
}: {
  children: ReactNode
  kind?: keyof typeof paths
  delay?: number
  className?: string
  color?: string
}) {
  const p = paths[kind]
  return (
    <span className={clsx('relative inline-block', kind === 'circle' && 'whitespace-nowrap', className)}>
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden
        viewBox={p.viewBox}
        preserveAspectRatio="none"
        className={clsx(
          'pointer-events-none absolute',
          color,
          kind === 'underline' && '-bottom-[0.13em] left-[-2%] h-[0.2em] w-[104%]',
          kind === 'circle' && '-inset-x-[9%] -inset-y-[22%] h-[144%] w-[118%]',
          kind === 'strike' && 'top-1/2 left-0 h-[0.3em] w-full -translate-y-1/2',
        )}
      >
        <m.path d={p.d} fill="none" stroke="currentColor" strokeWidth={kind === 'circle' ? 3.2 : 4.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" {...draw(delay)} />
      </svg>
    </span>
  )
}
