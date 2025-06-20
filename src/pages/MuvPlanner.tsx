
import React, { useState } from 'react';
import CalculatorForm from '../components/planner/CalculatorForm';
import MealPlan from '../components/planner/MealPlan';
import ShoppingList from '../components/planner/ShoppingList';
import { useGeminiAPI } from '../hooks/useGeminiAPI';

interface FormData {
  gender: string;
  age: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
}

interface MealData {
  descrizione: string;
  alimenti: string[];
  kcal: number;
}

interface MealPlan {
  colazione: MealData;
  spuntino_mattutino: MealData;
  pranzo: MealData;
  spuntino_pomeridiano: MealData;
  cena: MealData;
}

interface MealPlanData {
  calories: number;
  plan: MealPlan;
}

interface ShoppingItem {
  categoria: string;
  nome: string;
  quantita: string;
  costo_calcolato_eur: number;
}

interface ShoppingListData {
  lista_spesa: ShoppingItem[];
  totale_calcolato_eur: number;
}

type ViewType = 'calculator' | 'mealPlan' | 'shoppingList';

const MuvPlanner = () => {
  const [currentView, setCurrentView] = useState<ViewType>('calculator');
  const [formData, setFormData] = useState<FormData>({
    gender: 'male',
    age: '30',
    weight: '70',
    height: '175',
    activityLevel: '1.375',
    goal: 'maintain'
  });
  const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
  const [shoppingListData, setShoppingListData] = useState<ShoppingListData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShoppingListLoading, setIsShoppingListLoading] = useState(false);
  const [error, setError] = useState('');
  const [mealPlanError, setMealPlanError] = useState('');

  const { callGeminiAPI } = useGeminiAPI();

  const generateMealPlan = async (targetCalories: number) => {
    setIsLoading(true);
    setError('');
    
    const prompt = `Agisci come un massimo esperto in nutrizione sportiva e clinica. Crea un piano alimentare giornaliero per ${targetCalories} kcal. Include 5 pasti: colazione, spuntino_mattutino, pranzo, spuntino_pomeridiano, cena. Per ogni pasto fornisci: descrizione breve, lista alimenti con quantità, kcal approssimative.`;
    
    const mealObjectSchema = {
      type: "OBJECT",
      properties: {
        descrizione: { type: "STRING" },
        alimenti: { type: "ARRAY", items: { type: "STRING" } },
        kcal: { type: "NUMBER" }
      },
      required: ["descrizione", "alimenti", "kcal"]
    };
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            colazione: mealObjectSchema,
            spuntino_mattutino: mealObjectSchema,
            pranzo: mealObjectSchema,
            spuntino_pomeridiano: mealObjectSchema,
            cena: mealObjectSchema
          },
          required: ["colazione", "spuntino_mattutino", "pranzo", "spuntino_pomeridiano", "cena"]
        }
      }
    };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const plan = JSON.parse(result.candidates[0].content.parts[0].text);
        setMealPlanData({ calories: targetCalories, plan });
        setCurrentView('mealPlan');
      } else {
        throw new Error("Risposta IA non valida.");
      }
    } catch (err: any) {
      setError(err.message || 'Errore generazione piano.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateShoppingList = async () => {
    if (!mealPlanData) return;
    
    setIsShoppingListLoading(true);
    setMealPlanError('');
    
    const prompt = `Dato il piano alimentare: ${JSON.stringify(mealPlanData.plan)}, estrai tutti gli ingredienti necessari e crea una lista della spesa organizzata per categoria con quantità e costi stimati in EUR.`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            lista_spesa: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  categoria: { type: "STRING" },
                  nome: { type: "STRING" },
                  quantita: { type: "STRING" },
                  costo_calcolato_eur: { type: "NUMBER" }
                },
                required: ["categoria", "nome", "quantita", "costo_calcolato_eur"]
              }
            },
            totale_calcolato_eur: { type: "NUMBER" }
          },
          required: ["lista_spesa", "totale_calcolato_eur"]
        }
      }
    };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const shoppingData = JSON.parse(result.candidates[0].content.parts[0].text);
        setShoppingListData(shoppingData);
        setCurrentView('shoppingList');
      } else {
        throw new Error("Impossibile generare la lista.");
      }
    } catch (err: any) {
      setMealPlanError(err.message || "Errore creazione lista.");
    } finally {
      setIsShoppingListLoading(false);
    }
  };

  const exportToPDF = (elementId: string, fileName: string) => {
    // PDF export functionality would need to be implemented here
    console.log(`Exporting ${elementId} as ${fileName}`);
  };

  const handleRecalculate = () => {
    setCurrentView('calculator');
    setMealPlanData(null);
    setShoppingListData(null);
    setError('');
    setMealPlanError('');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calculator':
        return (
          <CalculatorForm
            formData={formData}
            isLoading={isLoading}
            error={error}
            onFormDataChange={setFormData}
            onSubmit={generateMealPlan}
          />
        );
      case 'mealPlan':
        return mealPlanData ? (
          <MealPlan
            mealPlanData={mealPlanData}
            formData={formData}
            isShoppingListLoading={isShoppingListLoading}
            mealPlanError={mealPlanError}
            onGenerateShoppingList={generateShoppingList}
            onExportPDF={exportToPDF}
            onRecalculate={handleRecalculate}
          />
        ) : null;
      case 'shoppingList':
        return shoppingListData ? (
          <ShoppingList
            shoppingListData={shoppingListData}
            onBackToMealPlan={() => setCurrentView('mealPlan')}
            onExportPDF={exportToPDF}
            onRecalculate={handleRecalculate}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center" 
         style={{
           backgroundImage: 'radial-gradient(circle at top right, rgb(29, 78, 216, 0.15), transparent), radial-gradient(circle at bottom left, rgb(22, 163, 74, 0.15), transparent)'
         }}>
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-white">MUV</span>
            <span className="text-green-400">.</span>
            <span className="text-white">Planner</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Il tuo assistente nutrizionale intelligente</p>
        </header>

        <main>
          {renderCurrentView()}
        </main>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MUV Fitness Center. Tutti i diritti riservati.</p>
        </footer>
      </div>
    </div>
  );
};

export default MuvPlanner;
