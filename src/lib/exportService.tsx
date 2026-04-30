import { ReactNode } from 'react';
import { FileText, FileCode, FileDown } from 'lucide-react';

export type ExportFormatId = 'md' | 'skill-md' | 'txt' | 'html' | 'pdf';

interface BaseFormat {
  id: ExportFormatId;
  label: string;
  icon: ReactNode;
  /** Pure: produces the content the format will deliver. */
  build: (markdown: string, styledHtml: string) => string;
}

interface DownloadFormat extends BaseFormat {
  kind: 'download';
  filename: string;
  mimeType: string;
}

interface PrintFormat extends BaseFormat {
  kind: 'print';
}

export type ExportFormat = DownloadFormat | PrintFormat;

const ICON_CLASS = 'w-3 h-3';

const wrapHtmlDocument = (body: string, headExtra = '') =>
  `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Markdown Export</title>${headExtra}</head><body>${body}</body></html>`;

const PDF_PRINT_STYLE = `<style>body{margin:40px;font-family:'Fira Code',monospace;}</style>`;

export const exportFormats: ExportFormat[] = [
  {
    id: 'md',
    kind: 'download',
    label: '.md',
    icon: <FileText className={ICON_CLASS} />,
    filename: 'output.md',
    mimeType: 'text/markdown',
    build: (markdown) => markdown,
  },
  {
    id: 'skill-md',
    kind: 'download',
    label: 'skill.MD',
    icon: <FileText className={ICON_CLASS} />,
    filename: 'skill.md',
    mimeType: 'text/markdown',
    build: (markdown) => `---\n${markdown}\n---\n`,
  },
  {
    id: 'txt',
    kind: 'download',
    label: '.txt',
    icon: <FileText className={ICON_CLASS} />,
    filename: 'output.txt',
    mimeType: 'text/plain',
    build: (markdown) => markdown,
  },
  {
    id: 'html',
    kind: 'download',
    label: '.html',
    icon: <FileCode className={ICON_CLASS} />,
    filename: 'output.html',
    mimeType: 'text/html',
    build: (_markdown, styledHtml) => wrapHtmlDocument(styledHtml),
  },
  {
    id: 'pdf',
    kind: 'print',
    label: 'PDF',
    icon: <FileDown className={ICON_CLASS} />,
    build: (_markdown, styledHtml) =>
      wrapHtmlDocument(styledHtml, PDF_PRINT_STYLE),
  },
];

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function printHtml(html: string) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.print();
}

export function exportAs(
  formatId: ExportFormatId,
  markdown: string,
  styledHtml: string
): void {
  const format = exportFormats.find((f) => f.id === formatId);
  if (!format) return;
  const content = format.build(markdown, styledHtml);
  if (format.kind === 'download') {
    downloadBlob(new Blob([content], { type: format.mimeType }), format.filename);
  } else {
    printHtml(content);
  }
}
