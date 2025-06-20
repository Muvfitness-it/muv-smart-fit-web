
import { useGeminiAPI } from './useGeminiAPI';
import { validateQuestion, sanitizeInput, sanitizeResponse } from '../utils/security';

export const useCoachChat = () => {
  const { callGeminiAPI } = useGeminiAPI();

  const askCoach = async (question: string): Promise<string> => {
    // Validate and sanitize input
    const validation = validateQuestion(question);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }
    
    const sanitizedQuestion = sanitizeInput(question, 500);
    const prompt = `Agisci come un coach esperto in nutrizione, allenamento e wellness. Rispondi alla seguente domanda in modo professionale e dettagliato: ${sanitizedQuestion}`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const response = result.candidates[0].content.parts[0].text;
        return sanitizeResponse(response);
      } else {
        throw new Error("Risposta del coach non valida.");
      }
    } catch (error: any) {
      console.error('Coach chat error:', error);
      throw new Error(error.message || "Errore nella comunicazione con il coach.");
    }
  };

  return { askCoach };
};
