
-- Tabella per salvare i piani alimentari generati
CREATE TABLE public.meal_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  calories INTEGER NOT NULL,
  goal TEXT NOT NULL,
  allergies JSONB DEFAULT '[]'::jsonb,
  intolerances JSONB DEFAULT '[]'::jsonb,
  plan_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabella per il diario alimentare (tracking dei pasti consumati)
CREATE TABLE public.food_diary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  meal_plan_id UUID REFERENCES public.meal_plans,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  meal_type TEXT NOT NULL, -- colazione, spuntino_mattutino, pranzo, spuntino_pomeridiano, cena
  consumed BOOLEAN NOT NULL DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabella per il tracking del peso e misure
CREATE TABLE public.body_measurements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  body_fat_percentage DECIMAL(4,2),
  muscle_mass DECIMAL(5,2),
  notes TEXT,
  measured_at DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Abilita RLS per tutte le tabelle
ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_diary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;

-- Politiche RLS per meal_plans
CREATE POLICY "Users can view their own meal plans" 
  ON public.meal_plans 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own meal plans" 
  ON public.meal_plans 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meal plans" 
  ON public.meal_plans 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meal plans" 
  ON public.meal_plans 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Politiche RLS per food_diary
CREATE POLICY "Users can view their own food diary" 
  ON public.food_diary 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own food diary entries" 
  ON public.food_diary 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food diary entries" 
  ON public.food_diary 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food diary entries" 
  ON public.food_diary 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Politiche RLS per body_measurements
CREATE POLICY "Users can view their own body measurements" 
  ON public.body_measurements 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own body measurements" 
  ON public.body_measurements 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own body measurements" 
  ON public.body_measurements 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own body measurements" 
  ON public.body_measurements 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Indici per migliorare le performance
CREATE INDEX meal_plans_user_id_idx ON public.meal_plans(user_id);
CREATE INDEX food_diary_user_id_date_idx ON public.food_diary(user_id, date);
CREATE INDEX body_measurements_user_id_date_idx ON public.body_measurements(user_id, measured_at);
