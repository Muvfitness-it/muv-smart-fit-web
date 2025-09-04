import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { sendContactViaWeb3Forms } from '@/utils/mailAdapter';

interface FormData {
  name: string;
  email: string;
  phone: string;
  obiettivo: string;
  honeypot: string;
}

interface MUVContactFormProps {
  campaignName?: string;
  onSuccess?: () => void;
  className?: string;
}

const MUVContactForm: React.FC<MUVContactFormProps> = ({
  campaignName = "Candidatura Trasformazione MUV",
  onSuccess,
  className = ""
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    obiettivo: '',
    honeypot: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.honeypot) {
      return; // Bot detected
    }
    
    if (!formData.name || !formData.email || !formData.phone || !formData.obiettivo) {
      toast.error('Compila tutti i campi richiesti');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Obiettivo: ${formData.obiettivo}\nCampagna: ${campaignName}`,
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
        subject: `Nuova candidatura MUV - ${formData.name}`,
        from_name: formData.name,
        honeypot: formData.honeypot
      };

      const result = await sendContactViaWeb3Forms(payload);
      
      if (result.success) {
        toast.success('🎉 Candidatura inviata con successo! Ti ricontatteremo presto.');
        setFormData({ name: '', email: '', phone: '', obiettivo: '', honeypot: '' });
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
          <p className="text-2xl font-heading text-gray-900 mb-2">COMPILA IL MODULO:</p>
          <p className="text-gray-600 text-lg">(inserisci tutti i dati in modo corretto.)</p>
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
              Qual è il tuo obiettivo?
            </label>
            <select
              name="obiettivo"
              id="obiettivo"
              required
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
            </select>
          </div>

          <div>
          <label htmlFor="Message" className="block text-lg font-bold text-gray-900 mb-2">
              Messaggio
            </label>
            <input
              type="tex"
              name="message"
              id="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Scrivi qui il tuo messaggio"
              className="w-full p-4 bg-white border-2 border-gray-300 rounded-lg focus:border-brand-primary focus:ring-0 transition text-lg text-gray-900 placeholder:text-gray-700"
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-black font-bold py-4 px-6 text-xl rounded-lg transition-all duration-300 transform hover:scale-105 border-0"
          >
            {isSubmitting ? 'INVIO IN CORSO...' : 'INVIA MODULO'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MUVContactForm;