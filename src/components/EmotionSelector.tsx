import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type Emotion = 'neutral' | 'joy' | 'sadness' | 'anxiety' | 'calm' | 'love';

interface EmotionSelectorProps {
  onEmotionChange: (emotion: Emotion) => void;
}

const emotions: { value: Emotion; label: string; description: string }[] = [
  { value: 'neutral', label: 'Neutral', description: 'Balanced state' },
  { value: 'joy', label: 'Joy', description: 'Warm and uplifting' },
  { value: 'sadness', label: 'Sadness', description: 'Cool and gentle' },
  { value: 'anxiety', label: 'Anxiety', description: 'Purple and soothing' },
  { value: 'calm', label: 'Calm', description: 'Serene blues and greens' },
  { value: 'love', label: 'Love', description: 'Warm pink and rose' },
];

export const EmotionSelector = ({ onEmotionChange }: EmotionSelectorProps) => {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion>('neutral');

  const handleEmotionChange = (emotion: Emotion) => {
    setSelectedEmotion(emotion);
    onEmotionChange(emotion);
  };

  return (
    <div className="fixed top-20 right-4 z-50 bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-primary/20 shadow-glow">
      <div className="space-y-2">
        <label className="text-sm font-mystical text-muted-foreground">
          Current Mood
        </label>
        <Select value={selectedEmotion} onValueChange={handleEmotionChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {emotions.map((emotion) => (
              <SelectItem key={emotion.value} value={emotion.value}>
                <div>
                  <div className="font-medium">{emotion.label}</div>
                  <div className="text-xs text-muted-foreground">{emotion.description}</div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};