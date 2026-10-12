import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { m, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, Briefcase, CalendarDays, GraduationCap, Megaphone } from 'lucide-react'
import clsx from 'clsx'
import { businessServices, courses, externalLinks, founder, markets2026, partners, posts, smmPlans } from '../data/site'
import { Button } from '../components/ui/Button'
import { Lines } from '../components/ui/Lines'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Section, SectionHead } from '../components/ui/Section'
import { Marked } from '../components/ui/Marks'
import { Polaroid, Stamp } from '../components/ui/Print'
import { MarketRail } from '../components/ui/MarketRail'
import { StoryList } from '../components/ui/StoryList'
import { IconTile } from '../components/ui/IconTile'
import { Img } from '../components/ui/Img'
import { CtaPanel } from '../components/ui/CtaPanel'
import { Medal3D } from '../components/three/Medal3D'
import { dateParts, formatLong, nextMarket } from '../lib/dates'
import { useMedia } from '../lib/useMedia'
import { easeOutExpo, inView } from '../lib/motion'
import { usePageMeta } from '../lib/usePageMeta'
import { Kicker } from '../components/ui/Kicker'
import { ScrollText } from '../components/ui/ScrollText'

export default function Home() {
  usePageMeta('')
  return (
    <>
      <Hero />
      <WhoWeAre />
      <HowWeHelp />
      <MarketRail
        markets={markets2026}
        header={
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Kicker className="mb-4 text-teal">Monthly markets · last Saturday of the month</Kicker>
              <h2 className="poster poster-md">
                The 2026 <Marked kind="circle">market</Marked> season
              </h2>
            </div>
            <Reveal from="right" delay={0.2}>
              <Button href={externalLinks.vendorForm} variant="marigold" magnetic>
                Book a stall
              </Button>
            </Reveal>
          </div>
        }
      />
      <Jubilee />
      <Stories />
      <Partners />
      <CtaPanel
        kicker="Start today"
        title={['Ready to grow', 'your business?']}
        text="Join hundreds of entrepreneurs who have transformed their businesses with MPEH. Get started today with our free resources or book a consultation."
      >
        <Button to="/resources" variant="ink" size="lg" magnetic>
          Free resources
        </Button>
        <Button to="/contact" variant="paper" size="lg">
          Get in touch
        </Button>
      </CtaPanel>
    </>
  )
}

/* ------------------------------------------------------------------ */

const heroPhotos = [
  { src: '/images/community-hero.webp', alt: 'MPEH community members celebrating together', caption: 'Market day crowd, Mitchells Plain', w: 'w-[19rem]', pos: 'top-2 left-[8%]', rot: -5, aspect: 'aspect-[4/3]' },
  { src: '/images/blog-awards.webp', alt: 'Community workers holding award certificates', caption: 'Awards for community workers', w: 'w-[16rem]', pos: 'top-[42%] right-0', rot: 6, aspect: 'aspect-[4/3]' },
  { src: '/images/blog-anniversary.webp', alt: 'Local entrepreneurs meeting around a table', caption: 'Planning the 50th', w: 'w-[14rem]', pos: 'bottom-0 left-0', rot: -2, aspect: 'aspect-[5/4]' },
]

