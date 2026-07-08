# PROJECT.md — Neshan Niroula Portfolio

Single source of truth for the project vision, architecture, and how the AI skill
system is organized. Always read this first in a new session.

## Vision
A production-grade, full-stack personal portfolio for Neshan Niroula (UI/UX
Designer & Systems Architect). Starts as a dark, horizontal-scroll React SPA;
evolves into a CMS-driven platform with auth, API, admin dashboard, analytics,
and deployment automation.

## Current stack (see context.md for status)
React 19 · Vite · TailwindCSS · (framer-motion installed, unused).

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
