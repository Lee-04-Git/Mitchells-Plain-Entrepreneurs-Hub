// Opens each desktop nav dropdown and screenshots the header area.
// usage: node scripts/navshot.mjs <outDir> [width]
import { chromium } from 'playwright-core'
const [out, w = '1440'] = process.argv.slice(2)
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const p = await b.newPage({ viewport: { width: +w, height: 700 } })
await p.goto(process.env.BASE ?? 'http://localhost:5390/', { waitUntil: 'networkidle' })
await p.waitForTimeout(1500)
for (const label of ['Services', 'Programmes', 'Media']) {
  const btn = p.locator('nav[aria-label=Primary] button', { hasText: label })
  await btn.hover()
  await p.waitForTimeout(700)
  const t = await btn.boundingBox()
  const panel = await p.locator('[id^=nav-]').first().boundingBox().catch(() => null)
  console.log(label, 'trigger', Math.round(t.x), Math.round(t.x + t.width), 'panel', panel && [Math.round(panel.x), Math.round(panel.x + panel.width)])
  await p.screenshot({ path: `${out}/${label}-${w}.png`, clip: { x: 0, y: 0, width: +w, height: 520 } })
  // Hover the second row to capture the hover state.
  const row = p.locator('[id^=nav-] li a').nth(1)
  if (await row.count()) { await row.hover(); await p.waitForTimeout(400); await p.screenshot({ path: `${out}/${label}-${w}-hover.png`, clip: { x: 0, y: 0, width: +w, height: 520 } }) }
  await p.mouse.move(5, 650)
  await p.waitForTimeout(500)
}
await b.close()
