# FormatMD — Code Optimization Audit

> Audited: 2026-03-10
> Scope: Full codebase at `src/`, config files, and `package.json`
> Last updated: 2026-03-10 (Phase A+B implementation)

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total source files | 77 |
| Total LOC | ~6,650 |
| Core app LOC | ~2,550 (pages + components + lib + hooks) |
| Unused UI component LOC | ~3,050 (47 of 49 shadcn/ui files) |
| Dead component files | 2 (`MarkdownInput.tsx`, `NavLink.tsx`) |
| Unused npm dependencies | 7 |
| Used UI components | 5 of 49 |
| Largest file | `TerminalPreview.tsx` (482 LOC) |

**Bottom line:** The app's core logic is ~2,550 lines. The remaining ~4,100 lines are unused scaffolding from the shadcn/ui template. Cleanup would cut the codebase nearly in half without touching any functionality.

---

## Section 1: Dead Code Removal (Immediate Wins)

### ~~OPT-001: Delete unused component files~~ ✅ DONE
- ~~**Files:** `src/components/MarkdownInput.tsx` (49 LOC), `src/components/NavLink.tsx` (28 LOC)~~
- ~~**Impact:** 77 LOC removed. Zero risk.~~

### ~~OPT-002: Remove 47 unused shadcn/ui components~~ ✅ DONE
- ~~**Directory:** `src/components/ui/` — 42+ components deleted~~
- ~~**Kept:** `dialog.tsx`, `button.tsx`, `tooltip.tsx`, `sonner.tsx`~~
- ~~**Also removed:** `toaster.tsx`, `toast.tsx`, `use-toast.ts`~~
- ~~**Impact:** ~2,600 LOC removed.~~

### ~~OPT-003: Remove unused npm dependencies~~ ✅ DONE
- ~~Removed 22 packages from package.json: all unused Radix UI packages (17), `recharts`, `embla-carousel-react`, `cmdk`, `input-otp`, `react-day-picker`, `date-fns`, `next-themes`, `react-resizable-panels`, `react-markdown`, `react-hook-form`, `@hookform/resolvers`, `vaul`, `zod`~~
- ~~Only 3 Radix packages remain: `react-dialog`, `react-slot`, `react-tooltip`~~

### ~~OPT-004: Remove unused hook `use-mobile.tsx`~~ ✅ DONE
- ~~**File:** `src/hooks/use-mobile.tsx` (19 LOC) — deleted~~

### ~~OPT-005: Remove unused hook `use-toast.ts`~~ ✅ DONE
- ~~**File:** `src/hooks/use-toast.ts` (186 LOC) — deleted along with `ui/toaster.tsx` and `ui/toast.tsx`~~

### ~~OPT-006: Remove placeholder test file~~ ✅ DONE
- ~~**File:** `src/test/example.test.ts` (7 LOC) — deleted~~

---

## Section 2: Component Decomposition (Reduce Complexity)

### ~~OPT-010: Extract `getStyledHTML()` to `src/lib/markdownToHtml.ts`~~ ✅ DONE
- ~~Created `src/lib/markdownToHtml.ts` (135 LOC) with `markdownToStyledHtml(markdown, theme)` function~~
- ~~TerminalPreview.tsx now imports and uses the extracted function~~
- ~~Renderer is independently testable~~

### ~~OPT-011: Extract download logic to `src/lib/downloadHandler.ts`~~ ✅ DONE
- ~~Created `src/lib/downloadHandler.ts` (39 LOC) with `downloadMarkdown(markdown, format, styledHtml)` function~~
- ~~TerminalPreview.tsx delegates all downloads to this utility~~

### OPT-012: Extract `DownloadMenu` from TerminalPreview
- **Source:** `TerminalPreview.tsx` lines 363–402 (~40 LOC)
- **What:** The download dropdown button + format options.
- **Why:** Self-contained UI block with its own state (`isDownloadOpen`).
- **Target:** `src/components/DownloadMenu.tsx`
- **Impact:** Cleaner TerminalPreview, reusable export menu.
- **Effort:** Low

### OPT-013: Extract `ViewModeToggle` from TerminalPreview
- **Source:** `TerminalPreview.tsx` lines 266–287 (~22 LOC)
- **What:** Editor/Split/Preview toggle buttons.
- **Target:** `src/components/ViewModeToggle.tsx`
- **Effort:** Low

### OPT-014: Extract `StatsBar` from TerminalPreview
- **Source:** `TerminalPreview.tsx` lines 289–303 (~15 LOC)
- **What:** Word count, char count, read time display.
- **Target:** `src/components/StatsBar.tsx`
- **Effort:** Low

