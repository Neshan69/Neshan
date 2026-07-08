# component-rules.md

**Purpose:** How to build/structure components here.
**When to use:** Creating or modifying a component.

**Rules**
- Section vs component: page sections live in `src/sections/` and receive `active`;
  shared chrome lives in `src/components/`. See folder-structure.md.
- Props over context for simple data (`active`, `onNavigate`, `scrollerRef`).
- One responsibility per component. Split large sections (see refactoring.md).
- Reuse, don't duplicate: if a card/label pattern exists, import/extend it.
- Keep markup semantic (`<section>`, `<nav>`, `<form>`, `<blockquote>`).

**Do**
- Accept `active` in sections and toggle `.active` to drive `.section-fade-in`.
- Extract repeated JSX (project cards, micro-labels) into a sub-component.

**Don't**
- Don't embed scroll/position logic in a section (App owns it).
- Don't duplicate a component that already exists.

**Checklist**
- [ ] Section receives `active`; toggles `.active` class.
- [ ] Repeated UI extracted to a reusable component.
- [ ] Semantic HTML used.

**References:** See react-guidelines.md · architecture.md · design-system.md · refactoring.md.
