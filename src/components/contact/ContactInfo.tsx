import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";
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
                  Via Venti Settembre, 5/7<br />
                  Legnago, (VR)<br />
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
    </div>
  );
};

export default ContactInfo;