import type { Market } from '../data/site'

const parse = (iso: string) => new Date(`${iso}T09:00:00+02:00`)

export const formatLong = (iso: string) =>
  parse(iso).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })

export const dateParts = (iso: string) => {
  const d = parse(iso)
  return {
    day: d.toLocaleDateString('en-ZA', { day: 'numeric' }),
    month: d.toLocaleDateString('en-ZA', { month: 'long' }),
    monthShort: d.toLocaleDateString('en-ZA', { month: 'short' }),
    year: d.getFullYear().toString(),
    weekday: d.toLocaleDateString('en-ZA', { weekday: 'long' }),
  }
}

/** Market day counts as "upcoming" until the end of that day. */
export const isPast = (iso: string, now = new Date()) => parse(iso).getTime() + 15 * 3600_000 < now.getTime()

/** The next market on the calendar, or the final one once the year has run out. */
export function nextMarket(list: Market[], now = new Date()) {
  return list.find((m) => !isPast(m.date, now)) ?? list[list.length - 1]
}

export function daysUntil(iso: string, now = new Date()) {
  const ms = parse(iso).getTime() - now.getTime()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}
