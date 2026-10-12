import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, LazyMotion, MotionConfig, PresenceContext, m, useReducedMotion } from 'framer-motion'
import { Header } from './components/layout/Header'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Footer } from './components/layout/Footer'
import { initSmoothScroll, scrollToTop } from './lib/smoothScroll'
import { Curtain } from './components/layout/Curtain'
import Home from './pages/Home'

/* Inner pages are split out and prefetched once the browser is idle,
   so the first visit stays light and navigation stays instant. */
const loaders = {
  About: () => import('./pages/About'),
  Events: () => import('./pages/Events'),
  BusinessServices: () => import('./pages/BusinessServices'),
  VAServices: () => import('./pages/VAServices'),
  Marketing: () => import('./pages/Marketing'),
  FlowBPO: () => import('./pages/FlowBPO'),
  Courses: () => import('./pages/Courses'),
  Technovation: () => import('./pages/Technovation'),
  Blog: () => import('./pages/Blog'),
  Partners: () => import('./pages/Partners'),
  Resources: () => import('./pages/Resources'),
  Contact: () => import('./pages/Contact'),
  NotFound: () => import('./pages/NotFound'),
}
const About = lazy(loaders.About)
const Events = lazy(loaders.Events)
const BusinessServices = lazy(loaders.BusinessServices)
const VAServices = lazy(loaders.VAServices)
const Marketing = lazy(loaders.Marketing)
const FlowBPO = lazy(loaders.FlowBPO)
const Courses = lazy(loaders.Courses)
const Technovation = lazy(loaders.Technovation)
const Blog = lazy(loaders.Blog)
const Partners = lazy(loaders.Partners)
const Resources = lazy(loaders.Resources)
const Contact = lazy(loaders.Contact)
const NotFound = lazy(loaders.NotFound)

// Animation features load in their own chunk; `m` components stay tiny.
const loadFeatures = () => import('./lib/motionFeatures').then((r) => r.default)

const LABELS: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/events': 'Events',
  '/services/business': 'Business',
  '/services/virtual-assistant': 'VA Services',
  '/services/marketing': 'Marketing',
  '/services/flow-bpo': 'Flow BPO',
  '/programmes/courses': 'Courses',
  '/programmes/technovation': 'Technovation',
  '/blog': 'Blog',
  '/partners': 'Partners',
  '/resources': 'Resources',
  '/contact': 'Contact',
}

export default function App() {
  const location = useLocation()
  const reduce = useReducedMotion()

  useEffect(() => {
    initSmoothScroll()
    // Warm the other pages one chunk per idle period, so prefetching never
    // shows up as a single long main-thread task.
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300))
    const queue = Object.values(loaders)
    const next = () => {
      const load = queue.shift()
      if (load) load().finally(() => idle(next))
    }
    const start = window.setTimeout(() => idle(next), 1500)
    return () => window.clearTimeout(start)
  }, [])

  return (
    <LazyMotion features={loadFeatures} strict>
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-3 left-3 z-[100] -translate-y-24 rounded-md border-[1.5px] border-ink bg-marigold px-5 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollProgress />
        <Header />
      <AnimatePresence mode="wait" initial={false} onExitComplete={scrollToTop}>
        {/* No transform on this wrapper: the curtain inside is position:fixed. */}
        <m.div
          key={location.pathname}
          initial={reduce ? { opacity: 0 } : false}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={reduce ? { opacity: 0, transition: { duration: 0.2 } } : undefined}
        >
          {!reduce && <Curtain label={LABELS[location.pathname] ?? 'MPEH'} />}
          {/* AnimatePresence initial={false} skips the first page's entrance (no curtain on
              arrival) by putting initial:false on PresenceContext — which every motion
              component inside would inherit, silently disabling all scroll reveals on a
              direct visit. Reset it so the page content animates on every load. */}
          <PresenceContext.Provider value={null}>
          <main id="main" className="min-h-svh">
            <Suspense fallback={null}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/services/business" element={<BusinessServices />} />
                <Route path="/services/virtual-assistant" element={<VAServices />} />
                <Route path="/services/marketing" element={<Marketing />} />
                <Route path="/services/flow-bpo" element={<FlowBPO />} />
                <Route path="/programmes/courses" element={<Courses />} />
                <Route path="/programmes/technovation" element={<Technovation />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          </PresenceContext.Provider>
        </m.div>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
    </LazyMotion>
  )
}
