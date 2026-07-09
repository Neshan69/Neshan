# ui-development.md

**Purpose:** Preserve the existing design language and visual consistency.
**When to use:** Any task that touches UI, components, styles, or layouts.

## Core Principle

Never accidentally redesign. Preserve, reuse, and minimally adjust.

## What Must Be Preserved

1. **Design Language**
   - Dark editorial theme.
   - Brand identity (Neshan Niroula).
   - Accent colors (secondary: `#3cd7ff`).
   - Typography scale and hierarchy (Playfair Display for headlines, Inter for body).

2. **Spacing System**
   - Use existing Tailwind spacing scale.
   - Do not invent new spacing values.
   - Preserve relative spacing between elements.

3. **Component Hierarchy**
   - Keep component structure unchanged.
   - Do not split or merge components unless explicitly required.
   - Do not introduce unnecessary wrappers.

4. **Animations**
   - Preserve existing transitions and animations.
   - Do not change animation durations, easings, or triggers unless requested.
   - Honor `prefers-reduced-motion` (accessibility.md).

5. **Responsiveness**
   - Preserve mobile-first responsive behavior.
   - Do not break existing breakpoints (`md:` prefixes).
   - Test at 375px, 768px, and 1440px widths.

6. **Visual Consistency**
   - Match existing visual patterns.
   - Do not introduce new patterns without an ADR.
   - Preserve glass effects, borders, shadows, and overlays.

## UI Change Rules

When a UI change is explicitly requested:

- Only modify spacing, position, sizing, alignment.
- Only modify colors if explicitly requested.
- Only modify typography if explicitly requested.
- Never replace layouts.
- Never redesign sections.
- Never change animations unless asked.

## Prohibited UI Actions

Unless explicitly instructed:

- Do not change the layout structure.
- Do not add new sections.
- Do not remove existing sections.
- Do not change the navigation pattern.
- Do not change the horizontal scroll behavior.
- Do not change the color palette.
- Do not change the font stack.

## Component Editing Rules

- Do not split components.
- Do not merge components.
- Do not introduce unnecessary state.
- Do not introduce unnecessary hooks.
- Do not rename components without instruction.

## Integration

- `editing-strategy.md` — how to make changes
- `scope-guardian.md` — prevent unauthorized changes
- `react-development.md` — component-level rules
- `verification.md` — post-change verification
- `design-system.md` — token usage
- `responsive-design.md` — responsive behavior
- `animation-guidelines.md` — animation preservation

## Checklist

- [ ] Design language preserved.
- [ ] Spacing system respected.
- [ ] Component hierarchy unchanged.
- [ ] Animations intact.
- [ ] Responsiveness preserved.
- [ ] No accidental redesign.
- [ ] No new patterns introduced.
