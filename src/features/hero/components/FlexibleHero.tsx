/**
 * Flexible Hero Component
 * Replaces: CompactHeroSection, NewHeroSection, TransformHeroSection, LandingHero, ServiceHeroSection
 * Single, configurable hero for all use cases
 */

import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';

export type HeroVariant = 'fullscreen' | 'compact' | 'service' | 'landing';
export type HeroOverlay = 'gradient' | 'dark' | 'light' | 'none';

interface CTAButton {
  text: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
}

interface TrustIndicator {
  icon?: LucideIcon;
  text: string;
}

interface Breadcrumb {
  text: string;
  href?: string;
}

export interface FlexibleHeroProps {
  // Content
  title: string;
  subtitle?: string;
  description?: string;
  
  // CTAs
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  
  // Visual
  variant?: HeroVariant;
  backgroundImage?: string;
  overlay?: HeroOverlay;
  minHeight?: string;
  
  // Trust signals
  trustIndicators?: TrustIndicator[];
  guarantee?: string;
  urgency?: string;
  
  // Breadcrumbs
  breadcrumbs?: Breadcrumb[];
  
  // Styling
  className?: string;
  contentClassName?: string;
  
  // Animations
  animated?: boolean;
}

const overlayClasses: Record<HeroOverlay, string> = {
  gradient: 'bg-gradient-to-b from-primary/60 via-primary/40 to-primary/70',
  dark: 'bg-black/50',
  light: 'bg-white/80',
  none: ''
};

const variantDefaults: Record<HeroVariant, Partial<FlexibleHeroProps>> = {
  fullscreen: {
    minHeight: 'min-h-screen',
    overlay: 'gradient',
    animated: true
  },
  compact: {
    minHeight: 'min-h-[75vh]',
    overlay: 'dark',
    animated: false
  },
  service: {
    minHeight: 'min-h-[60vh]',
    overlay: 'gradient',
    animated: false
  },
  landing: {
    minHeight: 'min-h-[85vh]',
    overlay: 'gradient',
    animated: true
  }
};

export const FlexibleHero: React.FC<FlexibleHeroProps> = ({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  variant = 'fullscreen',
  backgroundImage,
  overlay = 'gradient',
  minHeight,
  trustIndicators = [],
  guarantee,
  urgency,
  breadcrumbs,
  className,
  contentClassName,
  animated = true
}) => {
  // Merge variant defaults with props
  const defaults = variantDefaults[variant];
  const finalMinHeight = minHeight || defaults.minHeight;
  const finalOverlay = overlay || defaults.overlay;
  const finalAnimated = animated !== undefined ? animated : defaults.animated;

  return (
    <section 
      className={cn(
        'relative w-full overflow-hidden',
        finalMinHeight,
        className
      )}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className={cn(
            'absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat',
            finalAnimated && 'animate-slow-zoom'
          )}
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}
      
      {/* Overlay */}
      {finalOverlay !== 'none' && (
        <div 
          className={cn('absolute inset-0', overlayClasses[finalOverlay])}
          aria-hidden="true" 
        />
      )}
      
      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className={cn(
          'container mx-auto px-4 py-16',
          contentClassName
        )}>
          <div className="max-w-5xl mx-auto text-center">
            
            {/* Breadcrumbs (optional) */}
            {breadcrumbs && breadcrumbs.length > 0 && (
              <Breadcrumb className="mb-6 flex justify-center">
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      <BreadcrumbItem>
                        {crumb.href ? (
                          <BreadcrumbLink asChild>
                            <Link to={crumb.href} className="text-white/80 hover:text-white">
                              {crumb.text}
                            </Link>
                          </BreadcrumbLink>
                        ) : (
                          <span className="text-white">{crumb.text}</span>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator className="text-white/60" />
                      )}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
            
            {/* Subtitle (optional) */}
            {subtitle && (
              <p className="text-lg md:text-xl text-white/90 mb-4 font-medium animate-fade-in">
                {subtitle}
              </p>
            )}
            
            {/* Main Title */}
            <h1 className={cn(
              'text-hero-title font-bold leading-tight mb-6 text-white',
              finalAnimated && 'animate-fade-in'
            )}>
              {title}
            </h1>
            
            {/* Description */}
            {description && (
              <p className="text-lg md:text-xl mb-10 text-white/95 max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
            
            {/* Urgency/Guarantee Banner */}
            {(urgency || guarantee) && (
              <div className="mb-8 inline-flex flex-col gap-2">
                {urgency && (
                  <div className="bg-accent text-white px-6 py-2 rounded-full font-semibold text-sm">
                    {urgency}
                  </div>
                )}
                {guarantee && (
                  <div className="bg-secondary text-white px-6 py-2 rounded-full font-semibold text-sm">
                    {guarantee}
                  </div>
                )}
              </div>
            )}
            
            {/* CTA Buttons */}
            {(primaryCTA || secondaryCTA) && (
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                {primaryCTA && (
                  primaryCTA.onClick ? (
                    <button
                      onClick={primaryCTA.onClick}
                      className="btn-accent text-lg px-8 py-4"
                    >
                      {primaryCTA.text}
                    </button>
                  ) : (
                    <Link 
                      to={primaryCTA.href}
                      className="btn-accent text-lg px-8 py-4 inline-flex items-center justify-center"
                    >
                      {primaryCTA.text}
                    </Link>
                  )
                )}
                
                {secondaryCTA && (
                  secondaryCTA.onClick ? (
                    <button
                      onClick={secondaryCTA.onClick}
                      className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4"
                    >
                      {secondaryCTA.text}
                    </button>
                  ) : (
                    <Link 
                      to={secondaryCTA.href}
                      className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                    >
                      {secondaryCTA.text}
                    </Link>
                  )
                )}
              </div>
            )}
            
            {/* Trust Indicators */}
            {trustIndicators.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6 text-white/90">
                {trustIndicators.map((indicator, index) => {
                  const Icon = indicator.icon;
                  return (
                    <div key={index} className="flex items-center gap-2">
                      {Icon && <Icon size={20} />}
                      <span className="text-sm font-medium">{indicator.text}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
