import { FileText } from 'lucide-react';

interface MarkdownInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownInput = ({ value, onChange }: MarkdownInputProps) => {
  return (
    <div className="glass-panel theme-transition rounded-2xl overflow-hidden h-full flex flex-col animate-slide-in-left glow-border">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30">
        <FileText className="w-5 h-5 text-primary" />
        <span className="font-semibold text-sm tracking-wide">Markdown Input</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-mono">
            {value.length} chars
          </span>
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="# Paste your markdown here...

Start typing or paste your markdown content.

## Features you can try:
- **Bold text** and *italic text*
- Lists with bullets
- `Inline code snippets`
- Links and headings

The preview will update in real-time! ✨"
          className="w-full h-full bg-transparent resize-none p-5 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none custom-scrollbar"
          spellCheck={false}
        />
        
        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default MarkdownInput;
