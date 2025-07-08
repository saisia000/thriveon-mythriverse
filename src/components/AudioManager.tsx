import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import type { Emotion } from './EmotionSelector';

interface AudioManagerProps {
  currentEmotion: Emotion;
  className?: string;
}

export const AudioManager = ({ currentEmotion, className = '' }: AudioManagerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);

  // Ambient sound themes for each emotion
  const emotionSounds = {
    neutral: 'Gentle breathing sounds with soft ambient tones',
    joy: 'Light, uplifting melody with gentle chimes',
    sadness: 'Soft rain sounds with gentle piano notes',
    anxiety: 'Deep breathing guide with calming nature sounds',
    calm: 'Ocean waves with soft meditation bells',
    love: 'Warm, gentle heartbeat rhythm with soft strings'
  };

  const generateAmbientAudio = async (emotion: Emotion) => {
    if (!apiKey) {
      // Show API key input
      const key = prompt('Please enter your ElevenLabs API key to enable background audio:');
      if (key) {
        setApiKey(key);
        localStorage.setItem('elevenlabs_api_key', key);
      }
      return;
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: emotionSounds[emotion],
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.9,
            similarity_boost: 0.8,
            style: 0.1,
            use_speaker_boost: false
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.volume = 0.3; // Gentle background volume
          audioRef.current.loop = true;
        }
      }
    } catch (error) {
      console.error('Audio generation failed:', error);
    }
  };

  useEffect(() => {
    const savedKey = localStorage.getItem('elevenlabs_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  useEffect(() => {
    if (isPlaying && apiKey) {
      generateAmbientAudio(currentEmotion);
    }
  }, [currentEmotion, isPlaying, apiKey]);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (apiKey) {
        generateAmbientAudio(currentEmotion).then(() => {
          audioRef.current?.play();
          setIsPlaying(true);
        });
      } else {
        generateAmbientAudio(currentEmotion);
      }
    }
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Button
        onClick={toggleAudio}
        variant="outline"
        size="sm"
        className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 shadow-glow"
      >
        {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        <span className="ml-2 text-sm">
          {isPlaying ? 'Mute' : 'Ambient'}
        </span>
      </Button>
      <audio ref={audioRef} />
    </div>
  );
};