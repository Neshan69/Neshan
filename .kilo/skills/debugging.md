# debugging.md

**Purpose:** Scientific, evidence-based debugging. Never guess. Never patch symptoms without root cause.
**When to use:** Any bug, build failure, runtime error, console error, or unexpected behavior.

## Core Principle

Every conclusion must be backed by evidence.

Never guess-fix by toggling flags or changing code without proof.

## The 7-Step Debugging Loop

For every bug, execute these steps in order. Do not skip steps. Do not run steps out of order.

### STEP 1: Reproduce

- Create a minimal, deterministic reproduction.
- Document exact steps: inputs, state, environment, user actions.
- Confirm the bug is reproducible on demand.
- If the bug is intermittent, gather at least 3 reproduction attempts with timestamps.

### STEP 2: Collect Evidence

- Read console output (browser + terminal) completely.
- Read the FIRST error message; do not stop at warnings.
- Inspect React component tree and props at failure point.
- Log state/ref values at the moment of failure (temporary logs only; remove after).
- Check network tab for failed requests, CORS, 404s, 500s.
- Capture screenshots or screen recordings of visual bugs.
- Document all evidence before forming hypotheses.

### STEP 3: Identify Likely Causes

- List every plausible cause based on evidence.
- Do NOT stop at the first plausible cause.
- Consider: imports, exports, paths, missing files, circular imports, config mismatches, dependency versions, CSS conflicts, hook dependencies, effect cleanup, state timing, async race conditions.

### STEP 4: Rank Causes

- Rank by: (1) likelihood, (2) regression risk of fixing, (3) blast radius.
- Pick the HIGHEST likelihood cause with LOWEST regression risk.
- If multiple causes are equally likely, test them in order from lowest to highest blast radius.

### STEP 5: Modify ONE Thing

- Change exactly one variable, one line, one prop, or one config.
- Do not modify multiple suspected causes simultaneously.
- Do not "tidy" unrelated code while debugging (scope-guardian.md).
- Record what was changed and why.

### STEP 6: Verify

- Re-run the reproduction steps.
- Confirm the bug is fixed.
- Confirm no new bugs were introduced (verification.md).
- If the fix didn't work, revert the change before trying the next hypothesis.

### STEP 7: Repeat Until Solved

- If Step 6 fails, return to Step 3 with new evidence from the failed attempt.
- Re-rank causes with updated evidence.
- Apply Step 5 again (one change at a time).
- Continue until resolved or a hard limit is reached (see Failure Policy).

## Binary Search Debugging

For large, unknown failure regions:

1. Isolate the failure to half the codebase by commenting out or bypassing code.
2. Test whether the bug still exists in the reduced scope.
3. Repeat until the bug is isolated to the smallest possible region.
4. Then apply the 7-step loop within that region.

## Elimination Methodology

When multiple potential causes exist:

1. List all candidates.
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

## Regression Prevention

- Before fixing, understand what existing behavior the buggy code supports (even if broken).
- Preserve all working behavior; only remove the broken behavior.
- Add a regression test or manual verification step for the fix.
- Check that the fix does not break adjacent features.

## Iterative Debugging Limits

- Maximum 5 iterations of the 7-step loop per bug.
- If unresolved after 5 iterations, stop and report:
  - What was attempted
  - What evidence was gathered
  - What failed
  - What information is needed
- Never fabricate evidence or guess at a fix to meet a deadline.

## Integration with Other Skills

- Root cause analysis: `debugging-framework.md`
- Minimal fix application: `editing-strategy.md`
- Post-fix verification: `verification.md` → `quality-gates.md`
- Autonomous loop: `workflow.md`
- Confidence scoring: `debugging-framework.md`
- Repository understanding: `repository-context.md`

## Checklist

- [ ] Bug reproduced with documented steps.
- [ ] Evidence collected (console, network, React tree, logs).
- [ ] All plausible causes listed.
- [ ] Causes ranked by likelihood and regression risk.
- [ ] One change applied at a time.
- [ ] Fix verified with original reproduction steps.
- [ ] No regressions introduced.
- [ ] Confidence score >= 70% before declaring done.
- [ ] If unresolved after 5 iterations, failure reported honestly.

## References

See `debugging-framework.md` · `workflow.md` · `editing-strategy.md` · `verification.md` · `debug-framework.md` (legacy) · `repository-context.md` · `error-handling.md` · `logging.md`.
