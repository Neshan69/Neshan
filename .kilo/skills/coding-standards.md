# coding-standards.md

**Purpose:** Global code style for all JS/JSX.
**When to use:** Writing or reviewing any code.

**Rules**
- Use ES modules; `export default function ComponentName()` for components.
- 2-space indent, double quotes, semicolons (matches existing files & ESLint).
- Named imports grouped: React hooks first, then project imports (relative `./`).
- Prefer `const`; avoid `var`. Use early returns over deep nesting.
- No comments unless explaining non-obvious "why" (see documentation.md). Keep code self-documenting.
- Format via ESLint flat config (`npm run lint`). Fix lint before commit.

**Do**
- Keep functions small and single-purpose; extract helpers.
- Use Tailwind utilities for styling (see tailwind-guidelines.md).

**Don't**
- Don't add explanatory comments that restate the code.
- Don't disable ESLint rules to ship; fix the root cause.

**Checklist**
- [ ] `npm run lint` passes.
- [ ] No `var`, no unused imports, no console left in.
- [ ] Styles are Tailwind utilities, not inline style (except dynamic transforms).

**References:** See naming-conventions.md · react-guidelines.md · tailwind-guidelines.md · component-rules.md.
