import { m } from 'framer-motion'
import { partners } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { easeOutExpo } from '../lib/motion'
import { usePageMeta } from '../lib/usePageMeta'

export default function Partners() {
  usePageMeta('Our Partners', 'Organisations that share our vision for economic growth, entrepreneurship, and community development.')
  return (
    <>
      <PageHero
        section="Partners"
        crumbs={[{ label: 'Partners' }]}
        title={['Growing', <Marked delay={0.8}>together</Marked>]}
        lede="We collaborate with companies and organisations that share our vision for economic growth, entrepreneurship, and community development."
      />

      <Section>
        <ul className="border-t-[1.5px] border-ink">
          {partners.map((p, i) => (
            <m.li
              key={p.name}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.9, ease: easeOutExpo, delay: i * 0.08 }}
              className="group relative isolate overflow-hidden border-b-[1.5px] border-ink"
            >
              <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-marigold transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              <div className="grid items-center gap-x-8 gap-y-3 px-1 py-8 md:grid-cols-[5rem_1fr_auto] md:py-12">
                <span className="kicker text-ink-soft">Partner {String(i + 1).padStart(2, '0')}</span>
                <h2 className="poster text-[clamp(2.6rem,7vw,6.5rem)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">{p.name}</h2>
                <p className="flex items-center gap-3 md:justify-end">
                  <p.icon className="size-6 shrink-0" strokeWidth={1.6} aria-hidden />
                  <span className="serif text-[1.15rem] italic">{p.role}</span>
                </p>
              </div>
            </m.li>
          ))}
        </ul>
      </Section>

      <CtaPanel
        kicker="Become a partner"
        title={['Share our vision?', "Let's work together"]}
        text="Interested in partnering with MPEH? We're always looking for organisations that share our vision for community development and entrepreneurship."
      >
        <Button to="/contact?subject=partnership" variant="ink" magnetic>
          Get in touch
        </Button>
      </CtaPanel>
    </>
  )
}
