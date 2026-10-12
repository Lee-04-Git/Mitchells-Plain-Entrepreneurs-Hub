import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { CircleCheck, Mail, MapPin, Phone, Send } from 'lucide-react'
import clsx from 'clsx'
import { contact, contactSubjects } from '../data/site'
import { PageHero } from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { IconTile } from '../components/ui/IconTile'
import { SocialLinks } from '../components/layout/Footer'
import { easeOutExpo } from '../lib/motion'
import { Marked } from '../components/ui/Marks'
import { Tape } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'

type Fields = { name: string; email: string; phone: string; subject: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const validate = (f: Fields): Errors => {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Please tell us your name.'
  if (!f.email.trim()) e.email = 'We need an email address to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'That email address doesn’t look quite right.'
  if (f.phone && !/^[+\d][\d\s()-]{6,}$/.test(f.phone)) e.phone = 'Please use digits only, e.g. +27 81 518 2971.'
  if (!f.subject) e.subject = 'Choose what your message is about.'
  if (f.message.trim().length < 10) e.message = 'Add a little more detail so we can help (10+ characters).'
  return e
}

export default function Contact() {
  usePageMeta('Contact Us', 'Questions or need assistance? Email hello@mpeh.co.za or WhatsApp +27 81 518 2971.')
  const [params] = useSearchParams()

  const initial = useMemo<Fields>(() => {
    const subject = contactSubjects.some((s) => s.value === params.get('subject')) ? params.get('subject')! : ''
    const plan = params.get('plan')
    return {
      name: '',
      email: '',
      phone: '',
      subject,
      message: plan ? `Hi MPEH, I'm interested in: ${plan}.\n\n` : '',
    }
  }, [params])

  const [fields, setFields] = useState<Fields>(initial)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [sent, setSent] = useState(false)

  // Arriving from another "Get started" link while already on this page.
  useEffect(() => {
    setFields(initial)
    setSent(false)
  }, [initial])

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    const next = { ...fields, [k]: e.target.value }
    setFields(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors(validate(fields))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })
    const first = Object.keys(errs)[0]
    if (first) {
      document.getElementById(`f-${first}`)?.focus()
      return
    }
    const label = contactSubjects.find((s) => s.value === fields.subject)?.label ?? 'Enquiry'
    const body = `${fields.message}\n\n—\nName: ${fields.name}\nEmail: ${fields.email}${fields.phone ? `\nPhone: ${fields.phone}` : ''}`
    const to =
      fields.subject === 'vendor' ? contact.eventsEmail : fields.subject === 'flow' ? contact.flowEmail : fields.subject === 'technovation' ? contact.mentorEmail : contact.email
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`${label} — ${fields.name}`)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  const info = [
    { icon: Mail, title: 'Email us', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, title: 'WhatsApp', value: contact.phone, href: contact.whatsappHref },
    { icon: MapPin, title: 'Location', value: contact.location },
  ]

  return (
    <>
      <PageHero
        section="Contact · Mitchells Plain, Cape Town"
        crumbs={[{ label: 'Contact' }]}
        title={['Let’s build', <Marked delay={0.8}>something</Marked>, 'together']}
        lede="Have questions or need assistance? We're here to help you on your entrepreneurial journey."
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="kicker text-teal">Get in touch</p>
              <p className="serif mt-4 text-[1.3rem] leading-snug">
                Whether you have a question about our services, need support, or want to explore partnership opportunities, our team is ready to help.
              </p>
            </Reveal>
            <RevealGroup as="ul" className="mt-10 border-t-[1.5px] border-ink" each={0.08}>
              {info.map(({ icon, title, value, href }) => {
                const inner = (
                  <>
                    <IconTile icon={icon} tone="marigold" className="transition-transform duration-300 group-hover:-rotate-6" />
                    <span>
                      <span className="kicker block text-ink-soft">{title}</span>
                      <span className={clsx('serif mt-0.5 block text-[1.3rem] font-semibold', href && 'group-hover:text-teal')}>{value}</span>
                    </span>
                  </>
                )
                return (
                  <RevealItem as="li" key={title}>
                    {href ? (
                      <a
                        href={href}
                        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="group flex items-center gap-5 border-b-[1.5px] border-ink py-5 transition-colors"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-5 border-b-[1.5px] border-ink py-5">{inner}</div>
                    )}
                  </RevealItem>
                )
              })}
            </RevealGroup>
            <Reveal className="mt-10">
              <p className="kicker mb-4 text-ink-soft">Follow us</p>
              <SocialLinks tone="light" />
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative rounded-[10px] border-[1.5px] border-ink bg-card p-6 shadow-[var(--shadow-hard-lg)] sm:p-10">
              <Tape className="-top-3.5 left-10 -rotate-3" />
              <Tape className="-top-3.5 right-10 rotate-2" />
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <m.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.6, ease: easeOutExpo }}
                    className="py-10 text-center"
                    role="status"
                  >
                    <m.span
                      initial={{ scale: 0.4, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                      className="mx-auto grid size-20 place-items-center rounded-full border-[1.5px] border-ink bg-marigold text-ink shadow-[var(--shadow-hard)]"
                    >
                      <CircleCheck className="size-9" aria-hidden />
                    </m.span>
                    <h3 className="poster poster-sm mt-8">Almost there, {fields.name.split(' ')[0]}.</h3>
                    <p className="serif mx-auto mt-4 max-w-md text-[1.1rem] text-ink-soft">
                      Your email app should have opened with your message ready to send. If it didn&rsquo;t, email us directly at{' '}
                      <a className="font-semibold text-teal underline underline-offset-4" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>{' '}
                      or WhatsApp {contact.phone}.
                    </p>
                    <div className="mt-8">
                      <Button variant="paper" icon="none" onClick={() => setSent(false)}>
                        Edit message
                      </Button>
                    </div>
                  </m.div>
                ) : (
                  <m.form key="form" noValidate onSubmit={onSubmit} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between border-b-[1.5px] border-ink pb-4">
                      <h2 className="poster poster-sm">Send a message</h2>
                      <span className="kicker text-ink-soft">Form MPEH-01</span>
                    </div>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <Field id="name" label="Name" error={touched.name ? errors.name : undefined}>
                        <input id="f-name" className="field" autoComplete="name" placeholder="Your name" value={fields.name} onChange={set('name')} onBlur={blur('name')} aria-invalid={!!(touched.name && errors.name)} aria-describedby="e-name" />
                      </Field>
                      <Field id="email" label="Email" error={touched.email ? errors.email : undefined}>
                        <input id="f-email" type="email" inputMode="email" autoComplete="email" className="field" placeholder="email@example.com" value={fields.email} onChange={set('email')} onBlur={blur('email')} aria-invalid={!!(touched.email && errors.email)} aria-describedby="e-email" />
                      </Field>
                      <Field id="phone" label="Phone" optional error={touched.phone ? errors.phone : undefined}>
                        <input id="f-phone" type="tel" inputMode="tel" autoComplete="tel" className="field" placeholder="+27…" value={fields.phone} onChange={set('phone')} onBlur={blur('phone')} aria-invalid={!!(touched.phone && errors.phone)} aria-describedby="e-phone" />
                      </Field>
                      <Field id="subject" label="Subject" error={touched.subject ? errors.subject : undefined}>
                        <select id="f-subject" className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2317140f%22 stroke-width=%222%22><path d=%22m4 6 4 4 4-4%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-10" value={fields.subject} onChange={set('subject')} onBlur={blur('subject')} aria-invalid={!!(touched.subject && errors.subject)} aria-describedby="e-subject">
                          <option value="" disabled>
                            Select subject
                          </option>
                          {contactSubjects.map((s) => (
                            <option key={s.value} value={s.value}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field id="message" label="Message" className="sm:col-span-2" error={touched.message ? errors.message : undefined}>
                        <textarea id="f-message" rows={6} className="field resize-y" placeholder="How can we help you?" value={fields.message} onChange={set('message')} onBlur={blur('message')} aria-invalid={!!(touched.message && errors.message)} aria-describedby="e-message" />
                      </Field>
                    </div>
                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="mono text-[0.8rem] text-ink-soft">
                        Prefer WhatsApp?{' '}
                        <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">
                          {contact.phone}
                        </a>
                      </p>
                      <Button type="submit" size="lg" variant="marigold" magnetic icon={<Send className="size-4" aria-hidden />}>
                        Send message
                      </Button>
                    </div>
                  </m.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}

function Field({ id, label, optional, error, className, children }: { id: string; label: string; optional?: boolean; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={`f-${id}`} className="kicker mb-2 flex items-baseline justify-between text-ink">
        {label}
        {optional && <span className="text-ink-soft normal-case">Optional</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <m.p
            id={`e-${id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pt-2 text-[0.85rem] font-semibold text-clay"
            role="alert"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  )
}
