
import { useState } from 'react';
import { useGeminiAPI } from './useGeminiAPI';
import { MealPlanData, ShoppingListData } from '../types/planner';

export const useShoppingListGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { callGeminiAPI } = useGeminiAPI();

  const generateShoppingList = async (mealPlanData: MealPlanData): Promise<ShoppingListData | null> => {
    setIsLoading(true);
    setError('');
    
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
        return JSON.parse(result.candidates[0].content.parts[0].text);
      } else {
        throw new Error("Impossibile generare la lista.");
      }
    } catch (err: any) {
      setError(err.message || "Errore creazione lista.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generateShoppingList,
    isLoading,
    error
  };
};
