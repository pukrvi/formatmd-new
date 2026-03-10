# 2026-03-10 — Feedback Modal Single-Form Redesign

## Scope
- Remove bug/feature toggle tabs from feedback modal.
- Keep one unified request form with:
  - email
  - request heading
  - description
  - optional attachments
- Add privacy tooltip near email field clarifying usage.
- Align Supabase schema/types to support `email` and `type: request`.

## Why
- Reduce friction and simplify user flow.
- Capture responder contact for request follow-up and spam prevention.
- Keep data model aligned with UI so submissions are reliable in production.

## Validation Evidence
- `npm run lint` -> passed (2 non-blocking warnings in UI primitive files)
- `npm run test` -> passed (`src/lib/themes.test.ts`, 3 tests)
- `npm run build` -> passed

## Risks / Follow-up
- Apply migration `20260310124500_feedback_request_form.sql` before production rollout.
- Without migration, insert will fail for `email` column / `request` type.
