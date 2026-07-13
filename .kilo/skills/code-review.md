# code-review.md

**Purpose:** Review checklist for PRs/self-review.
**When to use:** Before marking work done or merging.

**Rules**
- Run `npm run lint` and `npm run build`; both must pass (`quality-gates.md`).
- Verify against design-system.md and design-principles.md (tokens, fonts, accent).
- Check reuse: no duplicated component/CSS/logic (component-rules.md, tailwind-guidelines.md).
- Confirm accessibility.md basics (landmarks, labels, alt, reduced-motion).
- Check performance.md impact (bundle, effects, images).
- Confirm no new dependency without justification (dependency-management.md).
- Ensure CONTCONTEXT/DECISIONS updated for meaningful change (documentation.md).

**Do**
- Review diff for "why", not just "what".
- Ask for an ADR when an architectural choice appears.

**Don't**
- Don't approve duplicated logic or hardcoded tokens.
- Don't skip lint/build gates.

**Checklist**
- [ ] Lint + build green.
- [ ] Design tokens/fonts respected; no duplication.
- [ ] A11y + perf considered; no unjustified deps.
- [ ] Docs/ADR updated if needed.

**References:** See quality-gates.md · design-system.md · accessibility.md · dependency-management.md · documentation.md.
