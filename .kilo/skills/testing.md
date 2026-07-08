# testing.md

**Purpose:** Testing strategy (currently none).
**When to use:** Adding features, CI, or regression safety.

**Rules**
- No tests exist yet. Introduce a lightweight stack: Vitest + React Testing Library
  for components; keep it fast (Vite-native). Add when first non-trivial logic lands.
- Test behavior, not internals: render a section with `active`, assert fade/class.
  Test `App` scroll→`activeIndex` transitions via simulated scroll where feasible.
- Future backend: add API/integration tests (Supertest) + Prisma test DB (backend-roadmap.md).
- Keep tests in `tests/` or colocated `*.test.jsx`. Run in CI (deployment.md).
- Aim for meaningful coverage of logic/hooks; don't chase 100% on static markup.

**Do**
- Add a test when fixing a bug (prevent regression).
- Use `npm run lint` + `build` as the baseline CI gate now.

**Don't**
- Don't add a heavy E2E framework before unit/integration tests exist.
- Don't test implementation details (class names that aren't contract).

**Checklist**
- [ ] Test added for new logic/hook.
- [ ] Bug fix has a regression test.
- [ ] `lint` + `build` pass in CI.

**References:** See backend-roadmap.md · deployment.md · debugging.md · quality-checklist.md.
