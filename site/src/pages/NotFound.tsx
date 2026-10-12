import { useEffect } from 'react'
import { m } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { Marked } from '../components/ui/Marks'
import { Stamp } from '../components/ui/Print'
import { usePageMeta } from '../lib/usePageMeta'

export default function NotFound() {
  usePageMeta('Page not found')
  // The host serves index.html (status 200) for unknown paths, so tell search
  // engines not to index this page as if it were real content.
  useEffect(() => {
    const tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex'
    document.head.appendChild(tag)
    return () => tag.remove()
  }, [])
  return (
    <section className="paper-noise grid min-h-[100svh] place-items-center pt-32 pb-20">
      <div className="wrap text-center">
        <m.p
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ type: 'spring', stiffness: 160, damping: 14 }}
          className="poster mx-auto w-fit rounded-md border-[1.5px] border-ink bg-marigold px-6 pt-3 text-[clamp(7rem,22vw,16rem)] shadow-[var(--shadow-hard-lg)]"
        >
          404
        </m.p>
        <div className="mt-8">
          <Stamp rotate={4}>Page not found</Stamp>
        </div>
        <h1 className="serif mx-auto mt-8 max-w-xl text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight font-semibold">
          This page has <Marked>wandered off</Marked> to the market.
        </h1>
        <div className="mt-10 flex justify-center gap-4">
          <Button to="/" variant="ink" magnetic>
            Back home
          </Button>
          <Button to="/contact" variant="paper" icon="none">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  )
}
