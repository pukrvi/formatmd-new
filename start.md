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
