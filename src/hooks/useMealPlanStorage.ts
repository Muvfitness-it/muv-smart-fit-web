
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MealPlanData, SavedMealPlan, MealPlanType } from '@/types/planner';

interface FormDataForSaving {
  goal: string;
  allergies: string[];
  intolerances: string[];
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
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('Devi essere autenticato per salvare un piano alimentare');
      }

      const { data, error } = await supabase
        .from('meal_plans')
        .insert({
          user_id: user.id,
          calories: mealPlanData.calories,
          goal: formData.goal,
          allergies: formData.allergies as any,
          intolerances: formData.intolerances as any,
          plan_data: mealPlanData.plan as any
        })
        .select()
        .single();

      if (error) throw error;
      
      return {
        ...data,
        plan_data: data.plan_data as unknown as MealPlanType,
        allergies: data.allergies as string[],
        intolerances: data.intolerances as string[]
      } as SavedMealPlan;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getMealPlans = async (): Promise<SavedMealPlan[]> => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('Devi essere autenticato per visualizzare i piani alimentari');
      }

      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      return data.map(item => ({
        ...item,
        plan_data: item.plan_data as unknown as MealPlanType,
        allergies: item.allergies as string[],
        intolerances: item.intolerances as string[]
      })) as SavedMealPlan[];
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
