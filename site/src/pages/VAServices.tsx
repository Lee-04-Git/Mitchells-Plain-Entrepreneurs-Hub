import { Mail, Phone } from 'lucide-react'
import { contact, vaAddOns, vaPlans } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { RevealGroup, RevealItem } from '../components/ui/Reveal'
import { PriceSlip } from '../components/ui/Offers'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Sticker } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'

export default function VAServices() {
  usePageMeta('Virtual Assistant Services', 'Virtual assistant packages from R1,500/month — email, scheduling, invoicing, social media, research and more.')
  return (
    <>
      <PageHero
        section="Services · Virtual assistants"
        crumbs={[{ label: 'Services' }, { label: 'VA Services' }]}
        title={['Let us handle', 'the admin.', <Marked delay={0.9}>You grow.</Marked>]}
        lede="Choose a package that suits your needs. Our virtual assistants are experienced, reliable, and ready to help you streamline your business operations."
        aside={<Sticker top="Packages from" big={vaPlans[0].price} bottom="per month" />}
      />

      <Section>
        <SectionHead kicker="Monthly packages" title={['Pick your', 'package']} lede="Every package is a set number of VA hours each month. Add extra hours whenever you need them." />
        <RevealGroup className="grid items-stretch gap-8 lg:grid-cols-3" each={0.1}>
          {vaPlans.map((p, i) => (
            <RevealItem key={p.name}>
              <PriceSlip plan={p} index={i} cta="Get started" ctaTo={`/contact?subject=va&plan=${encodeURIComponent(p.name)}`} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <SectionHead kicker="Add-ons" title={['Available for', 'any package']} />
        <RevealGroup as="ul" className="border-t-[1.5px] border-ink">
          {vaAddOns.map((a) => (
            <RevealItem as="li" key={a.name} className="flex items-baseline gap-4 border-b-[1.5px] border-ink py-5">
              <span className="serif text-[1.35rem] font-semibold">{a.name}</span>
              <span aria-hidden className="flex-1 border-b-2 border-dotted border-ink/40" />
              <span className="poster text-[2rem]">{a.price}</span>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <CtaPanel kicker="Let's talk" title={['Interested?', "Let's discuss", 'your needs']} text="Get in touch to find the perfect VA package for your business.">
        <Button href={`mailto:${contact.email}`} variant="ink" icon={<Mail className="size-4" aria-hidden />}>
          {contact.email}
        </Button>
        <Button href={contact.phoneHref} variant="paper" icon={<Phone className="size-4" aria-hidden />}>
          081 518 2971
        </Button>
      </CtaPanel>
    </>
  )
}
