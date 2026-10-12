import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import clsx from 'clsx'
import { Magnetic } from './Magnetic'

type Variant = 'ink' | 'marigold' | 'paper' | 'clay' | 'line-light'
type Size = 'sm' | 'md' | 'lg'

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  to?: string
  href?: string
  icon?: 'arrow' | 'external' | 'none' | ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  download?: boolean
  full?: boolean
  magnetic?: boolean
  ariaLabel?: string
}

/*
  Tactile print-style button: ink border + offset hard shadow that
  lifts on hover and compresses on press.
*/
const base =
  'group relative inline-flex select-none items-center justify-center gap-2.5 rounded-md border-[1.5px] font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-200 ease-[var(--ease-out-expo)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[3px] active:translate-y-[3px] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  ink: 'border-ink bg-teal-deep text-paper shadow-[4px_4px_0_var(--color-marigold)] hover:bg-teal-ink hover:shadow-[6px_6px_0_var(--color-marigold)] active:shadow-[1px_1px_0_var(--color-marigold)]',
  marigold: 'border-ink bg-marigold text-ink shadow-[var(--shadow-hard)] hover:shadow-[6px_6px_0_var(--color-ink)] active:shadow-[1px_1px_0_var(--color-ink)]',
  paper: 'border-ink bg-card text-ink shadow-[var(--shadow-hard)] hover:shadow-[6px_6px_0_var(--color-ink)] active:shadow-[1px_1px_0_var(--color-ink)]',
  clay: 'border-ink bg-clay text-paper shadow-[var(--shadow-hard)] hover:shadow-[6px_6px_0_var(--color-ink)] active:shadow-[1px_1px_0_var(--color-ink)]',
  'line-light': 'border-paper/70 bg-transparent text-paper shadow-[4px_4px_0_rgb(247_243_234/0.25)] hover:border-paper hover:bg-paper hover:text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.875rem]',
  md: 'h-12 px-5 text-[0.95rem]',
  lg: 'h-14 px-7 text-[1rem]',
}

export function Button({ children, variant = 'ink', size = 'md', to, href, icon = 'arrow', className, full, magnetic, ariaLabel, ...rest }: Props) {
  const external = !!href && /^https?:/.test(href)
  const resolved = icon === 'arrow' && external ? 'external' : icon
  const glyph =
    resolved === 'arrow' ? (
      <ArrowRight className="size-[1.1em] transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1" aria-hidden />
    ) : resolved === 'external' ? (
      <ArrowUpRight className="size-[1.1em] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
    ) : resolved === 'none' ? null : (
      resolved
    )

  const cls = clsx(base, variants[variant], sizes[size], full && 'w-full', className)
  const inner = (
    <>
      <span>{children}</span>
      {glyph && <span className="-mr-0.5 inline-flex">{glyph}</span>}
    </>
  )

  const el = to ? (
    <Link to={to} className={cls} aria-label={ariaLabel}>
      {inner}
    </Link>
  ) : href ? (
    <a href={href} className={cls} aria-label={ariaLabel} download={rest.download || undefined} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {inner}
    </a>
  ) : (
    <button type={rest.type ?? 'button'} disabled={rest.disabled} onClick={rest.onClick} aria-label={ariaLabel} className={cls}>
      {inner}
    </button>
  )

  return magnetic ? <Magnetic className={full ? 'w-full' : undefined}>{el}</Magnetic> : el
}
