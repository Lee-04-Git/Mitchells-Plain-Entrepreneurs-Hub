import { Mail, Phone } from 'lucide-react'
import { contact, flowOffers } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { OfferGrid } from '../components/ui/Offers'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Stamp } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'
import { ScrollText } from '../components/ui/ScrollText'

export default function FlowBPO() {
  usePageMeta('Flow BPO', 'Virtual call centre and business process outsourcing, operating as a division of Mitchells Plain Entrepreneurs Hub.')
  return (
    <>
      <PageHero
        section="Services · A division of MPEH"
        crumbs={[{ label: 'Services' }, { label: 'Flow BPO' }]}
        title={['Flow', <Marked kind="circle" delay={0.8}>BPO</Marked>]}
        lede="Virtual call centre and business process outsourcing service, operating as a division of Mitchells Plain Entrepreneurs Hub."
        aside={<Stamp rotate={-8} className="!px-5 !py-3 !text-[1rem]">A division of MPEH</Stamp>}
      >
        <Button href={`mailto:${contact.flowEmail}`} variant="ink" icon={<Mail className="size-4" aria-hidden />} magnetic>
          {contact.flowEmail}
        </Button>
      </PageHero>

      <Section>
        <ScrollText className="serif max-w-5xl text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.25] font-medium">
          Flow BPO creates <Marked delay={0.4}>employment opportunities</Marked> while helping businesses operate more efficiently. We provide professional
          outsourcing solutions designed for growing and established businesses.
        </ScrollText>
      </Section>

      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <SectionHead kicker="What we offer" title={['Your extended', 'team, on call']} />
        <OfferGrid offers={flowOffers} cols={4} />
      </Section>

      <CtaPanel kicker="Get in touch" title={['Ready to', 'streamline your', 'operations?']} text="Contact Flow BPO today.">
        <Button href={`mailto:${contact.flowEmail}`} variant="ink" icon={<Mail className="size-4" aria-hidden />}>
          {contact.flowEmail}
        </Button>
        <Button href={contact.phoneHref} variant="paper" icon={<Phone className="size-4" aria-hidden />}>
          {contact.phone}
        </Button>
      </CtaPanel>
    </>
  )
}
