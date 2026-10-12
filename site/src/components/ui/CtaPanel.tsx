import type { ReactNode } from 'react'
import { m } from 'framer-motion'
import { Lines } from './Lines'
import { easeOutExpo } from '../../lib/motion'

/**
 * Closing call-to-action set like a market poster: marigold sheet,
 * ink border, hard shadow, big condensed type.
 */
export function CtaPanel({ kicker, title, text, children, footer }: { kicker?: string; title: ReactNode[]; text?: ReactNode; children?: ReactNode; footer?: ReactNode }) {
  return (
    <section className="py-16 md:py-24">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0, y: 40, rotate: -1 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="relative overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-marigold px-6 py-14 shadow-[var(--shadow-hard-lg)] sm:px-12 md:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              {kicker && <p className="kicker mb-5">{kicker}</p>}
              <Lines lines={title} className="poster poster-lg" />
            </div>
            <div className="lg:col-span-4">
              {text && <p className="serif text-[1.2rem] leading-relaxed">{text}</p>}
              {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
            </div>
          </div>
          {footer && <div className="mt-12 border-t-[1.5px] border-ink pt-8">{footer}</div>}
        </m.div>
      </div>
    </section>
  )
}
