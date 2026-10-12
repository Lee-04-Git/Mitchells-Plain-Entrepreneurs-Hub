import { m } from 'framer-motion'
import { Download, Hourglass } from 'lucide-react'
import clsx from 'clsx'
import { comingSoon, resources, externalLinks } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Stamp, Sticker } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'

export default function Resources() {
  usePageMeta('Free Resources', 'Download free guides, templates, and tools to help you start and grow your business. No sign-up required.')
  return (
    <>
      <PageHero
        section="Resources · Free downloads"
        crumbs={[{ label: 'Resources' }]}
        title={['Free tools to', <Marked delay={0.8}>start & grow</Marked>]}
        lede="Download free guides, templates, and tools to help you start and grow your business. No sign-up required."
        aside={<Sticker top="No sign-up" big="Free" bottom="Downloads" tone="ink" />}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          {resources.map((r, i) => (
            <m.article
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 140, damping: 20, delay: i * 0.08 }}
              className="group relative flex flex-col"
            >
              {/* A manila folder with a tab — the guide peeks out on hover */}
              <div className="relative">
                <span className="relative z-10 ml-5 inline-block rounded-t-[8px] border-[1.5px] border-b-0 border-ink bg-marigold-soft px-4 pt-2 pb-1.5">
                  <span className="kicker">{r.meta}</span>
                </span>
              </div>
              <div className="relative flex flex-1 flex-col rounded-[8px] rounded-tl-none border-[1.5px] border-ink bg-marigold-soft p-7 shadow-[var(--shadow-hard)]">
                <div className="relative -mt-2 mb-6 h-32">
                  <div className="absolute inset-x-6 top-0 bottom-0 rounded-[4px] border-[1.5px] border-ink bg-card p-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-4 group-hover:-rotate-2">
                    <r.icon className="size-6" strokeWidth={1.6} aria-hidden />
                    <span className="mt-3 block h-1.5 w-3/4 rounded bg-ink/15" />
                    <span className="mt-2 block h-1.5 w-1/2 rounded bg-ink/15" />
                    <span className="mt-2 block h-1.5 w-2/3 rounded bg-ink/15" />
                  </div>
                  {!r.href && (
                    <div className="absolute top-2 right-2">
                      <Stamp rotate={10}>Coming soon</Stamp>
                    </div>
                  )}
                </div>
                <h2 className="serif text-[1.5rem] leading-tight font-semibold">{r.title}</h2>
                <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">{r.text}</p>
                <div className="mt-7">
                  {r.href ? (
                    <Button href={r.href} download variant="ink" full icon={<Download className="size-4" aria-hidden />}>
                      Download
                    </Button>
                  ) : (
                    <Button variant="paper" full disabled icon={<Hourglass className="size-4" aria-hidden />}>
                      Coming soon
                    </Button>
                  )}
                </div>
              </div>
            </m.article>
          ))}
        </div>
      </Section>

      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <SectionHead kicker="In the works" title={['Coming', 'soon']} lede="More free tools are on the way. Join the mailing list to hear first." />
        <RevealGroup as="ul" className="grid border-t-[1.5px] border-l-[1.5px] border-ink sm:grid-cols-2">
          {comingSoon.map((c, i) => (
            <RevealItem as="li" key={c} className={clsx('flex items-center gap-4 border-r-[1.5px] border-b-[1.5px] border-ink bg-card p-6')}>
              <span className="poster text-[2.2rem] text-ink/25">{String(i + 1).padStart(2, '0')}</span>
              <span className="serif text-[1.25rem] font-semibold">{c}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaPanel kicker="Mailing list" title={['Get new resources', 'first']} text="Be the first to receive new free resources, guides, and templates when we release them. Join our mailing list today.">
        <Button href={externalLinks.mailingList} variant="ink" magnetic>
          Join mailing list
        </Button>
      </CtaPanel>
    </>
  )
}
