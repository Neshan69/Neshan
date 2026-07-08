# memory.md

**Purpose:** What an agent should "remember" across sessions via artifacts.
**When to use:** Persisting knowledge; starting a session.

**Rules**
- Memory is externalized, not in-chat: PROJECT.md (vision), CONTEXT.md (status),
  DECISIONS.md (ADRs), and `.kilo/skills/*` (knowledge). Read these first (context-loading.md).
- Don't rely on conversation history; the repo's handbook is the source of truth.
- When you learn a durable fact (convention, constraint, decision), write it to the
  correct artifact — not to a chat summary.
- Fix drift: if CONTEXT.md disagrees with reality, update it. If a skill is wrong, edit it.
- Never delete useful skills; merge similar ones (token-efficiency.md).

**Do**
- On session start: read PROJECT.md → CONTEXT.md → SKILLS.md → relevant skill.
- Persist decisions as ADRs immediately.

**Don't**
- Don't keep important context only in the conversation.
- Don't let the handbook go stale after a change.

**Checklist**
- [ ] Session begins by reading the handbook.
- [ ] Durable facts written to artifacts, not chat.
- [ ] Handbook corrected when drift detected.

**References:** See context-loading.md · documentation.md · decision-making.md · token-efficiency.md.
