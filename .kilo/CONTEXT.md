# CONTEXT.md — Current Implementation Status

Snapshot of the repo as of 2026-07-08. Update after each milestone.

## What exists
- Vite + React 19 SPA, dark editorial theme (brand: Neshan Niroula), horizontal
  snap-scroll experience.
- `src/main.jsx` → `<App/>` (StrictMode) wrapped once in `AuthProvider`.
- `src/App.jsx`: orchestrates sections, `scrollerRef`, `activeIndex` state,
  `scrollToSection`, keyboard + wheel→horizontal redirection, and a `view` switch
  (`"portfolio" | "chat"`) — header "LET'S TALK" opens `src/sections/Chat.jsx`
  for logged-in users or shows login/register (`AuthModal`) for logged-out users.
- `AuthProvider` is applied once in `main.jsx`; `App.jsx` no longer duplicates it.
- Sections (`src/sections/`): Expertise, Work, Home, About, Profile, Contact
  (pure, `active` prop). Chat is the messaging view.
- Components (`src/components/`): Header (auth-aware dropdown / LET'S TALK),
  NavBar, ShaderBackground, Reveal, SmartImage, ProjectCard, MicroLabel,
  ChatBubble (shared between Chat and admin Messages), NotificationDropdown.
- `src/hooks/`: usePrefersReducedMotion, useIsVertical.
- `src/contexts/AuthContext.jsx`: Supabase auth state, login, register, logout,
  unread notification count.
- `src/services/chat.service.js`: Supabase queries for conversations, participants,
  messages, admin conversation listing, user search, mark-as-read.
- `src/services/notification.service.js`: notification CRUD, unread count.
- `src/lib/chat-utils.js`: shared `timeAgo` and `formatTime` utilities.
- `src/routes/index.jsx`: admin routes wrapped in `AdminProtectedRoute`.
- `src/index.css`: global layout, fonts, reduced-motion, focus-visible.
- `tailwind.config.js`: dark palette tokens, fonts.
- GitLab remote `origin`; branch `portfolio` pushed (main is protected).

## Known issues / tech debt
- ~~`framer-motion` is a dependency but unused~~ — now adopted via `Reveal`
  (ADR-4 resolved). New code uses `motion` for reveals.
- ~~`index.html` `<title>` is still "portfolio"~~ — branded title + meta
  description, OG/Twitter, theme-color, canonical, JSON-LD, robots/sitemap (seo.md).
- Imagery still hot-linked to `lh3.googleusercontent.com/aida-public` but now
  routed through `SmartImage` with lazy/decode + `/placeholder.svg` fallback
  (asset-management.md ADR-6/ADR-9). Local CDN migration still pending.
- Scroll-hijack (`wheel` preventDefault) now gated to `(pointer: fine)` only and
  a vertical fallback exists for `max-width: 768px` (accessibility.md, ADR-8).
- No tests, no CI. See testing.md, seo.md, deployment.md.
- Supabase messaging tables need to be created via `supabase-schema.sql` in project root.
- INEFFECTIVE_DYNAMIC_IMPORT warning from Vite about `profile.service.js` is pre-existing
  and unrelated to changes.

## Missing for roadmap
Backend, DB (partially via Supabase), auth (Supabase Auth), REST API, CMS, email,
analytics, Docker, CI/CD — mostly pending. See backend-roadmap.md and dependent skills.

## Next recommended step
Run `supabase-schema.sql` in the Supabase SQL Editor, then test the messaging flow.
After that, migrate hot-linked imagery to local `public/` or a CDN and add tests/CI
(testing.md, asset-management.md ADR-6). Then continue backend-roadmap.md.
