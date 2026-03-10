# FormatMD — UI / UX / Flow

> Last Verified: 2026-03-10
> Canonical tracker for interaction quality, accessibility, and user flow

---

## Open UI/UX/Flow Items

### Accessibility

- [ ] `A11Y-003` Feedback modal accessibility hardening
  - Add clearer ARIA labels/descriptions for controls and status messaging.

- [ ] `A11Y-004` Contrast hardening in inactive states
  - Review opacity-based text colors for WCAG AA in vaporwave theme.

- [ ] `A11Y-005` Animated placeholder screen-reader strategy
  - Mark decorative content appropriately or provide controlled live region behavior.

### Mobile Responsiveness

- [ ] `MOB-001` Toolbar overflow on narrow screens
  - Add horizontal scroll/overflow menu strategy.

- [ ] `MOB-002` Terminal header crowding on small devices
  - Improve responsive behavior for stats + action controls.

- [ ] `MOB-003` Landing layout scaling consistency across mobile breakpoints.

- [ ] `MOB-004` Footer link wrapping and spacing polish on narrow screens.

### Interaction Flow

- [ ] `FLOW-001` Theme the 404 page to preserve product visual continuity.
- [ ] `FLOW-002` Add route-level error boundary fallback flow (also listed in prod-ready).
- [ ] `FLOW-003` Add preview debounce/defer behavior to preserve typing smoothness for long docs.

---

## Completed UI/UX/Flow Improvements

- Keyboard focus states added to toolbar controls.
- `aria-label` coverage improved for toolbar buttons.
- Theme persistence implemented via `localStorage`.
- Shared paste flow implemented for landing/editor paths.
- Footer/docs navigation path corrected.
- Copy feedback and theme icon semantics corrected.

