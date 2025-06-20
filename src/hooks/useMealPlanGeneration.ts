
import { useState } from 'react';
import { useGeminiAPI } from './useGeminiAPI';
import { MealPlanData, ShoppingListData, MealData } from '../types/planner';

export const useMealPlanGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { callGeminiAPI } = useGeminiAPI();

  const generateMealPlan = async (targetCalories: number): Promise<MealPlanData | null> => {
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
        return { calories: targetCalories, plan };
      } else {
        throw new Error("Risposta IA non valida.");
      }
    } catch (err: any) {
      setError(err.message || 'Errore generazione piano.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateMealPlan,
    isLoading,
    error
  };
};
