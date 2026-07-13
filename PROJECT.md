# Neshan Niroula | Portfolio

## Architecture

React + Vite SPA with Supabase auth, profiles, and admin routes. The app wraps the existing horizontal-scroll portfolio in an `AuthProvider`. Authentication state drives the `Header`: the CTA button becomes an auth modal when logged out, and a user menu with Profile + Chat + Sign out when logged in. Admin users see an additional Admin link.

Routing: `react-router-dom` is used for the admin dashboard at `/admin/*`. The portfolio remains at `/` as a horizontally scrolling SPA.

Messaging: SQL schema is defined for conversations, messages, and notifications. Service layer is implemented to interact with the new tables.

## Folder Structure

src/
    contexts/           # React context providers
        AuthContext.jsx  # Auth session + profile state
    services/           # Shared Supabase service wrappers
        supabase.service.js
        profile.service.js
        chat.service.js
        notification.service.js
        admin.service.js
    types/              # Type definitions
        index.js
    routes/             # Route scaffolding
        index.jsx
        ProtectedRoute.jsx
        AdminProtectedRoute.jsx
    features/
        auth/           # Authentication feature
            auth.service.js
            AuthModal.jsx
        profile/
            profile.service.js
        chat/
            chat.service.js
        admin/
            admin.service.js
            AdminLayout.jsx
            pages/
                Dashboard.jsx
                Users.jsx
                Messages.jsx
                Settings.jsx
    sections/
        Profile.jsx     # Profile view/edit section
    lib/
        supabase.ts     # Supabase client
    supabase/
        migrations/
            20250712190000_create_profiles_table.sql
            20250712205500_create_messaging_schema.sql

## Completed Work

- Verified Supabase client configuration in `src/lib/supabase.ts`
- Created scalable folder structure: `contexts`, `services`, `types`, `routes`, `features/{auth,profile,chat,admin}`
- Added reusable service files for Supabase interactions:
  - `supabase.service.js` — session, sign-up, sign-in, sign-out, auth-state listener
  - `profile.service.js` — profile CRUD helpers
  - `chat.service.js` — conversation + message helpers
  - `notification.service.js` — notification helpers
  - `admin.service.js` — admin helpers
- Implemented full authentication flow:
  - `AuthContext` provides `user`, `profile`, `loading`, `login`, `register`, `logout`, `updateProfile`, `displayName`
  - Session persistence via `onAuthStateChange`
  - `AuthModal` component for login/register UI styled to match portfolio
- Updated `Header` component:
  - Logged out: shows original "LET'S TALK" button opening `AuthModal`
  - Logged in: shows user name with dropdown menu (Profile + Chat + Sign out)
  - Admin users see an additional Admin menu item linking to `/admin`
- Created `Profile` section (index 4 in horizontal scroll):
  - View profile details (name, email, role, avatar)
  - Edit mode for full_name and avatar_url
  - Avatar URL input is stubbed for future upload support
- Automatic profile creation on registration via `profileService.createProfile`
- Implemented admin architecture with `react-router-dom`:
  - `/admin/*` routes protected by `AdminLayout` and `AdminProtectedRoute`
  - Unauthorized users are redirected to `/`
  - Admin pages: Dashboard, Users, Messages, Settings (all empty shells)
- Designed messaging database schema in Supabase-ready SQL:
  - `profiles` — user profiles with role and timestamps
  - `conversations` — conversation metadata
  - `conversation_participants` — many-to-many join with `last_read_at`
  - `messages` — message content with foreign keys and cascading deletes
  - `notifications` — notification records linked to messages
  - Row Level Security enabled on all tables with scoped policies
- Confirmed `.env.local` contains Supabase credentials
- Existing portfolio UI sections were preserved without modification

## SEO & Performance Optimization

Goal: maximize Lighthouse SEO (target 100) and improve Core Web Vitals without changing the UI.

### Metadata (React Helmet Async)
- `react-helmet-async` `HelmetProvider` is mounted in `src/main.jsx`; `src/components/SEO.jsx` renders per-route `<title>`, `meta description`, `canonical`, full Open Graph (`og:title/description/url/image` + `og:image:width/height/alt`, `og:type`, `og:site_name`, `og:locale`), and Twitter Card tags (`twitter:card/site/title/description/image/image:alt`).
- `src/lib/seo.js` is the single source of truth for all route metadata. Public routes are `index, follow`; `admin/*` and `404` are `noindex, nofollow`.
- SSR/static shell in `index.html` keeps valid `<title>`/description/OG as a crawler fallback for non-JS crawlers, plus `Person` JSON-LD structured data.

### Routing & Lazy Loading
- Portfolio sections (`Expertise`, `Work`, `Home`, `About`, `Profile`, `Contact`, `Chat`) are `React.lazy` + `Suspense`.
- Admin pages (`Dashboard`, `Users`, `Messages`, `Settings`) and `NotFound` are now lazy-loaded and wired into `src/App.jsx` with per-route SEO via an `AdminRoute` wrapper. Admin route import depth was fixed (`../../../`) so they actually resolve.

