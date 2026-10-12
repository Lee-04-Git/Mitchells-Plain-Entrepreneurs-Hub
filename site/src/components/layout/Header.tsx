import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import clsx from 'clsx'
import { contact, isGroup, markets2026, nav, type NavGroup } from '../../data/site'
import { dateParts, nextMarket } from '../../lib/dates'
import { Logo } from '../ui/Logo'
import { MobileMenu } from './MobileMenu'
import { easeOutExpo } from '../../lib/motion'
import { useMedia } from '../../lib/useMedia'

export function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [compact, setCompact] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setCompact(y > 40)
    if (y > 520 && y > prev + 3 && !open) setHidden(true)
    else if (y < prev - 3) setHidden(false)
  })

  useEffect(() => {
    setOpen(null)
    setMobileOpen(false)
    setHidden(false)
  }, [pathname])

  const desktop = useMedia('(min-width: 768px)')
  const { next, nd, today } = useMemo(() => {
    const next = nextMarket(markets2026)
    return {
      next,
      nd: dateParts(next.date),
      today: new Date().toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    }
  }, [])

  // Transform-only states: the dateline slides up out of view rather than
  // collapsing its height, so scrolling never triggers a re-layout.
  const DATELINE = 36
  const y = hidden && !mobileOpen ? -140 : desktop && (compact || mobileOpen) ? -DATELINE : 0

  return (
    <>
      <m.header
        initial={{ y: -120 }}
        animate={{ y }}
        transition={{ duration: 0.55, ease: easeOutExpo }}
        className="fixed inset-x-0 top-0 z-[70]"
      >
        {/* Dateline */}
        <div className="hidden bg-teal-ink text-paper md:block">
          <div className="wrap flex h-9 items-center justify-between gap-6">
            <p className="kicker truncate text-on-teal-muted">
              Mitchells Plain · Cape Town <span className="mx-2 text-paper/30">|</span> {today}
            </p>
            <div className="flex shrink-0 items-center gap-6">
              <Link to="/events" className="kicker group inline-flex items-center gap-2 text-marigold">
                <span className="inline-block size-1.5 rounded-full bg-marigold" aria-hidden />
                Next market: {next.name} — {nd.weekday.slice(0, 3)} {nd.day} {nd.monthShort}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Link>
              <a href={contact.phoneHref} className="kicker link-ink hidden text-on-teal-muted hover:text-paper lg:inline">
                {contact.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Masthead */}
        <div className={clsx('border-b-[1.5px] transition-colors duration-300', mobileOpen ? 'border-transparent bg-transparent' : 'border-ink bg-paper')}>
          <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
            <Link to="/" aria-label="Mitchells Plain Entrepreneurs Hub — home" className="relative z-10">
              <Logo tone={mobileOpen ? 'light' : 'dark'} />
            </Link>

            <DesktopNav open={open} setOpen={setOpen} pathname={pathname} />

            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className="group hidden h-11 items-center gap-2 rounded-md border-[1.5px] border-ink bg-marigold px-4 text-[0.92rem] font-semibold shadow-[var(--shadow-hard-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[var(--shadow-hard)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none xl:inline-flex"
              >
                Contact
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                className={clsx(
                  'relative flex h-11 items-center gap-2.5 rounded-md border-[1.5px] px-3.5 transition-colors xl:hidden',
                  mobileOpen ? 'border-paper bg-paper text-ink' : 'border-ink bg-ink text-paper',
                )}
              >
                <span className="kicker">{mobileOpen ? 'Close' : 'Menu'}</span>
                <span className="relative block h-2.5 w-4">
                  <m.span className="absolute left-0 h-[1.5px] w-4 bg-current" animate={mobileOpen ? { top: 4, rotate: 45 } : { top: 0, rotate: 0 }} transition={{ duration: 0.35, ease: easeOutExpo }} />
                  <m.span className="absolute left-0 h-[1.5px] w-4 bg-current" animate={mobileOpen ? { top: 4, rotate: -45 } : { top: 8, rotate: 0 }} transition={{ duration: 0.35, ease: easeOutExpo }} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </m.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}

const panelMotion = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: easeOutExpo, staggerChildren: 0.04, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } },
}
const rowMotion = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: easeOutExpo } },
}

/**
 * Dropdown hung from its own trigger: centred under the link, a notch
 * pointing up at it, sized to its content. Rows are rounded; hover
 * fills sage and slides an arrow in.
 */
