import { m, useScroll } from 'framer-motion'

/** Hairline reading-progress bar along the top edge of the window. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return <m.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-marigold will-change-transform" />
}
