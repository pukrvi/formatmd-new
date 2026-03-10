# FormatMD — Prod Ready + Performance + Tech Debt

> Last Verified: 2026-03-10
> Canonical owner file for deployment readiness, performance, and technical debt

---

## QA Run Status (This Session)

Attempted full QA commands across the whole codebase:

- `npm run lint` -> `zsh:1: command not found: npm`
- `npm run test` -> `zsh:1: command not found: npm`
- `npm run build` -> `zsh:1: command not found: npm`

Static QA findings run successfully:

- No test files currently present under `src/`.
- `dangerouslySetInnerHTML` present in `src/components/TerminalPreview.tsx`.
- `tsconfig.app.json` still has `strict: false`, `noImplicitAny: false`, `noUnusedLocals: false`, `noUnusedParameters: false`.
- `package-lock.json` still contains removed dependencies (`@tanstack/react-query`, `react-markdown`, `next-themes`, `@hookform/resolvers`).

---

## Deploy Blockers (P0)

- [ ] `PR-001` Install/Toolchain readiness
  - Unblock Node/npm in environment and rerun full QA gate.

- [ ] `PR-002` XSS sanitization on HTML render path
  - Add trusted sanitizer before rendering/copy/export HTML.

- [ ] `PR-003` Route-level error boundaries
  - Prevent full-app blank screen on runtime exceptions.

- [ ] `PR-004` Supabase env validation
  - Fail fast if required env vars are missing/invalid.

- [ ] `PR-005` Lockfile reconciliation
  - Align lockfile with `package.json`; keep one package manager path.

- [ ] `PR-006` Security headers in deployment config
  - Add CSP + standard hardening headers.

---

## Performance Backlog

- [ ] `PF-001` Debounce or defer markdown preview rendering for large docs.
- [ ] `PF-002` Move image compression in Feedback modal off the main thread (worker path).
- [ ] `PF-003` Add `will-change` hints only where high-frequency animation is unavoidable.

Completed performance wins:
- Route lazy loading is already implemented.
- Background animations are already paused during active editing.
- Major dead UI/component cleanup already completed.

---

## Tech Debt Backlog

- [ ] `TD-001` Enable TypeScript strictness incrementally.
- [ ] `TD-002` Re-enable dead-code checks (`noUnusedLocals`, `noUnusedParameters`, eslint no-unused-vars).
- [ ] `TD-003` Refactor `TerminalPreview.tsx` into smaller subcomponents.
- [ ] `TD-004` Refactor `MarkdownToolbar.tsx` delimiter logic into dedicated module/hook.
- [ ] `TD-005` Add unit tests for core logic (`htmlToMarkdown`, `markdownToHtml`, themes, paste hook).
- [ ] `TD-006` Add one integration test for paste -> preview -> copy flow.

Resolved debt items:
- Duplicate paste handling resolved via shared hook.
- Legacy unused component/dependency scaffolding removed from active source tree.
- React Query provider wiring removed from app shell.

---

## Dependency Minimization Rules

- Keep dependency additions blocked by default unless required for security or correctness.
- Every dependency must have direct import usage or a documented justification.
- Sync lockfile after every dependency change.

