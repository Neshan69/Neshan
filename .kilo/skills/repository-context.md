# repository-context.md

**Purpose:** Indexed, cached understanding of the repo. Load FIRST before debugging;
update incrementally after architectural changes (don't rebuild from scratch).
**When to use:** Before any debug/fix; after refactors or new modules.

**Rules**
- Index (keep this snapshot current): folder structure, component hierarchy, routing,
  hooks, utilities, assets, animations, pages, layouts, configuration, environment,
  dependencies, build config, tailwind config, future backend architecture.
- Update incrementally: append/modify only the changed entries; note the change + date.
- Cross-reference architecture.md / folder-structure.md for detail; this is the fast cache.

## Indexed Snapshot (current)
- **Entry:** `index.html` → `src/main.jsx` → `<App/>` (StrictMode). No router.
- **Orchestrator:** `src/App.jsx` — `scrollerRef`, `activeIndex` state, `scrollToSection`,
  keyboard arrows, wheel→horizontal redirect. Sections listed in `SECTIONS` array.
- **Sections** (`src/sections/`): Expertise, Work, Home, About, Contact. Props: `active`
  (Home also `scrollerRef`). Pure/presentational.
- **Components** (`src/components/`): Header, NavBar, ShaderBackground (2D canvas glow +
  dark-moon image overlay).
- **Global CSS:** `src/index.css` — `.horizontal-scroller`, `.section-spread`, `.glass-nav`,
  `.work-grid`, `.section-fade-in`, `.parallax-img`; font imports (Playfair/Inter/Material Symbols).
- **Config:** `tailwind.config.js` (dark tokens, fonts, `full:9999px`); `vite.config.js`
  (react plugin); ESLint flat; PostCSS + autoprefixer.
- **State:** App-only `useState`/`useRef`; no store (state-management.md).
- **Hooks:** inline `useCallback`/`useEffect`/`useRef` in App; future `src/lib` hooks.
- **Assets:** `src/assets/` (hero.png, svg logos — unused); `public/` (favicon, icons).
  Imagery hotlinked to `lh3.googleusercontent.com/aida-public` (asset-management.md).
- **Animations:** ShaderBackground 2D canvas; CSS fade/parallax (animation-guidelines.md).
- **Routing:** none (horizontal scroll); future React Router per routing.md.
- **Env:** none yet; future `.env` for DB/API (security.md, deployment.md).
- **Deps:** react 19, react-dom, vite 8, @vitejs/plugin-react, tailwindcss 3.4, postcss,
  autoprefixer, framer-motion (installed, UNUSED), eslint 10.
- **Build:** `vite build` → `dist/`; `npm run lint` (eslint flat).
- **Git:** remote GitLab `port-folio2/Neshan`; `main` protected; work on `portfolio` branch.
- **Future backend:** `server/` (Express), `prisma/` + PostgreSQL (backend-roadmap.md).

**Do**
- Load this before debugging; update the changed lines after a fix/refactor.

**Don't**
- Don't re-analyze the whole repo when this snapshot suffices.
- Don't let the snapshot drift — edit it on architectural change.

**Checklist**
- [ ] Snapshot loaded first; reflects current architecture.
- [ ] Updated incrementally after the change.

**References:** See context-loading.md · memory.md · architecture.md · folder-structure.md · CONTEXT.md.
