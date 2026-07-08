# architecture.md

**Purpose:** Describe runtime structure and data flow.
**When to use:** Planning changes, adding modules, debugging data flow.

**Rules**
- Single coordinator: `src/App.jsx` owns `scrollerRef` + `activeIndex` and scroll/nav logic.
- Sections are presentational: receive `active`/`scrollerRef` props, hold no scroll state.
- Components in `src/components/` are shared chrome (Header, NavBar, ShaderBackground).
- No router, no global store yet (see routing.md, state-management.md for future).

**Data flow**
`wheel/keyboard/scroll` → App computes `activeIndex` → passes `active` to each section →
section toggles `.active` class → CSS fades content in. NavBar receives `activeIndex` +
`onNavigate`.

**Do**
- Keep App as the single source of scroll/active truth.
- Pass data down via props; lift shared state to App.

**Don't**
- Don't put scroll/position logic inside a section.
- Don't introduce a router unless implementing routing.md.

**Checklist**
- [ ] New section added to `SECTIONS` array in App.jsx.
- [ ] New section receives `active` and toggles `.active`.
- [ ] Shared state stays in App.

**References:** See folder-structure.md · component-rules.md · state-management.md · layout-system.md.
