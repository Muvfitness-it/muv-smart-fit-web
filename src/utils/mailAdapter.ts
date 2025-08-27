// Lightweight mail adapter using Web3Forms
// Docs: https://web3forms.com/

export const WEB3FORMS_ACCESS_KEY: string = "6a54b481-e1fd-4793-93d1-4ecf3635e353"; // TODO: replace with your Web3Forms access key

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

  if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY.trim().length < 10) {
    return { success: false, message: "WEB3FORMS_ACCESS_KEY non configurata" };
  }

  const body = {
    access_key: WEB3FORMS_ACCESS_KEY,
    from_name: "MUV Fitness Website",
    subject: payload.subject || `Nuovo contatto dal sito: ${payload.name}`,
    ...payload,
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || data.success !== true) {
      return { success: false, message: data?.message || "Invio fallito" };
    }

    return { success: true, data };
  } catch (e: any) {
    return { success: false, message: e?.message || "Errore di rete" };
  }
}
