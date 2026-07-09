# prompt-analysis.md

**Purpose:** Understand the user's request fully before writing any code.
**When to use:** Beginning every task.

## The 7-Point Analysis

Before coding, rewrite the user's request into the following structure.

### 1. Original Request

Restate the user's exact request in your own words.

### 2. Objectives

List the concrete, measurable goals.

- What must be true when the task is complete?
- What is the desired end state?

### 3. Constraints

List every explicit and implicit constraint.

- Technical constraints (framework, language, performance, bundle size).
- Design constraints (design language, spacing, colors, typography).
- Process constraints (do not refactor, do not touch certain files, minimal changes).
- Time/resource constraints.

### 4. Assumptions

List every assumption you are making.

- What you believe to be true about the codebase.
- What you believe to be true about the user's environment.
- What you believe the user implies but does not state explicitly.

If any assumption is critical to the solution, verify it with evidence from the codebase before proceeding.

### 5. Files Affected

List every file that will be modified and why.

- Include only files directly necessary for the task.
- If a new file is required, stop and explain why before creating it.

### 6. Risks

List every potential risk.

- Regression risk: what existing behavior could break?
- Performance risk: could this impact bundle size, render time, or memory?
- Accessibility risk: could this break a11y?
- Scope risk: could this expand beyond the request?
- Technical risk: is the proposed solution feasible with current architecture?

### 7. Confirmation

Summarize your understanding in one paragraph.

If the task is ambiguous, high-risk, or architectural, use the `question` tool to confirm with the user before proceeding.

## Rules

- Do not start coding until the 7-point analysis is complete.
- Do not proceed with confidence < 70% on any point without verification.
- If the request is vague, ask clarifying questions before analyzing.
- Keep the analysis concise. Do not write essays.

## Integration

After analysis, proceed to:

- `workflow.md` for execution planning
- `repository-context.md` for repo understanding
- `scope-guardian.md` to lock scope before editing

## Checklist

- [ ] Request rewritten objectively.
- [ ] Objectives are measurable.
- [ ] Constraints are listed.
- [ ] Assumptions are identified and verified.
- [ ] Files affected are listed with reasons.
- [ ] Risks are identified.
- [ ] Understanding confirmed internally or with user.
