# FormatMD — SEO

> Last Verified: 2026-03-10
> Canonical SEO status and remaining actions

---

## Current Status

Core SEO baseline is implemented:

- Canonical URL, robots, keywords, theme-color, OG/Twitter tags in `index.html`.
- JSON-LD structured data in `index.html`.
- `public/sitemap.xml` and `public/robots.txt` present.
- Route-level meta handling via `react-helmet-async` and `SEOHead`.
- Self-hosted OG image asset in `public/og-image.svg`.

---

## Remaining SEO Tasks

- [ ] `SEO-001` Confirm final production domain and update all absolute URLs if domain changes.
- [ ] `SEO-002` Validate social preview rendering after deploy (Twitter/X + Facebook debuggers).
- [ ] `SEO-003` Consider adding FAQ schema and docs-page breadcrumb schema.
- [ ] `SEO-004` Consider PNG fallback OG image for platforms that do not render SVG cards well.

---

## Post-Deploy QA Checklist

- [ ] Validate sitemap is reachable from production URL.
- [ ] Validate canonical/og:url match deployed domain.
- [ ] Validate JSON-LD with schema validator.
- [ ] Validate route-specific titles/descriptions for `/`, `/docs`, `*`.

