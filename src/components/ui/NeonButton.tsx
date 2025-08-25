import React from 'react';
import { cn } from '@/lib/utils';

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
  children: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = true,
  className,
  children,
  ...props
}) => {
  const variants = {
    primary: 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-accent',
    secondary: 'bg-gradient-to-r from-brand-secondary to-brand-accent hover:from-brand-accent hover:to-brand-primary',
    accent: 'bg-gradient-to-r from-brand-accent to-brand-primary hover:from-brand-primary hover:to-brand-secondary'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const glowEffect = glow ? 'animate-neon-pulse' : '';
  const glowStyle = glow ? { boxShadow: 'var(--shadow-neon)' } : {};

  return (
    <button
      className={cn(
        // Base styles
        'relative font-bold text-white rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-primary/50 overflow-hidden group min-h-[44px]',
        // Variant styles
        variants[variant],
        // Size styles  
        sizes[size],
        // Glow effect
        glowEffect,
        // Custom className
        className
      )}
      style={glowStyle}
      {...props}
    >
      {/* Energy wave effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      
      {/* Content */}
      <span className="relative z-10 font-heading">
        {children}
      </span>
    </button>
  );
};

export default NeonButton;