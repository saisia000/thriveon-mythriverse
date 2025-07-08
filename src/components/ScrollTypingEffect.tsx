import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface ScrollTypingEffectProps {
  phrases: string[];
  colors: string[];
  className?: string;
}

export const ScrollTypingEffect = ({ phrases, colors, className = '' }: ScrollTypingEffectProps) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;

    let timeout: NodeJS.Timeout;
    
    const typeText = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      let charIndex = 0;
      
      setIsTyping(true);
      setDisplayedText('');
      
      const typeChar = () => {
        if (charIndex < currentPhrase.length) {
          setDisplayedText(currentPhrase.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(typeChar, 50 + Math.random() * 30); // Gentle, variable typing speed
        } else {
          setIsTyping(false);
          // Wait before starting next phrase
          timeout = setTimeout(() => {
            setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
          }, 2500);
        }
      };
      
      typeChar();
    };

    if (inView) {
      typeText();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [inView, currentPhraseIndex, phrases]);

  const currentColor = colors[currentPhraseIndex % colors.length];

  return (
    <div ref={ref} className={`min-h-[3rem] flex items-center ${className}`}>
      <span className={`transition-colors duration-500 ${currentColor}`}>
        {displayedText}
        {isTyping && <span className="animate-pulse">|</span>}
      </span>
    </div>
  );
};