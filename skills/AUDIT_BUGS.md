# FormatMD — Bug Audit

> Audited: 2026-03-09
> Updated: 2026-03-10 (status of all bugs refreshed)

---

## CRITICAL — ALL RESOLVED

### BUG-001: Footer animation gets stuck after paste — FIXED
- **Fixed in:** Phase 1 Bug Fixes + Quick Fixes P1
- **Resolution:** Initially wrapped in CSS opacity/maxHeight transition. Later fixed regression by switching to `position: fixed` with `translateY` transform to avoid flex layout interference.

### BUG-002: /docs and /features navigate to same page — FIXED
- **Fixed in:** Phase 1 Bug Fixes
- **Resolution:** Added `id="features"` anchor to Docs.tsx with `scroll-mt-16`. Added hash navigation handler in Footer.tsx. Added `scroll-behavior: smooth` to CSS.

---

## MEDIUM

### BUG-003: Toolbar button background mismatch — FIXED
- **Fixed in:** Phase 1 Bug Fixes
- **Resolution:** Added CSS transitions (150ms), `focus-visible` ring styles, and `aria-label` attributes to all toolbar buttons.

### BUG-004: Animated placeholder can get stuck — FIXED
- **Fixed in:** Phase 1 Bug Fixes
- **Resolution:** Added `mountedRef` guard with cleanup on unmount. All `setTimeout` callbacks now check `mountedRef.current` before updating state.

### BUG-005: Undo/redo unreliable across browsers — OPEN
- **File:** `src/components/TerminalPreview.tsx`
- **Issue:** Uses deprecated `document.execCommand('undo')` / `document.execCommand('redo')`. Inconsistent in Firefox.
- **Fix:** Implement custom undo/redo stack. Tracked as TD-007 in TECH_DEBT.md.

### BUG-006: Duplicate paste handling logic — FIXED
- **Fixed in:** Phase 1 Bug Fixes
- **Resolution:** Created shared `useMarkdownPaste` hook in `src/hooks/useMarkdownPaste.ts`. Both Index.tsx and TerminalPreview.tsx now use the same hook with different insertion strategies.

---

## LOW

### BUG-007: Theme name inconsistency — FIXED
- **Fixed in:** Quick Fixes P1
- **Resolution:** Renamed CSS class `theme-cappuccino` to `theme-vaporwave`. Renamed `isCappuccino` to `isVaporwave` in TerminalPreview.tsx. All names now consistently use `vaporwave`.

### BUG-008: Copy button feedback is inverted — FIXED
- **Fixed in:** Quick Fixes P1
- **Resolution:** Swapped styles so "Copied!" state shows prominent green background, default "Copy" shows subtle transparent style.

### BUG-009: Theme switch icon semantics backwards — FIXED
- **Fixed in:** Quick Fixes P1
- **Resolution:** Swapped Sun/Moon icons. Sun now shows in dark mode (switch to light), Moon in light mode (switch to dark).

### BUG-010: Download dropdown z-index conflict — OPEN
- **File:** `src/components/TerminalPreview.tsx:372`
- **Issue:** Hardcoded `z-[9999]` can conflict with FeedbackModal.
- **Fix:** Use a z-index scale system. Tracked in CODE_OPTIMIZATION_AUDIT.md (OPT-052).

### BUG-011: ReactMarkdown imported but never used — FIXED
- **Fixed in:** Phase 1 Bug Fixes
- **Resolution:** Removed the import. Note: `react-markdown` package still in `package.json` — tracked for removal in CODE_OPTIMIZATION_AUDIT.md (OPT-003).

### BUG-012: 404 page not themed — OPEN
- **File:** `src/pages/NotFound.tsx`
- **Issue:** Uses generic `bg-muted` instead of the app's custom theme system.
- **Fix:** Apply current theme colors to 404 page.

---

## Summary

| Status | Count |
|--------|-------|
| Fixed  | 9     |
| Open   | 3     |
| Total  | 12    |
