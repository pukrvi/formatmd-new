# Changelog

Recent changes to FormatMD, organized by date.

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
- Aligned Supabase schema/types for `email` and `type: request`

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
