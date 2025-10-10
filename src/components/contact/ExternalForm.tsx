import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Phone, Mail, MapPin } from 'lucide-react';

const ExternalForm = () => {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Contattaci Direttamente</h2>
        
        <div className="space-y-6">
          {/* WhatsApp */}
          <a
            href="https://wa.me/393291070374"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-4 text-lg rounded-lg transition-all duration-300">
              <MessageSquare className="w-6 h-6 mr-3" />
              Scrivici su WhatsApp
            </Button>
          </a>

          {/* Telefono */}
          <a
            href="tel:+393291070374"
            className="block"
          >
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-4 text-lg rounded-lg transition-all duration-300">
              <Phone className="w-6 h-6 mr-3" />
              Chiamaci: +39 329 107 0374
            </Button>
          </a>

          {/* Email */}
          <a
            href="mailto:info@muvfitness.it"
            className="block"
          >
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-4 text-lg rounded-lg transition-all duration-300">
              <Mail className="w-6 h-6 mr-3" />
              Email: info@muvfitness.it
            </Button>
          </a>
        </div>
        
        <div className="mt-8 p-6 bg-muted rounded-lg">
          <div className="flex items-start space-x-3">
            <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-foreground font-semibold mb-2 text-lg">La Nostra Sede</h3>
              <p className="text-muted-foreground">
                <strong>MUV Fitness</strong><br/>
                Piazzetta Don Walter Soave, 2<br/>
                37045 Legnago (VR)<br/>
                Italia
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-primary font-medium text-center">
            📞 Ti richiamiamo entro 10 minuti negli orari di apertura
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalForm;