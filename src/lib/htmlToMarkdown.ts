/**
 * Converts pasted HTML (e.g. from Google Docs) into Markdown.
 */
export function htmlToMarkdown(html: string): string {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  return convertNode(doc.body).trim();
}

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
    case 'b': {
      // Google Docs often wraps everything in <b style="font-weight:normal"> — skip if not actually bold
      const bStyle = el.getAttribute('style') || '';
      const bWeight = bStyle.match(/font-weight:\s*(\d+|normal)/i);
      if (bWeight && (bWeight[1] === 'normal' || (parseInt(bWeight[1]) > 0 && parseInt(bWeight[1]) < 700))) {
        return childContent();
      }
      return `**${childContent().trim()}**`;
    }
    case 'em':
    case 'i':
      return `*${childContent().trim()}*`;
    case 'u':
      return childContent(); // no markdown equivalent, pass through
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
      return '\n' + Array.from(el.children).map(li => `- ${convertNode(li).trim()}`).join('\n') + '\n';
    case 'ol':
      return '\n' + Array.from(el.children).map((li, i) => `${i + 1}. ${convertNode(li).trim()}`).join('\n') + '\n';
    case 'li':
      return childContent();
    case 'blockquote':
      return '\n' + childContent().trim().split('\n').map(l => `> ${l}`).join('\n') + '\n';
    case 'hr':
      return '\n---\n';
    case 'img': {
      const alt = el.getAttribute('alt') || '';
      const src = el.getAttribute('src') || '';
      return `![${alt}](${src})`;
    }
    case 'table':
      return convertTable(el);
    case 'span':
    case 'div':
    case 'section':
    case 'article':
    case 'main':
    case 'header':
    case 'footer':
    case 'nav':
      // Google Docs wraps everything in spans with inline styles
      // Check for bold/italic via style
      return handleStyledSpan(el);
    default:
      return childContent();
  }
}

function handleStyledSpan(el: HTMLElement): string {
  let content = Array.from(el.childNodes).map(convertNode).join('');
  const style = el.getAttribute('style') || '';
  const fontWeight = style.match(/font-weight:\s*(\d+|bold)/i);
  const fontStyle = style.match(/font-style:\s*italic/i);

  if (fontWeight && (fontWeight[1] === 'bold' || parseInt(fontWeight[1]) >= 700)) {
    content = `**${content.trim()}**`;
  }
  if (fontStyle) {
    content = `*${content.trim()}*`;
  }
  return content;
}

function convertTable(el: HTMLElement): string {
  const rows = Array.from(el.querySelectorAll('tr'));
  if (rows.length === 0) return '';

  const result: string[][] = rows.map(row =>
    Array.from(row.querySelectorAll('td, th')).map(cell => convertNode(cell).trim())
  );

  if (result.length === 0) return '';

  const colCount = Math.max(...result.map(r => r.length));
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
