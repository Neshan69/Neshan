# seo.md

**Purpose:** Search/OG/structured-data for the SPA.
**When to use:** Editing index.html, metadata, or adding CMS content.

**Rules**
- `index.html` carries a branded title + `<meta description>` (CONTEXT.md).
  Use brand: "Neshan Niroula | UI/UX Designer & Systems Architect".
- Add Open Graph + Twitter cards for sharing. Add `lang="en"` (present) and theme-color.
- SPA caveat: client-rendered content isn't indexed well. For a portfolio blog/CMS,
  plan SSR or prerender (Vite SSR / static prepass) when content matters (routing.md).
- Structured data: add `JSON-LD` Person/ProfessionalService for the owner.
- Semantic headings: one `<h1>` per view; current Home has the `<h1>` (good).
- Sitemap + robots.txt in `public/` before launch.

**Do**
- Centralize meta in `index.html` now; move to a `<Helmet>`/meta lib with routing.
- Keep a single `<h1>` on the landing view.

**Don't**
- Don't ship without description/OG tags for a public portfolio.
- Don't add multiple `<h1>`s per section.

**Checklist**
- [ ] Title + meta description + OG/Twitter set.
- [ ] JSON-LD present; sitemap/robots planned.
- [ ] Single `<h1>`; semantic headings.

**References:** See routing.md · accessibility.md · deployment.md · backend-roadmap.md.
