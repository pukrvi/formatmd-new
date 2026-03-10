# FormatMD

**Paste markdown. Style it. Copy anywhere.**

FormatMD is a web-based markdown formatter and styler. Paste or type markdown, apply a visual theme, and copy styled rich-text output into Google Docs, Notion, Slack, email — or export as `.md`, `.html`, `.txt`, or PDF.

No sign-up. No install. Just paste and go.

> Created by **Puneet Vishnawat** @ [InfinitiGRID](https://infinitigrid.com)

---

## Features

- **Live editor** with Editor, Split, and Preview modes
- **Rich copy** — copies styled HTML + plain text to clipboard
- **Smart paste** — auto-converts HTML (from Google Docs, etc.) to markdown
- **Two themes** — InfinitiGRID (dark) and Vaporwave (light), persisted across sessions
- **Export** — download as `.md` (with YAML front matter), `.txt`, `.html`, or print-to-PDF
- **14-button formatting toolbar** — headings, bold, italic, code, lists, links, blockquotes, delimiters
- **AI delimiter tools** — XML tags, HTML comments, 7 separator styles for structured prompts
- **Live stats** — word count, character count, estimated reading time
- **Feedback system** — bug reports and feature requests with file attachments (via Supabase)
- **SEO-ready** — JSON-LD, Open Graph, Twitter Cards, sitemap, per-page meta tags

---

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Framework  | React 18 + TypeScript 5                       |
| Build      | Vite 5 + SWC                                  |
| Styling    | Tailwind CSS 3.4 + shadcn/ui                  |
| Routing    | React Router v6                               |
| Backend    | Supabase (PostgreSQL + Storage)               |
| Data       | TanStack Query 5                              |
| SEO        | react-helmet-async                            |
| Fonts      | Poppins (UI) + Fira Code (editor)             |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- npm 9+

### Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd formatmd-new

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:8080` by default.

### Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

> **Note:** The anon key is a client-side publishable key. Row-Level Security (RLS) policies are the security boundary, not key secrecy.

---

## Commands

| Command              | Description                        |
|----------------------|------------------------------------|
| `npm run dev`        | Start dev server with HMR          |
| `npm run build`      | Production build                   |
| `npm run preview`    | Preview production build locally   |
| `npm run lint`       | Run ESLint                         |
| `npm run test`       | Run tests (Vitest)                 |
| `npm run test:watch` | Run tests in watch mode            |

---

## Project Structure

```
src/
├── pages/              # Route-level pages (/, /docs, 404)
├── components/         # Feature components (editor, toolbar, footer, modal)
│   └── ui/             # Shared shadcn/ui primitives
├── lib/                # Utilities (themes, htmlToMarkdown, helpers)
├── hooks/              # Shared hooks (useMarkdownPaste, etc.)
├── integrations/       # Supabase client + generated types
└── test/               # Test setup + specs
```

### Key Files

| File                                | Role                                     |
|-------------------------------------|------------------------------------------|
| `src/pages/Index.tsx`               | Landing page + main editor               |
| `src/components/TerminalPreview.tsx`| Editor/preview with export and stats     |
| `src/components/MarkdownToolbar.tsx`| 14 formatting actions + delimiter menu   |
| `src/lib/themes.ts`                | Theme definitions (colors, fonts)        |
| `src/lib/htmlToMarkdown.ts`        | HTML paste-to-Markdown converter         |
| `src/hooks/useMarkdownPaste.ts`    | Shared clipboard paste handler           |

---

## Themes

| Theme        | Mode  | Background | Accent    |
|--------------|-------|------------|-----------|
| InfinitiGRID | Dark  | `#050a14`  | `#4CC77C` |
| Vaporwave    | Light | `#FDF6E3`  | `#5C4033` |

Theme preference is persisted to `localStorage` and synced across sessions.

---

## Routes

| Path   | Page         | Description                    |
|--------|--------------|--------------------------------|
| `/`    | Index.tsx    | Landing page + markdown editor |
| `/docs`| Docs.tsx     | Feature documentation          |
| `*`    | NotFound.tsx | 404 error page                 |

---

## Deployment

FormatMD is a static SPA. Deploy to any Vite-compatible host:

- **Vercel** — `vercel --prod`
- **Netlify** — connect repo, build command: `npm run build`, publish: `dist/`
- **Cloudflare Pages** — connect repo, framework preset: Vite

After deploying, update:
- `canonical` and `og:url` in `index.html` to your production domain
- `sitemap.xml` URLs
- `SEOHead.tsx` base URL

---

## Documentation

Detailed project documentation lives in the `skills/` directory:

| Document                             | Purpose                        |
|--------------------------------------|--------------------------------|
| `CLAUDE.md`                          | Agent operating instructions   |
| `MEMORY.md`                          | Persistent change log          |
| `skills/ROADMAP.md`                  | Feature roadmap + priorities   |
| `skills/PROJECT_CHARTER.md`          | Architecture overview          |
| `skills/TECH_DEBT.md`               | Technical debt register        |
| `skills/CODE_OPTIMIZATION_AUDIT.md`  | Code optimization plan         |
| `skills/AUDIT_*.md`                  | Bug, SEO, UX, perf, security audits |

---

## Contributing

1. Create a feature branch from `main`
2. Make changes in `src/` only
3. Run quality checks: `npm run lint && npm run test && npm run build`
4. Submit a PR with notes covering: scope, rationale, validation, and risks

---

## License

Proprietary. All rights reserved.
Created by Puneet Vishnawat @ InfinitiGRID.
