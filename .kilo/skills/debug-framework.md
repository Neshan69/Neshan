# debug-framework.md

**Purpose:** The operating procedure for autonomous debugging.
**When to use:** Executing the self-healing loop (self-healing.md).

**Iterative loop (repeat until resolved or hard limit)**
Analyze → Gather Context → Determine Root Cause → Generate Fix → Verify Fix →
Run Internal Consistency Checks → (if failed) repeat.

**Debug priority (check in this order)**
1 Package versions 2 Imports 3 Exports 4 Paths 5 Missing files 6 Circular imports
7 Build errors 8 Runtime errors 9 Console errors 10 Dependency mismatch
11 Tailwind config 12 Vite config 13 React rendering 14 Hooks misuse
15 CSS conflicts 16 Performance regressions.

**SECURITY BOUNDARIES (MUST NEVER)**
- Access files outside this repo / OS files / browser data / SSH / tokens / .env values
  (unless explicitly required) / secrets / confidential info.
- Modify external repos, access cloud/remote servers, destructive ops, delete/modify git
  history, push automatically, install unnecessary packages, escalate privileges, use
  network without permission, read unrelated user files.

**ALLOWED SCOPE (may)**
- Read/modify/create repo files; improve docs, architecture, bugs, perf, a11y, maintainability, testing.

**FAILURE POLICY**
- If unsolvable: report what was attempted, what failed, why, and what info is needed.
  Never fabricate or guess.

**Do**
- Start from `repository-context.md`; respect priority order; verify before declaring done.

**Don't**
- Don't violate boundaries. Don't loop forever — hit a hard limit and report.

**Checklist**
- [ ] Loop run; priority order followed; boundaries respected.
- [ ] Fix verified (verification-checklist.md); or failure reported honestly.

**References:** See self-healing.md · repository-context.md · root-cause-analysis.md ·
verification-checklist.md · safe-refactoring.md · debugging.md · ai-agent-rules.md.
