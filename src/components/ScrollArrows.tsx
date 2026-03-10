interface ScrollArrowsProps {
  color: string;
}

const ScrollArrows = ({ color }: ScrollArrowsProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0 animate-bounce opacity-30 pointer-events-none">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          width="20"
          height="12"
          viewBox="0 0 20 12"
          fill="none"
          className="transition-opacity duration-300"
          style={{ opacity: 1 - i * 0.25 }}
        >
          <path
            d="M2 2L10 10L18 2"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
};

export default ScrollArrows;
