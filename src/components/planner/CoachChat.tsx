
import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface CoachChatProps {
  mealPlanCalories: number;
}

const CoachChat: React.FC<CoachChatProps> = ({ mealPlanCalories }) => {
  const [coachQuestion, setCoachQuestion] = useState('');
  const [coachResponse, setCoachResponse] = useState('');
  const [isCoachLoading, setIsCoachLoading] = useState(false);

  const callGeminiAPI = async (payload: any) => {
    const apiKey = ""; // Provided by environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error Response:", errorBody);
      throw new Error(`Errore API: ${response.statusText}`);
    }
    return response.json();
  };

  const handleAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachQuestion.trim()) return;
    
    setIsCoachLoading(true);
    setCoachResponse('');
    
    const prompt = `Agisci come un coach esperto per "MUV Fitness", con una doppia specializzazione in nutrizione sportiva e personal training, rispondendo con un tono accademico. La tua conoscenza deve essere vasta e coprire argomenti come: piani alimentari, timing dei nutrienti, integrazione, idratazione, allenamento con i pesi, cardio, recupero e sonno. Un utente sta seguendo un piano da circa ${mealPlanCalories} kcal e pone la seguente domanda: "${coachQuestion}". Fornisci una risposta concisa e sintetica, andando dritto al punto. Offri solo le informazioni chiave basate sull'evidenza scientifica. Evita introduzioni prolisse e saluti. Non fornire mai consigli medici specifici o diagnosi.`;
    
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const response = result.candidates[0].content.parts[0].text
          .replace(/\n\*/g, '<br>•')
          .replace(/\n/g, '<br>');
        setCoachResponse(response);
      } else {
        throw new Error("Il coach non ha risposto.");
      }
    } catch (err: any) {
      setCoachResponse(err.message || "Errore nella comunicazione con il coach.");
    } finally {
      setIsCoachLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
      <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-300">
        🤖 Chiedi al Coach Esperto
      </h4>
      <p className="text-sm text-gray-400 mb-4">
        Fai qualsiasi domanda su alimentazione, integrazione, allenamenti e recupero.
      </p>
      <form onSubmit={handleAskCoach} className="space-y-4">
        <input
          type="text"
          value={coachQuestion}
          onChange={(e) => setCoachQuestion(e.target.value)}
          placeholder="Es: Come posso strutturare la mia settimana di allenamento?"
          className="w-full bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition"
        />
        <button
          type="submit"
          disabled={isCoachLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:bg-gray-500"
        >
          {isCoachLoading ? (
            <>
              <Loader2 className="inline-block mr-2 animate-spin" />
              In attesa...
            </>
          ) : (
            <>
              <Sparkles className="inline-block mr-2" />
              Invia Domanda
            </>
          )}
        </button>
      </form>
      {coachResponse && (
        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-200 text-sm leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: coachResponse }} />
        </div>
      )}
    </div>
  );
};

export default CoachChat;
