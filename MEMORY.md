# MEMORY.md

## Purpose
Persistent project memory log for FormatMD.  
Update this file after every completed process/task run.

## Current Product Snapshot (as of 2026-03-09)

### Product
- FormatMD is a markdown formatting workspace that converts raw markdown into styled rich output for copy/paste and export.
- Main routes:
  - `/` interactive editor and preview experience.
  - `/docs` product documentation page.
  - `*` fallback not-found page.

### Core User Flow
- User pastes or types markdown.
- App supports smart HTML-to-markdown paste conversion.
- User formats with toolbar actions (headings, emphasis, code, lists, links, quotes, delimiters, etc.).
- User switches view mode (`Editor`, `Split`, `Preview`) and theme (`infiniti`, `vaporwave`).
- User copies styled output as rich HTML + plain text fallback.
- User downloads output as `.md`, `.txt`, `.html`, or print-to-PDF.

### Current Feature Set
- Live markdown editor with undo/redo handling.
- Custom markdown toolbar with structural and AI-style delimiter helpers.
- Rich HTML renderer with theme-aware styling for headings, code blocks, tables, lists, links, blockquotes, and rules.
- Stats bar with word count, character count, and estimated reading time.
- Animated landing state (logo, placeholder guidance, ambient effects).
- Feedback modal:
  - Bug report / feature request modes.
  - Optional attachments (up to 3 files, per-file size checks).
  - Image compression before upload.
  - Supabase storage + feedback table insert.

### Design and Brand Baseline
- Name: `FormatMD`
- Attribution used in UI: `by Puneet Vishnawat @ InfinitiGRID`
- Theme palette baseline:
  - `infiniti` dark: `#050a14`, `#4CC77C`, `#7DDBA3`, `#1F2733`.
  - `vaporwave` light: `#FDF6E3`, `#5C4033`, `#B5651D`, `#F5E6D3`, highlight `#FFE0B2`.
- Typography baseline:
  - `Poppins` for general UI.
  - `Fira Code` for editor/terminal style surfaces.

### Architecture Baseline
- `src/pages`: `Index.tsx`, `Docs.tsx`, `NotFound.tsx`
- `src/components`: feature components (terminal/editor/toolbar/footer/modal)
- `src/components/ui`: shared shadcn/ui primitives
- `src/lib`: themes + HTML-to-markdown conversion
- `src/hooks`: reusable behavior hooks (`useMarkdownPaste`, etc.)
- `src/integrations/supabase`: client + generated types

