
import { supabase } from '../integrations/supabase/client';

export const useGeminiAPI = () => {
  const callGeminiAPI = async (payload: any) => {
    try {
      console.log('Calling Supabase Edge Function with payload:', payload);
      
      const { data, error } = await supabase.functions.invoke('gemini-api', {
        body: { payload }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Errore chiamata API: ${error.message}`);
      }

      console.log('Edge function response:', data);
      return data;
    } catch (error: any) {
      console.error('Error calling Gemini API through Supabase:', error);
      throw new Error(error.message || 'Errore nella comunicazione con il servizio AI');
    }
  };

  return { callGeminiAPI };
};
