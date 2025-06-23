import React, { useState } from 'react';
import CalculatorForm from '../components/planner/CalculatorForm';
import MealPlan from '../components/planner/MealPlan';
import ShoppingList from '../components/planner/ShoppingList';
import { useMealPlanGeneration } from '../hooks/useMealPlanGeneration';
import { useShoppingListGeneration } from '../hooks/useShoppingListGeneration';
import { useCoachChat } from '../hooks/useCoachChat';
import { FormData, MealPlanData, ShoppingListData, ViewType } from '../types/planner';

const MuvPlanner = () => {
  const [currentView, setCurrentView] = useState<ViewType>('calculator');
  const [formData, setFormData] = useState<FormData>({
    gender: 'male',
    age: '30',
    weight: '70',
    height: '175',
    activityLevel: '1.375',
    goal: 'maintain',
    allergies: [],
    intolerances: []
  });
  const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
  const [shoppingListData, setShoppingListData] = useState<ShoppingListData | null>(null);

  const { generateMealPlan, isLoading: isMealPlanLoading, error: mealPlanError } = useMealPlanGeneration();
  const { generateShoppingList, isLoading: isShoppingListLoading, error: shoppingListError } = useShoppingListGeneration();
  const { askCoach } = useCoachChat();

  const handleFormSubmit = async (targetCalories: number) => {
    const result = await generateMealPlan(targetCalories, formData.allergies, formData.intolerances);
    if (result) {
      setMealPlanData(result);
      setCurrentView('mealPlan');
    }
  };

  const handleGenerateShoppingList = async () => {
    if (!mealPlanData) return;
    
    const result = await generateShoppingList(mealPlanData);
    if (result) {
      setShoppingListData(result);
      setCurrentView('shoppingList');
    }
  };

  const exportToPDF = (elementId: string, fileName: string) => {
    console.log(`Exporting ${elementId} as ${fileName}`);
  };

  const handleRecalculate = () => {
    setCurrentView('calculator');
    setMealPlanData(null);
    setShoppingListData(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calculator':
        return (
          <CalculatorForm
            formData={formData}
            isLoading={isMealPlanLoading}
            error={mealPlanError}
            onFormDataChange={setFormData}
            onSubmit={handleFormSubmit}
          />
        );
      case 'mealPlan':
        return mealPlanData ? (
          <MealPlan
            mealPlanData={mealPlanData}
            formData={formData}
            isShoppingListLoading={isShoppingListLoading}
            mealPlanError={shoppingListError}
            onGenerateShoppingList={handleGenerateShoppingList}
            onExportPDF={exportToPDF}
            onRecalculate={handleRecalculate}
            onAskCoach={askCoach}
          />
        ) : null;
      case 'shoppingList':
        return shoppingListData ? (
          <ShoppingList
            shoppingListData={shoppingListData}
            onBackToMealPlan={() => setCurrentView('mealPlan')}
            onExportPDF={exportToPDF}
            onRecalculate={handleRecalculate}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center" 
         style={{
           backgroundImage: 'radial-gradient(circle at top right, rgb(29, 78, 216, 0.15), transparent), radial-gradient(circle at bottom left, rgb(22, 163, 74, 0.15), transparent)'
         }}>
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-white">MUV</span>
            <span className="text-green-400">.</span>
            <span className="text-white">Planner</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Il tuo assistente nutrizionale intelligente</p>
        </header>

        <main>
          {renderCurrentView()}
        </main>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MUV Fitness Center. Tutti i diritti riservati.</p>
        </footer>
      </div>
    </div>
  );
};

export default MuvPlanner;
