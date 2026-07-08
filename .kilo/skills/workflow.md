# workflow.md

**Purpose:** The standard agent workflow, start to finish.
**When to use:** Executing any task.

**Steps**
1. Load context: PROJECT.md → CONTEXT.md → SKILLS.md → task skill (context-loading.md).
2. Clarify/prioritize: scope the task; tie to roadmap; ask if ambiguous (task-prioritization.md, decision-making.md).
3. Reuse-first: find existing components/tokens/patterns (component-rules.md, design-system.md).
4. Plan: note an ADR for non-trivial choices (decision-making.md).
5. Implement: tokens/Tailwind, accessible, responsive, clean (coding-standards.md + relevant UI skills).
6. Verify: `npm run lint` + `npm run build`; self-review via quality-checklist.md; tests if logic (testing.md).
7. Persist: update CONTEXT.md; add ADR; open MR per git-workflow.md (documentation.md).

**Rules**
- One reviewable change at a time. Keep the editorial design language intact.
- Block "done" on quality-checklist.md, not just green build.

**Do**
- Follow the skill's Checklist for the task domain.
- Keep chat concise; reference skills (token-efficiency.md).

**Don't**
- Don't skip context-loading or the quality gate.
- Don't mix unrelated changes in one MR.

**Checklist**
- [ ] Context loaded; scope + roadmap tie clear.
- [ ] Reused; implemented per skill; lint+build+checklist green.
- [ ] Docs/ADR updated; MR opened.

**References:** See context-loading.md · feature-development.md · quality-checklist.md · ai-agent-rules.md · git-workflow.md.
