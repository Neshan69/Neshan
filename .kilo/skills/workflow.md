# workflow.md

**Purpose:** The standard agent workflow, start to finish. Ensures reliable, scoped, verified execution.
**When to use:** Executing any task.

## Phase 1: Context Loading

Load context in this exact order:

1. `.kilo/PROJECT.md` — vision, stack, design language.
2. `.kilo/CONTEXT.md` — current status, known issues, next steps.
3. `.kilo/skills/SKILLS.md` — skill map; open the skill(s) matching your task domain.
4. Relevant skill(s): follow Rules/Do/Don't/Checklist.
5. Source files only as needed (folder-structure.md).

**Rules:**
- Do not read the whole repo blindly; load by relevance (token-efficiency.md).
- If the task touches backend/roadmap, also read backend-roadmap.md + dependent skills.

## Phase 2: Prompt Analysis

Before coding, perform a complete 7-point analysis:

1. Original Request — restate the user's exact request.
2. Objectives — measurable goals.
3. Constraints — explicit and implicit limits.
4. Assumptions — what you believe to be true; verify critical ones.
5. Files Affected — list with reasons.
6. Risks — regression, performance, accessibility, scope, technical.
7. Confirmation — summarize understanding; ask if ambiguous.

**Tool**: `prompt-analysis.md`

## Phase 3: Planning

1. **Scope Lock**: Define exactly what will be modified and why. State this explicitly.
2. **Execution Order**: Sequence work so each step is verifiable.
3. **Dependencies**: Identify what must be done before what.
4. **Stopping Conditions**: Define what "done" looks like before starting.

**Rules:**
- Fix blockers first: broken build, security gaps, lost functionality.
- Small, shippable increments beat big unfinished rewrites.
- If unsure about direction, ask the user rather than guess.

**Tool**: `task-prioritization.md`

## Phase 4: Execution

1. Open the relevant domain skill(s) (UI, React, Debugging, etc.).
2. Apply `editing-strategy.md`: smallest safe change, existing utilities/components.
3. Apply `scope-guardian.md`: only touch required files.
4. Make the change.
5. Verify immediately (verification.md).

**Rules:**
- One reviewable change at a time.
- Keep the editorial design language intact.
- Reuse components/tokens; avoid duplicated logic and CSS.

## Phase 5: Self Review

Before declaring done, perform the 8-point self review:

1. Architecture Review
2. Regression Review
3. Visual Review
4. Build Review
5. Import Review
6. Unused Code Review
7. Scope Review
8. Requirement Review

**Tool**: `self-review.md`

## Phase 6: Verification

Run the complete verification checklist:

- `npm run lint` + `npm run build`
- Manual smoke test at 375px, 768px, 1440px
- Check browser console + React DevTools
- Verify all 16 verification categories

**Tool**: `verification.md`

## Phase 7: Completion

If and only if all verification passes and all self reviews pass:

1. Output the standard completion format.
2. Update `CONTEXT.md` if the change is architectural.
3. Add an ADR to `DECISIONS.md` for any architectural decision.
4. Stop. Do not continue improving.

**Tool**: `completion-rules.md`

## Stopping Conditions

Stop immediately if:

- The task is complete (Phase 7 criteria met).
- You hit a hard blocker (missing dependency, unclear requirement, permission denied).
- You have attempted 5 debugging iterations without resolution (debugging.md).
- The user asks you to stop.

## Scope Control

- The requested task is the ONLY task.
- Never perform additional improvements.
- Never refactor unrelated code.
- Never reorganize files.
- Never rename components.
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
- `self-review.md` — quality gate
- `verification.md` — technical verification
- `completion-rules.md` — when to stop

## Checklist

- [ ] Context loaded; scope + roadmap tie clear.
- [ ] Prompt analyzed; objectives, constraints, assumptions clear.
- [ ] Planned; execution order + stopping conditions defined.
- [ ] Reused; implemented per skill; minimal change made.
- [ ] Self-review passed (all 8 points).
- [ ] Verification passed (all 16 categories).
- [ ] Completion rules followed; standard output produced.
- [ ] Docs/ADR updated if needed; CONTEXT.md bumped if architecture changed.

## References

See `prompt-analysis.md` · `editing-strategy.md` · `scope-guardian.md` · `self-review.md` · `verification.md` · `completion-rules.md` · `feature-development.md` · `task-prioritization.md` · `decision-making.md` · `quality-checklist.md` · `ai-agent-rules.md`.
