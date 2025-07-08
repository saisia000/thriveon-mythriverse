import { useState, useEffect } from 'react';

interface TypingEffectProps {
  phrases: string[];
  colors?: string[];
  className?: string;
}

export const TypingEffect = ({ phrases, colors = [], className = '' }: TypingEffectProps) => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const phrase = phrases[currentPhrase];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < phrase.length) {
          setCurrentText(phrase.substring(0, currentText.length + 1));
          setShowCursor(true);
        } else {
          // Pause at end, then start deleting
          setTimeout(() => {
            setShowCursor(false); // Fade cursor before deleting
            setTimeout(() => setIsDeleting(true), 300);
          }, 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.substring(0, currentText.length - 1));
          setShowCursor(false);
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhrase((prev) => (prev + 1) % phrases.length);
          setShowCursor(true);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhrase, phrases]);

  const currentColor = colors[currentPhrase] || 'text-muted-foreground';

  return (
    <span className={className}>
      <span className={currentColor}>
        {currentText}
      </span>
      <span 
        className={`inline-block ml-1 transition-all duration-300 ${
          showCursor 
            ? 'opacity-100 animate-pulse text-primary shadow-glow' 
            : 'opacity-0'
        }`}
        style={{
          textShadow: showCursor ? '0 0 8px currentColor' : 'none',
          filter: showCursor ? 'brightness(1.5)' : 'none'
        }}
      >
        |
      </span>
    </span>
  );
};