// Lightweight mail adapter using Web3Forms
// Docs: https://web3forms.com/

// Use environment variable or fallback to stored key in localStorage for client-side forms
export const getWeb3FormsAccessKey = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('web3forms_access_key') || '';
  }
  return '';
};

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

  // Try Web3Forms first
  const accessKey = getWeb3FormsAccessKey();
  if (accessKey && accessKey.trim().length > 10) {
    try {
      const body = {
        access_key: accessKey,
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
        return { success: true, data };
      }
    } catch (e) {
      console.warn("Web3Forms failed, trying Supabase fallback:", e);
    }
  }

  // Fallback to Supabase Edge Function with Resend
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      "https://baujoowgqeyraqnukkmw.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdWpvb3dncWV5cmFxbnVra213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNTYsImV4cCI6MjA2NTY1MzA1Nn0.pmeNPLBZVJjXwYGJP_T2vorYnw7LJ-DdE5RfD3VfIrw"
    );

    const { data, error } = await supabase.functions.invoke('secure-contact', {
      body: {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        telefono: payload.telefono || '',
        city: payload.citta || '',
        goal: payload.obiettivo || '',
        transport: 'supabase_fallback'
      }
    });

    if (error) throw error;
    return { success: true, data };
    
  } catch (e: any) {
    console.error("Both Web3Forms and Supabase failed:", e);
    return { 
      success: false, 
      message: "Errore nell'invio. Chiamaci direttamente al 045 6302745 o scrivi a info@muvfitness.it" 
    };
  }
}
