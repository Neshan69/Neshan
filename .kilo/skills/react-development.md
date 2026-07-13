# react-development.md

**Purpose:** Enforce React best practices and project-specific patterns. Ensure production-grade component quality.
**When to use:** Any task that touches React components, hooks, state, or JSX.

## Component Rules

1. **Single Responsibility**: Each component does one thing well. If you cannot describe the component in one sentence, it is doing too much.
2. **Pure Presentational Sections**: Sections (`src/sections/`) receive props and hold no scroll/navigation state. They must be pure when possible.
3. **Shared Chrome**: Header, NavBar, ShaderBackground are in `src/components/` and reused. Do not duplicate chrome logic.
4. **No Unnecessary Splits**: Do not split components unless they exceed reasonable complexity and the split has a clear purpose.
5. **No Unnecessary Merges**: Do not merge components that have distinct responsibilities.
6. **No Inline Components in JSX**: Define components outside render; inline components cause unnecessary remounts.

## Hook Rules

1. **Custom Hooks**: Extract reusable logic into `src/hooks/` when used by 2+ components.
2. **Effect Cleanup**: Every `useEffect` that adds listeners or subscriptions must return a cleanup function.
3. **Ref Guards**: Always guard refs: `if (!ref.current) return;`.
4. **Dependency Arrays**: List all dependencies; do not suppress lint warnings.
5. **Reduced Motion**: Check `prefers-reduced-motion` before applying animations.
6. **No Side Effects During Render**: No state updates, subscriptions, or side effects during render.

## State Rules

1. **Lift State Up**: Shared state lives in `App.jsx` (the coordinator).
2. **Local State Only**: Use `useState` for component-local UI state (forms, toggles).
3. **No Global Store**: This project uses no Redux, Zustand, or Context API for shared state.
4. **Refs for Non-Reactive Values**: Use `useRef` for values that do not trigger re-renders (timers, DOM refs, scroll positions).
5. **No Prop Drilling Through Unrelated Components**: Lift state or extract if props pass through 3+ levels.

## Props Rules

1. **Explicit Props**: Pass only the props a component needs.
2. **No Prop Drilling**: If props pass through 3+ levels, lift state or extract.
3. **Default Props**: Use default parameters instead of `defaultProps`.
4. **Type Safety**: In JS, use JSDoc or consistent naming; avoid passing entire state objects.

## Performance Rules

1. **Lazy Loading**: Use `React.lazy()` for route-level/section-level code splitting.
2. **Memoization**: Use `useCallback` for functions passed to children; use `useMemo` only when profiling shows a bottleneck.
3. **Avoid Inline Objects in JSX**: Inline `{}` objects create new references on every render.
4. **Image Optimization**: Use `SmartImage` for all external images (lazy + async decode + fallback).
5. **Avoid Inline Functions in JSX**: Define callbacks outside render or memoize.

## Folder Organization

```
src/
  components/     # Shared UI (Header, NavBar, ShaderBackground, Reveal, SmartImage, ProjectCard, MicroLabel)
  sections/       # Page sections (Expertise, Work, Home, About, Contact, Chat)
  hooks/          # Reusable hooks (usePrefersReducedMotion, useIsVertical)
  index.css       # Global styles + Tailwind imports
  App.jsx         # Coordinator (scroll state, navigation, view switching)
  main.jsx        # Entry point
```

## Code Reuse

1. Before creating a new component, check if an existing one fits.
2. Before creating a new hook, check if an existing one fits.
3. Before creating a new CSS class, check if Tailwind utilities suffice.
4. Duplicate logic is a bug; extract and reuse.

## Minimal Edits

1. Do not rewrite components.
2. Do not restructure JSX without instruction.
3. Do not rename variables or components without instruction.
4. Do not change component signatures without instruction.
5. Do not change prop interfaces without instruction.

## Strict Rules (MUST Follow)

- Do not introduce a router.
- Do not introduce a global state library.
- Do not move files between directories.
- Do not rename files or components.
- Do not create duplicate components.
- Do not add new build tools or config files.

## Integration

- `editing-strategy.md` — change methodology
- `scope-guardian.md` — prevent unauthorized changes
- `ui-development.md` — visual preservation
- `verification.md` — post-change verification
- `component-rules.md` — component best practices
- `hooks.md` — hook-specific rules
- `architecture.md` — protect architecture

## Checklist

- [ ] Components are pure presentational where appropriate.
- [ ] Effects have cleanup functions.
- [ ] Refs are guarded.
- [ ] State is in the correct place.
- [ ] Props are explicit and minimal.
- [ ] Performance patterns applied (lazy, memo, SmartImage).
- [ ] Folder organization respected.
- [ ] Code reuse maximized.
- [ ] Minimal edits made.
- [ ] No duplicate components created.
- [ ] No parallel implementations added.
