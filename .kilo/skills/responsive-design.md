# responsive-design.md

**Purpose:** Keep the experience correct across breakpoints.
**When to use:** Styling, adding sections, testing layouts.

**Rules**
- Mobile-first Tailwind: base = mobile, `md:`/`lg:` for larger. Current design is
  desktop-editorial; ensure it degrades gracefully on small screens.
- Horizontal snap still applies on mobile, but `md:hidden` decorations (parallax
  images) and `hidden md:flex` controls are intentionally desktop-only.
- Don't rely on hover for critical info (touch has no hover) — reveal key content
  without hover where possible.
- Watch the wheel→horizontal hijack on touch: it must not trap mobile scroll
  (see accessibility.md / debugging.md). Touch swipe should work via native snap.

**Do**
- Verify at 375px / 768px / 1440px.
- Hide decorative-only elements on small screens to reduce clutter.

**Don't**
- Don't assume hover; don't force desktop-only patterns on mobile.
- Don't let a section overflow horizontally on mobile (respect `100vw`).

**Checklist**
- [ ] Layout verified at mobile + desktop widths.
- [ ] No hover-only critical content.
- [ ] Touch scrolling/native snap still works.

**References:** See layout-system.md · tailwind-guidelines.md · accessibility.md · performance.md.
