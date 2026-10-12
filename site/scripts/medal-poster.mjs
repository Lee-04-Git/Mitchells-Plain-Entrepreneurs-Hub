// Renders public/images/medal-poster.webp from the live 3D medal in its
// resting pose (reduced motion = no spin). Re-run after changing the medal.
// Needs `npm run preview -- --port 5391`.
import { chromium } from 'playwright-core'
import sharp from 'sharp'
const b = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' })
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: 'reduce' })
await p.goto('http://localhost:5391/events', { waitUntil: 'networkidle' })
const sel = '[aria-label^="3D commemorative medal"]'
await p.locator(sel).scrollIntoViewIfNeeded()
await p.waitForFunction((sel) => document.querySelector(`${sel} img`)?.classList.contains('opacity-0'), sel, { timeout: 30000 })
await p.waitForTimeout(2500)
await p.addStyleTag({ content: `html, body, section, main { background: transparent !important; } ${sel} img { display: none !important; } ${sel} ~ * { display: none !important; }` })
await p.waitForTimeout(300)
const shot = await p.locator(sel).screenshot({ omitBackground: true })
const { width, height } = await sharp(shot).metadata()
await sharp(shot)
  .extract({ left: Math.round((width - height) / 2), top: 0, width: height, height })
  .webp({ quality: 86, alphaQuality: 90, effort: 6 })
  .toFile('public/images/medal-poster.webp')
console.log('poster', height + 'px square')
await b.close()
