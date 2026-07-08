# image-optimization.md

**Purpose:** Keep images fast and crisp.
**When to use:** Adding/replacing imagery, fixing perf.

**Rules**
- Modern formats: serve `avif`/`webp` with fallback; avoid raw PNG/JPG at large size.
- Responsive `srcset`/`sizes` for hero/project images; cap dimensions to display size.
- Lazy-load below-the-fold images (`loading="lazy"`); preload the LCP hero image.
- Keep decorative parallax/moon images small; they're `opacity` blended, so compression is fine.
- Current project cards are `aspect-[4/5]` — export at that ratio to avoid layout shift.

**Do**
- Migrate external URLs to optimized local/CDN assets (asset-management.md).
- Use `object-cover` + fixed aspect ratios to prevent CLS.

**Don't**
- Don't ship multi-MB hero images. Don't change aspect ratio without updating CSS.

**Checklist**
- [ ] Images in avif/webp, appropriately sized.
- [ ] LCP image preloaded; offscreen images lazy.
- [ ] Fixed aspect ratios → no layout shift.

**References:** See asset-management.md · performance.md · responsive-design.md.
