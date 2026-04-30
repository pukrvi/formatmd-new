# Export Formats

FormatMD supports multiple export formats for different use cases.

---

## Overview

| Format | Extension | Use Case |
|--------|-----------|----------|
| **Rich Copy** | clipboard | Paste styled content into Google Docs, Notion, Slack, email |
| **Markdown** | `.md` | Clean markdown for repos, READMEs, documentation |
| **skill.MD** | `.md` | Delimited markdown for AI prompt engineering |
| **Plain Text** | `.txt` | Raw text without any formatting |
| **HTML** | `.html` | Styled HTML document for web use |
| **PDF** | print | Print-to-PDF via browser dialog |

---

## Rich Copy (Clipboard)

**Trigger:** Click the "Copy" button in the editor footer.

**What gets copied:**

The clipboard receives two MIME types simultaneously:

```
ClipboardItem {
  "text/html":  <styled HTML blob>
  "text/plain": <raw markdown text>
}
```

**Behavior by paste target:**
| Destination | What appears |
|-------------|-------------|
| Google Docs | Styled formatted text (headings, bold, lists, etc.) |
| Notion | Formatted blocks |
| Slack | Formatted message |
| Gmail / Outlook | Styled email content |
| VS Code / terminal | Raw markdown text |
| Plain text editor | Raw markdown text |

**Fallback:** If the browser doesn't support `navigator.clipboard.write()` with HTML, falls back to plain text only via `navigator.clipboard.writeText()`.

---

## Markdown (`.md`)

**Trigger:** Download dropdown → "Markdown (.md)"

**Output:** Clean markdown content with no wrappers or delimiters.

```markdown
# Your Heading

Your content exactly as typed in the editor.

- List items
- Preserved as-is
```

**File naming:** `formatmd-export.md`

---

## skill.MD

**Trigger:** Download dropdown → "skill.MD"

**Output:** Markdown content wrapped with `---` delimiters at the top and bottom.

```markdown
---
# Your Heading

Your content with delimiters for structured parsing.

- Useful for AI prompt templates
- Easy to parse programmatically
---
```

**Use case:** AI prompt engineering — the `---` boundaries make it easy for LLMs and parsers to identify the content section within a larger prompt or document.

**File naming:** `formatmd-export.md`

---

## Plain Text (`.txt`)

**Trigger:** Download dropdown → "Text (.txt)"

**Output:** Raw text content, same as what you see in the editor.

**File naming:** `formatmd-export.txt`

---

## HTML (`.html`)

**Trigger:** Download dropdown → "HTML (.html)"

**Output:** A complete, self-contained HTML document with:
- Full `<!DOCTYPE html>` structure
- Inline styles (no external CSS dependencies)
- Fira Code font for code blocks
- Theme-aware coloring
- Responsive layout

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>FormatMD Export</title>
  <style>
    /* Inline theme styles */
    /* Fira Code font */
  </style>
</head>
<body>
  <!-- Styled markdown content -->
</body>
</html>
```

**File naming:** `formatmd-export.html`

---

## PDF

**Trigger:** Download dropdown → "PDF"

**Output:** Opens the browser's native print dialog with a styled HTML document pre-loaded. Use "Save as PDF" in the print dialog.

**Styled with:**
- Fira Code font for code blocks
- Theme-appropriate colors
- Print-friendly layout

---

## Source

All export logic lives in [`src/lib/downloadHandler.ts`](../../src/lib/downloadHandler.ts).

Key functions:
- `downloadMarkdown(markdown, format, styledHtml)` — routes to the correct export handler
- `downloadBlob(blob, filename)` — creates a temporary anchor element and triggers download
