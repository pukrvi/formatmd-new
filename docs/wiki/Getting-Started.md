# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: install via [nvm](https://github.com/nvm-sh/nvm))
- npm 9+
- Git

## Installation

```bash
# Clone the repository
git clone https://github.com/pukrvi/formatmd-new.git
cd formatmd-new

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs at `http://localhost:8080` by default.

## Environment Variables

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

> **Note:** The anon key is a client-side publishable key. Row-Level Security (RLS) policies are the security boundary, not key secrecy.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

## First Run Walkthrough

### 1. Landing Page

When you first open FormatMD, you'll see:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    ◆ FormatMD                            │
│                                                         │
│          paste  ──►  transform  ──►  copy               │
│                                                         │
│   ┌─────────────────────────────────────────────┐       │
│   │                                             │       │
│   │   > Type or paste your markdown here...     │       │
│   │     (animated placeholder typing)           │       │
│   │                                             │       │
│   └─────────────────────────────────────────────┘       │
│                                                         │
│         created by Puneet Vishnawat @ InfinitiGRID      │
│                                                         │
│                      ▼ scroll for docs                  │
└─────────────────────────────────────────────────────────┘
```

- The landing has animated theme transitions between dark (InfinitiGRID) and light (Vaporwave)
- An animated placeholder shows example markdown being typed
- Step badges show the workflow: paste → transform → copy

### 2. Editor View

Once you paste or type markdown, the view transitions to the full editor:

```
┌─────────────────────────────────────────────────────────┐
│  ● ● ●   FormatMD    [Editor] [Split] [Preview]   ☀/🌙 │
├─────────────────────────────────────────────────────────┤
│  [B] [I] [H1] [H2] [H3] [<>] [```] [•] [1.] [>] [🔗] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  # Your Markdown                                        │
│                                                         │
│  Your content appears here with syntax highlighting     │
│  and real-time preview.                                 │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  📊 X words · Y chars · Z min read    [Copy] [⬇ ▾]    │
└─────────────────────────────────────────────────────────┘
```

### 3. Copy and Export

- Click **Copy** to copy styled HTML + plain text to clipboard
- Click the **download arrow** to export as `.md`, `skill.MD`, `.txt`, `.html`, or PDF

## Deployment

FormatMD is a static SPA. Deploy to any Vite-compatible host:

| Platform | Command / Config |
|----------|-----------------|
| **Vercel** | `vercel --prod` |
| **Netlify** | Build: `npm run build`, Publish: `dist/` |
| **Cloudflare Pages** | Framework preset: Vite |

After deploying, update:
- `canonical` and `og:url` in `index.html` to your production domain
- `sitemap.xml` URLs
- `SEOHead.tsx` base URL
