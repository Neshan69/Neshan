# root-cause-analysis.md

**STATUS: SUPERSEDED** by `debugging.md`. This file is kept for reference only.

**Purpose (legacy):** Determine the real cause before patching. No blind fixes.
**When to use (legacy):** After the debug-framework.md loop gathers context, before generating a fix.

**Rules — record all six dimensions for every non-trivial issue**
- **Primary Cause:** the direct trigger of the failure.
- **Secondary Cause:** contributing condition that enabled it.
- **Side Effects:** what else the bug touched (state, styling, siblings).
- **Future Risk:** how this class of issue could recur as the app grows.
- **Regression Risk:** chance the fix breaks existing behavior (design/a11y/responsive/perf).
- **Confidence Score:** 0–100% in the diagnosis; if <~70%, gather more context or ask (debug-framework.md).

**Do**
- Trace imports/exports and the call chain to the failure point (debug-framework.md priority).
- Prefer the fix with lowest regression risk that removes the primary cause.

**Don't**
- Don't patch symptoms (e.g., suppress an error) without addressing the primary cause.
- Don't claim a fix works without verification (verification-checklist.md).

**Checklist**
- [ ] Primary + secondary cause identified.
- [ ] Side effects, future risk, regression risk noted.
- [ ] Confidence scored; fix chosen to minimize regression.

**References:** See debug-framework.md · self-healing.md · safe-refactoring.md ·
verification-checklist.md · debugging.md.
