# naming-conventions.md

**Purpose:** Consistent names for files, components, vars, idents.
**When to use:** Creating any new identifier.

**Rules**
- Files/components: PascalCase for components (`NavBar.jsx`, `ShaderBackground.jsx`).
  Sections named by domain (`Home.jsx`, `Work.jsx`). Hooks: `useX` (camelCase).
- Components: default-export, named exactly like the file.
- Props: camelCase (`activeIndex`, `onNavigate`). Event handlers: `on` prefix.
- Section DOM ids: kebab-case matching section key (`id="expertise"`).
- CSS classes: Tailwind utilities only; custom classes in index.css are kebab (`section-spread`).
- Constants: UPPER_SNAKE for module-level config (`SECTIONS`).
- Brand: "Neshan Niroula". Keep copy in Title Case / uppercase micro-labels as designed.

**Do**
- Match component name ↔ file name ↔ default export.
- Use descriptive, intention-revealing names.

**Don't**
- Don't use abbreviations that obscure meaning (no `btn`, `nav2`, `tmp`).
- Don't rename existing public symbols without updating all references.

**Checklist**
- [ ] Component file + export + usage name align.
- [ ] Section `id` matches its `SECTIONS` entry key.
- [ ] No cryptic abbreviations.

**References:** See coding-standards.md · component-rules.md · architecture.md.
