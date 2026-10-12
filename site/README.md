# Mitchells Plain Entrepreneurs Hub — website

React 19 + TypeScript + Vite, styled with Tailwind CSS v4, animated with Framer Motion, smooth-scrolled with Lenis, with a real-time 3D Golden Jubilee medal built in React Three Fiber.

Design direction ("Market Day Editorial" — a community newspaper crossed with a market poster) is documented in [`design-system/MASTER.md`](design-system/MASTER.md).

```bash
npm install
npm run dev      # local development
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Deploying

`npm run build` writes the finished site to `dist/` — plain static files, no server code. The live domain is **https://mpeh.co.za** (Apache, cPanel-style hosting).

**cPanel / Apache (mpeh.co.za's current host)**
1. Run `npm run build`.
2. In cPanel File Manager open `public_html`, turn on *Settings → Show Hidden Files*, and remove the old "under construction" page.
3. Upload the **contents** of `dist/` (not the folder itself) into `public_html` — including the hidden `.htaccess`. Uploading a zip of `dist/` and using *Extract* is quickest.
4. Visit https://mpeh.co.za/about directly and refresh: if it loads, `.htaccess` is working.

`dist/.htaccess` (from `public/.htaccess`) sends every page path to `index.html` so links and refreshes work, forces HTTPS, caches the hashed build files for a year and always re-checks the HTML so updates show immediately. A `www → mpeh.co.za` redirect is included but commented out — enable it once the SSL certificate covers both names.

**Netlify / Vercel** work too: `public/_redirects` (Netlify) and `vercel.json` (Vercel) do the same page routing. Build command `npm run build`, publish directory `dist`.

**If the domain changes**, update it in: `SITE_URL` in `src/lib/usePageMeta.ts`, the canonical / `og:` / `twitter:` / JSON-LD tags in `index.html`, `public/robots.txt` and `public/sitemap.xml`.

**SEO & sharing:** per-page titles, descriptions and canonical URLs are set by `usePageMeta`; the 404 page is `noindex`. `og-image.jpg` (1200×630) is the WhatsApp/Facebook/LinkedIn preview. After going live, submit `https://mpeh.co.za/sitemap.xml` in Google Search Console.

## Where things live

| What | Where |
| --- | --- |
| All copy, prices, dates, contact details, links | `src/data/site.ts` |
| Design tokens (colour, type, radii, shadows) | `src/index.css` (`@theme`) |
| Pages | `src/pages/*` |
| Header, nav dropdowns, mobile menu, footer | `src/components/layout/*` |
| Shared UI (buttons, reveals, tilt cards, CTA panel…) | `src/components/ui/*` |
| 3D Golden Jubilee medal (lazy-loaded, pauses off-screen, drag to spin) | `src/components/three/*` |
| Signature interactions: market-ticket rail, story list, till-slip pricing, hand-drawn marks, stamps & polaroids | `src/components/ui/*` |
| Curtain page transition | `src/components/layout/Curtain.tsx` |

The monthly market calendar is date-aware: the homepage, the "next market" chip and the featured event on `/events` automatically show the next upcoming market from `markets2026`.

Every "Get started", "Join waitlist" and "Enquire" button deep-links to `/contact?subject=…&plan=…`, which pre-fills the contact form. The form validates inline and sends through the visitor's email app (`mailto:`). To receive submissions server-side instead, swap `onSubmit` in `src/pages/Contact.tsx` for a form service (Formspree, Netlify Forms, etc.).

## Still needed from the client

- **Downloadable PDFs** → live in `public/downloads/` (copies of the files in `/assets`); the AI Business Bestie Starter Kit and WhatsApp Business Profit Booster are in. The R150 Marketing Plan Template still needs its PDF — add it there and set `href` on its entry in `resources`.
- **Higher-resolution photos**: the images in `public/images/` were extracted from screenshots of the previous site (`scripts/crop.mjs`). Replace them with the originals, keeping the same filenames.

## QA scripts

`scripts/medal-poster.mjs` (re-renders the still Golden Jubilee medal image after changing the 3D medal), `scripts/navshot.mjs` (opens each desktop nav dropdown, screenshots it and prints its position against its link), `scripts/static-audit.mjs` (lists content below the first screen that won't animate in), `scripts/stuck.mjs` (finds scroll reveals left hidden, with and without reduced motion), `scripts/perf.mjs` (CLS, LCP, long tasks and scroll frame pacing per route), `scripts/shoot.mjs` (full-page screenshots per route), `scripts/sections.mjs` (viewport shot of every section — use this for pinned/sticky sections), `scripts/interact.mjs` (dropdown, form, filter, mobile menu and reduced-motion checks) and `scripts/slice.mjs` use `playwright-core` with a locally installed Chrome. Run them against `npm run preview -- --port 5391`.
