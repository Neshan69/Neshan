# design-system.md

**Purpose:** Canonical visual tokens. Source of truth for theming.
**When to use:** Styling anything, adding a token, theming a new section.

**Rules**
- Colors (in `tailwind.config.js`, never inline hex): surface `#08080a`,
  surface-container `#0c0c0e`, primary `#ffffff` (ink), on-surface `#e2e2e2`,
  on-surface-variant `#a0a0a0`, secondary `#3cd7ff` (accent), secondary-container
  `#0a5a6e`, outline `#45474a`, outline-variant `#2c2c2e`.
- Fonts: `display` = Playfair Display (headings), `body`/`label` = Inter.
- Radii: `full` = `9999px` (pills). Use tokens, not raw values.
- Micro-labels: `text-[10px] font-bold tracking-widest uppercase` in `secondary`/muted.
- Imagery: grayscale + `brightness-75`, full on hover; thin `border-white/5` frames.
- Glass chrome: `glass-nav` (blur + dark translucent + cyan border). See index.css.

**Do**
- Add new brand values to tailwind.config.js, then use the utility.

**Don't**
- Don't hard-code `#3cd7ff` etc. in className strings — use `secondary`.

**Checklist**
- [ ] Every color is a token, not a literal.
- [ ] Headings use `font-display`; body uses `font-body`.
- [ ] Accent is `secondary`, never a new hue.

**References:** See design-principles.md · tailwind-guidelines.md · accessibility.md · folder-structure.md.
