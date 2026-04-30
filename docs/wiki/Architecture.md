# Architecture

Technical architecture overview of FormatMD.

---

## High-Level Data Flow

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────┐
│  User    │────►│  Editor      │────►│  Renderer    │────►│  Output  │
│  Input   │     │  (textarea)  │     │  (converter) │     │          │
└──────────┘     └──────────────┘     └──────────────┘     └──────────┘
                                                            │
     Paste HTML ──► htmlToMarkdown() ──► Editor             ├─► Clipboard (HTML+text)
                                                            ├─► .md / skill.MD / .txt
     Type markdown ──► Editor ──► markdownToStyledHtml()    ├─► .html (styled)
                                                            └─► PDF (print dialog)
```

---

## Application Entry

```
index.html
  └── src/main.tsx          # React root + providers
       └── src/App.tsx      # React Router configuration
            ├── /           → Index.tsx    (landing + editor)
            ├── /docs       → Docs.tsx     (documentation)
            └── *           → NotFound.tsx (404)
```

**Providers (App.tsx):**
- `HelmetProvider` — SEO meta tag management
- `BrowserRouter` — client-side routing
- `Toaster` — toast notification system

---

## Directory Structure

```
src/
├── pages/                  # Route-level components
│   ├── Index.tsx           # Landing page + editor (main entry)
│   ├── Docs.tsx            # Feature documentation page
│   └── NotFound.tsx        # Themed 404 page
│
├── components/             # Feature components
│   ├── TerminalPreview.tsx # Editor/preview with toolbar, stats, export
│   ├── MarkdownToolbar.tsx # 14 formatting actions
│   ├── FeedbackModal.tsx   # Unified request form
│   ├── DocumentationSection.tsx # Feature reference (shared)
│   ├── Footer.tsx          # Navigation footer
│   ├── AnimatedLogo.tsx    # SVG logo with animation
│   ├── AnimatedPlaceholder.tsx # Typing animation for landing
│   ├── ScrollArrows.tsx    # Scroll indicator
│   ├── SEOHead.tsx         # Per-page meta tags
│   └── ui/                 # shadcn/ui primitives
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── textarea.tsx
│       ├── tooltip.tsx
│       ├── toaster.tsx
│       └── sonner.tsx
│
├── lib/                    # Utilities
│   ├── themes.ts           # Theme definitions (colors, fonts, classes)
│   ├── markdownToHtml.ts   # Markdown → styled HTML converter
│   ├── htmlToMarkdown.ts   # HTML → markdown converter (paste)
│   ├── downloadHandler.ts  # Export logic (md, html, txt, pdf)
│   ├── constants.ts        # App constants
│   └── utils.ts            # General utilities (cn helper)
│
├── hooks/                  # Shared React hooks
│   └── useMarkdownPaste.ts # Clipboard paste handler
│
├── integrations/           # External services
│   └── supabase/
│       ├── client.ts       # Supabase client initialization
│       └── types.ts        # Generated database types
│
└── test/                   # Test infrastructure
    └── setup.ts            # Vitest setup (JSDOM)
```

---

## Component Hierarchy

```
App
├── Index (/)
│   ├── SEOHead
│   ├── AnimatedLogo          (landing only)
│   ├── AnimatedPlaceholder   (landing only)
│   ├── ScrollArrows          (landing only)
│   ├── TerminalPreview       (editor mode)
│   │   └── MarkdownToolbar
│   ├── DocumentationSection  (landing second fold)
│   ├── FeedbackModal
│   └── Footer
│
├── Docs (/docs)
│   ├── SEOHead
│   ├── AnimatedLogo
│   ├── DocumentationSection
│   ├── FeedbackModal
│   └── Footer
│
└── NotFound (*)
    ├── SEOHead
    └── AnimatedLogo
```

---

## State Management

FormatMD uses **React local state only** — no global store (Redux, Zustand, etc.).

| State | Location | Persistence |
|-------|----------|------------|
| Markdown content | `Index.tsx` (`useState`) | Session only |
| Selected theme | `Index.tsx` (`useState`) | `localStorage` |
| View mode | `TerminalPreview.tsx` | Session only |
| Feedback form data | `FeedbackModal.tsx` | None |
| Landing vs editor | Derived from markdown content | Session only |

**Theme persistence:**
```typescript
// Save
localStorage.setItem('formatmd-theme', theme.id);

// Restore
const saved = localStorage.getItem('formatmd-theme');
const theme = getTheme(saved) || themes[0];
```

---

## Conversion Pipeline

### Markdown → Styled HTML

```
Input markdown
    │
    ▼
markdownToStyledHtml(markdown, theme)
    │
    ├── Parse headings (# → <h1> with theme colors)
    ├── Parse bold/italic
    ├── Parse code blocks (with Fira Code font)
    ├── Parse inline code
    ├── Parse lists (ordered/unordered)
    ├── Parse blockquotes
    ├── Parse links
    ├── Parse horizontal rules
    └── Parse paragraphs
    │
    ▼
Styled HTML string (with inline styles)
```

### HTML → Markdown (Paste)

```
Clipboard HTML (from Google Docs, web, etc.)
    │
    ▼
htmlToMarkdown(html)
    │
    ├── <h1>–<h6>  → # through ######
    ├── <strong>/<b> → **bold**
    ├── <em>/<i>    → *italic*
    ├── <a href>    → [text](url)
    ├── <code>      → `code`
    ├── <pre>       → ```code block```
    ├── <ul>/<ol>   → list items
    ├── <blockquote> → > quote
    ├── <img>       → ![alt](src)
    └── Strip remaining HTML
    │
    ▼
Clean markdown string
```

---

## Backend Integration (Supabase)

Supabase is used only for the feedback system:

```
FeedbackModal
    │
    ├── Form submission → supabase.from('feedback').insert(...)
    │   Fields: email, heading, description, attachment_urls
    │
    └── File upload → supabase.storage.from('feedback-attachments').upload(...)
        - Images compressed to JPEG 70% before upload
        - Max 3 files, 5MB each
        - Unique path: `feedback/{timestamp}-{filename}`
```

**Database schema:**
| Column | Type | Required |
|--------|------|----------|
| id | uuid | auto |
| email | text | yes |
| heading | text | yes |
| description | text | yes |
| attachment_urls | text[] | no |
| created_at | timestamp | auto |

---

## Build & Bundle

| Tool | Purpose |
|------|---------|
| **Vite 5** | Build tool and dev server |
| **SWC** | Fast TypeScript/JSX compilation |
| **Tailwind CSS** | Utility-first CSS (purged in production) |
| **PostCSS** | CSS processing pipeline |

**Build output:** `dist/` directory with static HTML, CSS, JS chunks.

**Dev server:** HMR at `localhost:8080` via Vite.
