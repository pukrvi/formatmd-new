import { Theme } from '@/lib/themes';
import { useState } from 'react';
import {
  Bold, Italic, Heading1, Heading2, Heading3,
  Code, SquareCode, List, ListOrdered, Link2, TextQuote,
  Minus, Slash, Tags, FileCode,
  ChevronDown
} from 'lucide-react';

interface ToolbarAction {
  icon: React.ReactNode;
  label: string;
  action: (text: string, selStart: number, selEnd: number) => { text: string; cursorStart: number; cursorEnd: number };
}

interface MarkdownToolbarProps {
  theme: Theme;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onMarkdownChange: (value: string) => void;
  markdown: string;
}

function wrapSelection(
  full: string, start: number, end: number,
  before: string, after: string
) {
  const selected = full.slice(start, end);
  const replacement = before + (selected || 'text') + after;
  return {
    text: full.slice(0, start) + replacement + full.slice(end),
    cursorStart: start + before.length,
    cursorEnd: start + before.length + (selected || 'text').length,
  };
}

function prependLines(
  full: string, start: number, end: number,
  prefix: string | ((i: number) => string)
) {
  const selected = full.slice(start, end) || 'item';
  const lines = selected.split('\n');
  const result = lines.map((l, i) => {
    const p = typeof prefix === 'function' ? prefix(i) : prefix;
    return p + l;
  }).join('\n');
  return {
    text: full.slice(0, start) + result + full.slice(end),
    cursorStart: start,
    cursorEnd: start + result.length,
  };
}

function blockWrap(
  full: string, start: number, end: number,
  topLine: string, bottomLine: string
) {
  const selected = full.slice(start, end) || 'content';
  const replacement = `\n${topLine}\n${selected}\n${bottomLine}\n`;
  return {
    text: full.slice(0, start) + replacement + full.slice(end),
    cursorStart: start + topLine.length + 2,
    cursorEnd: start + topLine.length + 2 + selected.length,
  };
}

function delimiterWrap(
  full: string, start: number, end: number,
  delimiter: string
) {
  const selected = full.slice(start, end) || 'content';
  const line = delimiter.repeat(3);
  const replacement = `\n${line}\n${selected}\n${line}\n`;
  return {
    text: full.slice(0, start) + replacement + full.slice(end),
    cursorStart: start + line.length + 2,
    cursorEnd: start + line.length + 2 + selected.length,
  };
}

const sz = "w-3.5 h-3.5";

const actions: ToolbarAction[] = [
  {
    icon: <Bold className={sz} />,
    label: 'Bold',
    action: (t, s, e) => wrapSelection(t, s, e, '**', '**'),
  },
  {
    icon: <Italic className={sz} />,
    label: 'Italic',
    action: (t, s, e) => wrapSelection(t, s, e, '*', '*'),
  },
  {
    icon: <Heading1 className={sz} />,
    label: 'Heading 1',
    action: (t, s, e) => prependLines(t, s, e, '# '),
  },
  {
    icon: <Heading2 className={sz} />,
    label: 'Heading 2',
    action: (t, s, e) => prependLines(t, s, e, '## '),
  },
  {
    icon: <Heading3 className={sz} />,
    label: 'Heading 3',
    action: (t, s, e) => prependLines(t, s, e, '### '),
  },
  // --- code group ---
  {
    icon: <Code className={sz} />,
    label: 'Inline code',
    action: (t, s, e) => wrapSelection(t, s, e, '`', '`'),
  },
  {
    icon: <SquareCode className={sz} />,
    label: 'Code block',
    action: (t, s, e) => blockWrap(t, s, e, '```', '```'),
  },
  {
    icon: <FileCode className={sz} />,
    label: 'Code block + language',
    action: (t, s, e) => {
      const selected = t.slice(s, e) || 'code';
      const replacement = `\n\`\`\`language\n${selected}\n\`\`\`\n`;
      return {
        text: t.slice(0, s) + replacement + t.slice(e),
        cursorStart: s + 4,
        cursorEnd: s + 12,
      };
    },
  },
  // --- list/structure group ---
  {
    icon: <List className={sz} />,
    label: 'Bullet list',
    action: (t, s, e) => prependLines(t, s, e, '- '),
  },
  {
    icon: <ListOrdered className={sz} />,
    label: 'Numbered list',
    action: (t, s, e) => prependLines(t, s, e, (i) => `${i + 1}. `),
  },
  {
    icon: <TextQuote className={sz} />,
    label: 'Blockquote',
    action: (t, s, e) => prependLines(t, s, e, '> '),
  },
  {
    icon: <Link2 className={sz} />,
    label: 'Link',
    action: (t, s, e) => {
      const selected = t.slice(s, e) || 'text';
      const replacement = `[${selected}](url)`;
      return {
        text: t.slice(0, s) + replacement + t.slice(e),
        cursorStart: s + selected.length + 3,
        cursorEnd: s + selected.length + 6,
      };
    },
  },
  {
    icon: <Minus className={sz} />,
    label: 'Horizontal rule',
    action: (t, s, e) => ({
      text: t.slice(0, s) + '\n---\n' + t.slice(e),
      cursorStart: s + 5,
      cursorEnd: s + 5,
    }),
  },
  // --- AI / Delimiter group ---
  {
    icon: <Tags className={sz} />,
    label: 'XML tags',
    action: (t, s, e) => {
      const selected = t.slice(s, e) || 'content';
      const replacement = `<tag>\n${selected}\n</tag>`;
      return {
        text: t.slice(0, s) + replacement + t.slice(e),
        cursorStart: s + 1,
        cursorEnd: s + 4,
      };
    },
  },
  {
    icon: <Slash className={sz} />,
    label: 'HTML comment',
    action: (t, s, e) => wrapSelection(t, s, e, '<!-- ', ' -->'),
  },
];

