# asset-management.md

**Purpose:** How to handle images, fonts, icons, and static files.
**When to use:** Adding/replacing any asset.

**Rules**
- Static, public files → `public/` (served at root, e.g. `/favicon.svg`).
- Local importable assets → `src/assets/` (has hero.png, svg logos currently unused).
- PROBLEM: all imagery is hard-coded to external `lh3.googleusercontent.com/aida-public`
  URLs (fragile, no fallback). Before production, download to `public/` or a CDN
  and reference locally (DECISIONS ADR-6). See image-optimization.md.
- Fonts: Playfair Display + Inter + Material Symbols imported in `src/index.css`
  via Google Fonts `<link>`/CSS import. Keep there; don't scatter font imports.
- Icons: Material Symbols via `<span className="material-symbols-outlined">`.

**Do**
- Prefer local/versioned assets over external hotlinks for production.
- Use `public/` for files referenced by absolute path.

**Don't**
- Don't hotlink external image hosts in production.
- Don't duplicate asset files; reuse existing `src/assets` where possible.

**Checklist**
- [ ] Asset placed in correct folder (`public/` vs `src/assets/`).
- [ ] External hotlinks scheduled for local migration.
- [ ] Fonts centralized in index.css.

**References:** See image-optimization.md · design-system.md · folder-structure.md · dependency-management.md.
