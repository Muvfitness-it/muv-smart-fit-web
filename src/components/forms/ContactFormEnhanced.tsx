import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { sendContactViaWeb3Forms } from '@/utils/mailAdapter';
import GDPRConsent from '@/components/security/GDPRConsent';
import { Eye, EyeOff } from 'lucide-react';

interface ContactFormEnhancedProps {
  title?: string;
  subtitle?: string;
  campaignName?: string;
  onSuccess?: () => void;
  className?: string;
  showHoneypot?: boolean;
}

const ContactFormEnhanced: React.FC<ContactFormEnhancedProps> = ({
  title = "Contattaci",
  subtitle = "Compila il modulo per essere ricontattato",
  campaignName = "Contatto dal sito",
  onSuccess,
  className = "",
  showHoneypot = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    obiettivo: '',
    honeypot: '',
    gdprConsent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHoneypotField, setShowHoneypotField] = useState(showHoneypot);
  const formRef = useRef<HTMLFormElement>(null);

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.name.trim()) errors.push('Nome richiesto');
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errors.push('Email valida richiesta');
    if (!formData.phone.trim() || !/^[\d\s\+\-\(\)]+$/.test(formData.phone)) errors.push('Telefono valido richiesto');
    if (!formData.message.trim()) errors.push('Messaggio richiesto');
    if (!formData.obiettivo) errors.push('Seleziona un obiettivo');
    if (!formData.gdprConsent) errors.push('Consenso privacy richiesto');
    
    return errors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Bot protection
    if (formData.honeypot) {
      console.log('Bot detected via honeypot');
      return;
    }
    
    const errors = validateForm();
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        telefono: formData.phone,
        message: formData.message,
        obiettivo: formData.obiettivo,
        subject: `${campaignName} - ${formData.name}`,
        from_name: formData.name,
        honeypot: formData.honeypot,
        gdpr_consent: formData.gdprConsent,
        source: 'enhanced-contact-form'
      };

      const result = await sendContactViaWeb3Forms(payload);
      
      if (result.success) {
        toast.success('🎉 Messaggio inviato con successo! Ti ricontatteremo presto.');
        setFormData({ name: '', email: '', phone: '', message: '', obiettivo: '', honeypot: '', gdprConsent: false });
        onSuccess?.();
        
        // Announce success to screen readers
        const liveRegion = document.getElementById('aria-live-polite');
        if (liveRegion) {
          liveRegion.textContent = 'Modulo inviato con successo';
          setTimeout(() => { liveRegion.textContent = ''; }, 3000);
        }
      } else {
        throw new Error(result.message || 'Errore invio modulo');
      }
    } catch (error) {
      console.error('Enhanced form submission error:', error);
      toast.error('Errore nell\'invio. Riprova o contattaci direttamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`bg-white border-brand-primary/30 shadow-xl ${className}`}>
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-heading text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot field - always hidden from users */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ 
              position: 'absolute', 
              left: '-9999px', 
              top: '-9999px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Debug honeypot toggle - only in development */}
          {showHoneypot && (
            <div className="bg-yellow-100 p-2 rounded text-xs">
              <button 
                type="button"
                onClick={() => setShowHoneypotField(!showHoneypotField)}
                className="flex items-center space-x-1 text-yellow-700"
              >
                {showHoneypotField ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                <span>Debug: Honeypot field</span>
              </button>
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-lg font-bold text-gray-900 mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              aria-required="true"
              aria-describedby="name-error"
              value={formData.name}
              onChange={handleChange}
              placeholder="Es. Mario Rossi"
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-bold text-gray-900 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              aria-required="true"
              aria-describedby="email-error"
              value={formData.email}
              onChange={handleChange}
              placeholder="mario.rossi@email.com"
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-bold text-gray-900 mb-2">
              Telefono *
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              aria-required="true"
              aria-describedby="phone-error"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+39 329 107 0374"
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="obiettivo" className="block text-lg font-bold text-gray-900 mb-2">
              Il tuo obiettivo *
            </label>
            <select
              name="obiettivo"
              id="obiettivo"
              required
              aria-required="true"
              aria-describedby="obiettivo-error"
              value={formData.obiettivo}
              onChange={handleChange}
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 appearance-none"
            >
              <option value="">Seleziona il tuo obiettivo</option>
              <option value="Dimagrimento">Dimagrimento</option>
              <option value="Tonificazione">Tonificazione</option>
              <option value="Pilates">Pilates</option>
              <option value="Mal di schiena">Mal di schiena</option>
              <option value="Aumento massa muscolare">Aumento massa muscolare</option>
              <option value="Benessere generale">Benessere generale</option>
              <option value="Fitness per gravidanza/post-parto">Fitness per gravidanza/post-parto</option>
              <option value="Fitness over 65 e ginnastica dolce">Fitness over 65 e ginnastica dolce</option>
              <option value="Riabilitazione e recupero infortuni">Riabilitazione e recupero infortuni</option>
              <option value="Cellulite e ritenzione idrica">Cellulite e ritenzione idrica</option>
              <option value="Preparazione atletica">Preparazione atletica</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-bold text-gray-900 mb-2">
              Messaggio *
            </label>
            <textarea
              name="message"
              id="message"
              required
              aria-required="true"
              aria-describedby="message-error"
              value={formData.message}
              onChange={handleChange}
              placeholder="Racconta il tuo obiettivo e le tue esigenze..."
              rows={4}
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-500 resize-vertical"
            />
          </div>
          
          <GDPRConsent 
            onConsentChange={(consented) => setFormData(prev => ({ ...prev, gdprConsent: consented }))}
            required={true}
          />
          
          <Button
            type="submit"
            disabled={isSubmitting}
            aria-describedby={isSubmitting ? "submitting-status" : undefined}
            className="w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-black font-bold py-4 px-6 text-xl rounded-lg transition-all duration-300 transform hover:scale-105 border-0"
          >
            {isSubmitting ? 'INVIO IN CORSO...' : 'INVIA RICHIESTA'}
          </Button>
          
          {isSubmitting && (
            <p id="submitting-status" className="sr-only">
              Invio del modulo in corso, attendere prego
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactFormEnhanced;