import { describe, expect, it } from 'vitest';
import { htmlToMarkdown, normalizeRichTextDom } from '@/lib/htmlToMarkdown';

describe('htmlToMarkdown', () => {
  it('converts headings', () => {
    expect(htmlToMarkdown('<h1>Title</h1>')).toContain('# Title');
    expect(htmlToMarkdown('<h3>Sub</h3>')).toContain('### Sub');
  });

  it('keeps semantic <strong> and <em>', () => {
    expect(htmlToMarkdown('<p><strong>bold</strong></p>')).toContain('**bold**');
    expect(htmlToMarkdown('<p><em>italic</em></p>')).toContain('*italic*');
  });

  it('renders links with href', () => {
    expect(htmlToMarkdown('<p><a href="https://x.dev">go</a></p>')).toContain(
      '[go](https://x.dev)'
    );
  });

  it('renders unordered and ordered lists', () => {
    expect(htmlToMarkdown('<ul><li>a</li><li>b</li></ul>')).toContain('- a');
    expect(htmlToMarkdown('<ol><li>a</li><li>b</li></ol>')).toContain('1. a');
  });

  it('strips Google Docs <b style="font-weight:normal"> wrapper', () => {
    const html = '<b style="font-weight:normal" id="docs-internal">hello</b>';
    expect(htmlToMarkdown(html).trim()).toBe('hello');
  });

  it('promotes span[style*="font-weight:bold"] to **bold**', () => {
    expect(htmlToMarkdown('<p><span style="font-weight:700">x</span></p>')).toContain(
      '**x**'
    );
    expect(htmlToMarkdown('<p><span style="font-weight:bold">x</span></p>')).toContain(
      '**x**'
    );
  });

  it('promotes span[style*="font-style:italic"] to *italic*', () => {
    expect(htmlToMarkdown('<p><span style="font-style:italic">x</span></p>')).toContain(
      '*x*'
    );
  });

  it('composes bold + italic on the same span as ***x***', () => {
    const out = htmlToMarkdown(
      '<p><span style="font-weight:bold;font-style:italic">x</span></p>'
    );
    expect(out).toContain('***x***');
  });
});

describe('normalizeRichTextDom', () => {
  it('unwraps <b style="font-weight:normal">', () => {
    const div = document.createElement('div');
    div.innerHTML = '<b style="font-weight:normal"><span>x</span></b>';
    normalizeRichTextDom(div);
    expect(div.querySelector('b')).toBeNull();
    expect(div.querySelector('span')?.textContent).toBe('x');
  });

  it('does NOT unwrap <b> with no style', () => {
    const div = document.createElement('div');
    div.innerHTML = '<b>x</b>';
    normalizeRichTextDom(div);
    expect(div.querySelector('b')).not.toBeNull();
  });

  it('does NOT unwrap <b style="font-weight:bold">', () => {
    const div = document.createElement('div');
    div.innerHTML = '<b style="font-weight:bold">x</b>';
    normalizeRichTextDom(div);
    expect(div.querySelector('b')).not.toBeNull();
  });

  it('inserts <strong> inside bold-styled span', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span style="font-weight:bold">x</span>';
    normalizeRichTextDom(div);
    expect(div.querySelector('span > strong')?.textContent).toBe('x');
  });

  it('leaves unstyled containers untouched', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span>plain</span>';
    normalizeRichTextDom(div);
    expect(div.innerHTML).toBe('<span>plain</span>');
  });

  it('treats font-weight:400 as not bold', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span style="font-weight:400">x</span>';
    normalizeRichTextDom(div);
    expect(div.querySelector('strong')).toBeNull();
  });
});
