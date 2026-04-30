import { afterEach, describe, expect, it, vi } from 'vitest';
import { copyMarkdown } from '@/lib/clipboardService';

const installClipboard = (overrides: {
  write?: () => Promise<void>;
  writeText?: () => Promise<void>;
  clipboardItem?: typeof ClipboardItem;
}) => {
  const write = overrides.write ?? vi.fn().mockResolvedValue(undefined);
  const writeText = overrides.writeText ?? vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { clipboard: { write, writeText } });
  vi.stubGlobal(
    'ClipboardItem',
    overrides.clipboardItem ??
      (vi.fn().mockImplementation((items) => items) as unknown as typeof ClipboardItem)
  );
  return { write, writeText };
};

describe('copyMarkdown', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('writes rich (html + text) clipboard payload and returns "rich"', async () => {
    const { write, writeText } = installClipboard({});

    const result = await copyMarkdown('# hello', '<h1>hello</h1>');

    expect(result).toBe('rich');
    expect(write).toHaveBeenCalledTimes(1);
    expect(writeText).not.toHaveBeenCalled();
  });

  it('falls back to plain text and returns "plain" when rich write fails', async () => {
    const { write, writeText } = installClipboard({
      write: vi.fn().mockRejectedValue(new Error('not allowed')),
    });

    const result = await copyMarkdown('# hello', '<h1>hello</h1>');

    expect(result).toBe('plain');
    expect(write).toHaveBeenCalledTimes(1);
    expect(writeText).toHaveBeenCalledWith('# hello');
  });

  it('rejects when the plain-text fallback also fails', async () => {
    installClipboard({
      write: vi.fn().mockRejectedValue(new Error('rich denied')),
      writeText: vi.fn().mockRejectedValue(new Error('plain denied')),
    });

    await expect(copyMarkdown('# hello', '<h1>hello</h1>')).rejects.toThrow(
      'plain denied'
    );
  });
});
