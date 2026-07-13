# scope-guardian.md

**Purpose:** Prevent scope creep, accidental refactoring, and unauthorized changes. This is a hard boundary, not a suggestion.
**When to use:** Before every edit, during every task, after every change.

## Golden Rule

The requested task is the ONLY task.

If a file or change is not required for the requested task, do not touch it. No exceptions.

## Absolute Prohibitions (MUST NEVER)

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
13. Change architecture unless instructed.
14. Introduce new dependencies.
15. Create parallel implementations of existing logic.
16. Duplicate existing utilities or components.
17. Add new files unless explicitly required for the requested task.
18. Add console.log statements (except temporary debugging logs that are explicitly tracked for removal).

## Scope Lock Procedure

Before editing any file, explicitly state:

1. Files to modify
2. Exact reason for each file
3. What will NOT be changed in each file

If during execution another file becomes necessary:

- STOP
- Explain why
- Ask permission before editing it

## Allowed Edits

Only the following are allowed without explicit additional instruction:

- Fixing the specific bug or implementing the specific feature requested.
- Making layout/overflow/spacing changes when explicitly requested.
- Updating documentation files directly related to the change.
- Updating `CONTEXT.md` when architectural changes occur.

## Scope Drift Detection

If you catch yourself about to:

- Change a component you were not asked to change
- Improve code that is not broken
- "While I'm here..." any action

Stop immediately. Re-read the original request. Ask the user if the additional change is desired.

## Pre-Edit Checkpoint

Before every file edit, verify:

- [ ] This file was listed in the scope-lock plan.
- [ ] Every change in this file is directly required by the user's request.
- [ ] No unrelated code will be touched.
- [ ] No configuration files will be modified unless instructed.
- [ ] No dependencies will be added/changed unless instructed.

## Post-Edit Verification

After every file edit:

- [ ] Only the planned lines were changed.
- [ ] No unintended modifications were made.
- [ ] The change is scoped to the original request.

## Integration

- `editing-strategy.md` — how to make minimal changes
- `completion-rules.md` — when to stop
- `workflow.md` — task lifecycle
- `architecture.md` — protect architecture

## Checklist

- [ ] Every planned edit is directly required by the user's request.
- [ ] No unrelated code will be touched.
- [ ] No configuration files will be modified unless instructed.
- [ ] No dependencies will be added/changed unless instructed.
- [ ] No parallel implementations created.
- [ ] No existing functionality duplicated.
