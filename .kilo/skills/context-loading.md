# context-loading.md

**Purpose:** The exact files to read at session start for instant orientation.
**When to use:** Beginning any task in this repo.

**Order (stop when you have enough for the task)**
1. `.kilo/PROJECT.md` — vision, stack, design language, skill organization.
2. `.kilo/CONTEXT.md` — current status, known issues, next step.
3. `.kilo/skills/SKILLS.md` — map; open the skill(s) for your task domain.
4. Relevant skill(s): follow Rules/Do/Don't/Checklist + their References.
5. Source files only as needed: `src/App.jsx`, `src/sections/*`, `src/components/*`,
   `tailwind.config.js`, `src/index.css` (folder-structure.md).

**Rules**
- Don't read the whole repo blindly; load by relevance to save tokens (token-efficiency.md).
- If the task touches backend/roadmap, also read backend-roadmap.md + dependent skills.
- After finishing, update CONTEXT.md/DECISIONS.md if anything changed (memory.md).

**Do**
- Read the handbook before touching code. Open only the skill you need.

**Don't**
- Don't skip PROJECT/CONTEXT and start editing. Don't over-read unrelated files.

**Checklist**
- [ ] Handbook read in order; relevant skill opened.
- [ ] Source read only where needed; docs updated post-task.

**References:** See memory.md · token-efficiency.md · ai-agent-rules.md · SKILLS.md.