### Commands Baseline
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`
- `npm run preview`

## Change Log

### 2026-03-09
- Added `CLAUDE.md` with project operating rules, brand/design guardrails, Anthropic best-practice structure, quality gates, and documentation/PR requirements.
- Added this `MEMORY.md` and initialized a full baseline snapshot of current product behavior, architecture, stack, and workflow.
- Verification: file creation completed in `/Users/gtmbuddy/Documents/formatmd/formatmd-new/`.

### 2026-03-09 (update 2)
- Task: rewrite `CLAUDE.md` using guidance from:
  - `/Users/gtmbuddy/Downloads/LLM Context Setting Guide Creation.pdf`
  - `/Users/gtmbuddy/Downloads/Production-ready CLAUDE.md and SOUL.md for agent context and instruction design.pdf`
- Changes made:
  - Replaced `CLAUDE.md` with a production-focused structure using instruction hierarchy + WHAT/WHY/HOW organization.
  - Added SOUL-style sections: Identity, Core Truths, Boundaries, and Continuity.
  - Strengthened security/prompt-injection, context/token management, verification-first workflow, and drift-prevention update protocol.
  - Preserved FormatMD-specific brand, architecture, commands, and delivery expectations.
- Files touched:
  - `CLAUDE.md`
  - `MEMORY.md`
- Validation run:
  - Document-level validation only (content rewrite and file checks).
- Browser check summary:
  - Not applicable (no product code/UI changes).
- Risks / follow-ups:
  - Consider adding `AGENTS.md` as a canonical cross-tool instruction shim if multi-agent tooling expands.

### 2026-03-09 (update 3)
- Task: create a crisp `start.md` runbook focused on per-run bot behavior.
- Changes made:
  - Added `start.md` as a tighter operational checklist derived from `CLAUDE.md`.
  - Embedded user tenets: strict scope path, memory updates every run, quality + browser checks, PR notes, wiki/docs updates, and inline comment expectations.
- Files touched:
  - `start.md`
  - `MEMORY.md`
- Validation run:
  - File creation and content verification completed.
- Browser check summary:
  - Not applicable (documentation-only change).
- Risks / follow-ups:
  - Keep `start.md` and `CLAUDE.md` aligned when workflow rules change.

### 2026-03-10 — Phase 1 Bug Fixes (P0)
- Task: Fix all 5 Phase 1 bugs from ROADMAP.md
- Changes made:
  - **BUG-001** (Footer animation stuck): Replaced conditional `{!hasContent && <Footer />}` with CSS opacity/maxHeight transition wrapper. Footer now fades out smoothly over 700ms instead of instant unmount.
  - **BUG-002** (/docs and /features same page): Added `id="features"` with `scroll-mt-16` to the Docs.tsx main content wrapper. Added `handleClick` hash navigation helper to Footer.tsx for smooth scrolling. Added `scroll-behavior: smooth` to `html` in index.css.
  - **BUG-003** (Toolbar button background mismatch): Added `transition: background-color 150ms ease, color 150ms ease, transform 150ms ease` to all toolbar buttons. Added `onFocus`/`onBlur` handlers matching mouse handlers. Added `aria-label` to every icon button. Added `.toolbar-btn:focus-visible` ring styles in index.css. Updated Tip component to show on `group-focus-within`.
  - **BUG-004** (AnimatedPlaceholder stuck): Added `mountedRef = useRef(true)` with cleanup on unmount. All `setTimeout` callbacks now guard state updates with `mountedRef.current` check. Prevents orphaned updates when component unmounts mid-animation.
  - **BUG-006** (Duplicate paste handling): Created `src/hooks/useMarkdownPaste.ts` shared hook. Index.tsx now uses `useMarkdownPaste(handlePasteInsert)` with state-based insertion. TerminalPreview.tsx uses `useMarkdownPaste(handlePasteInsert)` with `execCommand('insertText')` for undo-stack preservation. Removed unused `ReactMarkdown` import and direct `htmlToMarkdown` imports from both consumers.
- Files touched:
  - `src/hooks/useMarkdownPaste.ts` (NEW)
  - `src/pages/Index.tsx`
  - `src/pages/Docs.tsx`
  - `src/components/TerminalPreview.tsx`
  - `src/components/MarkdownToolbar.tsx`
  - `src/components/AnimatedPlaceholder.tsx`
  - `src/components/Footer.tsx`
  - `src/index.css`
  - `MEMORY.md`
- Validation run:
  - Manual code review (grep-based): all imports resolved, no dead imports, shared hook used consistently.
  - Node.js/npm not available on local machine — no build/lint/test run possible.
- Browser check summary:
  - Not executable (no dev server available without Node.js).
- Risks / follow-ups:
  - Run `npm run build` and `npm run lint` when Node.js is available to confirm zero type errors.
  - BUG-003 still uses inline `onMouseEnter`/`onMouseLeave` style manipulation alongside CSS transitions — a future refactor could move entirely to CSS custom properties + `:hover` selectors.
  - Footer always renders now (just hidden via CSS). Verify no layout shift on initial load.

### 2026-03-10 — SEO P1 Implementation
- Task: Implement all 6 SEO tasks from Phase 1 roadmap.
- Changes made:
  - **JSON-LD structured data**: Added `WebApplication` schema to `index.html` with name, description, creator (InfinitiGRID), author (Puneet Vishnawat), featureList, and free pricing.
  - **Missing meta tags**: Added `keywords`, `robots`, `canonical`, `og:url`, `og:locale`, `og:site_name`, `theme-color` (#050a14), `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, and Supabase `preconnect`.
  - **Sitemap**: Created `public/sitemap.xml` with `/` (priority 1.0, weekly) and `/docs` (priority 0.7, monthly). Added `Sitemap:` directive to `robots.txt`.
  - **Per-page titles**: Added `react-helmet-async` dependency. Created `src/components/SEOHead.tsx` shared component. Wrapped app in `HelmetProvider` in `main.tsx`. Added unique `<SEOHead>` to all 3 pages:
    - `/` — "FormatMD — Markdown Formatter & Styler"
    - `/docs` — "Documentation — FormatMD"
    - `*` — "Page Not Found — FormatMD"
  - **og:image**: Replaced Lovable CDN URL with self-hosted `public/og-image.svg` (branded SVG with terminal mockup, InfinitiGRID design language).
  - **twitter:site**: Changed from `@Lovable` to `@InfinitiGRID`. Added `twitter:creator`.
- Files touched:
  - `index.html` (full rewrite of `<head>`)
  - `public/og-image.svg` (NEW)
  - `public/sitemap.xml` (NEW)
  - `public/robots.txt` (appended Sitemap directive)
  - `package.json` (added `react-helmet-async`)
  - `src/main.tsx` (HelmetProvider wrapper)
  - `src/components/SEOHead.tsx` (NEW)
  - `src/pages/Index.tsx` (import + SEOHead usage)
  - `src/pages/Docs.tsx` (import + SEOHead usage)
  - `src/pages/NotFound.tsx` (import + SEOHead usage)
  - `skills/ROADMAP.md`
  - `MEMORY.md`
- Validation run:
  - Grep confirms: no `@Lovable` or Lovable CDN URLs in production code.
  - Grep confirms: `SEOHead` imported in all 3 pages, `HelmetProvider` wraps App.
  - Grep confirms: `react-helmet-async` in package.json dependencies.
  - Node.js/npm not available — `npm install` and `npm run build` pending.
- Browser check summary:
  - Not executable (no dev server). Validate JSON-LD at https://validator.schema.org/ after deploy.
  - Validate OG tags at https://developers.facebook.com/tools/debug/ after deploy.
- Risks / follow-ups:
  - `npm install` required to install `react-helmet-async` before build.
  - `og-image.svg` is SVG format — some social platforms (Twitter/X) may not render SVG previews. Consider generating a PNG fallback.
  - `canonical` and `og:url` assume domain `formatmd.app` — update if domain changes.
  - Per-page `<meta>` overrides rely on `react-helmet-async` deduplication — verify no duplicate tags in production HTML.

## Entry Template (use for every future update)
- Date:
- Task:
- Changes made:
- Files touched:
- Validation run:
- Browser check summary:
- Risks / follow-ups:
