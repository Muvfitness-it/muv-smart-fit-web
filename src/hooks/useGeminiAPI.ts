
import { supabase } from '../integrations/supabase/client';

export const useGeminiAPI = () => {
  const callGeminiAPI = async (prompt: string) => {
    try {
      console.log('Calling Supabase Edge Function with prompt:', prompt);
      
      const { data, error } = await supabase.functions.invoke('gemini-api', {
        body: { payload: prompt }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Errore chiamata API: ${error.message}`);
      }

      console.log('Edge function response:', data);
      
      // Verifica se la risposta contiene un errore
      if (data?.error) {
        console.error('Gemini API error in response:', data.error);
        throw new Error(data.error);
      }

      // Restituisci il contenuto generato
      return data?.content || data;
    } catch (error: any) {
      console.error('Error calling Gemini API through Supabase:', error);
      
      // Messaggi di errore più specifici
      if (error.message?.includes('API key')) {
        throw new Error('Chiave API di Gemini non configurata correttamente. Contatta l\'amministratore.');
      } else if (error.message?.includes('quota')) {
        throw new Error('Quota API di Gemini esaurita. Riprova più tardi.');
      } else if (error.message?.includes('rate limit')) {
        throw new Error('Troppe richieste all\'API. Riprova tra qualche minuto.');
      } else {
        throw new Error(error.message || 'Errore nella comunicazione con il servizio AI');
      }
    }
  };

  return { callGeminiAPI };
};
