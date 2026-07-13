# refactoring.md

**STATUS: SUPERSEDED** by `editing-strategy.md`. This file is kept for reference only.

**Purpose (legacy):** Improve structure without changing behavior.
**When to use (legacy):** Cleaning up, splitting large files, reducing duplication.

**Rules**
- Refactor only with a clear goal (duplication, huge component, mixed concerns).
- Split large sections: extract repeated JSX (project cards, micro-labels) into
  sub-components; extract reused logic into `useX` hooks (hooks.md, component-rules.md).
- Remove duplication: one source for a pattern (e.g., card frame, label style).
- Keep behavior identical; cover with a test if logic exists (testing.md).
- Small, reviewable steps; don't rewrite working code "for style" without cause.
- Preserve design language and responsive/a11y behavior during refactor.

**Do**
- Extract, don't rewrite. Reuse existing components/tokens.
- Verify lint + build + visual after each refactor.

**Don't**
- Don't big-bang rewrite the SPA. Don't change the editorial look while "cleaning".
- Don't refactor without a goal.

**Checklist**
- [ ] Goal defined; behavior unchanged (tested if logic).
- [ ] Duplication removed; sub-components/hooks extracted.
- [ ] Lint + build + visual verified.

**References:** See component-rules.md · hooks.md · coding-standards.md · quality-gates.md.
