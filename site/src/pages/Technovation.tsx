import { m } from 'framer-motion'
import { contact, externalLinks, technovationPillars } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section, SectionHead } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { Lines } from '../components/ui/Lines'
import { OfferGrid } from '../components/ui/Offers'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Polaroid, Tape } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'
import { ScrollText } from '../components/ui/ScrollText'

export default function Technovation() {
  usePageMeta('Technovation & Women Techmakers', 'Supporting girls and women in technology by creating pathways into STEM, innovation, and leadership.')
  return (
    <>
      <PageHero
        section="Programmes · Girls & women in tech"
        crumbs={[{ label: 'Programmes' }, { label: 'Technovation' }]}
        title={['Technovation &', <Marked delay={0.9}>Women</Marked>, 'Techmakers']}
        lede="Supporting girls and women in technology by creating pathways into STEM, innovation, and leadership."
        aside={
          <m.div initial={{ opacity: 0, rotate: -12, y: 40 }} animate={{ opacity: 1, rotate: -4, y: 0 }} transition={{ type: 'spring', stiffness: 110, damping: 15, delay: 0.4 }} className="w-[17rem]">
            <Polaroid src="/images/blog-stories.webp" alt="Young people from the community in branded T-shirts" caption="The next generation" imgClassName="aspect-[4/3]" />
          </m.div>
        }
      />

      <Section>
        <ScrollText className="serif max-w-5xl text-[clamp(1.5rem,2.8vw,2.4rem)] leading-[1.3] font-medium">
          Through <strong className="font-semibold">Technovation</strong>, young people build real-world tech solutions to community challenges, while{' '}
          <strong className="font-semibold">Women Techmakers</strong> provides continued learning, visibility, and support for women in tech beyond the challenge
          years.
        </ScrollText>
        <Reveal delay={0.1}>
          <p className="kicker mt-6 text-ink-soft">Women Techmakers is proudly built by Technovation.</p>
        </Reveal>
      </Section>

      <Section tone="paper-2" className="border-y-[1.5px] border-ink">
        <SectionHead
          kicker="Technovation"
          title={['Building tomorrow’s', 'problem-solvers']}
          lede="Get involved as a student, mentor, educator, or partner."
          action={
            <div className="flex flex-wrap gap-3">
              <Button href={externalLinks.technovation} variant="ink" size="sm">
                Learn more
              </Button>
              <Button href={externalLinks.technovationChallenge} variant="paper" size="sm">
                Get involved
              </Button>
            </div>
          }
        />
        <OfferGrid offers={technovationPillars} />
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <m.article
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1 }}
            whileHover={{ rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
            className="relative rounded-[8px] border-[1.5px] border-ink bg-marigold p-8 shadow-[var(--shadow-hard-lg)] md:p-12"
          >
            <Tape className="-top-3.5 left-12 -rotate-6" />
            <p className="kicker">Women Techmakers</p>
            <Lines className="poster poster-md mt-5" lines={['Learning,', 'connection &', 'career growth']} />
            <p className="serif mt-6 max-w-md text-[1.15rem]">Women Techmakers supports women in technology through learning, connection, and career growth opportunities.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href={externalLinks.womenTechmakers} variant="ink">
                Learn more
              </Button>
              <Button href={externalLinks.womenTechmakersJoin} variant="paper">
                Join the community
              </Button>
            </div>
          </m.article>
          <m.article
            initial={{ opacity: 0, y: 40, rotate: 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 1 }}
            whileHover={{ rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }}
            className="relative rounded-[8px] border-[1.5px] border-ink bg-teal-deep p-8 text-paper shadow-[8px_8px_0_var(--color-clay)] md:p-12"
          >
            <Tape className="-top-3.5 right-12 rotate-3" />
            <p className="kicker text-marigold">Become a mentor</p>
            <Lines className="poster poster-md mt-5" lines={['No coding', 'experience', <span className="text-marigold">required</span>]} />
            <p className="serif mt-6 max-w-md text-[1.15rem] text-on-teal-muted">
              Share your skills and inspire the next generation of female tech leaders. No coding experience required — we need mentors with diverse backgrounds!
            </p>
            <div className="mt-9">
              <Button to={`/contact?subject=technovation&plan=${encodeURIComponent('becoming a Technovation mentor')}`} variant="marigold" magnetic>
                Contact to mentor
              </Button>
            </div>
          </m.article>
        </div>
        <Reveal className="mt-14 border-t-[1.5px] border-ink pt-6">
          <p className="serif text-[1.2rem]">
            <strong className="font-semibold">Questions?</strong> Contact Lucretia at{' '}
            <a href={`mailto:${contact.mentorEmail}`} className="font-semibold text-teal underline decoration-2 underline-offset-4">
              {contact.mentorEmail}
            </a>
          </p>
        </Reveal>
      </Section>
    </>
  )
}
