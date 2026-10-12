// Viewport screenshots of each top-level section of a route (sticky-safe).
import { chromium } from 'playwright-core'
const BASE = process.env.BASE ?? 'http://localhost:5391'
const [out, route = '/', w = '1440', h = '900', prefix = 'sec'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: +w, height: +h } })
await page.goto(BASE + route, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const count = await page.evaluate(() => document.querySelectorAll('main > section, main > div > section').length)
for (let i = 0; i < count; i++) {
  await page.evaluate((i) => {
    const el = document.querySelectorAll('main > section, main > div > section')[i]
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 60)
  }, i)
  await page.waitForTimeout(1600)
  await page.screenshot({ path: `${out}/${prefix}-${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 70 })
}
console.log('sections', count)
await browser.close()
