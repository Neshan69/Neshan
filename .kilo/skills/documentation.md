# documentation.md

**Purpose:** What/when/how to document.
**When to use:** After meaningful changes or decisions.

**Rules**
- Code is self-documenting via clear names; add comments only for non-obvious "why"
  (coding-standards.md). No comments that restate code.
- Engineering handbook lives in `.kilo/`: PROJECT.md, CONTEXT.md, DECISIONS.md, skills/.
- Update CONTEXT.md after each milestone (status, known issues, next step).
- Add an ADR to DECISIONS.md for any architectural decision (new dep, pattern, tradeoff).
- README.md: keep a short, accurate project intro + run commands. Don't duplicate skills.
- Don't write long prose in code; document decisions in DECISIONS.md, not inline.

**Do**
- Record the "why" of a choice in an ADR, not a code comment.
- Keep CONTEXT.md a living snapshot.

**Don't**
- Don't duplicate handbook content across files — cross-reference (See <file>.md).
- Don't leave docs stale after a change.

**Checklist**
- [ ] CONTEXT.md updated; ADR added if decision made.
- [ ] README accurate; no duplicated handbook text.
- [ ] Comments explain "why", not "what".

**References:** See coding-standards.md · decision-making.md · project-overview.md · SKILLS.md.
