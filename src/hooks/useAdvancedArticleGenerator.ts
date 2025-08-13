import { supabase } from '@/integrations/supabase/client';

export interface ArticleRequest {
  topic: string;
  wordCount: number;
  tone: string;
  additionalContext?: string;
}

export interface ArticleResponse {
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export const useAdvancedArticleGenerator = () => {
  const generateArticle = async (request: ArticleRequest): Promise<ArticleResponse> => {
    try {
      console.log('Calling advanced article generator with:', request);
      
      const { data, error } = await supabase.functions.invoke('advanced-article-generator', {
        body: request
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Errore nella chiamata: ${error.message}`);
      }

      if (data?.error) {
        console.error('API error in response:', data.error);
        throw new Error(data.error);
      }

      if (!data || !data.title || !data.content) {
        throw new Error('Risposta incompleta dal generatore di articoli');
      }

      console.log('Article generated successfully');
      return data as ArticleResponse;
      
    } catch (error: any) {
      console.error('Error in article generation:', error);
      
      // Messaggi di errore specifici e user-friendly
      if (error.message?.includes('OPENAI_API_KEY')) {
        throw new Error('Configurazione API non completata. Contatta l\'amministratore del sistema.');
      } else if (error.message?.includes('quota')) {
        throw new Error('Servizio temporaneamente non disponibile per limiti di quota. Riprova più tardi.');
      } else if (error.message?.includes('rate limit')) {
        throw new Error('Troppe richieste. Attendi 30 secondi prima di riprovare.');
      } else if (error.message?.includes('content_policy')) {
        throw new Error('L\'argomento specificato non è consentito. Prova con un tema diverso.');
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        throw new Error('Problemi di connessione. Verifica la tua connessione internet e riprova.');
      } else {
        throw new Error(error.message || 'Errore imprevisto nella generazione dell\'articolo. Riprova.');
      }
    }
  };

  return {
    generateArticle
  };
};