### Bundle Optimization
- `vite.config.js` `manualChunks` now splits `supabase`, `react`/`react-router` (`vendor`), and `framer-motion` into separate, long-cacheable chunks.
- Result: main `index` chunk dropped from ~232 KB (60 KB gzip) to ~30 KB (9.4 KB gzip); Supabase (~204 KB) is isolated and cacheable.
- Removed dead code: entire `src/routes/` (only `routes/index.jsx` existed and was never imported), `src/hooks/useIsVertical.js`, `src/lib/sanitize.js`, and unused template assets (`react.svg`, `vite.svg`, `hero.png`, `public/icons.svg`).
- Eliminated the ineffective dynamic import of `profile.service` (now a static import in `AuthContext`).

### Core Web Vitals
- **LCP**: removed render-blocking `@import` for Google Fonts from `src/index.css`; fonts now load via preconnect + non-blocking `<link rel="preload" as="style" ... media="print" onload>` swap in `index.html` (with `<noscript>` fallback). Decorative background images in `ShaderBackground` use `fetchpriority="low"` + `decoding="async"` so they never compete with the LCP text.
- **CLS**: all content images live inside fixed/aspect-ratio containers (`aspect-[3/4]`, `aspect-[16/10]`, `w-24 h-24` avatar). `SmartImage` accepts explicit `width`/`height` and always sets `loading="lazy"` + `decoding="async"`.
- **INP**: `ShaderBackground` skips its `requestAnimationFrame` loop entirely under `prefers-reduced-motion`; reduced-motion is also honored by `Reveal`/`Home`. Heavy JS stays in separate chunks loaded only when needed.

### Images
- `SmartImage` (`src/components/SmartImage.jsx`) applies `loading="lazy"`, `decoding="async"`, explicit dimensions, and an `onError` fallback to `/placeholder.svg` so external hotlinks can never break layout.
- `og-image.svg` is a static 1200×630 social card; `robots.txt` allows `/` and disallows `/admin/`, and `sitemap.xml` lists only public, indexable URLs.

### Structured Data (JSON-LD)
- `src/lib/structuredData.js` is the single source of truth; `getStructuredData()` returns a schema.org `@graph` that is emitted **statically** in `index.html` (crawlable without JS execution).
- Entities included: `WebSite`, `Organization` (with nested `ContactPoint`), `Person`, `WebPage`, `BreadcrumbList`, and a `Collection` ("Portfolio") whose `hasPart` are the three `Work` projects, each typed `["SoftwareSourceCode","CreativeWork"]`.
- All entities are cross-linked with stable `@id` fragment references (`#website`, `#organization`, `#person`, `#webpage`, `#breadcrumb`, `#portfolio`, `#contactpoint`, `#project-*`).
- **Real values only** (name, `jobTitle`, `knowsAbout`, `alumniOf`, `address`, favicon logo dimensions 48×46, OG image 1200×630, project titles/tags/images). No fabricated phone/email/repo URLs — `ContactPoint` points to the real `#contact` anchor with `areaServed`/`availableLanguage`, and `SoftwareSourceCode` omits `codeRepository`/`programmingLanguage` rather than inventing them.
- `Portfolio` is modeled as the schema.org `Collection` type (schema.org has no `Portfolio` type); projects are marked `SoftwareSourceCode` + `CreativeWork` because they are interface/design builds.
- Project data was extracted to `src/data/projects.js` (imported by `Work.jsx` and `structuredData.js`, node-safe) to avoid duplicating the array.
- Validation: `node validate-sd.mjs` confirms the HTML JSON parses, that every `{ "@id" }` reference resolves, and that all required types are present.

### Accessibility
Improved to target Lighthouse Accessibility ≥ 95 without altering layout or visual design:
- **Skip link**: fixed `className` → `class` in `index.html` so the "Skip to main content" link (targets `#main`) is correctly hidden until focused.
- **Heading hierarchy**: single `h1` on the portfolio (Home) and on the admin area (`AdminLayout`); About gained an `h2`; `ProjectCard` `h4` → `h3` (removes the h2→h4 skip); admin page titles are `h2` under the layout's `h1`.
- **aria-labels / names**: every icon-only button has an `aria-label` (Header profile, notifications, Work arrows, Chat attach/SEND, section nav). The Header user-menu toggle uses `aria-expanded` + `aria-haspopup="true"`; decorative `material-symbols-outlined` ligatures are `aria-hidden`.
- **alt text**: all content images use `SmartImage` (descriptive `alt`); purely decorative images use `alt=""` inside `aria-hidden` backgrounds (`ShaderBackground`, Chat backdrop).
- **Form labels**: Profile inputs wired with `htmlFor`/`id`; display-only captions changed from `<label>` to `<p>`; Messages search/reply inputs and the Chat composer have `aria-label` (placeholders are not valid labels).
- **Color contrast**: raised all sub-AA text from `/40`–`/60` opacity to `/80` (the `on-surface-variant/*` and `secondary/*` micro-labels, timestamps, draft counters, and `placeholder` text) so they meet WCAG AA (≥ 4.5:1) on the dark surfaces.
- **Keyboard navigation**: global ArrowLeft/ArrowRight section navigation, focusable `NavBar`/`Chat` nav, and a visible `:focus-visible` cyan outline on every interactive element.
- **Focus states**: retained the global focus ring; `outline-none` inputs still surface focus via the `:focus-visible` outline plus `focus:border-secondary`.

## Next Step

Add routing and expand protected features:
- Implement avatar upload with Supabase Storage
- Build out admin dashboard with real data
