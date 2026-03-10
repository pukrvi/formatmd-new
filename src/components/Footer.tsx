import { Link } from 'react-router-dom';
import { getTheme, ThemeId } from '@/lib/themes';

interface FooterProps {
  themeId?: ThemeId;
}

const Footer = ({ themeId = 'infiniti' }: FooterProps) => {
  const theme = getTheme(themeId);

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Documentation', to: '/docs' },
    { label: 'Features', to: '/docs#features' },
  ];

  // Handle hash navigation for links with anchors
  const handleClick = (to: string) => {
    if (to.includes('#')) {
      const hash = to.split('#')[1];
      // If we're already on the target page, scroll to the section
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer
      className="w-full py-8 px-6 border-t transition-colors duration-500"
      style={{
        backgroundColor: theme.colors.panel + '60',
        borderColor: `${theme.colors.heading}15`,
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold" style={{ color: theme.colors.heading }}>
            FormatMD
          </span>
          <span className="text-xs font-mono" style={{ color: theme.colors.text + '40' }}>
            — by Puneet Vishnawat @ InfinitiGRID
          </span>
        </div>

        <nav className="flex items-center gap-4">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => handleClick(link.to)}
              className="text-xs font-mono transition-colors duration-200 hover:underline"
              style={{ color: theme.colors.text + '70' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.heading)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.text + '70')}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
