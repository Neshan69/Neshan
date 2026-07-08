# security.md

**Purpose:** Security baseline for app + future backend.
**When to use:** Any auth, input, deploy, or secret-handling work.

**Rules**
- Secrets: never in repo or client. Use `.env` (gitignored) + server env (deployment.md).
  Scan for leaked keys in CI.
- Input: validate + sanitize server-side; parameterize all SQL via Prisma (no raw strings).
- Headers: CSP, HSTS, X-Content-Type-Options, Referrer-Policy (helmet on Express).
- CORS: allowlist origins; no `*` with credentials. Rate-limit + CAPTCHA on contact/login.
- Uploads: validate type/size; store outside web root or in object storage; never execute.
- Dependency: audit (`npm audit`) in CI; pin/upgrade via dependency-management.md.
- Logging: redact PII/secrets (logging.md). Least privilege for DB/user roles.

**Do**
- Treat all client input as hostile. Default-deny on admin routes.
- Enable CSP; avoid inline scripts.

**Don't**
- Don't commit `.env` or keys. Don't trust client validation alone.
- Don't use `eval`/raw SQL concatenation.

**Checklist**
- [ ] No secrets in repo; env externalized.
- [ ] Input validated; SQL parameterized; headers set.
- [ ] CORS allowlisted; uploads validated; deps audited.

**References:** See authentication.md · api-design.md · logging.md · deployment.md · dependency-management.md.
