// Contact form adapter using Formspree as primary channel
// Matches the configuration of the live site

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblklzbq";

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

  // Primary: Formspree (matching live site configuration)
  try {
    const formData = {
      name: payload.name,
      email: payload.email,
      phone: payload.phone || "",
      obiettivo: payload.obiettivo || "",
      message: payload.message,
      subject: payload.subject || `Nuovo contatto dal sito: ${payload.name}`,
      campaign: payload.campaign || "",
      source: payload.source || "website",
      _replyto: payload.email
    };

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      return { 
        success: true, 
        message: 'Messaggio inviato con successo!' 
      };
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('Formspree error:', response.status, errorData);
      throw new Error(`Formspree error: ${response.status}`);
    }
  } catch (error) {
    console.error('Formspree submission failed:', error);
  }

  // If Formspree fails, return error
  return {
    success: false,
    message: "Errore nell'invio del messaggio. Riprova più tardi o contattaci su WhatsApp (329 107 0374)."
  };
}
