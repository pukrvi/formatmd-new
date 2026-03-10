# 2026-03-10 — Clean Markdown Default + skill.MD Export Option

## Scope
- Remove automatic `---` wrapping from default `.md` downloads.
- Add dedicated `skill.MD` export option that keeps delimiter-wrapped format.
- Keep copy and standard exports aligned to clean markdown content.
- Update UI copy in features section to reflect the new behavior.

## Why
- Default output should match exactly what users see in editor/preview.
- Wrapped `---` format remains available for skill-style workflows without forcing it globally.

## Validation Evidence
- `npm run lint` -> passed (2 non-blocking warnings in UI primitive files)
- `npm run test` -> passed (`src/lib/themes.test.ts`, 3 tests)
- `npm run build` -> passed

## Risks / Follow-up
- `skill.MD` currently downloads to filename `skill.md`; rename is possible if required.
- Build chunk-size warning remains unrelated and unchanged.
