import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  sender: 'user' | 'mythri';
  text: string;
  timestamp: Date;
}

const mythriResponses = [
  "My brave soul... The Innerverse just whispered a challenge. You have 2 minutes. No rush... just presence.",
  "Time's up... but magic still moved. Not every spark has to blaze. Some just flicker quietly and heal.",
  "I noticed your steps left the house today. Did the breeze feel like a hug?",
  "You're still here. That's sacred.",
  "No blame. Just curiosity. What pulled you away?",
  "Let's try again, together. I'll be here — even in silence.",
  "The healing doesn't always roar. Sometimes it whispers. Sometimes it just breathes.",
  "Your heart carried you this far. Trust it to carry you further.",
  "Even the moon takes breaks behind clouds. Rest is part of the rhythm.",
  "I see the light flickering in you, even when you don't."
];

export function MyThri() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'mythri',
      text: "My brave souls... welcome to the Innerverse. I am MyThri, your gentle guide through this healing journey. What brings you to me today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate MyThri response
    setTimeout(() => {
      const mythriMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'mythri',
        text: mythriResponses[Math.floor(Math.random() * mythriResponses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, mythriMessage]);
    }, 1500);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-96 bg-gradient-gentle rounded-xl border border-primary/20 overflow-hidden">
      <div className="bg-gradient-mythri p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-primary-foreground">
          <img src="/uploads/82aa633c-860c-42eb-b204-417350adfa5b.png" alt="MyThri" className="h-6 w-6 animate-glow-pulse" />
          <h3 className="font-semibold">MyThri • Your Healing Guide</h3>
          <img src="/uploads/82aa633c-860c-42eb-b204-417350adfa5b.png" alt="MyThri" className="h-6 w-6 animate-glow-pulse" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] p-3 animate-fade-in-up ${message.sender === 'mythri'
                ? 'bg-gradient-mythri text-primary-foreground'
                : 'bg-card'
              }`}>
              {message.sender === 'mythri' && (
                <div className="flex items-start gap-2">
                  <img src="/uploads/82aa633c-860c-42eb-b204-417350adfa5b.png" alt="MyThri" className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              )}
              {message.sender === 'user' && (
                <p className="text-sm leading-relaxed">{message.text}</p>
              )}
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-primary/20">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your heart..."
            className="bg-background/50 border-primary/20 focus:border-primary transition-all duration-gentle"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="bg-gradient-mythri hover:shadow-glow transition-all duration-magical"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}