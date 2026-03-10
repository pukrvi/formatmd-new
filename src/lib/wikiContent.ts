/**
 * Wiki page content rendered on the /docs route.
 * Each page corresponds to a docs/wiki/*.md file in the repo.
 */

export interface WikiPage {
  id: string;
  title: string;
  icon: string;
  content: string;
}

export const wikiPages: WikiPage[] = [
  {
    id: 'overview',
    title: 'Overview',
    icon: '◆',
    content: `# FormatMD

**Paste markdown. Style it. Copy anywhere.**

FormatMD is a web-based markdown formatter and styler. Paste or type markdown, apply a visual theme, and copy styled rich-text output into Google Docs, Notion, Slack, email — or export as \`.md\`, \`.html\`, \`.txt\`, or PDF.

No sign-up. No install. Just paste and go.

> Created by **Puneet Vishnawat** @ InfinitiGRID

---

## How It Works

1. **Paste or type** markdown into the editor
2. **Choose a theme** — InfinitiGRID (dark) or Vaporwave (light)
3. **Preview** your styled output in real-time
4. **Copy** rich-formatted text to clipboard, or **export** as a file

---

## Key Differentiators

- **Zero friction** — no account, no install, works in-browser
- **Rich copy** — pastes as styled HTML into Google Docs, Notion, Slack, email
- **Smart paste** — auto-detects HTML from clipboard and converts to markdown
- **AI-friendly** — delimiter tools for structured prompts
- **Dual themes** — dark terminal aesthetic and warm light mode`,
  },
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: '▶',
    content: `# Getting Started

## Prerequisites

- Node.js 18+ (recommended: install via nvm)
- npm 9+

## Installation

\`\`\`bash
git clone https://github.com/pukrvi/formatmd-new.git
cd formatmd-new
npm install
npm run dev
\`\`\`

The app runs at \`http://localhost:8080\` by default.

## Environment Variables

Copy \`.env.example\` to \`.env\` and fill in your Supabase credentials:

\`\`\`
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
\`\`\`

> The anon key is a client-side publishable key. Row-Level Security (RLS) policies are the security boundary.

---

## Commands

| Command | Description |
|---------|-------------|
| \`npm run dev\` | Start dev server with HMR |
| \`npm run build\` | Production build |
| \`npm run preview\` | Preview production build locally |
| \`npm run lint\` | Run ESLint |
| \`npm run test\` | Run tests (Vitest) |
| \`npm run test:watch\` | Run tests in watch mode |

---

## Deployment

FormatMD is a static SPA. Deploy to any Vite-compatible host:

| Platform | Config |
|----------|--------|
| **Vercel** | \`vercel --prod\` |
| **Netlify** | Build: \`npm run build\`, Publish: \`dist/\` |
| **Cloudflare Pages** | Framework preset: Vite |`,
  },
  {
    id: 'editor',
    title: 'Editor',
    icon: '✎',
    content: `# Editor

## View Modes

The editor supports three view modes:

| Mode | Description |
|------|-------------|
| **Editor** | Full-width markdown editing textarea |
| **Split** | Side-by-side editor and styled preview |
| **Preview** | Full-width styled HTML output |

Switch between modes using the toggle buttons in the terminal header bar.

---

## Smart Paste

FormatMD automatically detects when you paste HTML content (e.g., from Google Docs, a web page, or email) and converts it to clean markdown.

### Supported conversions

- \`<strong>\` / \`<b>\` → \`**bold**\`
- \`<em>\` / \`<i>\` → \`*italic*\`
- \`<h1>\` – \`<h6>\` → \`#\` – \`######\`
- \`<a href>\` → \`[text](url)\`
- \`<code>\` → inline code
- \`<pre>\` → fenced code blocks
- \`<ul>\` / \`<ol>\` → list items
- \`<blockquote>\` → \`> quote\`
- \`<img>\` → \`![alt](src)\`

---

## Live Stats

The editor footer displays real-time document statistics:

| Stat | Description |
|------|-------------|
| **Word count** | Total words in the markdown content |
| **Character count** | Total characters |
| **Reading time** | Estimated minutes (based on 200 WPM) |`,
  },
  {
    id: 'formatting',
    title: 'Formatting Toolbar',
    icon: '⌘',
    content: `# Formatting Toolbar

14 formatting actions organized by function.

## Text Formatting

| Button | Action | Markdown |
|--------|--------|----------|
| **B** | Bold | \`**text**\` |
| *I* | Italic | \`*text*\` |
| H1 | Heading 1 | \`# text\` |
| H2 | Heading 2 | \`## text\` |
| H3 | Heading 3 | \`### text\` |

## Code

| Button | Action | Markdown |
|--------|--------|----------|
| \`<>\` | Inline code | backtick-wrapped code |
| \`\\\`\\\`\\\`\` | Code block | Fenced code block with language tag |

## Structure

| Button | Action | Markdown |
|--------|--------|----------|
| • | Bullet list | \`- item\` |
| 1. | Numbered list | \`1. item\` |
| > | Blockquote | \`> quote\` |
| 🔗 | Link | \`[text](url)\` |

## AI Delimiter Tools

| Button | Action | Output |
|--------|--------|--------|
| \`</>\` | XML tag wrapper | \`<tag>content</tag>\` |
| \`<!--\` | HTML comment | \`<!-- content -->\` |
| \`---\` | Separator menu | 7 styles |

### Separator Styles

- \`---\` (standard horizontal rule)
- \`===\`
- \`***\`
- \`~~~\`
- \`+++\`
- \`///\`
- \`###\`

These delimiters are designed for AI prompt structuring — wrapping context, instructions, and examples in parseable boundaries.`,
  },
  {
    id: 'themes',
    title: 'Themes',
    icon: '◐',
    content: `# Themes

FormatMD ships with two production themes.

## InfinitiGRID (Dark)

Terminal-inspired dark theme with crisp green accents.

| Property | Value |
|----------|-------|
| Background | \`#050a14\` (midnight blue-black) |
| Heading | \`#4CC77C\` (terminal green) |
| Keyword | \`#7DDBA3\` (light green) |
| Text | \`#ffffff\` (white) |
| Panel | \`#1F2733\` (dark slate) |

---

## Vaporwave (Light)

Warm, cream-toned light theme with high-contrast typography.

| Property | Value |
|----------|-------|
| Background | \`#FDF6E3\` (cream) |
| Heading | \`#5C4033\` (brown) |
| Keyword | \`#B5651D\` (orange-brown) |
| Text | \`#3E2723\` (dark brown) |
| Panel | \`#F5E6D3\` (light beige) |
| Highlight | \`#FFE0B2\` (light orange) |

---

## Theme Behavior

- **Toggle** — Sun/Moon icon in the editor header
- **Persistence** — saved to \`localStorage\`, restored across sessions
- **Landing animation** — cycles through both themes before content is entered

## Typography

| Context | Font |
|---------|------|
| UI elements | \`Poppins\` (sans-serif) |
| Editor / code | \`Fira Code\` (monospace) |`,
  },
  {
    id: 'export',
    title: 'Copy & Export',
    icon: '↗',
    content: `# Copy & Export

## Rich Copy (Clipboard)

Click **Copy** to write both formats to the clipboard simultaneously:

- \`text/html\` — styled HTML (preserves formatting in rich editors)
- \`text/plain\` — raw markdown (for plain text editors)

### Paste destinations that preserve formatting

- Google Docs
- Notion
- Slack
- Email clients (Gmail, Outlook)
- Confluence
- Any rich text editor

---

## Export Formats

| Format | Extension | Description |
|--------|-----------|-------------|
| **Markdown** | \`.md\` | Clean markdown (no wrappers) |
| **skill.MD** | \`.md\` | Markdown wrapped with \`---\` delimiters |
| **Plain Text** | \`.txt\` | Raw text content |
| **HTML** | \`.html\` | Full HTML document with inline styles |
| **PDF** | — | Opens browser print dialog |

### Markdown vs skill.MD

- **\`.md\`** — exports exactly what you see in the editor, no wrappers
- **\`skill.MD\`** — same content wrapped with \`---\` delimiters at top and bottom, useful for AI prompt templates

### HTML Export

Generates a complete self-contained HTML document with inline styles, Fira Code font, and theme-aware coloring. No external dependencies.

### PDF Export

Opens the browser's native print dialog with a styled HTML document. Use "Save as PDF" in the print dialog for best quality.`,
  },
  {
    id: 'architecture',
    title: 'Architecture',
    icon: '⚙',
    content: `# Architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 + SWC |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| Routing | React Router v6 |
| Backend | Supabase (PostgreSQL + Storage) |
| SEO | react-helmet-async, JSON-LD |
| Fonts | Poppins (UI) + Fira Code (editor) |
| Testing | Vitest + JSDOM |

---

## Project Structure

- \`src/pages/\` — Route-level pages (\`/\`, \`/docs\`, \`404\`)
- \`src/components/\` — Feature UI components
- \`src/components/ui/\` — shadcn/ui primitives
- \`src/lib/\` — Utilities (themes, converters, export)
- \`src/hooks/\` — Shared React hooks
- \`src/integrations/\` — Supabase client + types

---

## Data Flow

1. User types or pastes content into the editor textarea
2. HTML paste is auto-converted to markdown via \`htmlToMarkdown()\`
3. Markdown is rendered to styled HTML via \`markdownToStyledHtml()\`
4. Output goes to clipboard (rich copy) or file (export)

---

## State Management

FormatMD uses **React local state only** — no global store.

| State | Persistence |
|-------|------------|
| Markdown content | Session only |
| Selected theme | \`localStorage\` |
| View mode | Session only |
| Feedback form | None |

---

## Routes

| Path | Page | Description |
|------|------|-------------|
| \`/\` | Index | Landing page + markdown editor |
| \`/docs\` | Docs | Documentation (this page) |
| \`*\` | NotFound | Themed 404 error page |`,
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: '?',
    content: `# FAQ

## General

### What is FormatMD?
A web-based markdown formatter. Paste markdown, apply a theme, copy styled output anywhere or export as a file.

### Do I need an account?
No. FormatMD works entirely in the browser with no sign-up required.

### Where is my data stored?
Your markdown stays in your browser (React state). Nothing is sent to a server unless you submit feedback. Theme preference is saved to \`localStorage\`.

### What browsers are supported?
Any modern browser with clipboard API support — Chrome, Firefox, Safari, Edge.

---

## Editor

### How do I switch between editor and preview?
Use the view mode buttons in the terminal header: **Editor**, **Split**, or **Preview**.

### How do I change the theme?
Click the Sun/Moon icon in the editor header. The theme persists across sessions.

### Does smart paste work from all sources?
It works with any source that puts HTML on the clipboard — Google Docs, web pages, email clients, Confluence, etc.

### What are the AI delimiter tools?
The XML tag wrapper, HTML comment, and separator tools help structure markdown for AI prompts. They insert parseable boundaries that LLMs can use to identify sections.

---

## Export

### What's the difference between .md and skill.MD?
- \`.md\` — clean markdown, no wrappers
- \`skill.MD\` — same content wrapped with \`---\` delimiters (useful for AI prompt templates)

### Why does PDF open a print dialog?
FormatMD uses the browser's native print-to-PDF for best quality. Select "Save as PDF" in the print dialog.

### Can I copy styled content to Google Docs?
Yes. Click **Copy** and paste — headings, bold, italic, lists, code, and links will be preserved as formatted text.`,
  },
];
