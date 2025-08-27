
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useInputValidation } from "@/hooks/useInputValidation";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: "",
    citta: "",
    obiettivo: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmission, setLastSubmission] = useState(0);
  const { validators, sanitizeHtml } = useInputValidation();

  // Generate CSRF token on component mount
  useEffect(() => {
    const token = crypto.randomUUID();
    setCsrfToken(token);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Apply length limits and basic sanitization
    let sanitizedValue = value;
    
    if (name === 'nome' || name === 'citta') {
      sanitizedValue = value.slice(0, 50); // Limit name and city length
    } else if (name === 'email') {
      sanitizedValue = value.slice(0, 254); // Standard email max length
    } else if (name === 'telefono') {
      sanitizedValue = value.slice(0, 20); // Phone number limit
    } else if (name === 'messaggio') {
      sanitizedValue = value.slice(0, 2000); // Message limit
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check (max 3 submissions per 10 minutes)
    const now = Date.now();
    const timeWindow = 10 * 60 * 1000; // 10 minutes in milliseconds
    
    if (lastSubmission && (now - lastSubmission < timeWindow) && submissionCount >= 3) {
      toast({
        title: "Troppi tentativi",
        description: "Hai effettuato troppi invii. Riprova tra qualche minuto.",
        variant: "destructive"
      });
      return;
    }
    
    // Reset submission count if outside time window
    if (!lastSubmission || (now - lastSubmission >= timeWindow)) {
      setSubmissionCount(0);
    }
    
    // Comprehensive validation
    if (!formData.nome.trim() || !formData.email.trim() || !formData.telefono.trim() || !formData.messaggio.trim() || !formData.citta.trim() || !formData.obiettivo.trim()) {
      toast({
        title: "Errore",
        description: "Tutti i campi sono obbligatori.",
        variant: "destructive"
      });
      return;
    }

    // Validate email
    if (!validators.email(formData.email)) {
      toast({
        title: "Errore",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive"
      });
      return;
    }

    // Validate name
    if (!validators.name(formData.nome)) {
      toast({
        title: "Errore",
        description: "Il nome contiene caratteri non validi.",
        variant: "destructive"
      });
      return;
    }

    // Validate phone if provided
    if (formData.telefono && !validators.phone(formData.telefono)) {
      toast({
        title: "Errore",
        description: "Inserisci un numero di telefono valido.",
        variant: "destructive"
      });
      return;
    }

    // Sanitize message content
    const sanitizedMessage = sanitizeHtml(formData.messaggio);

    setIsSubmitting(true);

    try {
      console.log('Sending contact form data:', formData);
      console.log('Current domain:', window.location.origin);

      // Add security token (in production, get this from environment or secure source)
      const securityToken = 'temp_token_for_production_use_env_var';
      
      const { data, error } = await supabase.functions.invoke('secure-contact', {
        headers: {
          'x-security-token': securityToken
        },
        body: {
          name: formData.nome.trim(),
          email: formData.email.toLowerCase().trim(),
          message: sanitizedMessage,
          telefono: formData.telefono.trim(),
          city: formData.citta.trim(),
          goal: formData.obiettivo,
          csrfToken: csrfToken,
          timestamp: now,
          securityToken: securityToken
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Errore nella comunicazione con il server');
      }

      if (data?.error) {
        console.error('Edge function returned error:', data);
        throw new Error(data.error);
      }

      console.log('Email sent successfully:', data);

      // Track successful submission
      setSubmissionCount(prev => prev + 1);
      setLastSubmission(now);

      toast({
        title: "Messaggio inviato!",
        description: "Ti contatteremo presto per il tuo check-up gratuito. Controlla anche la tua email per la conferma.",
      });
      
      setFormData({ nome: "", email: "", telefono: "", messaggio: "", citta: "", obiettivo: "" });
    } catch (error: any) {
      console.error('Error sending contact form:', error);
      
      // Provide more specific error messages
      let errorMessage = "Si è verificato un errore nell'invio del messaggio.";
      
      if (error.message?.includes('Failed to fetch')) {
        errorMessage = "Problema di connessione. Verifica la tua connessione internet e riprova.";
      } else if (error.message?.includes('CORS')) {
        errorMessage = "Errore di configurazione del server. Contattaci direttamente.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Errore",
        description: errorMessage,
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
              required
            />
          </div>
          
          <div>
            <label htmlFor="citta" className="block text-sm font-medium mb-2 text-gray-200">Di dove sei *</label>
            <Input
              id="citta"
              name="citta"
              type="text"
              value={formData.citta}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="La tua città"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div>
            <label htmlFor="telefono" className="block text-sm font-medium mb-2 text-gray-200">Telefono</label>
            <Input
              id="telefono"
              name="telefono"
              type="text"
              value={formData.telefono || ""}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Il tuo numero di telefono"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="obiettivo" className="block text-sm font-medium mb-2 text-gray-200">Qual è il tuo obiettivo *</label>
            <select
              id="obiettivo"
              name="obiettivo"
              value={formData.obiettivo}
              onChange={handleInputChange}
              className="w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2"
              disabled={isSubmitting}
              required
            >
              <option value="">Seleziona il tuo obiettivo</option>
              <option value="dimagrimento">Dimagrimento</option>
              <option value="tonificazione">Tonificazione</option>
              <option value="pilates">Pilates</option>
              <option value="mal-di-schiena">Mal di schiena</option>
              <option value="aumento-massa-muscolare">Aumento massa muscolare</option>
              <option value="benessere-generale">Benessere generale</option>
            </select>
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
              required
            />
          </div>
          
          <Button 
            type="submit"
            disabled={isSubmitting}
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
