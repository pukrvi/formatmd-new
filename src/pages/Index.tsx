import { useState, useRef, useEffect, useCallback } from 'react';
import TerminalPreview, { TerminalPreviewRef } from '@/components/TerminalPreview';
import AnimatedLogo from '@/components/AnimatedLogo';
import AnimatedPlaceholder from '@/components/AnimatedPlaceholder';
import ScrollArrows from '@/components/ScrollArrows';
import Footer from '@/components/Footer';
import FeedbackModal from '@/components/FeedbackModal';
import SEOHead from '@/components/SEOHead';
import { getTheme, themes, ThemeId, Theme } from '@/lib/themes';
import { toast } from 'sonner';
import { useMarkdownPaste } from '@/hooks/useMarkdownPaste';

const Index = () => {
  const [markdown, setMarkdown] = useState('');
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('formatmd-theme');
    return saved === 'infiniti' || saved === 'vaporwave' ? saved : 'infiniti';
  });
  const [isCopied, setIsCopied] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [hintThemeIndex, setHintThemeIndex] = useState(0);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const previewRef = useRef<TerminalPreviewRef>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const theme: Theme = getTheme(themeId);
  const hintTheme = themes[hintThemeIndex];

  // Detect when user starts typing/pasting
  useEffect(() => {
    if (markdown.trim().length > 0 && !hasContent) {
      setHasContent(true);
    }
    if (markdown.trim().length === 0 && hasContent) {
      setHasContent(false);
    }
  }, [markdown, hasContent]);

  // Apply theme class to document and persist
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-clean', 'theme-vaporwave');
    if (theme.className) {
      root.classList.add(theme.className);
    }
    localStorage.setItem('formatmd-theme', themeId);
  }, [theme, themeId]);

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
      toast.success('Copied! Paste anywhere ✨', {
        duration: 2000,
        style: {
          background: theme.colors.panel,
          border: `1px solid ${theme.colors.heading}`,
          color: theme.colors.text
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
    setHasContent(false);
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

  // Use hint theme colors for landing page when no content
  const landingTheme = hasContent ? theme : hintTheme;

  return (
    <div
      className="min-h-screen flex flex-col overflow-x-hidden relative transition-colors duration-1000"
      style={{ backgroundColor: hasContent ? theme.colors.background : hintTheme.colors.background }}>

      <SEOHead
        title="FormatMD — Markdown Formatter & Styler"
        description="FormatMD transforms your markdown into beautifully styled, copy-ready output. Paste, format, and export in .md, .pdf, .html, .txt."
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
        
        {/* Landing State */}
        <div
          className={`flex-1 flex flex-col items-center justify-center px-4 transition-all duration-700 ease-out relative ${
          hasContent ?
          'opacity-0 scale-95 h-0 min-h-0 overflow-hidden' :
          'opacity-100 scale-100 min-h-screen'}`
          }>

          {/* Logo */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <AnimatedLogo color={landingTheme.colors.heading} size={32} />
            <h1
              className="text-3xl font-bold tracking-tight transition-colors duration-1000"
              style={{ color: landingTheme.colors.heading }}>
              FormatMD
            </h1>
          </div>

          {/* Step badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 animate-fade-in">
            {['paste your markdown', 'watch it transform', 'copy styled output'].map((step, i) =>
            <div
              key={step}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-500 ${
              hintThemeIndex === i ?
              'scale-105 opacity-100' :
              'scale-100 opacity-50'}`
              }
              style={{
                backgroundColor: landingTheme.colors.panel,
                color: landingTheme.colors.heading,
                border: `1px solid ${landingTheme.colors.heading}${hintThemeIndex === i ? '60' : '20'}`
              }}>
                {step}
              </div>
            )}
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
                className="w-full h-44 bg-transparent resize-none p-5 font-mono text-base leading-relaxed focus:outline-none rounded-xl relative z-10"
                style={{ color: landingTheme.colors.text }}
                autoFocus />
            </div>
            <p
              className="text-center mt-4 text-sm font-mono animate-fade-in delay-300 transition-colors duration-1000"
              style={{ color: landingTheme.colors.text + '50' }}>
              created by Puneet Vishnawat @ InfinitiGRID
            </p>
          </div>

          {/* Floating scroll arrows */}
          <ScrollArrows color={landingTheme.colors.heading} />
        </div>

        {/* Active State */}
        <div
          className={`flex flex-col transition-all duration-700 ease-out ${
          hasContent ?
          'opacity-100 h-screen' :
          'opacity-0 h-0 overflow-hidden'}`
          }>
          <div className="flex-1 min-h-0">
            <TerminalPreview
              ref={previewRef}
              markdown={markdown}
              theme={theme}
              onCopy={handleCopy}
              isCopied={isCopied}
              onThemeChange={setThemeId}
              activeThemeId={themeId}
              onReset={handleReset}
              onMarkdownChange={setMarkdown} />
          </div>
        </div>
      </div>

      {/* Footer - absolutely positioned so it never disrupts flex layout */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 transition-all duration-700 ease-out"
        style={{
          opacity: hasContent ? 0 : 1,
          transform: hasContent ? 'translateY(100%)' : 'translateY(0)',
          pointerEvents: hasContent ? 'none' : 'auto',
        }}
      >
        <Footer themeId={themeId} />
      </div>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} themeId={themeId} />
    </div>);

};

export default Index;