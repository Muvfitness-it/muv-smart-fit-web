import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, MessageSquare } from 'lucide-react';

const ExternalForm = () => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-white">Invia una Richiesta</h2>
        <div className="space-y-6">
          <p className="text-gray-300 leading-relaxed">
            Compila il nostro modulo di contatto per ricevere informazioni dettagliate sui nostri servizi.
            Ti risponderemo entro 10 minuti negli orari di apertura.
          </p>
          
          <div className="flex flex-col gap-4">
            <a
              href="https://link.drewcompany.it/widget/form/CtTtu1r7yFEMPXlPJQEy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <Button className="w-full bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 hover:from-pink-700 hover:via-purple-600 hover:to-blue-600 text-white py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105">
                <ExternalLink className="w-5 h-5 mr-2" />
                Apri il Modulo di Contatto
              </Button>
            </a>
            
            <div className="text-center text-gray-400">oppure</div>
            
            <a
              href="https://wa.me/393291070374"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 text-lg rounded-full transition-all duration-300">
                <MessageSquare className="w-5 h-5 mr-2" />
                Scrivici su WhatsApp
              </Button>
            </a>
          </div>
          
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-white font-semibold mb-2">Contatto Diretto</h3>
            <p className="text-gray-300 text-sm">
              <strong>Telefono:</strong> +39 329 107 0374<br/>
              <strong>Email:</strong> info@muvfitness.it
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalForm;