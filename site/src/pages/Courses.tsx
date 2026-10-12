import { m } from 'framer-motion'
import { Clock, TrendingUp } from 'lucide-react'
import clsx from 'clsx'
import { courses, type CourseStatus, externalLinks } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { Lines } from '../components/ui/Lines'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Sticker } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'

const statusTone: Record<CourseStatus, string> = {
  Available: 'border-ink bg-marigold text-ink',
  'Limited spots': 'border-clay text-clay',
  'Starting soon': 'border-ink bg-ink text-paper',
  Waitlist: 'border-ink text-ink',
  'Coming soon': 'border-ink/40 text-ink-soft',
}

export default function Courses() {
  usePageMeta('Courses & Training', 'Practical, hands-on courses for entrepreneurs — business basics, social media, WhatsApp Business, finance, digital tools and e-commerce.')
  return (
    <>
      <PageHero
        section="Programmes · Courses"
        crumbs={[{ label: 'Programmes' }, { label: 'Courses' }]}
        title={['Courses &', <Marked delay={0.8}>training</Marked>]}
        lede="Develop the skills you need to grow your business with our practical, hands-on courses designed for entrepreneurs."
        aside={<Sticker top="Practical" big={String(courses.length)} bottom="Courses" />}
      />

      <Section>
        <SectionHead kicker="Course catalogue" title={['Learn it once.', 'Use it daily.']} />
        <ul className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => (
            <m.li
              key={c.title}
              initial={{ opacity: 0, y: 30, rotate: (i % 3) - 1 }}
              whileInView={{ opacity: 1, y: 0, rotate: ((i % 3) - 1) * 0.6 }}
              whileHover={{ rotate: 0, y: -6 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ type: 'spring', stiffness: 160, damping: 20, delay: (i % 3) * 0.06 }}
            >
              {/* Library index card: ruled lines, punched hole, status tab */}
              <article className="relative flex h-full flex-col rounded-[6px] border-[1.5px] border-ink bg-card shadow-[var(--shadow-hard)] [background-image:repeating-linear-gradient(transparent_0_31px,rgb(29_92_85/0.11)_31px_32px)] [background-position:0_64px]">
                <span aria-hidden className="absolute top-4 left-1/2 size-3.5 -translate-x-1/2 rounded-full border-[1.5px] border-ink bg-paper" />
                <div className="flex items-start justify-between border-b-[1.5px] border-clay/50 px-6 pt-10 pb-4">
                  <span className="kicker text-ink-soft">Course {String(i + 1).padStart(2, '0')}</span>
                  <span className={clsx('mono rounded-[4px] border-[1.5px] px-2 py-0.5 text-[0.7rem] font-semibold tracking-wide uppercase', statusTone[c.status])}>{c.status}</span>
                </div>
                <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
                  <h3 className="serif text-[1.55rem] leading-tight font-semibold">{c.title}</h3>
                  <p className="mt-3 flex-1 text-[0.98rem] leading-[2rem] text-ink-soft">{c.text}</p>
                  <div className="mono mt-4 flex gap-5 text-[0.8rem]">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="size-4 text-teal" aria-hidden /> {c.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <TrendingUp className="size-4 text-teal" aria-hidden /> {c.level}
                    </span>
                  </div>
                  <div className="mt-6">
                    <Button to={`/contact?subject=courses&plan=${encodeURIComponent(c.title)}`} variant="paper" size="sm" full>
                      Join waitlist
                    </Button>
                  </div>
                </div>
              </article>
            </m.li>
          ))}
        </ul>
      </Section>

      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="h-full rounded-[14px] border-[1.5px] border-ink bg-teal-deep p-8 text-paper shadow-[8px_8px_0_var(--color-marigold)] md:p-12">
              <p className="kicker text-marigold">Newsletter</p>
              <Lines className="poster poster-md mt-5" lines={['Stay updated on', <span className="text-marigold">new courses</span>]} />
              <p className="serif mt-6 max-w-lg text-[1.15rem] leading-relaxed text-on-teal-muted">
                Be the first to know when new courses launch. Join our newsletter for course announcements, tips, and exclusive resources.
              </p>
              <div className="mt-9">
                <Button href={externalLinks.mailingList} variant="marigold" magnetic>
                  Subscribe to newsletter
                </Button>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="sheet flex h-full flex-col justify-between p-8 md:p-10">
              <div>
                <p className="kicker text-teal">For organisations</p>
                <h3 className="serif mt-4 text-[1.9rem] leading-tight font-semibold">Need custom training?</h3>
                <p className="mt-4 text-ink-soft">We offer group workshops and custom training for organizations and businesses.</p>
              </div>
              <div className="mt-8">
                <Button to="/contact?subject=courses&plan=Custom%20training" variant="marigold">
                  Enquire now
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
