# prompt-analysis.md

**Purpose:** Understand the user's request fully before writing any code. Never code on assumptions.
**When to use:** Beginning every task. Complete before Phase 1 completion in workflow.md.

## Core Principle

A misunderstood request is a guaranteed failure. Understand before acting. Confirm before executing.

## The 9-Point Analysis

Before coding, rewrite the user's request into the following structure. Every point must be completed.

### 1. Original Request

Restate the user's exact request in your own words. Include:

- The primary action (fix, add, change, remove, build)
- The target (file, component, feature, section)
- The context and motivation if stated

### 2. Objectives

List concrete, measurable goals:

- What must be true when the task is complete?
- How will success be verified?

Goals must be testable. "Improve the UI" is not testable. "The contact form validates email before submission" is testable.

### 3. Constraints

List every explicit and implicit constraint:

- Technical constraints (framework, language, performance, bundle size)
- Design constraints (design language, spacing, colors, typography)
- Process constraints (do not refactor, do not touch certain files, minimal changes)
- Time/resource constraints
- Scope constraints (what is explicitly out of scope)

### 4. Assumptions

List every assumption being made:

- What is believed true about the codebase
- What is believed true about the user's environment
- What the user implies but does not state explicitly

**Rule**: If any assumption is critical to the solution, verify it with evidence from the codebase before proceeding. Do not assume — confirm.

### 5. Files Affected

List every file that will be modified and why:

- Include only files directly necessary for the task
- If a new file is required, stop and explain why before creating it
- Every file must have a justification tied to an objective

### 6. Files NOT Affected

Explicitly list files that will NOT be touched:

- This prevents accidental drift and scope creep
- Revisit if scope changes

### 7. Risks

List every potential risk:

- Regression risk: what existing behavior could break?
- Performance risk: could this impact bundle size, render time, or memory?
- Accessibility risk: could this break a11y?
- Scope risk: could this expand beyond the request?
- Technical risk: is the proposed solution feasible with current architecture?

### 8. Confidence Level

Assign a confidence percentage to your understanding:

- **90-100%**: Clear understanding; low risk of misinterpretation.
- **70-89%**: Good understanding; minor uncertainties exist.
- **50-69%**: Moderate understanding; significant uncertainties exist.
- **<50%**: Poor understanding; must clarify with user before proceeding.

**Rule**: If confidence < 80%, use the `question` tool or take another pass with more evidence before proceeding.

### 9. Confirmation

Summarize your understanding in one paragraph:

- What will be done
- What will NOT be done
- Why this approach was chosen

If the task is ambiguous, high-risk, or architectural, use the `question` tool to confirm with the user before proceeding.

## Rules

- Do not start coding until the 9-point analysis is complete.
- Do not proceed with confidence < 80% without clarification or additional evidence.
- If the request is vague, ask clarifying questions before analyzing.
- Keep the analysis concise. Do not write essays.
- The analysis is internal but must be thorough. Do not skip points.

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
- [ ] Files NOT affected are listed.
- [ ] Risks are identified.
- [ ] Confidence level assigned.
- [ ] Understanding confirmed internally or with user.
