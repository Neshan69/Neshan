# logging.md

**Purpose:** Logging discipline (client + future server).
**When to use:** Adding logs, diagnostics, server code.

**Rules**
- Client: avoid `console.*` in committed code; use temporary logs while debugging, remove after (debugging.md).
- Never log secrets: tokens, passwords, API keys, cookies (security.md).
- Future server: use a structured logger (leveled: error/warn/info/debug). Redact PII.
  Send errors to a sink (console + optional service), not to the client.
- Use correlation IDs for requests when the API exists (api-design.md).
- Keep log volume low; log transitions/errors, not every render.

**Do**
- Redact/omit sensitive fields by default.
- Use levels; keep production at warn/error.

**Don't**
- Don't log secrets or full request bodies with PII.
- Don't leave debug logging in production client code.

**Checklist**
- [ ] No secrets logged.
- [ ] No stray client console logs.
- [ ] Server logs structured + redacted (when added).

**References:** See security.md · error-handling.md · debugging.md · backend-roadmap.md.
