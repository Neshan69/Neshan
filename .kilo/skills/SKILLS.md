# SKILLS.md — Skill System Map

Read this first. Each skill is a small, focused, cross-referenced file. Do NOT
memorize all of them — open the one matching your current task. All paths are
relative to `.kilo/skills/`.

## How to use
1. Identify the task domain (UI, backend, debug, verification, scope…).
2. Open the matching skill below.
3. Follow its Rules/Do/Don't/Checklist exactly.
4. Follow its `References` for deeper context.

## Core Operational Skills (always loaded)
- `ai-agent-rules.md` — permanent operating rules, scope lock, minimal changes
- `workflow.md` — task lifecycle: context → analysis → planning → execution → review → verification → completion
- `prompt-analysis.md` — rewrite request, objectives, constraints, assumptions, risks, files
- `scope-guardian.md` — prevent scope creep, unauthorized changes, and refactoring
- `editing-strategy.md` — smallest safe change, reuse, deterministic edits
- `self-review.md` — 8-point quality gate before declaring done
- `completion-rules.md` — when to stop, output standard

## Domain Skills (load as needed)
- `debugging.md` — scientific 7-step debugging, evidence-based, never guess
- `verification.md` — comprehensive verification (build, lint, UI, responsive, imports, exports, accessibility, etc.)
- `ui-development.md` — preserve design language, spacing, hierarchy, animations, responsiveness
- `react-development.md` — components, hooks, props, state, performance, folder organization
- `architecture.md` — runtime structure, data flow, architecture protection
- `testing.md` — test strategy (future)
- `performance.md` — performance optimization
- `accessibility.md` — a11y requirements

## Planning & Decision Skills
- `task-prioritization.md` — what to do next, in what order
- `decision-making.md` — how to make and record technical decisions
- `project-roadmap.md` — roadmap tie and sequencing
- `feature-development.md` — end-to-end feature delivery flow

## Quality & Ops Skills
- `quality-checklist.md` — universal quality gate (legacy; prefer `verification.md`)
- `code-review.md` — PR/self-review checklist (legacy; prefer `self-review.md`)
- `release-checklist.md` — go-live gate
- `error-handling.md` — consistent, safe error handling
- `logging.md` — logging discipline
- `dependency-management.md` — dependency rules

## Context & Memory Skills
- `context-loading.md` — exact files to read at session start
- `repository-context.md` — indexed cached repo understanding
- `memory.md` — project memory management
- `documentation.md` — docs and ADR standards
- `token-efficiency.md` — reduce output tokens

## Git & Deployment Skills
- `git-workflow.md` — branch, commit, MR standards
- `deployment.md` — deployment process

## Future / Roadmap Skills
- `backend-roadmap.md` — backend architecture plan
- `api-design.md` — REST API design
- `database-design.md` — database schema design
- `authentication.md` — auth flow
- `security.md` — security standards
- `routing.md` — React Router migration (future)

## Design System Skills
- `design-system.md` — visual language, tokens, palettes
- `design-principles.md` — design philosophy
- `tailwind-guidelines.md` — Tailwind conventions
- `layout-system.md` — layout patterns
- `animation-guidelines.md` — animation standards
- `responsive-design.md` — responsive behavior
- `forms.md` — form patterns

## Cross-cutting rules
- Keep skills small and non-duplicative; always `See <skill>.md` instead of repeating.
- Update CONTEXT.md after meaningful change; add an ADR to DECISIONS.md for any architectural decision.
- Never introduce a dependency without justification (dependency-management.md).
- When debugging, use `debugging.md` as the primary guide. Legacy `debug-framework.md`, `self-healing.md`, and `root-cause-analysis.md` are superseded by `debugging.md`.
- When verifying, use `verification.md` as the primary guide. Legacy `verification-checklist.md`, `quality-checklist.md`, and `completion-checklist.md` are superseded by `verification.md` and `completion-rules.md`.
- When editing, use `editing-strategy.md`. Legacy `safe-refactoring.md` is superseded by `editing-strategy.md`.
