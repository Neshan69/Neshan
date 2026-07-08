# forms.md

**Purpose:** Form patterns (currently only Contact).
**When to use:** Building/editing any form.

**Rules**
- Use semantic `<form>` with `onSubmit={e => e.preventDefault()}` until a real
  submit handler/API exists (api-design.md).
- Every field has a `<label>` associated (implicit wrap or `htmlFor`+`id`).
- Styling: bottom-border inputs (`border-b border-outline-variant`), `focus:border-secondary/60`,
  `text-primary`, muted `placeholder:text-outline/20`. Match existing Contact style.
- Validate client-side; show inline errors (error-handling.md). Don't rely on
  `type="email"` alone for UX.
- Never log secrets (logging.md). On submit success, show confirmation, not an alert.

**Do**
- Keep the editorial input style (hairline borders, display font for values).
- Disable submit while pending; handle loading + error states.

**Don't**
- Don't ship a form that posts nowhere without a clear "demo" indication.
- Don't put validation messages without `aria-describedby`/`role="alert"`.

**Checklist**
- [ ] Labels associated; focus styles present.
- [ ] Submit prevented/stubbed safely; pending + error states handled.
- [ ] No secrets logged.

**References:** See accessibility.md · error-handling.md · api-design.md · design-system.md.
