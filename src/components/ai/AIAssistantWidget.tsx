import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AIAssistantWidgetProps {
  onOpenModal: () => void;
  onStartConversation: (question: string) => void;
}

const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  onOpenModal,
  onStartConversation
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quickQuestion, setQuickQuestion] = useState('');

  const quickQuestions = [
    "Ho mal di schiena, cosa posso fare?",
    "Voglio dimagrire ma ho poco tempo",
    "Cos'è l'allenamento EMS?",
    "Aiuto per migliorare la postura"
  ];

  const handleQuickQuestion = (question: string) => {
    onStartConversation(question);
    setIsExpanded(false);
    onOpenModal();
  };

  const handleCustomQuestion = () => {
    if (quickQuestion.trim()) {
      onStartConversation(quickQuestion);
      setQuickQuestion('');
      setIsExpanded(false);
      onOpenModal();
    }
  };

  return (
    <>
      {/* Widget principale */}
      <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end space-y-4">
        {/* Pannello espanso */}
        {isExpanded && (
          <Card className="w-80 p-4 bg-white/95 backdrop-blur-sm border border-purple-200 shadow-xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Assistente MUV</h3>
                  <p className="text-xs text-muted-foreground">Sempre qui per te</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              Ciao! Sono l'assistente virtuale di MUV Fitness. Come posso aiutarti oggi?
            </p>

            {/* Domande rapide */}
            <div className="space-y-2 mb-3">
              <p className="text-xs font-medium text-muted-foreground">Domande frequenti:</p>
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left justify-start h-auto py-2 px-3 text-xs border-purple-200 hover:bg-purple-50 hover:border-purple-300"
                >
                  {question}
                </Button>
              ))}
            </div>

            {/* Input personalizzato */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={quickQuestion}
                onChange={(e) => setQuickQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCustomQuestion()}
                placeholder="Scrivi la tua domanda..."
                className="flex-1 text-xs p-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Button
                size="sm"
                onClick={handleCustomQuestion}
                disabled={!quickQuestion.trim()}
                className="bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] hover:opacity-90 h-8 w-8 p-0"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>

            <div className="mt-3 pt-3 border-t border-purple-100">
              <Button
                onClick={onOpenModal}
                variant="outline"
                size="sm"
                className="w-full text-xs border-purple-200 hover:bg-purple-50"
              >
                Apri chat completa
              </Button>
            </div>
          </Card>
        )}

        {/* Pulsante principale */}
        <div className="relative">
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            className="h-14 w-14 rounded-full bg-gradient-to-r from-[hsl(var(--chart-1))] to-[hsl(var(--chart-2))] hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-white/20"
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <MessageCircle className="w-6 h-6" />
            )}
          </Button>
          
          {/* Badge notifica */}
          {!isExpanded && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
              !
            </Badge>
          )}
        </div>
      </div>

      {/* Overlay per mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-[59] lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default AIAssistantWidget;