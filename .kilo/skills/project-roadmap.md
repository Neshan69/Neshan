# project-roadmap.md

**Purpose:** Ordered product/tech roadmap and how to pick work.
**When to use:** Planning, prioritizing, or justifying a task.

**Stated trajectory**
- Now: dark editorial React SPA (done). Polish: branding/meta (seo.md), asset
  localization (asset-management.md), framer-motion decision (dependency-management.md).
- Near: backend scaffold → schema → REST → auth → upload → CMS → email → analytics.
- Later: Docker/CI/CD → prod deploy → SEO/SSR. (See backend-roadmap.md phases.)

**Rules**
- Sequence by dependency: backend before CMS; auth before admin routes; deploy after CI.
- Each roadmap item → a skill or set of skills to follow.
- Keep CONTEXT.md in sync with progress; add ADRs for tradeoffs (documentation.md).

**Do**
- Pick the next phase; don't jump to deploy before CI exists.
- Tie tasks to roadmap phases so reviewers see the arc.

**Don't**
- Don't start a later phase before its prerequisites are green.
- Don't gold-plate the prototype before production needs exist.

**Checklist**
- [ ] Task maps to a roadmap phase + prerequisites met.
- [ ] CONTEXT.md/DECISIONS.md updated as phases complete.

**References:** See backend-roadmap.md · task-prioritization.md · documentation.md · project-overview.md.
