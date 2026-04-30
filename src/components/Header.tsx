import { Link, useLocation } from 'react-router-dom';
import { getTheme, ThemeId } from '@/lib/themes';
import AnimatedLogo from '@/components/AnimatedLogo';

interface HeaderProps {
  themeId: ThemeId;
  transparent?: boolean;
  onThemeChange?: (id: ThemeId) => void;
  onFeedbackClick?: () => void;
}

const Header = ({ themeId, transparent = false, onThemeChange, onFeedbackClick }: HeaderProps) => {
  const theme = getTheme(themeId);
  const c = theme.colors;
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isDark = themeId === 'infiniti';

  const btnStyle = {
    color: c.heading,
    backgroundColor: c.heading + '15',
  };

  return (
    <header
      className="sticky top-0 z-30 px-4 sm:px-6 py-3 border-b transition-all duration-500"
      style={{
        borderColor: transparent ? 'transparent' : c.heading + '18',
        backgroundColor: transparent ? 'transparent' : c.background + 'e8',
        backdropFilter: transparent ? 'none' : 'blur(12px)',
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <AnimatedLogo color={c.heading} size={20} />
          <span className="font-mono text-sm font-bold" style={{ color: c.heading }}>FormatMD</span>
        </Link>

        <div className="flex items-center gap-2">
          {!isHome && (
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
              style={btnStyle}
            >
              Home
            </Link>
          )}
          <Link
            to="/docs"
            className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
            style={btnStyle}
          >
            Documentation
          </Link>
          {onThemeChange && (
            <button
              onClick={() => onThemeChange(isDark ? 'vaporwave' : 'infiniti')}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105 flex items-center gap-1.5"
              style={btnStyle}
              title="Toggle theme"
            >
              <span className="text-sm leading-none">{isDark ? '☀️' : '🌙'}</span>
              <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
            </button>
          )}
          {onFeedbackClick && (
            <button
              onClick={onFeedbackClick}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
              style={btnStyle}
            >
              Feedback
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
