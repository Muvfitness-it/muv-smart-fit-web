
import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { usePlannerStats } from '@/hooks/usePlannerStats';

const UsageCounter: React.FC = () => {
  const { totalUsage, isLoading, refreshStats } = usePlannerStats();
  const [displayUsage, setDisplayUsage] = useState<number>(0);

  // Animation effect for counter
  useEffect(() => {
    if (totalUsage > 0 && displayUsage !== totalUsage) {
      const increment = Math.ceil(totalUsage / 50); // Smooth animation
      const timer = setInterval(() => {
        setDisplayUsage(prev => {
          if (prev >= totalUsage) {
            clearInterval(timer);
            return totalUsage;
          }
          return Math.min(prev + increment, totalUsage);
        });
      }, 20);

      return () => clearInterval(timer);
    }
  }, [totalUsage, displayUsage]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStats();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshStats]);

  if (isLoading && displayUsage === 0) {
    return (
      <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm animate-pulse">
        <Users className="w-4 h-4" />
        <span>Caricamento statistiche...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 text-green-400 text-sm bg-gray-800/30 rounded-lg px-4 py-2 backdrop-blur-sm border border-green-400/20 hover:border-green-400/40 transition-all duration-300">
      <Users className="w-4 h-4 animate-pulse" />
      <span className="font-medium">
        Utilizzato <strong className="text-green-300 font-bold">{displayUsage.toLocaleString()}</strong> volte
      </span>
    </div>
  );
};

export default UsageCounter;
