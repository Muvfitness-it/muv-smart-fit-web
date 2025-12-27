import React, { useEffect, useState, useRef } from 'react';
import { Star, Users, Award, Clock } from 'lucide-react';

const proofItems = [
  {
    icon: Star,
    value: "4.9/5",
    label: "su Google Reviews",
    color: "text-yellow-500"
  },
  {
    icon: Users,
    value: "120+",
    label: "trasformazioni quest'anno",
    color: "text-primary"
  },
  {
    icon: Award,
    value: "Unico",
    label: "centro EMS a Legnago",
    color: "text-accent"
  },
  {
    icon: Clock,
    value: "30 giorni",
    label: "per vedere i primi risultati",
    color: "text-secondary"
  }
];

const SocialProofBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section 
      ref={barRef}
      className="relative py-8 md:py-10 bg-muted/50 border-y border-border overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`
                  flex flex-col items-center text-center
                  transition-all duration-700 ease-out
                  ${isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                  }
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`
                  w-12 h-12 md:w-14 md:h-14 rounded-full 
                  bg-background shadow-lg border border-border
                  flex items-center justify-center mb-3
                  transition-transform duration-500 hover:scale-110
                `}>
                  <Icon className={`w-6 h-6 md:w-7 md:h-7 ${item.color}`} />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground mb-1">
                  {item.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProofBar;
