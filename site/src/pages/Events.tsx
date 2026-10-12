import { useState } from 'react'
import { AnimatePresence, LayoutGroup, m } from 'framer-motion'
import { CalendarDays, Clock, Mail, MapPin, Phone } from 'lucide-react'
import clsx from 'clsx'
import { contact, externalLinks, markets2026 } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { Lines } from '../components/ui/Lines'
import { Button } from '../components/ui/Button'
import { TiltCard } from '../components/ui/TiltCard'
import { Ticket } from '../components/ui/Ticket'
import { Marked } from '../components/ui/Marks'
import { Stamp, Sticker } from '../components/ui/Print'
import { Medal3D } from '../components/three/Medal3D'
import { dateParts, formatLong, isPast, nextMarket } from '../lib/dates'
import { easeOutExpo, inView } from '../lib/motion'
import { usePageMeta } from '../lib/usePageMeta'
import { useMedia } from '../lib/useMedia'
import { Kicker } from '../components/ui/Kicker'

export default function Events() {
  usePageMeta('Events & Vendor Opportunities', 'Join MPEH monthly markets and special events. Book your stall and showcase your products to the Mitchells Plain community.')
  return (
    <>
      <PageHero
        section="Events · 2026 season"
        crumbs={[{ label: 'Events' }]}
        title={['Events &', 'vendor', <Marked kind="circle" delay={0.9}>opportunities</Marked>]}
        lede="Join our monthly markets and special events. Book your stall and showcase your products to the Mitchells Plain community."
        aside={<Sticker top="2026 season" big={String(markets2026.length)} bottom="Markets" />}
      >
        <Button href={externalLinks.vendorForm} variant="marigold" magnetic>
          Register as vendor
        </Button>
        <Button href="#calendar" variant="paper" icon="none">
          View the calendar
        </Button>
      </PageHero>
      <Featured />
      <Jubilee />
      <Calendar />
      <Vendor />
    </>
  )
}

/** The next market as an oversized admission ticket. */
function Featured() {
  const mk = nextMarket(markets2026)
  const d = dateParts(mk.date)
  return (
    <Section>
      <p className="kicker mb-6 text-teal">Featured event</p>
      <Reveal>
        <TiltCard max={3} glare={false}>
          <article className="relative grid overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-card shadow-[var(--shadow-hard-lg)] md:grid-cols-[1fr_15rem]">
            <div className="p-7 md:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="kicker">Admit one · Vendor & visitor</span>
                <Stamp rotate={-4}>Next up</Stamp>
              </div>
              <h2 className="poster poster-md mt-6">MPEH Market</h2>
              <p className="serif mt-2 text-[1.6rem] text-gold-deep italic">{mk.name}</p>
              <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-ink-soft">{mk.theme}. A vibrant showcase of local entrepreneurs, delicious food, and community spirit.</p>
              <ul className="mono mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[0.85rem]">
                <li className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4 text-teal" aria-hidden /> {formatLong(mk.date)}
                </li>
                <li className="inline-flex items-center gap-2">
                  <MapPin className="size-4 text-teal" aria-hidden /> Mitchells Plain
                </li>
                <li className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-teal" aria-hidden /> More details coming soon
                </li>
              </ul>
              <div className="mt-9">
                <Button href={externalLinks.vendorForm} variant="ink" magnetic>
                  Register as vendor
                </Button>
              </div>
            </div>
            <div className="relative flex flex-row items-center justify-center gap-6 border-t-[1.5px] border-dashed border-ink bg-marigold p-6 md:flex-col md:border-t-0 md:border-l-[1.5px]">
              <span aria-hidden className="absolute -top-3 -left-3 hidden size-6 rounded-full border-[1.5px] border-ink bg-paper md:block" />
              <span aria-hidden className="absolute -bottom-3 -left-3 hidden size-6 rounded-full border-[1.5px] border-ink bg-paper md:block" />
              <m.div
                initial={{ rotateX: -90, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.2 }}
                style={{ transformOrigin: '50% 0%', transformPerspective: 600 }}
                className="text-center"
              >
                <span className="kicker block">{d.month}</span>
                <span className="poster block text-[7rem] leading-[0.85] md:text-[8.5rem]">{d.day}</span>
                <span className="kicker block">
                  {d.weekday} · {d.year}
                </span>
              </m.div>
            </div>
          </article>
        </TiltCard>
      </Reveal>
    </Section>
  )
}

