// Contact form adapter using Resend via Supabase Edge Function
import { supabase } from "@/integrations/supabase/client";

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
  botcheck?: string; // honeypot
  phone?: string;
  obiettivo?: string;
  campaign?: string;
  source?: string;
  [key: string]: any;
}

export interface ContactFormResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function sendContactViaWeb3Forms(payload: ContactFormPayload): Promise<ContactFormResponse> {
  console.log('📧 MailAdapter: Starting email send', {
    name: payload.name,
    email: payload.email,
    campaign: payload.campaign,
    timestamp: new Date().toISOString()
  });
  
  // Check honeypot
  if (payload.botcheck) {
    console.warn('🤖 MailAdapter: Bot detected via honeypot');
    return { success: false, message: 'Spam detected' };
  }

  try {
    // Timeout protection: 15 secondi
    const timeoutPromise = new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error('Timeout: Edge function non risponde dopo 15 secondi')), 15000)
    );
    
    const supabasePromise = supabase.functions.invoke('send-contact-email', {
      body: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || '',
        message: payload.message || '',
        obiettivo: payload.obiettivo || '',
        campaign: payload.campaign || 'general',
        source: payload.source || 'website'
      }
    });
    
    console.log('⏳ MailAdapter: Waiting for edge function response (max 15s)...');
    
    const { data, error } = await Promise.race([
      supabasePromise,
      timeoutPromise
    ]);

    if (error) {
      console.error('❌ MailAdapter: Edge function error', {
        errorMessage: error.message,
        errorName: error.name,
        errorCode: (error as any).code,
        errorDetails: error
      });
      
      // Errori specifici con messaggi user-friendly
      if (error.message?.includes('timeout') || error.message?.includes('Timeout')) {
        throw new Error('Il server impiega troppo tempo a rispondere. Riprova tra qualche secondo.');
      }
      if (error.message?.includes('rate limit')) {
        throw new Error('Troppe richieste. Attendi 1 minuto prima di riprovare.');
      }
      if (error.message?.includes('spam')) {
        throw new Error('La tua richiesta è stata bloccata. Contattaci su WhatsApp al 329 107 0374.');
      }
      if (error.message?.includes('network') || error.message?.includes('fetch')) {
        throw new Error('Errore di connessione. Verifica la tua rete e riprova.');
      }
      
      throw new Error(error.message || 'Errore durante l\'invio della richiesta');
    }

    console.log('✅ MailAdapter: Email sent successfully', data);
    return { 
      success: true, 
      message: 'Richiesta inviata con successo! Riceverai una conferma via email.' 
    };
    
  } catch (error: any) {
    console.error('❌ MailAdapter: Catch-all error', {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n').slice(0, 3).join('\n')
    });
    
    // Rilancia l'errore per gestirlo a livello form
    throw error;
  }
}
