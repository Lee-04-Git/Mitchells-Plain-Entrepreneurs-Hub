import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'

/** Square, ink-bordered icon block — the one icon treatment used site-wide. */
export function IconTile({ icon: Icon, tone = 'marigold', size = 'md', className }: { icon: LucideIcon; tone?: 'marigold' | 'paper' | 'ink' | 'clay'; size?: 'sm' | 'md' | 'lg'; className?: string }) {
  return (
    <span
      className={clsx(
        'inline-grid shrink-0 place-items-center rounded-md border-[1.5px] border-ink',
        size === 'sm' && 'size-10',
        size === 'md' && 'size-12',
        size === 'lg' && 'size-14',
        tone === 'marigold' && 'bg-marigold text-ink',
        tone === 'paper' && 'bg-card text-ink',
        tone === 'ink' && 'bg-ink text-marigold',
        tone === 'clay' && 'bg-clay text-paper',
        className,
      )}
    >
      <Icon className={clsx(size === 'sm' ? 'size-[18px]' : size === 'lg' ? 'size-6' : 'size-[22px]')} strokeWidth={1.75} aria-hidden />
    </span>
  )
}
