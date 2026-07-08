# database-design.md

**Purpose:** Postgres + Prisma data modeling conventions.
**When to use:** Creating/altering schemas.

**Rules**
- Use Prisma schema in `prisma/schema.prisma`; migrations via `prisma migrate dev`.
- Models: `Project` (title, slug, tag, coverImage, description, order),
  `Post`/`CaseStudy`, `Message` (from contact form), `User`/`Admin` (auth).
- Every table: `id` (cuid/uuid), `createdAt`, `updatedAt`. Soft-delete via `deletedAt` for CMS.
- Relations explicit; indexes on slug/foreign keys; unique slugs.
- Never store passwords—store hashes (authentication.md). Never store secrets in DB rows.
- Seed scripts for dev; keep seed data separate from migrations.
- Env: `DATABASE_URL` in `.env` (never committed) — security.md, deployment.md.

**Do**
- Generate migration for every schema change; review the SQL.
- Index query columns (slug, FK, createdAt).

**Don't**
- Don't edit migration history; create new migrations.
- Don't put PII in logs or unencrypted where policy requires encryption.

**Checklist**
- [ ] Migration created + reviewed; indexes on hot columns.
- [ ] Timestamps + soft-delete where needed; slugs unique.
- [ ] No secrets/passwords in plaintext.

**References:** See backend-roadmap.md · authentication.md · security.md · api-design.md · deployment.md.
