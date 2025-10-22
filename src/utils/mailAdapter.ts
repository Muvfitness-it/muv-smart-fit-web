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
  // Honeypot: if filled, silently succeed without sending
  if (payload.botcheck && payload.botcheck.trim() !== "") {
    return { success: true, message: "Honeypot triggered - skipped" };
  }

  try {
    console.log('Sending contact form via Supabase Edge Function...');
    
    const { data, error } = await supabase.functions.invoke('send-contact-email', {
      body: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || "",
        obiettivo: payload.obiettivo || "",
        message: payload.message,
        subject: payload.subject || `Nuovo contatto dal sito: ${payload.name}`,
        campaign: payload.campaign || "",
        source: payload.source || "website"
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw error;
    }

    console.log('Edge function response:', data);

    if (data?.success) {
      return { 
        success: true, 
        message: 'Messaggio inviato con successo!',
        data: data
      };
    } else {
      throw new Error(data?.error || 'Unknown error from edge function');
    }
  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      message: "Errore nell'invio del messaggio. Riprova più tardi o contattaci su WhatsApp (329 107 0374)."
    };
  }
}
