
-- Aggiungi una colonna per specificare se il piano è giornaliero o settimanale
ALTER TABLE public.meal_plans 
ADD COLUMN plan_type TEXT NOT NULL DEFAULT 'daily' CHECK (plan_type IN ('daily', 'weekly'));

-- Aggiungi una colonna per specificare il giorno della settimana (per piani settimanali)
ALTER TABLE public.meal_plans 
ADD COLUMN week_day INTEGER CHECK (week_day >= 0 AND week_day <= 6);

-- Aggiungi un indice per migliorare le performance delle query sui piani settimanali
CREATE INDEX meal_plans_plan_type_week_day_idx ON public.meal_plans(plan_type, week_day, user_id);

-- Aggiorna la tabella food_diary per supportare il tracking settimanale
ALTER TABLE public.food_diary 
ADD COLUMN week_day INTEGER CHECK (week_day >= 0 AND week_day <= 6);

-- Aggiorna l'indice per includere week_day
DROP INDEX food_diary_user_id_date_idx;
CREATE INDEX food_diary_user_id_date_week_day_idx ON public.food_diary(user_id, date, week_day);
