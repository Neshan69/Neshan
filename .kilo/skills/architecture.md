# architecture.md

**Purpose:** Describe the runtime structure and enforce architecture protection. Prevent architectural drift and pattern duplication.
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

### Data Flow Invariants

1. Props flow down; events flow up to App.
2. State stays in `App.jsx` unless the change is explicitly local to a component.
3. No new data flow patterns without an ADR.

## Architecture Protection Rules

The AI must understand and preserve:

### 1. Existing Architecture

- Do not introduce routers, state libraries, or backend layers unless explicitly planned in the roadmap.
- Do not change the horizontal scroll orchestration pattern.
- Do not move state out of `App.jsx` without an ADR.
- Do not introduce new architectural patterns without explicit user request.

### 2. Folder Structure

- `src/components/` — shared UI chrome and reusable widgets.
- `src/sections/` — page-level presentational sections.
- `src/hooks/` — reusable custom hooks.
- `src/index.css` — global styles; never duplicate styles across files.
- `src/main.jsx` — entry point; do not change mounting behavior.

### 3. Coding Style

- JSX functional components with hooks.
- `lazy()` + `Suspense` for sections.
- `framer-motion` for transitions (`AnimatePresence`, `motion`).
- Tailwind utilities for styling; avoid custom CSS unless global.
- Consistent naming: PascalCase components, camelCase variables/functions.

### 4. Component Ownership

- `Header` — top navigation + contact CTA.
- `NavBar` — bottom section navigation.
- `ShaderBackground` — canvas glow + image overlay.
- `Reveal` — scroll-triggered fade-in.
- `SmartImage` — lazy image with fallback.
- `ProjectCard` — work item card.
- `MicroLabel` — canonical micro-label.

### 5. Shared Utilities

- Do not duplicate functionality. If a utility exists, use it.
- Do not create parallel implementations of existing logic.
- If a new utility is needed, add it to the appropriate existing file or directory.

## Never Create Without ADR

- Never create a new directory without an ADR.
- Never create a new state management pattern without an ADR.
- Never create a new routing pattern without an ADR.
- Never create a new build/tooling pattern without an ADR.
- Never introduce a design pattern that does not already exist in the project.

## Integration

- `scope-guardian.md` — prevents unauthorized changes
- `workflow.md` — task lifecycle
- `editing-strategy.md` — minimal change methodology
- `react-development.md` — React-specific rules
- `ui-development.md` — visual preservation

## Checklist

- [ ] Existing architecture understood before changes.
- [ ] No new architectural patterns introduced without ADR.
- [ ] Folder structure preserved.
- [ ] Coding style matches existing code.
- [ ] Component ownership respected.
- [ ] No duplicated functionality.
- [ ] No parallel implementations.
