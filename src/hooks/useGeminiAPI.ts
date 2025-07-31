import { supabase } from '../integrations/supabase/client';

export type AIProvider = 'openai' | 'gemini';

export const useOpenAIAPI = () => {
  const callOpenAIAPI = async (payload: string | any, provider: AIProvider = 'openai') => {
    try {
      const functionName = provider === 'gemini' ? 'gemini-provider' : 'gemini-api';
      console.log(`Calling ${provider} Edge Function with payload:`, typeof payload === 'string' ? payload.substring(0, 100) + '...' : payload);
      
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { payload }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Errore chiamata API: ${error.message}`);
      }

      console.log('Edge function response received');
      
      // Verifica se la risposta contiene un errore
      if (data?.error) {
        console.error('AI API error in response:', data.error);
        throw new Error(data.error);
      }

      // Restituisci il contenuto generato
      return data?.content || data;
    } catch (error: any) {
      console.error('Error calling AI API through Supabase:', error);
      
      // Messaggi di errore più specifici
      const providerName = provider === 'gemini' ? 'Gemini' : 'OpenAI';
      if (error.message?.includes('API key')) {
        throw new Error(`Chiave API di ${providerName} non configurata correttamente. Contatta l'amministratore.`);
      } else if (error.message?.includes('quota') || error.message?.includes('insufficient_quota')) {
        throw new Error(`Quota API di ${providerName} esaurita. Verifica il tuo account ${providerName}.`);
      } else if (error.message?.includes('rate limit') || error.message?.includes('limit')) {
        throw new Error('Troppe richieste all\'API. Riprova tra qualche minuto.');
      } else if (error.message?.includes('overloaded')) {
        throw new Error('Il servizio è temporaneamente sovraccarico. Riprova tra qualche istante.');
      } else if (error.message?.includes('blocked')) {
        throw new Error('Contenuto bloccato dai filtri di sicurezza. Modifica il prompt e riprova.');
      } else {
        throw new Error(error.message || `Errore nella comunicazione con il servizio ${providerName}`);
      }
    }
  };

  return { 
    callOpenAIAPI, 
    callGeminiAPI: (payload: string | any) => callOpenAIAPI(payload, 'gemini'),
    callAIAPI: callOpenAIAPI
  };
};

// Mantieni la compatibilità con il nome precedente
export const useGeminiAPI = () => {
  const { callOpenAIAPI } = useOpenAIAPI();
  return { 
    callGeminiAPI: (payload: string | any) => callOpenAIAPI(payload, 'gemini'),
    callOpenAIAPI: (payload: string | any) => callOpenAIAPI(payload, 'openai'),
    callAIAPI: callOpenAIAPI
  };
};