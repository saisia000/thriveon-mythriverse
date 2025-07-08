import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TypingEffect } from '@/components/TypingEffect';
import { ScrollTypingEffect } from '@/components/ScrollTypingEffect';
import MyProfile from '@/components/MyProfile';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { EmotionSelector, type Emotion } from '@/components/EmotionSelector';
import { BadgeSystem } from '@/components/BadgeSystem';
import { AudioManager } from '@/components/AudioManager';
import { CompanionSelector } from '@/components/CompanionSelector';
import { VoiceManager } from '@/components/VoiceManager';
import { RecommendedSection } from '@/components/RecommendedSection';
import { MemoryCapsule } from '@/components/MemoryCapsule';


type ActiveView = 'welcome' | 'profile' | 'games' | 'kpis';

const Index = () => {
  const [activeView, setActiveView] = useState<ActiveView>('welcome');
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('neutral');
  const [selectedCompanion, setSelectedCompanion] = useState<'sanyan' | 'anira'>('sanyan');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check for URL parameters to show specific views
  useEffect(() => {
    const view = searchParams.get('view');
    if (view === 'report') {
      setActiveView('kpis');
    } else if (view === 'profile') {
      setActiveView('profile');
    }
  }, [searchParams]);

  const views: ActiveView[] = ['welcome', 'profile', 'games', 'kpis'];

  const getCurrentViewIndex = () => views.indexOf(activeView);

  const getPreviousView = (): ActiveView | null => {
    const currentIndex = getCurrentViewIndex();
    return currentIndex > 0 ? views[currentIndex - 1] : null;
  };

  const getNextView = (): ActiveView | null => {
    const currentIndex = getCurrentViewIndex();
    if (currentIndex < views.length - 1) {
      return views[currentIndex + 1];
    }
    return null; // No next view after last
  };

  const getEmotionalGradient = () => {
    switch (currentEmotion) {
      case 'joy': return 'bg-gradient-joy';
      case 'sadness': return 'bg-gradient-sadness';
      case 'anxiety': return 'bg-gradient-anxiety';
      case 'calm': return 'bg-gradient-calm';
      case 'love': return 'bg-gradient-love';
      default: return 'bg-gradient-aurora';
    }
  };

  const handlePrevious = () => {
    const prev = getPreviousView();
    if (prev) {
      setActiveView(prev);
    }
  };

  const handleNext = () => {
    const next = getNextView();
    if (next) {
      setActiveView(next);
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'profile':
        return (
          <MyProfile onComplete={() => navigate('/chat')} />
        );
      case 'games':
        return (
          <div className="max-w-2xl mx-auto text-center py-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Play</h2>
            <p className="text-muted-foreground">Healing games coming soon...</p>
          </div>
        );
      case 'kpis':
        return (
          <div className="min-h-screen space-y-12 pb-16">
            {/* Top Header */}
            <ScrollReveal>
              <div className="text-center space-y-4 pt-8">
                <h1 className={`font-heading text-6xl md:text-7xl font-bold ${getEmotionalGradient()} bg-clip-text text-transparent`}>
                  My Innerverse Report Card
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-body">
                  Track your healing magic and discover your journey milestones
                </p>

                {/* MyThri Scroll Message with Voice */}
                <div className="relative max-w-3xl mx-auto mt-8">
                  <div className="bg-gradient-to-r from-accent/20 to-primary/20 rounded-xl p-6 border border-primary/30 shadow-embossed hover:shadow-embossed-hover transition-all duration-magical">
                    <div className="flex items-center gap-4">
                      <img
                        src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                        alt="MyThri"
                        className="h-12 w-12 animate-glow-pulse flex-shrink-0 shadow-embossed rounded-full"
                      />
                      <div className="text-left flex-1">
                        <p className="text-lg text-foreground italic">
                          "Every step you take in healing creates ripples of magic in your Innerverse. Look how far you've come!"
                        </p>
                      </div>
                      <VoiceManager
                        text="Every step you take in healing creates ripples of magic in your Innerverse. Look how far you've come!"
                        voiceId="9BWtsMINqrJLrRacOk9x"
                        className="shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Section 1: Healing Path Progress */}
            <ScrollReveal delay={200}>
              <div className="space-y-6">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center ${getEmotionalGradient()} bg-clip-text text-transparent`}>
                  Your Healing Path Journey
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                  {[
                    { name: 'MindPlay', icon: '🧠', progress: 60, played: '3/5', emotion: 'Memory Focus', color: 'from-primary/20 to-accent/20' },
                    { name: 'HeartPlay', icon: '💖', progress: 40, played: '2/5', emotion: 'Gentle Grief', color: 'from-secondary/20 to-primary/20' },
                    { name: 'SoulPlay', icon: '🌸', progress: 80, played: '4/5', emotion: 'Inner Peace', color: 'from-accent/20 to-primary/20' },
                    { name: 'MovePlay', icon: '⚡', progress: 20, played: '1/5', emotion: 'Body Harmony', color: 'from-primary/20 to-secondary/20' },
                    { name: 'JoyPlay', icon: '😊', progress: 75, played: '4/5', emotion: 'Pure Joy', color: 'from-secondary/20 to-accent/20' }
                  ].map((path, index) => (
                    <div key={path.name} className={`bg-gradient-to-br ${path.color} rounded-xl p-6 border border-primary/20 hover:shadow-glow transition-all duration-magical animate-fade-in-up`} style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="text-center space-y-4">
                        <div className="text-4xl mb-2">{path.icon}</div>
                        <h3 className="font-bold text-foreground">{path.name}</h3>

                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-primary font-bold">{path.progress}%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-2">
                            <div
                              className="bg-gradient-mythri h-2 rounded-full transition-all duration-1000 shadow-glow"
                              style={{ width: `${path.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <div className="font-medium">{path.played} games played</div>
                          <div className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary mt-2 inline-block">
                            {path.emotion}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Section 2: Weekly Wins */}
            <ScrollReveal delay={400}>
              <div className="space-y-6">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center ${getEmotionalGradient()} bg-clip-text text-transparent`}>
                  This Week's Magical Wins
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {[
                    { icon: '🎯', title: 'Healing Games', description: 'You completed 2 healing games this week', badge: 'Consistent Player' },
                    { icon: '🏆', title: 'Memory Badge', description: 'You earned a Memory Badge in MindPlay', badge: 'Cognitive Champion' },
                    { icon: '👥', title: 'Together Time', description: 'You played with a loved one 2 times', badge: 'Connection Creator' }
                  ].map((win, index) => (
                    <div key={index} className="bg-gradient-gentle rounded-xl p-6 border border-primary/20 hover:shadow-glow transition-all duration-magical animate-fade-in-up" style={{ animationDelay: `${(index + 5) * 100}ms` }}>
                      <div className="text-center space-y-3">
                        <div className="text-3xl">{win.icon}</div>
                        <h3 className="font-bold text-foreground">{win.title}</h3>
                        <p className="text-sm text-muted-foreground">{win.description}</p>
                        <div className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-medium inline-block">
                          {win.badge}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Section 3: Affirmation Carousel */}
            <ScrollReveal delay={600}>
              <div className="space-y-6">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center ${getEmotionalGradient()} bg-clip-text text-transparent`}>
                  Your Daily Affirmation
                </h2>

                <div className="max-w-4xl mx-auto">
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 border border-primary/30 shadow-glow text-center">
                    <div className="text-2xl mb-4">✨</div>
                    <blockquote className="text-2xl font-medium text-foreground mb-4 italic">
                      "Even one breath is progress"
                    </blockquote>
                    <p className="text-muted-foreground">
                      You're doing beautifully. Small steps create big healing.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Section 4: Streak & Activity Tracker */}
            <ScrollReveal delay={800}>
              <div className="space-y-6">
                <h2 className={`font-heading text-3xl md:text-4xl font-bold text-center ${getEmotionalGradient()} bg-clip-text text-transparent`}>
                  Your Healing Momentum
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  <div className="bg-gradient-gentle rounded-xl p-6 border border-primary/20 text-center space-y-3">
                    <div className="text-3xl">🔥</div>
                    <h3 className="font-bold text-foreground">Healing Streak</h3>
                    <div className="text-2xl font-bold text-primary">3 Days</div>
                    <p className="text-sm text-muted-foreground">Keep the magic flowing!</p>
                  </div>

                  <div className="bg-gradient-gentle rounded-xl p-6 border border-primary/20 text-center space-y-3">
                    <div className="text-3xl">⏰</div>
                    <h3 className="font-bold text-foreground">Time Spent</h3>
                    <div className="text-2xl font-bold text-secondary">34 mins</div>
                    <p className="text-sm text-muted-foreground">This past week</p>
                  </div>

                  <div className="bg-gradient-gentle rounded-xl p-6 border border-primary/20 text-center space-y-3">
                    <div className="text-3xl">🎪</div>
                    <h3 className="font-bold text-foreground">Next Milestone</h3>
                    <div className="text-lg font-bold text-accent">2 more JoyPlays</div>
                    <p className="text-sm text-muted-foreground">to unlock new badge</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Floating particles for magical effect */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              <div className="absolute w-2 h-2 bg-primary/30 rounded-full animate-bounce" style={{ top: '15%', left: '5%', animationDelay: '0s', animationDuration: '3s' }} />
              <div className="absolute w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{ top: '25%', left: '90%', animationDelay: '1s', animationDuration: '2s' }} />
              <div className="absolute w-3 h-3 bg-secondary/20 rounded-full animate-bounce" style={{ top: '45%', left: '3%', animationDelay: '2s', animationDuration: '4s' }} />
              <div className="absolute w-1 h-1 bg-primary/50 rounded-full animate-pulse" style={{ top: '65%', left: '95%', animationDelay: '3s', animationDuration: '2.5s' }} />
              <div className="absolute w-2 h-2 bg-accent/30 rounded-full animate-bounce" style={{ top: '80%', left: '8%', animationDelay: '1.5s', animationDuration: '3.5s' }} />
            </div>
          </div>
        );
      default:
        return (
          <div className="min-h-[80vh] space-y-16">
            {/* Emotion Selector */}
            <EmotionSelector onEmotionChange={setCurrentEmotion} />

            {/* Hero Section */}
            <ScrollReveal>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                {/* Left Side - Typing Effect + Tagline */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h1 className={`font-vivaldi font-bold text-[100px] md:text-[120px] lg:text-[140px] xl:text-[160px] 2xl:text-[180px] leading-none ${getEmotionalGradient()} bg-clip-text text-transparent animate-magical-shimmer bg-[length:200%_100%] whitespace-nowrap`}>
                      ThriveOn
                    </h1>
                    <div className="text-xl md:text-2xl font-typewriter text-muted-foreground min-h-[3rem]">
                      <ScrollTypingEffect
                        phrases={[
                          "Let your soul breathe.",
                          "Heal through play.",
                          "Feel more than seen.",
                          "You don't have to journey alone.",
                          "It begins with a whisper, not a roar."
                        ]}
                        colors={[
                          "text-cyan-500",
                          "text-red-500",
                          "text-yellow-500",
                          "text-green-500",
                          "text-purple-500"
                        ]}
                      />
                    </div>

                    {/* Hero CTA Button */}
                    <div className="pt-6">
                      <Button
                        onClick={() => navigate('/chat')}
                        className="bg-gradient-mythri hover:bg-gradient-mythri/90 text-slate-800 font-heading text-xl px-8 py-6 rounded-xl shadow-glow hover:shadow-[0_0_40px_hsl(var(--primary)/0.5)] transition-all duration-magical animate-glow-pulse"
                      >
                        🌟 Start Your First Healing Quest
                      </Button>
                      <p className="text-sm text-muted-foreground mt-3 font-typewriter">
                        MyThri is waiting to guide your journey
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Side - MyThri Image + Opening Line */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <img
                      src="/uploads/d1fa7744-e7cd-4e3e-ad0a-4203845f546e.png"
                      alt="MyThri on scroll with quote: Healing isn't solo. It's scroll guided."
                      className="w-80 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-magical"
                      style={{ filter: 'drop-shadow(0 0 30px hsl(200 96% 49% / 0.6))' }}
                    />
                  </div>

                  {/* MyThri's Opening Intelligence Display with Voice */}
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/30 shadow-glow max-w-md animate-breathe">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl animate-bounce">💫</div>
                      <div className="flex-1">
                        <p className="text-foreground font-mystical text-lg italic">
                          "I sense you're ready for something deeper. What if healing could feel like play?"
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          — MyThri, your AI healing companion
                        </p>
                      </div>
                      <VoiceManager
                        text="I sense you're ready for something deeper. What if healing could feel like play?"
                        voiceId="9BWtsMINqrJLrRacOk9x"
                        autoSpeak={true}
                        className="shrink-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Four Main CTA Blocks */}
            <ScrollReveal delay={200}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Create Your Profile */}
                <div
                  className="group relative overflow-hidden rounded-xl bg-gradient-mythri/10 dark:bg-gradient-mythri/20 border border-primary/20 hover:border-primary/40 transition-all duration-magical shadow-embossed hover:shadow-embossed-hover cursor-pointer p-8 text-center space-y-4"
                  onClick={() => setActiveView('profile')}
                >
                  <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 transition-opacity duration-magical"></div>
                  <div className="relative z-10">
                    <img
                      src="/uploads/f90d145f-4d9f-42b8-a36d-42d0b2ca6039.png"
                      alt="Create Your Profile"
                      className="w-16 h-16 mx-auto mb-4 object-contain shadow-embossed rounded-full"
                    />
                    <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">Begin Your Story</h3>
                    <p className="text-muted-foreground text-lg font-body">Begin your healing journey by sharing who you are</p>
                  </div>
                </div>

                {/* Build Your Circle */}
                <div className="group relative overflow-hidden rounded-xl bg-gradient-mythri/10 dark:bg-gradient-mythri/20 border border-primary/20 hover:border-primary/40 transition-all duration-magical shadow-embossed hover:shadow-embossed-hover cursor-pointer p-8 text-center space-y-4">
                  <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 transition-opacity duration-magical"></div>
                  <div className="relative z-10">
                    <img
                      src="/uploads/dedd587f-2de1-40fa-8b26-7032c39e7f91.png"
                      alt="Build Your Circle"
                      className="w-16 h-16 mx-auto mb-4 object-contain shadow-embossed rounded-full"
                    />
                    <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">Find Your Companion</h3>
                    <p className="text-muted-foreground text-lg font-body">Connect with {selectedCompanion === 'sanyan' ? 'Sanyan' : 'Anira'} and find your healing companion</p>
                  </div>
                </div>

                {/* Talk to MyThri */}
                <div
                  className="group relative overflow-hidden rounded-xl bg-gradient-mythri/10 dark:bg-gradient-mythri/20 border border-primary/20 hover:border-primary/40 transition-all duration-magical shadow-embossed hover:shadow-embossed-hover cursor-pointer p-8 text-center space-y-4"
                  onClick={() => navigate('/chat')}
                >
                  <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 transition-opacity duration-magical"></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4 shadow-embossed rounded-full w-16 h-16 mx-auto flex items-center justify-center">💬</div>
                    <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">Talk with MyThri</h3>
                    <p className="text-muted-foreground text-lg font-body">Let our AI guide diagnose and recommend your path</p>
                  </div>
                </div>

                {/* Play to Heal */}
                <div
                  className="group relative overflow-hidden rounded-xl bg-gradient-mythri/10 dark:bg-gradient-mythri/20 border border-primary/20 hover:border-primary/40 transition-all duration-magical shadow-embossed hover:shadow-embossed-hover cursor-pointer p-8 text-center space-y-4"
                  onClick={() => navigate('/play')}
                >
                  <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 transition-opacity duration-magical"></div>
                  <div className="relative z-10">
                    <img
                      src="/uploads/70cb95da-edad-418d-963a-e5159d3fd8e2.png"
                      alt="Play to Heal"
                      className="w-16 h-16 mx-auto mb-4 object-contain shadow-embossed rounded-full"
                    />
                    <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">Step Into Your Innerverse</h3>
                    <p className="text-muted-foreground text-lg font-body">Enter healing games and rituals tailored for you</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Badge System */}
            <ScrollReveal delay={400}>
              <BadgeSystem />
            </ScrollReveal>

            {/* Recommended For You Section */}
            <RecommendedSection
              userState="California"
              currentEmotion={currentEmotion}
              lovedOneName="Mahi"
            />

            {/* Whispers from the Past Memory Capsule */}
            <MemoryCapsule
              reflection="Stormy Sky"
              daysAgo={7}
              isAvailable={true}
            />

            {/* Audio Manager */}
            <AudioManager currentEmotion={currentEmotion} />
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      {/* Emotional background gradient overlay */}
      <div className={`fixed inset-0 opacity-5 pointer-events-none transition-all duration-1000 ${getEmotionalGradient()}`}></div>
      {renderActiveView()}
    </div>
  );
};

export default Index;
