import React from 'react';
import { Brain, Heart, Flower, Zap, Smile, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GameCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  mythriIntro: string;
  color: string;
}

const gameCategories: GameCategory[] = [
  {
    id: 'mindplay',
    name: 'MindPlay',
    icon: Brain,
    description: 'Cognitive Games',
    mythriIntro: "Let's gentle your mind with puzzles that heal and expand...",
    color: 'from-purple-500/20 to-blue-500/20'
  },
  {
    id: 'heartplay',
    name: 'HeartPlay', 
    icon: Heart,
    description: 'Emotional Story Games',
    mythriIntro: "Your heart carries stories waiting to unfold into wisdom...",
    color: 'from-pink-500/20 to-red-500/20'
  },
  {
    id: 'soulplay',
    name: 'SoulPlay',
    icon: Flower,
    description: 'Calming Rituals',
    mythriIntro: "The soul knows how to breathe. Let's remember together...",
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'moveplay',
    name: 'MovePlay',
    icon: Zap,
    description: 'Physical Activities',
    mythriIntro: "Your body is the temple where healing happens. Let's honor it...",
    color: 'from-orange-500/20 to-yellow-500/20'
  },
  {
    id: 'joyplay',
    name: 'JoyPlay',
    icon: Smile,
    description: 'Social Fun & Memory Building',
    mythriIntro: "Joy multiplies when shared. Let's create moments that sparkle...",
    color: 'from-cyan-500/20 to-teal-500/20'
  }
];

export function GameCategories() {
  return (
    <div className="space-y-6">
      <div className="text-center animate-fade-in-up">
        <h2 className="text-2xl font-bold bg-gradient-aurora bg-clip-text text-transparent mb-2">
          Choose Your Healing Path
        </h2>
        <p className="text-muted-foreground">
          Each journey opens different doors to your Innerverse
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gameCategories.map((category, index) => (
          <Card 
            key={category.id}
            className={`p-6 border-primary/20 hover:shadow-magical transition-all duration-magical cursor-pointer group animate-fade-in-up bg-gradient-to-br ${category.color}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 rounded-full bg-gradient-mythri shadow-glow group-hover:animate-breathe transition-all duration-magical">
                <category.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </div>

              <div className="bg-card/50 rounded-lg p-3 border border-primary/10">
                <p className="text-xs italic text-foreground/80 mb-3">
                  MyThri whispers: "{category.mythriIntro}"
                </p>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full bg-muted/50 border-primary/20 hover:bg-primary/10 transition-all duration-gentle"
                  disabled
                >
                  <Lock className="h-3 w-3 mr-2" />
                  Adventure unlocking soon...
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}