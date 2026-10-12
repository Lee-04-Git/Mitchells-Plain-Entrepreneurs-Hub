import { useRef, type ReactNode } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import clsx from 'clsx'
import { easeOutExpo, inView } from '../../lib/motion'

const wipe = [0.77, 0, 0.18, 1] as const

/**
 * Photo entrance: the frame wipes open from the bottom while the image
 * inside settles from a slight zoom. With `parallax` the image keeps
 * drifting gently against the scroll afterwards.
 */
export function RevealMedia({ children, className, delay = 0, parallax = 0 }: { children: ReactNode; className?: string; delay?: number; parallax?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={clsx('overflow-hidden', className)}>{children}</div>

  return (
    <m.div
      className={clsx('overflow-hidden', className)}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={inView}
      transition={{ duration: 1.1, ease: wipe, delay }}
    >
      <m.div
        className="size-full"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: parallax ? 1.1 : 1 }}
        viewport={inView}
        transition={{ duration: 1.6, ease: easeOutExpo, delay }}
      >
        {parallax ? <Drift amount={parallax}>{children}</Drift> : children}
      </m.div>
    </m.div>
  )
}

function Drift({ children, amount }: { children: ReactNode; amount: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return (
    <m.div ref={ref} style={{ y }} className="size-full will-change-transform">
      {children}
    </m.div>
  )
}