// Delimiter submenu options
const delimiterOptions = [
  { char: '-', label: '--- dashes' },
  { char: '=', label: '=== equals' },
  { char: '*', label: '*** asterisks' },
  { char: '~', label: '~~~ tildes' },
  { char: '/', label: '/// slashes' },
  { char: "'", label: "''' quotes" },
  { char: '?', label: '??? question' },
];

const separatorAfter = new Set([4, 7, 12]);

// Instant tooltip component
const Tip = ({ label, theme }: { label: string; theme: Theme }) => (
  <span
    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 z-[9999] transition-opacity duration-150"
    style={{
      backgroundColor: theme.colors.panel,
      color: theme.colors.heading,
      border: `1px solid ${theme.colors.heading}30`,
    }}
  >
    {label}
  </span>
);

const MarkdownToolbar = ({ theme, textareaRef, onMarkdownChange, markdown }: MarkdownToolbarProps) => {
  const [delimOpen, setDelimOpen] = useState(false);

  const handleAction = (action: ToolbarAction['action']) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const result = action(markdown, start, end);
    onMarkdownChange(result.text);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(result.cursorStart, result.cursorEnd);
    });
  };

  const handleDelimiter = (char: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const result = delimiterWrap(markdown, start, end, char);
    onMarkdownChange(result.text);
    setDelimOpen(false);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(result.cursorStart, result.cursorEnd);
    });
  };

  return (
    <div
      className="flex items-center gap-0.5 px-3 py-1 shrink-0 relative"
      style={{
        overflow: 'visible',
        backgroundColor: theme.colors.panel + '30',
      }}
    >
      {actions.map((item, index) => (
        <span key={item.label} className="contents">
          <button
            onClick={() => handleAction(item.action)}
            className="relative group p-1.5 rounded-md shrink-0 toolbar-btn"
            aria-label={item.label}
            style={{
              color: theme.colors.text + '90',
              backgroundColor: 'transparent',
              transition: 'background-color 150ms ease, color 150ms ease, transform 150ms ease',
              '--toolbar-hover-bg': theme.colors.heading + '20',
              '--toolbar-hover-color': theme.colors.heading,
              '--toolbar-rest-color': theme.colors.text + '90',
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.heading + '20';
              e.currentTarget.style.color = theme.colors.heading;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.colors.text + '90';
            }}
            onFocus={(e) => {
              e.currentTarget.style.backgroundColor = theme.colors.heading + '20';
              e.currentTarget.style.color = theme.colors.heading;
            }}
            onBlur={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = theme.colors.text + '90';
            }}
          >
            {item.icon}
            <Tip label={item.label} theme={theme} />
          </button>
          {separatorAfter.has(index) && (
            <div
              className="w-px h-4 mx-1 shrink-0"
              style={{ backgroundColor: theme.colors.heading + '20' }}
            />
          )}
        </span>
      ))}

      {/* Delimiter dropdown */}
      <div
        className="w-px h-4 mx-1 shrink-0"
        style={{ backgroundColor: theme.colors.heading + '20' }}
      />
      <div
        className="relative"
        onMouseEnter={() => setDelimOpen(true)}
        onMouseLeave={() => setDelimOpen(false)}
      >
        <button
          className="relative group flex items-center gap-0.5 p-1.5 rounded-md shrink-0 toolbar-btn"
          aria-label="Delimiters"
          style={{
            color: theme.colors.text + '90',
            backgroundColor: 'transparent',
            transition: 'background-color 150ms ease, color 150ms ease, transform 150ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.heading + '20';
            e.currentTarget.style.color = theme.colors.heading;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.text + '90';
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.heading + '20';
            e.currentTarget.style.color = theme.colors.heading;
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.text + '90';
          }}
        >
          <span className="font-mono text-[10px] font-bold leading-none tracking-tight" style={{ color: theme.colors.text + '90' }}>///</span>
          <ChevronDown className="w-2.5 h-2.5" />
          <Tip label="Delimiters" theme={theme} />
        </button>
        {delimOpen && (
          <div
            className="absolute top-full left-0 mt-0.5 rounded-lg overflow-hidden z-[9999] animate-scale-in min-w-[130px] shadow-lg"
            style={{
              backgroundColor: theme.colors.panel,
              border: `1px solid ${theme.colors.heading}30`,
            }}
          >
            {delimiterOptions.map((d) => (
              <button
                key={d.char}
                onClick={() => handleDelimiter(d.char)}
                className="w-full text-left px-3 py-1.5 text-xs font-mono transition-all hover:bg-white/5"
                style={{ color: theme.colors.text }}
              >
                <span style={{ color: theme.colors.heading }}>{d.char.repeat(3)}</span>
                <span className="ml-2 opacity-60">{d.label.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownToolbar;
