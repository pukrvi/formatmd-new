import { useState, useRef, useEffect, useCallback } from 'react';
import TerminalPreview, { TerminalPreviewRef } from '@/components/TerminalPreview';
import AnimatedLogo from '@/components/AnimatedLogo';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder';
import ScrollArrows from '@/components/ScrollArrows';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeedbackModal from '@/components/FeedbackModal';
import SEOHead from '@/components/SEOHead';
import DocumentationSection from '@/components/DocumentationSection';
import { getTheme, themes, ThemeId } from '@/lib/themes';
import { toast } from 'sonner';
import { useMarkdownPaste } from '@/hooks/useMarkdownPaste';

const Index = () => {
  const [markdown, setMarkdown] = useState('');
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('formatmd-theme');
    return saved === 'infiniti' || saved === 'vaporwave' ? saved : 'infiniti';
  });
  const [isCopied, setIsCopied] = useState(false);
  const [hintThemeIndex, setHintThemeIndex] = useState(0);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [userToggledTheme, setUserToggledTheme] = useState(false);
  const previewRef = useRef<TerminalPreviewRef>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasContent = markdown.trim().length > 0;
  const selectedTheme = getTheme(themeId);
  const hintedTheme = themes[hintThemeIndex] ?? themes[0];
  // Once user explicitly toggles theme, stop following animation hints
  const landingTheme = hasContent || userToggledTheme ? selectedTheme : hintedTheme;

  const handleThemeToggle = useCallback((id: ThemeId) => {
    setUserToggledTheme(true);
    setThemeId(id);
  }, []);

  // Apply active theme class to document; landing mode follows animated placeholder hints.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-clean', 'theme-vaporwave');
    if (landingTheme.className) {
      root.classList.add(landingTheme.className);
    }
  }, [landingTheme.className]);

  useEffect(() => {
    localStorage.setItem('formatmd-theme', themeId);
  }, [themeId]);

  // Track scroll to toggle header transparency
  useEffect(() => {
    if (hasContent) return;
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasContent]);

  const handleCopy = async () => {
    if (!previewRef.current) return;

    const styledHTML = previewRef.current.getStyledHTML();

    try {
      const blob = new Blob([styledHTML], { type: 'text/html' });
      const plainTextBlob = new Blob([markdown], { type: 'text/plain' });

      const clipboardItem = new ClipboardItem({
        'text/html': blob,
        'text/plain': plainTextBlob
      });

      await navigator.clipboard.write([clipboardItem]);

      setIsCopied(true);
      toast.success('Copied! Paste anywhere', {
        duration: 2000,
        style: {
          background: selectedTheme.colors.panel,
          border: `1px solid ${selectedTheme.colors.heading}`,
          color: selectedTheme.colors.text
        }
      });

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      try {
        await navigator.clipboard.writeText(markdown);
        toast.info('Plain text copied', { duration: 2000 });
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch {
        toast.error('Failed to copy');
      }
    }
  };

  const handleReset = () => {
    setMarkdown('');
    setTimeout(() => inputRef.current?.focus(), 300);
  };

  const handleThemeHint = useCallback((index: number) => {
    setHintThemeIndex(index);
  }, []);

  const handlePasteInsert = useCallback(
    (md: string, _ta: HTMLTextAreaElement, start: number, end: number) => {
      setMarkdown((prev) => prev.slice(0, start) + md + prev.slice(end));
    },
    []
  );

  const handlePaste = useMarkdownPaste(handlePasteInsert);

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden relative transition-colors duration-1000"
      style={{ backgroundColor: landingTheme.colors.background }}>

      <SEOHead
        title="FormatMD — Markdown Formatter & Styler"
        description="FormatMD transforms your markdown into beautifully styled, copy-ready output. Paste, format, and export in .md, skill.MD, .html, .txt, or print-to-PDF."
        path="/"
      />

      {/* Ambient Background — paused when editor is active to save GPU */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ animationPlayState: hasContent ? 'paused' : 'running' }}>
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float transition-colors duration-1000"
          style={{ backgroundColor: landingTheme.colors.heading, animationPlayState: hasContent ? 'paused' : 'running' }} />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-15 transition-colors duration-1000"
          style={{ backgroundColor: landingTheme.colors.keyword, animationPlayState: hasContent ? 'paused' : 'running' }} />
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 transition-colors duration-1000"
          style={{ backgroundColor: landingTheme.colors.heading, animationPlayState: hasContent ? 'paused' : 'running' }} />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10 transition-colors duration-1000"
          style={{ backgroundColor: landingTheme.colors.keyword, animationPlayState: hasContent ? 'paused' : 'running' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col flex-1">
        {!hasContent ? (
          <>
            {/* Header — transparent on hero, solid after scroll */}
            <Header
              themeId={landingTheme.id}
              transparent={!scrolledPastHero}
              onThemeChange={handleThemeToggle}
              onFeedbackClick={() => setFeedbackOpen(true)}
            />

            {/* Hero: fills first fold */}
            <section className="min-h-[calc(100svh-53px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative">
              {/* Logo */}
              <div className="flex items-center gap-4 mb-6 animate-fade-in">
                <AnimatedLogo color={landingTheme.colors.heading} size={32} />
                <h1
                  className="text-3xl sm:text-4xl font-bold tracking-tight transition-colors duration-1000"
                  style={{ color: landingTheme.colors.heading }}>
                  FormatMD
                </h1>
              </div>

              {/* Headline */}
              <p
                className="text-lg sm:text-xl font-medium text-center mb-4 max-w-lg animate-fade-in transition-colors duration-1000"
                style={{ color: landingTheme.colors.text, fontFamily: "'Poppins', sans-serif" }}>
                Style your markdown. Copy it anywhere.
              </p>

              {/* Steps */}
              <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in">
                {[
                  { num: '1', label: 'Paste markdown' },
                  { num: '2', label: 'Pick a theme' },
                  { num: '3', label: 'Copy or export' },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono"
                    style={{
                      backgroundColor: landingTheme.colors.panel + '60',
                      color: landingTheme.colors.text + '80',
                      border: `1px solid ${landingTheme.colors.heading}25`,
                    }}>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ backgroundColor: landingTheme.colors.heading + '25', color: landingTheme.colors.heading }}>
                      {step.num}
                    </span>
                    {step.label}
                  </div>
                ))}
              </div>

              {/* Input Box */}
              <div className="w-full max-w-2xl animate-scale-in">
                <div
                  className="rounded-2xl p-1 transition-all duration-1000 hover:shadow-glow relative"
                  style={{
                    backgroundColor: landingTheme.colors.panel + '40',
                    border: `1px solid ${landingTheme.colors.heading}30`,
                    boxShadow: `0 0 60px ${landingTheme.colors.heading}15`
                  }}>
                  {!markdown &&
                  <div className="absolute inset-0 p-5 overflow-hidden rounded-xl">
                      <AnimatedPlaceholder onThemeHint={handleThemeHint} />
                    </div>
                  }
                  <textarea
                    ref={inputRef}
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    onPaste={handlePaste}
                    placeholder=""
                    className="w-full h-40 sm:h-44 md:h-48 bg-transparent resize-none p-5 font-mono text-base leading-relaxed focus:outline-none rounded-xl relative z-10"
                    style={{ color: landingTheme.colors.text }}
                    autoFocus />
                </div>
                <p
                  className="text-center mt-4 text-sm font-mono animate-fade-in delay-300 transition-colors duration-1000"
                  style={{ color: landingTheme.colors.text + '65' }}>
                  created by Puneet Vishnawat @ InfinitiGRID
                </p>
              </div>

              <ScrollArrows color={landingTheme.colors.heading} />
            </section>

            <DocumentationSection theme={landingTheme} />
            <Footer themeId={landingTheme.id} onFeedbackClick={() => setFeedbackOpen(true)} />
          </>
        ) : (
          <div className="h-[100svh] min-h-0">
            <TerminalPreview
              ref={previewRef}
              markdown={markdown}
              theme={selectedTheme}
              onCopy={handleCopy}
              isCopied={isCopied}
              onThemeChange={setThemeId}
              activeThemeId={themeId}
              onReset={handleReset}
              onMarkdownChange={setMarkdown} />
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} themeId={themeId} />
    </div>);

};

export default Index;
