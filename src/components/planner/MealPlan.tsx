
import React from 'react';
import { Target, ShoppingCart, FileDown } from 'lucide-react';
import CoachChat from './CoachChat';

interface MealData {
  descrizione: string;
  alimenti: string[];
  kcal: number;
}

interface MealPlan {
  colazione: MealData;
  spuntino_mattutino: MealData;
  pranzo: MealData;
  spuntino_pomeridiano: MealData;
  cena: MealData;
}

interface MealPlanData {
  calories: number;
  plan: MealPlan;
}

interface FormData {
  goal: string;
}

interface MealPlanProps {
  mealPlanData: MealPlanData;
  formData: FormData;
  isShoppingListLoading: boolean;
  mealPlanError: string;
  onGenerateShoppingList: () => void;
  onExportPDF: (elementId: string, fileName: string) => void;
  onRecalculate: () => void;
}

const MealPlan: React.FC<MealPlanProps> = ({
  mealPlanData,
  formData,
  isShoppingListLoading,
  mealPlanError,
  onGenerateShoppingList,
  onExportPDF,
  onRecalculate
}) => {
  const { calories, plan } = mealPlanData;
  const mealOrder: (keyof MealPlan)[] = ['colazione', 'spuntino_mattutino', 'pranzo', 'spuntino_pomeridiano', 'cena'];
  
  const formatMealName = (name: string) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const mealIcons = {
    colazione: '🍎',
    spuntino_mattutino: '🥪',
    pranzo: '🍲',
    spuntino_pomeridiano: '🥪',
    cena: '🍽️'
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white">
      <div id="meal-plan-export" className="p-6 md:p-8 bg-gray-900/0 rounded-t-2xl">
        <div className="text-center mb-8">
          <p className="text-gray-300">Piano nutrizionale di esempio</p>
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3">
            <Target className="w-10 h-10" />
            <span>{calories} kcal</span>
          </h2>
          <p className="text-gray-400 mt-1">
            Obiettivo: {formData.goal === 'lose' ? 'Definizione' : formData.goal === 'gain' ? 'Aumento massa' : 'Mantenimento'}
          </p>
        </div>
        <div className="space-y-6">
          {mealOrder.map(mealName => {
            const mealData = plan[mealName];
            if (!mealData) return null;
            
            return (
              <div key={mealName} className="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
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
          })}
        </div>
      </div>
      <div className="p-6 md:p-8 pt-0">
        <div className="mt-8 pt-6 border-t border-white/10 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={onGenerateShoppingList}
              disabled={isShoppingListLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:bg-gray-500"
            >
              <ShoppingCart className="inline-block mr-2" />
              {isShoppingListLoading ? 'Creando...' : 'Lista Spesa'}
            </button>
            <button
              onClick={() => onExportPDF('meal-plan-export', 'piano_alimentare_muv.pdf')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
            >
              <FileDown className="inline-block mr-2" />
              Esporta PDF
            </button>
          </div>
          
          <CoachChat mealPlanCalories={calories} />
          
          {mealPlanError && (
            <div className="mt-4 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-start">
              <span>{mealPlanError}</span>
            </div>
          )}
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Questo piano alimentare è un esempio generato da un'IA e non sostituisce una consulenza medica personalizzata.</p>
        </div>
        <button
          onClick={onRecalculate}
          className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          Nuovo Calcolo
        </button>
      </div>
    </div>
  );
};

export default MealPlan;
