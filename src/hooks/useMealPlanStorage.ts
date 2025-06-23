
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('Devi essere autenticato per salvare un piano alimentare');
      }

      if (formData.planType === 'weekly') {
        // Salva ogni giorno della settimana come record separato
        const weeklyPlan = mealPlanData.plan as WeeklyMealPlan;
        const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'] as const;
        
        const insertPromises = days.map((day, index) => 
          supabase
            .from('meal_plans')
            .insert({
              user_id: user.id,
              calories: mealPlanData.calories,
              goal: formData.goal,
              allergies: formData.allergies as any,
              intolerances: formData.intolerances as any,
              plan_data: weeklyPlan[day] as any,
              plan_type: 'weekly',
              week_day: index
            })
        );

        const results = await Promise.all(insertPromises);
        
        // Controlla se ci sono errori
        const errors = results.filter(result => result.error);
        if (errors.length > 0) {
          throw new Error(errors[0].error?.message || 'Errore nel salvare il piano settimanale');
        }

        // Controlla che il primo risultato e i suoi dati esistano
        const firstResult = results[0];
        if (!firstResult.data || firstResult.data.length === 0) {
          throw new Error('Errore nel recuperare i dati del piano salvato');
        }

        // Ritorna il primo record come rappresentante del piano settimanale
        return {
          id: firstResult.data[0].id,
          user_id: user.id,
          calories: mealPlanData.calories,
          goal: formData.goal,
          allergies: formData.allergies,
          intolerances: formData.intolerances,
          plan_data: mealPlanData.plan,
          plan_type: 'weekly',
          created_at: firstResult.data[0].created_at
        } as SavedMealPlan;
      } else {
        // Piano giornaliero
        const { data, error } = await supabase
          .from('meal_plans')
          .insert({
            user_id: user.id,
            calories: mealPlanData.calories,
            goal: formData.goal,
            allergies: formData.allergies as any,
            intolerances: formData.intolerances as any,
            plan_data: mealPlanData.plan as any,
            plan_type: 'daily'
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
      }
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
      
      // Raggruppa i piani settimanali
      const groupedPlans: SavedMealPlan[] = [];
      const weeklyPlansMap = new Map<string, any[]>();
      
      data.forEach(item => {
        if (item.plan_type === 'weekly') {
          const groupKey = `${item.calories}-${item.goal}-${item.created_at.split('T')[0]}`;
          if (!weeklyPlansMap.has(groupKey)) {
            weeklyPlansMap.set(groupKey, []);
          }
          weeklyPlansMap.get(groupKey)?.push(item);
        } else {
          groupedPlans.push({
            ...item,
            plan_data: item.plan_data as unknown as MealPlanType,
            allergies: item.allergies as string[],
            intolerances: item.intolerances as string[]
          } as SavedMealPlan);
        }
      });
      
      // Processa i piani settimanali
      weeklyPlansMap.forEach(weekDays => {
        if (weekDays.length === 7) {
          weekDays.sort((a, b) => (a.week_day || 0) - (b.week_day || 0));
          
          const weeklyPlan: WeeklyMealPlan = {
            lunedi: weekDays[0].plan_data,
            martedi: weekDays[1].plan_data,
            mercoledi: weekDays[2].plan_data,
            giovedi: weekDays[3].plan_data,
            venerdi: weekDays[4].plan_data,
            sabato: weekDays[5].plan_data,
            domenica: weekDays[6].plan_data
          };
          
          groupedPlans.push({
            ...weekDays[0],
            plan_data: weeklyPlan,
            allergies: weekDays[0].allergies as string[],
            intolerances: weekDays[0].intolerances as string[]
          } as SavedMealPlan);
        }
      });
      
      return groupedPlans.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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
