import { Theme } from '@/lib/themes';
import {
  Bold,
  Clock,
  Code,
  Copy,
  Download,
  Eye,
  List,
  Moon,
  Pencil,
  Sun,
  Tags,
  Type,
} from 'lucide-react';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details?: string[];
}

interface Section {
  id: string;
  title: string;
  features: Feature[];
}

interface DocumentationSectionProps {
  theme: Theme;
}

const FeatureCard = ({
  feature,
  heading,
  text,
  panel,
}: {
  feature: Feature;
  heading: string;
  text: string;
  panel: string;
}) => (
  <div
    className="rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]"
    style={{
      backgroundColor: panel + '40',
      border: `1px solid ${heading}20`,
    }}
  >
    <div className="flex items-start gap-3 mb-3">
      <div
        className="p-2 rounded-lg shrink-0"
        style={{ backgroundColor: heading + '15' }}
      >
        {feature.icon}
      </div>
      <div>
        <h3 className="font-mono text-sm font-bold mb-1" style={{ color: heading }}>
          {feature.title}
        </h3>
        <p className="text-xs leading-relaxed" style={{ color: text + '75' }}>
          {feature.description}
        </p>
      </div>
    </div>
    {feature.details && (
      <ul className="ml-11 space-y-1">
        {feature.details.map((detail) => (
          <li key={detail} className="text-xs font-mono flex items-start gap-1.5" style={{ color: text + '65' }}>
            <span style={{ color: heading }}>•</span> {detail}
          </li>
        ))}
      </ul>
    )}
  </div>
);

const DocumentationSection = ({ theme }: DocumentationSectionProps) => {
  const c = theme.colors;

  const sections: Section[] = [
    {
      id: 'editor',
      title: 'Editor',
      features: [
        {
          icon: <Pencil className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Rich Markdown Editor',
          description:
            'Write or paste markdown with live syntax awareness and smart HTML-to-markdown paste conversion.',
          details: ['Focused writing surface', 'Smart paste conversion', 'Theme-aware selection and caret'],
        },
        {
          icon: <Eye className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'View Modes',
          description: 'Switch between Editor, Split, and Preview to match your writing flow.',
          details: ['Editor-only', 'Split view', 'Preview-only'],
        },
      ],
    },
    {
      id: 'toolbar',
      title: 'Formatting',
      features: [
        {
          icon: <Bold className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Text Controls',
          description: 'One-click formatting for headings, emphasis, lists, links, and code.',
          details: ['Headings H1-H3', 'Bold/italic', 'Lists/quotes/links'],
        },
        {
          icon: <Code className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Code Blocks',
          description: 'Insert fenced blocks, including language-tagged templates.',
          details: ['Inline code', 'Block code', 'Language scaffold'],
        },
        {
          icon: <Tags className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Delimiter Tools',
          description: 'Prompt-friendly wrappers and separators for structured writing.',
          details: ['XML tag wrapper', 'HTML comments', '7 delimiter styles'],
        },
      ],
    },
    {
      id: 'themes',
      title: 'Themes',
      features: [
        {
          icon: <Moon className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'InfinitiGRID (Dark)',
          description: 'Terminal-inspired dark theme with crisp green accents.',
        },
        {
          icon: <Sun className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Vaporwave (Light)',
          description: 'Paper-like light mode with warm, high-contrast typography.',
        },
      ],
    },
    {
      id: 'export',
      title: 'Copy & Export',
      features: [
        {
          icon: <Copy className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Rich Copy',
          description: 'Copy styled HTML + plain text for Docs, Notion, Slack, and email.',
        },
        {
          icon: <Download className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Download Formats',
          description: 'Export as `.md`, `.txt`, `.html`, or print-to-PDF.',
        },
      ],
    },
    {
      id: 'stats',
      title: 'Live Metrics',
      features: [
        {
          icon: <Clock className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Reading Time',
          description: 'Live estimated read time while you write.',
        },
        {
          icon: <Type className="w-4 h-4" style={{ color: c.heading }} />,
          title: 'Word & Character Count',
          description: 'Instant counters in the terminal header.',
        },
      ],
    },
  ];

  return (
    <section
      id="documentation"
      className="px-4 sm:px-6 py-16 border-t"
      style={{
        backgroundColor: c.background,
        borderColor: c.heading + '18',
      }}
    >
      <div id="features" className="max-w-5xl mx-auto space-y-12 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-3" style={{ color: c.heading }}>
            Documentation
          </h2>
          <p className="text-sm font-mono leading-relaxed" style={{ color: c.text + '70' }}>
            Everything you need, right below the hero: editing flow, formatting tools, themes, export options, and live metrics.
          </p>
        </div>

        <nav className="flex flex-wrap gap-2 justify-center">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="px-3 py-1 rounded-full text-xs font-mono transition-all hover:scale-105"
              style={{
                backgroundColor: c.panel + '65',
                color: c.text + '75',
                border: `1px solid ${c.heading}20`,
              }}
            >
              {section.title}
            </a>
          ))}
        </nav>

        {sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h3 className="text-lg font-bold font-mono mb-4" style={{ color: c.heading }}>
              {section.title}
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.features.map((feature) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  heading={c.heading}
                  text={c.text}
                  panel={c.panel}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};

export default DocumentationSection;
