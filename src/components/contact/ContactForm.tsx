
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome.trim() || !formData.email.trim() || !formData.messaggio.trim()) {
      toast({
        title: "Errore",
        description: "Tutti i campi sono obbligatori.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xdkowzpk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.nome,
          email: formData.email,
          message: formData.messaggio,
          subject: `Richiesta Check-up Gratuito - ${formData.nome}`,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        toast({
          title: "Messaggio inviato!",
          description: "Ti contatteremo presto per il tuo check-up gratuito.",
        });
        setFormData({ nome: "", email: "", messaggio: "" });
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
