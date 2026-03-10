# FormatMD — Performance Audit

> Audited: 2026-03-09

---

## Issues

### PERF-001: Preview re-renders on every keystroke — HIGH
- **File:** `src/components/TerminalPreview.tsx:44-174`
- `getStyledHTML()` runs complex regex and table parsing on every character typed.
- Table parsing (lines 135-160) is O(n^2).
- **Impact:** Sluggish preview with 5000+ words.
- **Fix:** Debounce `getStyledHTML()` by 150-300ms. Use `useDeferredValue` or `requestIdleCallback`.

### PERF-002: Background animations never stop — MEDIUM
- **File:** `src/pages/Index.tsx:116-129`
- 4 floating blobs with `blur-3xl` + `animate-float` run continuously.
- Each triggers GPU compositing and repaints.
- **Fix:** Add `will-change: transform` and disable when `hasContent === true`.

### PERF-003: Font loading blocks render — MEDIUM
- **File:** `src/index.css:1-6`
- `@import` for Poppins and Fira Code is render-blocking.
- Multiple weights loaded synchronously.
- **Fix:** Add `font-display: swap` to font declarations. Lazy-load non-critical weights.

### PERF-004: Image compression blocks main thread — LOW
- **File:** `src/components/FeedbackModal.tsx:19-51`
- Canvas-based image compression runs on main thread.
- Large images (4MB+) can freeze the UI.
- **Fix:** Move compression to a Web Worker.

### PERF-005: 47 unused shadcn/ui components in bundle — LOW
- ~44 of 47 installed components are never used.
- Estimated 200KB+ of dead code (before tree-shaking).
- Tree-shaking should handle most, but barrel exports may prevent it.
- **Fix:** Audit and remove unused components. Or ensure each is imported directly (not from barrel).

### PERF-006: No code splitting — LOW
- **File:** `src/App.tsx`
- All routes load eagerly. Docs page loaded even if user never visits it.
- **Fix:** Use `React.lazy()` + `Suspense` for `/docs` and `NotFound` routes.

---

## Metrics to Track

| Metric                  | Target   | Tool              |
| ----------------------- | -------- | ----------------- |
| LCP (Largest Content)   | < 2.5s   | Lighthouse        |
| FID (First Input Delay) | < 100ms  | Web Vitals        |
| CLS (Layout Shift)      | < 0.1    | Lighthouse        |
| Bundle size (gzipped)   | < 200KB  | `vite-plugin-visualizer` |
| Preview render time     | < 50ms   | Performance API   |
