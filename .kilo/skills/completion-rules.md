# completion-rules.md

**Purpose:** Define exactly when a task is complete and what happens after.
**When to use:** At the end of every task.

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

## Completion Criteria

A task is complete ONLY when ALL of the following are true:

1. **Requirement met**: The user's request is fully satisfied.
2. **Verification passed**: `verification.md` checklist is complete and green.
3. **Self-review passed**: `self-review.md` checklist is complete.
4. **No regressions**: Existing functionality is preserved.
5. **Scope respected**: Only requested files were modified.

## Post-Completion Output

After completing a task, output exactly this format:

```
Task Summary

Files Modified

Reason

Verification Results

Potential Risks

Confidence Level
```

Do not add additional commentary, suggestions, or follow-up questions.

## What Completion Does NOT Include

The following are NOT part of task completion unless explicitly requested:

- Removing console logs (unless they were added during debugging and should be removed per the task).
- Fixing warnings that were not introduced by the task.
- Updating dependencies.
- Running `npm run lint` or `npm run build` is part of verification, not completion.
- Updating documentation unless the task explicitly requires it.

## Integration

- `verification.md` — technical verification
- `self-review.md` — quality review
- `scope-guardian.md` — ensures no extra work was done
- `workflow.md` — task lifecycle

## Checklist

- [ ] User's request fully satisfied.
- [ ] verification.md passed.
- [ ] self-review.md passed.
- [ ] Only requested files modified.
- [ ] Standard output format used.
- [ ] No further action taken.
