# tailwind-guidelines.md

**Purpose:** Tailwind usage rules for this project.
**When to use:** Writing any className.

**Rules**
- Use utilities; avoid inline `style` except dynamic transforms (parallax) computed in JS.
- Brand tokens live in `tailwind.config.js` — use `surface`, `primary`, `secondary`,
  `on-surface-variant`, `outline-variant`. Never inline brand hex (design-system.md).
- Custom global classes (`.horizontal-scroller`, `.glass-nav`, `.section-fade-in`,
  `.parallax-img`, `.work-grid`) live in `src/index.css`, not per-component CSS.
- Arbitrary values allowed sparingly: `text-[10px]`, `shadow-[0_0_10px_#3cd7ff]`,
  `bg-[#0c0c0e]/40`. Prefer tokens when a value recurs — promote to config.
- `rounded-full` = pill (config sets `9999px`). Use `font-display`/`font-body`/`font-label`.

**Do**
- Promote repeated arbitrary values to a config token.
- Keep class strings readable; group state variants (`hover:`, `group-hover:`).

**Don't**
- Don't add a separate CSS file per component.
- Don't hard-code brand colors or fonts as literals.

**Checklist**
- [ ] Brand values are tokens, not literals.
- [ ] Recurring arbitrary value promoted to config.
- [ ] No per-component CSS file.

**References:** See design-system.md · coding-standards.md · component-rules.md · performance.md.
