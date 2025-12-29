import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Phone, User, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

const QUICK_QUESTIONS = [
  "Cos'è l'EMS Training?",
  "Quali sono i vostri prezzi?",
  "Dove siete?",
  "Come prenoto?"
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `chat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '' });
  const [leadCaptured, setLeadCaptured] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show welcome message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: 'Ciao! 👋 Sono MUV Assistant, il tuo assistente virtuale. Come posso aiutarti oggi? Puoi chiedermi info sui nostri servizi, prezzi, o prenotare una consulenza gratuita!'
      }]);
    }
  }, [isOpen]);

  // Check if we should show lead form after some messages
  useEffect(() => {
    const userMessages = messages.filter(m => m.role === 'user').length;
    if (userMessages >= 3 && !leadCaptured && !showLeadForm) {
      // After 3 user messages, prompt for lead capture
      setTimeout(() => {
        if (!leadCaptured) {
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: '💡 Ti interessa ricevere più informazioni? Lasciami il tuo nome e email così possiamo ricontattarti con un\'offerta speciale!'
          }]);
          setShowLeadForm(true);
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

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat-muv', {
        body: {
          action: 'chat',
          sessionId,
          visitorId: localStorage.getItem('visitor_id') || sessionId,
          message: text,
          messages: messages.map(m => ({ role: m.role, content: m.content }))
        }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || 'Mi dispiace, non ho capito. Puoi riformulare?'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Mi dispiace, si è verificato un errore. Puoi contattarci su WhatsApp al +39 333 1234567!'
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
      const { data, error } = await supabase.functions.invoke('ai-chat-muv', {
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
        content: `Grazie ${leadData.name}! 🎉 Ti ricontatteremo presto con un'offerta esclusiva. Nel frattempo, puoi prenotare subito una consulenza gratuita cliccando qui: [Prenota Ora](/prenota)`
      }]);
    } catch (error) {
      console.error('Lead capture error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/393331234567?text=Ciao! Vorrei informazioni sui vostri servizi.', '_blank');
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Apri chat assistente"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
          </>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-4 z-50 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">MUV Assistant</h3>
              <p className="text-xs opacity-80">Rispondiamo subito 24/7</p>
            </div>
            <button
              onClick={handleWhatsApp}
              className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="Contatta su WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-md'
                      : 'bg-card border border-border rounded-bl-md'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              </div>
            )}

            {/* Lead Form */}
            {showLeadForm && !leadCaptured && (
              <div className="bg-card border-2 border-primary/20 rounded-xl p-4">
                <form onSubmit={handleLeadSubmit} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <User className="w-4 h-4 text-primary" />
                    <span>Lascia i tuoi dati</span>
                  </div>
                  <Input
                    placeholder="Il tuo nome"
                    value={leadData.name}
                    onChange={e => setLeadData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="h-9 text-sm"
                  />
                  <Input
                    type="email"
                    placeholder="La tua email"
                    value={leadData.email}
                    onChange={e => setLeadData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="h-9 text-sm"
                  />
                  <Input
                    type="tel"
                    placeholder="Telefono (opzionale)"
                    value={leadData.phone}
                    onChange={e => setLeadData(prev => ({ ...prev, phone: e.target.value }))}
                    className="h-9 text-sm"
                  />
                  <Button type="submit" size="sm" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Invia'}
                  </Button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 2 && (
            <div className="p-3 border-t border-border bg-card">
              <p className="text-xs text-muted-foreground mb-2">Domande frequenti:</p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(q)}
                    className="text-xs bg-muted hover:bg-muted/80 text-foreground px-2.5 py-1.5 rounded-full transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
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
                className="flex-1 h-10"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
