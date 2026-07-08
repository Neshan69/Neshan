# state-management.md

**Purpose:** Where state lives and how it flows.
**When to use:** Adding state, sharing data across components.

**Rules**
- Current app: only React `useState`/`useRef` in `App.jsx`. No external store.
- `activeIndex` and `scrollerRef` are the only shared state — kept in App.
- Sections are stateless presentational; receive `active` via props.
- Future: prefer React Context for cross-cutting UI state; reserve a store
  (Zustand/Redux) only if server data/cache is needed. Avoid premature stores.

**Do**
- Lift shared state to the nearest common ancestor (today: App).
- Keep DOM refs in `useRef`; never store refs in state.

**Don't**
- Don't add Redux/Zustand for this SPA's UI state — it's overkill.
- Don't duplicate state that can be derived (active index is derived from scroll).

**Checklist**
- [ ] Shared state minimized and lifted correctly.
- [ ] No store added without justification (dependency-management.md).

**References:** See architecture.md · react-guidelines.md · component-rules.md.
