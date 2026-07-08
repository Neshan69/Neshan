# SKILLS.md — Skill System Map

Read this first. Each skill is a small, focused, cross-referenced file. Do NOT
memorize all of them — open the one matching your current task. All paths are
relative to `.kilo/skills/`.

## How to use
1. Identify the task domain (UI, backend, git, testing, perf…).
2. Open the matching skill below.
3. Follow its Rules/Do/Don't/Checklist.
4. Follow its `References` for deeper context.

## Foundations (read when onboarding)
- project-overview.md — what the product is
- architecture.md — runtime structure & data flow
- folder-structure.md — where files live & why
- coding-standards.md — global style rules
- naming-conventions.md — file/var/component naming
- design-system.md / design-principles.md — visual language

## Frontend
- react-guidelines.md · component-rules.md · hooks.md · state-management.md
- layout-system.md · animation-guidelines.md · responsive-design.md
- tailwind-guidelines.md · accessibility.md · forms.md
- routing.md (future) · asset-management.md · image-optimization.md

## Quality & Ops
- performance.md · seo.md · testing.md · debugging.md · error-handling.md
- logging.md · code-review.md · quality-checklist.md · completion-checklist.md
- release-checklist.md · documentation.md

## Backend / Full-stack roadmap
- backend-roadmap.md · api-design.md · database-design.md · authentication.md
- security.md · deployment.md

## Process / AI behavior
- workflow.md · feature-development.md · task-prioritization.md · refactoring.md
- dependency-management.md · decision-making.md · project-roadmap.md
- ai-agent-rules.md · token-efficiency.md · memory.md · context-loading.md

## Self-Healing / Debugging Framework
- self-healing.md — autonomous resolution rules (20-step scan + loop)
- debug-framework.md — iterative loop, debug priority, security boundaries, allowed scope, failure policy
- repository-context.md — indexed cached repo understanding (load FIRST before debugging)
- root-cause-analysis.md — primary/secondary cause, side effects, risks, confidence
- safe-refactoring.md — smallest safe fix; isolated changes
- verification-checklist.md — post-fix verification (build/start/a11y/perf/…)
- (Companion skills: debugging.md · error-handling.md · logging.md)

## Cross-cutting rules
- Keep skills small and non-duplicative; always `See <other>.md` instead of repeating.
- Update CONTEXT.md after meaningful change; add an ADR to DECISIONS.md for any
  architectural decision.
- Never introduce a dependency without justification (dependency-management.md).
