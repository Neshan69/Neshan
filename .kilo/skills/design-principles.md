# design-principles.md

**Purpose:** The "why" behind the visual language; guides judgment calls.
**When to use:** Making UI decisions not covered by design-system.md.

**Rules**
- Editorial restraint: lots of negative space, large display type, few elements.
- Monochrome base + one accent (cyan `#3cd7ff`). Accent is used sparingly (lines,
  hover, glow shadows `shadow-[0_0_10px_#3cd7ff]`).
- Rhythm & architecture: align to a grid; use hairline borders (`border-outline-variant`).
- Motion is subtle and purposeful (fade-up on activate, slow parallax). See animation-guidelines.md.
- Luxury over utility: thin borders, glass, soft glows — not bright fills.
- Dark-first: surfaces near-black; ensure contrast via `on-surface` tokens.

**Do**
- Favor calm, high-contrast, intentional composition.
- Reuse existing patterns (micro-label style, card frame) before inventing.

**Don't**
- Don't introduce new colors, fonts, or radii outside design-system.md.
- Don't add playful/busy motion that breaks the editorial tone.

**Checklist**
- [ ] Matches dark, monochrome + single cyan accent.
- [ ] Uses established micro-label and card patterns.
- [ ] Motion is subtle and intentional.

**References:** See design-system.md · animation-guidelines.md · tailwind-guidelines.md · accessibility.md.
