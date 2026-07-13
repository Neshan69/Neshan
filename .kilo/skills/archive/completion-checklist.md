# completion-checklist.md

**STATUS: SUPERSEDED** by `completion-rules.md`. This file is kept for reference only.

**Purpose (legacy):** Per-feature completion before handing off.
**When to use (legacy):** A feature/task is coded and self-reviewed.

**Rules**
- [ ] Acceptance: matches the request and roadmap intent (project-roadmap.md).
- [ ] Quality-checklist.md all boxes checked.
- [ ] Tests added if logic changed (testing.md); bug has regression test.
- [ ] Manual check at mobile + desktop widths (responsive-design.md).
- [ ] No console logs / secrets left (logging.md).
- [ ] CONTCONTEXT.md updated; DECISIONS.md ADR added for design choices.
- [ ] Commit message follows git-workflow.md; branch is `portfolio`.

**Do**
- Mark only when every item is true. Link the checklist in the PR description.

**Don't**
- Don't consider a feature done because it "looks right" in one viewport.

**References:** See quality-checklist.md · testing.md · git-workflow.md · documentation.md.
