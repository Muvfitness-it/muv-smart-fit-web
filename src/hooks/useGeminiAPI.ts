
import { supabase } from '../integrations/supabase/client';

export const useOpenAIAPI = () => {
  const callOpenAIAPI = async (payload: string | any) => {
    try {
      console.log('Calling OpenAI Edge Function with payload:', typeof payload === 'string' ? payload.substring(0, 100) + '...' : payload);
      
      const { data, error } = await supabase.functions.invoke('gemini-api', {
        body: { payload }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Errore chiamata API: ${error.message}`);
      }

      console.log('Edge function response received');
      
      // Verifica se la risposta contiene un errore
      if (data?.error) {
        console.error('OpenAI API error in response:', data.error);
        throw new Error(data.error);
      }

      // Restituisci il contenuto generato
      return data?.content || data;
    } catch (error: any) {
      console.error('Error calling OpenAI API through Supabase:', error);
      
      // Messaggi di errore più specifici
      if (error.message?.includes('API key')) {
        throw new Error('Chiave API di OpenAI non configurata correttamente. Contatta l\'amministratore.');
      } else if (error.message?.includes('quota') || error.message?.includes('insufficient_quota')) {
        throw new Error('Quota API di OpenAI esaurita. Verifica il tuo account OpenAI.');
      } else if (error.message?.includes('rate limit')) {
        throw new Error('Troppe richieste all\'API. Riprova tra qualche minuto.');
      } else if (error.message?.includes('overloaded')) {
        throw new Error('Il servizio è temporaneamente sovraccarico. Riprova tra qualche istante.');
      } else {
        throw new Error(error.message || 'Errore nella comunicazione con il servizio AI');
      }
    }
  };

  return { callOpenAIAPI, callGeminiAPI: callOpenAIAPI };
};

// Mantieni la compatibilità con il nome precedente
export const useGeminiAPI = () => {
  const { callOpenAIAPI } = useOpenAIAPI();
  return { callGeminiAPI: callOpenAIAPI };
};
