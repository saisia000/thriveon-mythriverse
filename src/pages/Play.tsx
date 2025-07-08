import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Users, Clock, User, Heart, Brain, Flower, Zap, Smile, ArrowRight, Info, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { VoiceManager } from '@/components/VoiceManager';

type HealingPath = 'mindplay' | 'heartplay' | 'soulplay' | 'moveplay' | 'joyplay';

interface GameSuggestion {
  name: string;
  icon: React.ElementType;
  duration: string;
  type: 'Solo' | 'Paired' | 'External';
  description: string;
}

interface PathSubcategory {
  name: string;
  icon: React.ElementType;
  games: GameSuggestion[];
}

const healingPaths = {
  mindplay: {
    name: 'MindPlay',
    icon: Brain,
    description: 'Cognitive Games',
    color: 'from-primary/20 to-accent/20',
    subcategories: [
      {
        name: 'Overthinking',
        icon: Brain,
        games: [
          { name: 'Thought Clouds', icon: Brain, duration: '3 min', type: 'Solo' as const, description: 'Release racing thoughts gently' },
          { name: 'Clarity Quest', icon: Brain, duration: '5 min', type: 'Paired' as const, description: 'Find focus together' }
        ]
      },
      {
        name: 'Chemo Brain',
        icon: Brain,
        games: [
          { name: 'Gentle Recall', icon: Brain, duration: '2 min', type: 'Solo' as const, description: 'Memory exercises that heal' },
          { name: 'Mind Mending', icon: Brain, duration: '4 min', type: 'Paired' as const, description: 'Cognitive support together' }
        ]
      },
      {
        name: 'Memory Lapses',
        icon: Brain,
        games: [
          { name: 'Memory Garden', icon: Brain, duration: '4 min', type: 'Solo' as const, description: 'Nurture memories like flowers' }
        ]
      }
    ]
  },
  heartplay: {
    name: 'HeartPlay',
    icon: Heart,
    description: 'Emotional Story Games',
    color: 'from-secondary/20 to-primary/20',
    subcategories: [
      {
        name: 'Grief',
        icon: Heart,
        games: [
          { name: 'Healing Waters', icon: Heart, duration: '6 min', type: 'Solo' as const, description: 'Let emotions flow safely' },
          { name: 'Shared Sorrow', icon: Heart, duration: '8 min', type: 'Paired' as const, description: 'Hold space together' }
        ]
      },
      {
        name: 'Feeling Invisible',
        icon: Heart,
        games: [
          { name: 'Light Within', icon: Heart, duration: '4 min', type: 'Solo' as const, description: 'Rediscover your radiance' },
          { name: 'Seen & Heard', icon: Heart, duration: '5 min', type: 'Paired' as const, description: 'Witness each other deeply' }
        ]
      },
      {
        name: 'Caregiver Guilt',
        icon: Heart,
        games: [
          { name: 'Self-Compassion Circle', icon: Heart, duration: '5 min', type: 'Solo' as const, description: 'Release the weight of guilt' }
        ]
      }
    ]
  },
  soulplay: {
    name: 'SoulPlay',
    icon: Flower,
    description: 'Calming Rituals',
    color: 'from-accent/20 to-primary/20',
    subcategories: [
      {
        name: 'Isolation',
        icon: Flower,
        games: [
          { name: 'Connection Web', icon: Flower, duration: '4 min', type: 'Solo' as const, description: 'Feel the invisible threads that bind us' },
          { name: 'Soul Bridge', icon: Flower, duration: '6 min', type: 'Paired' as const, description: 'Connect soul to soul' }
        ]
      },
      {
        name: 'Lack of Meaning',
        icon: Flower,
        games: [
          { name: 'Purpose Seed', icon: Flower, duration: '7 min', type: 'Solo' as const, description: 'Plant seeds of new meaning' }
        ]
      },
      {
        name: 'Forgiveness',
        icon: Flower,
        games: [
          { name: 'Release Ritual', icon: Flower, duration: '8 min', type: 'Solo' as const, description: 'Let go with love' }
        ]
      }
    ]
  },
  moveplay: {
    name: 'MovePlay',
    icon: Zap,
    description: 'Physical Activities',
    color: 'from-primary/20 to-secondary/20',
    subcategories: [
      {
        name: 'Guided Dance',
        icon: Zap,
        games: [
          { name: 'Healing Rhythms', icon: Zap, duration: '5 min', type: 'Solo' as const, description: 'Move your body, free your spirit' },
          { name: 'Dance Together', icon: Zap, duration: '7 min', type: 'Paired' as const, description: 'Flow in harmony' }
        ]
      },
      {
        name: 'Breathwork',
        icon: Zap,
        games: [
          { name: 'Breath of Life', icon: Zap, duration: '3 min', type: 'Solo' as const, description: 'Breathe in peace, breathe out pain' }
        ]
      },
      {
        name: 'Gentle Stretching',
        icon: Zap,
        games: [
          { name: 'Body Harmony', icon: Zap, duration: '6 min', type: 'Solo' as const, description: 'Stretch with loving kindness' }
        ]
      }
    ]
  },
  joyplay: {
    name: 'JoyPlay',
    icon: Smile,
    description: 'Social Fun & Memory Building',
    color: 'from-secondary/20 to-accent/20',
    subcategories: [
      {
        name: 'Music-based Joy',
        icon: Smile,
        games: [
          { name: 'Melody Memories', icon: Smile, duration: '4 min', type: 'Solo' as const, description: 'Songs that spark joy' },
          { name: 'Harmony Hearts', icon: Smile, duration: '6 min', type: 'Paired' as const, description: 'Create music together' }
        ]
      },
      {
        name: 'Light Puzzles',
        icon: Smile,
        games: [
          { name: 'Gentle Riddles', icon: Smile, duration: '3 min', type: 'Solo' as const, description: 'Playful brain teasers' }
        ]
      },
      {
        name: 'Laughter Therapy',
        icon: Smile,
        games: [
          { name: 'Joy Bubbles', icon: Smile, duration: '5 min', type: 'Paired' as const, description: 'Share laughter, multiply happiness' }
        ]
      }
    ]
  }
};

