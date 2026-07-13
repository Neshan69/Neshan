# git-workflow.md

**Purpose:** Branching, commits, and remote rules.
**When to use:** Starting work, committing, pushing.

**Rules**
- Remote `origin` = GitLab `port-folio2/Neshan`. `main` is PROTECTED — no force push.
- Work on branch `portfolio`; open MR to `main` (DECISIONS ADR-5). Feature branches
  branch off `portfolio` (e.g., `feat/cms`, `fix/title-meta`).
- Commit: imperative, scoped, concise (`fix: set branded title + meta`, `feat: add Prisma schema`).
- Keep commits focused; don't mix unrelated changes.
- PR/MR description references the quality gate used (`quality-gates.md`).
- Don't commit `node_modules`, `dist`, `.env` (gitignored). Don't force-push `main`.

**Do**
- Branch per task; rebase/update before MR; keep history clean.
- Reference issue/roadmap item in MR.

**Don't**
- Don't push to `main` directly or force-push protected branches.
- Don't commit secrets or build output.

**Checklist**
- [ ] Branch `portfolio`/feature; commit scoped + imperative.
- [ ] MR to `main`; description cites quality-gates.md.
- [ ] No secrets/build artifacts committed.

**References:** See quality-gates.md · decision-making.md · project-roadmap.md · security.md.
