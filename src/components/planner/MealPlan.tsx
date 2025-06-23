
import React from 'react';
import { Button } from '@/components/ui/button';
import { useMealPlanStorage } from '@/hooks/useMealPlanStorage';
import { useToast } from '@/hooks/use-toast';
import MealPlanHeader from './MealPlanHeader';
import MealItem from './MealItem';
import MealPlanActions from './MealPlanActions';
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

interface PlannerFormData {
  goal: string;
  allergies: string[];
  intolerances: string[];
}

interface MealPlanProps {
  mealPlanData: MealPlanData;
  formData: PlannerFormData;
  isShoppingListLoading: boolean;
  mealPlanError: string;
  onGenerateShoppingList: () => void;
  onExportPDF: (elementId: string, fileName: string) => void;
  onRecalculate: () => void;
  onAskCoach: (question: string) => Promise<string>;
  onViewTracking: () => void;
}

const MealPlan: React.FC<MealPlanProps> = ({
  mealPlanData,
  formData,
  isShoppingListLoading,
  mealPlanError,
  onGenerateShoppingList,
  onExportPDF,
  onRecalculate,
  onAskCoach,
  onViewTracking
}) => {
  const { calories, plan } = mealPlanData;
  const { saveMealPlan, isLoading: isSaving } = useMealPlanStorage();
  const { toast } = useToast();
  const mealOrder: (keyof MealPlan)[] = ['colazione', 'spuntino_mattutino', 'pranzo', 'spuntino_pomeridiano', 'cena'];

  const handleSavePlan = async () => {
    const result = await saveMealPlan(mealPlanData, formData);
    if (result) {
      toast({
        title: "Piano salvato!",
        description: "Il piano alimentare è stato salvato nel tuo profilo.",
      });
    } else {
      toast({
        title: "Errore",
        description: "Non è stato possibile salvare il piano. Riprova.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white">
      <div id="meal-plan-export" className="p-6 md:p-8 bg-gray-900/0 rounded-t-2xl">
        <MealPlanHeader calories={calories} formData={formData} />
        
        <div className="space-y-6">
          {mealOrder.map(mealName => {
            const mealData = plan[mealName];
            if (!mealData) return null;
            
            return (
              <MealItem
                key={mealName}
                mealName={mealName}
                mealData={mealData}
              />
            );
          })}
        </div>
      </div>
      
      <div className="p-6 md:p-8 pt-0">
        <div className="mt-8 pt-6 border-t border-white/10 space-y-6">
          <MealPlanActions
            onSavePlan={handleSavePlan}
            onGenerateShoppingList={onGenerateShoppingList}
            onExportPDF={() => onExportPDF('meal-plan-export', 'piano_alimentare_muv.pdf')}
            onViewTracking={onViewTracking}
            isSaving={isSaving}
            isShoppingListLoading={isShoppingListLoading}
          />
          
          <CoachChat 
            mealPlanCalories={mealPlanData.calories} 
            onAskCoach={onAskCoach}
          />
          
          {mealPlanError && (
            <div className="mt-4 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-start">
              <span>{mealPlanError}</span>
            </div>
          )}
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Questo piano alimentare è personalizzato in base alle tue restrizioni alimentari e non sostituisce una consulenza medica.</p>
        </div>
        <Button
          onClick={onRecalculate}
          variant="outline"
          className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg border-gray-500"
        >
          Nuovo Calcolo
        </Button>
      </div>
    </div>
  );
};

export default MealPlan;
