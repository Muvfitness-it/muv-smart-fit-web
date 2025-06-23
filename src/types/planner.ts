
export interface FormData {
  gender: string;
  age: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
  allergies: string[];
  intolerances: string[];
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

export interface MealPlanData {
  calories: number;
  plan: MealPlanType;
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

// Nuovi tipi per il tracking
export interface SavedMealPlan {
  id: string;
  user_id: string;
  calories: number;
  goal: string;
  allergies: string[];
  intolerances: string[];
  plan_data: MealPlanType;
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