### OPT-015: Split MarkdownToolbar delimiter logic
- **Source:** `MarkdownToolbar.tsx` — delimiter actions array + insertion logic (~80 LOC)
- **What:** The 7 AI-delimiter options and their insertion handlers.
- **Why:** `MarkdownToolbar.tsx` is 364 LOC with two conceptually separate groups: formatting actions and delimiter actions.
- **Target:** Extract delimiter data + handler to `src/hooks/useDelimiterActions.ts` or inline component.
- **Effort:** Medium

### OPT-016: Extract Docs.tsx section data to constants
- **Source:** `Docs.tsx` — `sections` array (~120 LOC of JSX data)
- **What:** Feature card definitions (title, description, icon, details).
- **Target:** `src/lib/docsContent.ts`
- **Why:** Separates content from layout. Easier to update feature descriptions without touching component logic.
- **Effort:** Low

### OPT-017: Extract background orbs from Index.tsx
- **Source:** `Index.tsx` lines 118–131 (~14 LOC)
- **What:** 4 ambient floating blobs.
- **Target:** `src/components/BackgroundOrbs.tsx`
- **Why:** Self-contained visual element. Also enables the PERF-002 optimization (disable when `hasContent`).
- **Effort:** Trivial

---

## Section 3: Performance Optimizations

### OPT-020: Debounce preview rendering
- **Source:** `TerminalPreview.tsx` — `getStyledHTML()` called on every render in preview mode
- **Problem:** On every keystroke, the full markdown is parsed and converted to HTML. Table parsing is O(n^2). Sluggish above ~5,000 words.
- **Fix:** Wrap `getStyledHTML()` output in `useDeferredValue` or debounce with `setTimeout` (150–300ms). Only affects the preview pane; editor remains instant.
- **Impact:** Smooth typing at any document size.
- **Effort:** Low
- **Implementation:**
  ```ts
  const deferredMarkdown = useDeferredValue(markdown);
  // Use deferredMarkdown only for preview pane HTML generation
  ```

### ~~OPT-021: Disable background animations when editing~~ ✅ DONE
- ~~Added `animationPlayState: hasContent ? 'paused' : 'running'` to all 4 background blobs in Index.tsx~~
- ~~Reduces GPU compositing during editing. Saves battery on mobile.~~

### OPT-022: Add `will-change` hints to animated elements
- **Source:** Background orbs, landing state transitions
- **Fix:** Add `will-change: transform, opacity` to elements that animate frequently. Remove after animation completes.
- **Impact:** Smoother transitions, reduced repaints.
- **Effort:** Trivial

### ~~OPT-023: Lazy-load routes with `React.lazy`~~ ✅ DONE
- ~~App.tsx rewritten: `Docs` and `NotFound` pages lazy-loaded with `React.lazy()` + `Suspense`~~
- ~~Smaller initial bundle.~~

### OPT-024: Add `font-display: swap` to font imports
- **Source:** `index.css` lines 1–6
- **Problem:** `@import` for Poppins and Fira Code is render-blocking. Text invisible until fonts load.
- **Fix:** The `@fontsource` packages support `font-display: swap` by default. Verify it's active. If not, add a CSS override:
  ```css
  @font-face { font-family: 'Poppins'; font-display: swap; }
  @font-face { font-family: 'Fira Code'; font-display: swap; }
  ```
- **Impact:** Text renders immediately with fallback font, swaps when loaded. Better LCP.
- **Effort:** Trivial

### OPT-025: Move image compression to Web Worker
- **Source:** `FeedbackModal.tsx` lines 19–51
- **Problem:** Canvas-based image compression (resize + quality reduction) runs on main thread. Large images (4MB+) can freeze UI for 1–2 seconds.
- **Fix:** Create `src/workers/imageCompressor.ts` using `OffscreenCanvas` in a Web Worker.
- **Impact:** Non-blocking image processing.
- **Effort:** Medium

### ~~OPT-026: Memoize `getStyledHTML` result~~ ✅ DONE
- ~~TerminalPreview.tsx now uses `useMemo(() => markdownToStyledHtml(markdown, theme), [markdown, theme])`~~
- ~~Preview pane and copy/export all use the cached `styledHtml` value~~
- ~~Eliminates redundant parsing on every render~~

---

## Section 4: TypeScript & Config Hardening

### OPT-030: Enable `noUnusedLocals` and `noUnusedParameters`
- **File:** `tsconfig.app.json`
- **Current:** Both set to `false`
- **Fix:** Set to `true`. Fix errors (likely `feedbackOpen` in Index.tsx, underscore-prefix unused params).
- **Impact:** TypeScript catches dead code automatically. Prevents future accumulation.
- **Effort:** Low

