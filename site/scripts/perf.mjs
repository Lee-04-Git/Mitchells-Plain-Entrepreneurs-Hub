// Runtime perf probe: CLS, LCP, long tasks during load, and frame pacing
// during a smooth wheel-scroll through the page. Headless numbers are
// relative (software GPU) — use them to compare builds, not as absolutes.
import { chromium } from 'playwright-core'
const BASE = process.env.BASE ?? 'http://localhost:5391'
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/']
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
for (const r of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  await page.addInitScript(() => {
    window.__perf = { cls: 0, lcp: 0, longTasks: 0, longTaskMs: 0 }
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__perf.cls += e.value })).observe({ type: 'layout-shift', buffered: true })
    new PerformanceObserver((l) => l.getEntries().forEach((e) => (window.__perf.lcp = e.startTime))).observe({ type: 'largest-contentful-paint', buffered: true })
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { window.__perf.longTasks++; window.__perf.longTaskMs += e.duration })).observe({ type: 'longtask', buffered: true })
  })
  await page.goto(BASE + r, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1500)
  const load = await page.evaluate(() => ({ ...window.__perf }))
  // Frame pacing while wheel-scrolling (exercises Lenis + scroll-linked motion).
  await page.evaluate(() => {
    window.__frames = []
    let last = performance.now()
    const tick = (t) => { window.__frames.push(t - last); last = t; if (window.__frames.length < 100000) requestAnimationFrame(tick) }
    requestAnimationFrame(tick)
  })
  for (let i = 0; i < 40; i++) { await page.mouse.wheel(0, 240); await page.waitForTimeout(45) }
  await page.waitForTimeout(800)
  const f = await page.evaluate(() => window.__frames.slice(5))
  f.sort((a, b) => a - b)
  const p = (q) => f[Math.min(f.length - 1, Math.floor(f.length * q))].toFixed(1)
  const janky = f.filter((x) => x > 50).length
  console.log(`${r.padEnd(28)} CLS ${load.cls.toFixed(3)}  LCP ${Math.round(load.lcp)}ms  longTasks ${load.longTasks} (${Math.round(load.longTaskMs)}ms)  frames ${f.length}  p50 ${p(0.5)}ms  p95 ${p(0.95)}ms  >50ms ${janky}`)
  await page.close()
}
await browser.close()
