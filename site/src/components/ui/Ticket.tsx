import clsx from 'clsx'
import type { Market } from '../../data/site'
import { dateParts, isPast } from '../../lib/dates'
import { Stamp } from './Print'

/**
 * A market-day admission ticket: main body + perforated stub with the
 * date. Past markets get a "Held" stamp; the next one gets "Next up".
 */
export function Ticket({ market, index, next, className }: { market: Market; index: number; next?: boolean; className?: string }) {
  const p = dateParts(market.date)
  const past = isPast(market.date)
  return (
    <article
      className={clsx(
        'relative flex h-full overflow-hidden rounded-[10px] border-[1.5px] border-ink',
        next ? 'bg-marigold' : 'bg-card',
        past && 'saturate-50',
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="kicker text-ink-soft">Market No. {String(index + 1).padStart(2, '0')}</span>
          <span className="kicker">{p.weekday.slice(0, 3)}</span>
        </div>
        <h3 className="serif mt-5 text-[1.45rem] leading-[1.12] font-semibold">{market.name}</h3>
        <p className="mt-2 text-[0.92rem] text-ink-soft">{market.theme}</p>
        <div className="mt-auto pt-6">
          {next && <Stamp rotate={-6}>Next up</Stamp>}
          {past && <Stamp rotate={-10} tone="ink">Held</Stamp>}
        </div>
      </div>

      {/* Perforated stub */}
      <div className={clsx('relative flex w-[5.5rem] shrink-0 flex-col items-center justify-center border-l-[1.5px] border-dashed border-ink/60 text-center sm:w-24', next ? 'bg-marigold' : 'bg-paper-2')}>
        <span aria-hidden className="absolute -top-2.5 -left-2.5 size-5 rounded-full border-[1.5px] border-ink bg-paper" />
        <span aria-hidden className="absolute -bottom-2.5 -left-2.5 size-5 rounded-full border-[1.5px] border-ink bg-paper" />
        <span className="poster text-[3.4rem] leading-none">{p.day}</span>
        <span className="kicker mt-1">{p.monthShort}</span>
        <span className="mono mt-0.5 text-[0.65rem] text-ink-soft">{p.year}</span>
      </div>
    </article>
  )
}
