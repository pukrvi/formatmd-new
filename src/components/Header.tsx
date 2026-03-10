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

  return (
    <header
      className="sticky top-0 z-30 px-4 sm:px-6 py-3 border-b backdrop-blur-md transition-all duration-500"
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

        <div className="flex items-center gap-3">
          {!isHome && (
            <Link
              to="/"
              className="text-xs font-mono transition-colors duration-200 hover:underline"
              style={{ color: c.text + '60' }}
            >
              Home
            </Link>
          )}
          <Link
            to="/docs"
            className="text-xs font-mono transition-colors duration-200 hover:underline"
            style={{ color: location.pathname === '/docs' ? c.heading : c.text + '60' }}
          >
            Documentation
          </Link>
          {onThemeChange && (
            <button
              onClick={() => onThemeChange(themeId === 'infiniti' ? 'vaporwave' : 'infiniti')}
              className="p-1.5 rounded-md text-sm transition-all hover:scale-110"
              style={{ color: c.heading }}
              title="Toggle theme"
            >
              {theme.icon}
            </button>
          )}
          {onFeedbackClick && (
            <button
              onClick={onFeedbackClick}
              className="px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
              style={{ backgroundColor: c.heading + '15', color: c.heading }}
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
