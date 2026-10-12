import { m } from 'framer-motion'
import { businessServices, whyChoose } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Lines } from '../components/ui/Lines'
import { OfferGrid } from '../components/ui/Offers'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Sticker } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'
import { Kicker } from '../components/ui/Kicker'

/** A checkbox whose tick is drawn by hand as it scrolls in. */
function Tick({ delay }: { delay: number }) {
  return (
    <span className="relative grid size-8 shrink-0 place-items-center rounded-[4px] border-[1.5px] border-ink bg-card">
      <svg viewBox="0 0 24 24" className="size-6 text-clay" aria-hidden>
        <m.path
          d="M4 13 C 6 15, 8 17, 9.5 19 C 12 13, 15.5 8, 21 3"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
    </span>
  )
}

export default function BusinessServices() {
  usePageMeta('Business Services', 'CIPC registrations, annual returns, SARS tax compliance, business plans, startup support and website development for Cape Town small businesses.')
  return (
    <>
      <PageHero
        section="Services · Business"
        crumbs={[{ label: 'Services' }, { label: 'Business Services' }]}
        title={['Business', <Marked kind="underline" delay={0.8}>services</Marked>]}
        lede="Professional business support services to help you start, grow, and maintain your business with confidence."
        aside={<Sticker top="Ask for a" big="Free" bottom="Consultation" tone="ink" />}
      >
        <Button to="/contact?subject=business" variant="ink" magnetic>
          Request a quote
        </Button>
      </PageHero>

      <Section>
        <SectionHead kicker="What we offer" title={['Set up, compliant', '& ready to grow']} lede="Paperwork handled by people who know how CIPC and SARS actually work." />
        <OfferGrid offers={businessServices} />
      </Section>

      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <div className="grid items-start gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Kicker className="text-teal">Why choose MPEH?</Kicker>
            <Lines className="poster poster-md mt-5" lines={['Local experts.', 'Fair prices.']} />
            <RevealGroup as="ul" className="mt-10 space-y-4" each={0.08}>
              {whyChoose.map((w, i) => (
                <RevealItem as="li" key={w} className="flex items-center gap-4 text-[1.1rem] font-medium">
                  <Tick delay={0.3 + i * 0.15} />
                  {w}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="rounded-[14px] border-[1.5px] border-ink bg-teal-deep p-8 text-paper shadow-[8px_8px_0_var(--color-marigold)] md:p-12">
              <p className="kicker text-marigold">Ready to get started?</p>
              <p className="serif mt-6 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.2]">
                Tell us about your business needs and we&rsquo;ll provide a custom quote.
              </p>
              <p className="mt-4 text-on-teal-muted">No obligation, just helpful guidance.</p>
              <div className="mt-9">
                <Button to="/contact?subject=business" variant="marigold" size="lg" magnetic>
                  Request a quote
                </Button>
              </div>
              <p className="mono mt-10 border-t border-paper/25 pt-6 text-[0.8rem] leading-relaxed text-on-teal-muted">
                <span className="text-paper">FLEXIBLE PRICING —</span> We offer competitive rates tailored to small businesses. Contact us for a free consultation and quote.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
