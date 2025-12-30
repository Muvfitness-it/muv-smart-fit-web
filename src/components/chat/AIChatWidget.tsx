import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Phone, User, Mail, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useLocation } from 'react-router-dom';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

// Suggerimenti contestuali basati sulla pagina
const PAGE_SUGGESTIONS: Record<string, string[]> = {
  '/': [
    "Come funziona la consulenza gratuita?",
    "Quali risultati posso ottenere?",
    "Quanto costa un percorso?",
    "Dove siete?"
  ],
  '/servizi': [
    "Qual è il servizio migliore per dimagrire?",
    "Come funziona l'EMS Training?",
    "Cos'è il Pilates Reformer?",
    "Fate anche massaggi?"
  ],
  '/tecnologie': [
    "Come funziona l'EMS?",
    "Cos'è la Vacuum Therapy?",
    "Il trattamento è doloroso?",
    "Quante sedute servono?"
  ],
  '/metodo': [
    "Come funziona il vostro metodo?",
    "Quanto dura il percorso?",
    "È adatto ai principianti?",
    "Posso provare prima di iscrivermi?"
  ],
  '/contatti': [
    "Quali sono gli orari di apertura?",
    "Posso prenotare online?",
    "C'è parcheggio?",
    "Come raggiungervi?"
  ],
  '/prezzi': [
    "Quanto costa un abbonamento?",
    "Ci sono promozioni attive?",
    "Posso pagare a rate?",
    "È inclusa la consulenza iniziale?"
  ],
  default: [
    "Cos'è l'EMS Training?",
    "Quali sono i vostri prezzi?",
    "Dove siete?",
    "Come prenoto una consulenza?"
  ]
};

