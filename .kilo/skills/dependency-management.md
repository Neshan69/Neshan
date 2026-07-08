# dependency-management.md

**Purpose:** Adding/removing/upgrading dependencies responsibly.
**When to use:** Installing or pruning any package.

**Rules**
- Justify every dependency. Ask: can this be done with the platform (Vite/React/Tailwind)
  or a few lines of code? Prefer built-ins. See current issue: `framer-motion` is
  installed but unused (DECISIONS ADR-4) — remove or adopt deliberately.
- Prefer well-maintained, small, tree-shakeable packages. Check license + maintenance.
- Pin via lockfile (`package-lock.json`); review lockfile diffs in PR.
- Run `npm audit` in CI; upgrade promptly for security fixes (security.md).
- Remove unused deps; don't leave "just-in-case" packages (bundle/perf impact: performance.md).
- For backend, keep server deps in the same repo but document why each exists.

**Do**
- Try the minimal solution first. Record the reason in the MR/ADR if non-obvious.

**Don't**
- Don't add a library to avoid writing 10 lines. Don't keep unused deps.
- Don't ignore `npm audit` high/critical.

**Checklist**
- [ ] Dependency justified; minimal/lightweight.
- [ ] Lockfile updated; audit clean (or triaged).
- [ ] Unused deps removed.

**References:** See performance.md · security.md · coding-standards.md · backend-roadmap.md · decision-making.md.
