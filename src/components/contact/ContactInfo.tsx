import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
const ContactInfo = () => {
  return (
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
                  Piazzetta Don Walter Soave, 2<br />
                  37045 Legnago (VR)<br />
                  Italia
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Telefono</h3>
                <p className="text-gray-300">+39 329 107 0374</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-pink-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-white mb-1">Email</h3>
                <p className="text-gray-300">info@muvfitness.it</p>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex items-start space-x-4 pt-4 border-t border-gray-700">
              <div className="flex space-x-3">
                <a 
                  href="https://www.instagram.com/muvfitness.it/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label="Seguici su Instagram"
                >
                  <Instagram className="w-6 h-6 text-white" />
                </a>
                <a 
                  href="https://www.facebook.com/MUVFitnessLegnago" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  aria-label="Seguici su Facebook"
                >
                  <Facebook className="w-6 h-6 text-white" />
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Seguici sui Social</h3>
                <p className="text-gray-300 text-sm">
                  @muvfitness.it | Ispirazioni quotidiane
                </p>
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
              <span>08:00 - 21:00</span>
            </div>
            <div className="flex justify-between">
              <span>Sabato</span>
              <span>08:00 - 12:00</span>
            </div>
            <div className="flex justify-between">
              <span>Domenica</span>
              <span>Chiusi</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Google Maps */}
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2805.8935!2d11.3078344!3d45.1912447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f4e5dc8b8f0ab%3A0x5e0c8e8e8e8e8e8e!2sPiazzetta%20Don%20Walter%20Soave%2C%202%2C%2037045%20Legnago%20VR!5e0!3m2!1sit!2sit!4v1234567890"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mappa MUV Fitness - Piazzetta Don Walter Soave 2, Legnago"
            className="rounded-lg"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;