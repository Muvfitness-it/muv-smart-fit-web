import React from 'react';

interface CopyEnhancerProps {
  children: React.ReactNode;
  variant?: 'cta' | 'headline' | 'description' | 'benefit';
  className?: string;
}

const CopyEnhancer: React.FC<CopyEnhancerProps> = ({ 
  children, 
  variant = 'description',
  className = "" 
}) => {
  const baseClasses = "transition-all duration-300";
  
  const variantClasses = {
    cta: "font-bold text-lg hover:scale-105 cursor-pointer text-brand-primary",
    headline: "font-heading font-black text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent",
    description: "text-muted-foreground leading-relaxed",
    benefit: "font-semibold text-foreground flex items-center space-x-2"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default CopyEnhancer;