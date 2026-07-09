# quality-checklist.md

**STATUS: SUPERSEDED** by `verification.md` and `self-review.md`. This file is kept for reference only.

**Purpose (legacy):** Universal quality gate before "done".
**When to use (legacy):** End of any task.

**Rules**
- [ ] `npm run lint` passes with no errors/warnings.
- [ ] `npm run build` succeeds; bundle size reviewed (performance.md).
- [ ] Follows coding-standards.md and naming-conventions.md.
- [ ] Uses design tokens, not literals (design-system.md).
- [ ] Reuses components; no duplicated logic/CSS (component-rules.md).
- [ ] Accessible: landmarks, labels, alt, reduced-motion (accessibility.md).
- [ ] Responsive at mobile + desktop (responsive-design.md).
- [ ] No new dependency without reason (dependency-management.md).
- [ ] Docs/ADR updated if the change is meaningful (documentation.md).

**Do**
- Treat this as the merge gate. Block merge if any box is unchecked.

**Don't**
- Don't mark done on green build alone — verify design + a11y + reuse.

**References:** See code-review.md · completion-checklist.md · release-checklist.md · testing.md.
