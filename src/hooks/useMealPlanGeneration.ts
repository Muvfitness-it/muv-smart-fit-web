
import { useState } from 'react';
import { useGeminiAPI } from './useGeminiAPI';
import { MealPlanData, MealData } from '../types/planner';

export const useMealPlanGeneration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { callGeminiAPI } = useGeminiAPI();

  const generateMealPlan = async (
    targetCalories: number, 
    allergies: string[] = [], 
    intolerances: string[] = [],
    planType: 'daily' | 'weekly' = 'daily'
  ): Promise<MealPlanData | null> => {
    setIsLoading(true);
    setError('');
    
    let allergyRestrictions = '';
    if (allergies.length > 0 || intolerances.length > 0) {
      const restrictions = [];
      if (allergies.length > 0) {
        restrictions.push(`ALLERGIE DA EVITARE ASSOLUTAMENTE: ${allergies.join(', ')}`);
      }
      if (intolerances.length > 0) {
        restrictions.push(`INTOLLERANZE DA CONSIDERARE: ${intolerances.join(', ')}`);
      }
      allergyRestrictions = ` IMPORTANTE: ${restrictions.join(' | ')}. Assicurati che NESSUN alimento nel piano contenga questi ingredienti o loro derivati.`;
    }
    
    const mealObjectSchema = {
      type: "OBJECT",
      properties: {
        descrizione: { type: "STRING" },
        alimenti: { type: "ARRAY", items: { type: "STRING" } },
        kcal: { type: "NUMBER" }
      },
      required: ["descrizione", "alimenti", "kcal"]
    };

    const dayPlanSchema = {
      type: "OBJECT",
      properties: {
        colazione: mealObjectSchema,
        spuntino_mattutino: mealObjectSchema,
        pranzo: mealObjectSchema,
        spuntino_pomeridiano: mealObjectSchema,
        cena: mealObjectSchema
      },
      required: ["colazione", "spuntino_mattutino", "pranzo", "spuntino_pomeridiano", "cena"]
    };

    let prompt: string;
    let responseSchema: any;

    if (planType === 'weekly') {
      // Approccio semplificato per il piano settimanale - generiamo 7 piani giornalieri separati
      const weekDays = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
      const weeklyPlan: any = {};
      
      for (const day of weekDays) {
        const dayPrompt = `Agisci come un massimo esperto in nutrizione sportiva e clinica. Crea un piano alimentare per ${day} con ${targetCalories} kcal totali.${allergyRestrictions} 

Include 5 pasti: colazione, spuntino_mattutino, pranzo, spuntino_pomeridiano, cena.
Considera le preferenze italiane e la stagionalità.
Per ogni pasto fornisci: descrizione breve, lista alimenti con quantità, kcal approssimative.
IMPORTANTE: Rendi questo piano diverso e variegato rispetto ad altri giorni della settimana.`;

        const dayPayload = {
          contents: [{ role: "user", parts: [{ text: dayPrompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: dayPlanSchema
          }
        };
        
        try {
          const dayResult = await callGeminiAPI(dayPayload);
          if (dayResult.candidates?.[0]?.content?.parts?.[0]?.text) {
            weeklyPlan[day] = JSON.parse(dayResult.candidates[0].content.parts[0].text);
          } else {
            throw new Error(`Errore generazione piano per ${day}`);
          }
        } catch (err: any) {
          setError(err.message || 'Errore generazione piano settimanale.');
          setIsLoading(false);
          return null;
        }
      }
      
      setIsLoading(false);
      return { calories: targetCalories, plan: weeklyPlan, planType };
    } else {
      prompt = `Agisci come un massimo esperto in nutrizione sportiva e clinica. Crea un piano alimentare giornaliero per ${targetCalories} kcal.${allergyRestrictions} Include 5 pasti: colazione, spuntino_mattutino, pranzo, spuntino_pomeridiano, cena. Per ogni pasto fornisci: descrizione breve, lista alimenti con quantità, kcal approssimative.`;
      
      responseSchema = dayPlanSchema;
    
      const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema
        }
      };
      
      try {
        const result = await callGeminiAPI(payload);
        if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
          const plan = JSON.parse(result.candidates[0].content.parts[0].text);
          return { calories: targetCalories, plan, planType };
        } else {
          throw new Error("Risposta IA non valida.");
        }
      } catch (err: any) {
        setError(err.message || 'Errore generazione piano.');
        return null;
      } finally {
        setIsLoading(false);
      }
    }
  };

  return {
    generateMealPlan,
    isLoading,
    error
  };
};
