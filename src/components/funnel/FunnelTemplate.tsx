import React from 'react';

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
              src="/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png" 
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
