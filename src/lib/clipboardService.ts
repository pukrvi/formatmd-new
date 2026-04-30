export type CopyResult = 'rich' | 'plain';

/**
 * Copy markdown to the clipboard, preferring rich (HTML + plain) so
 * paste targets like Docs / Notion / Slack get styled output.
 * Falls back to plain text if the rich write is rejected by the browser.
 * Rejects if even the plain-text fallback fails.
 */
export async function copyMarkdown(
  markdown: string,
  styledHtml: string
): Promise<CopyResult> {
  try {
    const htmlBlob = new Blob([styledHtml], { type: 'text/html' });
    const textBlob = new Blob([markdown], { type: 'text/plain' });
    const item = new ClipboardItem({
      'text/html': htmlBlob,
      'text/plain': textBlob,
    });
    await navigator.clipboard.write([item]);
    return 'rich';
  } catch {
    await navigator.clipboard.writeText(markdown);
    return 'plain';
  }
}
