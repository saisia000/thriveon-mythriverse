import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface TuningOption {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const emotionalOptions: TuningOption[] = [
  { id: 'heart-vine', label: 'Heart-Vine', icon: '/uploads/9e3fd665-681c-4efa-be32-19fcb97c8f20.png', description: 'Heart connection and growth' },
  { id: 'flower', label: 'Flower', icon: '/uploads/8b395b49-a0f1-46ec-b30d-be0b0e3dfba3.png', description: 'Blooming and renewal' },
  { id: 'teardrop', label: 'Teardrop', icon: '/uploads/7e5580ea-b182-4e11-bf04-2fd5a9813b27.png', description: 'Release and cleansing' },
];

const energyOptions: TuningOption[] = [
  { id: 'leaf', label: 'Leaf', icon: '/uploads/886a65c4-adfd-4b69-a8e8-6443e0ce9209.png', description: 'Natural gentle flow' },
  { id: 'feather', label: 'Feather', icon: '/uploads/59759139-7361-44e1-9495-daf056220de3.png', description: 'Light and uplifting' },
  { id: 'crystal', label: 'Crystal', icon: '/uploads/a9900359-be23-4aa8-b441-1ae4df51a70b.png', description: 'Focused clarity' },
];

const timeOptions: TuningOption[] = [
  { id: 'book', label: 'Book', icon: '/uploads/a4c4c211-655a-4fe2-8ed2-cbafbffdd458.png', description: 'Wisdom and learning' },
  { id: 'hourglass', label: 'Hourglass', icon: '/uploads/59759139-7361-44e1-9495-daf056220de3.png', description: 'Present moment' },
  { id: 'moon', label: 'Moon', icon: '/uploads/8b395b49-a0f1-46ec-b30d-be0b0e3dfba3.png', description: 'Cyclical healing' },
];

export const TuningMeter = () => {
  const [selectedEmotional, setSelectedEmotional] = useState<string>('');
  const [selectedEnergy, setSelectedEnergy] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const handleTune = () => {
    console.log('Tuning to:', { selectedEmotional, selectedEnergy, selectedTime });
  };

  const renderConstellation = (options: TuningOption[], selected: string, onSelect: (id: string) => void, title: string) => (
    <div className="text-center space-y-8 px-6">
      <h4 className="font-astron text-lg text-foreground tracking-wide">{title}</h4>
      <div className="relative min-h-[320px] flex justify-center items-center">
        <div className="relative w-full max-w-[400px]">
          {options.map((option, index) => {
            const isSelected = selected === option.id;
            // Better constellation positioning with proper separation
            const positions = [
              { x: -120, y: -60 },  // Top left
              { x: 120, y: -30 },   // Top right  
              { x: 0, y: 80 }       // Bottom center
            ];
            const position = positions[index] || { x: 0, y: 0 };

            return (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`absolute transition-all duration-magical hover:scale-110 p-0 border-0 bg-transparent group ${isSelected ? 'z-10' : 'z-0'
                  }`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) ${isSelected ? 'scale(1.15)' : ''}`,
                }}
                title={option.description}
              >
                {/* Background glow */}
                <div className={`absolute inset-0 rounded-full transition-all duration-magical ${isSelected
                    ? 'bg-gradient-mythri opacity-50 blur-xl scale-150 animate-glow-pulse dark:opacity-60'
                    : 'bg-gradient-gentle opacity-0 group-hover:opacity-30 group-hover:dark:opacity-40 blur-lg scale-125'
                  }`}></div>

                {/* Widget background */}
                <div className={`absolute inset-0 rounded-full transition-all duration-magical ${isSelected
                    ? 'bg-gradient-mythri/20 dark:bg-gradient-mythri/30 backdrop-blur-sm border-2 border-primary/40 dark:border-primary/60'
                    : 'bg-gradient-gentle/8 dark:bg-gradient-gentle/15 group-hover:bg-gradient-mythri/10 group-hover:dark:bg-gradient-mythri/20 border border-primary/15 group-hover:border-primary/30 dark:border-primary/25 group-hover:dark:border-primary/50'
                  }`}></div>

                <img
                  src={option.icon}
                  alt={option.label}
                  className={`relative z-10 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 object-contain transition-all duration-magical
                    ${isSelected
                      ? 'drop-shadow-2xl filter brightness-150 saturate-150 contrast-110'
                      : 'filter brightness-110 saturate-120 opacity-85 group-hover:brightness-140 group-hover:saturate-140 group-hover:opacity-100 group-hover:drop-shadow-xl'
                    }
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const isComplete = selectedEmotional && selectedEnergy && selectedTime;

  return (
    <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
      <div className="text-center space-y-2">
        <h3 className="font-astron text-2xl md:text-3xl text-foreground tracking-wide">ATTUNE YOUR INNERVERSE</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        {renderConstellation(emotionalOptions, selectedEmotional, setSelectedEmotional, "EMOTIONAL STATE")}
        {renderConstellation(energyOptions, selectedEnergy, setSelectedEnergy, "ENERGY LEVEL")}
        {renderConstellation(timeOptions, selectedTime, setSelectedTime, "SACRED TIME")}
      </div>

      {isComplete && (
        <div className="text-center animate-fade-in-up">
          <Button
            onClick={handleTune}
            className="font-xirod px-8 py-3 bg-gradient-mythri hover:shadow-magical transition-all duration-magical"
          >
            Begin Your Journey
          </Button>
        </div>
      )}
    </div>
  );
};