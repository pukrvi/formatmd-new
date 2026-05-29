# FormatMD

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev/)

**Paste markdown. Style it. Copy anywhere.**

FormatMD is a fully client-side markdown formatter and styler. Paste or type markdown, apply a visual theme, and copy styled rich-text output into Google Docs, Notion, Slack, email — or export as `.md`, `.html`, `.txt`, or PDF.

No sign-up. No install. No backend. Just paste and go.

> Created by **Puneet Vishnawat** @ [InfinitiGRID](https://infinitigrid.com)

---

## Features

- **Live editor** with Editor, Split, and Preview modes
- **Synced scrolling** in Split view — editor and preview scroll together by default; toggle the lock to scroll independently
- **Sticky header** on homepage and documentation
- **Rich copy** — copies styled HTML + plain text to clipboard
- **Smart paste** — auto-converts HTML (from Google Docs, etc.) to markdown
- **Two themes** — InfinitiGRID (dark) and Vaporwave (light), persisted across sessions
- **Export** — download as clean `.md`, `skill.MD` (--- wrapped), `.txt`, `.html`, or print-to-PDF
- **14-button formatting toolbar** — headings, bold, italic, code, lists, links, blockquotes, delimiters
- **AI delimiter tools** — XML tags, HTML comments, 7 separator styles for structured prompts
- **Live stats** — word count, character count, estimated reading time
- **Feedback system** — unified request form that opens the user's default mail client with the message pre-filled (no backend)
- **SEO-ready** — JSON-LD, Open Graph, Twitter Cards, sitemap, per-page meta tags
- **MIT licensed** and fully open-source — see [LICENSE](./LICENSE)

---

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Framework  | React 18 + TypeScript 5                       |
| Build      | Vite 5 + SWC                                  |
| Styling    | Tailwind CSS 3.4 + shadcn/ui                  |
| Routing    | React Router v6                               |
| Backend    | None — fully client-side                      |
| Data       | Local React state + `localStorage`            |
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

FormatMD is fully self-contained — no backend, no database, no environment variables required.

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
├── components/         # Feature components (editor, toolbar, footer, modal, docs section, SEO)
│   └── ui/             # Shared shadcn/ui primitives
├── lib/                # Utilities (themes, converters, export, clipboard, stats)
└── hooks/              # Shared hooks (useMarkdownPaste, useTheme)
```

### Key Files

| File                                     | Role                                        |
|------------------------------------------|---------------------------------------------|
| `src/pages/Index.tsx`                    | Landing page + main editor                  |
| `src/components/TerminalPreview.tsx`     | Editor/preview with export and stats        |
| `src/components/MarkdownToolbar.tsx`     | 14 formatting actions + delimiter menu      |
| `src/components/DocumentationSection.tsx`| Features fold (shared by Index and Docs)    |
| `src/components/SEOHead.tsx`             | Per-page meta tags and Open Graph           |
| `src/components/FeedbackModal.tsx`       | Unified request form (opens mailto link)    |
| `src/lib/themes.ts`                      | Theme definitions (colors, fonts)           |
| `src/lib/htmlToMarkdown.ts`              | HTML paste-to-Markdown converter            |
| `src/lib/markdownToHtml.ts`              | Markdown-to-styled-HTML renderer            |
| `src/lib/exportService.tsx`              | Export registry (md, skill.MD, txt, html, pdf) |
| `src/lib/clipboardService.ts`            | Rich + plain copy with fallback             |
| `src/lib/markdownStats.ts`               | Word/char count + estimated reading time    |
| `src/hooks/useTheme.ts`                  | Theme state + `localStorage` persistence    |
| `src/hooks/useMarkdownPaste.ts`          | Shared clipboard paste handler              |

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
| `skills/PROD_READY_PERFORMANCE_TECH_DEBT.md` | Production readiness, performance, and tech debt |
| `skills/ALL_BUGS.md`                 | Unified bug tracker (open + resolved) |
| `skills/SEO.md`                      | SEO status + remaining actions |
| `skills/UI_UX_FLOW.md`               | UI/UX/flow and accessibility tracker |

---

## Contributing

1. Create a feature branch from `main`
2. Make changes in `src/` only
3. Run quality checks: `npm run lint && npm run test && npm run build`
4. Submit a PR with notes covering: scope, rationale, validation, and risks

---

## License

FormatMD is released under the [Apache License 2.0](./LICENSE).

- **Created by:** Puneet Vishnawat
- **Copyright © 2026:** INFINITIGRID TECHNOLOGIES (OPC) PRIVATE LIMITED. All rights reserved.

You are free to **use, copy, modify, and distribute** the software — including for commercial purposes — subject to the terms in the [LICENSE](./LICENSE) and [NOTICE](./NOTICE) files. The Apache 2.0 License also grants an express **patent license** from contributors and requires preserving copyright and attribution notices in any redistribution. The software is provided "AS IS", without warranties of any kind.

> The canonical Apache 2.0 text is in [`LICENSE`](./LICENSE); attribution lives in [`NOTICE`](./NOTICE). GitHub auto-detects both and surfaces the badge above. The SPDX identifier is `Apache-2.0`.