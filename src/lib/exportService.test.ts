import { describe, expect, it } from 'vitest';
import { exportFormats, ExportFormatId } from '@/lib/exportService';

const get = (id: ExportFormatId) => {
  const fmt = exportFormats.find((f) => f.id === id);
  if (!fmt) throw new Error(`format ${id} missing`);
  return fmt;
};

describe('exportFormats', () => {
  it('lists all five formats in dropdown order', () => {
    expect(exportFormats.map((f) => f.id)).toEqual([
      'md',
      'skill-md',
      'txt',
      'html',
      'pdf',
    ]);
  });

  it('.md emits markdown unchanged', () => {
    expect(get('md').build('# hello', '<h1>hello</h1>')).toBe('# hello');
  });

  it('skill-md wraps content with --- delimiters', () => {
    expect(get('skill-md').build('# hello', '<h1>hello</h1>')).toBe(
      '---\n# hello\n---\n'
    );
  });

  it('.txt emits markdown unchanged', () => {
    expect(get('txt').build('# hello', '<h1>hello</h1>')).toBe('# hello');
  });

  it('.html wraps styled HTML in a full document', () => {
    const out = get('html').build('# hello', '<h1>hello</h1>');
    expect(out).toContain('<!DOCTYPE html>');
    expect(out).toContain('<meta charset="utf-8">');
    expect(out).toContain('<body><h1>hello</h1></body>');
  });

  it('PDF wraps styled HTML in a printable document with body styling', () => {
    const out = get('pdf').build('# hello', '<h1>hello</h1>');
    expect(out).toContain('<!DOCTYPE html>');
    expect(out).toContain("font-family:'Fira Code',monospace");
    expect(out).toContain('<body><h1>hello</h1></body>');
  });

  it('download formats expose a filename and mime type', () => {
    const md = get('md');
    if (md.kind !== 'download') throw new Error('expected download kind');
    expect(md.filename).toBe('output.md');
    expect(md.mimeType).toBe('text/markdown');
  });

  it('PDF is a print format (no filename)', () => {
    expect(get('pdf').kind).toBe('print');
  });
});
