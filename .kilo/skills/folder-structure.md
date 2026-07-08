# folder-structure.md

**Purpose:** Where files live and why.
**When to use:** Creating/moving files, finding code.

**Rules**
- `src/main.jsx` — entry; mounts `<App/>` (StrictMode). Don't add logic here.
- `src/App.jsx` — orchestrator (scroll, active state, section list). See architecture.md.
- `src/components/` — shared, reusable, non-section UI (Header, NavBar, ShaderBackground).
- `src/sections/` — one file per page-section (Expertise, Work, Home, About, Contact).
- `src/index.css` — global layout + font imports only. No component-specific CSS.
- `src/assets/` — local images (currently mostly unused; external URLs are hard-coded).
- `public/` — static served-as-is (favicon, icons). See asset-management.md.
- `tailwind.config.js` — design tokens, fonts, radii. Don't hard-code brand colors in class strings.
- `.kilo/` — engineering handbook (PROJECT/CONTEXT/DECISIONS + skills/). Never delete useful skills.

**Future folders (when building backend)**
- `server/` (Express) · `prisma/` (schema, migrations) · `src/features/` (domain modules)
- `src/lib/` (api client, hooks) · `tests/` · `.github/workflows/`. See backend-roadmap.md.

**Do**
- Put new sections in `src/sections/`; new shared UI in `src/components/`.

**Don't**
- Don't co-locate global CSS per component; keep it in index.css or a scoped module.

**Checklist**
- [ ] File placed by role, not by feature-silo.
- [ ] New global token added to tailwind.config.js, not inline.

**References:** See architecture.md · component-rules.md · asset-management.md · backend-roadmap.md.
