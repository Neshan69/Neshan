# quality-gates.md

**Purpose:** Unified quality gate combining verification, self-review, completion criterion, and output standard.
**When to use:** After every edit, before declaring any task complete. After every debugging iteration.

## Core Principle

A task is NOT complete until every gate passes. Green build alone is insufficient.

## The Three Gates

Every task MUST pass all three gates in order:

### Gate 1: Self-review (8-point quality review)

Must complete BEFORE any technical verification. Evaluate whether the change is fundamentally sound.

1. **Architecture Review**
   - Does the change respect existing architecture?
   - Are no new patterns introduced that duplicate existing ones?
   - Is state managed in the correct place?
   - Are data flows unchanged unless explicitly requested?

2. **Regression Review**
   - Does the change break existing functionality?
   - Have all affected paths been considered?
   - Are edge cases preserved?
   - Is the change backward compatible?

3. **Visual Review**
   - Does the UI match the existing design language?
   - Are spacing, typography, and colors consistent?
   - Is the layout preserved on mobile and desktop?
   - Are animations and transitions intact?

4. **Build Review**
   - Does `npm run build` succeed?
   - Does `npm run lint` pass?
   - Are there any new warnings or errors?
   - Is bundle size within acceptable limits?

5. **Import Review**
   - Are all imports valid?
   - Are there any dead imports?
   - Are all exports still used?
   - Are there circular import risks?

6. **Unused Code Review**
   - Are there any newly introduced unused variables, functions, or components?
   - Are there any dead imports added during the task?
   - Is there any commented-out code left behind?

7. **Scope Review**
   - Were only requested files modified?
   - Were unrelated changes made?
   - Were configuration files touched without instruction?
   - Were dependencies added without instruction?

8. **Requirement Review**
   - Does the implementation match the original request?
   - Are all objectives satisfied?
   - Are all constraints respected?
   - Were any assumptions invalidated during implementation?

### Gate 2: Verification (16 categories)

Must complete AFTER self-review passes. Verify the technical correctness of the implementation.

1. UI / Visual
2. Responsiveness
3. Imports
4. Exports
5. Routing
6. React Errors
7. Console
8. Build
9. Lint
10. Runtime
11. Animation
12. Performance
13. Accessibility Basics
14. Unused Code
15. Broken Links
16. Missing Assets

See `verification.md` for detailed checklist items for each category.

### Gate 3: Completion Criterion

Must complete AFTER verification passes. Confirm readiness for finalization.

1. **Requirement Met**: User's request fully satisfied.
2. **Verification Passed**: All 16 categories verified and green.
3. **Self-review Passed**: All 8 points reviewed and green.
4. **No Regressions**: Existing functionality preserved.
5. **Scope Respected**: Only requested files modified.
6. **Confidence Level**: Applied to every significant decision during the task.

## Output Standard

Every completed task must end with this exact format. Do not add additional commentary, suggestions, or follow-up questions.

```
Task Summary

Files Modified

Reason

Verification Results

Potential Risks

Confidence Level
```

**Fields:**

- **Task Summary**: 1-3 sentences describing what was done and the outcome.
- **Files Modified**: Exact list of every modified file, one per line.
- **Reason**: Why these files were modified and no others.
- **Verification Results**: Which gates passed, which tools were run, and specific findings. Do not write "passed" without evidence.
- **Potential Risks**: Any residual risks, known limitations, or areas of concern.
- **Confidence Level**: Percentage confidence in the correctness of the solution and the absence of regressions.

## Hard Stop Rules

When the task is complete:

**STOP.**

Do not continue improving.

Do not clean code.

Do not optimize.

Do not beautify.

Do not refactor.

Do not fix unrelated bugs.

Do not "tidy up" while you're in the file.

## Iteration Limits

- Maximum 3 full cycles of Gate 1 + Gate 2 + Gate 3 per task.
- If a gate fails after 3 iterations, escalate to the user with:
  - What was attempted
  - What evidence was gathered
  - What failed
  - What information is needed

## Integration

- `workflow.md` — task lifecycle
- `prompt-analysis.md` — requirement baseline
- `scope-guardian.md` — scope enforcement
- `editing-strategy.md` — change methodology
- `verification.md` — technical verification details
- `completion-rules.md` — stop rules
- `debugging-framework.md` — debugging loop

## Checklist

- [ ] Gate 1: All 8 self-review points passed.
- [ ] Gate 2: All 16 verification categories passed.
- [ ] Gate 3: Completion criterion met.
- [ ] Output standard produced with exact format.
- [ ] No further action taken.
