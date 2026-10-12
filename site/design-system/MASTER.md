# MPEH Design System — "Market Day Editorial"

Source of truth for the site's visual language. Built with the ui-ux-pro-max skill
(styles: *Editorial Grid / Magazine* + a measured dose of *Anti-Polish / Raw*;
landing patterns: *Event/Conference* + *Community*) and 21st.dev Magic pattern research.
The auto-generated palette (purple) and pairing were rejected as off-brand; everything
below was chosen deliberately.

## Idea
A community newspaper crossed with a market-day poster. Official enough to trust with
your CIPC registration; warm and tactile enough to feel like Mitchells Plain, not a template.

## Type
| Role | Family | Use |
| --- | --- | --- |
| Poster display | **Big Shoulders** 800–900, uppercase, tight | Page titles, section titles, big numbers |
| Editorial | **Newsreader** (italic for voice) | Ledes, pull quotes, article titles, card titles |
| UI / body | **Public Sans** | Body copy, nav, buttons, forms |
| Labels | **IBM Plex Mono** | Dates, prices, kickers, stamps, metadata |

## Colour
Three colours, used 60 / 30 / 10: **ivory** base, **evergreen** structure (text, borders,
shadows, buttons, dark bands, the one sage band colour), **gold** highlight (calls to action,
featured items, stickers). Every dark shares the teal's hue. Terracotta — teal's true
complement — is never a surface: hand-drawn marks, stamps and drop caps only.
Service cards rotate gold / card / evergreen / sage / butter; nothing else.

| Token | Hex | Role |
| --- | --- | --- |
| paper | `#F8F4EC` | ivory background |
| paper-2 | `#E8EFE6` | sage — the only alternate band colour; ticket stubs, photo mats |
| card | `#FFFDF8` | cards, form fields |
| ink | `#15201E` | evergreen-black text, borders, hard shadows |
| ink-soft | `#4B5753` | secondary text (6.8:1 on paper) |
| marigold-soft | `#F8E2A6` | butter — soft gold surfaces (resource folders, a service card) |
| marigold | `#E9A520` | brand gold — actions, highlights, progress bar; ink text on it |
| gold-deep | `#7A5605` | gold text on paper |
| teal | `#1D5C55` | labels, info icons, links, focus ring |
| teal-deep / teal-ink | `#12423C` / `#0C2E2A` | primary buttons, dateline, feature bands, footer, menu, curtain |
| teal-soft / teal-mist | `#D5E4D8` / `#E8EFE6` | deeper sage (partners strip, service card) / band |
| clay | `#C2512E` | terracotta pen marks, stamps, drop caps, errors only |

No gradients on text, no glow blobs, no glassmorphism.

## Materials
- 1.5px ink borders, small radii (6–12px), **offset hard shadows** (`4px 4px 0 ink`) that compress on press.
- Tape strips, polaroid frames, perforated ticket stubs, rubber stamps — used where the content is
  literally a photo, a ticket or an approval, never as random decoration.
- Hand-drawn SVG marks (underline, circle) in clay, drawn on scroll-in. No on-page "drag" hints — the medal is discoverable, not instructed.

## Motion (Framer Motion + Lenis)
Everything enters once, the first time it's ~12% into the screen (`inView` in `lib/motion.ts`).
- `Reveal` — fade + slide (`from`: up / down / left / right / scale / fade), 1s expo-out.
- `RevealGroup` + `RevealItem` — cards and rows cascade 70ms apart, rising 36px and settling
  from 98.5% scale.
- `Lines` — poster titles rise line by line out of a mask.
- `Kicker` — section labels: a short rule draws in, then the words slide after it.
- `RevealMedia` — photos wipe open from the bottom while the image settles from a 1.2× zoom;
  `parallax` keeps it drifting gently afterwards (blog feature). Every `Polaroid` uses it.
- `ScrollText` — big statements brighten word by word, tied to scroll position (Home, About,
  Technovation, Flow BPO).
- `ScrollProgress` — marigold hairline along the top of the window.
- Page content sits under `<PresenceContext.Provider value={null}>` in `App.tsx`: the page
  transition's `initial={false}` would otherwise be inherited and silently disable every
  reveal on a direct visit. Don't remove it.
- Signature moments: curtain page transition, hero polaroid collage, sticky stacking
  service cards, scroll-driven market-ticket rail, drag-to-spin
  3D Golden Jubilee medal.
- Transform, opacity and (one-off) clip-path only. No decorative infinite loops.
- `prefers-reduced-motion`: movement is dropped (opacity fades only), photo wipes and
  scroll-linked text render finished, rails become native scroll. `scripts/stuck.mjs` checks
  that no reveal is left hidden; `scripts/static-audit.mjs` lists content that doesn't animate.

## Performance rules
- Framer Motion runs through `LazyMotion` (strict) with `m` components; `domMax` loads in its own
  chunk (−23 KB gz on first load vs. loading features eagerly).
- Lenis is driven by Framer Motion's frame loop (`frame.update`) — one rAF, scroll-linked
  transforms never lag the scroll.
- Animate only `transform`/`opacity`. No height animations on scroll (the header collapses by
  translating), no CSS `filter` on elements that move (slip shadows are static masked shapes).
- No springs layered on scroll-linked values — Lenis already smooths.
- Self-hosted latin woff2 fonts, preloaded; the poster face uses `font-display: block` → CLS 0.
- Images: `<Img>` decodes async and fades in; hero photo is eager + high priority.
- 3D medal: a still render (`public/images/medal-poster.webp`, made by
  `scripts/medal-poster.mjs`) shows instantly; the three.js chunk loads once the page is idle and
  crossfades in at the same pose, then spins once. Renders only on screen, adaptive DPR via
  drei `PerformanceMonitor`. Re-run the poster script after changing the medal.
- Page chunks are prefetched one per idle period.

