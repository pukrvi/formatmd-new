import { describe, expect, it } from 'vitest';
import { getTheme, themes } from '@/lib/themes';

describe('themes', () => {
  it('exposes supported theme ids', () => {
    expect(themes.map((theme) => theme.id)).toEqual(['infiniti', 'vaporwave']);
  });

  it('returns configured theme by id', () => {
    expect(getTheme('infiniti').id).toBe('infiniti');
    expect(getTheme('vaporwave').id).toBe('vaporwave');
  });

  it('falls back to default theme when id is invalid', () => {
    const invalidTheme = getTheme('invalid' as never);
    expect(invalidTheme.id).toBe('infiniti');
  });
});
