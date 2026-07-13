# PROJECT.md — Neshan Niroula Portfolio

Single source of truth for the project vision, architecture, and how the AI skill
system is organized. Always read this first in a new session.

## Vision
A production-grade, full-stack personal portfolio for Neshan Niroula (UI/UX
Designer & Systems Architect). Starts as a dark, horizontal-scroll React SPA;
evolves into a CMS-driven platform with auth, API, admin dashboard, analytics,
and deployment automation.

## Current stack (see context.md for status)
React 19 · Vite · TailwindCSS · Supabase (auth + messaging) · (framer-motion installed, adopted).

## Target stack (roadmap)
Node.js · Express · PostgreSQL · Prisma · Auth · REST API · File Upload ·
Admin/CMS · Email · Analytics · Docker · CI/CD · Testing · SEO · Perf.

## Design language (canonical)
Dark editorial. Surface `#08080a`, ink `primary` = `#ffffff`, accent
`secondary` = `#3cd7ff` (bright cyan). Type: Playfair Display (display) +
Inter (body/label). Grayscale imagery with `brightness-75` → full on hover.
Glassmorphism nav, pill `rounded-full`, uppercase `tracking-widest` micro-labels
at `text-[10px]`. See design-system.md, design-principles.md, tailwind-guidelines.md.

## Architecture
Single-page, section-snapped horizontal scroller. App.jsx owns scroll + active
state; sections are pure presentational components receiving `active`. See
architecture.md, folder-structure.md, layout-system.md.

## Messaging
- Header "LET'S TALK": logged-out users see login/register modal; logged-in users
  open the messaging view.
- Chat section (`src/sections/Chat.jsx`) loads the user's conversation from Supabase,
  creates one automatically if missing, and stores messages with RLS enforcing
  per-user visibility.
- Admin inbox (`src/features/admin/pages/Messages.jsx`) lists all conversations
  with newest first, shows user name / last message / unread count / time, supports
  user search, selecting a conversation opens the full chat, and admin can reply
  with optimistic immediate UI updates.
- Notifications: bell icon in header with unread badge. Users see unread admin replies;
  admin sees unread user messages. Click notification marks it read. Dashboard lists
  all notifications with mark-as-read / mark-all-read.
- SQL schema: `supabase-schema.sql` in the project root.

## Audit & Code Quality
- 2026-07-13 project audit completed.
- Removed duplicate `AuthProvider` wrapping between `main.jsx` and `App.jsx`.
- Fixed `profile.service.js` feature wrapper missing `userId` parameter.
- Removed client-side `supabase.auth.admin.listUsers()` call; admin now uses RLS-protected `profiles` table queries.
- Added conversation cleanup on `createConversation` join failure to prevent orphaned rows.
- Added missing RLS UPDATE policy for `conversation_participants` (needed for `markAsRead`).
- Added `AdminProtectedRoute` wrapper to `/admin/*` routes for proper authorization.
- Added email format + password length validation in `AuthModal`.
- Added 2000-character max-length validation + counter on chat inputs.
- Added `.env.example` for environment variable documentation.
- Extracted shared `ChatBubble` component and `chat-utils` (timeAgo, formatTime) to eliminate duplication between `Chat.jsx` and admin `Messages.jsx`.
- Removed redundant re-export indirection files (`src/features/admin/admin.service.js`, `src/features/chat/chat.service.js`).

## Production Readiness (2026-07-13)
- Added `ErrorBoundary` component (`src/components/ErrorBoundary.jsx`) wrapping the entire app.
- Added `LoadingFallback` skeleton (`src/components/LoadingFallback.jsx`) replacing `fallback={null}`.
- Added 404 page (`src/pages/NotFound.jsx`) with route `*`.
- Lazy loading: all sections and admin pages use `React.lazy` + `Suspense` with branded loaders.
- Code splitting: Vite `manualChunks` separates vendor, framer-motion, and app code.
- SEO: `sitemap.xml` and `robots.txt` added to `public/`. `index.html` references sitemap and skip-to-main link.
- Accessibility: skip-to-main link, focus trap in `AuthModal`, `aria-modal`, `role="dialog"`, `aria-labelledby`, `aria-current` on nav, labeled form inputs.
- Security: `vercel.json` sets security headers. Added `sanitize.js` for XSS-safe text rendering. `.env*` gitignored.
- Vercel: `vercel.json` configured for SPA rewrites and static asset caching.
- UX fixes: fixed scroll snapping (one-wheel-one-section), added view-transition spinner, added profile icon to header, removed profile from bottom NavBar, animated underline on active/hover for NavBar items.

## Technical SEO (2026-07-13)
- Installed `react-helmet-async` for per-route dynamic meta management.
- Created `src/lib/seo.js` canonical SEO config per route.
- Created `src/components/SEO.jsx` to render title, meta description, canonical URL, robots, OG tags, Twitter cards.
- `main.jsx` wraps app in `HelmetProvider`.
- `App.jsx` applies `SEO` per route: home (`/`), admin (`/admin`), admin/users, admin/messages, admin/settings, 404.
- `index.html` base tags use `https://neshanniroula.com/`; no duplicate titles/descriptions.
- Semantic HTML5: `<header>` (Header), `<nav>` (NavBar), `<main>` (scroller), `<section>` (all sections), `<article>` (ProjectCard), `<footer>` (Contact.copyright + global App footer).
- Verified `public/robots.txt` and `public/sitemap.xml` reflect actual routes.
- Favicon (`/favicon.svg`) and social preview (`/og-image.svg`) confirmed configured.

## Skill system
All reusable engineering knowledge lives in `.kilo/skills/`. Each file is a small,
self-contained skill focused on ONE topic. Skills NEVER duplicate; they cross-reference
via "See <file>.md". Start with `skills/SKILLS.md` (the map), then the skill for your task.

## AI agent rules (summary)
Understand-first, improve-architecture, stay-consistent, reuse-components,
prefer-Tailwind, no-unnecessary-deps, production-first. Full rules: ai-agent-rules.md.

## Conventions index
coding-standards.md · naming-conventions.md · react-guidelines.md ·
component-rules.md · git-workflow.md · quality-checklist.md.
