import { useState, useEffect } from 'react';
import { Code2, Palette, Zap, Smile, LucideIcon } from 'lucide-react';

interface AnimatedLogoProps {
  color: string;
  size?: number;
}

const icons: { Icon: LucideIcon; label: string }[] = [
  { Icon: Code2, label: 'code' },
  { Icon: Palette, label: 'style' },
  { Icon: Zap, label: 'speed' },
  { Icon: Smile, label: 'emoji' },
];

const AnimatedLogo = ({ color, size = 32 }: AnimatedLogoProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % icons.length);
        setIsAnimating(false);
      }, 200);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const { Icon } = icons[currentIndex];

  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
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

      {/* Floating particles */}
      <div 
        className="absolute w-1.5 h-1.5 rounded-full animate-ping opacity-60"
        style={{ 
          backgroundColor: color,
          top: '0',
          right: '0',
          animationDuration: '2s',
        }}
      />
      <div 
        className="absolute w-1 h-1 rounded-full animate-ping opacity-40"
        style={{ 
          backgroundColor: color,
          bottom: '2px',
          left: '2px',
          animationDuration: '2.5s',
          animationDelay: '0.5s',
        }}
      />
    </div>
  );
};

export default AnimatedLogo;
