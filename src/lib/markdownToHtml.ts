import { Theme } from './themes';

/**
 * Converts raw markdown into styled HTML string using the given theme.
 * This is the core rendering engine for preview, copy, and export.
 */
export function markdownToStyledHtml(markdown: string, theme: Theme): string {
  const { colors } = theme;
  const isUniformTheme = theme.id === 'infiniti';
  const isVaporwave = theme.id === 'vaporwave';
  const highlightBg = colors.highlight || 'transparent';

  const lines = markdown.split('\n');
  let html = '';
  let inCodeBlock = false;
  let inList = false;
  let inTable = false;

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  };

  const sanitizeHref = (rawHref: string) => {
    const href = rawHref.trim();
    const lowerHref = href.toLowerCase();
    if (
      lowerHref.startsWith('http://') ||
      lowerHref.startsWith('https://') ||
      lowerHref.startsWith('mailto:') ||
      lowerHref.startsWith('/') ||
      lowerHref.startsWith('#')
    ) {
      return href;
    }
    return '#';
  };

  const parseTableCells = (tableLine: string) =>
    tableLine
      .trim()
      .slice(1, -1)
      .split('|')
      .map((cell) => cell.trim());

  const closeTableIfOpen = () => {
    if (inTable) {
      html += '</tbody></table>';
      inTable = false;
    }
  };

  const processInlineStyles = (text: string): string => {
    text = text.replace(/\*\*(.+?)\*\*/g, `<strong style="font-weight: 700;">$1</strong>`);
    text = text.replace(/\*(.+?)\*/g, `<em style="font-style: italic;">$1</em>`);
    text = text.replace(/_(.+?)_/g, `<em style="font-style: italic;">$1</em>`);
    text = text.replace(/`(.+?)`/g, `<code style="background-color: ${colors.panel}; padding: 2px 6px; border-radius: 4px; font-family: 'Fira Code', monospace; color: ${colors.keyword};">$1</code>`);
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, (_match, label: string, href: string) => {
      const safeHref = sanitizeHref(href);
      return `<a href="${safeHref}" style="color: ${colors.keyword}; text-decoration: underline;" rel="noopener noreferrer">${label}</a>`;
    });
    return text;
  };

  const highlightStyle = isVaporwave ? `background-color: ${highlightBg}; padding: 4px 8px; border-radius: 4px; display: inline-block;` : '';
  const headingFont = isVaporwave ? "'Poppins', sans-serif" : "'Fira Code', monospace";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    const isTableLine = trimmedLine.startsWith('|') && trimmedLine.endsWith('|');

    if (line.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      if (inCodeBlock) {
        html += `<pre style="background-color: ${colors.panel}; padding: 16px; border-radius: 8px; margin: 12px 0; overflow-x: auto;"><code style="font-family: 'Fira Code', monospace; color: ${colors.keyword};">`;
      } else {
        html += '</code></pre>';
      }
      continue;
    }

    if (inCodeBlock) {
      html += escapeHtml(line) + '\n';
      continue;
    }

    if (inTable && !isTableLine) {
      closeTableIfOpen();
    }

    if (inList && !line.match(/^[-*]\s/) && !line.match(/^\d+\.\s/)) {
      html += '</ul>';
      inList = false;
    }

    if (line.startsWith('# ')) {
      const size = isUniformTheme ? '1.5em' : (isVaporwave ? '1.6em' : '2em');
      const borderBottom = `border-bottom: 2px solid ${colors.heading}40; padding-bottom: 8px;`;
      html += `<h1 style="color: ${colors.heading}; font-size: ${size}; font-weight: 700; margin: 20px 0 12px 0; font-family: ${headingFont}; ${borderBottom} ${highlightStyle}">${processInlineStyles(escapeHtml(line.slice(2)))}</h1>`;
    } else if (line.startsWith('## ')) {
      const size = isUniformTheme ? '1.25em' : (isVaporwave ? '1.3em' : '1.5em');
      html += `<h2 style="color: ${colors.heading}; font-size: ${size}; font-weight: 600; margin: 16px 0 8px 0; font-family: ${headingFont}; opacity: 0.9; ${highlightStyle}">${processInlineStyles(escapeHtml(line.slice(3)))}</h2>`;
    } else if (line.startsWith('### ')) {
      const size = isUniformTheme ? '1.1em' : (isVaporwave ? '1.1em' : '1.25em');
      html += `<h3 style="color: ${colors.heading}; font-size: ${size}; font-weight: 500; margin: 12px 0 6px 0; font-family: ${headingFont}; opacity: 0.75; font-style: italic; ${highlightStyle}">${processInlineStyles(escapeHtml(line.slice(4)))}</h3>`;
    } else if (line.startsWith('#### ')) {
      const size = isUniformTheme ? '1em' : (isVaporwave ? '1em' : '1.1em');
      html += `<h4 style="color: ${colors.heading}; font-size: ${size}; font-weight: 500; margin: 10px 0 4px 0; font-family: ${headingFont}; opacity: 0.65; ${highlightStyle}">${processInlineStyles(escapeHtml(line.slice(5)))}</h4>`;
    }
    else if (line.match(/^[-*]\s/)) {
      if (!inList) {
        html += '<ul style="margin: 8px 0; padding-left: 24px;">';
        inList = true;
      }
      const content = line.replace(/^[-*]\s/, '');
      html += `<li style="color: ${colors.text}; margin: 4px 0; font-family: 'Fira Code', monospace;"><span style="color: ${colors.keyword};">•</span> ${processInlineStyles(escapeHtml(content))}</li>`;
    }
    else if (line.match(/^\d+\.\s/)) {
      const match = line.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        html += `<p style="color: ${colors.text}; margin: 4px 0; font-family: 'Fira Code', monospace;"><span style="color: ${colors.keyword};">${match[1]}.</span> ${processInlineStyles(escapeHtml(match[2]))}</p>`;
      }
    }
    else if (line.startsWith('> ')) {
      html += `<blockquote style="border-left: 3px solid ${colors.keyword}; padding-left: 16px; margin: 12px 0; color: ${colors.text}; opacity: 0.8; font-style: italic;">${processInlineStyles(escapeHtml(line.slice(2)))}</blockquote>`;
    }
    else if (line.match(/^[-*_]{3,}$/)) {
      html += `<hr style="border: none; border-top: 1px solid ${colors.keyword}; margin: 20px 0; opacity: 0.4;" />`;
    }
    else if (isTableLine) {
      const nextLine = lines[i + 1]?.trim() || '';
      const nextIsSeparator = /^\|[\s\-:|]+\|$/.test(nextLine);
      const currentIsSeparator = /^\|[\s\-:|]+\|$/.test(trimmedLine);

      if (!inTable) {
        if (nextIsSeparator) {
          html += `<table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-family: 'Fira Code', monospace; font-size: 0.875em;">`;
          const headerCells = parseTableCells(line);
          html += '<thead><tr>';
          headerCells.forEach((cell) => {
            html += `<th style="border: 1px solid ${colors.keyword}40; padding: 8px 12px; text-align: left; color: ${colors.heading}; font-weight: 600; background-color: ${colors.panel};">${processInlineStyles(escapeHtml(cell))}</th>`;
          });
          html += '</tr></thead><tbody>';
          inTable = true;
          i++;
          continue;
        }

        html += `<table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-family: 'Fira Code', monospace; font-size: 0.875em;"><tbody>`;
        inTable = true;
      }

      if (currentIsSeparator) {
        continue;
      }

      const cells = parseTableCells(line);
      html += '<tr>';
      cells.forEach((cell) => {
        html += `<td style="border: 1px solid ${colors.keyword}20; padding: 8px 12px; color: ${colors.text};">${processInlineStyles(escapeHtml(cell))}</td>`;
      });
      html += '</tr>';

      const upcomingLine = lines[i + 1]?.trim() || '';
      const nextIsTableLine = upcomingLine.startsWith('|') && upcomingLine.endsWith('|');
      if (!nextIsTableLine) {
        closeTableIfOpen();
      }
    }
    else if (line.trim() === '') {
      html += '<br />';
    }
    else {
      html += `<p style="color: ${colors.text}; margin: 8px 0; line-height: 1.7; font-family: 'Fira Code', monospace;">${processInlineStyles(escapeHtml(line))}</p>`;
    }
  }

  if (inList) {
    html += '</ul>';
  }
  closeTableIfOpen();

  return html;
}
