import { useState, useEffect } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ConversationalAIProps {
  onMessage?: (message: any) => void;
  className?: string;
}

export const ConversationalAI = ({ onMessage, className = '' }: ConversationalAIProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [agentId, setAgentId] = useState<string>('');
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      toast({
        title: "Connected to MyThri",
        description: "Voice conversation is now active!",
      });
    },
    onDisconnect: () => {
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: "Voice conversation ended.",
      });
    },
    onMessage: (message) => {
      console.log('Conversation message:', message);
      if (onMessage) {
        onMessage(message);
      }
    },
    onError: (error) => {
      console.error('Conversation error:', error);
      toast({
        title: "Connection error",
        description: "Could not connect to voice AI. Please try again.",
        variant: "destructive"
      });
    }
  });

  useEffect(() => {
    // Request microphone permission on component mount
    const requestMicPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.error('Microphone permission denied:', error);
        toast({
          title: "Microphone access needed",
          description: "Please allow microphone access for voice conversations.",
          variant: "destructive"
        });
      }
    };

    requestMicPermission();
  }, [toast]);

  const startConversation = async () => {
    if (!agentId) {
      const id = prompt('Please enter your ElevenLabs Agent ID for voice conversations:');
      if (id) {
        setAgentId(id);
        localStorage.setItem('elevenlabs_agent_id', id);
      } else {
        return;
      }
    }

    try {
      await conversation.startSession({ agentId });
    } catch (error) {
      console.error('Failed to start conversation:', error);
      toast({
        title: "Connection failed",
        description: "Could not start voice conversation. Please check your Agent ID.",
        variant: "destructive"
      });
    }
  };

  const endConversation = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  };

  // Load saved agent ID
  useEffect(() => {
    const savedAgentId = localStorage.getItem('elevenlabs_agent_id');
    if (savedAgentId) {
      setAgentId(savedAgentId);
    }
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {!isConnected ? (
        <Button
          onClick={startConversation}
          className="bg-gradient-mythri hover:shadow-glow transition-all duration-magical"
        >
          <Phone className="h-4 w-4 mr-2" />
          Talk with MyThri
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-500/20 rounded-lg border border-green-500/30">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-500 font-medium">
              {conversation.isSpeaking ? 'MyThri is speaking...' : 'Listening...'}
            </span>
          </div>
          
          <Button
            onClick={endConversation}
            variant="destructive"
            size="sm"
          >
            <PhoneOff className="h-4 w-4 mr-2" />
            End Call
          </Button>
        </div>
      )}
    </div>
  );
};