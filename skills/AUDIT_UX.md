# FormatMD — UX & Accessibility Audit

> Audited: 2026-03-09

---

## Accessibility (A11y) Issues

### A11Y-001: No keyboard focus states on toolbar — HIGH
- **File:** `src/components/MarkdownToolbar.tsx:259-274`
- Only `mouseEnter`/`mouseLeave` handlers. No `onFocus`/`onBlur`.
- Tab navigation gives no visual feedback.
- **Fix:** Add `focus-visible:ring-2 focus-visible:ring-offset-2` classes. Add `aria-label` to every icon button.

### A11Y-002: Toolbar buttons lack aria-labels
- **File:** `src/components/MarkdownToolbar.tsx`
- Icon-only buttons with no accessible names.
- **Fix:** Add `aria-label="Bold"`, `aria-label="Heading 1"`, etc. to each button.

### A11Y-003: Feedback modal accessibility gaps
- **File:** `src/components/FeedbackModal.tsx`
- No `aria-label` on file input button
- Form inputs lack `aria-describedby` for validation errors
- Loading spinner has no `role="status"` or `aria-busy`
- **Fix:** Add ARIA attributes, ensure focus trap within modal.

### A11Y-004: Insufficient color contrast in inactive states
- **File:** `src/components/TerminalPreview.tsx:269`
- Inactive buttons use `text + '70'` (70% opacity) which may fail WCAG AA on light theme.
- **Fix:** Ensure minimum 4.5:1 contrast ratio for all text.

### A11Y-005: Animated placeholder not screen-reader friendly
- **File:** `src/components/AnimatedPlaceholder.tsx:68`
- `select-none` and `pointer-events-none` with rapidly changing text.
- No `aria-live` region to announce content changes.
- **Fix:** Add `aria-hidden="true"` (decorative) or `aria-live="polite"`.

---

## Mobile Responsiveness

### MOB-001: Toolbar overflows on mobile
- **File:** `src/components/MarkdownToolbar.tsx`
- 14+ buttons in a single row with no horizontal scroll or wrapping.
- Delimiters dropdown can overflow viewport.
- **Fix:** Add `overflow-x-auto` with `flex-nowrap`, or collapse into a "more" menu on small screens.

### MOB-002: Terminal header cramped on small screens
- **File:** `src/components/TerminalPreview.tsx:290-293`
- Stats bar (words, chars) wraps awkwardly. Traffic light dots take space.
- **Fix:** Hide char count on mobile, keep word count only. Use `sm:flex` pattern consistently.

### MOB-003: Landing page layout shift
- **File:** `src/pages/Index.tsx:136-205`
- Animated logo is fixed `w-10 h-10` — no responsive scaling.
- `max-w-2xl` input box centers poorly on narrow screens.
- Background blobs use fixed positions, not viewport-relative.
- **Fix:** Use responsive sizing (`w-8 md:w-10`), scale blobs to viewport.

### MOB-004: Footer links wrap incorrectly
- **File:** `src/components/Footer.tsx:35-48`
- `gap-4` with no responsive reduction. Links overflow on small screens.
- **Fix:** Stack vertically on mobile, add `flex-wrap` or `sm:flex-row flex-col`.

---

## UX Anti-Patterns

### UX-001: No theme persistence
- **File:** `src/pages/Index.tsx:14`
- Theme resets to 'infiniti' on every page load. No `localStorage`.
- Docs page hardcodes theme to 'infiniti', ignoring user preference.
- **Fix:** Persist to `localStorage`. Read on mount. Sync across pages.

### UX-002: No debounce on markdown preview
- **File:** `src/components/TerminalPreview.tsx:44-49`
- `getStyledHTML()` runs on every keystroke. Complex regex + table parsing on each character.
- **Fix:** Debounce preview render by 150-300ms. Keep stats immediate.

### UX-003: Two different paste implementations
- **File:** `src/pages/Index.tsx:93` vs `src/components/TerminalPreview.tsx:437`
- Inconsistent behavior between landing page paste and editor paste.
- **Fix:** Single `useMarkdownPaste` hook shared by both.

### UX-004: No error boundaries
- If any component crashes, entire app shows blank page.
- **Fix:** Add `ErrorBoundary` component at route level with themed fallback UI.

### UX-005: Ambient animations always running
- **File:** `src/pages/Index.tsx:116-129`
- `animate-float` on 4 background blobs runs infinitely, even during active editing.
- Wastes GPU on mobile.
- **Fix:** Disable when `hasContent === true`.

---

## UX Improvements (Best Practices)

### Google Material Design Recommendations
1. **Toolbar:** Group related actions with dividers (text formatting | structure | blocks)
2. **Tooltips:** Show on hover AND focus with 500ms delay
3. **Ripple effect:** Add subtle press feedback on toolbar buttons
4. **Elevation:** Use shadow levels for dropdown menus
5. **Motion:** Stagger toolbar button entrance, ease transitions

### Adobe Design Best Practices
1. **Progressive disclosure:** Hide advanced toolbar actions behind a "more" button
2. **Contextual actions:** Show relevant toolbar buttons based on selection
3. **Visual hierarchy:** Primary action (Copy) should be most prominent
4. **Feedback loops:** After every action, provide visual confirmation
5. **Consistency:** Same interaction patterns across all buttons and menus
