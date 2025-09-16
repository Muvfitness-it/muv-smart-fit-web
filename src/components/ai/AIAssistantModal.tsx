import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Bot, User, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMUVAssistant, MUVConversation, MUVUserProfile } from '@/hooks/useMUVAssistant';
import { useNavigate } from 'react-router-dom';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuestion
}) => {
  const navigate = useNavigate();
  const { askMUVAssistant } = useMUVAssistant();
  const [conversation, setConversation] = useState<MUVConversation[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<MUVUserProfile>({});
  const [showRedirectPrompt, setShowRedirectPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (initialQuestion && conversation.length === 0) {
      handleSubmitQuestion(initialQuestion);
    }
  }, [initialQuestion, isOpen]);

  const handleSubmitQuestion = async (question?: string) => {
    const questionToAsk = question || currentQuestion;
    if (!questionToAsk.trim() || isLoading) return;

    setIsLoading(true);
    
    try {
      const result = await askMUVAssistant(questionToAsk, userProfile, conversation);
      
      const newConversation: MUVConversation = {
        question: questionToAsk,
        answer: result.answer,
        timestamp: Date.now()
      };

      setConversation(prev => [...prev, newConversation]);
      setUserProfile(result.userProfile);
      setCurrentQuestion('');

      // Mostra il prompt di redirect se suggerito
      if (result.shouldRedirectToForm) {
        setShowRedirectPrompt(true);
      }

    } catch (error: any) {
      console.error('Errore assistente:', error);
      const errorConversation: MUVConversation = {
        question: questionToAsk,
        answer: `Mi dispiace, si è verificato un errore. Puoi riprovare o contattarci direttamente tramite il modulo contatti per ricevere assistenza immediata.`,
        timestamp: Date.now()
      };
      setConversation(prev => [...prev, errorConversation]);
      setCurrentQuestion('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToForm = () => {
    // Pre-compila i dati e va al form contatti
    const formData = {
      name: userProfile.name || '',
      problem: userProfile.problem || '',
      service: userProfile.suggestedService || '',
      notes: conversation.map(conv => `D: ${conv.question}\nR: ${conv.answer}`).join('\n\n')
    };
    
    localStorage.setItem('muvAssistantData', JSON.stringify(formData));
    navigate('/form-contatti');
    onClose();
  };

  const quickSuggestions = [
    "Quanto costa il personal training?",
    "Che orari avete?",
    "Posso prenotare una prova gratuita?",
    "Dove siete ubicati?"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] p-0 gap-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Assistente Virtuale MUV</h3>
              <p className="text-sm text-muted-foreground font-normal">
                Specializzato in fitness e benessere
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Area conversazione */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Messaggio di benvenuto */}
          {conversation.length === 0 && !isLoading && (
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] rounded-full flex items-center justify-center mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Ciao! Sono l'assistente virtuale di MUV Fitness 👋
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    Sono qui per aiutarti a trovare la soluzione fitness perfetta per le tue esigenze. 
                    Posso rispondere a domande su:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 mb-3">
                    <li>• Personal Training e programmi personalizzati</li>
                    <li>• Tecnologia EMS per risultati rapidi</li>
                    <li>• Pilates Reformer per postura e benessere</li>
                    <li>• Vacuum terapia e trattamenti corpo</li>
                    <li>• Corsi specializzati e riabilitazione</li>
                  </ul>
                  <p className="text-sm text-gray-700">
                    Raccontami il tuo obiettivo o problema, ti guiderò verso la soluzione migliore!
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Conversazione */}
          {conversation.map((conv, index) => (
            <div key={index} className="space-y-3">
              {/* Domanda utente */}
              <div className="flex justify-end">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <Card className="p-3 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] text-white">
                    <p className="text-sm">{conv.question}</p>
                  </Card>
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mt-1">
                    <User className="w-3 h-3" />
                  </div>
                </div>
              </div>

              {/* Risposta assistente */}
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-[85%]">
                  <div className="w-6 h-6 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] rounded-full flex items-center justify-center mt-1">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <Card className="p-3 bg-gray-50 border-gray-200">
                    <p className="text-sm whitespace-pre-wrap">{conv.answer}</p>
                  </Card>
                </div>
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <Card className="p-3 bg-gray-50 border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="text-sm text-muted-foreground">L'assistente sta scrivendo...</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Prompt redirect form */}
          {showRedirectPrompt && (
            <Card className="p-4 bg-green-50 border-green-200">
              <div className="flex items-start space-x-3">
                <ExternalLink className="w-5 h-5 text-green-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800 mb-2">
                    Perfetto! Ora posso metterti in contatto con il nostro team
                  </p>
                  <p className="text-sm text-green-700 mb-3">
                    Compila il modulo contatti e ti richiameremo entro 24 ore per organizzare la tua consulenza gratuita personalizzata.
                  </p>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={handleGoToForm}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Vai al modulo contatti
                    </Button>
                    <Button 
                      onClick={() => setShowRedirectPrompt(false)}
                      variant="outline"
                      size="sm"
                      className="border-green-300 text-green-700"
                    >
                      Continua a chattare
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggerimenti rapidi */}
        {conversation.length > 0 && conversation.length < 3 && !isLoading && (
          <div className="px-6 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Domande frequenti:</p>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-50 text-xs px-2 py-1"
                  onClick={() => handleSubmitQuestion(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Input area */}
        <div className="p-6 pt-4 border-t bg-gray-50">
          <div className="flex space-x-2">
            <input
              type="text"
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitQuestion()}
              placeholder="Scrivi la tua domanda o descrivimi il tuo problema..."
              disabled={isLoading}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
            <Button
              onClick={() => handleSubmitQuestion()}
              disabled={!currentQuestion.trim() || isLoading}
              className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] hover:opacity-90"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AIAssistantModal;