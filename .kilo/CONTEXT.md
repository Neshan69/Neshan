# CONTEXT.md — Current Implementation Status

Snapshot of the repo as of 2026-07-08. Update after each milestone.

## What exists
- Vite + React 19 SPA, dark editorial theme (brand: Neshan Niroula), horizontal
  snap-scroll experience.
- `src/main.jsx` → `<App/>` (StrictMode). No router, no state library.
- `src/App.jsx`: orchestrates 5 sections, `scrollerRef`, `activeIndex` state,
  `scrollToSection`, keyboard + wheel→horizontal redirection.
- Sections (`src/sections/`): Expertise, Work, Home, About, Contact (pure, `active` prop).
- Components (`src/components/`): Header, NavBar, ShaderBackground (2D canvas glow
  + dark-moon image overlay), Reveal (framer-motion scroll reveal), MicroLabel
  (canonical micro-label), SmartImage (lazy + fallback), ProjectCard.
- `src/hooks/`: usePrefersReducedMotion, useIsVertical.
- `src/index.css`: global layout (`.horizontal-scroller`, `.section-spread`,
  `.glass-nav`, `.work-grid`, `.section-fade-in`, `.parallax-img`), fonts, plus
  reduced-motion + mobile vertical fallback + focus-visible.
- `tailwind.config.js`: dark palette tokens, fonts, `full: 9999px`.
- GitLab remote `origin`; branch `portfolio` pushed (main is protected).

## Known issues / tech debt
- ~~`framer-motion` is a dependency but unused~~ — now adopted via `Reveal`
  (ADR-4 resolved). New code uses `motion` for reveals.
- ~~`index.html` `<title>` is still "portfolio"~~ — branded title + meta
  description, OG/Twitter, theme-color, canonical, JSON-LD, robots/sitemap (seo.md).
- Imagery still hot-linked to `lh3.googleusercontent.com/aida-public` but now
  routed through `SmartImage` with lazy/decode + `/placeholder.svg` fallback
  (asset-management.md ADR-6/ADR-9). Local CDN migration still pending.
- Scroll-hijack (`wheel` preventDefault) now gated to `(pointer: fine)` only and
  a vertical fallback exists for `max-width: 768px` (accessibility.md, ADR-8).
- No tests, no CI, no `.env`. See testing.md, seo.md, deployment.md.
- ~~No responsive fallback for vertical/touch scroll on small screens~~ — vertical
  snap-scroll fallback added (responsive-design.md, ADR-8).

## Missing for roadmap
Backend, DB, auth, REST, CMS, email, analytics, Docker, CI/CD — none started.
See backend-roadmap.md and dependent skills.

## Next recommended step
Migrate hot-linked imagery to local `public/` or a CDN and add tests/CI
(testing.md, asset-management.md ADR-6). Then begin backend-roadmap.md.
