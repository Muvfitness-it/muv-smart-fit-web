import React from 'react';

interface ImprovedCopyProps {
  children: React.ReactNode;
  variant?: 'headline' | 'subheadline' | 'body' | 'cta' | 'benefit' | 'testimonial';
  className?: string;
}

const ImprovedCopy: React.FC<ImprovedCopyProps> = ({ 
  children, 
  variant = 'body',
  className = "" 
}) => {
  const baseClasses = "transition-all duration-300";
  
  const variantStyles = {
    headline: "font-heading font-black text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent leading-tight",
    subheadline: "font-heading font-bold text-xl md:text-2xl lg:text-3xl text-foreground leading-snug",
    body: "text-muted-foreground leading-relaxed text-base md:text-lg",
    cta: "font-bold text-lg md:text-xl text-brand-primary hover:text-brand-secondary cursor-pointer hover:scale-105",
    benefit: "font-semibold text-foreground flex items-start space-x-2",
    testimonial: "italic text-muted-foreground border-l-4 border-brand-primary pl-4 text-lg leading-relaxed"
  };

  return (
    <div className={`${baseClasses} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};

export default ImprovedCopy;