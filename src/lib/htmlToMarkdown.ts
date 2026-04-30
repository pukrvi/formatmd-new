/**
 * Converts pasted HTML (e.g. from Google Docs) into Markdown.
 *
 * Strategy: a small DOM pre-pass (`normalizeRichTextDom`) rewrites visually-
 * styled rich-text quirks into semantic markup, so the recursive `convertNode`
 * only has to handle real HTML tags.
 */
export function htmlToMarkdown(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  normalizeRichTextDom(doc.body);
  return convertNode(doc.body).trim();
}

/* ---------- rich-text normalization ---------- */

const isBoldStyle = (style: string): boolean => {
  const m = style.match(/font-weight:\s*(\d+|bold)/i);
  if (!m) return false;
  return m[1].toLowerCase() === 'bold' || parseInt(m[1], 10) >= 700;
};

const isItalicStyle = (style: string): boolean =>
  /font-style:\s*italic/i.test(style);

const isExplicitlyNotBold = (style: string): boolean => {
  const m = style.match(/font-weight:\s*(\d+|normal)/i);
  if (!m) return false;
  if (m[1].toLowerCase() === 'normal') return true;
  const n = parseInt(m[1], 10);
  return n > 0 && n < 700;
};

const STYLED_CONTAINER_SELECTOR =
  'span[style], div[style], section[style], article[style], main[style], header[style], footer[style], nav[style]';

/**
 * Rewrite the parsed DOM so visually-styled rich-text quirks become
 * semantic HTML that the recursive converter already understands:
 *
 * - Unwrap `<b style="font-weight:normal">` — Google Docs' outer document
 *   wrapper. Without this, every pasted Doc would become one giant **bold**
 *   block.
 * - Promote `font-weight: bold` containers to `<strong>` and
 *   `font-style: italic` containers to `<em>`. Both flags compose: a
 *   bold + italic span ends up as `<strong><em>...</em></strong>`.
 *
 * Containers are walked in document order; outer wrappers are processed
 * before inner ones, so nested styling composes correctly.
 */
export function normalizeRichTextDom(root: HTMLElement): void {
  const doc = root.ownerDocument;
  if (!doc) return;

  for (const el of Array.from(root.querySelectorAll<HTMLElement>('b[style], strong[style]'))) {
    if (!isExplicitlyNotBold(el.getAttribute('style') || '')) continue;
    const parent = el.parentNode;
    if (!parent) continue;
    while (el.firstChild) parent.insertBefore(el.firstChild, el);
    parent.removeChild(el);
  }

  for (const el of Array.from(root.querySelectorAll<HTMLElement>(STYLED_CONTAINER_SELECTOR))) {
    const style = el.getAttribute('style') || '';
    const bold = isBoldStyle(style);
    const italic = isItalicStyle(style);
    if (!bold && !italic) continue;

    let wrapper: HTMLElement = el;
    if (italic) {
      const em = doc.createElement('em');
      while (wrapper.firstChild) em.appendChild(wrapper.firstChild);
      wrapper.appendChild(em);
      wrapper = em;
    }
    if (bold) {
      const strong = doc.createElement('strong');
      while (wrapper.firstChild) strong.appendChild(wrapper.firstChild);
      wrapper.appendChild(strong);
    }
  }
}

/* ---------- recursive node → markdown ---------- */

function convertNode(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent || '';
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return '';

  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  const childContent = () => Array.from(el.childNodes).map(convertNode).join('');

  switch (tag) {
    case 'h1':
      return `\n# ${childContent().trim()}\n`;
    case 'h2':
      return `\n## ${childContent().trim()}\n`;
    case 'h3':
      return `\n### ${childContent().trim()}\n`;
    case 'h4':
      return `\n#### ${childContent().trim()}\n`;
    case 'h5':
      return `\n##### ${childContent().trim()}\n`;
    case 'h6':
      return `\n###### ${childContent().trim()}\n`;
    case 'p':
      return `\n${childContent().trim()}\n`;
    case 'br':
      return '\n';
    case 'strong':
    case 'b':
      return `**${childContent().trim()}**`;
    case 'em':
    case 'i':
      return `*${childContent().trim()}*`;
    case 'u':
      return childContent();
    case 'code':
      return `\`${childContent().trim()}\``;
    case 'pre':
      return `\n\`\`\`\n${el.textContent?.trim() || ''}\n\`\`\`\n`;
    case 'a': {
      const href = el.getAttribute('href') || '';
      const text = childContent().trim();
      return href ? `[${text}](${href})` : text;
    }
    case 'ul':
      return '\n' + Array.from(el.children).map((li) => `- ${convertNode(li).trim()}`).join('\n') + '\n';
    case 'ol':
      return '\n' + Array.from(el.children).map((li, i) => `${i + 1}. ${convertNode(li).trim()}`).join('\n') + '\n';
    case 'li':
      return childContent();
    case 'blockquote':
      return '\n' + childContent().trim().split('\n').map((l) => `> ${l}`).join('\n') + '\n';
    case 'hr':
      return '\n---\n';
    case 'img': {
      const alt = el.getAttribute('alt') || '';
      const src = el.getAttribute('src') || '';
      return `![${alt}](${src})`;
    }
    case 'table':
      return convertTable(el);
    default:
      return childContent();
  }
}

function convertTable(el: HTMLElement): string {
  const rows = Array.from(el.querySelectorAll('tr'));
  if (rows.length === 0) return '';

  const result: string[][] = rows.map((row) =>
    Array.from(row.querySelectorAll('td, th')).map((cell) => convertNode(cell).trim())
  );

  if (result.length === 0) return '';

  const colCount = Math.max(...result.map((r) => r.length));
  const header = result[0];
  const separator = Array(colCount).fill('---');
  const body = result.slice(1);

  let md = '\n| ' + header.join(' | ') + ' |\n';
  md += '| ' + separator.join(' | ') + ' |\n';
  for (const row of body) {
    md += '| ' + row.join(' | ') + ' |\n';
  }
  return md;
}
