import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { SingleTextTyping } from '@/components/SingleTextTyping';
import { ThemeToggle } from '@/components/ThemeToggle';
import { VoiceManager } from '@/components/VoiceManager';
import { ConversationalAI } from '@/components/ConversationalAI';

interface UserChoice {
  stepIndex: number;
  choice: string;
}

export default function Chat() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState<UserChoice[]>([]);
  const [shownMessages, setShownMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCurrentStep, setShowCurrentStep] = useState(false);
  const [showFinalButton, setShowFinalButton] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [currentMessageText, setCurrentMessageText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get user name from localStorage (assuming it's stored from profile)
  const userName = localStorage.getItem('userName') || 'friend';

  const chatFlow = [
    {
      text: `Welcome to your Innerverse, ${userName}! I'm MyThri, your magical healing guide. Ready to begin your first quest?`,
      options: []
    },
    {
      text: "First, let's attune to your inner world. What emotion is calling for attention today?",
      options: [
        "💙 Feeling lost and foggy",
        "⚡ Anxious energy coursing through me",
        "🌫️ Emotionally numb and disconnected",
        "✨ Actually feeling pretty balanced",
        "😴 Deeply tired from all the healing work"
      ]
    },
    {
      text: "🎯 Perfect. Now, what's your biggest quest challenge right now?",
      options: [
        "🛤️ My healing path feels uncertain",
        "🌊 I feel disconnected from others",
        "😰 I'm scared I'll never feel whole again",
        "🏔️ I'm navigating this journey alone",
        "💕 I want to support someone I love but don't know how"
      ]
    },
    {
      text: "🎮 Got it, brave soul. What type of healing magic calls to you?",
      options: [
        "🧠 Quick mind games that bring clarity",
        "💖 Deep emotional healing rituals",
        "🧩 Thoughtful puzzles that unlock insights",
        "👥 Connection quests with my loved ones"
      ]
    },
    {
      text: `🏆 Excellent, ${userName}. Your quest profile is complete! I've prepared a personalized healing journey just for you. Time to step into your power!`,
      options: []
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentStep, showCurrentStep]);

  useEffect(() => {
    // Start the chat flow
    showStep(0);
  }, []);

  const showStep = (stepIndex: number) => {
    if (stepIndex >= chatFlow.length) {
      // Show final message and button
      setShowFinalButton(true);
      return;
    }

    setIsTyping(true);
    setShowCurrentStep(false);

    // Simulate typing delay
    setTimeout(() => {
      setCurrentStep(stepIndex);
      setIsTyping(false);
      setShowCurrentStep(true);

      // Add this message to shown messages
      setShownMessages(prev => [...prev, stepIndex]);

      // If this step has no options, automatically progress to next step
      if (!chatFlow[stepIndex].options || chatFlow[stepIndex].options.length === 0) {
        setTimeout(() => {
          const nextStep = stepIndex + 1;
          if (nextStep >= chatFlow.length) {
            setShowFinalButton(true);
          } else {
            showStep(nextStep);
          }
        }, 2000); // Wait 2 seconds before auto-progressing
      }
    }, 1500);
  };

  const handleUserChoice = (choice: string) => {
    // Store user choice
    const newChoice = { stepIndex: currentStep, choice };
    const updatedChoices = [...userChoices, newChoice];
    setUserChoices(updatedChoices);
    setSelectedChoice(choice);

    // Store in sessionStorage
    sessionStorage.setItem('mythriChatChoices', JSON.stringify(updatedChoices));

    // Progress to next step
    const nextStep = currentStep + 1;

    // Check if we're at the end
    if (nextStep >= chatFlow.length) {
      // Show final message and button after a delay
      setTimeout(() => {
        setShowFinalButton(true);
      }, 1000);
    } else {
      // Continue to next message after a delay
      setTimeout(() => {
        showStep(nextStep);
      }, 1000);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    // Find closest matching option
    const currentMessage = chatFlow[currentStep];
    if (currentMessage.options && currentMessage.options.length > 0) {
      const bestMatch = currentMessage.options.find(option =>
        option.toLowerCase().includes(transcript.toLowerCase()) ||
        transcript.toLowerCase().includes(option.toLowerCase())
      );

      if (bestMatch) {
        handleUserChoice(bestMatch);
      } else {
        // Use the transcript as is if no close match found
        handleUserChoice(transcript);
      }
    }
  };

  const handleGoToPlay = () => {
    navigate('/play');
  };

  const currentMessage = chatFlow[currentStep];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
        <div className="absolute w-1 h-1 bg-accent/30 rounded-full animate-pulse" style={{ top: '40%', left: '80%', animationDelay: '1s' }} />
        <div className="absolute w-3 h-3 bg-primary/10 rounded-full animate-bounce" style={{ top: '60%', left: '15%', animationDelay: '2s' }} />
        <div className="absolute w-1 h-1 bg-accent/20 rounded-full animate-pulse" style={{ top: '80%', left: '70%', animationDelay: '3s' }} />
        <div className="absolute w-2 h-2 bg-primary/15 rounded-full animate-bounce" style={{ top: '30%', left: '60%', animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-5xl md:text-6xl font-bold bg-gradient-mythri bg-clip-text text-transparent mb-4">
            🎮 Your Healing Quest Begins
          </h1>
          <p className="text-muted-foreground text-xl md:text-2xl font-body">
            MyThri is ready to guide you into your Innerverse...
          </p>

          {/* Voice AI Toggle */}
          <div className="mt-4 flex justify-center">
            <ConversationalAI
              onMessage={(msg) => console.log('AI Message:', msg)}
              className="mb-4"
            />
          </div>

          {/* MyThri character with quest energy */}
          <div className="mt-6 flex justify-center">
            <div className="relative">
              <img
                src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                alt="MyThri"
                className="h-16 w-16 animate-glow-pulse"
                style={{
                  filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.4))',
                }}
              />
              {/* Magic sparkles around MyThri */}
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="absolute top-1/2 -right-2 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Chat Content */}
        <div className="space-y-6 mb-6">
          {/* Show all previous messages */}
          {shownMessages.filter(stepIndex => stepIndex < currentStep).map((stepIndex, index) => {
            const userChoice = userChoices.find(choice => choice.stepIndex === stepIndex);
            return (
              <div key={`prev-${stepIndex}`} className="space-y-4">
                {/* MyThri's message */}
                <div className="flex justify-start">
                  <Card className="max-w-[80%] p-4 bg-gradient-mythri/10 border-primary/20 shadow-glow">
                    <div className="flex items-start gap-3">
                      <img
                        src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                        alt="MyThri"
                        className="h-6 w-6 flex-shrink-0 mt-1"
                      />
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{chatFlow[stepIndex].text}</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* User's response (if they made a choice) */}
                {userChoice && (
                  <div className="flex justify-end">
                    <Card className="max-w-[80%] p-4 bg-card border-accent/30">
                      <p className="text-sm leading-relaxed">{userChoice.choice}</p>
                    </Card>
                  </div>
                )}
              </div>
            );
          })}

          {/* Current step */}
          {showCurrentStep && !showFinalButton && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-4 animate-fade-in-up bg-gradient-mythri/10 border-primary/20 shadow-glow">
                <div className="flex items-start gap-3">
                  <img
                    src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                    alt="MyThri"
                    className="h-6 w-6 flex-shrink-0 mt-1"
                  />
                  <div className="flex-1">
                    <SingleTextTyping
                      text={currentMessage.text}
                      speed={30}
                      onComplete={(text) => setCurrentMessageText(text)}
                    />

                    {/* Voice controls for MyThri's message */}
                    <div className="mt-2">
                      <VoiceManager
                        text={currentMessageText}
                        voiceId="9BWtsMINqrJLrRacOk9x" // Aria voice for MyThri
                        className="justify-start"
                      />
                    </div>

                    {/* Show dropdown for options */}
                    {currentMessage.options && currentMessage.options.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <Select onValueChange={handleUserChoice}>
                          <SelectTrigger className="bg-background/80 border-primary/30 focus:border-primary z-50">
                            <SelectValue placeholder="Choose your response..." />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-primary/20 z-50">
                            {currentMessage.options.map((option, optionIndex) => (
                              <SelectItem key={optionIndex} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Voice input for user response */}
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Or speak your response:</span>
                          <VoiceManager
                            onVoiceInput={handleVoiceInput}
                            className="justify-start"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <Card className="bg-gradient-mythri/10 border-primary/20 shadow-glow p-4 animate-fade-in-up">
                <div className="flex items-center gap-3">
                  <img
                    src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                    alt="MyThri"
                    className="h-6 w-6"
                  />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Final message and button */}
          {showFinalButton && (
            <>
              <div className="flex justify-start">
                <Card className="max-w-[80%] p-4 animate-fade-in-up bg-gradient-mythri/10 border-primary/20 shadow-glow">
                  <div className="flex items-start gap-3">
                    <img
                      src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                      alt="MyThri"
                      className="h-6 w-6 flex-shrink-0 mt-1"
                    />
                    <div className="flex-1">
                      <SingleTextTyping
                        text="🎮 Quest Complete! Your healing adventure begins now..."
                        speed={30}
                        onComplete={(text) => setCurrentMessageText(text)}
                      />

                      {/* Voice for final message */}
                      <div className="mt-2">
                        <VoiceManager
                          text="Quest Complete! Your healing adventure begins now..."
                          voiceId="9BWtsMINqrJLrRacOk9x"
                          autoSpeak={true}
                          className="justify-start"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="text-center animate-fade-in-up mt-6">
                <Button
                  onClick={handleGoToPlay}
                  className="bg-gradient-mythri hover:shadow-glow transition-all duration-magical px-8 py-3 text-lg font-heading animate-glow-pulse"
                >
                  🚀 Enter Your Innerverse!
                </Button>
                <p className="text-sm text-muted-foreground mt-2 font-typewriter">
                  Your personalized healing games await...
                </p>
              </div>
            </>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}