function Dropdown({ group, id, onNavigate }: { group: NavGroup; id: string; onNavigate: () => void }) {
  return (
    // Outer box positions (CSS translate) and bridges the hover gap; inner box animates.
    <div className="absolute top-full left-1/2 z-10 -translate-x-1/2 pt-5">
      <m.div
        id={id}
        variants={panelMotion}
        initial="hidden"
        animate="show"
        exit="exit"
        className="relative w-max max-w-[21rem] min-w-[15rem] origin-top rounded-xl border-[1.5px] border-ink bg-card p-2 shadow-[5px_5px_0_var(--color-ink)]"
      >
        <span aria-hidden className="absolute -top-[7px] left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-tl-[2px] border-t-[1.5px] border-l-[1.5px] border-ink bg-card" />
        <p className="kicker px-3 pt-1.5 pb-2.5 text-teal">{group.label}</p>
        <ul className="space-y-0.5">
          {group.items.map((it) => {
            return (
              <m.li key={it.to} variants={rowMotion}>
                <NavLink
                  to={it.to}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    clsx(
                      'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-200 hover:bg-teal-mist focus-visible:bg-teal-mist',
                      isActive && 'bg-marigold-soft/60',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <span aria-hidden className="absolute top-2.5 bottom-2.5 left-0 w-[3px] rounded-full bg-marigold" />}
                      <span className="min-w-0 flex-1">
                        <span className="block text-[0.95rem] leading-tight font-semibold">{it.label}</span>
                        <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-soft">{it.description}</span>
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 -translate-x-1 text-teal opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden
                      />
                    </>
                  )}
                </NavLink>
              </m.li>
            )
          })}
        </ul>
      </m.div>
    </div>
  )
}

function DesktopNav({ open, setOpen, pathname }: { open: string | null; setOpen: (v: string | null) => void; pathname: string }) {
  const navRef = useRef<HTMLElement>(null)
  const triggers = useRef<Record<string, HTMLElement | null>>({})
  const closeTimer = useRef<number | undefined>(undefined)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        triggers.current[open]?.focus()
        setOpen(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const show = (label: string) => {
    window.clearTimeout(closeTimer.current)
    setOpen(label)
  }
  const hide = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpen(null), 150)
  }

  const groupActive = (g: NavGroup) => g.items.some((i) => pathname.startsWith(i.to))
  const current = nav.find((e) => (isGroup(e) ? groupActive(e) : pathname.startsWith(e.to)))?.label
  const underlineAt = hovered ?? open ?? current

  const item = 'relative inline-flex h-11 items-center gap-1 px-3.5 text-[0.95rem] font-semibold text-ink'
  const underline = (label: string) =>
    underlineAt === label && (
      <m.span layoutId="nav-underline" className="absolute inset-x-3 bottom-1.5 h-[3px] rounded-full bg-marigold" transition={{ type: 'spring', stiffness: 480, damping: 38 }} />
    )

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="relative hidden xl:block"
      onMouseLeave={() => {
        setHovered(null)
        hide()
      }}
      onBlur={(e) => {
        if (!navRef.current?.contains(e.relatedTarget as Node)) setOpen(null)
      }}
    >
      <ul className="flex items-center">
        {nav.map((entry) =>
          isGroup(entry) ? (
            <li
              key={entry.label}
              className="relative"
              onMouseEnter={() => {
                setHovered(entry.label)
                show(entry.label)
              }}
            >
              <button
                ref={(el) => {
                  triggers.current[entry.label] = el
                }}
                type="button"
                aria-expanded={open === entry.label}
                aria-controls={`nav-${entry.label.toLowerCase()}`}
                onClick={() => (open === entry.label ? setOpen(null) : show(entry.label))}
                className={item}
              >
                {entry.label}
                <ChevronDown className={clsx('size-4 transition-transform duration-300', open === entry.label && 'rotate-180')} aria-hidden />
                {underline(entry.label)}
              </button>
              <AnimatePresence>
                {open === entry.label && <Dropdown group={entry} id={`nav-${entry.label.toLowerCase()}`} onNavigate={() => setOpen(null)} />}
              </AnimatePresence>
            </li>
          ) : (
            <li
              key={entry.label}
              onMouseEnter={() => {
                setHovered(entry.label)
                hide()
              }}
            >
              <NavLink to={entry.to} className={item}>
                {entry.label}
                {underline(entry.label)}
              </NavLink>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}
