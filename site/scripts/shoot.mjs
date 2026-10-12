// Visual QA: full-page screenshots of each route at a given viewport.
// usage: node scripts/shoot.mjs <outDir> <width> <height> [routes...]
import { chromium } from 'playwright-core'
const BASE = process.env.BASE ?? 'http://localhost:5391'
const [out, w = '1440', h = '900', ...routes] = process.argv.slice(2)
const list = routes.length ? routes : ['/']
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
for (const r of list) {
  await page.goto(BASE + '' + r, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800)
  // Scroll through so whileInView reveals fire, then back to top.
  const H = await page.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y < H; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(250) }
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(900)
  const hidden = await page.evaluate(() => [...document.querySelectorAll('main *')].filter((el) => getComputedStyle(el).opacity === '0' && el.getBoundingClientRect().height > 20).map((el) => el.tagName + '.' + (el.className?.toString?.() ?? '').slice(0, 40)))
  console.log('hidden after scroll:', hidden.length, hidden.slice(0, 6))
  const name = r === '/' ? 'home' : r.slice(1).replace(/\//g, '_')
  await page.screenshot({ path: `${out}/${name}-${w}.png`, fullPage: true })
  console.log('shot', name)
}
console.log('errors:', JSON.stringify(errors, null, 1))
await browser.close()
