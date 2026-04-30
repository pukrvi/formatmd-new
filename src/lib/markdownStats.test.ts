import { describe, expect, it } from 'vitest';
import { calculateStats } from '@/lib/markdownStats';

describe('calculateStats', () => {
  it('returns zero words and 1-minute floor for empty input', () => {
    expect(calculateStats('')).toEqual({ wordCount: 0, charCount: 0, readTime: 1 });
  });

  it('treats whitespace-only input as zero words', () => {
    expect(calculateStats('   \n\t  ').wordCount).toBe(0);
  });

  it('counts words split on any whitespace', () => {
    const stats = calculateStats('# Hello world\n\nThis  is  markdown.');
    expect(stats.wordCount).toBe(6);
  });

  it('counts characters including whitespace and markdown syntax', () => {
    expect(calculateStats('# hi').charCount).toBe(4);
  });

  it('rounds read time up to the nearest minute', () => {
    const oneAndAHalfMinutes = Array(300).fill('word').join(' ');
    expect(calculateStats(oneAndAHalfMinutes).readTime).toBe(2);
  });

  it('floors read time at 1 minute even for very short input', () => {
    expect(calculateStats('hi').readTime).toBe(1);
  });
});
