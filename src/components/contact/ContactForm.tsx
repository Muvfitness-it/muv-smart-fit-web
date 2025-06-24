
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { sanitizeInput, validateQuestion } from "@/utils/security";
import GDPRConsent from "./GDPRConsent";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consents, setConsents] = useState({
    privacy: false,
    marketing: false
  });
  const [csrfToken, setCsrfToken] = useState(() => 
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  );

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Sanitize input in real-time
    const sanitizedValue = sanitizeInput(value, name === 'messaggio' ? 1000 : 255);
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleConsentChange = (type: 'privacy' | 'marketing', checked: boolean) => {
    setConsents(prev => ({
      ...prev,
      [type]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Enhanced validation
    if (!formData.nome.trim() || formData.nome.length < 2) {
      toast({
        title: "Errore Validazione",
        description: "Il nome deve essere di almeno 2 caratteri.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email || !validateEmail(formData.email)) {
      toast({
        title: "Errore Validazione",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive"
      });
      return;
    }

    // Validate message using security utils
    const messageValidation = validateQuestion(formData.messaggio);
    if (!messageValidation.isValid) {
      toast({
        title: "Errore Validazione",
        description: messageValidation.error,
        variant: "destructive"
      });
      return;
    }

    if (!consents.privacy) {
      toast({
        title: "Consenso Privacy Richiesto",
        description: "È necessario accettare l'informativa sulla privacy per procedere.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Use environment variable or default
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID || 'xdkowzpk';
      
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: sanitizeInput(formData.nome, 100),
          email: sanitizeInput(formData.email, 255),
          message: sanitizeInput(formData.messaggio, 1000),
          subject: `Richiesta Check-up Gratuito - ${sanitizeInput(formData.nome, 100)}`,
          privacy_consent: consents.privacy,
          marketing_consent: consents.marketing,
          _replyto: sanitizeInput(formData.email, 255),
          _csrf_token: csrfToken,
          _timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Messaggio inviato!",
          description: "Ti contatteremo presto per il tuo check-up gratuito.",
        });
        setFormData({ nome: "", email: "", messaggio: "" });
        setConsents({ privacy: false, marketing: false });
        // Generate new CSRF token
        setCsrfToken(
          Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        );
      } else {
        throw new Error('Errore nell\'invio del messaggio');
      }
    } catch (error) {
      console.error('Errore invio form:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore nell'invio del messaggio. Riprova più tardi.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Invia una Richiesta</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="_csrf_token" value={csrfToken} />
          
          <div>
            <label htmlFor="nome" className="block text-sm font-medium mb-2 text-gray-200">Nome *</label>
            <Input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Il tuo nome"
              disabled={isSubmitting}
              maxLength={100}
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-200">Email *</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="La tua email"
              disabled={isSubmitting}
              maxLength={255}
              required
            />
          </div>
          
          <div>
            <label htmlFor="messaggio" className="block text-sm font-medium mb-2 text-gray-200">Messaggio *</label>
            <Textarea
              id="messaggio"
              name="messaggio"
              value={formData.messaggio}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white min-h-32"
              placeholder="Raccontaci i tuoi obiettivi e come possiamo aiutarti..."
              disabled={isSubmitting}
              maxLength={1000}
              required
            />
          </div>

          <GDPRConsent 
            consents={consents}
            onConsentChange={handleConsentChange}
            isSubmitting={isSubmitting}
          />
          
          <Button 
            type="submit"
            disabled={isSubmitting || !consents.privacy}
            className="w-full bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 hover:from-pink-700 hover:via-purple-600 hover:to-blue-600 text-white py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? "Invio in corso..." : "Invia Richiesta"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
