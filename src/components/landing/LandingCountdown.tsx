import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface LandingCountdownProps {
  endDate: Date;
  onExpire?: () => void;
  title?: string;
}

const LandingCountdown: React.FC<LandingCountdownProps> = ({
  endDate,
  onExpire,
  title = "Disponibilità limitata"
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        if (onExpire) onExpire();
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, onExpire]);

  return (
    <section className="py-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-y border-border">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <Clock className="w-10 h-10 text-primary" />
        </div>
        
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
          {title}
        </h3>
        
        <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Giorni</div>
          </div>
          
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Ore</div>
          </div>
          
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Minuti</div>
          </div>
          
          <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-xs text-muted-foreground font-medium">Secondi</div>
          </div>
        </div>
        
        <p className="text-base text-muted-foreground mt-6">
          Posti limitati per garantire attenzione personalizzata
        </p>
      </div>
    </section>
  );
};

export default LandingCountdown;
