import { useGeminiAPI } from './useGeminiAPI';

export interface MUVConversation {
  question: string;
  answer: string;
  timestamp: number;
}

export interface MUVUserProfile {
  name?: string;
  problem?: string;
  suggestedService?: string;
  notes?: string;
}

export const useMUVAssistant = () => {
  const { callOpenAIAPI } = useGeminiAPI();

  const askMUVAssistant = async (
    question: string, 
    userProfile?: MUVUserProfile,
    conversationHistory?: MUVConversation[]
  ): Promise<{ answer: string; userProfile: MUVUserProfile; shouldRedirectToForm: boolean }> => {
    
    // Validazione input
    if (!question || question.trim().length === 0) {
      throw new Error("La domanda non può essere vuota");
    }
    
    if (question.length > 800) {
      throw new Error("La domanda è troppo lunga (massimo 800 caratteri)");
    }
    
    const sanitizedQuestion = question.trim().substring(0, 800);
    
    // Costruisci il contesto della conversazione
    let conversationContext = "";
    if (conversationHistory && conversationHistory.length > 0) {
      conversationContext = "\n\nCRONOLOGIA CONVERSAZIONE:\n" + 
        conversationHistory.slice(-3).map(conv => 
          `Cliente: ${conv.question}\nAssistente: ${conv.answer}`
        ).join("\n");
    }

    // Profilo utente esistente
    let userContext = "";
    if (userProfile?.name) userContext += `Nome cliente: ${userProfile.name}\n`;
    if (userProfile?.problem) userContext += `Problema identificato: ${userProfile.problem}\n`;
    if (userProfile?.suggestedService) userContext += `Servizio suggerito: ${userProfile.suggestedService}\n`;
    if (userProfile?.notes) userContext += `Note: ${userProfile.notes}\n`;

    const prompt = `Sei l'Assistente Virtuale di MUV FITNESS, il centro fitness innovativo di Legnago specializzato in tecnologie avanzate e personal training personalizzato.

IDENTITÀ E PERSONALITÀ:
- Sei professionale ma amichevole, competente e rassicurante
- Parli sempre in italiano
- Sei specializzato nel capire i problemi fisici dei clienti e guidarli verso le soluzioni MUV più adatte
- Non prenoti appuntamenti, ma guidi i clienti verso il modulo contatti per essere richiamati

SERVIZI MUV CHE CONOSCI PERFETTAMENTE:

🏋️ PERSONAL TRAINING SPECIALIZZATO:
- Personal trainer qualificati per trasformazioni personalizzate
- Allenamento 1-to-1 con programmi su misura
- Ideale per: tutti i livelli, obiettivi specifici, motivazione extra

⚡ TECNOLOGIA EMS (Elettrostimolazione):
- Allenamento di 20 minuti = 4 ore di palestra tradizionale
- Stimolazione muscolare profonda e sicura
- Ideale per: poco tempo, risultati rapidi, riabilitazione, tonificazione

🌬️ VACUUM TERAPIA E PRESSOTERAPIA:
- Trattamenti drenanti e rimodellanti
- Migliora circolazione e riduce cellulite
- Ideale per: ritenzione idrica, gonfiore, recupero muscolare

🧘 PILATES CON REFORMER:
- Attrezzature professionali Reformer
- Rieducazione posturale e core stability
- Ideale per: postura, flessibilità, mal di schiena, equilibrio

🏃 CORSI SPECIALIZZATI:
- Ginnastica dolce e posturale
- Allenamento over 50
- Riabilitazione post-infortuni
- Fitness in gravidanza e post-parto

🎯 PROGRAMMI SPECIALI:
- Trasformazione in 30 giorni (risultati garantiti)
- Dimagrimento guidato con supporto nutrizionale
- Recupero da sedentarietà

PROBLEMI CHE RISOLVIAMO:
- Obesità e sovrappeso → Personal Training + EMS + supporto nutrizionale
- Mal di schiena → Pilates + Posturale + Personal Training
- Postura scorretta → Pilates Reformer + Esercizi correttivi
- Sedentarietà → Programmi graduali + Ginnastica dolce
- Ritenzione idrica → Vacuum + Pressoterapia + movimento
- Mancanza di tempo → EMS (20 min = 4h palestra)
- Bassa motivazione → Personal Training 1-to-1
- Riabilitazione → Programmi specifici + tecnologie dolci

LINEE GUIDA CONVERSAZIONE:
1. Ascolta il problema specifico del cliente
2. Identifica le cause principali
3. Suggerisci i servizi MUV più adatti
4. Spiega COME risolveremo il suo problema specifico
5. Quando hai raccolto abbastanza informazioni, invita al modulo contatti per consulenza gratuita

QUANDO REINDIRIZZARE AL FORM CONTATTI:
- Hai identificato il problema principale
- Hai suggerito servizi specifici
- Il cliente sembra interessato o ha domande sui costi/orari/prenotazioni
- Hai raccolto nome e problema per pre-compilare il form

FORMATO RISPOSTA:
- Massimo 150 parole
- Domande specifiche per capire meglio il problema
- Suggerimenti concreti sui servizi MUV
- Tono caldo e professionale
- Invita al form quando appropriato

${userContext}${conversationContext}

DOMANDA CLIENTE: ${sanitizedQuestion}

Rispondi come l'Assistente Virtuale MUV, mostrando competenza sui servizi e guidando il cliente verso la soluzione più adatta. Se è il momento giusto, invita a compilare il modulo contatti per essere richiamato dal team.`;

    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };
    
    try {
      const result = await callOpenAIAPI(payload);
      let response: string | undefined;

      if (typeof result === 'string') {
        response = result;
      } else if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
        response = result.candidates[0].content.parts[0].text;
      } else if (result?.choices?.[0]?.message?.content) {
        response = result.choices[0].message.content;
      }
      
      if (response) {
        
        // Analizza la risposta per aggiornare il profilo utente
        const updatedProfile: MUVUserProfile = { ...userProfile };
        
        // Estrai informazioni dalla domanda e risposta
        if (!updatedProfile.problem) {
          // Identifica problemi comuni nella domanda
          const lowerQuestion = sanitizedQuestion.toLowerCase();
          if (lowerQuestion.includes('mal di schiena') || lowerQuestion.includes('schiena')) {
            updatedProfile.problem = 'mal di schiena';
            updatedProfile.suggestedService = 'Pilates Reformer + Personal Training';
          } else if (lowerQuestion.includes('dimagrire') || lowerQuestion.includes('peso') || lowerQuestion.includes('grasso')) {
            updatedProfile.problem = 'dimagrimento';
            updatedProfile.suggestedService = 'Personal Training + EMS';
          } else if (lowerQuestion.includes('postura') || lowerQuestion.includes('posturale')) {
            updatedProfile.problem = 'postura scorretta';
            updatedProfile.suggestedService = 'Pilates Reformer + Posturale';
          } else if (lowerQuestion.includes('tempo') || lowerQuestion.includes('veloce') || lowerQuestion.includes('rapido')) {
            updatedProfile.problem = 'mancanza di tempo';
            updatedProfile.suggestedService = 'EMS Training';
          } else if (lowerQuestion.includes('sedentario') || lowerQuestion.includes('movimento')) {
            updatedProfile.problem = 'sedentarietà';
            updatedProfile.suggestedService = 'Ginnastica dolce + Personal Training';
          }
        }

        // Determina se reindirizzare al form
        const shouldRedirect = response.toLowerCase().includes('modulo') || 
                              response.toLowerCase().includes('contatti') ||
                              response.toLowerCase().includes('consulenza') ||
                              (updatedProfile.problem && conversationHistory && conversationHistory.length >= 2);

        return {
          answer: response,
          userProfile: updatedProfile,
          shouldRedirectToForm: shouldRedirect
        };
      } else {
        throw new Error("Risposta dell'assistente non valida.");
      }
    } catch (error: any) {
      console.error('MUV Assistant error:', error);
      throw new Error(error.message || "Errore nella comunicazione con l'assistente MUV.");
    }
  };

  return { askMUVAssistant };
};