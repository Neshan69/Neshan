# task-prioritization.md

**Purpose:** Choose what to do next, in what order.
**When to use:** Facing multiple tasks or a vague request.

**Rules**
- Rank by: (1) unblocks later work, (2) fixes correctness/security, (3) user-visible
  quality, (4) polish. Roadmap dependencies win (project-roadmap.md).
- Fix blockers first: broken build/lint, security gaps, lost functionality.
- Small, shippable increments beat big unfinished rewrites (refactoring.md).
- When unsure, ask the user (question tool) rather than guess on direction.
- Don't optimize prematurely (performance.md) or add features with no roadmap tie.

**Do**
- Sequence so each step is verifiable (lint/build/test green).
- Prefer the change that removes the most future friction.

**Don't**
- Don't start backend polish before the frontend is stable.
- Don't expand scope beyond the request without checking.

**Checklist**
- [ ] Task unblocks others or fixes a real issue.
- [ ] Scope matched to request; verifiable end state.

**References:** See project-roadmap.md · decision-making.md · refactoring.md · feature-development.md.