export default function AIChatWidget() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '' });
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Get suggestions based on current page
  const currentSuggestions = PAGE_SUGGESTIONS[location.pathname] || PAGE_SUGGESTIONS.default;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([{
          role: 'assistant',
          content: getWelcomeMessage()
        }]);
      }, 800);
    }
  }, [isOpen, location.pathname]);

  // Context-aware welcome message
  const getWelcomeMessage = () => {
    const path = location.pathname;
    
    if (path === '/servizi') {
      return 'Ciao! 👋 Vedo che stai esplorando i nostri servizi. Posso aiutarti a trovare quello più adatto alle tue esigenze?';
    }
    if (path === '/tecnologie') {
      return 'Ciao! 👋 Vuoi sapere di più sulle nostre tecnologie innovative? EMS, Vacuum, Pilates Reformer... chiedimi tutto!';
    }
    if (path === '/prezzi') {
      return 'Ciao! 👋 Stai cercando informazioni sui prezzi? Ti aiuto a trovare la soluzione migliore per te!';
    }
    if (path === '/contatti') {
      return 'Ciao! 👋 Vuoi prenotare una consulenza gratuita? Ti aiuto a fissare un appuntamento!';
    }
    return 'Ciao! 👋 Sono MUV Assistant, il tuo assistente virtuale. Come posso aiutarti oggi? Puoi chiedermi info sui nostri servizi, prezzi, o prenotare una consulenza gratuita!';
  };

  // Check if we should show lead form after some messages
  useEffect(() => {
    const userMessages = messages.filter(m => m.role === 'user').length;
    if (userMessages >= 3 && !leadCaptured && !showLeadForm) {
      setTimeout(() => {
        if (!leadCaptured) {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, {
              role: 'assistant',
              content: '💡 Ti interessa ricevere più informazioni? Lasciami il tuo nome e email così possiamo ricontattarti con un\'offerta speciale!'
            }]);
            setShowLeadForm(true);
          }, 600);
        }
      }, 1000);
    }
  }, [messages, leadCaptured, showLeadForm]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat-muv', {
        body: {
          action: 'chat',
          sessionId,
          visitorId: localStorage.getItem('visitor_id') || sessionId,
          message: text,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          currentPage: location.pathname
        }
      });

      if (error) throw error;

      // Simula effetto typing
      await new Promise(resolve => setTimeout(resolve, 400));

      setIsTyping(false);
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Mi dispiace, non ho capito. Puoi riformulare?'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Mi dispiace, si è verificato un errore. Puoi contattarci su WhatsApp al 329 107 0374!'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('ai-chat-muv', {
        body: {
          action: 'capture_lead',
          sessionId,
          leadData
        }
      });

      if (error) throw error;

      setLeadCaptured(true);
      setShowLeadForm(false);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Grazie ${leadData.name}! 🎉 Ti ricontatteremo presto con un'offerta esclusiva. Nel frattempo, puoi prenotare subito una consulenza gratuita!`
      }]);
    } catch (error) {
      console.error('Lead capture error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/393291070374?text=Ciao! Vorrei informazioni sui vostri servizi.', '_blank');
  };

  return (
    <>
      {/* Chat Toggle Button - Improved with pulse animation */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-24 right-4 z-50 w-16 h-16 rounded-full 
          bg-gradient-to-br from-primary to-secondary
          text-primary-foreground shadow-lg 
          hover:shadow-xl hover:scale-105
          transition-all duration-300 ease-out
          flex items-center justify-center group
          ${!isOpen ? 'animate-pulse-soft' : ''}
        `}
        aria-label="Apri chat assistente MUV"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90 scale-90' : 'rotate-0 scale-100'}`}>
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <MessageCircle className="w-7 h-7" />
          )}
        </div>
        {!isOpen && (
          <>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </span>
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
          </>
        )}
      </button>

      {/* Chat Window - Enhanced with smooth animations */}
      <div 
        className={`
          fixed bottom-40 right-4 z-50 
          w-[380px] max-w-[calc(100vw-2rem)] 
          h-[520px] max-h-[70vh] 
          bg-card border border-border rounded-2xl 
          shadow-2xl flex flex-col overflow-hidden
          transition-all duration-300 ease-out origin-bottom-right
          ${isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }
        `}
      >
        {/* Header with MUV Avatar */}
        <div className="bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground p-4 flex items-center gap-3 relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 animate-pulse" />
          
          {/* MUV Avatar */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30 shadow-lg overflow-hidden">
              <img 
                src="/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png" 
                alt="MUV Assistant"
                className="w-10 h-10 object-contain"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          
          <div className="flex-1 relative z-10">
            <h3 className="font-bold text-lg">MUV Assistant</h3>
            <p className="text-xs opacity-90 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Online 24/7
            </p>
          </div>
          
          <button
            onClick={handleWhatsApp}
            className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 hover:scale-110 transition-all duration-200 shadow-lg"
            aria-label="Contatta su WhatsApp"
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>

        {/* Messages with improved styling */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-muted/20 to-muted/40">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <img 
                    src="/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png" 
                    alt=""
                    className="w-6 h-6 object-contain"
                  />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground rounded-br-md'
                    : 'bg-card border border-border rounded-bl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/lovable-uploads/8f9d5474-3079-4865-8efd-e5b147a05b32.png" 
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          {/* Lead Form - Enhanced */}
          {showLeadForm && !leadCaptured && (
            <div className="bg-gradient-to-br from-card to-primary/5 border-2 border-primary/20 rounded-xl p-4 animate-scale-in shadow-lg">
              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span>Lascia i tuoi dati per un'offerta speciale!</span>
                </div>
                <Input
                  placeholder="Il tuo nome"
                  value={leadData.name}
                  onChange={e => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="h-10 text-sm bg-background"
                />
                <Input
                  type="email"
                  placeholder="La tua email"
                  value={leadData.email}
                  onChange={e => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="h-10 text-sm bg-background"
                />
                <Input
                  type="tel"
                  placeholder="Telefono (opzionale)"
                  value={leadData.phone}
                  onChange={e => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                  className="h-10 text-sm bg-background"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity" 
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '🎁 Ricevi Offerta Esclusiva'}
                </Button>
              </form>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions - Context-aware */}
        {messages.length <= 2 && !isTyping && (
          <div className="p-3 border-t border-border bg-card/80 backdrop-blur-sm">
            <p className="text-xs text-muted-foreground mb-2 font-medium">💡 Suggerimenti:</p>
            <div className="flex flex-wrap gap-1.5">
              {currentSuggestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-primary/10 hover:bg-primary hover:text-primary-foreground text-foreground px-3 py-2 rounded-full transition-all duration-200 hover:scale-105"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input - Enhanced */}
        <div className="p-3 border-t border-border bg-card">
          <form
            onSubmit={e => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Scrivi un messaggio..."
              className="flex-1 h-11 bg-muted/50 border-0 focus-visible:ring-primary"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="h-11 w-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              disabled={!input.trim() || isLoading}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
