import { useState, useEffect } from 'react';
import { getTheme, Theme, ThemeId } from '@/lib/themes';

interface UseThemeReturn {
  themeId: ThemeId;
  theme: Theme;
  setThemeId: (id: ThemeId) => void;
}

export function useTheme(): UseThemeReturn {
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('formatmd-theme');
    return saved === 'infiniti' || saved === 'vaporwave' ? saved : 'infiniti';
  });

  useEffect(() => {
    localStorage.setItem('formatmd-theme', themeId);
  }, [themeId]);

  return { themeId, theme: getTheme(themeId), setThemeId };
}
