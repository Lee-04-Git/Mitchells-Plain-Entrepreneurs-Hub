import type { ReactNode } from 'react'
import clsx from 'clsx'
import { Lines } from './Lines'
import { Reveal } from './Reveal'
import { Kicker } from './Kicker'

export function Section({ children, className, id, tone = 'paper' }: { children: ReactNode; className?: string; id?: string; tone?: 'paper' | 'paper-2' | 'ink' | 'marigold' }) {
  return (
    <section
      id={id}
      className={clsx(
        'relative py-20 md:py-28',
        tone === 'paper-2' && 'bg-paper-2',
        tone === 'ink' && 'bg-ink text-paper',
        tone === 'marigold' && 'bg-marigold text-ink',
        className,
      )}
    >
      <div className="wrap relative">{children}</div>
    </section>
  )
}

/** Mono kicker + poster title (line reveal) + optional serif lede and action. */
export function SectionHead({
  kicker,
  title,
  lede,
  action,
  tone = 'light',
  className,
}: {
  kicker?: string
  title: ReactNode[]
  lede?: ReactNode
  action?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <div className={clsx('mb-12 grid gap-8 md:mb-16 lg:grid-cols-12 lg:items-end', className)}>
      <div className="lg:col-span-8">
        {kicker && <Kicker className={clsx('mb-5', tone === 'dark' ? 'text-marigold' : 'text-teal')}>{kicker}</Kicker>}
        <Lines lines={title} className="poster poster-md" />
      </div>
      {(lede || action) && (
        <Reveal delay={0.15} className="lg:col-span-4">
          {lede && <p className={clsx('serif text-[1.15rem] leading-relaxed', tone === 'dark' ? 'text-on-teal-muted' : 'text-ink-soft')}>{lede}</p>}
          {action && <div className={lede ? 'mt-6' : 'lg:flex lg:justify-end'}>{action}</div>}
        </Reveal>
      )}
    </div>
  )
}
