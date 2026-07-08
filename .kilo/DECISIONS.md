# DECISIONS.md — Architectural Decision Records

ADR-style. Append new decisions; never edit history. Format: `## ADR-N: Title`.

## ADR-1: Horizontal snap-scroll SPA (no router)
Single `<main className="horizontal-scroller">` with 5 full-viewport sections.
App.jsx tracks `activeIndex` via scroll position. Chosen for the editorial,
presentation-first feel. Impact: no URL routing; deep-linking/SEO weaker. See
routing.md, seo.md for mitigation.

## ADR-2: Dark-only theme, baked tokens
Dark palette defined directly in `tailwind.config.js` (no `.dark` toggle class).
Simpler; light mode intentionally out of scope. See design-system.md.

## ADR-3: 2D canvas background, not WebGL
`ShaderBackground` uses a lightweight 2D radial-gradient animation + dark-moon
image instead of the earlier WebGL shader. Rationale: smaller bundle, no GL
context cost, matches "softened cyan" brief. See animation-guidelines.md.

## ADR-4: framer-motion adopted (was unused)
Previously installed but unused. Now adopted for scroll reveals via the `Reveal`
component (transform/opacity fade-ins, `whileInView`), and reduced-motion is
honored through `usePrefersReducedMotion` + framer's `useReducedMotion`.
Keeps the dependency justified rather than removed. See animation-guidelines.md,
accessibility.md.

## ADR-5: GitLab main is protected → `portfolio` branch
Force-push to `main` blocked. Work lands on `portfolio`, merged via MR. See
git-workflow.md.

## ADR-6: External image URLs
All imagery sourced from `lh3.googleusercontent.com/aida-public`. Accepted for
prototype speed; must move to local `public/` or CDN before production. See
asset-management.md, image-optimization.md.

## ADR-7: Sections are presentational
Sections receive `active` prop; no internal scroll/state logic. Keeps App as the
single coordination point. See component-rules.md, state-management.md.

## ADR-8: Responsive vertical fallback + fine-pointer wheel hijack
On `max-width: 768px` the horizontal scroller becomes a vertical `scroll-snap`
column so touch users keep native scrolling (responsive-design.md). The wheel→
horizontal redirection is now attached only when `(pointer: fine)` matches, so
touch/trackpad users are never scroll-trapped (accessibility.md). App computes
scroll position/axis from orientation via `useIsVertical`.

## ADR-9: SEO + asset hardening
`index.html` now carries branded title, meta description, OG/Twitter, theme-color,
canonical, and JSON-LD Person. `public/robots.txt` + `sitemap.xml` added; images
route through `SmartImage` with lazy/decode + local `/placeholder.svg` fallback
(asset-management.md ADR-6, image-optimization.md, seo.md).

## ADR-12: Paginated wheel (one section per gesture)
Replaced the raw `scrollBy(deltaY)` wheel handler with a paginated, locked handler
in `App.jsx`. Each wheel gesture advances exactly one section; an 800ms lock ignores
trackpad/mouse momentum so a single fling can't skip to the end. Works for both
axes: vertical wheel pages up/down on the vertical layout and left/right on the
horizontal layout (horizontal trackpad `deltaX` also supported). Still gated to
`(pointer: fine)` so touch keeps native scrolling (accessibility.md, ADR-8).
## ADR-11: Rebrand to "Neshan Niroula"
Rebranded from the generic "Lumina Editorial" studio to the personal portfolio of
Neshan Niroula (UI/UX Designer & Systems Architect). Updates: header/footer/title/
OG/JSON-LD/og-image, Expertise → 4 cards (UI/UX, Frontend, Infrastructure, Security)
in a 2-col grid, Work lead project → "Cyber-Ops Interface" (SECURITY OPERATIONS),
Home subtitle + parallax imagery, About copy + blockquote, and a celestial-shader
image layer added to `ShaderBackground` (dark-moon URL refreshed). Token/architecture
from ADR-8/ADR-9/ADR-10 retained.
## ADR-10: Accent refresh (#0090ae -> #3cd7ff)
Brand accent brightened from softened cyan `#0090ae` to bright cyan `#3cd7ff`
(matching the updated design reference). Token only changed in `tailwind.config.js`
(`secondary`, `secondary-container` -> `#0a5a6e`); all glows/borders propagate via
the token or equivalent `#3cd7ff` literals. Glass nav, work-grid scrollbar, About
badge, Expertise accents, Home badge, canvas glow, and NavBar active border updated.
Content synced: About 2nd paragraph + `border-l-4`, Contact textarea + Instagram.
Docs (design-system.md, design-principles.md, tailwind-guidelines.md, PROJECT.md)
updated to the new token.
