# Themes

FormatMD ships with two production themes. Each theme defines colors, fonts, and CSS classes used across all components.

---

## InfinitiGRID (Dark)

The default dark theme with a terminal-inspired aesthetic.

| Property | Value | Preview |
|----------|-------|---------|
| ID | `infiniti` | — |
| CSS Class | `theme-clean` | — |
| Mode | Dark | — |
| Icon | 🌙 | — |
| Background | `#050a14` | Midnight blue-black |
| Heading / Accent | `#4CC77C` | Terminal green |
| Keyword | `#7DDBA3` | Light green |
| Text | `#ffffff` | White |
| Panel | `#1F2733` | Dark slate |

```
┌─────────────────────────────────────────┐
│  Background: #050a14 (midnight)         │
│  ┌───────────────────────────────────┐  │
│  │  Panel: #1F2733 (dark slate)     │  │
│  │                                   │  │
│  │  # Heading (#4CC77C green)        │  │
│  │  keyword (#7DDBA3 light green)    │  │
│  │  Body text (#ffffff white)        │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Vaporwave (Light)

A warm, cream-toned light theme.

| Property | Value | Preview |
|----------|-------|---------|
| ID | `vaporwave` | — |
| CSS Class | `theme-vaporwave` | — |
| Mode | Light | — |
| Icon | ☀️ | — |
| Background | `#FDF6E3` | Cream |
| Heading / Accent | `#5C4033` | Brown |
| Keyword | `#B5651D` | Orange-brown |
| Text | `#3E2723` | Dark brown |
| Panel | `#F5E6D3` | Light beige |
| Highlight | `#FFE0B2` | Light orange |

```
┌─────────────────────────────────────────┐
│  Background: #FDF6E3 (cream)            │
│  ┌───────────────────────────────────┐  │
│  │  Panel: #F5E6D3 (light beige)    │  │
│  │                                   │  │
│  │  # Heading (#5C4033 brown)        │  │
│  │  keyword (#B5651D orange-brown)   │  │
│  │  Body text (#3E2723 dark brown)   │  │
│  │  highlight (#FFE0B2 orange)       │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## Theme Structure

Each theme is a TypeScript object with this shape:

```typescript
interface Theme {
  id: string;          // 'infiniti' | 'vaporwave'
  name: string;        // Display name
  class: string;       // CSS class applied to root
  icon: string;        // Toggle button icon
  colors: {
    bg: string;        // Page background
    heading: string;   // Headings and accents
    keyword: string;   // Secondary accent
    text: string;      // Body text
    panel: string;     // Card/panel backgrounds
    highlight?: string; // Optional highlight color
  };
}
```

**Source:** [`src/lib/themes.ts`](../../src/lib/themes.ts)

---

## Theme Behavior

### Toggle
- Sun/Moon icon in the editor header bar
- Click to switch between InfinitiGRID and Vaporwave

### Persistence
- Theme preference saved to `localStorage` key: `formatmd-theme`
- Restored on page load across sessions

### Landing Animation
- Before content is entered, the landing page cycles through both themes
- The animated placeholder shows theme-specific example markdown
- Once content is entered, the editor uses the selected (or last-used) theme

### Component Coverage
All components respond to the current theme:
- `Index.tsx` — landing backgrounds, step badges, input styling
- `TerminalPreview.tsx` — editor, preview, header, stats bar
- `MarkdownToolbar.tsx` — button colors, hover states
- `Footer.tsx` — text, links, backdrop
- `FeedbackModal.tsx` — form styling
- `Docs.tsx` — header, content area
- `NotFound.tsx` — 404 page background and text
- `DocumentationSection.tsx` — feature cards

---

## Typography

| Context | Font | Fallback |
|---------|------|----------|
| UI elements | `Poppins` | sans-serif |
| Editor / code surfaces | `Fira Code` | monospace |

Both fonts are loaded via `@fontsource` packages (no external CDN dependency).

---

## Adding a New Theme

To add a new theme:

1. Add a theme object to the `themes` array in `src/lib/themes.ts`
2. Add a corresponding CSS class in `src/index.css` (if custom styling is needed)
3. The theme toggle logic in `TerminalPreview.tsx` cycles through all available themes
4. Test all components visually with the new theme applied
