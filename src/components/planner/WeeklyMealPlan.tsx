
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MealItem from './MealItem';
import { WeeklyMealPlan, MealPlanType } from '@/types/planner';

interface WeeklyMealPlanProps {
  weeklyPlan: WeeklyMealPlan;
}

const WeeklyMealPlanComponent: React.FC<WeeklyMealPlanProps> = ({ weeklyPlan }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'] as const;
  const dayLabels = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
  
  const mealOrder: (keyof MealPlanType)[] = ['colazione', 'spuntino_mattutino', 'pranzo', 'spuntino_pomeridiano', 'cena'];
  
  const currentDayPlan = weeklyPlan[days[selectedDay]];

  const navigateDay = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setSelectedDay(prev => prev === 0 ? 6 : prev - 1);
    } else {
      setSelectedDay(prev => prev === 6 ? 0 : prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Day Navigation */}
      <div className="flex items-center justify-between bg-gray-800/60 rounded-lg p-4">
        <Button
          onClick={() => navigateDay('prev')}
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="text-center">
          <h3 className="text-2xl font-bold text-green-400">{dayLabels[selectedDay]}</h3>
          <p className="text-sm text-gray-400">Giorno {selectedDay + 1} di 7</p>
        </div>
        
        <Button
          onClick={() => navigateDay('next')}
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Day Selector Pills */}
      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
        {dayLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              selectedDay === index
                ? 'bg-green-600 text-white'
                : 'bg-gray-700/60 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {label.slice(0, 3)}
          </button>
        ))}
      </div>

      {/* Meals for Selected Day */}
      <div className="space-y-4">
        {mealOrder.map(mealName => {
          const mealData = currentDayPlan[mealName];
          if (!mealData) return null;
          
          return (
            <MealItem
              key={`${days[selectedDay]}-${mealName}`}
              mealName={mealName}
              mealData={mealData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyMealPlanComponent;
