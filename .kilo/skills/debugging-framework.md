# debugging-framework.md

**Purpose:** Scientific, evidence-based debugging. Never guess. Root cause analysis, hypothesis discipline, binary search, iterative loop, confidence scoring.
**When to use:** Any bug, build failure, runtime error, console error, or unexpected behavior.

## Core Principle

Every conclusion must be backed by evidence.

Never guess-fix by toggling flags or changing code without proof. Never modify multiple suspected causes simultaneously.

## Debugging Mindset

Debugging is scientific investigation, not pattern matching:
- Form a hypothesis based on evidence
- Test ONE change at a time
- Observe the result
- Update evidence and revise hypothesis

If you cannot state your hypothesis in one sentence that identifies the specific cause, you do not yet have a hypothesis — you have a guess.

## The 7-Step Debugging Loop

Execute these steps in order. Do not skip steps. Do not run steps out of order.

### STEP 1: Reproduce

- Create a minimal, deterministic reproduction.
- Document exact steps: inputs, state, environment, user actions.
- Confirm the bug is reproducible on demand.
- If the bug is intermittent, gather at least 3 reproduction attempts with timestamps and patterns.

### STEP 2: Collect Evidence

- Read console output (browser + terminal) completely.
- Read the FIRST error message; do not stop at warnings.
- Inspect React component tree and props at failure point.
- Log state/ref values at the moment of failure (temporary logs only; remove after).
- Check network tab for failed requests, CORS, 404s, 500s.
- Capture screenshots or screen recordings of visual bugs.
- Document all evidence before forming hypotheses.

Evidence gathering MUST complete before moving to Step 3.

### STEP 3: Identify Likely Causes

- List every plausible cause based on evidence.
- Do NOT stop at the first plausible cause.
- Consider: imports, exports, paths, missing files, circular imports, config mismatches, dependency versions, CSS conflicts, hook dependencies, effect cleanup, state timing, async race conditions.

Minimum viable causes list: 2.

### STEP 4: Rank Causes

- Rank by: (1) likelihood, (2) regression risk of fixing, (3) blast radius.
- Pick the HIGHEST likelihood cause with LOWEST regression risk.
- If multiple causes are equally likely, test them in order from lowest to highest blast radius.

### STEP 5: Modify ONE Thing

- Change exactly one variable, one line, one prop, or one config.
- Do not modify multiple suspected causes simultaneously.
- Do not "tidy" unrelated code while debugging.
- Record what was changed and why (with line numbers).

### STEP 6: Verify

- Re-run the reproduction steps.
- Confirm the bug is fixed.
- Confirm no new bugs were introduced.
- If the fix didn't work, revert the change before trying the next hypothesis.

### STEP 7: Repeat Until Solved

- If Step 6 fails, return to Step 3 with new evidence from the failed attempt.
- Re-rank causes with updated evidence.
- Apply Step 5 again (one change at a time).
- Continue until resolved or a hard limit is reached (see Hard Limits).

## Binary Search Debugging

For large, unknown failure regions:

1. Isolate the failure to half the codebase by commenting out or bypassing code.
2. Test whether the bug still exists in the reduced scope.
3. Repeat until the bug is isolated to the smallest possible region.
4. Then apply the 7-step loop within that region.

## Elimination Methodology

When multiple potential causes exist:

1. List all candidates with evidence for and against each.
2. Systematically eliminate each by proving it cannot cause the symptom.
3. Evidence of elimination is as important as evidence of the cause.
4. Document eliminated causes and why.

## Confidence Scoring

After identifying a root cause, assign a confidence score:

- **90-100%**: Evidence is conclusive. Multiple independent signals confirm the same cause.
- **70-89%**: Strong evidence. One or two signals confirm, but there is some uncertainty.
- **50-69%**: Moderate evidence. The cause is plausible but not confirmed.
- **<50%**: Weak evidence. The cause is a guess. Gather more evidence before fixing.

**Rule**: Never apply a fix with confidence < 70% without first gathering more evidence or asking the user.

## Hard Limits

- Maximum 5 iterations of the 7-step loop per bug.
- If unresolved after 5 iterations, stop and report:
  - What was attempted
  - What evidence was gathered
  - What failed
  - What information is needed
- Never fabricate evidence or guess at a fix to meet a deadline.

## Regression Prevention

- Before fixing, understand what existing behavior the buggy code supports (even if broken).
- Preserve all working behavior; only remove the broken behavior.
- Add a regression test or manual verification step for the fix.
- Check that the fix does not break adjacent features.

## Integration with Other Skills

- `prompt-analysis.md` — understand the task before debugging
- `scope-guardian.md` — do not debug outside scope
- `editing-strategy.md` — apply minimal fix
- `verification.md` — post-fix verification
- `quality-gates.md` — final review gate

## Checklist

- [ ] Bug reproduced with documented steps.
- [ ] Evidence collected (console, network, React tree, logs).
- [ ] All plausible causes listed (minimum 2).
- [ ] Causes ranked by likelihood and regression risk.
- [ ] One change applied at a time.
- [ ] Fix verified with original reproduction steps.
- [ ] No regressions introduced.
- [ ] Confidence score >= 70% before declaring done.
- [ ] If unresolved after 5 iterations, failure reported honestly.
