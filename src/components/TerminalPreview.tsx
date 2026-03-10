import { Theme, themes, ThemeId } from '@/lib/themes';
import { useRef, forwardRef, useImperativeHandle, useState, useCallback, useId, useMemo } from 'react';
import { Copy, Check, ChevronDown, Download, Eye, Pencil, Columns2, Clock, Type, Hash, FileText, FileCode, FileDown, Sun, Moon } from 'lucide-react';
import { useMarkdownPaste } from '@/hooks/useMarkdownPaste';
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
    
    const isUniformTheme = theme.id === 'infiniti';
    const isCappuccino = theme.id === 'vaporwave';
    const highlightBg = theme.colors.highlight || 'transparent';

    const handlePasteInsert = useCallback(
      (md: string, ta: HTMLTextAreaElement) => {
        ta.focus();
        document.execCommand('insertText', false, md);
      },
      []
    );

    const handleEditorPaste = useMarkdownPaste(handlePasteInsert);

    const caretColor = isCappuccino ? '#D84315' : theme.colors.heading;
    const selectionBg = isCappuccino ? '#FFE0B280' : `${theme.colors.heading}40`;
    const selectionColor = theme.colors.text;

    // Stats
    const wordCount = useMemo(() => {
      const words = markdown.trim().split(/\s+/).filter(Boolean);
      return words.length;
    }, [markdown]);
    const charCount = markdown.length;
    const readTime = useMemo(() => Math.max(1, Math.ceil(wordCount / 200)), [wordCount]);

    const getStyledHTML = (): string => {
      const { colors } = theme;
      
      const lines = markdown.split('\n');
      let html = '';
      let inCodeBlock = false;
      let inList = false;

      const escapeHtml = (text: string) => {
        return text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      };

      const processInlineStyles = (text: string): string => {
        text = text.replace(/\*\*(.+?)\*\*/g, `<strong style="font-weight: 700;">$1</strong>`);
        text = text.replace(/\*(.+?)\*/g, `<em style="font-style: italic;">$1</em>`);
        text = text.replace(/_(.+?)_/g, `<em style="font-style: italic;">$1</em>`);
        text = text.replace(/`(.+?)`/g, `<code style="background-color: ${colors.panel}; padding: 2px 6px; border-radius: 4px; font-family: 'Fira Code', monospace; color: ${colors.keyword};">$1</code>`);
        text = text.replace(/\[(.+?)\]\((.+?)\)/g, `<a href="$2" style="color: ${colors.keyword}; text-decoration: underline;">$1</a>`);
        return text;
      };

      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        if (line.startsWith('```')) {
          inCodeBlock = !inCodeBlock;
          if (inCodeBlock) {
            html += `<pre style="background-color: ${colors.panel}; padding: 16px; border-radius: 8px; margin: 12px 0; overflow-x: auto;"><code style="font-family: 'Fira Code', monospace; color: ${colors.keyword};">`;
          } else {
            html += '</code></pre>';
          }
          continue;
        }

        if (inCodeBlock) {
          html += escapeHtml(line) + '\n';
          continue;
        }

        if (inList && !line.match(/^[-*]\s/) && !line.match(/^\d+\.\s/)) {
          html += '</ul>';
          inList = false;
        }

        const highlightStyle = isCappuccino ? `background-color: ${highlightBg}; padding: 4px 8px; border-radius: 4px; display: inline-block;` : '';
        const headingFont = isCappuccino ? "'Poppins', sans-serif" : "'Fira Code', monospace";
        
        if (line.startsWith('# ')) {
          const size = isUniformTheme ? '1.5em' : (isCappuccino ? '1.6em' : '2em');
          const borderBottom = `border-bottom: 2px solid ${colors.heading}40; padding-bottom: 8px;`;
          html += `<h1 style="color: ${colors.heading}; font-size: ${size}; font-weight: 700; margin: 20px 0 12px 0; font-family: ${headingFont}; ${borderBottom} ${highlightStyle}">${processInlineStyles(escapeHtml(line.slice(2)))}</h1>`;
        } else if (line.startsWith('## ')) {
          const size = isUniformTheme ? '1.25em' : (isCappuccino ? '1.3em' : '1.5em');
          html += `<h2 style="color: ${colors.heading}; font-size: ${size}; font-weight: 600; margin: 16px 0 8px 0; font-family: ${headingFont}; opacity: 0.9; ${highlightStyle}">${processInlineStyles(escapeHtml(line.slice(3)))}</h2>`;
        } else if (line.startsWith('### ')) {
          const size = isUniformTheme ? '1.1em' : (isCappuccino ? '1.1em' : '1.25em');
          html += `<h3 style="color: ${colors.heading}; font-size: ${size}; font-weight: 500; margin: 12px 0 6px 0; font-family: ${headingFont}; opacity: 0.75; font-style: italic; ${highlightStyle}">${processInlineStyles(escapeHtml(line.slice(4)))}</h3>`;
        } else if (line.startsWith('#### ')) {
          const size = isUniformTheme ? '1em' : (isCappuccino ? '1em' : '1.1em');
          html += `<h4 style="color: ${colors.heading}; font-size: ${size}; font-weight: 500; margin: 10px 0 4px 0; font-family: ${headingFont}; opacity: 0.65; ${highlightStyle}">${processInlineStyles(escapeHtml(line.slice(5)))}</h4>`;
        }
        else if (line.match(/^[-*]\s/)) {
          if (!inList) {
            html += '<ul style="margin: 8px 0; padding-left: 24px;">';
            inList = true;
          }
          const content = line.replace(/^[-*]\s/, '');
          html += `<li style="color: ${colors.text}; margin: 4px 0; font-family: 'Fira Code', monospace;"><span style="color: ${colors.keyword};">•</span> ${processInlineStyles(escapeHtml(content))}</li>`;
        }
        else if (line.match(/^\d+\.\s/)) {
          const match = line.match(/^(\d+)\.\s(.*)$/);
          if (match) {
            html += `<p style="color: ${colors.text}; margin: 4px 0; font-family: 'Fira Code', monospace;"><span style="color: ${colors.keyword};">${match[1]}.</span> ${processInlineStyles(escapeHtml(match[2]))}</p>`;
          }
        }
        else if (line.startsWith('> ')) {
          html += `<blockquote style="border-left: 3px solid ${colors.keyword}; padding-left: 16px; margin: 12px 0; color: ${colors.text}; opacity: 0.8; font-style: italic;">${processInlineStyles(escapeHtml(line.slice(2)))}</blockquote>`;
        }
        else if (line.match(/^[-*_]{3,}$/)) {
          html += `<hr style="border: none; border-top: 1px solid ${colors.keyword}; margin: 20px 0; opacity: 0.4;" />`;
        }
        else if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
          if (!html.endsWith('</table>') && !html.includes('<table') || html.lastIndexOf('</table>') === html.lastIndexOf('<table') - 1 || !html.includes('__table_open__')) {
            const nextLine = lines[i + 1];
            const isHeader = nextLine && /^\|[\s\-:|]+\|$/.test(nextLine.trim());
            if (isHeader) {
              html += `<table style="width: 100%; border-collapse: collapse; margin: 12px 0; font-family: 'Fira Code', monospace; font-size: 0.875em;">`;
              const cells = line.split('|').filter(c => c !== '').map(c => c.trim());
              html += '<thead><tr>';
              cells.forEach(cell => {
                html += `<th style="border: 1px solid ${colors.keyword}40; padding: 8px 12px; text-align: left; color: ${colors.heading}; font-weight: 600; background-color: ${colors.panel};">${processInlineStyles(escapeHtml(cell))}</th>`;
              });
              html += '</tr></thead><tbody>';
              i++;
              continue;
            }
          }
          const cells = line.split('|').filter(c => c !== '').map(c => c.trim());
          html += '<tr>';
          cells.forEach(cell => {
            html += `<td style="border: 1px solid ${colors.keyword}20; padding: 8px 12px; color: ${colors.text};">${processInlineStyles(escapeHtml(cell))}</td>`;
          });
          html += '</tr>';
          const nextLine = lines[i + 1];
          if (!nextLine || !(nextLine.trim().startsWith('|') && nextLine.trim().endsWith('|'))) {
            html += '</tbody></table>';
          }
        }
        else if (line.trim() === '') {
          html += '<br />';
        }
        else {
          html += `<p style="color: ${colors.text}; margin: 8px 0; line-height: 1.7; font-family: 'Fira Code', monospace;">${processInlineStyles(escapeHtml(line))}</p>`;
        }
      }

      if (inList) {
        html += '</ul>';
      }

      return html;
    };

    useImperativeHandle(ref, () => ({
      getStyledHTML,
    }));

    const handleDownload = (format: 'md' | 'txt' | 'html' | 'pdf') => {
      setIsDownloadOpen(false);
      if (format === 'md') {
        const yamlWrapped = `---\n${markdown}\n---\n`;
        const blob = new Blob([yamlWrapped], { type: 'text/markdown' });
        downloadBlob(blob, 'output.md');
      } else if (format === 'txt') {
        const blob = new Blob([markdown], { type: 'text/plain' });
        downloadBlob(blob, 'output.txt');
      } else if (format === 'html') {
        const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Markdown Export</title></head><body>${getStyledHTML()}</body></html>`;
        const blob = new Blob([fullHtml], { type: 'text/html' });
        downloadBlob(blob, 'output.html');
      } else if (format === 'pdf') {
        const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Markdown Export</title><style>body{margin:40px;font-family:'Fira Code',monospace;}</style></head><body>${getStyledHTML()}</body></html>`;
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(fullHtml);
          printWindow.document.close();
          printWindow.print();
        }
      }
    };

    const downloadBlob = (blob: Blob, filename: string) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
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
                      <Moon className="w-2 h-2" style={{ color: theme.colors.background }} />
                    ) : (
                      <Sun className="w-2 h-2" style={{ color: theme.colors.background }} />
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
                    className="absolute top-full right-0 mt-0.5 rounded-lg overflow-hidden z-[9999] animate-scale-in min-w-[120px] shadow-lg"
                    style={{ backgroundColor: theme.colors.panel, border: `1px solid ${theme.colors.heading}30` }}
                  >
                    {[
                      { format: 'md' as const, icon: <FileText className="w-3 h-3" />, label: '.md' },
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
                    backgroundColor: isCopied ? `${theme.colors.heading}20` : theme.colors.heading,
                    color: isCopied ? theme.colors.heading : theme.colors.background,
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
                  onKeyDown={(e) => {
                    // Allow native undo/redo by intercepting and using execCommand
                    if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
                      e.preventDefault();
                      if (e.shiftKey) {
                        document.execCommand('redo');
                      } else {
                        document.execCommand('undo');
                      }
                    }
                  }}
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
                dangerouslySetInnerHTML={{ __html: getStyledHTML() }}
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
