
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.messaggio) {
      toast({
        title: "Attenzione",
        description: "Tutti i campi sono obbligatori.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Messaggio inviato!",
      description: "Ti contatteremo presto per il tuo check-up gratuito.",
    });

    setFormData({ nome: "", email: "", messaggio: "" });
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
                    <label htmlFor="nome" className="block text-sm font-medium mb-2">Nome *</label>
                    <Input
                      id="nome"
                      name="nome"
                      type="text"
                      value={formData.nome}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white"
                      placeholder="La tua email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="messaggio" className="block text-sm font-medium mb-2">Messaggio *</label>
                    <Textarea
                      id="messaggio"
                      name="messaggio"
                      value={formData.messaggio}
                      onChange={handleInputChange}
                      className="bg-gray-700 border-gray-600 text-white min-h-32"
                      placeholder="Raccontaci i tuoi obiettivi e come possiamo aiutarti..."
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 hover:from-pink-700 hover:via-purple-600 hover:to-blue-600 text-white py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                  >
                    Invia Richiesta
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
                        <p className="text-gray-300">info@muvfitness.it</p>
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
