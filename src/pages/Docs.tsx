import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTheme, ThemeId } from '@/lib/themes';
import Footer from '@/components/Footer';
import FeedbackModal from '@/components/FeedbackModal';
import AnimatedLogo from '@/components/AnimatedLogo';
import SEOHead from '@/components/SEOHead';
import DocumentationSection from '@/components/DocumentationSection';
import { Bug, ArrowLeft } from 'lucide-react';

const Docs = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
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

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: c.background }}>
      <SEOHead
        title="Documentation — FormatMD"
        description="Complete guide to FormatMD features — editor modes, formatting toolbar, themes, export options, and live stats."
        path="/docs"
      />

      <header
        className="sticky top-0 z-20 px-4 sm:px-6 py-3 border-b backdrop-blur-md"
        style={{ borderColor: c.heading + '18', backgroundColor: c.background + 'e8' }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <ArrowLeft className="w-4 h-4" style={{ color: c.heading }} />
            <AnimatedLogo color={c.heading} size={20} />
            <span className="font-mono text-sm font-bold" style={{ color: c.heading }}>FormatMD</span>
          </Link>

          <button
            onClick={() => setFeedbackOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all hover:scale-105"
            style={{ backgroundColor: c.heading + '15', color: c.heading }}
          >
            <Bug className="w-3 h-3" />
            Feedback
          </button>
        </div>
      </header>

      <DocumentationSection theme={theme} />
      <Footer themeId={themeId} />
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} themeId={themeId} />
    </div>
  );
};

export default Docs;
