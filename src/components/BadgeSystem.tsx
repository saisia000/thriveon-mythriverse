import { Badge } from '@/components/ui/badge';

interface BadgeProps {
  type: 'bronze' | 'silver' | 'golden';
  name: string;
  icon: string;
  description: string;
  isEarned?: boolean;
}

const BadgeComponent = ({ type, name, icon, description, isEarned = true }: BadgeProps) => {
  const getStyles = () => {
    switch (type) {
      case 'bronze':
        return {
          container: isEarned 
            ? 'bg-gradient-to-br from-amber-600/20 to-orange-600/20 border-amber-600/30' 
            : 'bg-gradient-to-br from-gray-600/10 to-gray-400/10 border-gray-400/20',
          glow: isEarned ? 'shadow-[0_0_20px_rgba(251,146,60,0.3)]' : '',
          text: isEarned ? 'text-amber-600' : 'text-gray-400',
          icon: isEarned ? 'text-amber-600' : 'text-gray-400'
        };
      case 'silver':
        return {
          container: isEarned 
            ? 'bg-gradient-to-br from-slate-400/20 to-slate-600/20 border-slate-400/30'
            : 'bg-gradient-to-br from-gray-600/10 to-gray-400/10 border-gray-400/20',
          glow: isEarned ? 'shadow-[0_0_20px_rgba(148,163,184,0.3)]' : '',
          text: isEarned ? 'text-slate-400' : 'text-gray-400',
          icon: isEarned ? 'text-slate-400' : 'text-gray-400'
        };
      case 'golden':
        return {
          container: isEarned 
            ? 'bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border-yellow-400/30'
            : 'bg-gradient-to-br from-gray-600/10 to-gray-400/10 border-gray-400/20',
          glow: isEarned ? 'shadow-[0_0_30px_rgba(250,204,21,0.4)] animate-glow-pulse' : '',
          text: isEarned ? 'text-yellow-400' : 'text-gray-400',
          icon: isEarned ? 'text-yellow-400' : 'text-gray-400'
        };
      default:
        return {
          container: 'bg-gradient-gentle border-primary/20',
          glow: '',
          text: 'text-foreground',
          icon: 'text-foreground'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`relative overflow-hidden rounded-xl p-6 border transition-all duration-magical hover:scale-105 cursor-pointer group ${styles.container} ${styles.glow}`}>
      {/* Unlock Animation Overlay */}
      {isEarned && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out opacity-0 group-hover:opacity-100"></div>
      )}
      
      <div className="text-center space-y-3 relative z-10">
        <div className={`text-4xl transition-transform duration-magical group-hover:scale-110 ${styles.icon} ${isEarned ? 'animate-bounce' : ''}`}>
          {isEarned ? icon : '🔒'}
        </div>
        <h3 className={`font-heading text-lg font-bold ${styles.text}`}>
          {isEarned ? name : 'Locked'}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isEarned ? description : 'Complete more healing quests to unlock'}
        </p>
        <Badge variant="secondary" className="text-xs">
          {isEarned ? `${type.charAt(0).toUpperCase() + type.slice(1)} Tier` : 'Locked'}
        </Badge>
        
        {/* Progress indicator for locked badges */}
        {!isEarned && (
          <div className="mt-2 space-y-1">
            <div className="w-full bg-muted/30 rounded-full h-1">
              <div className="bg-primary h-1 rounded-full w-1/3 transition-all duration-500"></div>
            </div>
            <p className="text-xs text-muted-foreground">Progress: 1/3 quests</p>
          </div>
        )}
      </div>
      
      {/* Sparkle effects for earned badges */}
      {isEarned && (
        <>
          <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-pulse opacity-60"></div>
          <div className="absolute bottom-4 left-3 w-0.5 h-0.5 bg-white rounded-full animate-ping opacity-40"></div>
          <div className="absolute top-1/2 right-4 w-0.5 h-0.5 bg-white rounded-full animate-bounce opacity-50"></div>
        </>
      )}
    </div>
  );
};

export const BadgeSystem = () => {
  const badges: (BadgeProps & { isEarned: boolean })[] = [
    {
      type: 'bronze',
      name: 'First Steps',
      icon: '🌱',
      description: 'You began your healing journey',
      isEarned: true
    },
    {
      type: 'silver',
      name: 'Heart Opener',
      icon: '💝',
      description: 'You completed 5 healing games',
      isEarned: true
    },
    {
      type: 'golden',
      name: 'Inner Light',
      icon: '✨',
      description: 'You unlocked your true potential',
      isEarned: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-heading text-3xl md:text-4xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
          Your Achievement Journey
        </h2>
        <p className="text-muted-foreground">
          Each quest unlocks new depths of healing magic
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {badges.map((badge, index) => (
          <div
            key={badge.name}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <BadgeComponent {...badge} />
          </div>
        ))}
      </div>
      
      {/* Next Quest Preview */}
      <div className="text-center pt-4">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20 max-w-md mx-auto">
          <p className="text-sm text-muted-foreground">
            🎯 <span className="font-bold">Next Quest:</span> Complete 2 more healing sessions to unlock Golden Badge
          </p>
        </div>
      </div>
    </div>
  );
};