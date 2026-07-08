# ai-agent-rules.md

**Purpose:** Permanent operating rules for any AI agent on this repo.
**When to use:** Always — these govern every action.

**Rules (mandatory)**
- Understand-first: read PROJECT.md, CONTEXT.md, SKILLS.md before acting. Don't rewrite
  existing code you haven't read.
- Improve architecture over patching; preserve consistency with the design language.
- Reuse components/tokens; avoid duplicated logic and CSS; prefer Tailwind utilities.
- Create reusable, small, split components; write maintainable, production-first code.
- Never introduce unnecessary dependencies; keep bundle small (dependency-management.md).
- Preserve responsiveness, accessibility, and performance in every change.
- Document important decisions as ADRs; update CONTEXT.md on meaningful change (documentation.md).
- Don't guess on direction — ask the user when ambiguous (decision-making.md).
- Keep tokens low: reference skills (`See <file>.md`), don't paste handbook content into chat.

**Do**
- Follow the relevant skill's Rules/Do/Don't/Checklist exactly.

**Don't**
- Don't deviate from the editorial dark design without an ADR.
- Don't skip lint/build/quality gates.

**Checklist**
- [ ] Read the relevant skills before coding.
- [ ] Reused tokens/components; no new dep without reason.
- [ ] a11y/responsive/perf preserved; docs updated.

**References:** See token-efficiency.md · workflow.md · memory.md · decision-making.md · quality-checklist.md.
