# api-design.md

**Purpose:** REST API conventions (future Express server).
**When to use:** Designing/implementing endpoints.

**Rules**
- RESTful, resource-oriented: `/api/projects`, `/api/projects/:slug`, `/api/contact`.
- Version implicitly via `/api` prefix; add `/v1` only when breaking changes arrive.
- JSON in/out; consistent envelope optional — prefer direct resources + standard
  status codes (200/201/400/401/403/404/409/422/500).
- Validate input (zod); return `422` with field errors (error-handling.md, forms.md).
- Pagination: `?page=&limit=`; sorting `?sort=createdAt:desc`.
- Auth: bearer token / session cookie; protected routes behind a guard (authentication.md).
- Errors: machine-readable `{ error: { code, message, fields? } }`, no stack to client (logging.md).
- CORS locked to known origins; rate-limit public endpoints (security.md).

**Do**
- Document each endpoint (purpose, params, responses) in CONTCONTEXT/README or OpenAPI.
- Use correlation IDs for tracing (logging.md).

**Don't**
- Don't return stack traces. Don't trust client input; validate server-side.
- Don't expose admin endpoints without auth.

**Checklist**
- [ ] Resource routes; validated input; standard status codes.
- [ ] Auth guard on protected routes; CORS + rate-limit set.
- [ ] Errors structured; no secrets leaked.

**References:** See backend-roadmap.md · authentication.md · security.md · error-handling.md · logging.md.
