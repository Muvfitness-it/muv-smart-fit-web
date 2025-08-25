
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
  title = "⏰ OFFERTA IN SCADENZA"
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
    <section className="py-12 bg-gradient-to-r from-red-600/20 via-red-700/20 to-red-800/20 border-y-4 border-red-500">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-4">
          <Clock className="w-12 h-12 text-red-400 animate-pulse" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-black text-red-400 mb-6">
          {title}
        </h3>
        
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          <div className="bg-red-900/50 p-4 rounded-xl border-2 border-red-500/50">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-red-300 font-semibold">GIORNI</div>
          </div>
          
          <div className="bg-red-900/50 p-4 rounded-xl border-2 border-red-500/50">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-red-300 font-semibold">ORE</div>
          </div>
          
          <div className="bg-red-900/50 p-4 rounded-xl border-2 border-red-500/50">
            <div className="text-3xl md:text-4xl font-black text-white mb-1">
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-red-300 font-semibold">MIN</div>
          </div>
          
          <div className="bg-red-900/50 p-4 rounded-xl border-2 border-red-500/50">
            <div className="text-3xl md:text-4xl font-black text-white mb-1 animate-pulse">
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-red-300 font-semibold">SEC</div>
          </div>
        </div>
        
        <p className="text-lg md:text-xl text-red-300 font-bold mt-6">
          🔥 Solo <span className="text-white font-black">3 POSTI RIMASTI</span> per questo programma!
        </p>
      </div>
    </section>
  );
};

export default LandingCountdown;
