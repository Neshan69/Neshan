# verification-checklist.md

**STATUS: SUPERSEDED** by `verification.md`. This file is kept for reference only.

**Purpose (legacy):** Prove a fix is safe before declaring done.
**When to use (legacy):** After generating a fix in the debug loop (self-healing.md).

**Rules — verify ALL after every fix**
- [ ] Project builds (`npm run build`).
- [ ] Application starts (`npm run dev` / preview) without crash.
- [ ] No new errors introduced (build, runtime, console).
- [ ] No duplicated code (reuse over copy — component-rules.md).
- [ ] No broken imports (paths/exports resolve — debug-framework.md priority).
- [ ] No broken styling (tokens/utils intact — tailwind-guidelines.md).
- [ ] No broken responsiveness (mobile + desktop — responsive-design.md).
- [ ] No accessibility regressions (landmarks/labels/alt/motion — accessibility.md).
- [ ] No performance regressions (bundle size, effects throttled — performance.md).

**Do**
- Run `npm run lint` + `npm run build`; manually smoke at 375/768/1440px.
- If a recurring bug was fixed, update the relevant skill (auto-documentation in self-healing.md).

**Don't**
- Don't mark done on green build alone. Don't skip a11y/responsive/perf checks.

**Checklist**
- [ ] lint + build + start green; no new console errors.
- [ ] imports/styles/responsive/a11y/perf all verified.
- [ ] recurring bug → skill updated; repository-context.md bumped if architecture changed.

**References:** See quality-checklist.md · completion-checklist.md · self-healing.md ·
debug-framework.md · testing.md · debugging.md.
