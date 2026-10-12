import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Img } from './Img'
import { easeOutExpo, inView } from '../../lib/motion'

export type ListRow = { title: string; meta: string; tag?: string; image: string; href: string; external?: boolean }

const row = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOutExpo } },
}

/**
 * Editorial index of articles: number, thumbnail, title, date. Rows cascade
 * in on scroll; on hover the photo zooms gently inside its frame and the
 * title nudges across. The cursor stays a normal pointer.
 */
export function StoryList({ rows }: { rows: ListRow[] }) {
  return (
    <m.ul
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ staggerChildren: 0.08 }}
      className="border-t-[1.5px] border-ink"
    >
      {rows.map((r, i) => (
        <m.li key={r.title} variants={row} className="border-b-[1.5px] border-ink">
          <a
            href={r.href}
            {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="group grid grid-cols-[5rem_1fr_auto] items-center gap-4 py-5 md:grid-cols-[3rem_8.5rem_1fr_12rem_auto] md:gap-8 md:py-6"
          >
            <span className="kicker hidden text-ink-soft md:block">{String(i + 1).padStart(2, '0')}</span>
            <span className="block aspect-[4/3] overflow-hidden rounded-[6px] border-[1.5px] border-ink bg-paper-2">
              <Img
                src={r.image}
                alt=""
                className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
              />
            </span>
            <span className="min-w-0">
              {r.tag && <span className="kicker mb-1.5 block text-teal">{r.tag}</span>}
              <span className="serif block text-[1.2rem] leading-tight font-semibold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 md:text-[1.75rem]">
                {r.title}
              </span>
            </span>
            <span className="kicker hidden text-ink-soft md:block">{r.meta}</span>
            <span className="grid size-11 place-items-center rounded-full border-[1.5px] border-ink transition-all duration-300 group-hover:-rotate-45 group-hover:bg-teal-deep group-hover:text-paper">
              <ArrowUpRight className="size-4 rotate-45" aria-hidden />
            </span>
          </a>
        </m.li>
      ))}
    </m.ul>
  )
}
