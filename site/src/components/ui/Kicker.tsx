import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import clsx from 'clsx'
import { easeOutExpo, inView } from '../../lib/motion'

/** Mono section label: a short rule draws in, then the words slide after it. */
export function Kicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <m.p initial="hidden" whileInView="show" viewport={inView} className={clsx('kicker flex items-center gap-3', className)}>
      <m.span
        aria-hidden
        className="h-[1.5px] w-8 shrink-0 origin-left bg-current"
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.7, ease: easeOutExpo } } }}
      />
      <m.span
        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOutExpo, delay: 0.25 } } }}
      >
        {children}
      </m.span>
    </m.p>
  )
}
