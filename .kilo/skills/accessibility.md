# accessibility.md

**Purpose:** Keep the app usable by everyone (WCAG-minded).
**When to use:** Any UI, scroll, form, or media change.

**Rules**
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<section>` with Labels.
  Nav items are `<a>` with `href="#id"` and `onClick` preventDefault + navigate.
- Scroll hijack (`wheel` preventDefault in App) traps keyboard/trackpad users —
  provide ArrowLeft/ArrowRight (done) AND ensure keyboard focus order is logical.
- Color contrast: ink `primary` (#fff) on `surface` (#08080a) passes; verify
  `on-surface-variant` (#a0a0a0) on dark for small text. See design-system.md.
- Images: decorative ones (parallax, moon) use empty `alt=""`; meaningful ones
  (portrait, project) get descriptive `alt`. Currently many use empty alt — fix on edit.
- Forms (Contact): associate `<label>` with inputs; use `placeholder` only as hint.
- Respect `prefers-reduced-motion` for parallax/canvas (animation-guidelines.md).

**Do**
- Add `aria-label` to icon-only controls (arrows, LET'S TALK if icon).
- Ensure focus-visible states; don't remove outlines without replacement.

**Don't**
- Don't disable vertical scrolling without an accessible alternative.
- Don't leave meaningful images with missing/empty alt.

**Checklist**
- [ ] Landmarks + labels present; nav keyboard-operable.
- [ ] Decorative images empty alt; content images described.
- [ ] Form labels associated; reduced-motion handled.

**References:** See layout-system.md · responsive-design.md · design-system.md · forms.md.
