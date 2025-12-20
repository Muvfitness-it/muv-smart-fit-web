import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FunnelCTAProps {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  icon?: boolean;
  className?: string;
  disabled?: boolean;
}

const FunnelCTA: React.FC<FunnelCTAProps> = ({ 
  text, 
  onClick, 
  href, 
  variant = 'primary',
  icon = true,
  className = '',
  disabled = false
}) => {
  const baseStyles = `
    w-full sm:w-auto min-h-[56px] px-8 py-4 text-lg font-semibold rounded-xl 
    transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
    shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-3
  `;

  const variantStyles = variant === 'primary' 
    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-primary/90 hover:to-secondary/90'
    : 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground';

  const handleClick = () => {
    if (href) {
      window.location.href = href;
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button 
      onClick={handleClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      <span>{text}</span>
      {icon && <ArrowRight className="w-5 h-5" />}
    </button>
  );
};

export default FunnelCTA;
