import { Link } from 'react-router-dom';
import { getTheme, ThemeId } from '@/lib/themes';

interface FooterProps {
  themeId?: ThemeId;
  onFeedbackClick?: () => void;
}

const Footer = ({ themeId = 'infiniti', onFeedbackClick }: FooterProps) => {
  const theme = getTheme(themeId);
  const isLightTheme = theme.id === 'vaporwave';

  return (
    <footer
      className="w-full py-8 px-6 border-t transition-colors duration-500"
      style={{
        backgroundColor: isLightTheme ? theme.colors.panel + 'f0' : theme.colors.panel + 'cc',
        borderColor: `${theme.colors.heading}20`,
        backdropFilter: 'blur(6px)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold" style={{ color: theme.colors.heading }}>
            FormatMD
          </span>
          <a
            href="https://infinitigrid.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono transition-colors duration-200 hover:underline"
            style={{ color: theme.colors.text + '70' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.heading)}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.text + '70')}
          >
            — by Puneet Vishnawat @ InfinitiGRID
          </a>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="text-xs font-mono transition-colors duration-200 hover:underline"
            style={{ color: theme.colors.text + '78' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.heading)}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.text + '78')}
          >
            Home
          </Link>
          <Link
            to="/docs"
            className="text-xs font-mono transition-colors duration-200 hover:underline"
            style={{ color: theme.colors.text + '78' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.heading)}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.text + '78')}
          >
            Docs
          </Link>
          <button
            type="button"
            onClick={onFeedbackClick}
            className="px-2.5 py-1 rounded-md text-xs font-mono transition-colors duration-200 border"
            style={{
              color: theme.colors.text + '82',
              borderColor: `${theme.colors.heading}30`,
              backgroundColor: `${theme.colors.heading}12`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = theme.colors.heading;
              e.currentTarget.style.borderColor = `${theme.colors.heading}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = theme.colors.text + '82';
              e.currentTarget.style.borderColor = `${theme.colors.heading}30`;
            }}
          >
            Feedback
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
