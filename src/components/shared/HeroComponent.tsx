import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HeroComponentProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  variant?: 'default' | 'gradient' | 'solid';
  align?: 'left' | 'center';
}

const HeroComponent = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  variant = 'default',
  align = 'center',
}: HeroComponentProps) => {
  const alignmentClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className={`absolute inset-0 ${
            variant === 'gradient' 
              ? 'bg-gradient-to-br from-primary/90 via-secondary/85 to-accent/90'
              : variant === 'solid'
              ? 'bg-primary/85'
              : 'bg-black/40'
          }`} />
        </div>
      )}
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className={`max-w-4xl mx-auto flex flex-col gap-6 ${alignmentClass}`}>
          
          {subtitle && (
            <span className="text-body-lg font-semibold text-accent-foreground bg-accent/20 px-4 py-2 rounded-full inline-block">
              {subtitle}
            </span>
          )}
          
          <h1 className="text-display text-white drop-shadow-lg">
            {title}
          </h1>
          
          {description && (
            <p className="text-body-xl text-white/95 max-w-3xl drop-shadow-md">
              {description}
            </p>
          )}
          
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {primaryCTA && (
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent-hover text-accent-foreground text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform"
                >
                  <Link to={primaryCTA.href}>
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              )}
              
              {secondaryCTA && (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm"
                >
                  <Link to={secondaryCTA.href}>
                    {secondaryCTA.text}
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroComponent;
