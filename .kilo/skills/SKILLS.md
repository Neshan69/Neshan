# SKILLS.md — Skill System Map

Read this first. Each skill is a small, focused, cross-referenced file. Do NOT
memorize all of them — open the skill(s) matching your current task. All paths are
relative to `.kilo/skills/`.

## How to use
1. Identify the task domain (workflow, debug, verify, UI, React, scope…).
2. Open the matching skill below.
3. Follow its Rules/Do/Don't/Checklist exactly.
4. Follow its `References` for deeper context.

## Execution Flow (mandatory order)

For every task, follow this order:

1. `workflow.md` — task lifecycle: context → analysis → planning → execution → quality gates → completion
2. `prompt-analysis.md` — 9-point analysis before any code
3. `scope-guardian.md` — lock scope before editing
4. `editing-strategy.md` — smallest safe change methodology
5. `architecture.md` — protect existing architecture
6. Domain skill (UI, React, Debugging, etc.)
7. `quality-gates.md` — final review gate + output standard

## Core Skills (mandatory for every task)

- `workflow.md` — production-grade task lifecycle with scope lock and confidence scoring
- `prompt-analysis.md` — 9-point request analysis with internal confirmation gate
- `scope-guardian.md` — absolute scope boundaries; never cross without explicit instruction
- `editing-strategy.md` — deterministic, minimal, reviewable edits
- `debugging-framework.md` — scientific 7-step debugging with evidence-based confidence scoring
- `verification.md` — comprehensive verification (18 categories)
- `quality-gates.md` — unified self-review + verification + completion + output standard
- `completion-rules.md` — strict stop discipline; when to declare done and produce output
- `architecture.md` — architecture protection and pattern preservation
- `ui-development.md` — preserve design language, spacing, hierarchy, animations, responsiveness
- `react-development.md` — components, hooks, props, state, performance, folder organization

## Domain Skills (load as needed)

- `component-rules.md` — component best practices
- `hooks.md` — hook-specific rules
- `state-management.md` — state patterns
- `forms.md` — form patterns and validation
- `routing.md` — React Router migration (future)
- `testing.md` — test strategy (future)
- `performance.md` — performance optimization
- `accessibility.md` — a11y requirements
- `security.md` — security standards
- `logging.md` — logging discipline
- `error-handling.md` — consistent error handling
- `design-system.md` — visual language, tokens, palettes
- `tailwind-guidelines.md` — Tailwind conventions
- `animation-guidelines.md` — animation standards
- `responsive-design.md` — responsive behavior
- `asset-management.md` — image and asset handling

## Planning & Decision Skills

- `task-prioritization.md` — what to do next, in what order
- `decision-making.md` — how to make and record technical decisions
- `project-roadmap.md` — roadmap tie and sequencing
- `feature-development.md` — end-to-end feature delivery flow

## Git & Deployment Skills

- `git-workflow.md` — branch, commit, MR standards
- `deployment.md` — deployment process

## Context & Memory Skills

- `context-loading.md` — exact files to read at session start
- `repository-context.md` — indexed cached repo understanding
- `memory.md` — project memory management
- `documentation.md` — docs and ADR standards
- `token-efficiency.md` — reduce output tokens
- `PROJECT.md` — vision, stack, design language
- `CONTEXT.md` — current implementation status

## Legacy / Archived Skills

Legacy skills consolidated into current architecture are archived in `.kilo/skills/archive/`:
- `verification-checklist.md` → superseded by `verification.md`
- `quality-checklist.md` → superseded by `quality-gates.md`
- `completion-checklist.md` → superseded by `quality-gates.md`
- `debug-framework.md` → superseded by `debugging-framework.md`
- `self-healing.md` → superseded by `workflow.md` + `debugging-framework.md`
- `root-cause-analysis.md` → superseded by `debugging-framework.md`
- `safe-refactoring.md` → superseded by `editing-strategy.md`

These are kept for historical reference only. Do not reference them for current work.

## Cross-cutting rules

- Keep skills small and non-duplicative; always `See <skill>.md` instead of repeating.
- Update CONTEXT.md after meaningful change; add an ADR to DECISIONS.md for any architectural decision.
- Never introduce a dependency without justification (dependency-management.md).
- Every task must pass quality-gates.md before declaring complete.
- Every debugging iteration follows debugging-framework.md 7-step loop.
- Do not modify files outside the defined scope (scope-guardian.md).
- Always read the relevant skill before acting; never rely on general knowledge alone.

## References

See `workflow.md` · `prompt-analysis.md` · `scope-guardian.md` · `editing-strategy.md` · `architecture.md` · `verification.md` · `debugging-framework.md` · `quality-gates.md` · `completion-rules.md` · `ui-development.md` · `react-development.md`.
