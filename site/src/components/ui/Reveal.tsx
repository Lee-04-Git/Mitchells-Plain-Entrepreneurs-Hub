import type { ReactNode } from 'react'
import { m, type TargetAndTransition, type Variants } from 'framer-motion'
import { easeOutExpo, inView } from '../../lib/motion'

export type From = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade'

/** Starting offset for each entrance direction. Transform + opacity only. */
const start = (from: From, d: number): TargetAndTransition => {
  switch (from) {
    case 'down':
      return { opacity: 0, y: -d }
    case 'left':
      return { opacity: 0, x: -d }
    case 'right':
      return { opacity: 0, x: d }
    case 'scale':
      return { opacity: 0, scale: 0.94, y: d * 0.5 }
    case 'fade':
      return { opacity: 0 }
    default:
      return { opacity: 0, y: d }
  }
}

/** Fades + slides its children in the first time they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  from = 'up',
  y,
  distance = y ?? 32,
  duration = 1,
  className,
}: {
  children: ReactNode
  delay?: number
  from?: From
  /** @deprecated use `distance` */
  y?: number
  distance?: number
  duration?: number
  className?: string
}) {
  return (
    <m.div
      initial={start(from, distance)}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={inView}
      transition={{ duration, ease: easeOutExpo, delay }}
      className={className}
    >
      {children}
    </m.div>
  )
}

/** Cards and list rows: rise, settle from a hair under full size. */
const item: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.95, ease: easeOutExpo } },
}

/** Container that cascades its <RevealItem> children into view. */
export function RevealGroup({
  children,
  each = 0.07,
  delay = 0,
  className,
  as = 'div',
}: {
  children: ReactNode
  each?: number
  delay?: number
  className?: string
  as?: 'div' | 'ul' | 'ol'
}) {
  const Comp = as === 'ul' ? m.ul : as === 'ol' ? m.ol : m.div
  return (
    <Comp
      variants={{ hidden: {}, show: { transition: { staggerChildren: each, delayChildren: delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={className}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) {
  const Comp = as === 'li' ? m.li : m.div
  return (
    <Comp variants={item} className={className}>
      {children}
    </Comp>
  )
}
