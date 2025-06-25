
import React from 'react';
import { Users } from 'lucide-react';
import { usePlannerStats } from '@/hooks/usePlannerStats';

const UsageCounter: React.FC = () => {
  const { totalUsage, isLoading } = usePlannerStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm">
        <Users className="w-4 h-4" />
        <span>Caricamento...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-2 text-green-400 text-sm bg-gray-800/30 rounded-lg px-3 py-2 backdrop-blur-sm">
      <Users className="w-4 h-4" />
      <span>
        Utilizzato <strong>{totalUsage.toLocaleString()}</strong> volte
      </span>
    </div>
  );
};

export default UsageCounter;
