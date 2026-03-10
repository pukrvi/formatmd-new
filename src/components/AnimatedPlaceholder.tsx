import { useState, useEffect, useRef } from 'react';
import { themes } from '@/lib/themes';

const examples = [
  {
    themeIndex: 0,
    text: `# Dark Mode
- Clean formatting
- Professional look
- Easy on the eyes`,
  },
  {
    themeIndex: 1,
    text: `# Light Mode
## Warm & Cozy
- Highlighted headings
- Easy to scan`,
  },
];

interface AnimatedPlaceholderProps {
  onThemeHint: (themeIndex: number) => void;
}

const AnimatedPlaceholder = ({ onThemeHint }: AnimatedPlaceholderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isDone) return;

    const example = examples[currentIndex];
    const fullText = example.text;

    if (isTyping) {
      if (displayText.length < fullText.length) {
        const timeout = setTimeout(() => {
          if (mountedRef.current) {
            setDisplayText(fullText.slice(0, displayText.length + 1));
          }
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          if (mountedRef.current) {
            setIsTyping(false);
          }
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          if (mountedRef.current) {
            setDisplayText(displayText.slice(0, -1));
          }
        }, 15);
        return () => clearTimeout(timeout);
      } else {
        if (mountedRef.current) {
          const nextIndex = currentIndex + 1;
          if (nextIndex >= examples.length) {
            // Animation complete — stop and settle on first theme
            setIsDone(true);
            onThemeHint(0);
            return;
          }
          setCurrentIndex(nextIndex);
          onThemeHint(examples[nextIndex].themeIndex);
          setIsTyping(true);
        }
      }
    }
  }, [displayText, isTyping, currentIndex, isDone, onThemeHint]);

  useEffect(() => {
    if (!isDone) {
      onThemeHint(examples[currentIndex].themeIndex);
    }
  }, [currentIndex, isDone, onThemeHint]);

  const currentTheme = themes[examples[currentIndex]?.themeIndex ?? 0];

  if (isDone) return null;

  return (
    <div className="relative w-full h-full pointer-events-none select-none">
      <div className="whitespace-pre-wrap font-mono text-base leading-relaxed">
        {displayText.split('\n').map((line, i) => {
          let style: React.CSSProperties = { color: currentTheme.colors.text + '60' };

          if (line.startsWith('# ')) {
            style = { color: currentTheme.colors.heading + '80', fontWeight: 700 };
          } else if (line.startsWith('## ')) {
            style = { color: currentTheme.colors.heading + '70', fontWeight: 600 };
          } else if (line.startsWith('- ')) {
            style = { color: currentTheme.colors.keyword + '70' };
          }

          return (
            <div key={i} style={style}>
              {line}
            </div>
          );
        })}
        <span
          className="inline-block w-0.5 h-5 ml-0.5 animate-pulse"
          style={{ backgroundColor: currentTheme.colors.heading + '80' }}
        />
      </div>
    </div>
  );
};

export default AnimatedPlaceholder;
