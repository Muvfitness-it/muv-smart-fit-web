import React from 'react';

interface EnergyElementsProps {
  variant?: 'floating' | 'pulse' | 'glow';
  className?: string;
}

const EnergyElements: React.FC<EnergyElementsProps> = ({ 
  variant = 'floating', 
  className = '' 
}) => {
  const baseClasses = "absolute rounded-full blur-xl opacity-60";
  
  const variants = {
    floating: "animate-float",
    pulse: "animate-pulse-glow", 
    glow: "animate-neon-pulse"
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Primary Energy Orb */}
      <div 
        className={`${baseClasses} ${variants[variant]} w-32 h-32 bg-gradient-to-r from-brand-primary/40 to-brand-secondary/30 top-1/4 left-1/4`}
        style={{ animationDelay: '0s' }}
      />
      
      {/* Secondary Energy Orb */}
      <div 
        className={`${baseClasses} ${variants[variant]} w-24 h-24 bg-gradient-to-l from-brand-accent/30 to-brand-primary/40 top-3/4 right-1/4`}
        style={{ animationDelay: '1s' }}
      />
      
      {/* Tertiary Energy Orb */}
      <div 
        className={`${baseClasses} ${variants[variant]} w-16 h-16 bg-gradient-to-r from-brand-secondary/50 to-brand-accent/40 top-1/2 right-1/3`}
        style={{ animationDelay: '0.5s' }}
      />
      
      {/* Accent Energy Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent animate-energy-wave" />
      <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-brand-secondary/20 to-transparent animate-energy-wave" style={{ animationDelay: '0.75s' }} />
    </div>
  );
};

export default EnergyElements;