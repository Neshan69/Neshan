# error-handling.md

**Purpose:** Consistent, safe error handling.
**When to use:** Async calls, user input, effects, future API.

**Rules**
- Effects/refs: guard for null (`if (!canvas) return`); never throw during render.
- Async (future API): `try/catch` around fetches; surface errors in UI, not console-only.
- Forms: validate, show inline messages with `role="alert"` (forms.md, accessibility.md).
- Don't swallow errors silently. Don't expose stack traces to users; log them server-side.
- Add an Error Boundary around the app/sections so one failure doesn't blank the page.
- Distinguish user errors (4xx, validation) from system errors (5xx) in messaging.

**Do**
- Fail gracefully: keep the rest of the UI interactive.
- Use a top-level Error Boundary (add one early in the backend/CMS phase).

**Don't**
- Don't `catch` and ignore. Don't `console.log` secrets (logging.md).
- Don't leak internal errors to the client.

**Checklist**
- [ ] Null/ref guards present.
- [ ] Async wrapped; errors shown in UI.
- [ ] Error Boundary in place for app/sections.

**References:** See logging.md · forms.md · accessibility.md · debugging.md.
