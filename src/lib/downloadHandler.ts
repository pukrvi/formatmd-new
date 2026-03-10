/**
 * Downloads content as a file via a temporary anchor element.
 */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Handles exporting markdown content in various formats.
 */
export function downloadMarkdown(
  markdown: string,
  format: 'md' | 'txt' | 'html' | 'pdf',
  styledHtml: string
) {
  if (format === 'md') {
    const yamlWrapped = `---\n${markdown}\n---\n`;
    downloadBlob(new Blob([yamlWrapped], { type: 'text/markdown' }), 'output.md');
  } else if (format === 'txt') {
    downloadBlob(new Blob([markdown], { type: 'text/plain' }), 'output.txt');
  } else if (format === 'html') {
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Markdown Export</title></head><body>${styledHtml}</body></html>`;
    downloadBlob(new Blob([fullHtml], { type: 'text/html' }), 'output.html');
  } else if (format === 'pdf') {
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Markdown Export</title><style>body{margin:40px;font-family:'Fira Code',monospace;}</style></head><body>${styledHtml}</body></html>`;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(fullHtml);
      printWindow.document.close();
      printWindow.print();
    }
  }
}
