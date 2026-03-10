# Contributing

Guidelines for contributing to FormatMD.

---

## Development Workflow

1. **Branch** from `main`
2. **Make changes** in `src/` only
3. **Run quality gates** before committing
4. **Submit a PR** with structured notes

---

## Quality Gates

Run all three before every PR:

```bash
npm run lint    # ESLint — 0 errors required
npm run test    # Vitest — all tests must pass
npm run build   # Vite build — must succeed
```

For UI changes, also do a **browser sanity check**:
- Desktop viewport
- Mobile responsiveness
- Core flow: paste/edit → preview → copy/export

---

## PR Notes Template

Every PR must include structured notes:

```markdown
## Notes

**Scope:** What was changed and where

**Why:** Rationale for the change

**Validation:**
- [ ] `npm run lint` passed
- [ ] `npm run test` passed
- [ ] `npm run build` passed
- [ ] Browser check (if UI changed)

**Docs updated:** List any docs/wiki pages updated

**Risks / Follow-up:** Known risks or future work
```

---

## Coding Standards

| Rule | Detail |
|------|--------|
| Language | TypeScript-first, strongly typed React |
| Styling | Tailwind CSS utility classes |
| Components | Reuse existing components before creating new ones |
| Comments | Only for non-obvious logic; keep accurate |
| Naming | Follow existing patterns in the codebase |
| Imports | Prefer absolute paths with `@/` alias |

---

## Architecture Rules

- **Smallest correct change** — avoid unrelated refactors
- **Don't over-engineer** — no speculative abstractions
- **Theme coverage** — all new UI must work with both themes
- **Editor-first** — the editor workflow is the primary UX
- **Centralized formatting** — keep conversion logic in `src/lib/`

---

## File Organization

| Directory | Contains |
|-----------|----------|
| `src/pages/` | Route-level page components only |
| `src/components/` | Feature UI components |
| `src/components/ui/` | shadcn/ui primitives (don't modify directly) |
| `src/lib/` | Utilities, converters, theme definitions |
| `src/hooks/` | Shared React hooks |
| `docs/wiki/` | Wiki documentation (update with PRs) |
| `skills/` | QA, bugs, SEO, and tracking documents |

---

## Testing

Tests use **Vitest** with **JSDOM** for DOM simulation.

```bash
# Run once
npm run test

# Watch mode
npm run test:watch
```

Test files live alongside source or in `src/test/`.

---

## Documentation Updates

When your change affects documented behavior:

1. Update relevant wiki pages in `docs/wiki/`
2. Update `README.md` if the change affects setup, commands, or features
3. Add a changelog entry to `docs/wiki/Changelog.md`
4. If workflows or commands change, update `CLAUDE.md`

---

## Security

- **No secrets in code** — use environment variables
- **Sanitize user input** — especially for HTML rendering
- **OWASP awareness** — watch for XSS, injection, etc.
- **RLS is the boundary** — Supabase anon keys are publishable; security comes from Row-Level Security policies

---

## For AI Agents

If you are an AI agent contributing:

1. Read `CLAUDE.md` for operating instructions and scope guardrails
2. Follow the **Verification-First Workflow**: plan → implement → lint/test/build
3. Update `MEMORY.md` after completing tasks
4. Add wiki entries for significant changes
5. Keep changes minimal and focused
