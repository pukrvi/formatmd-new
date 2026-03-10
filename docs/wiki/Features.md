# Features

Complete feature reference for FormatMD.

---

## Live Markdown Editor

The core of FormatMD is a live markdown editor with three view modes:

| Mode | Description |
|------|-------------|
| **Editor** | Full-width markdown editing textarea |
| **Split** | Side-by-side editor and styled preview |
| **Preview** | Full-width styled HTML output |

**Key behaviors:**
- Real-time markdown-to-HTML rendering with memoization for performance
- Terminal-style header with traffic light buttons and view-mode toggle
- Theme-aware syntax coloring in the editor
- Cursor position and selection state preserved across formatting actions

**Source:** [`src/components/TerminalPreview.tsx`](../../src/components/TerminalPreview.tsx)

---

## Smart Paste

FormatMD automatically detects when you paste HTML content (e.g., from Google Docs, a web page, or email) and converts it to clean markdown.

**How it works:**
1. Paste event fires on the editor textarea
2. The `useMarkdownPaste` hook checks for `text/html` in the clipboard
3. `htmlToMarkdown()` converts HTML tags to markdown syntax
4. Converted markdown is inserted at the cursor position

**Supported conversions:**
- `<strong>` / `<b>` → `**bold**`
- `<em>` / `<i>` → `*italic*`
- `<h1>` – `<h6>` → `# ` – `###### `
- `<a href>` → `[text](url)`
- `<code>` → `` `code` ``
- `<pre>` → fenced code blocks
- `<ul>` / `<ol>` → list items
- `<blockquote>` → `> quote`
- `<img>` → `![alt](src)`

**Source:** [`src/hooks/useMarkdownPaste.ts`](../../src/hooks/useMarkdownPaste.ts), [`src/lib/htmlToMarkdown.ts`](../../src/lib/htmlToMarkdown.ts)

---

## Formatting Toolbar

14 formatting actions organized by function:

### Text Formatting
| Button | Action | Markdown |
|--------|--------|----------|
| **B** | Bold | `**text**` |
| *I* | Italic | `*text*` |
| H1 | Heading 1 | `# text` |
| H2 | Heading 2 | `## text` |
| H3 | Heading 3 | `### text` |

### Code
| Button | Action | Markdown |
|--------|--------|----------|
| `<>` | Inline code | `` `code` `` |
| ```` ``` ```` | Code block | Fenced code block with language tag |

### Structure
| Button | Action | Markdown |
|--------|--------|----------|
| • | Bullet list | `- item` |
| 1. | Numbered list | `1. item` |
| > | Blockquote | `> quote` |
| 🔗 | Link | `[text](url)` |

### AI Delimiter Tools
| Button | Action | Output |
|--------|--------|--------|
| `</>` | XML tag wrapper | `<tag>content</tag>` |
| `<!--` | HTML comment | `<!-- content -->` |
| `---` | Separator menu | 7 styles (see below) |

**Separator styles:**
1. `---` (standard horizontal rule)
2. `===`
3. `***`
4. `~~~`
5. `+++`
6. `///`
7. `###`

These delimiters are designed for AI prompt structuring — wrapping context, instructions, and examples in parseable boundaries.

**Source:** [`src/components/MarkdownToolbar.tsx`](../../src/components/MarkdownToolbar.tsx)

---

## Rich Copy

Clicking **Copy** writes both MIME types to the clipboard:

| MIME Type | Content |
|-----------|---------|
| `text/html` | Styled HTML (preserves formatting in rich editors) |
| `text/plain` | Raw markdown (for plain text editors) |

**Paste destinations that preserve formatting:**
- Google Docs
- Notion
- Slack
- Email clients (Gmail, Outlook)
- Confluence
- Any rich text editor

**Fallback:** If HTML clipboard write fails, falls back to plain text only.

**Feedback:** Toast notification with "Copied!" and a green highlight on the copy button.

---

## Export Formats

| Format | Extension | Description |
|--------|-----------|-------------|
| **Markdown** | `.md` | Clean markdown (no wrappers) |
| **skill.MD** | `.md` | Markdown wrapped with `---` delimiters |
| **Plain Text** | `.txt` | Raw text content |
| **HTML** | `.html` | Full HTML document with inline styles |
| **PDF** | — | Opens browser print dialog with styled content |

See [Export Formats](Export-Formats.md) for detailed format specifications.

---

## Theme System

Two production themes with full coverage across all components:

| Theme | Mode | Aesthetic |
|-------|------|-----------|
| **InfinitiGRID** | Dark | Terminal green on midnight blue |
| **Vaporwave** | Light | Warm browns on cream |

- Toggle via Sun/Moon icon in the editor header
- Persisted to `localStorage` across sessions
- Landing page animates between themes before content is entered

See [Themes](Themes.md) for full color specifications.

---

## Live Stats

The editor footer displays real-time document statistics:

| Stat | Description |
|------|-------------|
| **Word count** | Total words in the markdown content |
| **Character count** | Total characters |
| **Reading time** | Estimated minutes (based on 200 WPM) |

---

## Feedback System

A unified request form for bug reports, feature requests, and general feedback.

**Fields:**
| Field | Required | Details |
|-------|----------|---------|
| Email | Yes | With privacy tooltip |
| Heading | Yes | Brief title for the request |
| Description | Yes | Detailed description |
| Attachments | No | Up to 3 files, 5MB each |

**Technical details:**
- Images are compressed before upload (canvas-based, JPEG 70% quality)
- Files stored in Supabase Storage bucket
- Form data saved to Supabase `feedback` table
- Success/error feedback via toast notifications

**Source:** [`src/components/FeedbackModal.tsx`](../../src/components/FeedbackModal.tsx)

---

## SEO

FormatMD includes production-grade SEO:

| Feature | Implementation |
|---------|---------------|
| **Meta tags** | Per-page title, description via `SEOHead` component |
| **Open Graph** | `og:title`, `og:description`, `og:image`, `og:url` |
| **Twitter Cards** | `twitter:card`, `twitter:title`, `twitter:description` |
| **JSON-LD** | Structured data in `index.html` |
| **Sitemap** | `public/sitemap.xml` |
| **Robots** | `public/robots.txt` |

**Source:** [`src/components/SEOHead.tsx`](../../src/components/SEOHead.tsx)

---

## Documentation Page

The `/docs` route provides a feature reference organized into 5 sections:

1. **Editor** — Rich Markdown Editor, View Modes
2. **Formatting** — Text Controls, Code Blocks, Delimiter Tools
3. **Themes** — InfinitiGRID Dark, Vaporwave Light
4. **Copy & Export** — Rich Copy, Download Formats, Stats
5. **Feedback** — Unified Request System

The documentation section is a shared component reused on both the landing page (second fold) and the dedicated docs page.

**Source:** [`src/components/DocumentationSection.tsx`](../../src/components/DocumentationSection.tsx), [`src/pages/Docs.tsx`](../../src/pages/Docs.tsx)
