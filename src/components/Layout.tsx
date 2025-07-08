import React from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  const isActive = (path: string) => location.pathname === path;

  // Define the page order for navigation
  const pages = [
    { path: '/', view: null },
    { path: '/', view: 'profile' },
    { path: '/chat', view: null },
    { path: '/play', view: null },
    { path: '/', view: 'report' }
  ];
  
  const getCurrentPageIndex = () => {
    const currentView = searchParams.get('view');
    return pages.findIndex(page => 
      page.path === location.pathname && page.view === currentView
    );
  };
  
  const getPreviousPage = () => {
    const currentIndex = getCurrentPageIndex();
    if (currentIndex <= 0) return null;
    const prevPage = pages[currentIndex - 1];
    return prevPage.view ? `${prevPage.path}?view=${prevPage.view}` : prevPage.path;
  };
  
  const getNextPage = () => {
    const currentIndex = getCurrentPageIndex();
    if (currentIndex >= pages.length - 1) return null;
    const nextPage = pages[currentIndex + 1];
    return nextPage.view ? `${nextPage.path}?view=${nextPage.view}` : nextPage.path;
  };

  const handlePrevious = () => {
    const prev = getPreviousPage();
    if (prev) {
      navigate(prev);
    }
  };

  const handleNext = () => {
    const next = getNextPage();
    if (next) {
      navigate(next);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 p-4 flex justify-between items-center border-b border-primary/10 bg-background/95 backdrop-blur-sm">
        <Button 
          variant="ghost" 
          onClick={() => {
            // Always navigate to clean home page and scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate('/', { replace: true });
          }}
          className="text-primary hover:text-primary/80 font-semibold text-lg relative group transition-all duration-magical hover:shadow-glow"
        >
          <span className="relative z-10">ThriveOn</span>
          <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-20 rounded-md transition-opacity duration-magical"></div>
        </Button>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex gap-2">
            <Button 
              variant={isActive('/') && !searchParams.get('view') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/')}
              className="relative group transition-all duration-magical hover:shadow-glow"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-magical"></div>
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate('/?view=profile')}
              className="relative group transition-all duration-magical hover:shadow-glow"
            >
              <span className="relative z-10">My Profile</span>
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-magical"></div>
            </Button>
            <Button 
              variant={isActive('/chat') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/chat')}
              className="relative group transition-all duration-magical hover:shadow-glow"
            >
              <span className="relative z-10">Talk with MyThri</span>
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-magical"></div>
            </Button>
            <Button 
              variant={isActive('/play') ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigate('/play')}
              className="relative group transition-all duration-magical hover:shadow-glow"
            >
              <span className="relative z-10">Play</span>
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-magical"></div>
            </Button>
            <Button 
              variant="ghost"
              size="sm"
              onClick={() => navigate('/?view=report')}
              className="relative group transition-all duration-magical hover:shadow-glow"
            >
              <span className="relative z-10">My Innerverse Report Card</span>
              <div className="absolute inset-0 bg-gradient-mythri opacity-0 group-hover:opacity-10 rounded-md transition-opacity duration-magical"></div>
            </Button>
          </nav>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Navigation Arrows */}
            {(getPreviousPage() || getNextPage()) && (
              <div className="flex gap-2">
                {getPreviousPage() && (
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-background/90 backdrop-blur-sm border-primary/20 hover:border-primary/40 shadow-glow"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                )}
                
                {getNextPage() && (
                  <Button
                    onClick={handleNext}
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-background/90 backdrop-blur-sm border-primary/20 hover:border-primary/40 shadow-glow"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="relative">
        {children}
      </main>


      <footer className="p-8 text-center border-t border-primary/10">
        <p className="font-body text-lg text-muted-foreground italic max-w-2xl mx-auto">
          "The healing doesn't always roar. Sometimes it whispers. Sometimes it just breathe." — MyThri
        </p>
      </footer>
    </div>
  );
}