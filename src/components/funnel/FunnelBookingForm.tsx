import React, { useState, useEffect } from 'react';
import { CheckCircle, Phone, Clock, Shield, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FunnelBookingFormProps {
  onSuccess: () => void;
}

const FunnelBookingForm: React.FC<FunnelBookingFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    availability: '',
    privacy: false,
  });

  // Get funnel answers for context
  const [funnelContext, setFunnelContext] = useState<Record<string, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem('funnel_answers');
    if (stored) {
      setFunnelContext(JSON.parse(stored));
    }
  }, []);

  const getObjectiveLabel = (value: string) => {
    const labels: Record<string, string> = {
      'dimagrire': 'Dimagrire e perdere peso',
      'tonificare': 'Tonificare e rassodare',
      'cellulite': 'Eliminare la cellulite',
      'postura': 'Migliorare postura',
      'benessere': 'Ritrovare benessere',
    };
    return labels[value] || value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.availability || !formData.privacy) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Supabase leads table
      const { error } = await supabase.from('leads').insert({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || null,
        source: 'funnel_qualifica',
        obiettivo: funnelContext.obiettivo || null,
        message: `Disponibilità: ${formData.availability}. Tempo: ${funnelContext.tempo || 'N/A'}. Ostacolo: ${funnelContext.ostacolo || 'N/A'}`,
        status: 'nuovo',
      });

      if (error) throw error;

      // Clear funnel data
      localStorage.removeItem('funnel_answers');
      
      // Call success handler
      onSuccess();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Errore durante l\'invio. Riprova o contattaci su WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4">
      {/* Personalized summary */}
      {funnelContext.obiettivo && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 text-center">
          <p className="text-sm text-muted-foreground mb-1">Il tuo obiettivo:</p>
          <p className="font-semibold text-foreground">{getObjectiveLabel(funnelContext.obiettivo)}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nome e Cognome *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Mario Rossi"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Telefono *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+39 333 1234567"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            required
          />
        </div>

        {/* Email (optional) */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-muted-foreground">(opzionale)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="mario.rossi@email.com"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Preferenza orario *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {['Mattina', 'Pomeriggio', 'Sera'].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setFormData({ ...formData, availability: time.toLowerCase() })}
                className={`
                  py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all
                  ${formData.availability === time.toLowerCase()
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/50 text-foreground'
                  }
                `}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="privacy"
            checked={formData.privacy}
            onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
            className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
            required
          />
          <label htmlFor="privacy" className="text-sm text-muted-foreground">
            Accetto la <a href="/privacy" target="_blank" className="text-primary hover:underline">Privacy Policy</a> e 
            acconsento al trattamento dei dati per essere ricontattato/a. *
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Invio in corso...
            </>
          ) : (
            <>
              Prenota la consulenza in studio
            </>
          )}
        </button>

        {/* Micro-copy anti-paura */}
        <div className="space-y-2 text-sm text-muted-foreground text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Nessun impegno, solo una chiacchierata</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            <span>Valutazione conoscitiva gratuita</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Posti limitati: max 3 nuovi clienti a settimana</span>
          </div>
        </div>
      </form>

      {/* Correzione #4: WhatsApp subordinato */}
      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Preferisci scriverci?
        </p>
        <a
          href="https://wa.me/393400847547?text=Ciao!%20Ho%20compilato%20il%20questionario%20sul%20sito%20e%20vorrei%20prenotare%20una%20consulenza."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="underline">Contattaci su WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default FunnelBookingForm;
