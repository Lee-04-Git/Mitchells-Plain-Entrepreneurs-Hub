import { Mail, Phone } from 'lucide-react'
import { adPlans, contact, marketingServices, smmPlans } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { OfferGrid, PriceSlip } from '../components/ui/Offers'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Sticker } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'

export default function Marketing() {
  usePageMeta('Social Media Marketing & Management', 'Grow your business with MPEH Digital — social media management, WhatsApp marketing, content creation, ads and analytics.')
  return (
    <>
      <PageHero
        section="Services · MPEH Digital"
        crumbs={[{ label: 'Services' }, { label: 'Marketing' }]}
        title={['Social media', 'marketing &', <Marked delay={0.9}>management</Marked>]}
        lede="Grow your business with MPEH Digital — social media marketing & management solutions tailored for you."
        aside={<Sticker top="Packages from" big={smmPlans[0].price} bottom="per month" />}
      >
        <Button href="#packages" variant="ink" icon="none" magnetic>
          View packages
        </Button>
        <Button to="/contact?subject=marketing" variant="paper">
          Talk to us
        </Button>
      </PageHero>

      <Section>
        <SectionHead kicker="What we do" title={['Digital marketing', 'that works locally']} />
        <OfferGrid offers={marketingServices} />
      </Section>

      <Section id="packages" tone="paper-2" className="scroll-mt-24 border-y-[1.5px] border-ink">
        <SectionHead kicker="Social media management" title={['Monthly', 'packages']} lede="All packages include visual designs, captions and hashtags." />
        <RevealGroup className="grid items-stretch gap-8 lg:grid-cols-3" each={0.1}>
          {smmPlans.map((p, i) => (
            <RevealItem key={p.name}>
              <PriceSlip plan={p} index={i} cta="Get started" ctaTo={`/contact?subject=marketing&plan=${encodeURIComponent(`${p.name} social media package`)}`} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section>
        <SectionHead kicker="Social media advertising" title={['Facebook &', 'Instagram ads']} />
        <div className="grid gap-6 md:grid-cols-2">
          {adPlans.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.08}>
              <article className="sheet flex h-full flex-col p-8 shadow-[var(--shadow-hard)] md:p-10">
                <p className="kicker text-teal">{a.unit === '/month' ? 'Ongoing' : 'Per campaign'}</p>
                <h3 className="serif mt-4 text-[1.7rem] font-semibold">{a.name}</h3>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="poster text-[3.6rem] leading-none">{a.price}</span>
                  <span className="mono text-[0.85rem]">{a.unit}</span>
                </p>
                <p className="mt-4 flex-1 text-ink-soft">{a.text}</p>
                <div className="mt-8">
                  <Button to={`/contact?subject=marketing&plan=${encodeURIComponent(a.name)}`} variant="marigold">
                    Enquire now
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaPanel kicker="MPEH Digital" title={['Let us handle', 'your digital', 'presence']} text="Focus on running your business while we grow your online presence.">
        <Button to="/contact?subject=marketing" variant="ink" magnetic>
          Get started today
        </Button>
        <Button href={`mailto:${contact.email}`} variant="paper" icon={<Mail className="size-4" aria-hidden />}>
          Email us
        </Button>
        <Button href={contact.phoneHref} variant="paper" icon={<Phone className="size-4" aria-hidden />}>
          081 518 2971
        </Button>
      </CtaPanel>
    </>
  )
}
