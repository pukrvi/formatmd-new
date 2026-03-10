# Component Reference

Detailed reference for FormatMD's key components.

---

## Pages

### Index (`src/pages/Index.tsx`)

The main page with two states:

**Landing state** (no markdown content):
- Animated logo with glow effect
- Step badges: paste → transform → copy
- Large input textarea with animated placeholder
- Theme animation cycling between dark and light
- Scroll arrows pointing to documentation section
- DocumentationSection (second fold)
- Footer

**Editor state** (has markdown content):
- Full-height TerminalPreview component
- All formatting, preview, copy, and export features active

**Key props/state:**
| State | Type | Purpose |
|-------|------|---------|
| `markdown` | `string` | Current editor content |
| `theme` | `Theme` | Active theme object |
| `isLanding` | derived | `markdown.length === 0` |

---

### Docs (`src/pages/Docs.tsx`)

Feature documentation page at `/docs`.

- Sticky header with back button, logo, feedback button
- Reuses `DocumentationSection` component
- Theme-synced styling
- Footer with consistent navigation

---

### NotFound (`src/pages/NotFound.tsx`)

Themed 404 error page for unmatched routes.

- Uses `getTheme()` and `AnimatedLogo` for brand consistency
- Link back to home page

---

## Core Components

### TerminalPreview (`src/components/TerminalPreview.tsx`)

The main editor/preview component. ~275 lines after refactoring.

**Features:**
- Three view modes (Editor / Split / Preview)
- Terminal-style header with traffic light buttons
- Live markdown rendering with `useMemo` for performance
- Real-time stats (words, chars, reading time)
- Copy button with visual feedback
- Download dropdown with format options
- Theme toggle (Sun/Moon icon)

**Exposed via `useImperativeHandle`:**
```typescript
ref.current.getStyledHTML() // Returns rendered HTML string
```

**Key internal state:**
| State | Type | Default |
|-------|------|---------|
| `viewMode` | `'editor' \| 'split' \| 'preview'` | `'editor'` |
| `showDropdown` | `boolean` | `false` |
| `copied` | `boolean` | `false` (resets after 2s) |

---

### MarkdownToolbar (`src/components/MarkdownToolbar.tsx`)

14-button formatting toolbar integrated into TerminalPreview.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `textareaRef` | `RefObject<HTMLTextAreaElement>` | Reference to editor textarea |
| `markdown` | `string` | Current content |
| `setMarkdown` | `(value: string) => void` | Content setter |
| `theme` | `Theme` | Active theme for styling |

**Action types:**
- **Wrap selection:** Bold, italic, inline code, links
- **Prepend line:** Headings, lists, blockquotes
- **Insert block:** Code blocks, XML tags, HTML comments
- **Insert delimiter:** 7 separator styles via submenu

---

### FeedbackModal (`src/components/FeedbackModal.tsx`)

Unified request form displayed as a dialog overlay.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | `boolean` | Dialog visibility |
| `onClose` | `() => void` | Close handler |
| `theme` | `Theme` | Active theme for styling |

**Form fields:**
| Field | Required | Validation |
|-------|----------|-----------|
| Email | Yes | Format check |
| Heading | Yes | Non-empty |
| Description | Yes | Non-empty |
| Attachments | No | Max 3 files, 5MB each |

**Behavior:**
- Images compressed via canvas (JPEG, 70% quality) before upload
- Files uploaded to Supabase Storage
- Form data saved to Supabase `feedback` table
- Toast notifications for success/error

---

### DocumentationSection (`src/components/DocumentationSection.tsx`)

Feature reference displayed on both the landing page and `/docs` page.

**5 sections:**
1. **Editor** — Rich Markdown Editor, View Modes
2. **Formatting** — Text Controls, Code Blocks, Delimiter Tools
3. **Themes** — InfinitiGRID Dark, Vaporwave Light
4. **Copy & Export** — Rich Copy, Download Formats, Stats
5. **Feedback** — Unified Request System

Each section has an icon, title, description, and detail items.

---

### AnimatedLogo (`src/components/AnimatedLogo.tsx`)

SVG geometric logo with rotation and glow animation.

**Props:**
| Prop | Type | Default |
|------|------|---------|
| `size` | `number` | — |
| `color` | `string` | Theme accent |

---

### AnimatedPlaceholder (`src/components/AnimatedPlaceholder.tsx`)

Typing/deleting animation for the landing page input.

**Behavior:**
- Cycles through 2 example markdown snippets
- Types characters one by one, then deletes
- Each example hints at a different theme
- Cleans up via `mountedRef` to prevent memory leaks

---

### SEOHead (`src/components/SEOHead.tsx`)

Per-page meta tag management via `react-helmet-async`.

**Props:**
| Prop | Type | Description |
|------|------|-------------|
| `title` | `string` | Page title |
| `description` | `string` | Meta description |
| `path` | `string` | URL path for canonical |

Sets: `<title>`, `<meta description>`, Open Graph tags, Twitter Card tags, canonical URL.

---

### Footer (`src/components/Footer.tsx`)

Theme-aware footer with navigation links.

**Links:** Home, Docs, InfinitiGRID
**Actions:** Feedback button (opens FeedbackModal)

---

### ScrollArrows (`src/components/ScrollArrows.tsx`)

Down-arrow indicator on the landing page hinting users to scroll for documentation.

---

## Shared UI Primitives (`src/components/ui/`)

Built on [shadcn/ui](https://ui.shadcn.com/) (Radix UI):

| Component | File | Usage |
|-----------|------|-------|
| Button | `button.tsx` | Action buttons throughout |
| Dialog | `dialog.tsx` | FeedbackModal wrapper |
| Input | `input.tsx` | Form text inputs |
| Label | `label.tsx` | Form labels |
| Textarea | `textarea.tsx` | Multi-line inputs |
| Tooltip | `tooltip.tsx` | Privacy tooltip, etc. |
| Toaster/Sonner | `toaster.tsx`, `sonner.tsx` | Toast notifications |

---

## Hooks

### useMarkdownPaste (`src/hooks/useMarkdownPaste.ts`)

Shared hook for handling HTML-to-markdown paste conversion.

**Usage:**
```typescript
useMarkdownPaste(textareaRef, setMarkdown);
```

**Behavior:**
1. Listens for `paste` events on the textarea
2. Checks clipboard for `text/html` MIME type
3. Converts HTML to markdown via `htmlToMarkdown()`
4. Inserts converted text at cursor position
