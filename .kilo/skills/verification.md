# verification.md

**Purpose:** Comprehensive verification of every task. Prove a fix is safe before declaring done.
**When to use:** After every edit, before declaring any task complete.

## Verification Categories

Verify ALL of the following categories. Do not skip any.

### 1. Build

- [ ] `npm run build` succeeds with no errors.
- [ ] Bundle size is within acceptable limits (review gzip sizes).
- [ ] No new chunks added unexpectedly.

### 2. Lint

- [ ] `npm run lint` passes with no errors.
- [ ] No new warnings introduced.
- [ ] No `no-unused-vars` violations.

### 3. UI / Visual

- [ ] The change matches the existing design language.
- [ ] No accidental redesign.
- [ ] Spacing, alignment, and sizing are correct.
- [ ] Colors match the design system.
- [ ] Typography scale is preserved.

### 4. Responsiveness

- [ ] Mobile viewport (375px) renders correctly.
- [ ] Tablet viewport (768px) renders correctly.
- [ ] Desktop viewport (1440px) renders correctly.
- [ ] No horizontal overflow at any viewport width.
- [ ] No vertical scroll inside sections (100vh constraint).

### 5. Imports

- [ ] All imports resolve correctly.
- [ ] No broken import paths.
- [ ] No circular import risks.
- [ ] Import order follows project conventions.

### 6. Exports

- [ ] All exported components/functions are still used.
- [ ] No unused exports added.
- [ ] Default vs named exports are correct.

### 7. Routing

- [ ] All internal links/hrefs are valid.
- [ ] No broken navigation.
- [ ] Anchor targets exist.
- [ ] Hash links work correctly.

### 8. React Errors

- [ ] No React key warnings in console.
- [ ] No missing prop warnings.
- [ ] No invalid hook call errors.
- [ ] No "cannot update a component while rendering" errors.
- [ ] StrictMode double-invoke behavior is understood and not broken.

### 9. Console

- [ ] No `console.log` statements in committed code.
- [ ] No `console.warn` or `console.error` from the changed code.
- [ ] No uncaught promise rejections.

### 10. Runtime

- [ ] Application starts without crash.
- [ ] No runtime exceptions on load.
- [ ] No uncaught errors during interaction.
- [ ] Async operations (if any) complete successfully.

### 11. Animation

- [ ] Animations trigger correctly.
- [ ] `prefers-reduced-motion` is respected.
- [ ] No animation jank or layout thrashing.
- [ ] Transition durations and easings are preserved.

### 12. Performance

- [ ] No unnecessary re-renders introduced.
- [ ] No performance regressions (measure if in doubt).
- [ ] Images are lazy-loaded and decoded async.
- [ ] No memory leaks (effects cleaned up).

### 13. Accessibility Basics

- [ ] Interactive elements have accessible names.
- [ ] Images have `alt` text.
- [ ] Form inputs have associated labels.
- [ ] Focus indicators are visible (`:focus-visible`).
- [ ] Semantic HTML is used (`nav`, `main`, `section`, `header`).
- [ ] `aria-label` and `aria-current` are correct.

### 14. Unused Code

- [ ] No newly introduced unused variables.
- [ ] No dead imports added.
- [ ] No commented-out code blocks left behind.
- [ ] No orphaned files created.

### 15. Broken Links

- [ ] All `<a>` hrefs are valid.
- [ ] All internal links point to existing sections.
- [ ] No external links that are guaranteed to 404.

### 16. Missing Assets

- [ ] All referenced images load successfully.
- [ ] All SVGs exist in `public/`.
- [ ] No hotlinks to resources that may be taken down (prefer local assets).

## Verification Execution

Run in this order:

1. `npm run lint`
2. `npm run build`
3. Manual smoke test at 375px, 768px, 1440px.
4. Check browser console for errors.
5. Check React DevTools for warnings.
6. Verify each category above.

## Integration

- `self-review.md` — quality gate
- `debugging.md` — fix verification loop
- `quality-checklist.md` — legacy quality gate
- `completion-rules.md` — completion discipline

## Checklist

- [ ] All 16 categories verified.
- [ ] Build + lint green.
- [ ] No visual regressions.
- [ ] No console errors.
- [ ] No accessibility regressions.
- [ ] No performance regressions.
- [ ] No unused code or dead imports.