function Hero() {
  const desktop = useMedia('(min-width: 1024px)')
  const next = nextMarket(markets2026)
  const nd = dateParts(next.date)

  return (
    <section className="paper-noise relative overflow-hidden border-b-[1.5px] border-ink pt-28 md:pt-36">
      <div className="wrap">
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b-[1.5px] border-ink pb-3"
        >
          <p className="kicker">Business · Markets · Skills · Community</p>
          <p className="kicker text-ink-soft">Mitchells Plain, Cape Flats &amp; greater Cape Town</p>
        </m.div>

        <div className="relative grid gap-10 pt-10 pb-14 lg:grid-cols-12 lg:pt-14 lg:pb-20">
          <div className="relative z-10 lg:col-span-7">
            <Lines
              as="h1"
              on="mount"
              delay={0.15}
              className="poster poster-xl"
              lines={[
                'Mitchells Plain',
                'Entrepreneurs',
                <span className="inline-flex items-center gap-4">
                  <span className="inline-block -rotate-2 rounded-md border-[1.5px] border-ink bg-marigold px-3 pt-1 shadow-[var(--shadow-hard)]">Hub</span>
                  <span className="serif hidden text-[1.15rem] leading-snug font-normal tracking-normal normal-case italic sm:block md:text-[1.35rem]">
                    made for the
                    <br />
                    Cape Flats
                  </span>
                </span>,
              ]}
            />

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: easeOutExpo }}
              className="lede mt-10 max-w-[34rem] text-ink-soft"
            >
              Your gateway to business growth, digital marketing excellence, and community success. We provide the tools, support, and opportunities you need
              to thrive.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.75, ease: easeOutExpo }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button to="/events" variant="ink" size="lg" magnetic>
                Explore events
              </Button>
              <Button to="/services/business" variant="paper" size="lg">
                Our services
              </Button>
            </m.div>

            <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="mt-10">
              <Link to="/events" className="group inline-flex items-stretch overflow-hidden rounded-md border-[1.5px] border-ink bg-card shadow-[var(--shadow-hard-sm)] transition-transform hover:-translate-y-0.5">
                <span className="grid w-16 place-items-center border-r-[1.5px] border-dashed border-ink bg-marigold py-2 text-center leading-none">
                  <span>
                    <span className="poster block text-[2rem]">{nd.day}</span>
                    <span className="kicker">{nd.monthShort}</span>
                  </span>
                </span>
                <span className="flex items-center gap-4 px-4 py-2.5">
                  <span>
                    <span className="kicker block text-teal">Next market</span>
                    <span className="serif block text-[1.1rem] font-semibold">{next.name}</span>
                  </span>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </Link>
            </m.div>
          </div>

          {/* Photo collage */}
          <div className="relative lg:col-span-5">
            {desktop ? (
              <div className="relative h-full min-h-[36rem]">
                {heroPhotos.map((p, i) => (
                  <m.div
                    key={p.src}
                    initial={{ opacity: 0, y: 80, rotate: p.rot * 3 }}
                    animate={{ opacity: 1, y: 0, rotate: p.rot }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.35 + i * 0.12 }}
                    className={clsx('absolute', p.pos, p.w)}
                    style={{ zIndex: 10 + i }}
                  >
                    {/* Same hover as the founder photo: straighten (cancel the tilt) and grow a touch.
                        On its own layer so it isn't slowed by the entrance spring's delay. */}
                    <m.div whileHover={{ rotate: -p.rot, scale: 1.02 }}>
                      <Polaroid src={p.src} alt={p.alt} caption={p.caption} imgClassName={p.aspect} eager={i === 0} />
                    </m.div>
                  </m.div>
                ))}
                <div className="absolute top-[36%] left-[4%] z-30">
                  <Stamp rotate={-9}>Golden Jubilee year</Stamp>
                </div>
              </div>
            ) : (
              <div className="relative flex justify-center pt-4 pb-6">
                {heroPhotos.slice(0, 2).map((p, i) => (
                  <m.div
                    key={p.src}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0, rotate: i ? 5 : -5 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.4 + i * 0.12 }}
                    className={clsx('w-[62%] max-w-[17rem]', i && '-ml-10 mt-10')}
                  >
                    <m.div whileHover={{ rotate: i ? -5 : 5, scale: 1.02 }}>
                      <Polaroid src={p.src} alt={p.alt} caption={p.caption} imgClassName="aspect-[4/3]" />
                    </m.div>
                  </m.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function WhoWeAre() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Kicker className="mb-6 text-teal">Who we are</Kicker>
          <ScrollText as="h2" className="serif max-w-[22ch] text-[clamp(1.8rem,3.6vw,3.2rem)] leading-[1.12] font-medium tracking-[-0.01em]">
            A community-driven platform supporting, connecting and growing entrepreneurs in Mitchells Plain — with <Marked delay={0.5}>real support</Marked>,{' '}
            <Marked delay={0.7}>real skills</Marked> and <Marked delay={0.9}>real opportunities</Marked>.
          </ScrollText>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <Reveal>
              <p className="dropcap text-[1.05rem] leading-[1.75] text-ink-soft">
                We exist to make entrepreneurship more accessible, practical and profitable for local business owners — from startups and side hustles to
                established small businesses.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[1.05rem] leading-[1.75] text-ink-soft">
                Through events, markets, business services, digital marketing support, courses, mentorship and community programmes, MPEH creates spaces where
                local entrepreneurs can learn, collaborate and thrive.
              </p>
              <Link to="/about" className="link-ink mt-6 inline-flex items-center gap-2 font-semibold">
                Read our story <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.15} className="lg:col-span-4">
          <m.div whileHover={{ rotate: 0, scale: 1.02 }} initial={{ rotate: 3 }} className="mx-auto max-w-[19rem] lg:mt-24">
            <Polaroid src={founder.image} alt={`${founder.name}, founder of MPEH`} caption={`${founder.name} — founder`} imgClassName="aspect-square" />
          </m.div>
        </Reveal>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */

type StackItem = {
  kicker: string
  title: string
  text: string
  to: string
  cta: string
  tone: string
  icon: typeof Briefcase
  aside: ReactNode
}

const stack: StackItem[] = [
  {
    kicker: 'Events & markets',
    title: 'Meet your customers',
    text: 'Monthly markets and special events. Book your stall and showcase your products to the Mitchells Plain community.',
    to: '/events',
    cta: 'See the calendar',
    tone: 'bg-marigold',
    icon: CalendarDays,
    aside: <Img src="/images/community-hero.webp" alt="" className="size-full object-cover" />,
  },
  {
    kicker: 'Business services',
    title: 'Get registered & compliant',
    text: 'Registrations, annual returns, tax compliance, business plans, startup support and websites — plus virtual assistants and Flow BPO.',
    to: '/services/business',
    cta: 'Business services',
    tone: 'bg-card',
    icon: Briefcase,
    aside: (
      <ul className="mono grid h-full content-center gap-2 p-6 text-[0.85rem]">
        {businessServices.map((s) => (
          <li key={s.title} className="flex items-center gap-2 border-b border-dashed border-ink/40 pb-2">
            <span aria-hidden>✓</span>
            {s.title}
          </li>
        ))}
      </ul>
    ),
  },
  {
    kicker: 'Digital marketing',
    title: 'Grow your brand online',
    text: 'Social media management, WhatsApp marketing, content creation, email, landing pages and analytics — by MPEH Digital.',
    to: '/services/marketing',
    cta: 'Marketing packages',
    tone: 'bg-teal-deep text-paper',
    icon: Megaphone,
    aside: (
      <div className="grid h-full content-center p-6 text-center">
        <span className="kicker text-marigold">Packages from</span>
        <span className="poster mt-2 text-[5rem] text-marigold">{smmPlans[0].price}</span>
        <span className="kicker text-on-teal-muted">per month</span>
      </div>
    ),
  },
  {
    kicker: 'Courses',
    title: 'Learn new skills',
    text: 'Practical, hands-on courses designed for entrepreneurs — from Business Basics 101 to E-commerce Essentials.',
    to: '/programmes/courses',
    cta: 'Browse courses',
    tone: 'bg-teal-soft',
    icon: BookOpen,
    aside: (
      <ul className="grid h-full content-center gap-2 p-6">
        {courses.slice(0, 4).map((c) => (
          <li key={c.title} className="serif rounded-md border-[1.5px] border-ink bg-card px-3 py-2 text-[1rem] font-semibold">
            {c.title}
          </li>
        ))}
      </ul>
    ),
  },
  {
    kicker: 'Technovation Girls',
    title: 'Empower young girls',
    text: 'Supporting girls and women in technology by creating pathways into STEM, innovation and leadership.',
    to: '/programmes/technovation',
    cta: 'Get involved',
    tone: 'bg-marigold-soft',
    icon: GraduationCap,
    aside: <Img src="/images/blog-stories.webp" alt="" className="size-full object-cover" />,
  },
]

function HowWeHelp() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="border-t-[1.5px] border-ink bg-teal-mist pt-20 md:pt-28">
      <div className="wrap">
        <SectionHead
          kicker="How can we help you today?"
          title={['Everything you need', 'to build & grow']}
          lede="Access all our services and resources designed to help you build and grow your business."
        />
      </div>
      <div ref={ref} className="wrap pb-20 md:pb-28">
        {stack.map((item, i) => (
          <StackCard key={item.title} item={item} i={i} n={stack.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  )
}

function StackCard({ item, i, n, progress }: { item: StackItem; i: number; n: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.035])
  const Icon = item.icon
  return (
    // The sticky wrapper is taller than its card and its empty top padding overlaps the card
    // before it, so it must let clicks through — otherwise it silently blocks that card's link.
    <div className="pointer-events-none mb-6 md:sticky md:top-0 md:mb-0 md:h-[88svh] md:pt-[calc(7rem+var(--i)*1.6rem)]" style={{ ['--i' as string]: i }}>
      <m.article
        style={{ scale }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={inView}
        transition={{ duration: 1, ease: easeOutExpo }}
        className={clsx('pointer-events-auto grid origin-top overflow-hidden rounded-[14px] will-change-transform border-[1.5px] border-ink shadow-[var(--shadow-hard-lg)] md:h-[min(68svh,32rem)] md:grid-cols-[1.25fr_1fr]', item.tone)}
      >
        <div className="flex flex-col p-7 md:p-10">
          <div className="flex items-center justify-between">
            <IconTile icon={Icon} tone={item.tone.includes('bg-teal') ? 'marigold' : item.tone.includes('marigold') ? 'paper' : 'marigold'} />
            <span className="poster text-[3rem] opacity-30">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <p className="kicker mt-8">{item.kicker}</p>
          <h3 className="poster poster-md mt-3">{item.title}</h3>
          <p className="serif mt-4 max-w-md text-[1.15rem] leading-snug opacity-85">{item.text}</p>
          <div className="mt-auto pt-8">
            <Link to={item.to} className="group inline-flex items-center gap-3 font-semibold">
              <span className="link-ink">{item.cta}</span>
              <span className="grid size-10 place-items-center rounded-md border-[1.5px] border-current transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          </div>
        </div>
        <div className="relative hidden min-h-0 border-l-[1.5px] border-ink md:block">{item.aside}</div>
      </m.article>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function Jubilee() {
  // The 3D coin is left out on phones entirely (not just hidden), so its
  // three.js chunk is never downloaded there.
  const showCoin = useMedia('(min-width: 768px)')
  return (
    <section className="relative overflow-hidden border-y-[1.5px] border-ink bg-teal-deep py-20 text-paper md:py-28">
      <div className="wrap grid items-center gap-10 lg:grid-cols-12">
        {showCoin && (
          <div className="relative order-2 h-[28rem] lg:order-1 lg:col-span-6 lg:h-[34rem]">
            <Reveal from="scale" distance={40} duration={1.2} className="size-full">
              <Medal3D className="size-full" />
            </Reveal>
          </div>
        )}
        <div className="order-1 lg:order-2 lg:col-span-6">
          <Kicker className="mb-6 text-marigold">Celebrating 50 years</Kicker>
          <Lines className="poster poster-lg" lines={['Mitchells Plain', <span className="text-marigold">Golden Jubilee</span>]} />
          <Reveal delay={0.15}>
            <p className="lede mt-8 max-w-lg text-on-teal-muted">
              Celebrating 50 years of our vibrant community! Join us for special activities, markets, and celebrations throughout 2026.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href={externalLinks.vendorForm} variant="marigold" magnetic>
                Register as vendor
              </Button>
              <Button to="/events" variant="line-light" icon="none">
                Jubilee markets
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function Stories() {
  return (
    <Section>
      <SectionHead
        kicker="From the blog"
        title={['Stories from', 'the Plain']}
        action={
          <Button to="/blog" variant="paper" size="sm">
            All stories
          </Button>
        }
      />
      <StoryList
        rows={posts.map((p) => ({ title: p.title, tag: p.category, meta: `${formatLong(p.date)} · ${p.read}`, image: p.image, href: p.url, external: true }))}
      />
    </Section>
  )
}

function Partners() {
  return (
    <section className="border-y-[1.5px] border-ink bg-teal-soft py-14">
      <div className="wrap flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <Kicker className="shrink-0 text-teal">In good company</Kicker>
        <RevealGroup as="ul" each={0.1} className="flex flex-wrap items-baseline gap-x-10 gap-y-4">
          {partners.map((p) => (
            <RevealItem as="li" key={p.name}>
              <Link to="/partners" className="group block">
                <span className="poster block text-[2.4rem] transition-colors group-hover:text-teal md:text-[3rem]">{p.name}</span>
                <span className="mono text-[0.72rem]">{p.role}</span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
