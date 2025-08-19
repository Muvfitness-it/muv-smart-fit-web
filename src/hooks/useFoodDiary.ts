import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FoodDiaryEntry, MealPlanType } from '@/types/planner';

export const useFoodDiary = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addDiaryEntry = async (
    mealPlanId: string,
    date: string,
    mealType: keyof MealPlanType,
    consumed: boolean,
    notes?: string
  ): Promise<FoodDiaryEntry | null> => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Adding food diary entry - feature not yet implemented');
      
      // TODO: Implement food_diary table
      // const { data: { user }, error: authError } = await supabase.auth.getUser();
      // 
      // if (authError || !user) {
      //   throw new Error('Devi essere autenticato');
      // }

      // const { data, error } = await supabase
      //   .from('food_diary')
      //   .upsert({
      //     user_id: user.id,
      //     meal_plan_id: mealPlanId,
      //     date,
      //     meal_type: mealType,
      //     consumed,
      //     notes,
      //     updated_at: new Date().toISOString()
      //   }, {
      //     onConflict: 'user_id,meal_plan_id,date,meal_type'
      //   })
      //   .select()
      //   .single();

      // if (error) throw error;
      // 
      // return data as FoodDiaryEntry;
      return null;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getDiaryEntries = async (date?: string): Promise<FoodDiaryEntry[]> => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Getting food diary entries - feature not yet implemented');
      
      // TODO: Implement food_diary table
      // const { data: { user }, error: authError } = await supabase.auth.getUser();
      // 
      // if (authError || !user) {
      //   throw new Error('Devi essere autenticato');
      // }

      // let query = supabase
      //   .from('food_diary')
      //   .select('*')
      //   .eq('user_id', user.id);

      // if (date) {
      //   query = query.eq('date', date);
      // }

      // const { data, error } = await query.order('date', { ascending: false });

      // if (error) throw error;
      // 
      // return data as FoodDiaryEntry[];
      return [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addDiaryEntry,
    getDiaryEntries,
    isLoading,
    error
  };
};