# completion-rules.md

**Purpose:** Define exactly when a task is complete and what happens after. Enforce absolute stop discipline.
**When to use:** Before declaring any task done. This is the final checkpoint.

## The Completion Rule

When the task is complete:

**STOP.**

Do not continue improving.

Do not clean code.

Do not optimize.

Do not beautify.

Do not refactor.

Do not fix unrelated bugs.

Do not "tidy up" while you're in the file.

Do not add additional commentary after the output standard.

## Completion Criteria

A task is complete ONLY when ALL of the following are true:

1. **Requirement met**: The user's request is fully satisfied.
2. **Gate 1 passed**: Self-review (8 points) complete and green.
3. **Gate 2 passed**: Verification (18 categories) complete and green.
4. **No regressions**: Existing functionality is preserved and verified.
5. **Scope respected**: Only requested files were modified. No exceptions.
6. **Confidence documented**: Every significant decision was scored during the task.

**Distribution Rule**: `npm run build` + `npm run lint` must both pass before any task is declared complete.

## Post-Completion Output

After completing a task, output exactly this format. Do not add additional commentary, suggestions, or follow-up questions.

```
Task Summary

Files Modified

Reason

Verification Results

Potential Risks

Confidence Level
```

**Fields:**

- **Task Summary**: 1-3 sentences describing what was done and the outcome. No fluff.
- **Files Modified**: Exact list of every modified file, one per line. Absolute paths or repo-relative paths. No "and others."
- **Reason**: Why these files were modified and no others. Tie each file to a specific objective.
- **Verification Results**: Which gates passed, which tools were run, and specific findings. Include evidence: "npm run build passed (0 errors, 0 warnings)" not just "build passed."
- **Potential Risks**: Any residual risks, known limitations, or areas of concern. If none, state explicitly: "No residual risks identified."
- **Confidence Level**: Percentage confidence in the correctness of the solution and the absence of regressions. Tie to specific evidence.

## What Completion Does NOT Include

The following are NOT part of task completion unless explicitly requested:

- Removing console logs (unless they were added during debugging and should be removed per the task).
- Fixing warnings that were not introduced by the task.
- Updating dependencies.
- Running `npm run lint` or `npm run build` is part of verification, not completion itself.
- Updating documentation unless the task explicitly requires it.
- Adding tests that were not requested.

## Post-Completion Updates

Only if architectural change occurred:
- Update `.kilo/CONTEXT.md`
- Add ADR to `DECISIONS.md`

If no architectural change: do not update docs.

## Iteration Limits

- Maximum 3 complete cycles of Gate 1 + Gate 2 + Gate 3.
- If unresolved after 3 iterations, report to user with:
  - What was attempted
  - What evidence was gathered
  - What failed
  - What information is needed

## Integration

- `quality-gates.md` — final review gate
- `verification.md` — technical verification
- `scope-guardian.md` — scope enforcement
- `workflow.md` — task lifecycle
- `debugging-framework.md` — scientific debugging

## Checklist

- [ ] Requirement met.
- [ ] All 8 self-review points green.
- [ ] All 18 verification categories green.
- [ ] No regressions introduced.
- [ ] Only requested files modified.
- [ ] Standard output format used.
- [ ] No further action taken.
