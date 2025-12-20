import React from 'react';
import muvLogo from '@/assets/muv-logo-original-transparent.png';

interface FunnelTemplateProps {
  children: React.ReactNode;
  showLogo?: boolean;
}

const FunnelTemplate: React.FC<FunnelTemplateProps> = ({ children, showLogo = true }) => {
  return (
    <div className="min-h-screen bg-background">
      {showLogo && (
        <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-border/50">
          <div className="max-w-4xl mx-auto flex justify-center">
            <img 
              src={muvLogo} 
              alt="MUV Fitness Legnago" 
              className="h-10 sm:h-12 w-auto"
            />
          </div>
        </header>
      )}
      <main className="flex-1">
        {children}
      </main>
      <footer className="py-6 px-4 text-center border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MUV Fitness Legnago · Piazzetta Don Walter Soave, 2 · 37045 Legnago (VR)
        </p>
      </footer>
    </div>
  );
};

export default FunnelTemplate;
