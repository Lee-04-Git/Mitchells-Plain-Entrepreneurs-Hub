import type { CSSProperties, ReactNode } from 'react'
import { m } from 'framer-motion'
import clsx from 'clsx'
import { Img } from './Img'
import { RevealMedia } from './RevealMedia'

/* Small print-world materials: tape, polaroids, stamps, stickers. */

export function Tape({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      style={style}
      className={clsx(
        'pointer-events-none absolute z-20 h-7 w-24 bg-marigold-soft/80 shadow-[0_1px_2px_rgb(21_32_30/0.18)] [clip-path:polygon(2%_8%,98%_0,100%_92%,0_100%)]',
        className,
      )}
    />
  )
}

export function Polaroid({
  src,
  alt,
  caption,
  className,
  imgClassName,
  tape = true,
  width,
  height,
  eager,
}: {
  src: string
  alt: string
  caption?: string
  className?: string
  imgClassName?: string
  tape?: boolean
  width?: number
  height?: number
  eager?: boolean
}) {
  return (
    <figure className={clsx('relative bg-card p-2.5 pb-3 shadow-[var(--shadow-photo)] ring-1 ring-ink/10', className)}>
      {tape && <Tape className="-top-3.5 left-1/2 -translate-x-1/2 -rotate-3" />}
      <RevealMedia className="bg-paper-2" delay={0.1}>
        <Img src={src} alt={alt} width={width} height={height} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} className={clsx('size-full object-cover select-none', imgClassName)} />
      </RevealMedia>
      {caption && <figcaption className="serif mt-2.5 px-1 text-[0.95rem] leading-snug text-ink-soft italic">{caption}</figcaption>}
    </figure>
  )
}

/** Rubber stamp: thick-bordered mono text, slightly rotated, inked in clay. */
export function Stamp({ children, className, rotate = -8, tone = 'clay' }: { children: ReactNode; className?: string; rotate?: number; tone?: 'clay' | 'ink' | 'marigold' }) {
  return (
    <m.span
      initial={{ opacity: 0, scale: 1.6, rotate: rotate - 12 }}
      whileInView={{ opacity: 0.92, scale: 1, rotate }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 380, damping: 20, delay: 0.25 }}
      className={clsx(
        'mono inline-flex items-center gap-1.5 rounded-[4px] border-[2.5px] px-2.5 py-1 text-[0.72rem] leading-none font-semibold tracking-[0.12em] uppercase',
        tone === 'clay' && 'border-clay text-clay',
        tone === 'ink' && 'border-ink text-ink',
        tone === 'marigold' && 'border-marigold text-marigold',
        className,
      )}
    >
      {children}
    </m.span>
  )
}

/** Round price/fact sticker. Content must be a real fact from the site data. */
export function Sticker({ top, big, bottom, className, tone = 'marigold' }: { top?: string; big: string; bottom?: string; className?: string; tone?: 'marigold' | 'clay' | 'ink' }) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0.4, rotate: -40 }}
      animate={{ opacity: 1, scale: 1, rotate: -10 }}
      transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.7 }}
      whileHover={{ rotate: 4, scale: 1.05 }}
      className={clsx(
        'grid size-36 place-items-center rounded-full border-[1.5px] border-ink text-center shadow-[var(--shadow-hard)] sm:size-44',
        tone === 'marigold' && 'bg-marigold text-ink',
        tone === 'clay' && 'bg-clay text-paper',
        tone === 'ink' && 'bg-teal-deep text-marigold',
        className,
      )}
    >
      <span className="px-3">
        {top && <span className="kicker block">{top}</span>}
        <span className="poster mt-1 block text-[2.6rem] sm:text-[3.2rem]">{big}</span>
        {bottom && <span className="kicker mt-1 block">{bottom}</span>}
      </span>
    </m.div>
  )
}
