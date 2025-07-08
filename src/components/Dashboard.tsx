import React from 'react';
import { TrendingUp, Heart, Zap, MessageCircle, Calendar, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface DashboardWidget {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ElementType;
  gradient: string;
  trend?: 'up' | 'down' | 'stable';
}

const dashboardWidgets: DashboardWidget[] = [
  {
    id: 'unspoken-joys',
    title: 'Unspoken Joys',
    value: '🌿 Nature stroll detected',
    subtitle: 'Automatic healing moments',
    icon: Heart,
    gradient: 'from-pink-500/20 to-rose-500/20',
    trend: 'up'
  },
  {
    id: 'healing-streaks',
    title: 'Healing Streaks',
    value: 7,
    subtitle: 'Days of gentle progress',
    icon: Calendar,
    gradient: 'from-green-500/20 to-emerald-500/20',
    trend: 'up'
  },
  {
    id: 'bond-strength',
    title: 'Bond Strength',
    value: '💫 Growing',
    subtitle: 'Connection to loved ones',
    icon: Zap,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    trend: 'up'
  },
  {
    id: 'nivaya-growth',
    title: 'Nivaya Growth',
    value: '🌱 Expanding',
    subtitle: 'Inner wisdom developing',
    icon: TrendingUp,
    gradient: 'from-purple-500/20 to-violet-500/20',
    trend: 'up'
  },
  {
    id: 'slogh-weakening',
    title: 'Slogh Weakening',
    value: '🌫️ Lifting',
    subtitle: 'Heaviness dissolving',
    icon: Target,
    gradient: 'from-orange-500/20 to-amber-500/20',
    trend: 'down'
  },
  {
    id: 'mythri-messages',
    title: 'MyThri Wisdom',
    value: '✨ 12 insights',
    subtitle: 'Guidance received',
    icon: MessageCircle,
    gradient: 'from-indigo-500/20 to-purple-500/20',
    trend: 'stable'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="text-center animate-fade-in-up">
        <h2 className="text-3xl font-bold bg-gradient-aurora bg-clip-text text-transparent mb-2">
          Your Innerverse
        </h2>
        <p className="text-muted-foreground">
          A gentle reflection of your healing journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dashboardWidgets.map((widget, index) => (
          <Card 
            key={widget.id}
            className={`p-6 border-primary/20 hover:shadow-gentle transition-all duration-magical bg-gradient-to-br ${widget.gradient} animate-fade-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 rounded-full bg-gradient-mythri shadow-gentle">
                <widget.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              {widget.trend && (
                <div className={`text-xs px-2 py-1 rounded-full ${
                  widget.trend === 'up' ? 'bg-green-500/20 text-green-600' :
                  widget.trend === 'down' ? 'bg-orange-500/20 text-orange-600' :
                  'bg-blue-500/20 text-blue-600'
                }`}>
                  {widget.trend === 'up' ? '↗' : widget.trend === 'down' ? '↘' : '→'}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground text-sm">
                {widget.title}
              </h3>
              <div className="text-2xl font-bold text-foreground">
                {widget.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {widget.subtitle}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-gentle border-primary/20 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
        <div className="text-center space-y-3">
          <div className="text-sm text-muted-foreground">Latest Healing Moment</div>
          <div className="text-lg italic text-foreground">
            "💃 Movement + music detected for 8 mins – Dance moment?"
          </div>
          <div className="text-xs text-muted-foreground">
            Detected 2 hours ago • Automatically logged
          </div>
        </div>
      </Card>
    </div>
  );
}