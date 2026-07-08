# authentication.md

**Purpose:** Auth approach for admin/CMS (future).
**When to use:** Implementing login, sessions, role guards.

**Rules**
- Admin-only: email + password with bcrypt/argon2 hashing (never plaintext — database-design.md).
- Sessions: HTTP-only, Secure, SameSite cookies OR short-lived JWT + refresh.
  Prefer cookie sessions for the admin SPA (less client secret handling).
- Role guard middleware: protect `/api/admin/*` and `/admin` routes (api-design.md, routing.md).
- CSRF protection for cookie auth; rate-limit login; lockout after attempts (security.md).
- Password reset via email service (backend-roadmap.md); tokens short-lived, single-use.
- No auth on public read endpoints (projects/posts). Write/delete requires admin.

**Do**
- Hash + salt; use built-in crypto/trusted lib. Set Secure/HttpOnly/SameSite.
- Add tests for auth flows (testing.md).

**Don't**
- Don't store tokens in localStorage if cookie sessions are viable.
- Don't expose admin routes without a guard.

**Checklist**
- [ ] Passwords hashed; session/cookie flags correct.
- [ ] Admin guard + CSRF + rate-limit on auth.
- [ ] Reset flow secure; public reads open.

**References:** See security.md · api-design.md · database-design.md · backend-roadmap.md · logging.md.
