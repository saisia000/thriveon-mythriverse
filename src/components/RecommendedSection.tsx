import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollReveal } from '@/components/ScrollReveal';
import { Sparkles, Play, UserPlus, Heart } from 'lucide-react';

interface RecommendedSectionProps {
  userState?: string;
  currentEmotion?: string;
  lovedOneName?: string;
}

export function RecommendedSection({ 
  userState = 'California',
  currentEmotion = 'calm',
  lovedOneName = 'Mahi'
}: RecommendedSectionProps) {
  const [impactPercentage, setImpactPercentage] = useState(0);

  // Animated counting effect for the impact percentage
  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const target = 72;
      const increment = target / 30;
      
      const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
          setImpactPercentage(target);
          clearInterval(counter);
        } else {
          setImpactPercentage(Math.floor(current));
        }
      }, 50);
      
      return () => clearInterval(counter);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollReveal delay={600}>
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-mythri bg-clip-text text-transparent">
            Recommended For You
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-2xl mx-auto">
            Personalized healing paths crafted just for your journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* 1. State-Based Healing Impact Widget */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 hover:border-primary/40 transition-all duration-magical hover:shadow-glow cursor-pointer">
            <CardContent className="p-6 space-y-4">
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-5 transition-opacity duration-magical"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{userState.slice(0, 2).toUpperCase()}</span>
                  </div>
                  <h3 className="font-heading text-xl text-foreground">In Your State...</h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Survivors in <span className="font-semibold text-primary">{userState}</span> saw
                  </p>
                  
                  <div className="text-center space-y-2">
                    <div className="text-4xl font-bold bg-gradient-mythri bg-clip-text text-transparent animate-magical-shimmer bg-[length:200%_100%]">
                      {impactPercentage}%
                    </div>
                    <p className="text-sm text-muted-foreground">more calm after playing</p>
                    <div className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium inline-block">
                      🌟 Breath of Light
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Emotion-Based Quest Suggestion Widget */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20 hover:border-secondary/40 transition-all duration-magical hover:shadow-glow cursor-pointer">
            <CardContent className="p-6 space-y-4">
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-5 transition-opacity duration-magical"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                  <h3 className="font-heading text-xl text-foreground">Based on Your Journey...</h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-muted-foreground">
                    Based on your recent <span className="font-semibold text-secondary">{currentEmotion}</span> energy, we recommend:
                  </p>
                  
                  <div className="bg-gradient-to-r from-accent/20 to-secondary/20 rounded-lg p-4 border border-accent/30 hover:shadow-embossed transition-all duration-magical">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-accent/30 rounded-full flex items-center justify-center">
                        🧠
                      </div>
                      <span className="font-bold text-foreground">The Breathwork Mirror</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs">🧠 Cognitive</span>
                      <span className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs">❤️ Emotional</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-mythri hover:bg-gradient-mythri/90 text-slate-800 font-medium shadow-glow hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-magical group"
                    >
                      <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                      Play Now
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 3. Loved-One Match Recommendation Widget */}
          <Card className="group relative overflow-hidden bg-gradient-to-br from-accent/10 to-primary/10 border-accent/20 hover:border-accent/40 transition-all duration-magical hover:shadow-glow cursor-pointer">
            <CardContent className="p-6 space-y-4">
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-5 transition-opacity duration-magical"></div>
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-accent animate-pulse" />
                  <h3 className="font-heading text-xl text-foreground">Your Emotional Ally Awaits</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Your sister <span className="font-semibold text-accent">{lovedOneName}</span> recently completed Joy Bloom.
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4">
                    {/* User Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-mythri rounded-full flex items-center justify-center text-slate-800 font-bold shadow-glow">
                        You
                      </div>
                    </div>
                    
                    {/* Animated Connection Line */}
                    <div className="flex-1 relative">
                      <div className="h-0.5 bg-gradient-to-r from-primary via-accent to-secondary animate-pulse"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-accent rounded-full animate-bounce shadow-glow"></div>
                      </div>
                    </div>
                    
                    {/* Loved One Avatar */}
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-accent/80 to-secondary/80 rounded-full flex items-center justify-center text-white font-bold shadow-glow">
                        {lovedOneName.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90 text-white font-medium shadow-glow hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)] transition-all duration-magical group"
                  >
                    <UserPlus className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    Invite to Play
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating magical particles */}
        <div className="relative overflow-hidden pointer-events-none h-16">
          <div className="absolute w-1 h-1 bg-primary/40 rounded-full animate-bounce" style={{ top: '20%', left: '10%', animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute w-2 h-2 bg-accent/30 rounded-full animate-pulse" style={{ top: '60%', left: '80%', animationDelay: '1s', animationDuration: '2s' }} />
          <div className="absolute w-1 h-1 bg-secondary/50 rounded-full animate-bounce" style={{ top: '40%', left: '50%', animationDelay: '2s', animationDuration: '4s' }} />
        </div>
      </div>
    </ScrollReveal>
  );
}