# FormatMD — Production Readiness Plan

> Created: 2026-03-10
> Status: Active
> Goal: Ship FormatMD to production with confidence

---

## Phase 1: Security (P0 — Ship Blockers)

### 1.1 HTML Sanitization
- **Issue**: `dangerouslySetInnerHTML` in `TerminalPreview.tsx` renders unsanitized output.
- **Fix**: Add DOMPurify (or equivalent) to sanitize `markdownToStyledHtml` output before render, copy, and export.
- **Files**: `src/lib/markdownToHtml.ts`, `src/components/TerminalPreview.tsx`
- **Effort**: Small

### 1.2 Content Security Policy
- **Issue**: No CSP or security headers configured.
- **Fix**: Add CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy headers in hosting config (Vercel/Netlify/etc).
- **Files**: Deployment config (`vercel.json`, `netlify.toml`, or equivalent)
- **Effort**: Small

### 1.3 Supabase Environment Validation
- **Issue**: App may silently fail if Supabase env vars are missing.
- **Fix**: Add runtime validation in `src/integrations/supabase/client.ts` — fail fast with clear error.
- **Files**: `src/integrations/supabase/client.ts`
- **Effort**: Small

---

## Phase 2: Stability (P0 — Ship Blockers)

### 2.1 Error Boundaries
- **Issue**: No route-level error boundaries; runtime exceptions can blank the screen.
- **Fix**: Add React error boundary wrapper around route components in `App.tsx`.
- **Files**: `src/App.tsx`, new `src/components/ErrorBoundary.tsx`
- **Effort**: Small

### 2.2 Lockfile Reconciliation
- **Issue**: `package-lock.json` contains stale dependencies not in `package.json`.
- **Fix**: Delete `node_modules` and `package-lock.json`, run `npm install` fresh.
- **Effort**: Small

---

## Phase 3: Performance (P1 — Pre-Launch Polish)

### 3.1 Preview Render Debounce
- **Issue**: Large documents may cause jank during typing in split/preview mode.
- **Fix**: Debounce `markdownToStyledHtml` calls with ~150ms delay or use `useDeferredValue`.
- **Files**: `src/components/TerminalPreview.tsx`
- **Effort**: Small

### 3.2 Bundle Size Optimization
- **Issue**: Main chunk is 539KB (161KB gzip) — exceeds Vite's 500KB warning.
- **Fix**: Code-split heavy paths. Consider lazy-loading `MarkdownToolbar` and Supabase client.
- **Files**: `src/App.tsx`, `src/components/TerminalPreview.tsx`
- **Effort**: Medium

### 3.3 Image Compression Off Main Thread
- **Issue**: Feedback modal compresses images synchronously on main thread.
- **Fix**: Move canvas compression to a Web Worker or use `OffscreenCanvas`.
- **Files**: `src/components/FeedbackModal.tsx`
- **Effort**: Medium

---

## Phase 4: Quality & Testing (P1 — Pre-Launch)

### 4.1 Core Logic Unit Tests
- **Tests needed**:
  - `markdownToHtml.ts` — headings, lists, code blocks, tables, inline styles, XSS vectors
  - `htmlToMarkdown.ts` — round-trip fidelity
  - `downloadHandler.ts` — each format produces correct output
  - `useMarkdownPaste` — HTML paste conversion
- **Effort**: Medium

### 4.2 Integration Test: Paste-Preview-Copy Flow
- **Test**: Simulate paste -> verify preview HTML -> verify clipboard content.
- **Effort**: Medium

### 4.3 TypeScript Strictness
- **Issue**: `strict: false` in `tsconfig.app.json`.
- **Fix**: Enable incrementally: `strict: true`, fix type errors one file at a time.
- **Effort**: Medium-Large

---

## Phase 5: Accessibility & Mobile (P2 — Post-Launch)

### 5.1 WCAG AA Contrast Audit
- Audit opacity-based text colors in both themes.
- Ensure all interactive elements meet 4.5:1 contrast ratio.

### 5.2 ARIA Improvements
- Feedback modal: clearer labels and status announcements.
- Animated placeholder: mark as decorative or use `aria-live` region.

### 5.3 Mobile Responsiveness
- Toolbar horizontal scroll/overflow on narrow screens.
- Terminal header stats collapse on small devices.
- Footer link wrapping polish.

---

## Phase 6: SEO & Launch (P2 — Launch Day)

### 6.1 Domain & URL Finalization
- Confirm production domain, update all canonical/og:url references.

### 6.2 Social Preview Validation
- Test OG image rendering on Twitter/X, Facebook, LinkedIn debuggers.
- Consider PNG fallback for OG image (SVG support varies).

### 6.3 Schema Validation
- Validate JSON-LD with Google Rich Results Test.
- Consider FAQ and breadcrumb schema for `/docs`.

---

## Launch Checklist

- [ ] Phase 1 complete (security)
- [ ] Phase 2 complete (stability)
- [ ] Phase 3 items triaged (performance)
- [ ] Phase 4: at least core logic tests passing
- [ ] Supabase migration applied (`20260310124500_feedback_request_form.sql`)
- [ ] Production domain confirmed and URLs updated
- [ ] Manual smoke test: paste -> preview -> copy -> export (all formats)
- [ ] Manual smoke test: feedback submission
- [ ] Manual smoke test: theme switching persists across reload
- [ ] Manual smoke test: 404 page renders correctly
- [ ] Security headers verified in production response