export default function Play() {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<HealingPath | null>(null);
  const [isPaired, setIsPaired] = useState(false);
  const [pairingStatus, setPairingStatus] = useState<'solo' | 'waiting' | 'paired'>('solo');

  // Get user name from localStorage
  const userName = localStorage.getItem('userName') || 'friend';

  const getRecommendedGames = (): GameSuggestion[] => {
    // Get user choices from chat to personalize recommendations
    const chatChoices = JSON.parse(sessionStorage.getItem('mythriChatChoices') || '[]');

    // Simple recommendation logic based on chat responses
    const allGames: GameSuggestion[] = [];
    Object.values(healingPaths).forEach(path => {
      path.subcategories.forEach(subcat => {
        allGames.push(...subcat.games);
      });
    });

    // Return first 3 games as recommendations (in real app, this would be AI-driven)
    return allGames.slice(0, 3);
  };

  const recommendedGames = getRecommendedGames();

  // Define suggested paths for personalization
  const suggestedPaths = ['mindplay', 'heartplay']; // AI picked these for the user

  // Personalized tooltips based on user's chat
  const getPersonalizedTooltip = (gameName: string, subcatName: string) => {
    const tooltips: { [key: string]: string } = {
      'Memory Garden': 'You mentioned memory lapses — this game helps boost recall',
      'Gentle Recall': 'Perfect for cognitive exercises after our chat about focus',
      'Healing Waters': 'You shared deep emotions — this helps process them safely',
      'Light Within': 'Based on your feelings, this will help restore confidence',
      'Self-Compassion Circle': 'You mentioned guilt — this releases that burden gently'
    };
    return tooltips[gameName] || `Recommended based on your healing journey so far`;
  };

  const renderPathGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {Object.entries(healingPaths).map(([key, path]) => {
        const isPersonalized = suggestedPaths.includes(key);
        return (
          <Card
            key={key}
            onClick={() => setSelectedPath(key as HealingPath)}
            className={`p-6 cursor-pointer group transition-all duration-magical animate-fade-in-up bg-gradient-to-br ${path.color} ${isPersonalized
                ? 'border-2 border-primary shadow-glow ring-4 ring-primary/20 animate-glow-pulse bg-primary/10 relative'
                : 'border-primary/20 hover:border-primary/40'
              } hover:shadow-glow`}
          >
            {/* AI Selected Badge */}
            {isPersonalized && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold animate-bounce z-10">
                ✨ AI SELECTED
              </div>
            )}

            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-4 rounded-full shadow-glow transition-all duration-magical ${isPersonalized
                  ? 'bg-gradient-mythri animate-glow-pulse'
                  : 'bg-gradient-mythri group-hover:animate-glow-pulse'
                }`}>
                <path.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{path.name}</h3>
                <p className="text-xs text-muted-foreground">{path.description}</p>
                {isPersonalized && (
                  <div className="flex items-center justify-center gap-1 mt-2 bg-primary/20 rounded-full px-3 py-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span className="text-sm text-primary font-bold">Picked for You</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );

  const renderSubcategories = () => {
    if (!selectedPath) return null;

    const path = healingPaths[selectedPath];

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            onClick={() => setSelectedPath(null)}
            variant="outline"
            size="sm"
            className="bg-background/80 border-primary/30"
          >
            ← Back to Paths
          </Button>
          <h2 className="text-2xl font-bold bg-gradient-mythri bg-clip-text text-transparent">
            {path.name} Healing Categories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {path.subcategories.map((subcat, index) => (
            <Card key={index} className="p-4 bg-gradient-to-br from-card to-card/50 border-primary/20 hover:shadow-glow transition-all duration-magical">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-mythri/20">
                    <subcat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{subcat.name}</h3>
                </div>

                <div className="space-y-2">
                  {subcat.games.map((game, gameIndex) => (
                    <div key={gameIndex} className="p-3 rounded-lg bg-background/50 border border-primary/10 hover:border-primary/30 transition-colors duration-gentle">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-foreground text-sm">{game.name}</h4>
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="h-3 w-3 text-muted-foreground hover:text-primary transition-colors" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs max-w-xs">{getPersonalizedTooltip(game.name, subcat.name)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {game.duration}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{game.description}</p>

                      {/* Personalization label */}
                      <div className="flex items-center gap-1 mb-2">
                        <CheckCircle className="h-3 w-3 text-secondary" />
                        <span className="text-xs text-secondary font-medium">Suggested by MyThri</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs rounded-full ${game.type === 'Solo' ? 'bg-primary/20 text-primary' :
                            game.type === 'Paired' ? 'bg-secondary/20 text-secondary' :
                              'bg-accent/20 text-accent'
                          }`}>
                          {game.type === 'Solo' ? <User className="h-3 w-3 inline mr-1" /> : <Users className="h-3 w-3 inline mr-1" />}
                          {game.type}
                        </span>
                        <Button size="sm" variant="outline" className="text-xs h-7">
                          Play Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderRecommendations = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <img
            src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
            alt="MyThri"
            className="h-6 w-6 animate-glow-pulse"
          />
          MyThri's Recommendations for You
        </h2>
        <VoiceManager
          text="Here are my personalized healing game recommendations for you based on our conversation"
          voiceId="9BWtsMINqrJLrRacOk9x"
          className="shrink-0"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedGames.map((game, index) => (
          <Card key={index} className="p-4 bg-gradient-gentle border-primary/20 hover:shadow-glow transition-all duration-magical">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-gradient-mythri/30">
                    <game.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground">{game.name}</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {game.duration}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{game.description}</p>

              {/* Personalization label */}
              <div className="flex items-center gap-1 mb-2">
                <CheckCircle className="h-3 w-3 text-primary" />
                <span className="text-xs text-primary font-medium">Picked for You</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded-full ${game.type === 'Solo' ? 'bg-primary/20 text-primary' :
                    game.type === 'Paired' ? 'bg-secondary/20 text-secondary' :
                      'bg-accent/20 text-accent'
                  }`}>
                  {game.type === 'Solo' ? <User className="h-3 w-3 inline mr-1" /> : <Users className="h-3 w-3 inline mr-1" />}
                  {game.type}
                </span>
                <Button size="sm" className="bg-gradient-mythri hover:shadow-glow">
                  Play Now <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPairingStatus = () => (
    <Card className="p-6 bg-gradient-to-r from-card to-card/80 border-primary/20 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${pairingStatus === 'paired' ? 'bg-secondary/20 animate-glow-pulse' : 'bg-muted/50'}`}>
            <Users className={`h-6 w-6 ${pairingStatus === 'paired' ? 'text-secondary' : 'text-muted-foreground'}`} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {pairingStatus === 'paired' ? 'Playing with Sarah (Caregiver)' :
                pairingStatus === 'waiting' ? 'Waiting for Loved One...' :
                  'Playing Solo Today'}
            </h3>
            <p className="text-sm text-muted-foreground">
              {pairingStatus === 'paired' ? 'Connected and ready to heal together' :
                pairingStatus === 'waiting' ? 'Tap to invite or match with AI Companion (Anira)' :
                  'Choose any game above to begin your healing journey'}
            </p>
          </div>
        </div>
        {pairingStatus !== 'paired' && (
          <Button
            variant="outline"
            onClick={() => setPairingStatus(pairingStatus === 'waiting' ? 'solo' : 'waiting')}
            className="bg-background/80 border-primary/30 hover:border-primary/50"
          >
            {pairingStatus === 'waiting' ? 'Cancel' : 'Find Partner'}
          </Button>
        )}
      </div>
    </Card>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* ... keep existing code (animated particles background) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-2 h-2 bg-primary/20 rounded-full animate-bounce" style={{ top: '20%', left: '10%', animationDelay: '0s' }} />
          <div className="absolute w-1 h-1 bg-accent/30 rounded-full animate-pulse" style={{ top: '40%', left: '80%', animationDelay: '1s' }} />
          <div className="absolute w-3 h-3 bg-primary/10 rounded-full animate-bounce" style={{ top: '60%', left: '15%', animationDelay: '2s' }} />
          <div className="absolute w-1 h-1 bg-accent/20 rounded-full animate-pulse" style={{ top: '80%', left: '70%', animationDelay: '3s' }} />
          <div className="absolute w-2 h-2 bg-primary/15 rounded-full animate-bounce" style={{ top: '30%', left: '60%', animationDelay: '1.5s' }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
          {/* ... keep existing code (theme toggle, header, main content, navigation) */}
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading text-5xl md:text-6xl font-bold bg-gradient-mythri bg-clip-text text-transparent mb-4">
              Your Healing Path
            </h1>

            {/* MyThri's Welcome Message */}
            <Card className="max-w-2xl mx-auto p-6 bg-gradient-mythri/10 border-primary/20 shadow-glow mb-6">
              <div className="flex items-start gap-4">
                <img
                  src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                  alt="MyThri"
                  className="h-12 w-12 animate-glow-pulse flex-shrink-0"
                />
                <div className="flex-1 text-left">
                  <p className="text-lg text-foreground leading-relaxed">
                    Welcome to your Healing Path, <span className="font-semibold text-primary">{userName}</span>.
                    I've picked a few soul-nudging quests just for you. Ready to begin?
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Pairing Status */}
            {renderPairingStatus()}

            {/* Recommendations */}
            {!selectedPath && renderRecommendations()}

            {/* Healing Paths or Subcategories */}
            {selectedPath ? renderSubcategories() : (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold bg-gradient-aurora bg-clip-text text-transparent mb-2">
                    Choose Your Healing Path
                  </h2>
                  <p className="text-muted-foreground">
                    Each journey opens different doors to your Innerverse
                  </p>
                </div>
                {renderPathGrid()}
              </>
            )}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}