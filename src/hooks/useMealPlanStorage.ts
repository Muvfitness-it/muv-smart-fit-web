
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { MealPlanData, SavedMealPlan, FormData } from '@/types/planner';

export const useMealPlanStorage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const saveMealPlan = async (
    mealPlanData: MealPlanData,
    formData: FormData
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
          allergies: formData.allergies,
          intolerances: formData.intolerances,
          plan_data: mealPlanData.plan
        })
        .select()
        .single();

      if (error) throw error;
      
      return data as SavedMealPlan;
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
      
      return data as SavedMealPlan[];
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
