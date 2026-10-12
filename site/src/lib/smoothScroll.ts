import Lenis from 'lenis'
import { cancelFrame, frame } from 'framer-motion'

let lenis: Lenis | null = null

/**
 * Lenis smooth scrolling, driven by Framer Motion's frame loop instead of
 * its own requestAnimationFrame. One loop for both means scroll-linked
 * transforms (useScroll) read the same scroll position Lenis just wrote —
 * no one-frame lag, no doubled rAF work.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  lenis = new Lenis({ autoRaf: false, lerp: 0.12, wheelMultiplier: 1, touchMultiplier: 1.2, anchors: { offset: -96 } })
  const update = ({ timestamp }: { timestamp: number }) => lenis?.raf(timestamp)
  frame.update(update, true)

  // Pause the loop work entirely while the tab is hidden.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelFrame(update)
    else frame.update(update, true)
  })
  return lenis
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo(0, 0)
}

export function smoothScrollTo(target: number | HTMLElement) {
  if (lenis) return lenis.scrollTo(target, { duration: 1.4 })
  const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY
  window.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

export function setScrollLocked(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}
