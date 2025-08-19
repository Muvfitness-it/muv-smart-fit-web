
import { useState } from 'react';
import { toast } from 'sonner';
import { MealPlanData, SavedMealPlan, MealPlanType, WeeklyMealPlan } from '@/types/planner';

interface FormDataForSaving {
  goal: string;
  allergies: string[];
  intolerances: string[];
  planType: 'daily' | 'weekly';
}

export const useMealPlanStorage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const saveMealPlan = async (
    mealPlanData: MealPlanData,
    formData: FormDataForSaving
  ): Promise<SavedMealPlan | null> => {
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implement database storage when meal_plans table is created
      // For now, use localStorage
      const savedPlans = JSON.parse(localStorage.getItem('savedMealPlans') || '[]');
      
      const newPlan: SavedMealPlan = {
        id: Date.now().toString(),
        user_id: 'local-user',
        calories: mealPlanData.calories,
        goal: formData.goal,
        allergies: formData.allergies,
        intolerances: formData.intolerances,
        plan_data: mealPlanData.plan,
        plan_type: formData.planType,
        created_at: new Date().toISOString()
      };

      savedPlans.push(newPlan);
      localStorage.setItem('savedMealPlans', JSON.stringify(savedPlans));

      toast.success('Piano alimentare salvato con successo!');
      return newPlan;
    } catch (err: any) {
      setError(err.message);
      toast.error('Errore nel salvataggio del piano alimentare');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getMealPlans = async (): Promise<SavedMealPlan[]> => {
    setIsLoading(true);
    setError('');
    
    try {
      // TODO: Implement database retrieval when meal_plans table is created
      // For now, use localStorage
      const savedPlans = JSON.parse(localStorage.getItem('savedMealPlans') || '[]');
      
      return savedPlans.sort((a: SavedMealPlan, b: SavedMealPlan) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveMealPlan,
    getMealPlans,
    isLoading,
    error
  };
};
