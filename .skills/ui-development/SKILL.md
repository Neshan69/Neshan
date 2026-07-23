# SKILL.md — UI Development

**Purpose:** Senior frontend/UI engineering playbook for React + Vite + Tailwind + Framer Motion. Covers component design, responsive layouts, accessibility, performance, clean code, and preserving existing functionality.
**When to use:** Any task that touches UI, components, styles, layouts, animations, or frontend behavior.

## Core Principles

1. **Preserve First, Improve Second.** Never break business logic, backend integrations, or existing navigation/state flows.
2. **Minimal, Surgical Edits.** Improve the UI without rewriting unless explicitly requested. Reuse existing components, hooks, and tokens.
3. **Production-Ready Always.** Code must pass lint, build, and manual verification before completion.
4. **Design Language Loyalty.** Follow the project's dark editorial theme, brand tokens, typography scale, and animation vocabulary.
5. **Accessibility & Performance by Default.** Do not treat these as afterthoughts.

## Tech Stack Context

- **Framework:** React 19, Vite, function components only
- **Styling:** Tailwind CSS (utility-first), tokens in `tailwind.config.js`
- **Animation:** Framer Motion (`motion`) for reveals and micro-interactions
- **State:** Local `useState` / `useRef`; shared state lifted to `App.jsx`; no global store
- **Icons:** SVG inline or from existing icon set
- **Routing:** Hash-based / manual section switching; no React Router

## Component Design

### Structure
- **Sections (`src/sections/`):** Page-level views. Receive an `active` prop. Pure presentational; no scroll/navigation state.
- **Shared Components (`src/components/`):** Reusable chrome and UI patterns (Header, NavBar, ShaderBackground, Reveal, SmartImage, ProjectCard, MicroLabel).
- **Hooks (`src/hooks/`):** Extract reusable logic when used by 2+ components.

### Rules
- **Single Responsibility.** If you cannot describe the component in one sentence, it is doing too much.
- **Explicit Props.** Pass only what is needed. No prop drilling through 3+ levels — lift state or extract.
- **No Inline Components in JSX.** Define outside render to avoid unnecessary remounts.
- **Default Export.** Name the component like the file.
- **No Duplicate Logic.** Before creating a new component, hook, or CSS class, search for an existing one.

### Example Component Pattern

```jsx
import { motion } from "framer-motion";

export default function FeatureCard({ title, description, icon }) {
  return (
    <motion.div
      className="glass-card p-6 rounded-2xl border border-outline-variant"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <h3 className="font-display text-xl text-primary">{title}</h3>
      </div>
      <p className="font-body text-on-surface-variant leading-relaxed">{description}</p>
    </motion.div>
  );
}
```

## Styling & Design Tokens

### Tailwind Rules
- **Never inline brand hex values.** Use tokens from `tailwind.config.js`:
  - Colors: `surface`, `surface-container`, `primary`, `on-surface`, `on-surface-variant`, `secondary`, `secondary-container`, `outline`, `outline-variant`
  - Fonts: `font-display` (Playfair Display), `font-body` (Inter), `font-label` (Inter)
  - Radii: `rounded-full` (pills)
- **Promote repeated arbitrary values to config.** e.g., `shadow-[0_0_10px_#3cd7ff]` → `shadow-glow` in config.
- **No per-component CSS files.** Global custom classes (`.glass-nav`, `.section-fade-in`, `.parallax-img`) live in `src/index.css`.
- **Arbitrary values allowed sparingly:** `text-[10px]`, `bg-[#0c0c0e]/40`, etc.

### Visual Patterns to Preserve
- **Glass effects:** `backdrop-blur` + translucent dark + cyan border
- **Borders:** Thin, subtle (`border-white/5`, `border-outline-variant`)
- **Shadows:** Soft, editorial; no harsh drop shadows
- **Imagery:** Grayscale + `brightness-75`; full color on hover; thin frames
- **Micro-labels:** `text-[10px] font-bold tracking-widest uppercase text-secondary`

## Responsive Design

- **Mobile-first:** Base styles = mobile; `md:` / `lg:` for larger screens.
- **Breakpoints to verify:** 375px, 768px, 1440px.
- **Horizontal snap scroll:** Applies on all screens; decorative parallax images hide on mobile via `md:` prefixes.
- **No hover-dependent critical content:** Reveal key information without hover.
- **No horizontal overflow:** Respect `100vw`; sections must not overflow on mobile.

## Accessibility (WCAG-Minded)

