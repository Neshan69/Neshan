# workflow.md

**Purpose:** Production-grade execution lifecycle. Ensures reliable, scoped, verified, evidence-based execution.
**When to use:** Executing any task. This is the canonical operating procedure.

## Phase 0: Scope Lock

Before any investigation or file access:

1. Restate the exact request.
2. Define what will NOT be changed.
3. Define what "done" looks like.

A task without a locked scope is a task that will runaway. Lock scope first.

## Phase 1: Context Loading

Load context in this exact order:

1. `.kilo/PROJECT.md` — vision, stack, design language.
2. `.kilo/CONTEXT.md` — current status, known issues, next steps.
3. `.kilo/skills/SKILLS.md` — skill map; open the skill(s) matching your task domain.
4. Relevant skill(s): follow Rules/Do/Don't/Checklist.
5. Source files only as needed (folder-structure.md, architecture.md).

**Rules:**
- Do not read the whole repo blindly; load by relevance (token-efficiency.md).
- If the task touches backend/roadmap, also read backend-roadmap.md + dependent skills.
- Never read files outside the defined scope.

## Phase 2: Prompt Analysis

Before coding, perform a complete 9-point analysis:

1. **Original Request** — restate the user's exact request in your own words.
2. **Objectives** — measurable goals. What must be true when the task is complete?
3. **Constraints** — explicit and implicit limits. Technical, design, process, time.
4. **Assumptions** — what you believe to be true; verify critical ones with evidence.
5. **Files Affected** — list every file with reason. No exceptions.
6. **Files NOT Affected** — explicitly list files that will NOT be touched to prevent drift.
7. **Risks** — regression, performance, accessibility, scope, technical.
8. **Confidence Level** — assign a percentage to your understanding before proceeding.
9. **Confirmation** — if confidence < 80%, ask the user before proceeding.

**Tool**: `prompt-analysis.md`

**Rule**: Do not start coding until confidence >= 80% or the task is categorically simple (typo, single-property fix).

## Phase 3: Planning

1. **Execution Order**: Sequence work so each step is independently verifiable.
2. **Dependencies**: Identify what must be done before what.
3. **Stopping Conditions**: Define what "done" looks like before starting.
4. **Success Criteria**: Define how you will know when the task is truly complete.

**Rules:**
- Fix blockers first: broken build, security gaps, lost functionality.
- Small, shippable increments beat big unfinished rewrites.
- If unsure about direction, ask the user rather than guess.
- Mark every step as pending/in-progress/completed using `todowrite`.

**Tool**: `task-prioritization.md`

## Phase 4: Execution

1. Open the relevant domain skill(s) (UI, React, Debugging, etc.).
2. Apply `editing-strategy.md`: smallest safe change, existing utilities/components.
3. Apply `scope-guardian.md`: only touch required files.
4. Apply `architecture.md`: preserve architecture and patterns.
5. Make the change.
6. Verify immediately (verification.md → quality-gates.md).

**Rules:**
- One reviewable change at a time.
- If a new file becomes necessary, STOP, explain, and ask permission.
- Keep the editorial design language intact.
- Reuse components/tokens; avoid duplicated logic and CSS.
- Never modify multiple suspected causes simultaneously.

## Phase 5: Quality Gates

Before declaring done, run the full quality gates sequence:

1. **Self-review** (Gate 1)
2. **Verification** (Gate 2)
3. **Completion** (Gate 3)

**Tool**: `quality-gates.md`

**Rules:**
- All gates must pass.
- A failed gate requires remediation, not skipping.
- Only 3 iterations allowed; escalate if unresolved.

## Stopping Conditions

Stop immediately if:
- The task is complete (Phase 5 criteria met).
- You hit a hard blocker (missing dependency, unclear requirement, permission denied).
- You have attempted 5 debugging iterations without resolution (debugging-framework.md).
- The user asks you to stop.
- Scope is exceeded (scope-guardian.md violation detected).

## Scope Control

- The requested task is the ONLY task.
- Never perform additional improvements.
- Never refactor unrelated code.
- Never reorganize files.
- Never rename components or files.
- Never optimize unless explicitly requested.
- Never "clean up" existing code.
- Never fix unrelated bugs.
- Never change formatting outside edited lines.
- Never update dependencies unless instructed.
- Never touch configuration files unless requested.

## Integration

- `prompt-analysis.md` — understand before coding
- `editing-strategy.md` — how to change
- `scope-guardian.md` — what not to change
- `architecture.md` — protect the architecture
- `verification.md` — technical verification
- `quality-gates.md` — unified review gate (self-review + verification + completion)
- `completion-rules.md` — stop rules
- `self-review.md` — quality gate (legacy; superseded by quality-gates.md)

## Checklist

- [ ] Scope locked before investigation.
- [ ] Context loaded in correct order.
- [ ] Prompt analyzed with 9-point analysis; confidence >= 80%.
- [ ] Planned with execution order, dependencies, stopping conditions.
- [ ] Executed with minimal, scoped changes.
- [ ] Quality gates passed (all 8 self-review + all 16 verification + completion criterion).
- [ ] Output standard produced.
- [ ] Docs/ADR updated if needed; CONTEXT.md bumped if architecture changed.

## References

See `prompt-analysis.md` · `scope-guardian.md` · `editing-strategy.md` · `architecture.md` · `verification.md` · `debugging-framework.md` · `quality-gates.md` · `completion-rules.md` · `task-prioritization.md` · `feature-development.md` · `decision-making.md` · `ai-agent-rules.md`.
