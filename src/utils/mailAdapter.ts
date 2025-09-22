// Lightweight mail adapter using Web3Forms and secure fallbacks
// Environment variables should be set via Supabase Edge Functions or server-side

// DO NOT expose API keys in client-side code! These are fallback values only.
export const WEB3FORMS_ACCESS_KEY: string = process.env.WEB3FORMS_ACCESS_KEY || "";

export interface Web3FormsPayload {
  name: string;
  email: string;
  message: string;
  subject?: string;
  botcheck?: string; // honeypot
  [key: string]: any; // allow extra fields (telefono, citta, obiettivo, campaign, source, etc.)
}

export interface Web3FormsResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export async function sendContactViaWeb3Forms(payload: Web3FormsPayload): Promise<Web3FormsResponse> {
  // Honeypot: if filled, silently succeed without sending
  if (payload.botcheck && payload.botcheck.trim() !== "") {
    return { success: true, message: "Honeypot triggered - skipped" };
  }

  // Primary attempt: Secure Supabase Edge Function
  try {
    console.log('Attempting secure Supabase Edge Function submission...');
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL || "https://baujoowgqeyraqnukkmw.supabase.co",
      process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNTYsImV4cCI6MjA2NTY1MzA1Nn0.pmeNPLBZVJjXwYGJP_T2vorYnw7LJ-DdE5RfD3VfIrw"
    );

    const { data, error } = await supabase.functions.invoke('secure-contact', {
      body: {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        telefono: payload.telefono || payload.phone || '',
        city: payload.citta || payload.city || '',
        goal: payload.obiettivo || payload.goal || ''
      }
    });

    console.log('Supabase function response:', { data, error });

    if (!error && data?.success) {
      console.log('Secure contact success:', data);
      return { success: true, message: data.message || 'Message sent successfully' };
    } else {
      console.error('Secure contact failed:', { error, data });
      // If data has an error message, use it
      if (data?.error) {
        console.error('Edge function error:', data.error);
      }
    }
  } catch (error) {
    console.error('Secure contact error:', error);
  }

  // Fallback: Formspree
  try {
    console.log('Attempting Formspree fallback...');
    const formspreeEndpoint = "https://formspree.io/f/mblklzbq";
    const fsRes = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.telefono || payload.phone || "",
        obiettivo: payload.obiettivo || "",
        message: payload.message,
        subject: payload.subject || `Nuovo contatto dal sito: ${payload.name}`,
        source: payload.source || "website"
      })
    });

    if (fsRes.ok) {
      const data = await fsRes.json().catch(() => ({}));
      console.log('Formspree success');
      return { success: true, message: 'Message sent successfully via Formspree' };
    } else {
      console.error('Formspree failed:', fsRes.status, fsRes.statusText);
    }
  } catch (error) {
    console.error('Formspree error:', error);
  }

  // Final fallback: Web3Forms
  if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.trim().length > 10) {
    try {
      console.log('Attempting Web3Forms fallback...');
      const body = {
        access_key: WEB3FORMS_ACCESS_KEY,
        from_name: "MUV Fitness Website",
        subject: payload.subject || `Nuovo contatto dal sito: ${payload.name}`,
        ...payload,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok && data.success === true) {
        console.log('Web3Forms success');
        return { success: true, data };
      }
    } catch (e) {
      console.error("Web3Forms failed:", e);
    }
  }

  console.error("All transports failed");
  return {
    success: false,
    message: "Errore nell'invio. Riprova, oppure contattaci su WhatsApp (329 107 0374)."
  };
}
