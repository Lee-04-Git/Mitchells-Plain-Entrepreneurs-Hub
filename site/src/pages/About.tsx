import { m } from 'framer-motion'
import { contact, founder, social, whatWeDo } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Lines } from '../components/ui/Lines'
import { Marked } from '../components/ui/Marks'
import { Polaroid, Stamp, Tape } from '../components/ui/Print'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Button } from '../components/ui/Button'
import { FacebookIcon, InstagramIcon, MessengerIcon, WhatsappIcon } from '../components/ui/BrandIcons'
import { usePageMeta } from '../lib/usePageMeta'
import { ScrollText } from '../components/ui/ScrollText'
import { Kicker } from '../components/ui/Kicker'

const channels = [
  { label: 'WhatsApp', href: contact.whatsappHref, Icon: WhatsappIcon },
  { label: 'Facebook Group', href: social.facebookGroup, Icon: FacebookIcon },
  { label: 'Messenger', href: social.messenger, Icon: MessengerIcon },
  { label: 'Instagram', href: social.instagram, Icon: InstagramIcon },
]

export default function About() {
  usePageMeta('About', 'MPEH is a community-driven platform supporting, connecting and growing entrepreneurs in Mitchells Plain, the Cape Flats and greater Cape Town.')

  return (
    <>
      <PageHero
        section="About MPEH"
        crumbs={[{ label: 'About' }]}
        title={['Strong local businesses,', <Marked kind="underline" delay={0.9}>strong communities.</Marked>]}
        lede="Building strong communities through strong local businesses — in Mitchells Plain, the Cape Flats and greater Cape Town."
        aside={
          <m.div initial={{ opacity: 0, rotate: 12, y: 40 }} animate={{ opacity: 1, rotate: 4, y: 0 }} transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.4 }} className="w-[17rem]">
            <Polaroid src="/images/community-hero.webp" alt="MPEH community members together at an event" caption="The MPEH community" imgClassName="aspect-[4/3]" />
          </m.div>
        }
      />

      {/* Story — editorial columns */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-32">
              <Kicker className="text-teal">Our story</Kicker>
              <p className="serif mt-4 text-[1.1rem] leading-snug text-ink-soft italic">Real support, real skills and real opportunities that help entrepreneurs grow sustainably.</p>
            </div>
          </div>
          <div className="lg:col-span-9">
            <ScrollText className="serif text-[clamp(1.5rem,2.6vw,2.2rem)] leading-[1.3] font-medium">
              <strong className="font-semibold">Mitchells Plain Entrepreneurs Hub (MPEH)</strong> is a community-driven platform dedicated to supporting,
              connecting and growing entrepreneurs in Mitchells Plain, the Cape Flats and greater Cape Town.
            </ScrollText>
            <RevealGroup each={0.12} className="mt-12 gap-10 text-[1.05rem] leading-[1.8] text-ink-soft md:columns-2">
              <RevealItem className="break-inside-avoid"><p className="dropcap mb-6">
                We exist to make entrepreneurship more accessible, practical and profitable for local business owners — from startups and side hustles to
                established small businesses. Our focus is on <strong className="font-semibold text-ink">real support, real skills and real opportunities</strong>{' '}
                that help entrepreneurs grow sustainably.
              </p></RevealItem>
              <RevealItem className="break-inside-avoid"><p className="mb-6">
                Through events, markets, business services, digital marketing support, courses, mentorship and community programmes, MPEH creates spaces where
                local entrepreneurs can learn, collaborate and thrive.
              </p></RevealItem>
              <RevealItem className="break-inside-avoid"><p className="mb-6">
                We are also proud to support youth and innovation through initiatives like <strong className="font-semibold text-ink">Technovation Girls</strong>,
                empowering the next generation of leaders, creators and problem-solvers.
              </p></RevealItem>
              <RevealItem className="break-inside-avoid"><p>
                At our core, MPEH believes that strong local businesses build strong communities. By working together, sharing resources and amplifying local
                talent, we help turn ideas into income and passion into progress.
              </p></RevealItem>
            </RevealGroup>
            <Reveal className="mt-14 border-y-[1.5px] border-ink py-8">
              <blockquote className="serif text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.2] italic">
                “We help turn ideas into <Marked delay={0.5}>income</Marked> and passion into <Marked delay={0.8}>progress</Marked>.”
              </blockquote>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Founder */}
      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="relative mx-auto w-full max-w-[22rem] lg:col-span-5">
            <m.div initial={{ rotate: -6, opacity: 0, y: 30 }} whileInView={{ rotate: -3, opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 110, damping: 16 }}>
              <Polaroid src={founder.image} alt={`${founder.name}, founder of MPEH`} caption={`${founder.name} — ${founder.role}`} imgClassName="aspect-square" />
            </m.div>
            <div className="absolute -right-4 -bottom-4">
              <Stamp rotate={-12}>Founder</Stamp>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Kicker className="text-teal">Our founder</Kicker>
            <Lines className="poster poster-md mt-5" lines={['Born from the', 'challenges local', 'owners face']} />
            <Reveal delay={0.1}>
              <p className="serif mt-8 text-[1.2rem] leading-relaxed">
                MPEH was founded with a vision to create meaningful opportunities for entrepreneurs in Mitchells Plain and the Cape Flats. Born from a deep
                understanding of the challenges local business owners face, our founder set out to build a platform that provides practical support, community
                connection, and pathways to success.
              </p>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-soft">
                Today, MPEH continues to grow as a hub for innovation, collaboration, and entrepreneurial empowerment in our community.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* What we do — ruled index */}
      <Section>
        <SectionHead kicker="What we do" title={['Six ways we', 'show up for you']} />
        <RevealGroup as="ol" className="grid border-t-[1.5px] border-l-[1.5px] border-ink sm:grid-cols-2 lg:grid-cols-3">
          {whatWeDo.map((w, i) => (
            <RevealItem as="li" key={w.text} className="group relative isolate overflow-hidden border-r-[1.5px] border-b-[1.5px] border-ink bg-card p-7 md:p-8">
              <span aria-hidden className="absolute inset-0 -z-10 origin-left scale-x-0 bg-marigold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              <div className="flex items-center justify-between">
                <span className="poster text-[3.5rem] text-ink/20">{String(i + 1).padStart(2, '0')}</span>
                <w.icon className="size-7" strokeWidth={1.6} aria-hidden />
              </div>
              <p className="serif mt-6 text-[1.4rem] leading-snug font-semibold">{w.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Vision & mission — pinned notices */}
      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {[
            {
              label: 'Our vision',
              text: 'To build an inclusive, tech-enabled, and self-sustaining township economy — where local entrepreneurs can thrive, collaborate, and lead economic change from within their communities.',
              cls: 'bg-marigold',
              rot: -1.5,
            },
            {
              label: 'Our mission',
              text: 'To provide accessible enterprise support, training and market linkages that enable emerging entrepreneurs in Mitchells Plain and surrounding Cape Flats, Cape Town, the Western Cape areas to grow their businesses, generate income, and create local employment opportunities.',
              cls: 'bg-card',
              rot: 1.2,
            },
          ].map((n, i) => (
            <m.article
              key={n.label}
              initial={{ opacity: 0, y: 40, rotate: n.rot * 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: n.rot }}
              whileHover={{ rotate: 0, y: -4 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: i * 0.1 }}
              className={`relative rounded-[6px] border-[1.5px] border-ink p-8 shadow-[var(--shadow-hard-lg)] md:p-12 ${n.cls}`}
            >
              <Tape className="-top-3.5 left-10 -rotate-6" />
              <Tape className="-top-3.5 right-10 rotate-3" />
              <p className="kicker">{n.label}</p>
              <p className="serif mt-6 text-[clamp(1.3rem,2vw,1.7rem)] leading-[1.35] font-medium">{n.text}</p>
            </m.article>
          ))}
        </div>
      </Section>

      <CtaPanel
        kicker="Join our community"
        title={['Starting out or', 'scaling up?']}
        text="Whether you're starting out or scaling up, MPEH is here to support your entrepreneurial journey."
        footer={
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <p className="kicker">Connect with our community</p>
            <ul className="flex flex-wrap gap-2.5">
              {channels.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-md border-[1.5px] border-ink bg-card px-4 text-[0.9rem] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink hover:text-paper"
                  >
                    <Icon width={17} height={17} />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <Button to="/events" variant="ink" magnetic>
          Upcoming events
        </Button>
        <Button to="/contact" variant="paper">
          Get in touch
        </Button>
      </CtaPanel>
    </>
  )
}
