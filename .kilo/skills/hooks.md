# hooks.md

**Purpose:** Custom hook conventions and when to create one.
**When to use:** Extracting reusable stateful logic.

**Rules**
- Name `useX`, camelCase, in `src/components/` or `src/lib/` (future).
- A hook encapsulates one behavior (e.g., `useHorizontalScroll`, `useParallax`).
- Return primitives/callbacks, not JSX. Components render; hooks compute.
- Always clean up (removeEventListener, cancelAnimationFrame) in the effect return.
- If logic is used by exactly one component and is tiny, keep it inline — don't over-abstract.

**Do**
- Lift scroll/keyboard/wheel logic into hooks if reused beyond App.jsx.
- Use `useCallback`/`useRef` to avoid stale closures and re-renders.

**Don't**
- Don't put JSX in a hook. Don't create a hook for a one-off used once.

**Checklist**
- [ ] Hook named `useX` and single-purpose.
- [ ] Effect cleanup present.
- [ ] No JSX returned.

**References:** See react-guidelines.md · state-management.md · architecture.md.
