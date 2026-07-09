# self-review.md

**Purpose:** Mandatory quality gate before declaring any task complete.
**When to use:** Before outputting the completion summary for every task.

## The 8-Point Self Review

Perform ALL of the following reviews before declaring the task done.

### 1. Architecture Review

- Does the change respect the existing architecture?
- Is state managed in the correct place (App.jsx for this project)?
- Are data flows unchanged unless explicitly requested?
- Are no new patterns introduced that duplicate existing ones?

### 2. Regression Review

- Does the change break any existing functionality?
- Have all affected paths been tested?
- Are edge cases preserved?
- Is the change backward compatible?

### 3. Visual Review

- Does the UI match the existing design language?
- Are spacing, typography, and colors consistent?
- Is the layout preserved on mobile and desktop?
- Are animations and transitions intact?

### 4. Build Review

- Does `npm run build` succeed?
- Does `npm run lint` pass?
- Are there any new warnings or errors?
- Is bundle size within acceptable limits?

### 5. Import Review

- Are all imports valid?
- Are there any dead imports?
- Are all exports still used?
- Are there circular import risks?

### 6. Unused Code Review

- Are there any newly introduced unused variables, functions, or components?
- Are there any dead imports added during the task?
- Is there any commented-out code that should be removed (only if part of the task)?

### 7. Scope Review

- Were only the requested files modified?
- Were any unrelated changes made?
- Were any configuration files touched without instruction?
- Were any dependencies added without instruction?

### 8. Requirement Review

- Does the implementation match the user's original request?
- Are all objectives from `prompt-analysis.md` satisfied?
- Are all constraints respected?
- Were any assumptions invalidated during implementation?

## Review Execution Order

1. Architecture Review
2. Regression Review
3. Visual Review
4. Build Review
5. Import Review
6. Unused Code Review
7. Scope Review
8. Requirement Review

## Review Rules

- Perform ALL 8 reviews. Do not skip any.
- Do not declare completion if any review reveals issues.
- Fix issues found during review, then re-run the review.
- If a review reveals scope creep, revert the out-of-scope change.

## Integration

- `verification.md` — technical verification
- `prompt-analysis.md` — requirement baseline
- `scope-guardian.md` — scope enforcement
- `completion-rules.md` — completion discipline

## Checklist

- [ ] Architecture Review passed.
- [ ] Regression Review passed.
- [ ] Visual Review passed.
- [ ] Build Review passed.
- [ ] Import Review passed.
- [ ] Unused Code Review passed.
- [ ] Scope Review passed.
- [ ] Requirement Review passed.
- [ ] All reviews green before declaring done.
