
export interface FormData {
  gender: string;
  age: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
  allergies: string[];
  intolerances: string[];
  planType: 'daily' | 'weekly'; // Nuovo campo per il tipo di piano
}

export interface MealData {
  descrizione: string;
  alimenti: string[];
  kcal: number;
}

export interface MealPlanType {
  colazione: MealData;
  spuntino_mattutino: MealData;
  pranzo: MealData;
  spuntino_pomeridiano: MealData;
  cena: MealData;
}

// Nuovo tipo per i piani settimanali
export interface WeeklyMealPlan {
  lunedi: MealPlanType;
  martedi: MealPlanType;
  mercoledi: MealPlanType;
  giovedi: MealPlanType;
  venerdi: MealPlanType;
  sabato: MealPlanType;
  domenica: MealPlanType;
}

export interface MealPlanData {
  calories: number;
  plan: MealPlanType | WeeklyMealPlan;
  planType: 'daily' | 'weekly';
}

export interface ShoppingItem {
  categoria: string;
  nome: string;
  quantita: string;
  costo_calcolato_eur: number;
}

export interface ShoppingListData {
  lista_spesa: ShoppingItem[];
  totale_calcolato_eur: number;
}

// Tipi aggiornati per il tracking
export interface SavedMealPlan {
  id: string;
  user_id: string;
  calories: number;
  goal: string;
  allergies: string[];
  intolerances: string[];
  plan_data: MealPlanType | WeeklyMealPlan;
  plan_type: 'daily' | 'weekly';
  week_day?: number;
  created_at: string;
}

export interface FoodDiaryEntry {
  id: string;
  user_id: string;
  meal_plan_id?: string;
  date: string;
  meal_type: keyof MealPlanType;
  consumed: boolean;
  notes?: string;
  week_day?: number;
  created_at: string;
  updated_at: string;
}

export interface BodyMeasurement {
  id: string;
  user_id: string;
  weight?: number;
  height?: number;
  body_fat_percentage?: number;
  muscle_mass?: number;
  notes?: string;
  measured_at: string;
  created_at: string;
}

export type ViewType = 'calculator' | 'mealPlan' | 'shoppingList' | 'tracking';
