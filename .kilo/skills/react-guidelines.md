# react-guidelines.md

**Purpose:** React-specific conventions for this repo.
**When to use:** Writing any component/hook.

**Rules**
- React 19, function components only. No class components.
- Default export the component; name it like the file (naming-conventions.md).
- Co-locate small helpers in the same file; extract shared logic to `src/components`
  or a `useX` hook (hooks.md).
- Keep components presentational; lift shared state to `App.jsx` (architecture.md).
- Use `useCallback` for handlers passed to children (e.g., `scrollToSection`).
- Clean up listeners/effects in the returned function (see debugging.md, error-handling.md).

**Do**
- Memoize stable callbacks; guard refs (`if (!ref.current) return`).
- Use `key` on list items (project arrays, sections).

**Don't**
- Don't mutate state; don't put side effects outside `useEffect`.
- Don't access `window`/`document` during render — only in effects.

**Checklist**
- [ ] Function component, default export, React 19 patterns.
- [ ] Effects clean up their listeners/timeouts.
- [ ] No direct DOM writes during render.

**References:** See component-rules.md · hooks.md · state-management.md · coding-standards.md.
