# backend-roadmap.md

**Purpose:** Phased plan to evolve the SPA into a full-stack platform.
**When to use:** Planning backend work, sequencing features.

**Phases (each builds on prior; see dependent skills)**
1. Scaffold `server/` (Node + Express) + `prisma/` + Postgres; env via `.env` (deployment.md, security.md).
2. Data models: Projects, Posts/CaseStudies, Messages, User/Admin (database-design.md).
3. REST API + validation + error format (api-design.md, error-handling.md).
4. Auth: admin login, sessions/JWT, role guard (authentication.md, security.md).
5. File upload (CV/images) + storage strategy (asset-management.md).
6. CMS: admin dashboard to manage Projects/Posts/Messages.
7. Email service (contact form → inbox/notify) + analytics hooks.
8. Docker + CI/CD + prod deploy (deployment.md).
9. SEO/SSR for public content (seo.md, routing.md).

**Rules**
- Keep frontend/backend separable; frontend calls API via `src/lib` client (future).
- One phase at a time; each ends green in CI and documented in CONTEXT.md/DECISIONS.md.
- Don't bolt backend features onto the SPA files; use `server/` + `prisma/`.

**Do**
- Start with schema + a minimal working endpoint before building UI.
- Add tests per phase (testing.md).

**Don't**
- Don't mix server code into `src/` React tree.
- Don't skip auth when exposing admin routes.

**References:** See api-design.md · database-design.md · authentication.md · security.md · deployment.md.
