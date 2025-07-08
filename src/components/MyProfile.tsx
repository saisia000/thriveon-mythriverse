import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import ProcessImageOnMount from './ProcessImageOnMount';

type Role = 'survivor' | 'caregiver' | 'loved-one';
type JourneyStage = 'just-diagnosed' | 'in-treatment' | 'recently-finished' | 'looking-for-support';
type CompanionChoice = 'sanyan' | 'anira' | 'not-chosen';

interface ProfileFormData {
  name: string;
  age: number;
  role: Role;
  journeyStage?: JourneyStage;
  wantsConnection: boolean;
  inviteEmail?: string;
  familyMembers: Array<{ name: string; role: string; relationship: string }>;
  companionChoice: CompanionChoice;
  consent: boolean;
}

interface MyProfileProps {
  onComplete: () => void;
}

const MyProfile = ({ onComplete }: MyProfileProps) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [wantsConnection, setWantsConnection] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<Array<{ name: string; role: string; relationship: string }>>([]);
  const [companionChoice, setCompanionChoice] = useState<CompanionChoice>('not-chosen');

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProfileFormData>({
    defaultValues: {
      wantsConnection: false,
      consent: false,
      familyMembers: [],
      companionChoice: 'not-chosen'
    }
  });

  const consent = watch('consent');

  const roleOptions = [
    { id: 'survivor' as Role, label: 'Survivor', description: 'Walking your healing path', image: '/uploads/89972e80-02ff-4488-9992-5cb208ee8cb1.png' },
    { id: 'caregiver' as Role, label: 'Caregiver', description: 'Supporting a loved one', image: '/uploads/e148663c-7992-4f0c-ab3b-7ad59cc36fe2.png' },
    { id: 'loved-one' as Role, label: 'Loved One', description: 'Standing beside someone', image: '/uploads/6fb34a77-b1aa-4d04-a9fd-ce65ba059962.png' }
  ];

  const journeyStages = [
    { value: 'just-diagnosed', label: 'Just diagnosed' },
    { value: 'in-treatment', label: 'In treatment' },
    { value: 'recently-finished', label: 'Recently finished treatment' },
    { value: 'looking-for-support', label: 'Looking for support in survivorship' }
  ];

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setValue('role', role);
  };

  const onSubmit = (data: ProfileFormData) => {
    if (!consent) {
      toast.error("Please agree to continue your journey with us");
      return;
    }

    // Save to localStorage for now
    localStorage.setItem('thriveOnProfile', JSON.stringify({
      ...data,
      familyMembers,
      companionChoice,
      createdAt: new Date().toISOString()
    }));

    toast.success("Welcome to your Innerverse! Let's talk with MyThri.");
    onComplete();
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Floating Stars Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-primary rounded-full animate-star-twinkle"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-accent rounded-full animate-star-shimmer"></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-primary/60 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-20 w-1 h-1 bg-accent/80 rounded-full animate-star-twinkle"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl relative z-10">
        {/* Welcome Section */}
        <div className="text-center mb-12 space-y-4 animate-fade-in-up">
          <h1 className="font-heading text-5xl md:text-6xl font-bold bg-gradient-mythri bg-clip-text text-transparent">
            Welcome to Your Innerverse
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-body">
            The more we know, the deeper we can guide.
          </p>
          <div className="flex justify-center">
            <ProcessImageOnMount
              originalImageUrl="/uploads/4aa763ea-40e6-441a-9ea7-bfe6671a53b9.png"
              onProcessed={(url) => console.log('Processed image:', url)}
              className="w-8 h-8 animate-glow-pulse"
              alt="Welcome decoration"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info Block */}
          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-magical animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <div className="absolute inset-0 bg-gradient-mythri opacity-0 hover:opacity-5 transition-opacity duration-magical"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="font-astron text-foreground">Tell Us About You</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name or Nickname</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Type your name or nickname..."
                  className="mt-1 bg-background/50 border-input hover:border-primary/40 focus:border-primary transition-colors duration-magical"
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="age" className="text-sm font-medium text-muted-foreground">Your Age (in years or wisdom)</Label>
                <Select onValueChange={(value) => setValue('age', parseInt(value))}>
                  <SelectTrigger className="mt-1 bg-background/50 border-input hover:border-primary/40 focus:border-primary transition-colors duration-magical">
                    <SelectValue placeholder="Select your age" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-primary/20">
                    {Array.from({ length: 91 }, (_, i) => i + 10).map((age) => (
                      <SelectItem key={age} value={age.toString()}>{age}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.age && <p className="text-destructive text-sm mt-1">Age is required</p>}
              </div>
            </CardContent>
          </Card>

          {/* Role Selection Block */}
          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-magical animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="absolute inset-0 bg-gradient-mythri opacity-0 hover:opacity-5 transition-opacity duration-magical"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="font-astron text-foreground">Who are you walking this path as?</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="grid gap-4">
                {roleOptions.map((role) => {
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-4 rounded-lg border transition-all duration-magical text-left ${isSelected
                          ? 'border-primary bg-primary/10 shadow-glow'
                          : 'border-input hover:border-primary/40 bg-background/30'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        {role.image && (
                          <ProcessImageOnMount
                            originalImageUrl={role.image}
                            onProcessed={(url) => console.log('Processed role image:', url)}
                            className="w-8 h-8 object-contain"
                            alt={`${role.label} icon`}
                          />
                        )}
                        <div>
                          <div className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                            {role.label}
                          </div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.role && <p className="text-destructive text-sm mt-2">Please select your role</p>}
            </CardContent>
          </Card>

          {/* Journey Stage Block - Only for Survivors */}
          {selectedRole === 'survivor' && (
            <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-magical animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 hover:opacity-5 transition-opacity duration-magical"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="font-astron text-foreground">Where are you in your journey?</CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <Select onValueChange={(value) => setValue('journeyStage', value as JourneyStage)}>
                  <SelectTrigger className="bg-background/50 border-input hover:border-primary/40 focus:border-primary transition-colors duration-magical">
                    <SelectValue placeholder="Select your current stage" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-primary/20">
                    {journeyStages.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>{stage.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          )}

          {/* Connection Block */}
          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-magical animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <div className="absolute inset-0 bg-gradient-mythri opacity-0 hover:opacity-5 transition-opacity duration-magical"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="font-astron text-foreground">Build Your Circle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium text-foreground">
                    Would you like to connect with your family or a healing companion?
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Healing is stronger together
                  </p>
                </div>
                <Switch
                  checked={wantsConnection}
                  onCheckedChange={(checked) => {
                    setWantsConnection(checked);
                    setValue('wantsConnection', checked);
                  }}
                />
              </div>

              {wantsConnection && (
                <div className="space-y-3 animate-fade-in-up">
                  <div>
                    <Label htmlFor="inviteEmail" className="text-sm font-medium text-muted-foreground">
                      Invite someone via email
                    </Label>
                    <Input
                      id="inviteEmail"
                      type="email"
                      {...register('inviteEmail')}
                      placeholder="their-email@example.com"
                      className="mt-1 bg-background/50 border-input hover:border-primary/40 focus:border-primary transition-colors duration-magical"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Companion Path Block */}
          <Card className="relative overflow-hidden bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-magical animate-fade-in-up" style={{ animationDelay: '900ms' }}>
            <div className="absolute inset-0 bg-gradient-mythri opacity-0 hover:opacity-5 transition-opacity duration-magical"></div>
            <CardHeader className="relative z-10">
              <CardTitle className="font-astron text-foreground flex items-center gap-2">
                <img
                  src="/uploads/42231d91-d1f6-4d90-92c4-d23174058345.png"
                  alt="MyThri"
                  className="h-6 w-6 animate-glow-pulse"
                />
                Companion Path
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/20">
                  <p className="text-lg font-mystical text-foreground italic">
                    "Healing is better together.<br />
                    Would you like to walk with someone you already know…<br />
                    or someone I pair you with?"
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">— MyThri</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sanyan Option */}
                <button
                  type="button"
                  onClick={() => {
                    setCompanionChoice('sanyan');
                    setValue('companionChoice', 'sanyan');
                  }}
                  className={`p-6 rounded-xl border transition-all duration-magical text-center embossed ${companionChoice === 'sanyan'
                      ? 'border-primary bg-gradient-to-br from-primary/20 to-primary/10 shadow-glow'
                      : 'border-input hover:border-primary/40 bg-background/30'
                    }`}
                >
                  <div className="space-y-3">
                    <div className="text-4xl">🌿</div>
                    <h3 className={`font-heading text-lg font-bold ${companionChoice === 'sanyan' ? 'text-primary' : 'text-foreground'}`}>
                      Sanyan
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A pre-connected loved one
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {['Empathetic', 'Nurturing', 'Intuitive'].map((trait) => (
                        <span
                          key={trait}
                          className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs embossed"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>

                {/* Anira Option */}
                <button
                  type="button"
                  onClick={() => {
                    setCompanionChoice('anira');
                    setValue('companionChoice', 'anira');
                  }}
                  className={`p-6 rounded-xl border transition-all duration-magical text-center embossed ${companionChoice === 'anira'
                      ? 'border-secondary bg-gradient-to-br from-secondary/20 to-secondary/10 shadow-glow'
                      : 'border-input hover:border-primary/40 bg-background/30'
                    }`}
                >
                  <div className="space-y-3">
                    <div className="text-4xl">🌌</div>
                    <h3 className={`font-heading text-lg font-bold ${companionChoice === 'anira' ? 'text-secondary' : 'text-foreground'}`}>
                      Anira
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      A new emotional companion chosen for you
                    </p>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {['Courageous', 'Motivating', 'Resilient'].map((trait) => (
                        <span
                          key={trait}
                          className="px-2 py-1 bg-secondary/20 text-secondary rounded-full text-xs embossed"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-primary font-mystical italic">
                  ✨ "Don't worry, I'll guide you either way."
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setCompanionChoice('not-chosen');
                    setValue('companionChoice', 'not-chosen');
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-2 underline"
                >
                  Skip for now - I'll choose later
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Consent Block */}
          <Card className="relative overflow-hidden bg-gradient-gentle border-primary/30 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
            <div className="absolute inset-0 bg-gradient-mythri opacity-10"></div>
            <CardContent className="p-6 relative z-10">
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Everything you share helps MyThri serve you better. You're always in control.
                    Your data is safe, private, and never sold.
                  </p>
                </div>

                <div className="flex items-center space-x-2 justify-center">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => setValue('consent', checked as boolean)}
                  />
                  <Label htmlFor="consent" className="text-sm font-medium text-foreground cursor-pointer">
                    I agree and wish to continue
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <div className="text-center pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!consent}
              className="relative group px-8 py-3 bg-gradient-mythri hover:shadow-glow transition-all duration-magical disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in-up"
              style={{ animationDelay: '1200ms' }}
            >
              <span className="relative z-10 font-semibold">Start My Journey</span>
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-magical"></div>
            </Button>
          </div>
        </form>

        {/* Floating MyThri Helper */}
        <div className="fixed bottom-6 right-6 animate-float">
          <div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full p-3 shadow-glow cursor-pointer hover:bg-primary/20 transition-colors duration-magical">
            <img
              src="/uploads/fdd82006-83ec-4164-8db8-a09098ebfbc0.png"
              alt="MyThri helper"
              className="w-8 h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;