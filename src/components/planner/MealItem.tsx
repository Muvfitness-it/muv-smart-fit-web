
import React from 'react';

interface MealData {
  descrizione: string;
  alimenti: string[];
  kcal: number;
}

interface MealItemProps {
  mealName: string;
  mealData: MealData;
}

const MealItem: React.FC<MealItemProps> = ({ mealName, mealData }) => {
  const formatMealName = (name: string) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const mealIcons: Record<string, string> = {
    colazione: '🍎',
    spuntino_mattutino: '🥪',
    pranzo: '🍲',
    spuntino_pomeridiano: '🥪',
    cena: '🍽️'
  };

  return (
    <div className="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
      <div className="flex items-start mb-3">
        <div className="pt-1 text-green-400 w-8 h-8 text-2xl">
          {mealIcons[mealName]}
        </div>
        <div className="ml-4 flex-grow">
          <div className="flex justify-between items-baseline">
            <h3 className="text-xl font-bold text-green-300">{formatMealName(mealName)}</h3>
            <span className="text-lg font-bold text-green-400">~{mealData.kcal} kcal</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">{mealData.descrizione}</p>
        </div>
      </div>
      <ul className="space-y-2 pl-2">
        {mealData.alimenti.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-400 mr-2">•</span>
            <span className="text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealItem;
