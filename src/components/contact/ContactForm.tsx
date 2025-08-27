import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.nome.trim()) {
      toast({
        title: "Errore",
        description: "Il nome è obbligatorio.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Errore",
        description: "L'email è obbligatoria.",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Errore",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.citta.trim()) {
      toast({
        title: "Errore",
        description: "La città è obbligatoria.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.telefono.trim()) {
      toast({
        title: "Errore",
        description: "Il telefono è obbligatorio.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.obiettivo.trim()) {
      toast({
        title: "Errore",
        description: "Seleziona un obiettivo.",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.messaggio.trim()) {
      toast({
        title: "Errore",
        description: "Il messaggio è obbligatorio.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('secure-contact', {
        body: {
          name: formData.nome.trim(),
          email: formData.email.toLowerCase().trim(),
          message: formData.messaggio.trim(),
          telefono: formData.telefono.trim(),
          city: formData.citta.trim(),
          goal: formData.obiettivo
        }
      });

      if (error) {
        throw new Error(error.message || 'Errore nell\'invio del messaggio');
      }

      if (data?.success === false) {
        throw new Error(data.error || 'Errore del server');
      }

      toast({
        title: "Messaggio inviato!",
        description: "Ti contatteremo presto per il tuo check-up gratuito.",
      });
      
      setFormData({ 
        nome: "", 
        email: "", 
        telefono: "", 
        messaggio: "", 
        citta: "", 
        obiettivo: "" 
      });

    } catch (error: any) {
      console.error('Error sending contact form:', error);
      
      toast({
        title: "Errore",
        description: error.message || "Si è verificato un errore nell'invio del messaggio.",
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
            <label htmlFor="telefono" className="block text-sm font-medium mb-2 text-gray-200">Telefono *</label>
            <Input
              id="telefono"
              name="telefono"
              type="text"
              value={formData.telefono}
              onChange={handleInputChange}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="Il tuo numero di telefono"
              disabled={isSubmitting}
              required
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