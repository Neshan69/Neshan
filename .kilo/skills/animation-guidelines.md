# animation-guidelines.md

**Purpose:** Motion rules consistent with the editorial tone.
**When to use:** Adding transitions, parallax, reveals, canvas effects.

**Rules**
- Reveal: `.section-fade-in` (opacity + 20px translateY, 1s cubic-bezier ease-out)
  triggered by parent `.active`. Prefer this over bespoke reveals.
- Parallax: `.parallax-img` with slow `transform` transition (0.8s). Home computes
  offset from `getBoundingClientRect` on scroll; keep it requestAnimationFrame-throttled.
- Background: `ShaderBackground` is a 2D canvas (soft cyan radial glows) + dark-moon
  image. Keep it cheap; no WebGL unless justified (DECISIONS ADR-3).
- Hover micro-interactions only (grayscale→color, scale-105, translate-x on arrows).
- Respect `prefers-reduced-motion` for any non-essential motion (accessibility.md).

**Do**
- Reuse existing transition classes; add a token in tailwind.config.js if repeated.
- Throttle scroll-driven transforms with rAF.

**Don't**
- Don't add bouncy/playful easing that breaks the calm editorial feel.
- Don't animate layout properties (width/height/top) — use transform/opacity.

**Checklist**
- [ ] Motion subtle, transform/opacity based.
- [ ] Scroll-driven updates are rAF-throttled.
- [ ] Reduced-motion considered.

**References:** See design-principles.md · layout-system.md · performance.md · accessibility.md.
