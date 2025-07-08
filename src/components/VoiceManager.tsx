import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceManagerProps {
  text?: string;
  onVoiceInput?: (transcript: string) => void;
  autoSpeak?: boolean;
  voiceId?: string;
  className?: string;
}

export const VoiceManager = ({ 
  text, 
  onVoiceInput, 
  autoSpeak = false, 
  voiceId = '9BWtsMINqrJLrRacOk9x', // Aria voice 
  className = '' 
}: VoiceManagerProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [recognition, setRecognition] = useState<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  // Initialize API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('elevenlabs_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (onVoiceInput) {
          onVoiceInput(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice input error",
          description: "Could not capture voice input. Please try again.",
          variant: "destructive"
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [onVoiceInput, toast]);

  // Auto-speak when text changes
  useEffect(() => {
    if (autoSpeak && text && apiKey) {
      speakText(text);
    }
  }, [text, autoSpeak, apiKey]);

  const requestApiKey = () => {
    const key = prompt('Please enter your ElevenLabs API key to enable voice features:');
    if (key) {
      setApiKey(key);
      localStorage.setItem('elevenlabs_api_key', key);
      toast({
        title: "API key saved",
        description: "Voice features are now enabled!",
      });
    }
  };

  const speakText = async (textToSpeak: string) => {
    if (!apiKey) {
      requestApiKey();
      return;
    }

    try {
      setIsSpeaking(true);
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: textToSpeak,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.8,
            style: 0.2,
            use_speaker_boost: false
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.onended = () => {
            setIsSpeaking(false);
            URL.revokeObjectURL(audioUrl);
          };
          await audioRef.current.play();
        }
      } else {
        throw new Error('Failed to generate speech');
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      setIsSpeaking(false);
      toast({
        title: "Voice synthesis error",
        description: "Could not generate speech. Please check your API key.",
        variant: "destructive"
      });
    }
  };

  const startListening = () => {
    if (!recognition) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice input.",
        variant: "destructive"
      });
      return;
    }

    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const toggleSpeaking = () => {
    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsSpeaking(false);
      }
    } else if (text) {
      speakText(text);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Text-to-Speech Button */}
      {text && (
        <Button
          onClick={toggleSpeaking}
          variant="outline"
          size="sm"
          className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40"
          disabled={!text}
        >
          {isSpeaking ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      )}

      {/* Speech-to-Text Button */}
      {onVoiceInput && (
        <Button
          onClick={isListening ? stopListening : startListening}
          variant="outline"
          size="sm"
          className={`bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 ${
            isListening ? 'bg-red-500/20 border-red-500/40' : ''
          }`}
        >
          {isListening ? (
            <MicOff className="h-4 w-4 text-red-500" />
          ) : (
            <Mic className="h-4 w-4" />
          )}
        </Button>
      )}

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} />
    </div>
  );
};