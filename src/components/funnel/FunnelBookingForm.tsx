import React, { useState, useEffect } from 'react';
import { CheckCircle, Phone, Clock, Shield, MessageCircle, X, Check } from 'lucide-react';
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
      'dimagrire': 'Perdere peso e dimagrire',
      'tonificare': 'Tonificare e rassodare il corpo',
      'cellulite': 'Ridurre cellulite e ritenzione',
      'postura': 'Migliorare postura e ridurre il mal di schiena',
      'benessere': 'Ritrovare energia e benessere generale',
    };
    return labels[value] || value;
  };

  const getTimeLabel = (value: string) => {
    const labels: Record<string, string> = {
      '2x': '2 volte a settimana (40–45 minuti)',
      '3x': '3 volte a settimana (circa 1 ora)',
      '4x+': 'Più di 3 volte a settimana',
      'variabile': 'Dipende dagli impegni',
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
        message: `Disponibilità contatto: ${formData.availability}. Tempo disponibile: ${funnelContext.tempo || 'N/A'}. Esperienza: ${funnelContext.esperienza || 'N/A'}. Supporto: ${funnelContext.supporto || 'N/A'}`,
        status: 'nuovo',
      });

      if (error) throw error;

      // Save user name for grazie page
      localStorage.setItem('funnel_user_name', formData.name.split(' ')[0]);
      
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
    <div className="max-w-2xl mx-auto px-4">
      {/* Riepilogo personalizzato */}
      {funnelContext.obiettivo && (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
          <p className="text-sm font-medium text-primary mb-4">In base alle tue risposte:</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-muted-foreground text-sm">Obiettivo principale:</span>
                <p className="font-semibold text-foreground">{getObjectiveLabel(funnelContext.obiettivo)}</p>
              </div>
            </div>
            {funnelContext.tempo && (
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-muted-foreground text-sm">Tempo disponibile:</span>
                  <p className="font-semibold text-foreground">{getTimeLabel(funnelContext.tempo)}</p>
                </div>
              </div>
            )}
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-muted-foreground text-sm">Tipo di supporto:</span>
                <p className="font-semibold text-foreground">Percorso guidato e personalizzato</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 pt-4 border-t border-primary/10">
            Durante la consulenza analizzeremo la tua situazione e ti spiegheremo 
            quale percorso è più adatto a te, senza impegno.
          </p>
        </div>
      )}

      {/* Titolo sezione form */}
      <div className="text-center mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
          Prenota la tua consulenza in studio
        </h2>
        <p className="text-muted-foreground">
          La consulenza è un incontro conoscitivo di circa 30 minuti,<br />
          in un ambiente riservato, senza affollamento.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nome *
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

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            <Clock className="w-4 h-4 inline mr-2" />
            Quando preferisci essere contattato? *
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

        {/* Email (optional) */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email <span className="text-muted-foreground">(facoltativa)</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="mario.rossi@email.com"
            className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
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
          className="w-full py-4 px-6 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Invio in corso...
            </>
          ) : (
            <>
              👉 Prenota la consulenza in studio
            </>
          )}
        </button>

        {/* Micro-copy sotto CTA */}
        <div className="space-y-2 text-sm text-muted-foreground text-center">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Nessun impegno</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Valutazione conoscitiva gratuita</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span>Posti limitati per garantire qualità</span>
          </div>
        </div>
      </form>

      {/* Box riduzione ansia */}
      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {/* Cosa NON succede */}
        <div className="bg-muted/50 rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <X className="w-5 h-5 text-muted-foreground" />
            Cosa NON succede durante la consulenza:
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <X className="w-4 h-4 flex-shrink-0" />
              Nessuna vendita forzata
            </li>
            <li className="flex items-center gap-2">
              <X className="w-4 h-4 flex-shrink-0" />
              Nessun obbligo di iscrizione
            </li>
            <li className="flex items-center gap-2">
              <X className="w-4 h-4 flex-shrink-0" />
              Nessun "pacchetto standard"
            </li>
          </ul>
        </div>

        {/* Cosa succede invece */}
        <div className="bg-primary/5 rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            Cosa succede invece:
          </h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              Analizziamo i tuoi obiettivi
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              Valutiamo la soluzione migliore per te
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              Ti spieghiamo chiaramente come lavoriamo
            </li>
          </ul>
        </div>
      </div>

      {/* WhatsApp subordinato */}
      <div className="mt-10 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Preferisci parlare prima su WhatsApp?
        </p>
        <a
          href="https://wa.me/393400847547?text=Ciao!%20Ho%20compilato%20il%20questionario%20sul%20sito%20e%20vorrei%20prenotare%20una%20consulenza."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="underline">💬 Scrivici su WhatsApp</span>
        </a>
        <p className="text-xs text-muted-foreground mt-1">
          Solo se preferisci un primo contatto informale.
        </p>
      </div>
    </div>
  );
};

export default FunnelBookingForm;
