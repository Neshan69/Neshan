# scope-guardian.md

**Purpose:** Prevent scope creep, accidental refactoring, and unauthorized changes.
**When to use:** Before every edit, during every task.

## Golden Rule

The requested task is the ONLY task.

If a file or change is not required for the requested task, do not touch it.

## Hard Boundaries (MUST NEVER Cross)

Unless explicitly instructed by the user, never:

1. Add extra features or "improvements" beyond the request.
2. Refactor unrelated code.
3. Reorganize files or directories.
4. Rename components, variables, or files.
5. Optimize code unless explicitly requested.
6. "Clean up" existing code.
7. Fix unrelated bugs.
8. Change formatting outside edited lines.
9. Update dependencies.
10. Touch configuration files (`package.json`, `vite.config.js`, `tailwind.config.js`, etc.) unless instructed.
11. Modify `package.json` unless instructed.
12. Move files to different directories.
13. Change the architecture unless instructed.
14. Introduce new dependencies.

## Scope Lock Procedure

Before editing any file, explicitly state:

1. Files to modify
2. Reason for each file

If during execution another file becomes necessary:

- STOP
- Explain why
- Ask permission before editing it

## Allowed Edits

Only the following are allowed without explicit additional instruction:

- Fixing the specific bug or implementing the specific feature requested.
- Making layout/overflow/spacing changes when explicitly requested.
- Updating documentation files that are directly related to the change.
- Updating `CONTEXT.md` when architectural changes occur.

## Scope Drift Detection

If you catch yourself about to:

- Change a component you were not asked to change
- Improve code that is not broken
- "While I'm here..." any action

Stop immediately. Re-read the original request. Ask the user if the additional change is desired.

## Related Skills

- `editing-strategy.md` — how to make minimal changes
- `completion-rules.md` — when to stop
- `workflow.md` — task lifecycle

## Checklist

- [ ] Every planned edit is directly required by the user's request.
- [ ] No unrelated code will be touched.
- [ ] No configuration files will be modified unless instructed.
- [ ] No dependencies will be added/changed unless instructed.
