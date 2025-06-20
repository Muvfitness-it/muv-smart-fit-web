
import { useGeminiAPI } from './useGeminiAPI';

export const useCoachChat = () => {
  const { callGeminiAPI } = useGeminiAPI();

  const askCoach = async (question: string): Promise<string> => {
    const prompt = `Agisci come un coach esperto in nutrizione, allenamento e wellness. Rispondi alla seguente domanda in modo professionale e dettagliato: ${question}`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        return result.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Risposta del coach non valida.");
      }
    } catch (error: any) {
      throw new Error(error.message || "Errore nella comunicazione con il coach.");
    }
  };

  return { askCoach };
};
