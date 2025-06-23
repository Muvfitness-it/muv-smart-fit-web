
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

export type ViewType = 'calculator' | 'mealPlan' | 'shoppingList';
