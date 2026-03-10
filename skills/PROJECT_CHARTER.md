# FormatMD — Project Charter

> **Created by:** Puneet Vishnawat @ InfinitiGRID
> **Last Audited:** 2026-03-09
> **Status:** Early-stage MVP — Core editor complete, infrastructure under-utilized

---

## Mission

FormatMD is a web-based markdown formatter and styler that lets users paste markdown, apply visual themes, and copy/export styled HTML into rich-text editors (Notion, Google Docs, Slack, etc.) — zero friction, no sign-up required.

---

## Architecture Overview

| Layer        | Stack                                           |
| ------------ | ----------------------------------------------- |
| Framework    | React 18.3 + TypeScript 5.8                     |
| Build        | Vite 5.4 + SWC                                  |
| Styling      | Tailwind CSS 3.4 + shadcn/ui (47 components)    |
| Routing      | React Router v6 (3 routes: `/`, `/docs`, `*`)   |
| Backend      | Supabase (PostgreSQL + Storage + Auth available) |
| Data         | TanStack Query 5                                 |
| Fonts        | Poppins (UI) + Fira Code (editor)               |
| Deployment   | Lovable platform                                 |

---

## Current State

### What Works

- Real-time split-view editor (editor / split / preview)
- Two themes: InfinitiGRID (dark) and Vaporwave (light)
- Smart paste: auto-converts HTML → Markdown
- Rich copy to clipboard (HTML + plaintext)
- Export: `.md`, `.txt`, `.html`, print-to-PDF
- 14-button formatting toolbar
- Live word count, char count, read time
- Feedback modal (bug/feature) with file upload → Supabase

### What's Missing / Under-Utilized

- **Auth:** Supabase Auth configured but unused — no login, no user profiles
- **Database:** Only 1 table (`feedback`); no document storage, no history
- **Realtime:** Supabase Realtime available but unused
- **Edge Functions:** Available but not deployed
- **shadcn/ui:** 47 components installed, only ~3 actively used
- **Testing:** Vitest configured, but only an example test exists
- **TypeScript:** Strict mode disabled (`noImplicitAny: false`)

---

## Pages & Routes

| Route  | Page           | Purpose                     |
| ------ | -------------- | --------------------------- |
| `/`    | Index.tsx      | Landing + main editor       |
| `/docs`| Docs.tsx       | Documentation / features    |
| `*`    | NotFound.tsx   | 404 page                    |

---

## Key Files

| File                           | Lines | Role                                   |
| ------------------------------ | ----- | -------------------------------------- |
| `src/pages/Index.tsx`          | ~230  | State hub: markdown, theme, paste      |
| `src/components/TerminalPreview.tsx` | ~485 | Core editor/preview, export, stats |
| `src/components/MarkdownToolbar.tsx` | ~275 | 14 formatting action buttons       |
| `src/components/FeedbackModal.tsx`   | ~220 | Feedback form + Supabase upload    |
| `src/lib/themes.ts`           | ~60   | Theme color/font definitions           |
| `src/lib/htmlToMarkdown.ts`   | ~135  | HTML paste → Markdown converter        |
| `src/index.css`               | ~100  | Global styles, animations, variables   |
| `tailwind.config.ts`          | ~80   | Design tokens, custom keyframes        |

---

## Database Schema (Supabase)

### `feedback` table
```
id:          UUID (PK, auto)
type:        TEXT ('bug' | 'feature')
title:       TEXT (required)
description: TEXT (nullable)
attachments: TEXT[] (file paths)
created_at:  TIMESTAMP (default: now())
```

### Storage: `feedback-attachments` bucket

### RLS Policies
- INSERT: Public (no auth required)
- SELECT: Blocked (`USING (false)`) — no admin read yet

---

## Related Documents

| Document                                      | Purpose                       |
| --------------------------------------------- | ----------------------------- |
| [AUDIT_BUGS.md](./AUDIT_BUGS.md)             | All identified bugs           |
| [AUDIT_SEO.md](./AUDIT_SEO.md)               | SEO gaps and fixes            |
| [AUDIT_UX.md](./AUDIT_UX.md)                 | UX/accessibility audit        |
| [AUDIT_PERFORMANCE.md](./AUDIT_PERFORMANCE.md)| Performance issues            |
| [AUDIT_SECURITY.md](./AUDIT_SECURITY.md)     | Security concerns             |
| [ROADMAP.md](./ROADMAP.md)                   | Feature roadmap + priorities  |
| [TECH_DEBT.md](./TECH_DEBT.md)               | Technical debt register       |
| [REFERENCES.md](./REFERENCES.md)             | Design references + resources |
