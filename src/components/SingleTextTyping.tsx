import { useState, useEffect } from 'react';

interface SingleTextTypingProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: (text: string) => void;
}

export const SingleTextTyping = ({ text, speed = 50, className = '', onComplete }: SingleTextTypingProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      // Call onComplete when typing is finished
      onComplete(text);
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    // Reset when text changes
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse text-primary">|</span>}
    </span>
  );
};