# token-efficiency.md

**Purpose:** Minimize tokens spent per task (chat + future context).
**When to use:** Every response and every skill authoring.

**Rules**
- Reference, don't repeat: write `See architecture.md`, never paste its content. Skills
  cross-reference; handbook stays DRY (PROJECT.md rule).
- Keep skills compact: one topic, ~25–45 lines, structured sections only.
- Concise chat: answer directly; avoid restating code/files unless asked. Use file:line refs.
- Prefer editing existing files over rewriting. Batch independent edits in one message.
- Don't dump large file contents into the conversation; read targeted slices.
- When generating skills, merge similar topics; never create overlapping docs.

**Do**
- Link to the skill; summarize in 1–2 lines when the agent needs it.
- Write new skills only when a genuine gap exists (self-improvement loop).

**Don't**
- Don't duplicate handbook text across skills or in chat.
- Don't pad skills with verbose prose or examples that aren't necessary.

**Checklist**
- [ ] Cross-references used instead of duplication.
- [ ] Skills short and single-topic; no overlaps.
- [ ] Chat answers concise; file:line used over pastes.

**References:** See ai-agent-rules.md · context-loading.md · memory.md · documentation.md.
