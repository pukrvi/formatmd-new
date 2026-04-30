# FAQ

Common questions about FormatMD — for humans and AI agents.

---

## General

### What is FormatMD?
A web-based markdown formatter. Paste markdown, apply a theme, copy styled output anywhere (Google Docs, Notion, Slack, email) or export as a file.

### Do I need an account?
No. FormatMD works entirely in the browser with no sign-up required.

### Where is my data stored?
Your markdown stays in your browser (React state). Nothing is sent to a server unless you submit feedback. Theme preference is saved to `localStorage`.

### What browsers are supported?
Any modern browser with `navigator.clipboard` API support (Chrome, Firefox, Safari, Edge).

---

## Editor

### How do I switch between editor and preview?
Use the view mode buttons in the terminal header bar: **Editor**, **Split**, or **Preview**.

### How do I change the theme?
Click the Sun/Moon icon in the editor header. The theme persists across sessions.

### Does smart paste work from all sources?
It works with any source that puts HTML on the clipboard — Google Docs, web pages, email clients, Confluence, etc. It converts common HTML elements to markdown equivalents.

### What are the AI delimiter tools?
The XML tag wrapper, HTML comment, and separator tools in the toolbar help structure markdown for AI prompts. They insert parseable boundaries (`<tag>`, `<!-- -->`, `---`, etc.) that LLMs can use to identify sections.

---

## Export

### What's the difference between `.md` and `skill.MD`?
- `.md` — clean markdown, no wrappers
- `skill.MD` — same content wrapped with `---` delimiters at top and bottom (useful for AI prompt templates)

### Why does PDF open a print dialog?
FormatMD uses the browser's native print-to-PDF functionality for best quality and compatibility. Select "Save as PDF" in the print dialog.

### Can I copy styled content to Google Docs?
Yes. Click "Copy" and paste into Google Docs — headings, bold, italic, lists, code, and links will be preserved as formatted text.

---

## Development

### How do I run locally?
```bash
git clone https://github.com/pukrvi/formatmd-new.git
cd formatmd-new
npm install
npm run dev
```

### What's the tech stack?
React 18 + TypeScript 5 + Vite 5 + Tailwind CSS + shadcn/ui + Supabase.

### How do I run tests?
```bash
npm run test        # Run once
npm run test:watch  # Watch mode
```

### What quality checks are required?
```bash
npm run lint   # 0 errors
npm run test   # All pass
npm run build  # Succeeds
```

---

## For AI Agents

### Where do I start?
1. Read `CLAUDE.md` — it has operating instructions, scope rules, and workflow
2. Read `MEMORY.md` — recent changes and context
3. Check `skills/ALL_BUGS.md` — known issues

### What's the verification workflow?
Plan → Implement → `npm run lint` → `npm run test` → `npm run build` → Browser check (if UI).

### Where are the key files?

| Purpose | File |
|---------|------|
| Main page + editor | `src/pages/Index.tsx` |
| Editor/preview component | `src/components/TerminalPreview.tsx` |
| Formatting toolbar | `src/components/MarkdownToolbar.tsx` |
| Theme definitions | `src/lib/themes.ts` |
| Markdown → HTML | `src/lib/markdownToHtml.ts` |
| HTML → Markdown | `src/lib/htmlToMarkdown.ts` |
| Export logic | `src/lib/downloadHandler.ts` |
| Paste handler | `src/hooks/useMarkdownPaste.ts` |

### What are the scope guardrails?
- Only change files in the project directory
- Keep changes minimal and focused
- Don't edit generated files (e.g., `src/integrations/supabase/client.ts`)
- Follow existing patterns before introducing new ones

### How do I update documentation?
- Wiki: `docs/wiki/` (update relevant pages)
- Change log: `docs/wiki/Changelog.md`
- Agent context: `CLAUDE.md` (if workflows change)
- Memory: `MEMORY.md` (after completing tasks)
