import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  text: string;
  href?: string;
}

interface CTAButton {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export interface MinimalHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  breadcrumbs?: BreadcrumbItem[];
  gradient?: 'primary' | 'secondary' | 'accent' | 'dual';
  className?: string;
}

const gradientClasses = {
  primary: 'bg-gradient-to-br from-primary/95 via-primary/90 to-primary/80',
  secondary: 'bg-gradient-to-br from-secondary/95 via-secondary/90 to-secondary/80',
  accent: 'bg-gradient-to-br from-accent/95 via-accent/90 to-accent/80',
  dual: 'bg-gradient-to-br from-primary via-secondary to-accent'
};

export const MinimalHero: React.FC<MinimalHeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  breadcrumbs,
  gradient = 'dual',
  className
}) => {
  return (
    <section 
      className={cn(
        'relative min-h-[60vh] flex items-center justify-center overflow-hidden',
        gradientClasses[gradient],
        className
      )}
    >
      {/* Pattern overlay decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-white/80">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 mx-2" />
                  )}
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.text}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.text}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <p className="text-white/90 text-lg md:text-xl mb-4 font-medium animate-fade-in">
              {subtitle}
            </p>
          )}
          
          <h1 className="text-hero-title font-bold text-white mb-6 leading-tight">
            {title}
          </h1>
          
          {description && (
            <p className="text-hero-subtitle text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
              {description}
            </p>
          )}

          {/* CTAs */}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-200">
              {primaryCTA && (
                primaryCTA.href ? (
                  <Link
                    to={primaryCTA.href}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary rounded-lg hover:bg-white/90 transition-all hover:scale-105 shadow-lg min-w-[240px]"
                  >
                    {primaryCTA.text}
                  </Link>
                ) : (
                  <button
                    onClick={primaryCTA.onClick}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-primary rounded-lg hover:bg-white/90 transition-all hover:scale-105 shadow-lg min-w-[240px]"
                  >
                    {primaryCTA.text}
                  </button>
                )
              )}
              
              {secondaryCTA && (
                secondaryCTA.href ? (
                  <Link
                    to={secondaryCTA.href}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-lg hover:bg-white/10 hover:border-white transition-all min-w-[240px]"
                  >
                    {secondaryCTA.text}
                  </Link>
                ) : (
                  <button
                    onClick={secondaryCTA.onClick}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-lg hover:bg-white/10 hover:border-white transition-all min-w-[240px]"
                  >
                    {secondaryCTA.text}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