### OPT-031: Enable `strict` mode incrementally
- **File:** `tsconfig.app.json`
- **Current:** `strict: false`, `noImplicitAny: false`, `strictNullChecks: false`
- **Fix:** Enable one at a time:
  1. `noImplicitAny: true` — catch untyped params
  2. `strictNullChecks: true` — catch null dereferences
  3. `strict: true` — full strictness
- **Impact:** Catches type bugs at build time. Major quality improvement.
- **Effort:** Medium — expect 20–50 errors to fix across the codebase.

### OPT-032: Re-enable `@typescript-eslint/no-unused-vars`
- **File:** `eslint.config.js`
- **Current:** `"@typescript-eslint/no-unused-vars": "off"`
- **Fix:** Set to `["warn", { "argsIgnorePattern": "^_" }]`
- **Impact:** Catches unused imports and variables during linting.
- **Effort:** Low

### OPT-033: Add import sorting ESLint rule
- **Fix:** Add `eslint-plugin-simple-import-sort` or use built-in `sort-imports`.
- **Impact:** Consistent import ordering. Easier to spot duplicates.
- **Effort:** Low

---

## Section 5: Structural Improvements

### ~~OPT-040: Consolidate toast system~~ ✅ DONE
- ~~Removed duplicate Radix toast system from App.tsx~~
- ~~Deleted `ui/toaster.tsx`, `ui/toast.tsx`, `hooks/use-toast.ts`~~
- ~~App now uses only Sonner for toasts~~

### ~~OPT-041: Create constants file for hardcoded values~~ ✅ DONE
- ~~Created `src/lib/constants.ts` with `APP_NAME`, `SITE_URL`, `CREATOR`, `ORG`, `STORAGE_KEYS`~~

### OPT-042: Replace deprecated `document.execCommand`
- **Source:** `TerminalPreview.tsx` — `execCommand('insertText')`, `execCommand('undo')`, `execCommand('redo')`
- **Problem:** `document.execCommand` is deprecated. Undo/redo doesn't work reliably in Firefox.
- **Fix:** Implement a custom undo stack:
  ```ts
  // src/hooks/useUndoStack.ts
  const [history, dispatch] = useReducer(undoReducer, { past: [], present: '', future: [] });
  ```
- **Impact:** Cross-browser undo/redo reliability.
- **Effort:** High — requires rethinking how the editor manages state changes.

### OPT-043: Add error boundaries
- **Problem:** Any uncaught error crashes the entire app to a blank screen.
- **Fix:** Add `ErrorBoundary` component wrapping each route in `App.tsx`.
- **Impact:** Graceful error recovery. User sees error message instead of blank page.
- **Effort:** Low

---

## Section 6: CSS & Styling Optimization

### OPT-050: Reduce inline style usage
- **Problem:** Heavy use of `style={{ backgroundColor: theme.colors.X }}` throughout components. Creates unique style objects on every render.
- **Fix:** Use CSS custom properties set at root level, then reference via Tailwind classes:
  ```css
  :root { --theme-heading: #4CC77C; }
  ```
  ```tsx
  className="bg-[var(--theme-heading)]"
  ```
  The CSS custom properties already exist in `index.css` — they're just not used by components.
- **Impact:** Fewer inline styles, better caching, consistent with Tailwind patterns.
- **Effort:** Medium — requires updating every component that uses `style={{ ... theme.colors ... }}`.

### OPT-051: Purge unused Tailwind classes
- **Fix:** Tailwind 3.4 purges by default. Verify `content` paths in `tailwind.config.ts` cover all files.
- **Current config:** Correctly includes `./src/**/*.{ts,tsx}`.
- **Impact:** Already optimized. No action needed unless build size is unexpectedly large.
- **Effort:** None

### ~~OPT-052: Consolidate z-index scale~~ ✅ DONE
- ~~Changed `z-[9999]` to `z-50` in TerminalPreview.tsx download dropdown~~
- ~~Consistent z-index scale: z-10 (content), z-20 (footer/overlay), z-50 (dropdown)~~

---

## Section 7: Testing Infrastructure

### OPT-060: Add unit tests for critical paths
- **Current coverage:** 0% (placeholder test deleted)
- **Priority test targets:**
  1. `src/lib/htmlToMarkdown.ts` — paste conversion logic (most complex utility)
  2. `src/lib/markdownToHtml.ts` — now extracted and independently testable
  3. `src/lib/themes.ts` — `getTheme()` with valid/invalid IDs
  4. `src/hooks/useMarkdownPaste.ts` — paste event handling
