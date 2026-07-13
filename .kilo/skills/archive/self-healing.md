# self-healing.md

**STATUS: SUPERSEDED** by `debugging.md` and `workflow.md`. This file is kept for reference only.

**Purpose (legacy):** Enable the agent to resolve problems autonomously before asking the user.
**When to use (legacy):** Any error, build failure, runtime/console issue, or regression.

**Rules (automatic 20-step scan — do all that apply)**
1. Understand the problem. 2. Read related files. 3. Understand architecture (architecture.md).
4. Trace imports. 5. Trace exports. 6. Inspect dependencies (package.json).
7. Detect config problems. 8. Detect version incompatibilities. 9. Detect wrong component hierarchy.
10. Detect routing issues (routing.md). 11. Detect state issues (state-management.md).
12. Detect styling issues (tailwind-guidelines.md). 13. Detect build issues. 14. Detect runtime issues.
15. Detect lint issues. 16. Detect TS issues (future). 17. Backend (future). 18. API (future).
19. Database (future). 20. Produce the SMALL EST SAFE FIX.

**Loop (see debug-framework.md):** Analyze → Gather Context → Root Cause → Generate Fix →
Verify → Consistency Check → repeat if failed. Never stop after one attempt; stop only on
resolution or a hard limitation (failure-policy in debug-framework.md).

**Do**
- Load `repository-context.md` first; follow debug priority order (debug-framework.md).
- Prefer the minimal, isolated fix (safe-refactoring.md).

**Don't**
- Don't patch blindly. Don't rewrite whole files. Don't exceed allowed scope
  (debug-framework.md SECURITY BOUNDARIES).

**Checklist**
- [ ] Context loaded; 20-step scan applied.
- [ ] Root cause + confidence recorded (root-cause-analysis.md).
- [ ] Smallest safe fix applied; verification-checklist.md passed.
- [ ] Recurring bug → update the relevant skill (auto-documentation).

**References:** See debug-framework.md · root-cause-analysis.md · repository-context.md ·
safe-refactoring.md · verification-checklist.md · debugging.md · error-handling.md.
