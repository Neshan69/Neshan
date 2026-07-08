# debugging.md

**Purpose:** Systematic debugging approach.
**When to use:** Something is broken or behaving unexpectedly.

**Rules**
- Reproduce first; isolate (which section/component/effect). Check console + React
  StrictMode double-invoke warnings.
- Scroll/active bugs: log `scroller.scrollLeft` and computed `activeIndex`; verify
  `window.innerWidth` math in App.jsx.
- Effect leaks: missing cleanup causes duplicate listeners/rAF loops — confirm each
  `useEffect` returns a cleanup (hooks.md, react-guidelines.md).
- Canvas issues: confirm `canvas.width/height` synced to CSS size; check context null.
- Build/lint failures: run `npm run lint` and `npm run build` separately to separate
  causes. Read the FIRST error; fix root, not symptom.
- Don't `console.log` in committed code (logging.md); use temporary logs, then remove.

**Do**
- Bisect with a minimal repro; comment out halves to isolate.
- Verify cleanup and ref guards (`if (!ref.current) return`).

**Don't**
- Don't guess-fix by toggling flags; don't leave debug logs in.

**Checklist**
- [ ] Repro isolated to a component/effect.
- [ ] Effects clean up; refs guarded.
- [ ] Lint + build green; no stray logs.

**References:** See react-guidelines.md · hooks.md · error-handling.md · logging.md.
