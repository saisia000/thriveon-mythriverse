import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Companion = 'sanyan' | 'anira';

interface CompanionSelectorProps {
  onCompanionChange: (companion: Companion) => void;
  className?: string;
}

export const CompanionSelector = ({ onCompanionChange, className = '' }: CompanionSelectorProps) => {
  const [selectedCompanion, setSelectedCompanion] = useState<Companion>('sanyan');

  const companions = {
    sanyan: {
      name: 'Sanyan',
      description: 'Gentle wisdom keeper, guides through emotional healing',
      traits: ['Empathetic', 'Nurturing', 'Intuitive'],
      image: '🌸',
      color: 'from-primary/20 to-primary/10 bg-primary/5'
    },
    anira: {
      name: 'Anira',
      description: 'Strength companion, empowers through challenges',
      traits: ['Courageous', 'Motivating', 'Resilient'],
      image: '⚡',
      color: 'from-secondary/20 to-secondary/10 bg-secondary/5'
    }
  };

  const handleCompanionSelect = (companion: Companion) => {
    setSelectedCompanion(companion);
    onCompanionChange(companion);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="font-heading text-xl font-bold text-center text-foreground">
        Choose Your Healing Companion
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {Object.entries(companions).map(([key, companion]) => (
          <Card
            key={key}
            className={`p-6 cursor-pointer transition-all duration-magical hover:shadow-glow border-2 ${
              selectedCompanion === key 
                ? 'border-primary shadow-glow bg-gradient-to-br ' + companion.color 
                : 'border-primary/20 hover:border-primary/40'
            }`}
            onClick={() => handleCompanionSelect(key as Companion)}
          >
            <div className="text-center space-y-3">
              <div className="text-4xl">{companion.image}</div>
              <h4 className="font-heading text-lg font-bold text-foreground">
                {companion.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {companion.description}
              </p>
               <div className="flex flex-wrap gap-2 justify-center">
                 {companion.traits.map((trait) => (
                   <span
                     key={trait}
                     className={`px-2 py-1 rounded-full text-xs ${
                       key === 'sanyan' 
                         ? 'bg-primary/10 text-primary' 
                         : 'bg-secondary/10 text-secondary'
                     }`}
                   >
                     {trait}
                   </span>
                 ))}
               </div>
              {selectedCompanion === key && (
                <div className="mt-3">
                  <span className="text-sm font-medium text-primary">
                    ✓ Selected
                  </span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};