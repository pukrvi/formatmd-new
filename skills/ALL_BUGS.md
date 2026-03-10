# FormatMD — All Bugs

> Last Verified: 2026-03-10
> Canonical bug tracker for code-verified status only

---

## Open Bugs

### `BUG-012` NotFound page is not themed
- File: `src/pages/NotFound.tsx`
- Evidence: uses `bg-muted`, `text-primary`, `text-muted-foreground` classes instead of FormatMD theme model.
- Priority: Medium
- Fix target: themed 404 page consistent with active theme colors.

---

## Resolved Bugs

- `BUG-001` Footer transition freeze after paste/edit flow.
- `BUG-001B` Editor first-open layout stuck after paste due hidden hero flex occupancy (fixed by explicit landing/editor conditional render path).
- `BUG-002` `/docs` and `/docs#features` navigation collision.
- `BUG-003` Toolbar interaction/focus consistency.
- `BUG-004` Animated placeholder stuck-state issue.
- `BUG-005` Prior `execCommand` undo/redo concern no longer applies to current code path.
- `BUG-006` Duplicate paste implementations (now unified with `useMarkdownPaste`).
- `BUG-007` Theme naming inconsistency (`vaporwave` alignment).
- `BUG-008` Copy button feedback inversion.
- `BUG-009` Theme switch icon semantics.
- `BUG-010` Download z-index conflict in terminal dropdown (resolved in `TerminalPreview.tsx`).
- `BUG-011` Stale `react-markdown` usage/import issue.

---

## Verification Notes

- No `document.execCommand` calls found in current `src/`.
- Terminal download dropdown uses `z-50` (legacy note claiming `z-[9999]` there was outdated).
- Homepage footer now targets homepage folds (`/#documentation`, `/#features`) and no longer forces docs-route-only navigation.
- Bug status here supersedes conflicting historical notes from removed legacy files.
