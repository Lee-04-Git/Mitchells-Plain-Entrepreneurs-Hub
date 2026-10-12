import clsx from 'clsx'
import type { Offer, Plan } from '../../data/site'
import { RevealGroup, RevealItem } from './Reveal'
import { IconTile } from './IconTile'
import { Button } from './Button'
import { Stamp } from './Print'
import { TiltCard } from './TiltCard'

/**
 * A service index set like a newspaper column grid: ruled cells, a
 * poster numeral, serif title. Hover floods the cell with marigold.
 */
export function OfferGrid({ offers, cols = 3 }: { offers: Offer[]; cols?: 2 | 3 | 4 }) {
  return (
    <RevealGroup
      className={clsx(
        'grid border-t-[1.5px] border-l-[1.5px] border-ink sm:grid-cols-2',
        cols === 3 && 'lg:grid-cols-3',
        cols === 4 && 'lg:grid-cols-4',
      )}
    >
      {offers.map((o, i) => (
        <RevealItem key={o.title} className="group relative isolate overflow-hidden border-r-[1.5px] border-b-[1.5px] border-ink bg-card">
          <span aria-hidden className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-marigold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
          <div className="flex h-full flex-col p-7 md:p-8">
            <div className="flex items-start justify-between">
              <span className="poster text-[3.25rem] text-ink/15 transition-colors duration-500 group-hover:text-ink/30">{String(i + 1).padStart(2, '0')}</span>
              <IconTile icon={o.icon} tone="paper" size="sm" className="transition-transform duration-500 group-hover:-rotate-6" />
            </div>
            <h3 className="serif mt-8 text-[1.5rem] leading-tight font-semibold">{o.title}</h3>
            <p className="mt-3 text-[0.98rem] leading-relaxed text-ink-soft">{o.text}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  )
}

/**
 * Pricing as a printed till slip: torn edges, dotted leaders, a total
 * line. The popular plan is printed on marigold and stamped.
 */
export function PriceSlip({ plan, cta, ctaTo, index }: { plan: Plan; cta: string; ctaTo: string; index: number }) {
  const featured = !!plan.popular
  return (
    <TiltCard max={4} glare={false} className="h-full">
      <div className={clsx('relative h-full', featured && 'lg:-translate-y-4')}>
        {/* Static offset shadow cut with the same torn mask — a CSS drop-shadow
            filter here would be re-rasterised on every tilt frame. */}
        <div aria-hidden className="receipt absolute inset-0 translate-x-[5px] translate-y-[6px] bg-ink" />
        <article className={clsx('receipt relative flex h-full flex-col px-7 pt-10 pb-12', featured ? 'bg-marigold' : 'bg-card')}>
          <div className="flex items-center justify-between">
            <span className="kicker">MPEH · Slip {String(index + 1).padStart(3, '0')}</span>
            {featured && <Stamp rotate={8}>Most popular</Stamp>}
          </div>
          <h3 className="poster mt-6 text-[2.4rem]">{plan.name}</h3>
          <div className="mt-5 border-y-[1.5px] border-dashed border-ink py-4">
            <p className="flex items-baseline justify-between gap-3">
              <span className="poster text-[3.6rem] leading-none">{plan.price}</span>
              <span className="mono text-[0.85rem]">{plan.unit}</span>
            </p>
            {plan.hours && <p className="mono mt-2 text-[0.8rem]">{plan.hours}</p>}
          </div>
          {plan.bestFor && <p className="serif mt-5 text-[1.05rem] leading-snug italic">Best for: {plan.bestFor}</p>}
          <ul className="mt-6 flex-1 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="mono flex items-baseline gap-2 text-[0.8rem] leading-snug">
                <span aria-hidden>+</span>
                <span className="flex-1">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mono mt-7 flex items-baseline justify-between border-t-[1.5px] border-ink pt-3 text-[0.85rem] font-semibold">
            <span>TOTAL</span>
            <span>
              {plan.price}
              {plan.unit}
            </span>
          </div>
          <div className="mt-7">
            <Button to={ctaTo} variant={featured ? 'ink' : 'marigold'} full>
              {cta}
            </Button>
          </div>
        </article>
      </div>
    </TiltCard>
  )
}
