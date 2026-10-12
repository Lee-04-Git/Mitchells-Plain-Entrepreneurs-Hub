import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import { easeOutExpo, inView } from '../../lib/motion'

/**
 * Headline whose lines rise out of a mask one after another. Each line
 * can hold any inline content (marks, italics), unlike word splitting.
 */
export function Lines({
  lines,
  as: Tag = 'h2',
  className,
  lineClassName,
  delay = 0,
  each = 0.09,
  on = 'view',
}: {
  lines: ReactNode[]
  as?: 'h1' | 'h2' | 'h3' | 'p'
  className?: string
  lineClassName?: string
  delay?: number
  each?: number
  on?: 'mount' | 'view'
}) {
  const trigger =
    on === 'mount'
      ? { initial: 'hidden', animate: 'show' }
      : { initial: 'hidden', whileInView: 'show', viewport: inView }

  return (
    <Tag className={className}>
      <m.span className="block" {...trigger} transition={{ staggerChildren: each, delayChildren: delay }}>
        {lines.map((line, i) => (
          <span key={i} className="-mr-[0.08em] -mb-[0.16em] block overflow-hidden pr-[0.08em] pb-[0.16em]">
            <m.span
              className={`block origin-bottom-left ${lineClassName ?? ''}`}
              variants={{
                hidden: { y: '105%', rotate: 2.5 },
                show: { y: '0%', rotate: 0, transition: { duration: 1, ease: easeOutExpo } },
              }}
            >
              {line}
            </m.span>
          </span>
        ))}
      </m.span>
    </Tag>
  )
}
