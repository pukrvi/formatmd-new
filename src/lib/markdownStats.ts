/** Average adult silent reading speed for English prose. */
const WORDS_PER_MINUTE = 200;

export interface MarkdownStats {
  wordCount: number;
  charCount: number;
  /** Minutes, rounded up, never below 1 (so empty input still renders sensibly). */
  readTime: number;
}

export function calculateStats(markdown: string): MarkdownStats {
  const wordCount = markdown.trim().split(/\s+/).filter(Boolean).length;
  return {
    wordCount,
    charCount: markdown.length,
    readTime: Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE)),
  };
}
