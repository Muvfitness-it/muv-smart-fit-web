
import React from 'react';
import { Calendar, CalendarDays } from 'lucide-react';

interface PlanTypeSelectorProps {
  planType: 'daily' | 'weekly';
  onPlanTypeChange: (type: 'daily' | 'weekly') => void;
}

const PlanTypeSelector: React.FC<PlanTypeSelectorProps> = ({
  planType,
  onPlanTypeChange
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-200 mb-3">
        Tipo di Piano Alimentare
      </label>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onPlanTypeChange('daily')}
          className={`p-4 rounded-lg border transition-all duration-200 ${
            planType === 'daily'
              ? 'bg-green-600 border-green-500 text-white'
              : 'bg-gray-800/60 border-gray-600 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Calendar className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-medium">Piano Giornaliero</div>
          <div className="text-xs opacity-80">Menu per un singolo giorno</div>
        </button>
        
        <button
          type="button"
          onClick={() => onPlanTypeChange('weekly')}
          className={`p-4 rounded-lg border transition-all duration-200 ${
            planType === 'weekly'
              ? 'bg-green-600 border-green-500 text-white'
              : 'bg-gray-800/60 border-gray-600 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <CalendarDays className="w-6 h-6 mx-auto mb-2" />
          <div className="text-sm font-medium">Piano Settimanale</div>
          <div className="text-xs opacity-80">Menu per tutta la settimana</div>
        </button>
      </div>
    </div>
  );
};

export default PlanTypeSelector;
