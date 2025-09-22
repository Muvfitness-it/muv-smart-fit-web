import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { sendContactViaWeb3Forms } from '@/utils/mailAdapter';
import GDPRConsent from '@/components/security/GDPRConsent';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  obiettivo: string;
  honeypot: string;
  gdprConsent: boolean;
}

interface MUVContactFormProps {
  campaignName?: string;
  onSuccess?: () => void;
  className?: string;
  defaultObjective?: string;
}

const MUVContactForm: React.FC<MUVContactFormProps> = ({
  campaignName = "Candidatura Trasformazione MUV",
  onSuccess,
  className = "",
  defaultObjective = ""
}) => {
  console.log('MUVContactForm component rendered');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    obiettivo: defaultObjective,
    honeypot: '',
    gdprConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-carica dati dall'assistente AI se disponibili
  useEffect(() => {
    const aiData = localStorage.getItem('muvAssistantData');
    if (aiData) {
      try {
        const parsedData = JSON.parse(aiData);
        setFormData(prev => ({
          ...prev,
          name: parsedData.name || '',
          message: parsedData.problem ? 
            `🤖 Dall'Assistente AI:\nProblema: ${parsedData.problem}\n${parsedData.service ? `Servizio suggerito: ${parsedData.service}\n` : ''}\n${parsedData.notes ? `Note conversazione:\n${parsedData.notes}\n\n` : ''}---\nMessaggio aggiuntivo:\n` 
            : prev.message,
          obiettivo: parsedData.service || prev.obiettivo
        }));
        // Mostra notifica che i dati sono stati caricati
        toast.success('✨ Dati caricati dalla chat con l\'assistente AI!');
        // Rimuove i dati dopo il caricamento
        localStorage.removeItem('muvAssistantData');
      } catch (error) {
        console.error('Errore nel caricamento dati AI:', error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.honeypot) {
      return; // Bot detected
    }
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Compila nome, email e telefono per continuare');
      return;
    }

    if (!formData.gdprConsent) {
      toast.error('È necessario accettare il trattamento dei dati per procedere');
      return;
    }

    setIsSubmitting(true);

    try {
      const messageToSend = formData.message && formData.message.trim().length >= 10
        ? formData.message
        : `Richiesta consulenza dal sito.\nNome: ${formData.name}\nTelefono: ${formData.phone}\nObiettivo: ${formData.obiettivo || 'Non specificato'}`;

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: messageToSend,
        telefono: formData.phone,
        obiettivo: formData.obiettivo,
        access_key: process.env.WEB3FORMS_ACCESS_KEY || 'fallback-key',
        subject: `Nuova candidatura MUV - ${formData.name}`,
        from_name: formData.name,
        honeypot: formData.honeypot
      };

      console.log('Form payload:', payload);
      const result = await sendContactViaWeb3Forms(payload);
      console.log('Form result:', result);

      if (result.success) {
        toast.success('🎉 Candidatura inviata con successo! Ti ricontatteremo presto.');
        setFormData({ name: '', email: '', phone: '', message: '', obiettivo: '', honeypot: '', gdprConsent: false });
        onSuccess?.();
      } else {
        throw new Error(result.message || 'Errore invio modulo');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Errore nell\'invio. Riprova o contattaci direttamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={`bg-white border-brand-primary/30 shadow-xl ${className}`}>
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <p className="text-2xl font-heading text-gray-900 mb-2">OTTIENI LA TUA CONSULENZA GRATUITA</p>
          <p className="text-gray-600 text-base">
            ⏱️ <strong>Ci vogliono solo 30 secondi</strong> - Ti ricontatteremo entro 10 minuti
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <label htmlFor="name" className="block text-lg font-bold text-gray-900 mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Es. Mario Rossi"
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-bold text-gray-900 mb-2">
              Email Migliore
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="es. mario.rossi@email.com"
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-bold text-gray-900 mb-2">
              Numero di Telefono
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Il tuo numero per essere ricontattato"
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div>
            <label htmlFor="obiettivo" className="block text-lg font-bold text-gray-900 mb-2">
              Qual è il tuo obiettivo? <span className="text-gray-500 font-normal">(opzionale)</span>
            </label>
            <select
              name="obiettivo"
              id="obiettivo"
              value={formData.obiettivo}
              onChange={handleChange}
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 appearance-none"
            >
              <option value="" className="bg-white text-gray-900">Seleziona il tuo obiettivo</option>
              <option value="Dimagrimento" className="bg-white text-gray-900">Dimagrimento</option>
              <option value="Tonificazione" className="bg-white text-gray-900">Tonificazione</option>
              <option value="Pilates" className="bg-white text-gray-900">Pilates</option>
              <option value="Mal di schiena" className="bg-white text-gray-900">Mal di schiena</option>
              <option value="Aumento massa muscolare" className="bg-white text-gray-900">Aumento massa muscolare</option>
              <option value="Benessere generale" className="bg-white text-gray-900">Benessere generale</option>
              <option value="Fitness per gravidanza/post-parto" className="bg-white text-gray-900">Fitness per gravidanza/post-parto</option>
              <option value="Fitness over 65 e ginnastica dolce" className="bg-white text-gray-900">Fitness over 65 e ginnastica dolce</option>
              <option value="Riabilitazione e recupero infortuni" className="bg-white text-gray-900">Riabilitazione e recupero infortuni</option>
              <option value="Cellulite e ritenzione idrica" className="bg-white text-gray-900">Cellulite e ritenzione idrica</option>
              <option value="Preparazione atletica" className="bg-white text-gray-900">Preparazione atletica</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Ci aiuta a prepararci meglio per la tua consulenza</p>
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-bold text-gray-900 mb-2">
              Messaggio <span className="text-gray-500 font-normal">(opzionale)</span>
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Raccontaci qualcosa di più sui tuoi obiettivi..."
              rows={3}
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-500 resize-vertical"
            />
            <p className="text-sm text-gray-500 mt-1">Non obbligatorio - puoi dircelo anche durante la consulenza</p>
          </div>
          
          <GDPRConsent 
            onConsentChange={(consented) => setFormData(prev => ({ ...prev, gdprConsent: consented }))}
            required={true}
          />
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-white font-black py-6 px-6 text-xl rounded-lg transition-all duration-300 transform hover:scale-105 border-0 shadow-2xl min-h-[64px]"
          >
            {isSubmitting ? '⏳ INVIO IN CORSO...' : '🎯 OTTIENI LA TUA CONSULENZA GRATUITA'}
          </Button>
          
          <div className="text-center mt-4 space-y-2">
            <p className="text-sm text-gray-600">
              ✓ 100% Gratuito ✓ Nessun impegno ✓ Risposta garantita in 10 minuti
            </p>
            <p className="text-xs text-gray-500">
              Oltre 127 persone hanno già trasformato il loro corpo con noi
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MUVContactForm;