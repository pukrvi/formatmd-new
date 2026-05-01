import { useState, useRef, useEffect, useCallback } from 'react';
import TerminalPreview, { TerminalPreviewRef } from '@/components/TerminalPreview';
import AnimatedPlaceholder, { AnimatedPlaceholderRef } from '@/components/AnimatedPlaceholder';
import ScrollArrows from '@/components/ScrollArrows';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeedbackModal from '@/components/FeedbackModal';
import SEOHead from '@/components/SEOHead';
import DocumentationSection from '@/components/DocumentationSection';
import { themes, ThemeId } from '@/lib/themes';
import { useTheme } from '@/hooks/useTheme';
import { copyMarkdown } from '@/lib/clipboardService';
import { toast } from 'sonner';
import { useMarkdownPaste } from '@/hooks/useMarkdownPaste';
import { Copy, Paintbrush, FileDown } from 'lucide-react';

const Index = () => {
  const [markdown, setMarkdown] = useState('');
  const { themeId, theme: selectedTheme, setThemeId } = useTheme();
  const [isCopied, setIsCopied] = useState(false);
  const [hintThemeIndex, setHintThemeIndex] = useState(0);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [animationStopped, setAnimationStopped] = useState(false);
  const previewRef = useRef<TerminalPreviewRef>(null);
  const placeholderRef = useRef<AnimatedPlaceholderRef>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasContent = markdown.trim().length > 0;
  const hintedTheme = themes[hintThemeIndex] ?? themes[0];
  // Use selected theme once user interacts or has content
  const landingTheme = hasContent || animationStopped ? selectedTheme : hintedTheme;

  // Stop animation and lock to user's selected theme
  const stopAnimation = useCallback(() => {
    if (!animationStopped) {
      setAnimationStopped(true);
      placeholderRef.current?.stop();
    }
  }, [animationStopped]);

  const handleThemeToggle = useCallback((id: ThemeId) => {
    stopAnimation();
    setThemeId(id);
  }, [stopAnimation, setThemeId]);

  // Apply active theme class to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-clean', 'theme-vaporwave');
    if (landingTheme.className) {
      root.classList.add(landingTheme.className);
    }
  }, [landingTheme.className]);

  // Stop animation on scroll past hero OR first click anywhere on the page
  useEffect(() => {
    if (hasContent || animationStopped) return;

    const handleScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.6;
      setScrolledPastHero(pastHero);
      if (pastHero) stopAnimation();
    };

    const handleClick = () => stopAnimation();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick, { once: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, [hasContent, animationStopped, stopAnimation]);

  const handleCopy = async () => {
    if (!previewRef.current) return;

    const styledHTML = previewRef.current.getStyledHTML();

    try {
      const result = await copyMarkdown(markdown, styledHTML);
      if (result === 'rich') {
        toast.success('Copied! Paste anywhere', {
          duration: 2000,
          style: {
            background: selectedTheme.colors.panel,
            border: `1px solid ${selectedTheme.colors.heading}`,
            color: selectedTheme.colors.text
          }
        });
      } else {
        toast.info('Plain text copied', { duration: 2000 });
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
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

  const c = landingTheme.colors;

  const valueCards = [
    {
      icon: <Paintbrush className="w-4 h-4" style={{ color: c.heading }} />,
      label: 'Themed styling',
      desc: 'Dark & light modes',
    },
    {
      icon: <Copy className="w-4 h-4" style={{ color: c.heading }} />,
      label: 'Rich copy',
      desc: 'Paste into Docs, Notion, Slack',
    },
    {
      icon: <FileDown className="w-4 h-4" style={{ color: c.heading }} />,
      label: 'Export anywhere',
      desc: '.md, .html, .txt, PDF',
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col relative transition-colors duration-1000"
      style={{ backgroundColor: c.background }}>

      <SEOHead
        title="FormatMD — Markdown Formatter & Styler"
        description="FormatMD transforms your markdown into beautifully styled, copy-ready output. Paste, format, and export in .md, skill.MD, .html, .txt, or print-to-PDF."
        path="/"
      />

      {/* Ambient Background — paused when editor is active */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ animationPlayState: hasContent ? 'paused' : 'running' }}>
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 animate-float transition-colors duration-1000"
          style={{ backgroundColor: c.heading, animationPlayState: hasContent ? 'paused' : 'running' }} />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-15 transition-colors duration-1000"
          style={{ backgroundColor: c.keyword, animationPlayState: hasContent ? 'paused' : 'running' }} />
        <div
          className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 transition-colors duration-1000"
          style={{ backgroundColor: c.heading, animationPlayState: hasContent ? 'paused' : 'running' }} />
        <div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full blur-3xl opacity-10 transition-colors duration-1000"
          style={{ backgroundColor: c.keyword, animationPlayState: hasContent ? 'paused' : 'running' }} />
      </div>

      {/* Header — sticky, lives outside the overflow context so position:sticky resolves */}
      {!hasContent && (
        <Header
          themeId={landingTheme.id}
          transparent={!scrolledPastHero}
          onThemeChange={handleThemeToggle}
          onFeedbackClick={() => setFeedbackOpen(true)}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col flex-1 overflow-x-hidden">
        {!hasContent ? (
          <>
            {/* Hero */}
            <section className="min-h-[calc(100svh-53px)] flex flex-col items-center justify-center px-4 sm:px-6 py-12 relative">
              {/* Headline */}
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-center mb-3 transition-colors duration-1000"
                style={{ color: c.heading, fontFamily: "'Poppins', sans-serif" }}>
                Format markdown. Copy it styled.
              </h1>
              <p
                className="text-sm font-mono text-center mb-8 max-w-md transition-colors duration-1000"
                style={{ color: c.text + '50' }}>
                Paste, preview, and export — no sign-up needed
              </p>

              {/* Input Box */}
              <div className="w-full max-w-2xl mb-6">
                <div
                  className="rounded-2xl p-1 transition-all duration-1000 relative"
                  style={{
                    backgroundColor: c.panel + '40',
                    border: `1px solid ${c.heading}30`,
                    boxShadow: `0 0 40px ${c.heading}10`
                  }}>
                  {!markdown && !animationStopped &&
                    <div className="absolute inset-0 p-5 overflow-hidden rounded-xl">
                      <AnimatedPlaceholder ref={placeholderRef} onThemeHint={handleThemeHint} />
                    </div>
                  }
                  <textarea
                    ref={inputRef}
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    onPaste={handlePaste}
                    onFocus={stopAnimation}
                    placeholder={animationStopped && !markdown ? 'Paste or type your markdown here...' : ''}
                    className="w-full h-36 sm:h-40 bg-transparent resize-none p-5 font-mono text-sm leading-relaxed focus:outline-none rounded-xl relative z-10"
                    style={{ color: c.text }}
                    autoFocus />
                </div>
              </div>

              {/* Value cards */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {valueCards.map((card) => (
                  <div
                    key={card.label}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-mono transition-colors duration-1000"
                    style={{
                      backgroundColor: c.panel + '50',
                      border: `1px solid ${c.heading}15`,
                    }}>
                    {card.icon}
                    <div>
                      <div style={{ color: c.text + '90' }}>{card.label}</div>
                      <div style={{ color: c.text + '45' }}>{card.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p
                className="text-xs font-mono text-center transition-colors duration-1000"
                style={{ color: c.text + '30' }}>
                by Puneet Vishnawat @ InfinitiGRID
              </p>

              <ScrollArrows color={c.heading} />
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
