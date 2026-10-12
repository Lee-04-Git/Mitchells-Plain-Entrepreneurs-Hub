// Scrolls each route top→bottom, then lists anything still faded or clipped
// (a reveal that never fired), with and without reduced motion.
import { chromium } from 'playwright-core'
const routes = ['/', '/about', '/events', '/services/business', '/services/marketing', '/services/virtual-assistant', '/services/flow-bpo', '/programmes/courses', '/programmes/technovation', '/blog', '/resources', '/partners', '/contact']
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const hidden = () =>
  [...document.querySelectorAll('main *')].filter((el) => {
    const r = el.getBoundingClientRect()
    if (r.width < 4 || r.height < 4) return false
    const cs = getComputedStyle(el)
    return (el.style.opacity !== '' && parseFloat(cs.opacity) < 0.9) || (cs.clipPath.startsWith('inset') && !/^inset\((0(%|px)\s*)+\)$/.test(cs.clipPath))
  }).map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 50)} "${el.textContent.trim().slice(0, 30)}"`)
for (const reduced of [false, true]) {
  let total = 0
  for (const r of routes) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: reduced ? 'reduce' : 'no-preference' })
    const errs = []
    p.on('pageerror', (e) => errs.push(e.message))
    await p.goto('http://localhost:5391' + r, { waitUntil: 'networkidle' })
    const h = await p.evaluate(() => document.body.scrollHeight)
    for (let y = 0; y < h; y += 400) { await p.mouse.wheel(0, 400); await p.waitForTimeout(120) }
    await p.waitForTimeout(2500)
    const list = await p.evaluate(hidden)
    total += list.length
    if (list.length || errs.length) console.log(reduced ? '[reduced]' : '[motion]', r, list.slice(0, 6), errs)
    await p.close()
  }
  console.log(reduced ? 'reduced motion' : 'with motion', '— stuck elements:', total)
}
await b.close()
