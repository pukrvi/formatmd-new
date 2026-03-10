# 2026-03-10 — Footer/Fold UX Fixes + PR Publish Run

## Scope
- Fix homepage editor opening flow after paste by switching to explicit landing/editor conditional rendering.
- Improve footer light-mode design and route hash navigation behavior.
- Move documentation into homepage second fold and reuse the same content block in `/docs`.
- Package all current changes into a PR-ready branch with updated run logs and skills tracker.

## Why
- Resolve blank/blocked first-fold behavior reported in UI feedback.
- Ensure footer does not conflict with light theme readability and navigation expectations.
- Keep documentation discoverable directly on homepage without content drift between pages.
- Keep memory/skills trackers aligned with actual QA execution outcomes.

## Validation Evidence
- `npm install` -> passed
- `npm run lint` -> failed
  - `tailwind.config.ts:103:13` `@typescript-eslint/no-require-imports` (`require("tailwindcss-animate")`)
- `npm run test` -> failed (`No test files found`)
- `npm run build` -> passed

## Risks / Follow-up
- Lint and test are not green due existing project-level issues.
- Next technical pass should:
  1. Replace `require()` usage in `tailwind.config.ts` with ESM import style accepted by lint rules.
  2. Add baseline test files so `vitest run` exits successfully.

## PR Link
- `https://github.com/pukrvi/formatmd-new/pull/new/fix/footer-fold-docs-pr-2026-03-10`