- **Impact:** Catches regressions in the most critical business logic.
- **Effort:** Medium

### OPT-061: Add integration test for core flow
- **What:** Test the full paste → preview → copy flow.
- **Tool:** `@testing-library/react` (already installed)
- **Impact:** Validates the primary user journey end-to-end.
- **Effort:** Medium

---

## Prioritized Execution Plan

### Phase A: Quick Wins (< 1 hour, zero risk) — ✅ ALL DONE
| # | Task | LOC Impact | Status |
|---|------|-----------|--------|
| ~~OPT-001~~ | ~~Delete `MarkdownInput.tsx` + `NavLink.tsx`~~ | ~~-77~~ | ✅ |
| ~~OPT-004~~ | ~~Delete `use-mobile.tsx`~~ | ~~-19~~ | ✅ |
| ~~OPT-006~~ | ~~Delete `example.test.ts`~~ | ~~-7~~ | ✅ |
| ~~OPT-040~~ | ~~Remove duplicate toast system~~ | ~~-200~~ | ✅ |
| ~~OPT-021~~ | ~~Pause background animations when editing~~ | ~~0~~ | ✅ |
| OPT-030 | Enable `noUnusedLocals`/`noUnusedParameters` | 0 | Pending |

### Phase B: Medium Wins (2–4 hours, low risk) — MOSTLY DONE
| # | Task | LOC Impact | Status |
|---|------|-----------|--------|
| ~~OPT-002~~ | ~~Remove 47 unused UI components~~ | ~~-2,600~~ | ✅ |
| ~~OPT-003~~ | ~~Remove 22 unused npm dependencies~~ | ~~—~~ | ✅ |
| ~~OPT-005~~ | ~~Remove `use-toast.ts` hook~~ | ~~-186~~ | ✅ |
| ~~OPT-010~~ | ~~Extract `getStyledHTML()` to lib~~ | ~~+135 / -125~~ | ✅ |
| ~~OPT-011~~ | ~~Extract download logic to lib~~ | ~~+39 / -32~~ | ✅ |
| ~~OPT-023~~ | ~~Lazy-load Docs and NotFound routes~~ | ~~+5~~ | ✅ |
| ~~OPT-026~~ | ~~Memoize styled HTML output~~ | ~~+3~~ | ✅ |
| ~~OPT-041~~ | ~~Create constants file~~ | ~~+9~~ | ✅ |
| OPT-043 | Add error boundaries | +40 | Pending |
| ~~OPT-052~~ | ~~Consolidate z-index scale~~ | ~~+0~~ | ✅ |

### Phase C: Structural Refactors (4–8 hours, medium risk)
| # | Task | LOC Impact | Effort |
|---|------|-----------|--------|
| OPT-012–14 | Extract DownloadMenu, ViewModeToggle, StatsBar | +80 / -80 | 1 hr |
| OPT-015 | Split MarkdownToolbar delimiter logic | +40 / -80 | 1 hr |
| OPT-016 | Extract Docs section data | +120 / -120 | 30 min |
| OPT-031 | Enable TypeScript strict mode | 0 | 2 hr |
| OPT-050 | Replace inline styles with CSS vars | -200 | 2 hr |
| OPT-060 | Add unit tests for critical paths | +200 | 3 hr |

### Phase D: Advanced (8+ hours, higher risk)
| # | Task | LOC Impact | Effort |
|---|------|-----------|--------|
| OPT-020 | Debounce preview rendering | +10 | 1 hr |
| OPT-025 | Web Worker image compression | +60 | 3 hr |
| OPT-042 | Replace deprecated execCommand | +100 | 4 hr |
| OPT-061 | Integration tests | +150 | 4 hr |

---

## Expected Outcomes After Full Optimization

| Metric | Before | After Phase A+B | After All |
|--------|--------|-----------------|-----------|
| Total LOC | ~6,650 | ~3,400 | ~3,200 |
| Source files | 77 | ~28 | ~35 |
| npm dependencies | 61 | ~39 | ~39 |
| UI components | 49 | 4 | 4 |
| Test coverage | 0% | 0% | ~40% |
| TerminalPreview LOC | 482 | ~275 | ~250 |
| MarkdownToolbar LOC | 364 | 364 | ~280 |
| TypeScript strictness | off | partial | full |

---

## Constraints

- **No functionality changes.** Every optimization preserves existing behavior and UI exactly.
- **No new dependencies.** All improvements use existing tools and patterns.
- **Incremental.** Each phase can be executed independently. No phase depends on another.
- **Reversible.** All changes are additive removals or extractions — easy to revert if needed.
