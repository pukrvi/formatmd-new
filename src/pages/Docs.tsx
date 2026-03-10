import { useEffect, useState, useMemo } from 'react';
import { getTheme, ThemeId } from '@/lib/themes';
import { wikiPages } from '@/lib/wikiContent';
import { markdownToStyledHtml } from '@/lib/markdownToHtml';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeedbackModal from '@/components/FeedbackModal';
import SEOHead from '@/components/SEOHead';
import { Menu, X } from 'lucide-react';

const Docs = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [activePageId, setActivePageId] = useState(wikiPages[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('formatmd-theme');
    return saved === 'infiniti' || saved === 'vaporwave' ? saved : 'infiniti';
  });

  const theme = getTheme(themeId);
  const c = theme.colors;

  const activePage = wikiPages.find((p) => p.id === activePageId) || wikiPages[0];

  const renderedHtml = useMemo(
    () => markdownToStyledHtml(activePage.content, theme),
    [activePage.content, theme]
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-clean', 'theme-vaporwave');
    if (theme.className) {
      root.classList.add(theme.className);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('formatmd-theme', themeId);
  }, [themeId]);

  const handlePageChange = (pageId: string) => {
    setActivePageId(pageId);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentIndex = wikiPages.findIndex((p) => p.id === activePageId);
  const prevPage = currentIndex > 0 ? wikiPages[currentIndex - 1] : null;
  const nextPage = currentIndex < wikiPages.length - 1 ? wikiPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: c.background }}>
      <SEOHead
        title={`${activePage.title} — FormatMD Documentation`}
        description="Complete guide to FormatMD features — editor modes, formatting toolbar, themes, export options, and live stats."
        path="/docs"
      />

      {/* Shared Header */}
      <div className="flex items-center">
        <div className="flex-1">
          <Header
            themeId={themeId}
            onThemeChange={setThemeId}
            onFeedbackClick={() => setFeedbackOpen(true)}
          />
        </div>
        {/* Mobile sidebar toggle — overlaid beside header */}
        <button
          className="lg:hidden absolute left-4 z-40 p-1.5 rounded-md transition-colors"
          style={{ color: c.heading }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex-1 flex max-w-6xl mx-auto w-full">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 lg:hidden"
            style={{ backgroundColor: c.background + 'cc' }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[53px] z-20 lg:z-10
            h-[calc(100vh-53px)] w-64 shrink-0
            overflow-y-auto border-r
            transition-transform duration-200 lg:translate-x-0
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          style={{
            backgroundColor: c.background,
            borderColor: c.heading + '12',
          }}
        >
          <nav className="py-4 px-3">
            <p
              className="text-[10px] font-mono uppercase tracking-widest mb-3 px-3"
              style={{ color: c.text + '40' }}
            >
              Documentation
            </p>
            {wikiPages.map((page) => (
              <button
                key={page.id}
                onClick={() => handlePageChange(page.id)}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono transition-all duration-150 flex items-center gap-2.5 mb-0.5"
                style={{
                  backgroundColor: page.id === activePageId ? c.heading + '18' : 'transparent',
                  color: page.id === activePageId ? c.heading : c.text + '70',
                  borderLeft: page.id === activePageId ? `2px solid ${c.heading}` : '2px solid transparent',
                }}
              >
                <span className="text-xs w-5 text-center opacity-60">{page.icon}</span>
                {page.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-12">
          <article
            className="max-w-3xl"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />

          {/* Prev / Next navigation */}
          <div
            className="max-w-3xl mt-12 pt-6 flex justify-between gap-4 border-t"
            style={{ borderColor: c.heading + '18' }}
          >
            {prevPage ? (
              <button
                onClick={() => handlePageChange(prevPage.id)}
                className="text-left px-4 py-3 rounded-xl transition-all hover:scale-[1.02] flex-1 max-w-xs"
                style={{
                  backgroundColor: c.panel + '40',
                  border: `1px solid ${c.heading}20`,
                }}
              >
                <span className="text-[10px] font-mono uppercase block mb-1" style={{ color: c.text + '40' }}>
                  Previous
                </span>
                <span className="text-sm font-mono font-medium" style={{ color: c.heading }}>
                  ← {prevPage.title}
                </span>
              </button>
            ) : <div />}
            {nextPage ? (
              <button
                onClick={() => handlePageChange(nextPage.id)}
                className="text-right px-4 py-3 rounded-xl transition-all hover:scale-[1.02] flex-1 max-w-xs ml-auto"
                style={{
                  backgroundColor: c.panel + '40',
                  border: `1px solid ${c.heading}20`,
                }}
              >
                <span className="text-[10px] font-mono uppercase block mb-1" style={{ color: c.text + '40' }}>
                  Next
                </span>
                <span className="text-sm font-mono font-medium" style={{ color: c.heading }}>
                  {nextPage.title} →
                </span>
              </button>
            ) : <div />}
          </div>
        </main>
      </div>

      <Footer themeId={themeId} onFeedbackClick={() => setFeedbackOpen(true)} />
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} themeId={themeId} />
    </div>
  );
};

export default Docs;
