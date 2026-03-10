# FormatMD — SEO Audit

> Audited: 2026-03-09

---

## Current State

### What Exists
- Basic `<title>` and `<meta description>` in `index.html`
- Open Graph tags (og:title, og:description, og:image)
- Twitter Card tags (twitter:card, twitter:image)
- `robots.txt` allowing all bots

### What's Wrong
- `og:image` points to external Lovable preview URL (will break if Lovable changes)
- `twitter:site` is "@Lovable" — should be FormatMD's own handle
- `og:url` is missing
- No canonical URL
- No sitemap

---

## Missing Tags (index.html)

### Must Add
```html
<meta property="og:url" content="https://formatmd.app/" />
<meta property="og:locale" content="en_US" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="https://formatmd.app/" />
<meta name="theme-color" content="#050a14" />
<meta name="keywords" content="markdown formatter, markdown styler, copy markdown, export markdown, rich text, html converter" />
```

### PWA / Mobile
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<link rel="manifest" href="/manifest.json" />
```

### Performance
```html
<link rel="preconnect" href="https://eovxyoxicltaczwcufix.supabase.co" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

---

## Missing: Structured Data (JSON-LD)

Add to `index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "FormatMD",
  "description": "Markdown formatter and styler — paste, theme, and export styled markdown",
  "url": "https://formatmd.app",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": "InfinitiGRID"
  }
}
</script>
```

---

## Missing: Sitemap

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemapschemas.org/sitemap/0.9">
  <url>
    <loc>https://formatmd.app/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://formatmd.app/docs</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

Update `robots.txt`:
```
Sitemap: https://formatmd.app/sitemap.xml
```

---

## Missing: Per-Page SEO

Currently, all routes share the same `<title>` and `<meta>` from `index.html`. Each page should have unique metadata.

**Options:**
1. `react-helmet-async` — set `<title>` and `<meta>` per route component
2. Vite SSG plugin for static site generation (better for crawlers)

### Recommended Titles
| Route  | Title                                          |
| ------ | ---------------------------------------------- |
| `/`    | FormatMD — Paste, Style & Export Markdown      |
| `/docs`| Documentation — FormatMD                       |
| `*`    | Page Not Found — FormatMD                      |

---

## Ranking Strategy

### Target Keywords
- "markdown formatter online"
- "copy markdown as html"
- "style markdown for google docs"
- "markdown to rich text converter"
- "markdown theme editor"
- "paste markdown into notion"

### Content Opportunities
1. **Blog / Guide pages** — "How to paste styled markdown into Google Docs"
2. **Comparison pages** — "FormatMD vs Dillinger vs StackEdit"
3. **Feature pages** — Individual pages for each export format
4. **Use case pages** — "FormatMD for developers", "FormatMD for writers"

### Technical SEO
- Add `hreflang` for future i18n
- Implement dynamic `og:image` per page (use Vercel OG or similar)
- Add breadcrumb schema on Docs page
- Add FAQPage schema on landing page
