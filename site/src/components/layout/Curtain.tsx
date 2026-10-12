import { m } from 'framer-motion'
import { easeInOut, easeOutExpo } from '../../lib/motion'

const COLS = 5

/**
 * Stair-step page curtain. Lives inside each keyed page wrapper:
 *  - on exit, ink columns sweep up to cover the old page;
 *  - on enter, the new page starts covered and the columns lift away,
 *    carrying the destination's name.
 * Exit (~0.6s) runs faster than enter (~0.9s).
 */
export function Curtain({ label }: { label: string }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] flex">
      {Array.from({ length: COLS }, (_, i) => (
        <div key={i} className="relative h-full flex-1">
          {/* covers the outgoing page */}
          <m.div
            className="absolute inset-0 origin-bottom bg-teal-ink"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1, transition: { duration: 0.42, ease: easeInOut, delay: i * 0.04 } }}
          />
          {/* reveals the incoming page */}
          <m.div
            className="absolute inset-0 origin-top bg-teal-ink"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0, transition: { duration: 0.62, ease: easeInOut, delay: 0.18 + i * 0.05 } }}
            exit={{ scaleY: 0, transition: { duration: 0 } }}
          />
        </div>
      ))}
      <m.p
        className="poster absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(3rem,10vw,9rem)] text-marigold"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0, y: -70, transition: { duration: 0.4, ease: easeOutExpo, delay: 0.38 } }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
      >
        {label}
      </m.p>
    </div>
  )
}
