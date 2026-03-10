# FormatMD — Technical Debt Register

> Last Updated: 2026-03-09

---

## High Priority

### TD-001: TypeScript strict mode disabled
- **File:** `tsconfig.json`
- `noImplicitAny: false`, `strictNullChecks: false`, `strict: false`
- Defeats the purpose of TypeScript. Allows runtime type errors.
- **Effort:** Medium — enable incrementally, fix errors per file.

### TD-002: No error boundaries
- Entire app crashes to blank screen if any component throws.
- **Effort:** Low — add `ErrorBoundary` wrapper at route level.

### TD-003: Duplicate paste handling
- Two separate implementations of HTML→Markdown paste in Index.tsx and TerminalPreview.tsx.
- **Effort:** Low — extract into `useMarkdownPaste` hook.

### TD-004: TerminalPreview.tsx is 485 lines
- Single file handles: editor, preview, stats, exports, paste, theme toggle, view modes.
- **Effort:** Medium — split into: `EditorPane`, `PreviewPane`, `StatsBar`, `ExportMenu`.

### TD-005: No test coverage
- Vitest configured but only example test exists.
- Critical paths untested: paste conversion, theme switching, export generation.
- **Effort:** Medium — prioritize testing `htmlToMarkdown.ts`, `themes.ts`, `getStyledHTML()`.

---

## Medium Priority

### TD-006: 44 unused shadcn/ui components
- Installed but never imported. Tree-shaking may not catch all (barrel exports).
- **Effort:** Low — audit imports, remove unused component files.

### TD-007: Deprecated `document.execCommand` usage
- Used for undo/redo and paste insertion. Deprecated in modern browsers.
- **Effort:** Medium — implement custom undo stack, use Clipboard API.

### TD-008: No build-time env validation
- Supabase client created with potentially undefined values.
- **Effort:** Low — add Zod schema validation in `client.ts`.

### TD-009: Unused dependencies
- `react-markdown` imported but not used (TerminalPreview uses dangerouslySetInnerHTML)
- `next-themes` installed but custom theme system used instead
- `MarkdownInput.tsx` component exists but never rendered
- `NavLink.tsx` component exists but never used
- **Effort:** Low — remove unused imports and files.

### TD-010: Inline style manipulation in toolbar
- `mouseEnter`/`mouseLeave` handlers directly set `style.backgroundColor`.
- Conflicts with Tailwind, no transitions, poor maintainability.
- **Effort:** Low — replace with Tailwind hover/focus classes + CSS custom properties.

---

## Low Priority

### TD-011: No code splitting
- All routes load eagerly.
- **Effort:** Low — wrap routes in `React.lazy()` + `Suspense`.

### TD-012: ESLint rules too permissive
- `@typescript-eslint/no-unused-vars` disabled.
- Dead code accumulates undetected.
- **Effort:** Low — re-enable with `argsIgnorePattern: "^_"`.

### TD-013: Hardcoded creator attribution
- "Puneet Vishnawat @ InfinitiGRID" embedded in component JSX.
- **Effort:** Trivial — move to a `constants.ts` config file.

### TD-014: No `.env.example`
- New contributors won't know required env vars.
- **Effort:** Trivial — create file with placeholder values.

---

## Debt Score: 6/10
**Interpretation:** Functional MVP with manageable debt. No blockers for shipping, but address TD-001 through TD-005 before adding major features to prevent compounding.
