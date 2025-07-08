import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ScrollReveal';
import { VoiceManager } from '@/components/VoiceManager';
import { Save, Send } from 'lucide-react';

interface MemoryCapsuleProps {
  reflection?: string;
  daysAgo?: number;
  isAvailable?: boolean;
}

export function MemoryCapsule({
  reflection = "Stormy Sky",
  daysAgo = 7,
  isAvailable = true
}: MemoryCapsuleProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isAvailable) {
    return null;
  }

  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <ScrollReveal delay={800}>
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="font-heading text-3xl md:text-4xl font-bold bg-gradient-mythri bg-clip-text text-transparent">
            Whispers from the Past
          </h2>
          <p className="text-muted-foreground text-lg font-mystical max-w-2xl mx-auto">
            Time has a way of returning our words to us when we need them most
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40 transition-all duration-magical hover:shadow-glow">
            <CardContent className="p-8 space-y-6">
              {/* Floating magical particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse" style={{ top: '20%', left: '15%', animationDelay: '0s', animationDuration: '3s' }} />
                <div className="absolute w-2 h-2 bg-accent/20 rounded-full animate-bounce" style={{ top: '70%', left: '85%', animationDelay: '1s', animationDuration: '4s' }} />
                <div className="absolute w-1 h-1 bg-secondary/40 rounded-full animate-pulse" style={{ top: '40%', left: '10%', animationDelay: '2s', animationDuration: '2.5s' }} />
              </div>

              <div className="relative z-10">
                {!isRevealed ? (
                  <div
                    className="text-center space-y-6 cursor-pointer group"
                    onClick={handleReveal}
                  >
                    {/* MyThri on Scroll */}
                    <div className="relative inline-block">
                      <div className="relative">
                        <img
                          src="/uploads/d1fa7744-e7cd-4e3e-ad0a-4203845f546e.png"
                          alt="MyThri on mystical scroll"
                          className="w-32 h-auto mx-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-magical animate-breathe"
                          style={{ filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.4))' }}
                        />
                        {/* Glow effect behind scroll */}
                        <div className="absolute inset-0 bg-gradient-mythri opacity-20 rounded-full blur-xl animate-pulse"></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-mystical text-2xl text-foreground animate-magical-shimmer bg-gradient-mythri bg-clip-text text-transparent bg-[length:200%_100%]">
                        A Whisper Has Returned...
                      </h3>
                      <p className="text-muted-foreground font-typewriter">
                        Click to unveil what your heart once shared
                      </p>

                      {/* Sparkle animation hint */}
                      <div className="flex justify-center">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                              style={{
                                animationDelay: `${i * 0.3}s`,
                                animationDuration: '1.5s'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in">
                    {/* Revealed Memory */}
                    <div className="text-center space-y-4">
                      <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
                        <span className="text-sm text-primary font-medium">
                          You wrote this {daysAgo} days ago
                        </span>
                      </div>

                      <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl p-6 border border-primary/20 shadow-embossed">
                        <blockquote className="text-2xl font-mystical text-foreground italic">
                          "{reflection}"
                        </blockquote>
                      </div>
                    </div>

                    {/* MyThri Voice Playback */}
                    <div className="flex justify-center">
                      <div className="flex items-center gap-3 bg-gradient-mythri/10 rounded-full px-6 py-3 border border-primary/30 hover:shadow-glow transition-all duration-magical">
                        <img
                          src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                          alt="MyThri"
                          className="h-8 w-8 animate-glow-pulse flex-shrink-0 shadow-embossed rounded-full"
                        />
                        <span className="text-sm text-muted-foreground font-typewriter">
                          Hear your whisper through MyThri
                        </span>
                        <VoiceManager
                          text={reflection}
                          voiceId="9BWtsMINqrJLrRacOk9x"
                          className="shrink-0"
                        />
                      </div>
                    </div>

                    {/* Reaction Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button
                        variant="outline"
                        className="group bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/30 hover:border-secondary/50 text-foreground font-typewriter hover:shadow-glow transition-all duration-magical"
                      >
                        <Save className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        Save this moment
                      </Button>

                      <Button
                        variant="outline"
                        className="group bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30 hover:border-primary/50 text-foreground font-typewriter hover:shadow-glow transition-all duration-magical"
                      >
                        <Send className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        Send to future self
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollReveal>
  );
}