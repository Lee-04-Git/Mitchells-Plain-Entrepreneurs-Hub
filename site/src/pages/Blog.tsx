import { useState } from 'react'
import { AnimatePresence, LayoutGroup, m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'
import { blogCategories, posts, type BlogCategory, externalLinks } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Tape } from '../components/ui/Print'
import { Img } from '../components/ui/Img'
import { formatLong } from '../lib/dates'
import { usePageMeta } from '../lib/usePageMeta'
import { inView } from '../lib/motion'
import { RevealMedia } from '../components/ui/RevealMedia'

type Filter = 'All' | BlogCategory

export default function Blog() {
  usePageMeta('Blog', 'Insights, tips, and stories to help you grow your business — from experts and fellow Mitchells Plain entrepreneurs.')
  const [filter, setFilter] = useState<Filter>('All')
  const list = filter === 'All' ? posts : posts.filter((p) => p.category === filter)

  return (
    <>
      <PageHero
        section="Media · Blog"
        crumbs={[{ label: 'Media' }, { label: 'Blog' }]}
        title={['Stories from', <Marked delay={0.8}>the Plain</Marked>]}
        lede="Insights, tips, and stories to help you grow your business. Learn from experts and fellow entrepreneurs."
      />

      <Section>
        <LayoutGroup id="blog-filter">
          <div role="tablist" aria-label="Filter articles by category" className="mb-14 flex flex-wrap gap-2 border-b-[1.5px] border-ink pb-6">
            {(['All', ...blogCategories] as Filter[]).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={clsx('relative h-11 rounded-md border-[1.5px] border-ink px-5 text-[0.92rem] font-semibold transition-colors', filter === c ? 'text-paper' : 'bg-card hover:bg-marigold')}
              >
                {filter === c && <m.span layoutId="blog-pill" className="absolute inset-0 rounded-[4px] bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>

        <m.ul layout className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const feature = filter === 'All' && i === 0
              const rot = feature ? 0 : [-1.2, 0.9, -0.6][i % 3]
              return (
                <m.li
                  layout
                  key={p.title}
                  initial={{ opacity: 0, y: 56, rotate: rot * 3 }}
                  whileInView={{ opacity: 1, y: 0, rotate: rot }}
                  viewport={inView}
                  exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                  whileHover={{ rotate: 0, y: -6 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20, delay: (i % 3) * 0.08 }}
                  className={clsx(feature && 'md:col-span-2 lg:col-span-3')}
                >
                  {/* A clipping: photo + headline, taped to the page */}
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx('group relative grid h-full border-[1.5px] border-ink bg-card shadow-[var(--shadow-hard)]', feature ? 'md:grid-cols-[1.3fr_1fr]' : '')}
                  >
                    <Tape className="-top-3.5 left-8 -rotate-3" />
                    <div className={clsx('relative overflow-hidden border-b-[1.5px] border-ink bg-paper-2', feature ? 'aspect-[16/10] md:aspect-auto md:min-h-[26rem] md:border-r-[1.5px] md:border-b-0' : 'aspect-[16/10]')}>
                      <RevealMedia className="absolute inset-0" delay={0.15 + (i % 3) * 0.08} parallax={feature ? 6 : 0}>
                        <div className="size-full grayscale-[35%] transition-[transform,filter] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:grayscale-0">
                          <Img src={p.image} alt="" className="size-full object-cover" />
                        </div>
                      </RevealMedia>
                    </div>
                    <div className={clsx('flex flex-col p-6 md:p-7', feature && 'md:justify-center md:p-12')}>
                      <p className="kicker flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-teal">{p.category}</span>
                        <span className="text-ink-soft">
                          <time dateTime={p.date}>{formatLong(p.date)}</time> · {p.read}
                        </span>
                      </p>
                      <h2 className={clsx('serif mt-4 leading-[1.12] font-semibold', feature ? 'text-[clamp(1.9rem,3.2vw,2.9rem)]' : 'text-[1.45rem]')}>{p.title}</h2>
                      <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{p.excerpt}</p>
                      <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                        <span className="link-ink">Read article</span>
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      </span>
                    </div>
                  </a>
                </m.li>
              )
            })}
          </AnimatePresence>
        </m.ul>
        {list.length === 0 && <p className="serif py-16 text-center text-[1.2rem] text-ink-soft italic">No articles in this category yet — check back soon.</p>}
      </Section>

      <CtaPanel kicker="Newsletter" title={['Business tips,', 'in your inbox']} text="Join entrepreneurs receiving weekly tips, resources, and inspiration to grow their businesses.">
        <Button href={externalLinks.mailingList} variant="ink" magnetic>
          Subscribe now
        </Button>
      </CtaPanel>
    </>
  )
}
