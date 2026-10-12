import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, m } from 'framer-motion'
import { ArrowUpRight, Mail, Phone, Plus } from 'lucide-react'
import clsx from 'clsx'
import { contact, isGroup, nav } from '../../data/site'
import { setScrollLocked } from '../../lib/smoothScroll'
import { easeInOut, easeOutExpo } from '../../lib/motion'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setScrollLocked(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const t = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('a,button')?.focus(), 450)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(t)
    }
  }, [open, onClose])

  const items = [{ label: 'Home', to: '/' }, ...nav, { label: 'Contact', to: '/contact' }]

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.6, ease: easeInOut } }}
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.45, ease: easeInOut, delay: 0.08 } }}
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-teal-ink text-paper xl:hidden"
        >
          <nav aria-label="Mobile" className="wrap flex-1 pt-24 pb-10">
            <m.ul
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ hidden: { transition: { staggerChildren: 0.025, staggerDirection: -1 } }, show: { transition: { staggerChildren: 0.045, delayChildren: 0.2 } } }}
              className="border-t border-paper/25"
            >
              {items.map((entry, i) => (
                <m.li
                  key={entry.label}
                  className="border-b border-paper/25"
                  variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } } }}
                >
                  {isGroup(entry) ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded === entry.label}
                        onClick={() => setExpanded((v) => (v === entry.label ? null : entry.label))}
                        className="flex w-full items-center justify-between py-3.5 text-left"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="kicker w-6 text-marigold">{String(i + 1).padStart(2, '0')}</span>
                          <span className="poster text-[2.6rem]">{entry.label}</span>
                        </span>
                        <Plus className={clsx('size-6 text-marigold transition-transform duration-500', expanded === entry.label && 'rotate-45')} aria-hidden />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === entry.label && (
                          <m.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: easeOutExpo }}
                            className="overflow-hidden pl-10"
                          >
                            {entry.items.map((it) => (
                              <li key={it.to}>
                                <NavLink to={it.to} onClick={onClose} className={({ isActive }) => clsx('flex items-center justify-between py-3 pr-1', isActive && 'text-marigold')}>
                                  <span>
                                    <span className="serif block text-[1.2rem] font-semibold">{it.label}</span>
                                    <span className="mono block text-[0.75rem] text-on-teal-muted">{it.description}</span>
                                  </span>
                                  <ArrowUpRight className="size-4 opacity-60" aria-hidden />
                                </NavLink>
                              </li>
                            ))}
                            <li className="h-3" aria-hidden />
                          </m.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink to={entry.to} end={entry.to === '/'} onClick={onClose} className={({ isActive }) => clsx('flex items-baseline gap-4 py-3.5', isActive && 'text-marigold')}>
                      <span className="kicker w-6 text-marigold">{String(i + 1).padStart(2, '0')}</span>
                      <span className="poster text-[2.6rem]">{entry.label}</span>
                    </NavLink>
                  )}
                </m.li>
              ))}
            </m.ul>

            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6, ease: easeOutExpo } }}
              exit={{ opacity: 0 }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              <a href={`mailto:${contact.email}`} className="flex items-center gap-3 rounded-md border-[1.5px] border-paper/30 p-4">
                <Mail className="size-5 text-marigold" aria-hidden /> {contact.email}
              </a>
              <a href={contact.phoneHref} className="flex items-center gap-3 rounded-md border-[1.5px] border-paper/30 p-4">
                <Phone className="size-5 text-marigold" aria-hidden /> {contact.phone}
              </a>
            </m.div>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  )
}
