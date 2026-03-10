# FormatMD — Bug Audit

> Audited: 2026-03-09

---

## CRITICAL

### BUG-001: Footer animation gets stuck after paste
- **File:** `src/pages/Index.tsx:230`
- **Issue:** Footer renders conditionally on `!hasContent`. When user pastes content, `hasContent` flips to `true` and footer vanishes instantly — no exit animation, no fade-out.
- **Root Cause:** No `transition` or `AnimatePresence`-style wrapper around the Footer conditional render.
- **Fix:** Wrap Footer in a CSS transition or use Framer Motion's `AnimatePresence` for smooth exit. Add `opacity-0 translate-y-4` exit state with `transition-all duration-500`.

### BUG-002: /docs and /features navigate to same page
- **File:** `src/App.tsx:19-20`, `src/components/Footer.tsx:14`
- **Issue:** Footer has "Features" link pointing to `/docs#features`, which loads the same Docs page. No separate Features page exists.
- **Root Cause:** Missing Features route/page, or Features should be a section on the homepage.
- **Fix:** Either create a dedicated `/features` route OR move features section to homepage second fold (per user's planned task J).

---

## MEDIUM

### BUG-003: Toolbar button background mismatch
- **File:** `src/components/MarkdownToolbar.tsx:257-274`
- **Issue:** Toolbar buttons use inline JavaScript to change `backgroundColor` and `color` on `mouseEnter`/`mouseLeave`. This conflicts with Tailwind classes and has no CSS transition — background snaps instantly.
- **Root Cause:** Direct `style` manipulation instead of Tailwind hover classes.
- **Fix:** Replace inline event handlers with Tailwind `hover:bg-[color]` classes or CSS custom properties for theme-aware hover states.

### BUG-004: Animated placeholder can get stuck
- **File:** `src/components/AnimatedPlaceholder.tsx:30-59`
- **Issue:** Multiple `setTimeout` calls with complex branching. If user pastes while animation is mid-cycle, orphaned timeouts continue running. Animation can freeze mid-type.
- **Root Cause:** Race condition between `isTyping`, `displayText`, and `currentIndex` state updates. No cleanup on unmount.
- **Fix:** Add comprehensive `useEffect` cleanup. Cancel all timeouts when `hasContent` becomes true. Consider using `useRef` for timeout IDs.

### BUG-005: Undo/redo unreliable across browsers
- **File:** `src/components/TerminalPreview.tsx:426-435`
- **Issue:** Uses deprecated `document.execCommand('undo')` / `document.execCommand('redo')`. Doesn't work consistently in Firefox. Undo stack lost when switching between landing and editor.
- **Fix:** Implement custom undo/redo stack using a state history array.

### BUG-006: Duplicate paste handling logic
- **File:** `src/pages/Index.tsx:93-105` vs `src/components/TerminalPreview.tsx:437-448`
- **Issue:** HTML-to-markdown paste logic exists in two places with inconsistent implementations. Index.tsx uses `setState`, TerminalPreview uses `document.execCommand('insertText')`.
- **Fix:** Extract shared paste handler into a custom hook `useMarkdownPaste()`.

---

## LOW

### BUG-007: Theme name inconsistency
- **File:** `src/lib/themes.ts:33` vs `src/index.css:70`
- **Issue:** Theme called "vaporwave" in themes.ts but CSS class is `.theme-cappuccino`.
- **Fix:** Align naming. Pick one: vaporwave or cappuccino.

### BUG-008: Copy button feedback is inverted
- **File:** `src/components/TerminalPreview.tsx:396-408`
- **Issue:** When copied, button becomes subtle/low-contrast. When not copied, button is bold. Semantically backwards — confirmation should be MORE prominent.
- **Fix:** Swap styles: make "copied" state bold green with checkmark, "ready" state standard.

### BUG-009: Theme switch icon semantics backwards
- **File:** `src/components/TerminalPreview.tsx:314-337`
- **Issue:** Moon icon shows in dark mode, Sun shows in light mode. Users expect Sun in dark mode (to switch to light) and vice versa.
- **Fix:** Swap icons: show Sun when in dark mode, Moon when in light mode.

### BUG-010: Download dropdown z-index conflict
- **File:** `src/components/TerminalPreview.tsx:372`
- **Issue:** Hardcoded `z-[9999]` can conflict with FeedbackModal which also uses `z-[9999]`.
- **Fix:** Use a z-index scale system (e.g., dropdown: 50, modal: 60).

### BUG-011: ReactMarkdown imported but never used
- **File:** `src/components/TerminalPreview.tsx:1-6`
- **Issue:** `react-markdown` imported but component uses `dangerouslySetInnerHTML` instead. Bloats bundle.
- **Fix:** Remove the import.

### BUG-012: 404 page not themed
- **File:** `src/pages/NotFound.tsx`
- **Issue:** Uses generic `bg-muted` instead of the app's custom theme system.
- **Fix:** Apply current theme colors to 404 page.
