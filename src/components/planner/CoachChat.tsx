
import React, { useState } from 'react';
import { Bot, Sparkles, Loader2 } from 'lucide-react';

interface CoachChatProps {
  mealPlanCalories: number;
  apiKey: string;
  onAskCoach: (question: string, apiKey: string) => Promise<string>;
}

const CoachChat: React.FC<CoachChatProps> = ({ mealPlanCalories, apiKey, onAskCoach }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse('');

    try {
      const answer = await onAskCoach(question, apiKey);
      setResponse(answer);
    } catch (error: any) {
      setResponse(error.message || "Errore nella comunicazione con il coach.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
      <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-300">
        <Bot className="w-5 h-5" />
        Chiedi al Coach Esperto
      </h4>
      <p className="text-sm text-gray-400 mb-4">
        Fai qualsiasi domanda su alimentazione, integrazione, allenamenti e recupero.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Es: Come posso strutturare la mia settimana di allenamento?"
          className="w-full bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition"
        />
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:bg-gray-500"
        >
          {isLoading ? (
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
      {response && (
        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-200 text-sm leading-relaxed">
          <div dangerouslySetInnerHTML={{ 
            __html: response
              .replace(/\n\*/g, '<br>•')
              .replace(/\n/g, '<br>')
          }} />
        </div>
      )}
    </div>
  );
};

export default CoachChat;
