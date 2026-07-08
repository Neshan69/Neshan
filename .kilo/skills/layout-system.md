# layout-system.md

**Purpose:** The horizontal section layout and its rules.
**When to use:** Changing layout, adding a section, fixing scroll/snap.

**Rules**
- `.horizontal-scroller` (in index.css): flex row, `overflow-x:auto`,
  `scroll-snap-type: x mandatory`, full viewport (`100vw`×`100vh`).
- `.section-spread`: `flex: 0 0 100vw`, `scroll-snap-align: start`, centered flex.
  Use `.snap-center-force` (`scroll-snap-align: center`) for the active section feel.
- Each section is exactly one viewport; content is centered vertically/horizontally.
- Fade-in: wrap content in `.section-fade-in`; parent `.active` reveals it.
- Body `overflow:hidden` — vertical scroll is disabled by design.

**Do**
- Add new sections to both the DOM and the `SECTIONS` array in App.jsx.
- Keep section content within `max-w-*` containers for editorial breathing room.

**Don't**
- Don't make a section taller than `100vh` (breaks snap). Use inner scroll (`.work-grid`) if needed.
- Don't fight the snap; respect `scroll-snap-align`.

**Checklist**
- [ ] New section is `100vw`×`100vh` and snap-aligned.
- [ ] Content uses `.section-fade-in` inside an `.active` parent.
- [ ] Inner long content scrolls locally, not the page.

**References:** See architecture.md · responsive-design.md · animation-guidelines.md · accessibility.md.
