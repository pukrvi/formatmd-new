# 2026-03-10 — Consistency Fixes, QA, and Production Readiness Plan

## Scope
- Fix BUG-012: Theme the NotFound page using FormatMD theme model.
- Fix documentation/code inconsistencies:
  - SEO descriptions (Index.tsx, index.html, JSON-LD) now list all 5 export formats.
  - Footer now includes Docs link alongside Home and Feedback.
  - CLAUDE.md brand rules now include text colors for both themes.
  - PROD_READY skill doc corrected stale claim about missing tests.
  - ALL_BUGS.md updated to reflect BUG-012 resolution.
- Create `skills/PRODUCTION_READINESS_PLAN.md` — phased plan covering security, stability, performance, testing, accessibility, and launch.

## Why
- Eliminate inconsistencies between code behavior and documentation.
- Resolve the last open bug (BUG-012).
- Provide a clear, actionable path from current state to production deployment.

## Validation Evidence
- `npm run lint` -> passed (0 errors, 2 non-blocking warnings in UI primitives)
- `npm run test` -> passed (`src/lib/themes.test.ts`, 3 tests)
- `npm run build` -> passed

## Docs Updated
- `CLAUDE.md` (brand rules)
- `skills/ALL_BUGS.md`
- `skills/PROD_READY_PERFORMANCE_TECH_DEBT.md`
- `skills/PRODUCTION_READINESS_PLAN.md` (new)
- `docs/wiki/2026-03-10-consistency-fixes-qa-prod-plan.md` (this file)

## Risks / Follow-up
- `theme-clean` CSS class still maps to `infiniti` theme — cosmetic naming mismatch, not a functional issue.
- Main bundle exceeds 500KB warning — tracked in production readiness plan Phase 3.
- DOMPurify integration still pending — tracked as Phase 1.1 in production readiness plan.
