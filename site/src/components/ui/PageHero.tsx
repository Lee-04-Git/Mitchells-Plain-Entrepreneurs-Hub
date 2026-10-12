import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { Lines } from './Lines'
import { easeOutExpo } from '../../lib/motion'

/**
 * Poster-style header for inner pages: mono dateline, oversized title,
 * serif lede, and an aside slot for a sticker, photo or actions.
 */
export function PageHero({
  section,
  title,
  lede,
  crumbs = [],
  aside,
  children,
}: {
  section: string
  title: ReactNode[]
  lede?: ReactNode
  crumbs?: { label: string; to?: string }[]
  aside?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="paper-noise relative overflow-hidden border-b-[1.5px] border-ink pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-ink pb-3"
        >
          <nav aria-label="Breadcrumb" className="kicker flex flex-wrap items-center gap-2 text-ink-soft">
            <Link to="/" className="link-ink hover:text-ink">
              MPEH
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-2">
                <span aria-hidden>/</span>
                {c.to ? (
                  <Link to={c.to} className="link-ink hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <span className="kicker text-ink-soft">{section}</span>
        </m.div>

        <div className="mt-10 grid items-end gap-10 lg:mt-14 lg:grid-cols-12">
          <div className={aside ? 'lg:col-span-8' : 'lg:col-span-12'}>
            <Lines as="h1" on="mount" lines={title} className="poster poster-lg" delay={0.1} />
            {lede && (
              <m.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.45, ease: easeOutExpo }}
                className="lede mt-8 max-w-[40rem] text-ink-soft"
              >
                {lede}
              </m.p>
            )}
            {children && (
              <m.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: easeOutExpo }}
                className="mt-9 flex flex-wrap gap-4"
              >
                {children}
              </m.div>
            )}
          </div>
          {aside && <div className="flex justify-start lg:col-span-4 lg:justify-end">{aside}</div>}
        </div>
      </div>
    </section>
  )
}
