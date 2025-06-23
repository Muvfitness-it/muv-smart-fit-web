
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
      prompt = `Agisci come un massimo esperto in nutrizione sportiva e clinica. Crea un piano alimentare SETTIMANALE completo per ${targetCalories} kcal al giorno.${allergyRestrictions} 

Crea 7 giorni diversi (lunedi, martedi, mercoledi, giovedi, venerdi, sabato, domenica), ognuno con 5 pasti: colazione, spuntino_mattutino, pranzo, spuntino_pomeridiano, cena. 

IMPORTANTE: 
- Ogni giorno deve essere DIVERSO dagli altri per varietà
- Ogni giorno deve avere circa ${targetCalories} kcal totali
- Considera le preferenze italiane e la stagionalità
- Per ogni pasto fornisci: descrizione breve, lista alimenti con quantità, kcal approssimative`;

      responseSchema = {
        type: "OBJECT",
        properties: {
          lunedi: dayPlanSchema,
          martedi: dayPlanSchema,
          mercoledi: dayPlanSchema,
          giovedi: dayPlanSchema,
          venerdi: dayPlanSchema,
          sabato: dayPlanSchema,
          domenica: dayPlanSchema
        },
        required: ["lunedi", "martedi", "mercoledi", "giovedi", "venerdi", "sabato", "domenica"]
      };
    } else {
      prompt = `Agisci come un massimo esperto in nutrizione sportiva e clinica. Crea un piano alimentare giornaliero per ${targetCalories} kcal.${allergyRestrictions} Include 5 pasti: colazione, spuntino_mattutino, pranzo, spuntino_pomeridiano, cena. Per ogni pasto fornisci: descrizione breve, lista alimenti con quantità, kcal approssimative.`;
      
      responseSchema = dayPlanSchema;
    }
    
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
  };

  return {
    generateMealPlan,
    isLoading,
    error
  };
};
