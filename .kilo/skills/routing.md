# routing.md

**Purpose:** Navigation strategy (currently none; planned).
**When to use:** Adding URLs, deep links, or multiple "pages".

**Rules**
- Today: no router. `App.jsx` switches sections via `activeIndex` (architecture.md).
- Only add a router (React Router) when the app needs real routes (blog/CMS, admin,
  auth pages). Don't add it for the 5-section scroll.
- If added: keep section scroll as the home experience; use routes for
  `/work/:slug`, `/admin`, `/login`. Lazy-load route chunks (performance.md).
- Preserve the horizontal scroll feel for the landing; don't force vertical routing
  on the hero.

**Do**
- Justify the router with a roadmap need before installing it.
- Lazy-load non-landing routes to protect bundle size.

**Don't**
- Don't install React Router "just in case".
- Don't break the editorial home scroll when routes are introduced.

**Checklist**
- [ ] Router justified by a concrete need.
- [ ] Route chunks code-split.
- [ ] Home scroll experience preserved.

**References:** See architecture.md · performance.md · project-roadmap.md · backend-roadmap.md.
