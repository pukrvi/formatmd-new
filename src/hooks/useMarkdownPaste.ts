import { useCallback } from 'react';
import { htmlToMarkdown } from '@/lib/htmlToMarkdown';

/**
 * Shared paste handler that detects HTML in clipboard and converts to markdown.
 *
 * @param onInsert - callback to handle the converted markdown text insertion.
 *   Receives the converted markdown string, the textarea element, and the
 *   selection start/end positions at the time of paste.
 */
export function useMarkdownPaste(
  onInsert: (md: string, textarea: HTMLTextAreaElement, selStart: number, selEnd: number) => void
) {
  return useCallback(
    (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const html = e.clipboardData.getData('text/html');
      if (!html) return;

      e.preventDefault();
      const md = htmlToMarkdown(html);
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      onInsert(md, ta, start, end);
    },
    [onInsert]
  );
}
