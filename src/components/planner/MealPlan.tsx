
import React from 'react';
import { Button } from '@/components/ui/button';
import { useMealPlanStorage } from '@/hooks/useMealPlanStorage';
import { useToast } from '@/hooks/use-toast';
import MealPlanHeader from './MealPlanHeader';
import MealItem from './MealItem';
import WeeklyMealPlanComponent from './WeeklyMealPlan';
import MealPlanActions from './MealPlanActions';
import CoachChat from './CoachChat';
import { MealPlanData, MealPlanType, WeeklyMealPlan } from '@/types/planner';

interface PlannerFormData {
  goal: string;
  allergies: string[];
  intolerances: string[];
  planType: 'daily' | 'weekly';
}

interface MealPlanProps {
  mealPlanData: MealPlanData;
  formData: PlannerFormData;
  isShoppingListLoading: boolean;
  mealPlanError: string;
  isExporting?: boolean;
  onGenerateShoppingList: () => void;
  onExportPDF: (mealPlanData: MealPlanData, fileName: string) => Promise<void>;
  onRecalculate: () => void;
  onAskCoach: (question: string) => Promise<string>;
  onViewTracking: () => void;
}

const MealPlan: React.FC<MealPlanProps> = ({
  mealPlanData,
  formData,
  isShoppingListLoading,
  mealPlanError,
  isExporting = false,
  onGenerateShoppingList,
  onExportPDF,
  onRecalculate,
  onAskCoach,
  onViewTracking
}) => {
  const { calories, plan, planType } = mealPlanData;
  const { saveMealPlan, isLoading: isSaving } = useMealPlanStorage();
  const { toast } = useToast();
  
  const mealOrder: (keyof MealPlanType)[] = ['colazione', 'spuntino_mattutino', 'pranzo', 'spuntino_pomeridiano', 'cena'];

  const handleSavePlan = async () => {
    const result = await saveMealPlan(mealPlanData, formData);
    if (result) {
      toast({
        title: "Piano salvato!",
        description: `Il piano alimentare ${planType === 'weekly' ? 'settimanale' : 'giornaliero'} è stato salvato nel tuo profilo.`,
      });
    } else {
      toast({
        title: "Errore",
        description: "Non è stato possibile salvare il piano. Riprova.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = () => {
    onExportPDF(mealPlanData, `piano_alimentare_${planType}_muv.pdf`);
  };

  const renderMealPlan = () => {
    if (planType === 'weekly') {
      return <WeeklyMealPlanComponent weeklyPlan={plan as WeeklyMealPlan} />;
    }

    // Piano giornaliero
    const dailyPlan = plan as MealPlanType;
    return (
      <div className="space-y-6">
        {mealOrder.map(mealName => {
          const mealData = dailyPlan[mealName];
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
    );
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white">
      <div id="meal-plan-export" className="p-6 md:p-8 bg-gray-900/0 rounded-t-2xl">
        <MealPlanHeader calories={calories} formData={formData} />
        {renderMealPlan()}
      </div>
      
      <div className="p-6 md:p-8 pt-0">
        <div className="mt-8 pt-6 border-t border-white/10 space-y-6">
          <MealPlanActions
            onSavePlan={handleSavePlan}
            onGenerateShoppingList={onGenerateShoppingList}
            onExportPDF={handleExportPDF}
            onViewTracking={onViewTracking}
            isSaving={isSaving}
            isShoppingListLoading={isShoppingListLoading}
            isExporting={isExporting}
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
