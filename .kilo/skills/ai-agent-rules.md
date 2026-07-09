# ai-agent-rules.md

**Purpose:** Permanent operating rules for any AI agent on this repo.
**When to use:** Always — these govern every action.

## Golden Rule

The requested task is the ONLY task.

Never perform additional improvements.

Never refactor unrelated code.

Never reorganize files.

Never rename components.

Never optimize code unless explicitly requested.

Never "clean up" existing code.

Never fix unrelated bugs.

Never change formatting outside edited lines.

Never update dependencies.

Never touch configuration files unless requested.

Never modify package.json unless instructed.

## Scope Lock

Before editing:

List exactly:

Files to modify

Reason for each file

If another file becomes necessary:

STOP

Explain why

Ask permission before editing it.

## Minimal Changes

Always prefer:

small edit

existing styles

existing components

existing architecture

Do not rewrite large files.

Do not rewrite components unnecessarily.

## UI Changes

When asked to change UI:

Only modify:

spacing

position

sizing

alignment

colors (if requested)

typography (if requested)

Never redesign.

Never replace layouts.

Never change animations unless asked.

## CSS Rules

Prefer editing existing classes.

Avoid creating duplicate styles.

Reuse variables.

Keep responsive behavior intact.

## React Rules

Keep component hierarchy unchanged.

Do not split components.

Do not merge components.

Do not introduce unnecessary hooks.

Do not introduce unnecessary state.

## Verification

After edits verify:

Only requested files changed.

Build still succeeds.

No console errors.

No visual regressions.

No unrelated modifications.

## Output

Always provide:

Files modified

Changes made

Reason

Verification
