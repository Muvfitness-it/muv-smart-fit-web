import React, { useEffect, useState } from 'react';

interface StatItem {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

interface AnimatedStatsProps {
  stats: StatItem[];
  className?: string;
}

const AnimatedStats: React.FC<AnimatedStatsProps> = ({ stats, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('animated-stats');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div id="animated-stats" className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`text-center p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/5 rounded-2xl border border-brand-primary/20 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: `${(stat.delay || index) * 200}ms` }}
        >
          <div className="text-4xl md:text-5xl font-black font-display mb-2">
            <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
              {stat.prefix}{stat.value}{stat.suffix}
            </span>
          </div>
          <p className="text-gray-600 font-body text-lg">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AnimatedStats;