import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { trackClickCTA } from '@/hooks/useGoogleAnalytics';

interface AnimatedCTAProps {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'default' | 'lg' | 'xl';
  icon?: 'arrow' | 'sparkles' | 'none';
  pulse?: boolean;
  glow?: boolean;
  location?: string;
}

/**
 * CTA Component con microinterazioni avanzate
 * Implementa animazioni, tracking GA4 e accessibilità
 */
const AnimatedCTA = ({
  text,
  href,
  variant = 'primary',
  size = 'lg',
  icon = 'arrow',
  pulse = false,
  glow = false,
  location = 'unknown'
}: AnimatedCTAProps) => {
  
  const handleClick = () => {
    trackClickCTA(text, location, href);
  };

  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-hover text-primary-foreground',
    secondary: 'bg-secondary hover:bg-secondary-hover text-secondary-foreground',
    accent: 'bg-accent hover:bg-accent-hover text-accent-foreground'
  };

  const sizeClasses = {
    default: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl'
  };

  const IconComponent = icon === 'arrow' ? ArrowRight : icon === 'sparkles' ? Sparkles : null;

  return (
    <Button
      asChild
      className={`
        relative group
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        font-semibold rounded-lg
        transition-all duration-300
        hover:scale-105 hover:shadow-2xl
        focus:ring-4 focus:ring-offset-2 focus:ring-primary/50
        ${pulse ? 'animate-pulse-soft' : ''}
        ${glow ? 'shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]' : ''}
      `}
      onClick={handleClick}
    >
      <Link to={href} className="flex items-center gap-2">
        <span className="relative z-10">{text}</span>
        
        {IconComponent && (
          <IconComponent 
            className={`
              w-5 h-5 
              transition-transform duration-300 
              group-hover:translate-x-1
              ${icon === 'sparkles' ? 'group-hover:rotate-12' : ''}
            `}
          />
        )}
        
        {/* Glow effect on hover */}
        {glow && (
          <span 
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
            aria-hidden="true"
          />
        )}
      </Link>
    </Button>
  );
};

export default AnimatedCTA;
