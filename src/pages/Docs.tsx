import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTheme, ThemeId } from '@/lib/themes';
import Footer from '@/components/Footer';
import FeedbackModal from '@/components/FeedbackModal';
import AnimatedLogo from '@/components/AnimatedLogo';
import SEOHead from '@/components/SEOHead';
import {
  FileText, Palette, Download, Copy, Eye, Columns2, Pencil,
  Bold, Code, List, Link2, Tags, Slash, Moon, Sun,
  Clock, Type, Hash, Clipboard, Bug, ArrowLeft
} from 'lucide-react';

const themeId: ThemeId = 'infiniti';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string[];
  color: string;
  textColor: string;
  panelColor: string;
}

const FeatureCard = ({ icon, title, description, details, color, textColor, panelColor }: FeatureCardProps) => (
  <div
    className="rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]"
    style={{
      backgroundColor: panelColor + '40',
      border: `1px solid ${color}15`,
    }}
  >
    <div className="flex items-start gap-3 mb-3">
      <div
        className="p-2 rounded-lg shrink-0"
        style={{ backgroundColor: color + '15' }}
      >
        {icon}
      </div>
      <div>
        <h3 className="font-mono text-sm font-bold mb-1" style={{ color }}>{title}</h3>
        <p className="text-xs leading-relaxed" style={{ color: textColor + '70' }}>{description}</p>
      </div>
    </div>
    {details && (
      <ul className="ml-11 space-y-1">
        {details.map((d) => (
          <li key={d} className="text-xs font-mono flex items-start gap-1.5" style={{ color: textColor + '50' }}>
            <span style={{ color }}>•</span> {d}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const Docs = () => {
  const theme = getTheme(themeId);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const c = theme.colors;

  const sections = [
    {
      id: 'editor',
      title: '📝 Editor',
      features: [
        {
          icon: <Pencil className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Rich Markdown Editor',
          description: 'Write or paste markdown with live syntax awareness. Supports undo/redo (CMD+Z) and smart paste that converts HTML to markdown.',
          details: ['Full undo/redo history', 'HTML-to-markdown paste conversion', 'Custom caret & selection colors per theme'],
        },
        {
          icon: <Eye className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'View Modes',
          description: 'Switch between Editor, Split, and Preview modes to see your formatted output in real time.',
          details: ['Editor-only mode for focused writing', 'Split view for side-by-side editing', 'Preview mode for final output'],
        },
      ],
    },
    {
      id: 'toolbar',
      title: '🔧 Formatting Toolbar',
      features: [
        {
          icon: <Bold className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Text Formatting',
          description: 'Bold, italic, headings (H1-H3), and inline code — all one click away.',
          details: ['Bold (**text**)', 'Italic (*text*)', 'Heading levels 1–3', 'Inline code (`code`)'],
        },
        {
          icon: <Code className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Code Blocks',
          description: 'Insert fenced code blocks with optional language specifiers.',
          details: ['Plain code blocks', 'Language-tagged blocks', 'Syntax-aware formatting'],
        },
        {
          icon: <List className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Lists & Structure',
          description: 'Bullet lists, numbered lists, blockquotes, links, and horizontal rules.',
          details: ['Bullet lists (- item)', 'Numbered lists (1. item)', 'Blockquotes (> text)', 'Links [text](url)', 'Horizontal rules (---)'],
        },
        {
          icon: <Tags className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'AI & Delimiter Tools',
          description: 'XML tags, HTML comments, and a delimiter menu with 7 separator styles for structured prompts.',
          details: ['XML tag wrapping', 'HTML comments', '7 delimiter styles (---, ===, ***, ~~~, ///, \'\'\', ???)'],
        },
      ],
    },
    {
      id: 'themes',
      title: '🎨 Themes',
      features: [
        {
          icon: <Moon className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Dark Mode (InfinitiGRID)',
          description: 'A sleek dark theme with green accents. Monospaced typography with uniform sizing for a terminal-like feel.',
        },
        {
          icon: <Sun className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Light Mode (Vaporwave)',
          description: 'Warm, paper-like theme with brown accents and highlighted headings for comfortable reading.',
        },
      ],
    },
    {
      id: 'export',
      title: '📤 Export & Copy',
      features: [
        {
          icon: <Copy className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Rich Copy',
          description: 'Copy styled HTML to clipboard — paste into Notion, Google Docs, emails, or Slack with formatting preserved.',
          details: ['Copies as rich HTML + plain text', 'Styled with current theme colors', 'Works in all major apps'],
        },
        {
          icon: <Download className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Download Formats',
          description: 'Export your content in multiple formats.',
          details: ['Markdown (.md) with YAML front matter', 'Plain text (.txt)', 'Styled HTML (.html)', 'Print to PDF via browser'],
        },
      ],
    },
    {
      id: 'stats',
      title: '📊 Live Stats',
      features: [
        {
          icon: <Clock className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Reading Time',
          description: 'Estimated read time based on 200 words per minute.',
        },
        {
          icon: <Type className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Word & Character Count',
          description: 'Live word and character counters displayed in the terminal header bar.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: c.background }}>
      <SEOHead
        title="Documentation — FormatMD"
        description="Complete guide to FormatMD features — editor modes, formatting toolbar, themes, export options, and live stats."
        path="/docs"
      />
      {/* Header */}
      <header
        className="sticky top-0 z-20 px-6 py-3 border-b backdrop-blur-md"
        style={{ borderColor: c.heading + '15', backgroundColor: c.background + 'e0' }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <ArrowLeft className="w-4 h-4" style={{ color: c.heading }} />
              <AnimatedLogo color={c.heading} size={20} />
              <span className="font-mono text-sm font-bold" style={{ color: c.heading }}>FormatMD</span>
            </Link>
            <span className="font-mono text-xs" style={{ color: c.text + '40' }}>/ docs</span>
          </div>
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

      {/* Hero */}
      <section className="px-6 py-16 text-center">
        <h1 className="text-3xl font-bold font-mono mb-3" style={{ color: c.heading }}>
          Documentation
        </h1>
        <p className="text-sm font-mono max-w-lg mx-auto" style={{ color: c.text + '60' }}>
          Everything you need to know about FormatMD — paste markdown, style it beautifully, and export anywhere.
        </p>
      </section>

      {/* Quick nav */}
      <nav className="px-6 mb-8">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1 rounded-full text-xs font-mono transition-all hover:scale-105"
              style={{ backgroundColor: c.panel + '60', color: c.text + '70', border: `1px solid ${c.heading}15` }}
            >
              {s.title}
            </a>
          ))}
        </div>
      </nav>

      {/* Sections */}
      <main className="flex-1 px-6 pb-16">
        <div id="features" className="max-w-4xl mx-auto space-y-12 scroll-mt-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-lg font-bold font-mono mb-4" style={{ color: c.heading }}>
                {section.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {section.features.map((f) => (
                  <FeatureCard
                    key={f.title}
                    {...f}
                    color={c.heading}
                    textColor={c.text}
                    panelColor={c.panel}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer themeId={themeId} />
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} themeId={themeId} />
    </div>
  );
};

export default Docs;
