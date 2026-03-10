import { Theme, ThemeId } from '@/lib/themes';
import { useRef, forwardRef, useImperativeHandle, useState, useCallback, useId, useMemo } from 'react';
import { Copy, Check, ChevronDown, Download, Eye, Pencil, Columns2, Clock, Type, Hash, FileText, FileCode, FileDown, Sun, Moon } from 'lucide-react';
import { useMarkdownPaste } from '@/hooks/useMarkdownPaste';
import { markdownToStyledHtml } from '@/lib/markdownToHtml';
import { downloadMarkdown } from '@/lib/downloadHandler';
import MarkdownToolbar from './MarkdownToolbar';

type ViewMode = 'editor' | 'split' | 'preview';

interface TerminalPreviewProps {
  markdown: string;
  theme: Theme;
  onCopy?: () => void;
  isCopied?: boolean;
  onThemeChange?: (themeId: ThemeId) => void;
  activeThemeId?: ThemeId;
  onReset?: () => void;
  onMarkdownChange?: (value: string) => void;
}

export interface TerminalPreviewRef {
  getStyledHTML: () => string;
}

const TerminalPreview = forwardRef<TerminalPreviewRef, TerminalPreviewProps>(
  ({ markdown, theme, onCopy, isCopied, onThemeChange, activeThemeId, onReset, onMarkdownChange }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLTextAreaElement>(null);

    const [isDownloadOpen, setIsDownloadOpen] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('editor');
    const editorId = useId().replace(/:/g, '');
    const editorClass = `editor-${editorId}`;

    const isVaporwave = theme.id === 'vaporwave';

    const handlePasteInsert = useCallback(
      (md: string, ta: HTMLTextAreaElement, selStart: number, selEnd: number) => {
        if (!onMarkdownChange) return;

        const nextMarkdown = `${markdown.slice(0, selStart)}${md}${markdown.slice(selEnd)}`;
        onMarkdownChange(nextMarkdown);

        requestAnimationFrame(() => {
          ta.focus();
          const cursor = selStart + md.length;
          ta.setSelectionRange(cursor, cursor);
        });
      },
      [markdown, onMarkdownChange]
    );

    const handleEditorPaste = useMarkdownPaste(handlePasteInsert);

    const caretColor = isVaporwave ? '#D84315' : theme.colors.heading;
    const selectionBg = isVaporwave ? '#FFE0B280' : `${theme.colors.heading}40`;
    const selectionColor = theme.colors.text;

    // Stats
    const wordCount = useMemo(() => {
      const words = markdown.trim().split(/\s+/).filter(Boolean);
      return words.length;
    }, [markdown]);
    const charCount = markdown.length;
    const readTime = useMemo(() => Math.max(1, Math.ceil(wordCount / 200)), [wordCount]);

    // Memoized HTML render — only recalculates when markdown or theme changes
    const styledHtml = useMemo(() => markdownToStyledHtml(markdown, theme), [markdown, theme]);

    useImperativeHandle(ref, () => ({
      getStyledHTML: () => styledHtml,
    }));

    const handleDownload = (format: 'md' | 'skill-md' | 'txt' | 'html' | 'pdf') => {
      setIsDownloadOpen(false);
      downloadMarkdown(markdown, format, styledHtml);
    };

    const showEditor = viewMode === 'editor' || viewMode === 'split';
    const showPreview = viewMode === 'preview' || viewMode === 'split';

    const viewModes: { mode: ViewMode; icon: React.ReactNode; label: string }[] = [
      { mode: 'editor', icon: <Pencil className="w-3 h-3" />, label: 'Editor' },
      { mode: 'split', icon: <Columns2 className="w-3 h-3" />, label: 'Split' },
      { mode: 'preview', icon: <Eye className="w-3 h-3" />, label: 'Preview' },
    ];

    return (
      <>
      <style>{`
        .${editorClass}::selection {
          background-color: ${selectionBg};
          color: ${selectionColor};
        }
        .${editorClass}::-moz-selection {
          background-color: ${selectionBg};
          color: ${selectionColor};
        }
      `}</style>
      <div
        className="h-full flex flex-col theme-transition"
        style={{ backgroundColor: theme.colors.background }}
      >
        {/* Terminal Header */}
        <div
          className="flex items-center gap-2 px-4 py-3 border-b shrink-0"
          style={{ borderColor: `${theme.colors.heading}20`, backgroundColor: theme.colors.panel + '40' }}
        >
          {/* Left: traffic lights + title */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onReset}
              className="w-2.5 h-2.5 rounded-full bg-red-500/80 hover:bg-red-400 transition-all cursor-pointer hover:scale-125"
              title="Close"
            />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 hover:bg-yellow-400 transition-all cursor-pointer hover:scale-125" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80 hover:bg-green-400 transition-all cursor-pointer hover:scale-125" />
          </div>
          <span className="ml-2 font-mono text-xs font-semibold" style={{ color: theme.colors.heading }}>FormatMD</span>

          {/* Center: View Mode Toggle */}
          <div className="flex-1 flex justify-center">
            <div
              className="flex items-center rounded-lg overflow-hidden"
              style={{ border: `1px solid ${theme.colors.heading}30`, backgroundColor: theme.colors.panel + '60' }}
            >
              {viewModes.map((v) => (
                <button
                  key={v.mode}
                  onClick={() => setViewMode(v.mode)}
                  className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: viewMode === v.mode ? `${theme.colors.heading}25` : 'transparent',
                    color: viewMode === v.mode ? theme.colors.heading : theme.colors.text + '70',
                    borderRight: v.mode !== 'preview' ? `1px solid ${theme.colors.heading}20` : 'none',
                  }}
                >
                  {v.icon}
                  <span className="hidden sm:inline">{v.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex items-center gap-3 text-[10px] font-mono" style={{ color: theme.colors.text + '60' }}>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} Min Read
            </span>
            <span className="flex items-center gap-1">
              <Type className="w-3 h-3" />
              {wordCount} Words
            </span>
            <span className="flex items-center gap-1 hidden sm:flex">
              <Hash className="w-3 h-3" />
              {charCount.toLocaleString()} Chars
            </span>
          </div>
        </div>

        {/* Toolbar row: formatting tools on left, action buttons on right */}
        {onMarkdownChange && (
          <div className="flex items-center shrink-0 border-b h-10 relative z-10" style={{ borderColor: `${theme.colors.heading}15`, overflow: 'visible' }}>
            <div className="flex-1 min-w-0" style={{ overflow: 'visible' }}>
              {showEditor && (
                <MarkdownToolbar
                  theme={theme}
                  textareaRef={editorRef}
                  onMarkdownChange={onMarkdownChange}
                  markdown={markdown}
                />
              )}
            </div>

            {/* Action buttons on right */}
            <div className="flex items-center gap-1.5 px-2 shrink-0 h-full">
              {/* Theme Toggle Switch */}
              {onThemeChange && (
                <button
                  onClick={() => onThemeChange(activeThemeId === 'infiniti' ? 'vaporwave' : 'infiniti')}
                  className="relative w-10 h-6 rounded-full transition-all duration-300 flex items-center shrink-0"
                  style={{
                    backgroundColor: activeThemeId === 'infiniti' ? `${theme.colors.heading}25` : `${theme.colors.heading}20`,
                    border: `1px solid ${theme.colors.heading}30`,
                  }}
                  title={`Switch to ${activeThemeId === 'infiniti' ? 'Light' : 'Dark'} mode`}
                >
                  <div
                    className="absolute w-3.5 h-3.5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
                    style={{
                      left: activeThemeId === 'infiniti' ? '2px' : '22px',
                      backgroundColor: theme.colors.heading,
                    }}
                  >
                    {activeThemeId === 'infiniti' ? (
                      <Sun className="w-2 h-2" style={{ color: theme.colors.background }} />
                    ) : (
                      <Moon className="w-2 h-2" style={{ color: theme.colors.background }} />
                    )}
                  </div>
                </button>
              )}

              {/* New */}
              {onReset && (
                <button
                  onClick={onReset}
                  className="h-6 px-2.5 rounded-md text-[11px] font-medium transition-all duration-200 hover:scale-105 flex items-center"
                  style={{
                    backgroundColor: `${theme.colors.heading}15`,
                    color: theme.colors.text + '90',
                  }}
                >
                  New
                </button>
              )}

              {/* Download dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsDownloadOpen(true)}
                onMouseLeave={() => setIsDownloadOpen(false)}
              >
                <button
                  className="h-6 flex items-center gap-1.5 px-2.5 rounded-md text-[11px] font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: `${theme.colors.heading}15`,
                    color: theme.colors.text + '90',
                  }}
                >
                  <Download className="w-3 h-3" />
                  <ChevronDown className={`w-2.5 h-2.5 transition-transform ${isDownloadOpen ? 'rotate-180' : ''}`} />
                </button>
                {isDownloadOpen && (
                  <div
                    className="absolute top-full right-0 mt-0.5 rounded-lg overflow-hidden z-50 animate-scale-in min-w-[120px] shadow-lg"
                    style={{ backgroundColor: theme.colors.panel, border: `1px solid ${theme.colors.heading}30` }}
                  >
                    {[
                      { format: 'md' as const, icon: <FileText className="w-3 h-3" />, label: '.md' },
                      { format: 'skill-md' as const, icon: <FileText className="w-3 h-3" />, label: 'skill.MD' },
                      { format: 'txt' as const, icon: <FileText className="w-3 h-3" />, label: '.txt' },
                      { format: 'html' as const, icon: <FileCode className="w-3 h-3" />, label: '.html' },
                      { format: 'pdf' as const, icon: <FileDown className="w-3 h-3" />, label: 'PDF' },
                    ].map((d) => (
                      <button
                        key={d.format}
                        onClick={() => handleDownload(d.format)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-medium transition-all hover:bg-white/5"
                        style={{ color: theme.colors.text }}
                      >
                        {d.icon}
                        <span>{d.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Copy */}
              {onCopy && (
                <button
                  onClick={onCopy}
                  className="h-6 flex items-center gap-1.5 px-2.5 rounded-md text-[11px] font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: isCopied ? theme.colors.heading : `${theme.colors.heading}20`,
                    color: isCopied ? theme.colors.background : theme.colors.heading,
                  }}
                >
                  {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content Area */}
        <div
          ref={contentRef}
          className="flex-1 overflow-hidden flex min-h-0"
        >
          {/* Editor pane */}
          {showEditor && (
            <div className={`${viewMode === 'split' ? 'w-1/2 border-r' : 'w-full'} overflow-auto custom-scrollbar`} style={{ borderColor: `${theme.colors.heading}15` }}>
              {onMarkdownChange ? (
                <textarea
                  ref={editorRef}
                  value={markdown}
                  onChange={(e) => onMarkdownChange(e.target.value)}
                  onPaste={handleEditorPaste}
                  placeholder="Start typing or paste content..."
                  className={`w-full h-full p-6 font-mono text-sm leading-relaxed resize-none focus:outline-none ${editorClass}`}
                  style={{
                    backgroundColor: 'transparent',
                    color: theme.colors.text,
                    caretColor: caretColor,
                  }}
                  spellCheck={false}
                  autoFocus
                />
              ) : (
                <pre className="p-6 whitespace-pre-wrap font-mono text-sm leading-relaxed" style={{ color: theme.colors.text }}>{markdown}</pre>
              )}
            </div>
          )}

          {/* Preview pane */}
          {showPreview && (
            <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} overflow-auto custom-scrollbar`}>
              <div
                className="p-6 prose-custom"
                style={{ color: theme.colors.text }}
                dangerouslySetInnerHTML={{ __html: styledHtml }}
              />
            </div>
          )}
        </div>
      </div>
      </>
    );
  }
);

TerminalPreview.displayName = 'TerminalPreview';

export default TerminalPreview;
