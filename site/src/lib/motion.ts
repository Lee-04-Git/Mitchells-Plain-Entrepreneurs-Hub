import type { Transition, Variants } from 'framer-motion'

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeInOut = [0.65, 0, 0.35, 1] as const

export const springSoft: Transition = { type: 'spring', stiffness: 220, damping: 26, mass: 0.8 }
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 34 }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
}

export const stagger = (each = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})

/** Shared whileInView viewport: play once, when the element is ~12% into the screen. */
export const inView = { once: true, margin: '0px 0px -12% 0px' } as const
