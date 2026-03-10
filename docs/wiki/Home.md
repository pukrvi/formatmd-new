# FormatMD Wiki

> **Paste markdown. Style it. Copy anywhere.**

FormatMD is a web-based markdown formatter and styler built by [Puneet Vishnawat](https://infinitigrid.com) at InfinitiGRID. It converts raw markdown into clean, themed, copy-ready output — no sign-up, no install.

---

## Quick Links

| Page | Description |
|------|-------------|
| [Getting Started](Getting-Started.md) | Install, configure, and run locally |
| [Features](Features.md) | Full feature breakdown with usage details |
| [Themes](Themes.md) | Theme system, colors, and customization |
| [Export Formats](Export-Formats.md) | All export options (MD, HTML, TXT, PDF) |
| [Architecture](Architecture.md) | Codebase structure, components, and data flow |
| [Component Reference](Component-Reference.md) | Key components and their props/behavior |
| [Contributing](Contributing.md) | How to contribute, PR guidelines, quality gates |
| [Changelog](Changelog.md) | Recent changes and PR history |
| [FAQ](FAQ.md) | Common questions for humans and AI agents |

---

## Product Overview

### What FormatMD Does

```
┌─────────────────────────────────────────────────────┐
│                    FormatMD                          │
│                                                     │
│   Paste/Type          Apply Theme       Copy/Export  │
│   Markdown    ──►    (Dark/Light)  ──►  Anywhere    │
│                                                     │
│   Supported outputs:                                │
│   • Rich clipboard (Google Docs, Notion, Slack)     │
│   • .md / skill.MD / .txt / .html / PDF             │
└─────────────────────────────────────────────────────┘
```

### Core Workflow

1. **Paste or type** markdown into the editor
2. **Choose a theme** — InfinitiGRID (dark) or Vaporwave (light)
3. **Preview** your styled output in real-time (Editor / Split / Preview modes)
4. **Copy** rich-formatted text to clipboard, or **export** as a file

### Key Differentiators

- **Zero friction** — no account, no install, works in-browser
- **Rich copy** — pastes as styled HTML into Google Docs, Notion, Slack, email
- **Smart paste** — auto-detects HTML from clipboard and converts to markdown
- **AI-friendly** — delimiter tools (XML tags, separators) for structured prompts
- **Dual themes** — dark terminal aesthetic and warm light mode, both production-polished

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 + SWC |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| Routing | React Router v6 |
| Backend | Supabase (PostgreSQL + Storage) |
| SEO | react-helmet-async, JSON-LD, Open Graph |
| Fonts | Poppins (UI) + Fira Code (editor/code) |
| Testing | Vitest + JSDOM |

---

## Repository Structure

```
formatmd/
├── src/
│   ├── pages/           # Route-level pages (/, /docs, 404)
│   ├── components/      # Feature UI components
│   │   └── ui/          # shadcn/ui primitives
│   ├── lib/             # Utilities (themes, converters, export)
│   ├── hooks/           # Shared React hooks
│   └── integrations/    # Supabase client + types
├── public/              # Static assets (sitemap, robots, OG image)
├── docs/wiki/           # This wiki
├── skills/              # QA, bugs, SEO, UI/UX tracking docs
├── supabase/            # Database migrations
└── dist/                # Production build output
```

---

## Routes

| Path | Page | Description |
|------|------|-------------|
| `/` | `Index.tsx` | Landing page + markdown editor |
| `/docs` | `Docs.tsx` | Feature documentation |
| `*` | `NotFound.tsx` | Themed 404 error page |

---

## Status

- **Bugs:** 12/12 resolved, 0 open
- **SEO:** Core baseline implemented (JSON-LD, OG, sitemap)
- **QA:** Lint, test, and build all passing
- **Production:** Readiness plan in progress — see [skills/PRODUCTION_READINESS_PLAN.md](../../skills/PRODUCTION_READINESS_PLAN.md)

---

## For AI Agents

If you are an AI agent working on this codebase:

1. Read [`CLAUDE.md`](../../CLAUDE.md) first — it contains operating instructions, scope guardrails, and verification workflow
2. Read [`MEMORY.md`](../../MEMORY.md) for recent change history
3. Check [`skills/ALL_BUGS.md`](../../skills/ALL_BUGS.md) for known issues
4. Follow the **Verification-First Workflow**: plan → implement → lint/test/build → browser check
5. Key architectural rule: **smallest correct change** that solves the task
