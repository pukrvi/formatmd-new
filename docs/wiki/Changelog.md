# Changelog

Recent changes to FormatMD, organized by date.

---

## 2026-05-01

### Synced Scrolling, Toolbar Background, Documentation Sweep
**PR:** `feat/scroll-lock-toolbar-bg-docs`

- **Synced scroll** in Split view: editor and preview scroll together by default. New Lock/Unlock toggle in the toolbar action area, visible only in Split mode. Locked state is the default. Sync is proportional (`scrollTop / scrollMax` ratio), implemented via native `addEventListener` (React's `onScroll` prop is unreliable for divs across browsers). Feedback loops blocked by an `isSyncingScroll` ref.
- **Toolbar row background** unified: lifted the `panel + 30%` tint from the inner `MarkdownToolbar` up to the parent toolbar row so the formatting buttons (left) and action buttons (right) share one consistent background. Fixes the visible color seam.
- **Documentation sweep**: removed every remaining stale Supabase reference from wiki, skills docs, and on-page docs. README, Features, Architecture, Component-Reference, Getting-Started, Home, FAQ, and Contributing all updated.

**Validation:** lint passed, tests 34/34, build clean.

---

## 2026-04-30

### Self-contained app — Supabase removed, MIT licensed, sticky header
**PR:** `feat/self-contained-mit-license-sticky-header` (merged)

- **Supabase removed entirely.** App is now fully client-side: no backend, no database, no environment variables. Feedback modal rewritten to build a `mailto:pukrvi@gmail.com?subject=...&body=...` URL on submit. Deleted `src/integrations/supabase/`, the `supabase/` directory, `@supabase/supabase-js` dependency, and the `.env`/`.env.example` files.
- **Sticky header** on both `/` and `/docs`. Root cause was `overflow-x-hidden` on the page root cancelling `position: sticky` for descendants on Index, plus a height-zero flex wrapper around the Header on Docs. Both fixed.
- **MIT license**: added `LICENSE` (canonical MIT text, © 2026 Puneet Vishnawat). `package.json` declares `license: "MIT"` plus `author`, `repository`, `homepage`, `bugs`, `keywords`. README badges; new License page in the docs wiki.
- **Architecture refactors**: extracted `clipboardService.ts`, `exportService.tsx`, `markdownStats.ts`, `useTheme.ts`, plus a `normalizeRichTextDom()` pre-pass in `htmlToMarkdown.ts`. Replaced `downloadHandler.ts` with the format-registry pattern.

**Validation:** lint 0 errors, tests 34/34, build clean.

---

## 2026-03-10

### Consistency Fixes, QA, and Production Readiness Plan
**PR:** `docs/consistency-update-2026-03-10`

- Fixed BUG-012: Themed the NotFound page using FormatMD theme model
- Fixed documentation/code inconsistencies:
  - SEO descriptions now list all 5 export formats
  - Footer includes Docs link alongside Home and Feedback
  - CLAUDE.md brand rules include text colors for both themes
  - PROD_READY skill doc corrected stale claim about missing tests
- Created `skills/PRODUCTION_READINESS_PLAN.md` — phased plan covering security, stability, performance, testing, accessibility, and launch

**Validation:** lint passed, test passed, build passed

---

### Feedback Modal Single-Form Redesign
- Removed bug/feature toggle tabs from feedback modal
- Unified into single request form: email, heading, description, optional attachments
- Added privacy tooltip near email field
- Aligned Supabase schema/types for `email` and `type: request` *(superseded — see 2026-04-30 entry above; Supabase has since been removed and the form now uses `mailto:`)*

**Note:** Migration `20260310124500_feedback_request_form.sql` required before production.

**Validation:** lint passed, test passed, build passed

---

### Clean Markdown Default + skill.MD Export
- Removed automatic `---` wrapping from default `.md` downloads
- Added dedicated `skill.MD` export option for delimiter-wrapped format
- Copy and standard exports now aligned to clean markdown
- Updated UI copy in features section

**Validation:** lint passed, test passed, build passed

---

### Skills Documentation Consolidation
- Consolidated `skills/` from 10+ files into 4 canonical files:
  - `PROD_READY_PERFORMANCE_TECH_DEBT.md`
  - `ALL_BUGS.md`
  - `SEO.md`
  - `UI_UX_FLOW.md`
- Removed superseded fragmented docs
- Synced README.md, .env.example, start.md, MEMORY.md

---

## Earlier Changes

### Bug Fixes (12 resolved, 0 open)
| ID | Summary |
|----|---------|
| BUG-001 | Layout shift on theme toggle |
| BUG-002 | Animation lock on landing |
| BUG-003 | Paste duplication in editor |
| BUG-004 | Theme naming inconsistency |
| BUG-005 | Toolbar button state desync |
| BUG-006 | Copy fallback not triggered |
| BUG-007 | Download dropdown z-index |
| BUG-008 | Stats counter off-by-one |
| BUG-009 | Mobile toolbar overflow |
| BUG-010 | Feedback form validation |
| BUG-011 | SEO meta tag duplication |
| BUG-012 | NotFound page unthemed |

See [skills/ALL_BUGS.md](../../skills/ALL_BUGS.md) for full details.

### Dependency Cleanup
- Removed 22 unused packages: React Query, next-themes, react-markdown, recharts, date-fns, embla-carousel, cmdk, input-otp, vaul, zod, react-hook-form, 17 Radix packages, and others

### SEO Baseline
- JSON-LD structured data
- Open Graph and Twitter Card meta tags
- Static sitemap.xml and robots.txt
- Per-page title/description via SEOHead component
