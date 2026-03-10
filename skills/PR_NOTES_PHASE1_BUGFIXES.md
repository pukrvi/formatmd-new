# PR: Phase 1 Bug Fixes (P0)

**Branch:** `fix/phase1-bugs`
**Base:** `main`
**Commit:** `e512247`

---

## Summary

Resolves all 5 P0 bugs identified in the Phase 1 audit. No new features — strictly stability and UX fixes.

- **BUG-001**: Footer no longer freezes mid-animation when user pastes content. Replaced conditional render (`{!hasContent && <Footer />}`) with CSS opacity/maxHeight transition.
- **BUG-002**: "Features" and "Documentation" footer links now navigate to distinct locations. Added `id="features"` anchor to Docs.tsx, smooth scroll via CSS, and hash-aware click handler in Footer.
- **BUG-003**: Toolbar buttons now have smooth 150ms CSS transitions for background/color changes. Added `focus-visible` ring styles and `aria-label` for keyboard accessibility.
- **BUG-004**: AnimatedPlaceholder typing animation can no longer get stuck. Added `mountedRef` guard to prevent state updates after unmount.
- **BUG-006**: Duplicate paste handling deduplicated into shared `useMarkdownPaste` hook. Both Index.tsx (state-based insertion) and TerminalPreview.tsx (execCommand-based insertion for undo stack) now use the same hook with different insertion strategies. Removed unused `ReactMarkdown` import.

## Files Changed

| File | Change |
|------|--------|
| `src/hooks/useMarkdownPaste.ts` | NEW — shared paste detection + conversion hook |
| `src/pages/Index.tsx` | BUG-001 (footer transition), BUG-006 (shared hook) |
| `src/pages/Docs.tsx` | BUG-002 (added `id="features"` anchor) |
| `src/components/TerminalPreview.tsx` | BUG-006 (shared hook, removed ReactMarkdown import) |
| `src/components/MarkdownToolbar.tsx` | BUG-003 (CSS transitions, focus states, aria-labels) |
| `src/components/AnimatedPlaceholder.tsx` | BUG-004 (mountedRef guard) |
| `src/components/Footer.tsx` | BUG-002 (hash navigation handler) |
| `src/index.css` | BUG-002 (smooth scroll), BUG-003 (toolbar focus-visible) |
| `.gitignore` | Added .env exclusion |
| `skills/ROADMAP.md` | Marked Phase 1 bugs as complete |
| `MEMORY.md` | Added change log entry |

## Test Plan

- [ ] Paste markdown content — footer should fade out smoothly (no freeze)
- [ ] Click "Features" in footer — should scroll to features section on /docs
- [ ] Click "Documentation" in footer — should navigate to /docs top
- [ ] Tab through toolbar buttons — should show focus ring and tooltips
- [ ] Hover toolbar buttons — background should transition smoothly (not snap)
- [ ] Watch placeholder animation cycle through both themes — should not freeze
- [ ] Paste from landing page textarea — HTML should convert to markdown
- [ ] Paste inside editor (after content) — HTML should convert to markdown + preserve undo
- [ ] Run `npm run build` — should compile with zero errors

## Risks / Follow-ups

- Toolbar still uses inline `onMouseEnter`/`onMouseLeave` style manipulation alongside CSS transitions. Future refactor could move entirely to CSS `:hover` with custom properties.
- Footer is now always rendered (hidden via CSS) — verify no layout shift on initial page load.
- `document.execCommand` in TerminalPreview is deprecated — tracked as TD-007 in TECH_DEBT.md for future custom undo stack.
