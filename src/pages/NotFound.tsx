import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTheme, ThemeId } from "@/lib/themes";
import AnimatedLogo from "@/components/AnimatedLogo";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();
  const [themeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('formatmd-theme');
    return saved === 'infiniti' || saved === 'vaporwave' ? saved : 'infiniti';
  });

  const theme = getTheme(themeId);
  const c = theme.colors;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-clean', 'theme-vaporwave');
    if (theme.className) {
      root.classList.add(theme.className);
    }
  }, [theme]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-4"
      style={{ backgroundColor: c.background }}
    >
      <SEOHead title="Page Not Found — FormatMD" description="The page you're looking for doesn't exist." path={location.pathname} />

      <AnimatedLogo color={c.heading} size={48} />

      <h1
        className="mt-6 text-6xl font-bold font-mono"
        style={{ color: c.heading }}
      >
        404
      </h1>

      <p
        className="mt-3 text-lg font-mono"
        style={{ color: c.text + '70' }}
      >
        Page not found
      </p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 rounded-lg text-sm font-mono font-medium transition-all hover:scale-105"
        style={{
          backgroundColor: c.heading + '20',
          color: c.heading,
          border: `1px solid ${c.heading}30`,
        }}
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
