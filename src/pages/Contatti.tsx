
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contatti = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.messaggio) {
      toast({
        title: "Attenzione",
        description: "Tutti i campi sono obbligatori.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Sostituisci 'YOUR_FORM_ID' con il tuo Form ID di Formspree
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
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
      console.error('Errore:', error);
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
    <div className="min-h-screen bg-gray-900 text-white">
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              CONTATTACI E PRENOTA UN{" "}
              <span className="text-pink-600">CHECK-UP GRATUITO</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Inizia il tuo percorso di trasformazione con una consulenza personalizzata gratuita.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
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

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6 text-white">Informazioni di Contatto</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">Indirizzo</h3>
                        <p className="text-gray-300">
                          Via del Fitness, 123<br />
                          20100 Milano, MI<br />
                          Italia
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">Telefono</h3>
                        <p className="text-gray-300">+39 02 1234 5678</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Mail className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">Email</h3>
                        <p className="text-gray-300">vincenzob2011@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-white">Orari di Apertura</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Lunedì - Venerdì</span>
                      <span>6:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sabato</span>
                      <span>8:00 - 20:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domenica</span>
                      <span>9:00 - 18:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contatti;