function Jubilee() {
  // The 3D coin is left out on phones entirely (not just hidden), so its
  // three.js chunk is never downloaded there.
  const showCoin = useMedia('(min-width: 768px)')
  return (
    <section className="border-y-[1.5px] border-ink bg-teal-deep py-20 text-paper md:py-28">
      <div className="wrap grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Kicker className="mb-6 text-marigold">Celebrating 50 years</Kicker>
          <Lines className="poster poster-lg" lines={['Mitchells Plain', <span className="text-marigold">50th Golden</span>, <span className="text-marigold">Jubilee</span>]} />
          <Reveal delay={0.1}>
            <p className="lede mt-8 max-w-lg text-on-teal-muted">Celebrating 50 years of our vibrant community! Join us for special activities, markets, and celebrations throughout 2026.</p>
            <div className="mt-9">
              <Button href={externalLinks.vendorForm} variant="marigold" magnetic>
                Register as vendor
              </Button>
            </div>
          </Reveal>
        </div>
        {showCoin && (
          <div className="relative h-[30rem]">
            <Reveal from="scale" distance={40} duration={1.2} className="size-full">
              <Medal3D className="size-full" />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  )
}

function Calendar() {
  const [view, setView] = useState<'upcoming' | 'all'>('upcoming')
  const next = nextMarket(markets2026)
  const list = view === 'all' ? markets2026 : markets2026.filter((mk) => !isPast(mk.date))

  return (
    <Section id="calendar" className="scroll-mt-24">
      <SectionHead
        kicker="Monthly markets"
        title={['2026 market', 'calendar']}
        lede="Last Saturday of every month (with December exception)."
        action={
          <LayoutGroup id="market-view">
            <div role="tablist" aria-label="Filter markets" className="inline-flex rounded-md border-[1.5px] border-ink bg-card p-1">
              {(['upcoming', 'all'] as const).map((v) => (
                <button
                  key={v}
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => setView(v)}
                  className={clsx('relative h-10 rounded-[4px] px-5 text-[0.9rem] font-semibold transition-colors', view === v ? 'text-paper' : 'text-ink hover:bg-paper-2')}
                >
                  {view === v && <m.span layoutId="market-pill" className="absolute inset-0 rounded-[4px] bg-ink" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="relative">{v === 'upcoming' ? 'Upcoming' : 'Full year'}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        }
      />

      <m.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((mk, n) => {
            const i = markets2026.indexOf(mk)
            return (
              <m.li
                layout
                key={mk.date}
                initial={{ opacity: 0, y: 48, rotate: (i % 2 ? 1 : -1) * 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={inView}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
                transition={{ type: 'spring', stiffness: 150, damping: 22, delay: (n % 3) * 0.08 }}
                whileHover={{ y: -4, rotate: (i % 2 ? 1 : -1) * 0.8 }}
                className="h-[16.5rem]"
              >
                <Ticket market={mk} index={i} next={mk.date === next.date} />
              </m.li>
            )
          })}
        </AnimatePresence>
      </m.ul>
    </Section>
  )
}

function Vendor() {
  return (
    <Section tone="paper-2" className="border-t-[1.5px] border-ink">
      <div className="grid gap-8 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="h-full rounded-[14px] border-[1.5px] border-ink bg-marigold p-8 shadow-[var(--shadow-hard-lg)] md:p-12">
            <p className="kicker">Become a vendor</p>
            <Lines className="poster poster-md mt-5" lines={['Book your stall', 'at our markets']} />
            <p className="serif mt-6 max-w-lg text-[1.2rem] leading-relaxed">
              Book your stall at our monthly markets. Great opportunity to showcase your products, connect with customers, and grow your business.
            </p>
            <div className="mt-9">
              <Button href={externalLinks.vendorForm} variant="ink" size="lg" magnetic>
                Complete vendor form
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-2">
          <div className="sheet h-full p-8 md:p-10">
            <p className="kicker text-teal">Event enquiries</p>
            <ul className="mt-8 divide-y-[1.5px] divide-ink/15 border-y-[1.5px] border-ink/15">
              {[
                { Icon: Mail, label: contact.eventsEmail, href: `mailto:${contact.eventsEmail}` },
                { Icon: Phone, label: contact.phone, href: contact.phoneHref },
                { Icon: MapPin, label: contact.location },
              ].map(({ Icon, label, href }) => (
                <li key={label}>
                  {href ? (
                    <a href={href} className="group flex items-center gap-4 py-4 font-semibold">
                      <Icon className="size-5 text-teal" aria-hidden />
                      <span className="link-ink">{label}</span>
                    </a>
                  ) : (
                    <p className="flex items-center gap-4 py-4 font-semibold">
                      <Icon className="size-5 text-teal" aria-hidden /> {label}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
