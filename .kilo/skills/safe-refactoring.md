# safe-refactoring.md

**STATUS: SUPERSEDED** by `editing-strategy.md`. This file is kept for reference only.

**Purpose (legacy):** Fix/refactor with minimal blast radius. Companion to refactoring.md (process) and debug-framework.md (fix generation).
**When to use (legacy):** Generating any fix or cleanup during the debug loop.

**Rules — prefer smallest safe change**
- Small fixes over rewrites. Small refactors over restructures. Isolated improvements.
- Extract a component / reuse existing logic instead of duplicating (component-rules.md).
- Keep the editorial design language and a11y/responsive/perf behavior intact.
- One concern per change; reviewable diff. Never rewrite a whole file unless required
  (e.g., structurally broken or fundamentally wrong), and only after an ADR (decision-making.md).

**Do**
- Edit the fewest lines that remove the primary cause (root-cause-analysis.md).
- Reuse tokens/utilities; avoid new CSS or deps (dependency-management.md).

**Don't**
- Don't "tidy" unrelated code while fixing a bug (scope creep → regression risk).
- Don't introduce a dependency or new pattern to apply a fix.

**Checklist**
- [ ] Minimal, isolated change; no unrelated edits.
- [ ] Reused existing logic/tokens; design + a11y + responsive preserved.
- [ ] Verified via verification-checklist.md.

**References:** See refactoring.md · root-cause-analysis.md · debug-framework.md ·
component-rules.md · dependency-management.md · verification-checklist.md.
