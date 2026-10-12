// Lists content below the first screen that will NOT animate in on scroll:
// visible blocks with no ancestor or descendant waiting on a reveal.
import { chromium } from 'playwright-core'
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/about', '/events', '/services/business', '/services/marketing', '/services/virtual-assistant', '/services/flow-bpo', '/programmes/courses', '/programmes/technovation', '/blog', '/resources', '/partners', '/contact']
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
let total = 0
for (const r of routes) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } })
  await p.goto('http://localhost:5391' + r, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1200)
  const found = await p.evaluate(() => {
    const pending = (el) => {
      for (let n = el; n && n !== document.body; n = n.parentElement) {
        const o = n.style?.opacity
        if (o !== undefined && o !== '' && parseFloat(o) < 1) return true
        if (n.style?.clipPath && n.style.clipPath.startsWith('inset(1')) return true
        const t = n.style?.transform
        if (t && /translate[XY]?\((?!0px|0%)/.test(t) && n.closest('[style*="opacity"]')) return true
      }
      // Animated from inside: masked title lines, label rules, words of a scroll statement.
      for (const n of el.querySelectorAll('[style]')) {
        const o = n.style.opacity
        if (o !== '' && parseFloat(o) < 1) return true
        if (/translate[XY]?\((?!0px|0%)[^)]+\)/.test(n.style.transform) || /scale[X]?\(0\)/.test(n.style.transform)) return true
      }
      return false
    }
    const sel = 'main p, main h1, main h2, main h3, main blockquote, main img, main figure, main article, main li, main form, main a.rounded-md, main button, footer p, footer h2, footer li, footer h3'
    const out = []
    for (const el of document.querySelectorAll(sel)) {
      const rect = el.getBoundingClientRect()
      if (rect.top < innerHeight * 1.05 || rect.width < 8 || rect.height < 8) continue
      if (getComputedStyle(el).visibility === 'hidden') continue
      if (pending(el)) continue
      if (out.some((o) => o.el.contains(el))) continue
      out.push({ el, d: `${el.tagName.toLowerCase()} @${Math.round(rect.top)} "${(el.textContent || el.getAttribute('alt') || '').trim().replace(/\s+/g, ' ').slice(0, 50)}"` })
    }
    return out.map((o) => o.d)
  })
  total += found.length
  console.log(`${r} — ${found.length} static`)
  found.slice(0, 40).forEach((d) => console.log('   ', d))
  await p.close()
}
console.log('TOTAL static blocks:', total)
await b.close()
