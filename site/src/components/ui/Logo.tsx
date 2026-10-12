import clsx from 'clsx'

/**
 * MPEH lockup: the official gold badge (public/images/mpeh-logo.webp,
 * cut from assets/MPEH-Logo.png) + poster wordmark + full name. The badge's
 * own lettering is too fine to read at header size, so the wordmark stays.
 */
export function Logo({ tone = 'dark', compact, className }: { tone?: 'dark' | 'light'; compact?: boolean; className?: string }) {
  return (
    <span className={clsx('inline-flex items-center gap-3', className)}>
      <img src="/images/mpeh-logo.webp" alt="" width={168} height={168} decoding="async" draggable={false} className="size-14 shrink-0 select-none" />
      <span className="flex flex-col leading-none">
        <span className={clsx('poster text-[1.9rem]', tone === 'dark' ? 'text-ink' : 'text-paper')}>MPEH</span>
        {!compact && (
          <span className={clsx('mono mt-0.5 text-[0.6rem] tracking-[0.06em] uppercase', tone === 'dark' ? 'text-ink-soft' : 'text-on-ink-muted')}>
            Mitchells Plain Entrepreneurs Hub
          </span>
        )}
      </span>
    </span>
  )
}
