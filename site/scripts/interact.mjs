import { chromium } from 'playwright-core'
const BASE = process.env.BASE ?? 'http://localhost:5391'
const S = process.argv[2]
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const errors = []
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('pageerror', (e) => errors.push(e.message))

// 1. Dropdown on an inner page
await page.goto(BASE + '/about', { waitUntil: 'networkidle' }); await page.waitForTimeout(900)
await page.hover('nav[aria-label="Primary"] button:has-text("Services")'); await page.waitForTimeout(700)
await page.screenshot({ path: `${S}/i-dropdown.png`, clip: { x: 300, y: 0, width: 900, height: 420 } })
await page.hover('nav[aria-label="Primary"] button:has-text("Programmes")'); await page.waitForTimeout(700)
await page.screenshot({ path: `${S}/i-dropdown2.png`, clip: { x: 300, y: 0, width: 900, height: 420 } })
await page.click('#nav-programmes a:has-text("Courses")'); await page.waitForTimeout(1400)
console.log('nav ->', page.url(), '| title:', await page.title())

// 2. Pricing CTA prefill + validation
await page.goto(BASE + '/services/virtual-assistant', { waitUntil: 'networkidle' }); await page.waitForTimeout(800)
await page.click('a:has-text("Get started") >> nth=1'); await page.waitForTimeout(1400)
console.log('prefill ->', page.url())
console.log('subject:', await page.inputValue('#f-subject'), '| message:', JSON.stringify(await page.inputValue('#f-message')))
await page.fill('#f-message', '')
await page.click('button[type=submit]'); await page.waitForTimeout(600)
console.log('errors shown:', await page.locator('[role=alert]').allTextContents())
console.log('focused:', await page.evaluate(() => document.activeElement?.id))

// 3. Blog filter
await page.goto(BASE + '/blog', { waitUntil: 'networkidle' }); await page.waitForTimeout(800)
await page.click('button[role=tab]:has-text("Marketing Hacks")'); await page.waitForTimeout(900)
console.log('blog items after filter:', await page.locator('main ul > li').count())

// 4. Mobile menu open/close
const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
await m.goto(BASE + '/', { waitUntil: 'networkidle' }); await m.waitForTimeout(800)
await m.tap('button[aria-controls="mobile-menu"]'); await m.waitForTimeout(1200)
await m.screenshot({ path: `${S}/i-menu-open.png` })
await m.tap('button[aria-label="Close menu"]'); await m.waitForTimeout(1200)
console.log('menu closed:', await m.locator('#mobile-menu').count() === 0)

// 5. Reduced motion
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
const r = await ctx.newPage()
await r.goto(BASE + '/', { waitUntil: 'networkidle' }); await r.waitForTimeout(1200)
console.log('reduced: lenis class?', await r.evaluate(() => document.documentElement.className || '(none)'))
await r.evaluate(() => window.scrollTo(0, 2400)); await r.waitForTimeout(900)
await r.screenshot({ path: `${S}/i-reduced.png` })
console.log('page errors:', errors)
await browser.close()
