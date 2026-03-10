export type ThemeId = 'infiniti' | 'vaporwave';

export interface Theme {
  id: ThemeId;
  name: string;
  className: string;
  colors: {
    background: string;
    heading: string;
    keyword: string;
    text: string;
    panel: string;
    highlight?: string;
  };
  icon: string;
}

export const themes: Theme[] = [
  {
    id: 'infiniti',
    name: 'Dark',
    className: 'theme-clean',
    colors: {
      background: '#050a14',
      heading: '#4CC77C',
      keyword: '#7DDBA3',
      text: '#ffffff',
      panel: '#1F2733',
    },
    icon: '🌙',
  },
  {
    id: 'vaporwave',
    name: 'Light',
    className: 'theme-vaporwave',
    colors: {
      background: '#FDF6E3',
      heading: '#5C4033',
      keyword: '#B5651D',
      text: '#3E2723',
      panel: '#F5E6D3',
      highlight: '#FFE0B2',
    },
    icon: '☀️',
  },
];

export const getTheme = (id: ThemeId): Theme => {
  return themes.find((t) => t.id === id) || themes[0];
};