- **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<form>`, `<button>`, `<a>`.
- **Keyboard navigation:** Scroll hijack provides ArrowLeft/ArrowRight; focus order must remain logical.
- **Images:** Decorative = `alt=""`; meaningful = descriptive `alt`.
- **Forms:** Every input has an associated `<label>`. Placeholder is a hint only.
- **Focus indicators:** Keep `:focus-visible` outlines; do not remove without replacement.
- **Reduced motion:** Check `usePrefersReducedMotion` before applying animations.
- **Color contrast:** `primary` (#fff) on `surface` (#08080a) passes. Verify `on-surface-variant` for small text.

## Animation with Framer Motion

### Patterns
- **Reveals:** Prefer `.section-fade-in` (CSS) or `motion.div` with `initial={{ opacity: 0, y: 20 }}` + `whileInView` for component-level reveals.
- **Micro-interactions:** Hover-only scale/translate/color shifts. Keep subtle.
- **Scroll-driven:** Throttle with `requestAnimationFrame`. Do not animate layout properties (`width`, `height`, `top`).
- **Easing:** Use `easeOut` or `cubic-bezier` variants that match the calm editorial tone. No bouncy/playful easing.

### Reduced Motion
```jsx
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const prefersReducedMotion = usePrefersReducedMotion();
const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" };
```

## Performance

### Build & Bundle
- **Tailwind purges unused utilities.** Prefer utilities over custom CSS.
- **Tree-shake imports.** Import only what you use from libraries.
- **Lazy loading:** Use `React.lazy()` for route/section-level splits when appropriate.
- **Images:** All external images must use `SmartImage` (lazy + async decode + fallback).
- **Measure:** Run `npm run build` after meaningful changes. Review gzipped sizes.

### Render
- **Memoization:** Use `useCallback` for handlers passed to children. Use `useMemo` only when profiling shows a bottleneck.
- **Avoid inline objects/functions in JSX.** They create new references on every render.
- **Effects:** Clean up listeners/timeouts/subscriptions. Guard refs: `if (!ref.current) return;`.
- **No side effects during render.** No `window`/`document` access outside `useEffect`.

## State & Data Flow

- **App.jsx owns scroll/navigation state.** Sections are pure.
- **No global state library.** No Redux, Zustand, or Context API for shared UI state.
- **Refs for non-reactive values.** Timers, DOM refs, scroll positions.
- **Props over context** for simple data passing.

## Clean Code Standards

- **No `console.log` / `console.warn` / `console.error`** in committed code.
- **Consistent naming:** Components PascalCase, hooks camelCase with `use` prefix, files match component names.
- **Co-locate small helpers.** Extract shared logic to `src/components/` or `src/hooks/`.
- **No commented-out code blocks.**
- **No orphaned files or unused exports.**

## Backend & Integration Safety

- **Never break Supabase auth flows.** `AuthProvider` wraps the app once in `main.jsx`.
- **Never change `src/lib/supabase.ts`** without instruction.
- **Chat/Notification services** (`src/services/`) are shared. Do not alter signatures.
- **API contracts:** If a component fetches data, do not change the shape of what it expects without instruction.

## Verification Checklist

After every UI task, verify ALL of the following before declaring completion:

### Build & Lint
- [ ] `npm run lint` passes with zero errors and zero new warnings.
- [ ] `npm run build` succeeds with no errors.
- [ ] Bundle size reviewed; no unexpected increases.

### Visual & Responsive
- [ ] 375px viewport renders correctly; no horizontal overflow.
- [ ] 768px viewport renders correctly.
- [ ] 1440px viewport renders correctly.
- [ ] Design language preserved (dark editorial, brand tokens, typography).
- [ ] Spacing, alignment, and sizing are correct.
- [ ] Colors match design system tokens (no inline hex).
- [ ] Animations and transitions intact.
- [ ] No accidental redesign.

### React & Runtime
- [ ] No React key warnings in console.
- [ ] No missing prop warnings.
- [ ] No invalid hook call errors.
- [ ] No "cannot update a component while rendering" errors.
- [ ] Application starts without crash.
- [ ] No uncaught errors during interaction.
- [ ] No `console.log` statements in changed files.

### Accessibility
- [ ] Interactive elements have accessible names (`aria-label` where needed).
- [ ] Images have appropriate `alt` text.
- [ ] Form inputs have associated `<label>` elements.
- [ ] Focus indicators are visible (`:focus-visible`).
- [ ] Semantic HTML used (`nav`, `main`, `section`, `header`).
- [ ] `prefers-reduced-motion` respected for animations.

### Performance
- [ ] No unnecessary re-renders introduced.
- [ ] Images are lazy-loaded and decoded async (`SmartImage`).
- [ ] Scroll-driven updates are rAF-throttled.
- [ ] No memory leaks (effects cleaned up).

### Scope & Regression
- [ ] Business logic unchanged.
- [ ] Backend integrations untouched.
- [ ] Only requested files modified.
- [ ] Adjacent features manually verified.
- [ ] No dead imports or unused exports added.
- [ ] No commented-out code left behind.

## Integration

- `editing-strategy.md` — change methodology
- `scope-guardian.md` — prevent unauthorized changes
- `react-development.md` — component-level rules
- `verification.md` — post-change verification
- `design-system.md` — token usage
- `responsive-design.md` — responsive behavior
- `animation-guidelines.md` — animation preservation
- `performance.md` — performance discipline
- `accessibility.md` — accessibility rules
- `tailwind-guidelines.md` — Tailwind usage
- `component-rules.md` — component best practices
- `hooks.md` — hook-specific rules
- `quality-gates.md` — three-gate verification

## Anti-Patterns (Do Not Do)

- Do not rewrite components unless explicitly instructed.
- Do not change navigation or scroll architecture without instruction.
- Do not introduce a router or global state library.
- Do not add new dependencies without measuring first.
- Do not hard-code brand colors or fonts.
- Do not create per-component CSS files.
- Do not add bouncy/playful animations that break editorial tone.
- Do not disable vertical scrolling without an accessible alternative.
