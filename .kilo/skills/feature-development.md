# feature-development.md

**Purpose:** End-to-end flow for delivering a feature.
**When to use:** Implementing any new capability.

**Rules**
- 1) Clarify intent + tie to roadmap (project-roadmap.md, task-prioritization.md).
  2) Locate/reuse: check skills + existing components before writing (component-rules.md).
  3) Design minimally; add an ADR for non-trivial choices (decision-making.md, documentation.md).
  4) Implement with tokens/Tailwind, accessible + responsive (design-system.md, accessibility.md).
   5) Self-review via quality-gates.md; add tests if logic changed (testing.md).
  6) Update CONTEXT.md; open MR per git-workflow.md.

**Do**
- Reuse before create. Keep the change small and reviewable.
- Keep the editorial design language intact.

**Don't**
- Don't skip the "reuse" step or the design-language check.
- Don't ship without lint + build + (where relevant) tests.

**Checklist**
- [ ] Intent + roadmap tie clear; reuse checked.
- [ ] Tokens/a11y/responsive honored; ADR if needed.
- [ ] quality-gates.md passed; CONTEXT.md updated; MR opened.

**References:** See project-roadmap.md · component-rules.md · quality-gates.md · decision-making.md · git-workflow.md.
