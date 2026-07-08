# performance.md

**Purpose:** Production performance discipline.
**When to use:** Any change that affects bundle, render, or load.

**Rules**
- Bundle: prefer Tailwind utilities (purged) over CSS; avoid unused deps
  (framer-motion currently unused — dependency-management.md). Tree-shake imports.
- Code-split future routes/features (routing.md, backend-roadmap.md).
- Render: keep App effect light; throttle scroll with rAF (animation-guidelines.md).
  Avoid re-rendering all sections — only the active one changes (`active` prop).
- Canvas: `ShaderBackground` is 2D and cheap; cap DPR, pause when tab hidden.
- Measure: `npm run build` + check gzipped JS/CSS sizes; set a budget and watch it.
- Images: see image-optimization.md. Fonts: `display=swap`, subset if possible.

**Do**
- Run `npm run build` and review sizes after meaningful changes.
- Use `React.memo` only where profiling shows a win.

**Don't**
- Don't add a dependency to "optimize" without measuring first.
- Don't animate layout properties (animation-guidelines.md).

**Checklist**
- [ ] Build sizes reviewed; no unused deps.
- [ ] Scroll/canvas work is throttled and tab-aware.
- [ ] LCP/LCP image path optimized.

**References:** See image-optimization.md · animation-guidelines.md · dependency-management.md · testing.md.
