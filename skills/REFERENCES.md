# FormatMD — References & Design Resources

> Last Updated: 2026-03-09

---

## Design Systems & Guidelines

### Google Material Design 3
- **Toolbar patterns:** https://m3.material.io/components/top-app-bar
- **Icon buttons:** https://m3.material.io/components/icon-buttons
- **Tooltips:** https://m3.material.io/components/tooltips
- **Motion principles:** https://m3.material.io/styles/motion
- **Key takeaways for FormatMD:**
  - Group toolbar actions with dividers
  - 500ms tooltip delay on hover/focus
  - Ripple feedback on button press
  - Consistent 8px spacing grid

### Adobe Spectrum Design
- **Action bar:** https://spectrum.adobe.com/page/action-bar/
- **Progressive disclosure:** https://spectrum.adobe.com/page/progressive-disclosure/
- **Key takeaways for FormatMD:**
  - Hide advanced actions behind overflow menu
  - Show contextual actions based on selection
  - Confirmation feedback after every action

---

## Competitive Landscape

| Tool        | Free? | Themes | Export        | Collaboration | Auth    |
| ----------- | ----- | ------ | ------------- | ------------- | ------- |
| FormatMD    | Yes   | 2      | MD/TXT/HTML/PDF| No           | No      |
| Dillinger   | Yes   | 1      | MD/HTML/PDF   | No            | Dropbox |
| StackEdit   | Yes   | 1      | MD/HTML       | Yes           | Google  |
| HackMD      | Free+ | 1      | MD/HTML       | Yes           | Yes     |
| Typora      | $15   | 6+     | MD/HTML/PDF   | No            | No      |
| Notion      | Free+ | 1      | MD/PDF        | Yes           | Yes     |

### FormatMD Differentiators
1. **Rich copy** — styled HTML to clipboard (unique workflow)
2. **Zero friction** — no signup, no download
3. **Theme-first** — visual styling is the product, not just editing

---

## Technical References

### Markdown Processing
- CommonMark spec: https://spec.commonmark.org/
- GFM spec: https://github.github.com/gfm/
- markdown-it (alternative parser): https://github.com/markdown-it/markdown-it

### Syntax Highlighting (for future)
- Prism.js: https://prismjs.com/ — lightweight, extensible
- highlight.js: https://highlightjs.org/ — auto-detection
- Shiki: https://shiki.style/ — VS Code's highlighting engine

### Rich Text Clipboard
- Clipboard API: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
- ClipboardItem: https://developer.mozilla.org/en-US/docs/Web/API/ClipboardItem
- Browser support: https://caniuse.com/async-clipboard

### XSS Protection
- DOMPurify: https://github.com/cure53/DOMPurify
- OWASP XSS Prevention: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html

### Performance
- Web Vitals: https://web.dev/vitals/
- Lighthouse: https://developer.chrome.com/docs/lighthouse/
- `useDeferredValue`: https://react.dev/reference/react/useDeferredValue

---

## Supabase Resources

- Dashboard: https://supabase.com/dashboard/project/eovxyoxicltaczwcufix
- Auth docs: https://supabase.com/docs/guides/auth
- RLS docs: https://supabase.com/docs/guides/auth/row-level-security
- Edge Functions: https://supabase.com/docs/guides/functions
- Realtime: https://supabase.com/docs/guides/realtime

---

## Deployment

FormatMD is a static Vite SPA. Compatible hosting platforms:

- **Vercel** — `vercel --prod` or connect repo
- **Netlify** — build: `npm run build`, publish: `dist/`
- **Cloudflare Pages** — connect repo, framework preset: Vite

---

## Donation Platforms (for Task C)

| Platform            | Fee       | Setup          |
| ------------------- | --------- | -------------- |
| Ko-fi               | 0%        | Instant        |
| Buy Me a Coffee     | 5%        | Instant        |
| GitHub Sponsors     | 0%        | Requires approval |
| Open Collective     | 10%       | For open source |
| Stripe (direct)     | 2.9%+30c  | Custom setup   |

---

## SEO Tools

- Google Search Console: https://search.google.com/search-console
- Ahrefs Webmaster: https://ahrefs.com/webmaster-tools (free tier)
- Schema validator: https://validator.schema.org/
- OG debugger: https://developers.facebook.com/tools/debug/
- Twitter card validator: https://cards-dev.twitter.com/validator
