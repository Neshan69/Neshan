# editing-strategy.md

**Purpose:** Make deterministic, minimal, safe changes. Every edit must be predictable and reviewable.
**When to use:** Before writing any code or making any edit.

## Core Principles

1. Smallest safe change that removes the primary cause.
2. Reuse existing styles, components, and utilities.
3. Avoid large rewrites and full file rewrites unless structurally required.
4. One concern per change; reviewable diff.
5. Every edit must be deterministic — applying the same reasoning must produce the same result every time.

## Preferred Edits (In Order)

1. **Existing utilities**: Use existing Tailwind classes, CSS classes, or helper functions.
2. **Existing components**: Compose with existing components; do not create new ones unless necessary.
3. **Existing patterns**: Match the coding style, naming conventions, and architecture of surrounding code.
4. **Minimal prop/style changes**: Adjust props, classes, or styles on existing elements.
5. **Small logic additions**: Add small functions or effects within existing components.

## Exact Edit Rules

- Use exact string replacements when possible.
- Do not rely on "feel" or "taste" for code changes.
- Do not rewrite a component to "modernize" it.
- Do not reformat code that was not part of the edit.
- Do not combine multiple logical changes in one file unless they are co-dependent.

## Edit Sizing

| Change Type | Acceptable | Requires Justification | Maximum |
|-------------|------------|------------------------|---------|
| 1-5 lines   | Always     | —                      | —       |
| 6-20 lines  | Usually    | Smallest safe fix      | —       |
| 21-50 lines | Rarely     | Needs ADR              | —       |
| 50+ lines   | Never      | Full file rewrite      | Requires ADR |

**Rule**: If an edit exceeds 20 lines, justify why a smaller change is impossible.

## Avoid

1. **Full file rewrites**: Never rewrite a component or file from scratch unless it is structurally broken or fundamentally wrong, and only after recording an ADR.
2. **New abstractions**: Do not introduce new utilities, hooks, or contexts to solve a one-off problem.
3. **New dependencies**: Do not add a library for a single use case (dependency-management.md).
4. **Parallel implementations**: Do not create a second way to do something that already exists.
5. **Cosmetic rewrites**: Do not "tidy", "beautify", or "modernize" code while fixing a bug.
6. **Creative interpretation**: Do not interpret "fix the spacing" as "redesign the layout".

## Deterministic Edits

- Every edit should produce the same result every time it is applied.
- Avoid edits that depend on LLM interpretation or generation variability.
- Use exact string replacements when possible.
- Do not rely on visual estimation ("it looks better this way").

## Verification During Execution

After every edit:

1. Confirm the exact lines changed match the intended change.
2. Confirm no unintended lines were modified.
3. Confirm the change compiles/builds.
4. Confirm the change matches existing code style.

## Integration

- `scope-guardian.md` — prevents edits outside the task
- `architecture.md` — protects existing patterns
- `verification.md` — post-edit verification
- `debugging-framework.md` — root-cause-driven minimal fixes
- `react-development.md` — React-specific editing rules

## Checklist

- [ ] Smallest safe change selected.
- [ ] Existing utilities/components/styles reused.
- [ ] No unrelated code touched.
- [ ] Edit is deterministic.
- [ ] No parallel implementations created.
- [ ] No new abstractions introduced.
- [ ] Edit is reviewable as a single logical unit.
