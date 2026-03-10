import { useState, useEffect, useRef } from 'react';
import { Code2, Hash, Terminal, FileCode, LucideIcon } from 'lucide-react';

interface AnimatedLogoProps {
  color: string;
  size?: number;
}

const icons: { Icon: LucideIcon; label: string }[] = [
  { Icon: Code2, label: 'code' },
  { Icon: Hash, label: 'markdown' },
  { Icon: Terminal, label: 'terminal' },
  { Icon: FileCode, label: 'file' },
];

const AnimatedLogo = ({ color, size = 32 }: AnimatedLogoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // Only animate once per mount — stop after cycling through all icons
    if (hasCompletedRef.current) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          if (next >= icons.length) {
            hasCompletedRef.current = true;
            clearInterval(interval);
            return prev;
          }
          return next;
        });
        setIsAnimating(false);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const { Icon } = icons[currentIndex];

  return (
    <div className="relative flex items-center justify-center" style={{ width: size + 8, height: size + 8 }}>
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl blur-xl opacity-50 transition-all duration-500"
        style={{ backgroundColor: color }}
      />

      {/* Icon container */}
      <div
        className={`relative z-10 transition-all duration-200 ease-out ${
          isAnimating
            ? 'scale-50 opacity-0 rotate-12'
            : 'scale-100 opacity-100 rotate-0'
        }`}
      >
        <Icon
          size={size}
          style={{ color }}
          className="drop-shadow-lg"
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
