# architecture.md

**Purpose:** Describe the runtime structure and enforce architecture protection.
**When to use:** Planning changes, adding modules, debugging data flow, or protecting against architectural drift.

## Project Architecture

### Runtime Structure

- **Entry**: `index.html` → `src/main.jsx` → `<App/>` (StrictMode). No router.
- **Coordinator**: `src/App.jsx` owns `scrollerRef`, `activeIndex`, `scrollToSection`, keyboard/wheel handlers, and view switching (`portfolio` | `chat`).
- **Sections** (`src/sections/`): Expertise, Work, Home, About, Contact, Chat. Pure/presentational; receive `active` (and `scrollerRef` for Home).
- **Components** (`src/components/`): Header, NavBar, ShaderBackground, Reveal, SmartImage, ProjectCard, MicroLabel.
- **Hooks** (`src/hooks/`): `usePrefersReducedMotion`, `useIsVertical`.
- **Global CSS**: `src/index.css` — layout classes, font imports, reduced-motion, focus-visible.
- **Config**: `tailwind.config.js` (dark tokens, fonts), `vite.config.js`, ESLint flat, PostCSS.
- **State**: App-only `useState`/`useRef`; no global store.

### Data Flow

`wheel/keyboard/scroll` → App computes `activeIndex` → passes `active` to each section → section toggles `.active` class → CSS fades content in. NavBar receives `activeIndex` + `onNavigate`.

## Architecture Protection Rules

The AI must understand and preserve:

1. **Existing Architecture**
   - Do not introduce routers, state libraries, or backend layers unless explicitly planned in the roadmap.
   - Do not change the horizontal scroll orchestration pattern.
   - Do not move state out of `App.jsx` without an ADR.

2. **Folder Structure**
   - `src/components/` — shared UI chrome and reusable widgets.
   - `src/sections/` — page-level presentational sections.
   - `src/hooks/` — reusable custom hooks.
   - `src/index.css` — global styles; never duplicate styles across files.
   - `src/main.jsx` — entry point; do not change mounting behavior.

3. **Coding Style**
   - JSX functional components with hooks.
   - `lazy()` + `Suspense` for sections.
   - `framer-motion` for transitions (`AnimatePresence`, `motion`).
   - Tailwind utilities for styling; avoid custom CSS unless global.
   - Consistent naming: PascalCase components, camelCase variables/functions.

4. **Component Ownership**
   - `Header` — top navigation + contact CTA.
   - `NavBar` — bottom section navigation.
   - `ShaderBackground` — canvas glow + image overlay.
   - `Reveal` — scroll-triggered fade-in.
   - `SmartImage` — lazy image with fallback.
   - `ProjectCard` — work item card.
   - `MicroLabel` — canonical micro-label.

5. **Shared Utilities**
   - Do not duplicate functionality. If a utility exists, use it.
   - Do not create parallel implementations of existing logic.
   - If a new utility is needed, add it to the appropriate existing file or directory.

## What Is Prohibited

Unless explicitly instructed:

- Do not introduce a router.
- Do not introduce a global state library.
- Do not move files between directories.
- Do not rename files or components.
- Do not create duplicate components or utilities.
- Do not change the data flow pattern (props down, events up to App).
- Do not add new build tools or config files.

## Integration

- `scope-guardian.md` — prevents unauthorized changes
- `workflow.md` — task lifecycle
- `editing-strategy.md` — minimal change methodology
- `react-development.md` — React-specific rules

## Checklist

- [ ] Existing architecture understood before changes.
- [ ] No new architectural patterns introduced without ADR.
- [ ] Folder structure preserved.
- [ ] Coding style matches existing code.
- [ ] Component ownership respected.
- [ ] No duplicated functionality.
- [ ] No parallel implementations.
