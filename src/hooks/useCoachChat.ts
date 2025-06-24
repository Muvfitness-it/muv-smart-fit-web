
import { useGeminiAPI } from './useGeminiAPI';

export const useCoachChat = () => {
  const { callGeminiAPI } = useGeminiAPI();

  const askCoach = async (question: string): Promise<string> => {
    // Basic validation
    if (!question || question.trim().length === 0) {
      throw new Error("La domanda non può essere vuota");
    }
    
    if (question.length > 500) {
      throw new Error("La domanda è troppo lunga (massimo 500 caratteri)");
    }
    
    const sanitizedQuestion = question.trim().substring(0, 500);
    const prompt = `Agisci come un coach esperto in nutrizione, allenamento e wellness. Rispondi alla seguente domanda in modo professionale e dettagliato: ${sanitizedQuestion}`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const response = result.candidates[0].content.parts[0].text;
        return response;
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
