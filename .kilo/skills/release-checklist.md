# release-checklist.md

**Purpose:** Go-live gate (production deploy).
**When to use:** Before deploying to production.

**Rules**
- [ ] Build optimized (`npm run build`); sizes within budget (performance.md).
- [ ] SEO complete: title, meta, OG, JSON-LD, sitemap/robots (seo.md).
- [ ] Assets local/optimized, no external hotlinks (asset-management.md, image-optimization.md).
- [ ] Env/config externalized (no secrets in repo) — future backend (deployment.md, security.md).
- [ ] CI green: lint + build + tests (deployment.md, testing.md).
- [ ] Error Boundary + basic monitoring/logging in place (error-handling.md, logging.md).
- [ ] Accessibility pass (accessibility.md). Rollback plan documented.

**Do**
- Run the full quality + completion checklists first.
- Verify the deployed URL (not just localhost).

**Don't**
- Don't deploy with hardcoded secrets or external hotlinked images.
- Don't skip CI because "it builds locally".

**Checklist**
- [ ] quality-gates.md passed; assets + SEO + CI + monitoring verified.
- [ ] Deployed URL smoke-tested.

**References:** See deployment.md · seo.md · security.md · quality-gates.md · completion-rules.md.
