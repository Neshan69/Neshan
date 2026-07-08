# decision-making.md

**Purpose:** How to make and record technical decisions.
**When to use:** Facing a choice with tradeoffs (dep, pattern, architecture).

**Rules**
- Prefer the option that: preserves the design language, minimizes deps, keeps the
  bundle small, improves architecture, and is production-first (ai-agent-rules.md).
- For non-trivial/architecture choices, write an ADR in DECISIONS.md (documentation.md):
  context, options, decision, consequences. Number sequentially (ADR-N).
- When direction is ambiguous or user-facing, ask the user (question tool) instead of guessing.
- Reversible, low-cost changes: just do it and note in CONTEXT.md. Irreversible/costly:
  record ADR + confirm.
- Don't over-engineer for hypothetical future needs (dependency-management.md).

**Do**
- Capture the "why" so future agents don't relitigate it.
- Favor simplicity + consistency with existing conventions.

**Don't**
- Don't decide architecture in a comment; put it in DECISIONS.md.
- Don't add speculative generality without a roadmap need.

**Checklist**
- [ ] Option evaluated against design/dep/bundle/production criteria.
- [ ] ADR added for non-trivial choice; CONTEXT.md updated.
- [ ] User consulted if direction ambiguous.

**References:** See documentation.md · ai-agent-rules.md · dependency-management.md · feature-development.md.
