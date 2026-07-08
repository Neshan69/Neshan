# deployment.md

**Purpose:** Build, CI/CD, Docker, and production deploy.
**When to use:** Setting up pipelines or releasing.

**Rules**
- Build: `npm run build` (Vite) → `dist/`. Serve statically; SPA fallback to `index.html`.
- Env: `.env` gitignored; provide `.env.example`. Inject secrets in CI/prod only (security.md).
- CI (`.github/workflows`): lint → build → test on PR; block merge on failure (testing.md, code-review.md).
- Docker: multi-stage (node build → static serve / nginx). Keep images small (alpine).
- Backend: separate service/container; reverse proxy (nginx) terminates TLS, serves SPA + API.
- Zero-downtime: healthcheck endpoint; rollback plan documented (release-checklist.md).
- Hosting: any static host for frontend; container/platform for API + Postgres.

**Do**
- Make CI the gate (lint+build+test). Use multi-stage Docker.
- Externalize all config; never bake secrets into images.

**Don't**
- Don't deploy from a dirty local tree; don't commit `.env`.
- Don't skip healthchecks/rollback.

**Checklist**
- [ ] CI green (lint+build+test). Multi-stage Docker. Env externalized.
- [ ] Healthcheck + rollback; TLS + SPA fallback.

**References:** See security.md · testing.md · release-checklist.md · backend-roadmap.md · git-workflow.md.
