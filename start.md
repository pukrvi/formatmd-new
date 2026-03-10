# START.md

## Purpose
Fast runbook for how the bot should operate on every run in FormatMD.

## Run Start (Always)
1. Read `CLAUDE.md` and `MEMORY.md`.
2. Confirm task scope and success criteria.
3. Make a short step plan before editing.

## Memory Rules
- `MEMORY.md` is mandatory and persistent.
- Keep `MEMORY.md` up to date with current product status.
- After every completed process/run, append:
  - task
  - files changed
  - validations run
  - risks/follow-ups

## Hard Scope Guardrail
- Only edit inside:
  - `/Users/gtmbuddy/Documents/formatmd/formatmd-new/`

## Product + Brand Baseline
- Product name: `FormatMD`.
- UX goal: clean markdown editing, themed preview, reliable copy/export.
- Design consistency:
  - terminal-inspired UI
  - `Poppins` for UI text
  - `Fira Code` for editor/code surfaces
  - preserve theme consistency and interaction quality

## Coding Behavior
- Follow existing architecture and patterns first.
- Use best practices and strongly typed TypeScript/React code.
- Keep changes minimal and task-focused.
- Add accurate inline comments for non-obvious logic.
- Do not touch generated files unless explicitly required.

## Anthropic-Style CLAUDE.md Discipline
- Keep instruction context concise and structured.
- Keep commands explicit; do not guess workflow commands.
- Prefer small, modular steps over large one-shot changes.
- Update instruction files when workflow/rules drift.

## Quality Protocol (Every Code Change)
1. Run quality checks:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
2. Do browser verification (required for UI changes):
   - desktop sanity check
   - mobile/responsive sanity check
3. If anything fails, report exact failing command + first actionable error.

## Delivery Protocol
- Prepare a PR with `Notes`:
  - scope
  - why
  - validation evidence
  - docs updated
  - risks/follow-ups
- Update docs on every completed request:
  - `README` files
  - developer docs
  - formal product wiki (`docs/wiki/`) with each PR

## End-of-Run Checklist
1. Confirm requested outcome is complete.
2. Confirm quality + browser checks were handled.
3. Update `MEMORY.md`.
4. Summarize exactly what changed and what remains.

## Current Run Status (2026-03-10)
- ~~Read `start.md` and `CLAUDE.md`~~
- ~~Use skills flow to discover relevant audit capabilities~~
- ~~Run static bug/performance/code-quality audit~~
- ~~Implement production hardening changes in `formatmd-new`~~
- ~~Update run tracker and memory log~~
- Automated validation (`lint`/`test`/`build`) blocked: Node/npm not installed in this environment.

## Current Run Status (2026-03-10 — Git Setup)
- ~~Diagnose Git push issue~~
- ~~Configure local Git identity and defaults in `formatmd-new`~~
- ~~Confirm commit history and clean working tree~~
- Pending: add remote `origin` and push once target remote URL is provided.

## Current Run Status (2026-03-10 — Prod Readiness Dependency Pass)
- ~~Read `start.md` and `CLAUDE.md`~~
- ~~Review `skills/` pending improvements and pick one deployment-focused task~~
- ~~Remove unused runtime/provider code (`@tanstack/react-query`)~~
- ~~Remove unused dependency declarations from `package.json`~~
- Validation blocked: `npm` is unavailable in this environment (`command not found`).

## Current Run Status (2026-03-10 — Skills Consolidation)
- ~~Read `start.md`, `CLAUDE.md`, and all `skills/` files~~
- ~~Resolve conflicting status notes against current codebase~~
- ~~Consolidate overlapping skills docs into canonical set~~
- ~~Create master production task list and completed ledger~~
- `skills/` now reduced to 5 canonical files.

## Current Run Status (2026-03-10 — QA Pass + Skills Category Merge)
- ~~Attempt full QA commands across codebase (`lint`/`test`/`build`)~~
- QA blocked: `npm` unavailable (`command not found`).
- ~~Run static bug/QA checks (security hotspots, stale lockfile deps, test coverage presence)~~
- ~~Re-merge `skills/` into requested 4 category files~~

## Current Run Status (2026-03-10 — PR Packaging)
- ~~Read `start.md` and `CLAUDE.md`~~
- ~~Prepare branch + PR-ready commit for all current changes~~
- `gh` CLI unavailable in environment; PR creation must be completed via GitHub web URL after push.

## Current Run Status (2026-03-10 — Footer + Fold Fixes)
- ~~Fix editor opening/stuck layout after paste~~
- ~~Make footer light-theme compatible~~
- ~~Move documentation into second fold on homepage~~
- ~~Make hero fill first fold responsively across devices~~
- Validation:
  - `npm run build` passed
  - `npm run lint` failed due existing config rule (`no-require-imports` in `tailwind.config.ts`)
  - `npm run test` failed because no test files exist

## Current Run Status (2026-03-10 — PR Publish Run)
- ~~Run QA gate in GitHub-backed repo clone~~
- ~~Update `skills/` canonical tracker with current QA outputs~~
- ~~Package current homepage/footer/docs changes for PR~~
- Pending external action: open and merge PR via GitHub web URL (no `gh` CLI in environment).
