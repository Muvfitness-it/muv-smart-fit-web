import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { sendContactViaWeb3Forms } from '@/utils/mailAdapter';
import { Download, Gift, CheckCircle, Star, Users } from 'lucide-react';

interface LeadMagnetProps {
  title?: string;
  description?: string;
  fileName?: string;
  buttonText?: string;
  className?: string;
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({
  title = "Guida Gratuita al Dimagrimento",
  description = "Scopri i 7 segreti per perdere peso velocemente con le tecnologie più avanzate",
  fileName = "guida-dimagrimento-muv.pdf",
  buttonText = "Scarica Gratis",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Nome ed email sono obbligatori");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the download URL (using window.location.origin to get the current domain)
      const downloadUrl = `${window.location.origin}/guide/7-segreti-per-dimagrire.pdf`;
      
      // Send via Formspree with PDF download link included
      const emailResult = await sendContactViaWeb3Forms({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "",
        message: `Ciao ${formData.name},

Grazie per il tuo interesse nella nostra guida "7 Segreti per Dimagrire"!

🎁 SCARICA LA TUA GUIDA GRATUITA:
${downloadUrl}

La guida include:
✓ I 3 errori più comuni nel dimagrimento
✓ Come l'EMS accelera la perdita di peso del 300%
✓ Piano alimentare di 7 giorni testato su 500+ clienti
✓ Esercizi semplici da fare a casa

Se hai problemi con il download, rispondi pure a questa email e ti assisteremo personalmente.

Un saluto dal team di MUV Fitness!

---
Telefono fornito: ${formData.phone || 'Non fornito'}
Fonte: Lead Magnet - sito web`,
        subject: `🎁 La tua guida "7 Segreti per Dimagrire" è pronta - ${formData.name}`,
        source: "Lead Magnet - sito",
        campaign: "Lead Magnet Guida Dimagrimento"
      });

      if (!emailResult.success) {
        throw new Error(emailResult.message || "Errore nell'invio email");
      }

      // Save to database for analytics
      try {
        await fetch("https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/send-lead-magnet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            name: formData.name, 
            email: formData.email, 
            source: "Lead Magnet - sito" 
          })
        });
      } catch (dbError) {
        console.log('Analytics save failed (non-critical):', dbError);
      }

      // Track conversion
      const visitorId = localStorage.getItem('visitor_id') || crypto.randomUUID();
      localStorage.setItem('visitor_id', visitorId);

      try {
        await supabase
          .from('visitor_analytics')
          .insert([{
            visitor_id: visitorId,
            page_path: window.location.pathname,
            referrer: document.referrer,
            user_agent: navigator.userAgent,
            conversion: true,
            utm_campaign: 'Lead Magnet'
          }]);
      } catch (analyticsError) {
        console.log('Analytics insert failed (non-critical):', analyticsError);
      }

      setIsDownloaded(true);
      toast.success("✅ Guida inviata con successo! Controlla la tua casella di posta e la cartella spam.");

    } catch (error) {
      console.error('Error submitting lead magnet form:', error);
      const message = error instanceof Error ? error.message : 'Errore nell\'invio. Riprova più tardi o contattaci direttamente.';
      toast.error(`❌ ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isDownloaded) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="font-bold mb-2">Guida Inviata!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ti abbiamo inviato la guida "7 Segreti per Dimagrire" direttamente nella tua email. 
            Controlla anche la cartella spam!
          </p>
          <div className="text-xs text-muted-foreground">
            Nei prossimi giorni riceverai anche consigli esclusivi e storie di successo dei nostri clienti.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Card className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{description}</p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>Oltre 500 download</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>95% di soddisfazione</span>
                  </div>
                </div>

                <Button size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  {buttonText}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">Scarica la guida gratuita</DialogTitle>
        <DialogDescription className="sr-only">Compila il modulo per ricevere l'ebook via email.</DialogDescription>
        <div className="text-center mb-6">
          <div className="bg-primary/10 p-4 rounded-lg inline-block mb-4">
            <Gift className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Cosa troverai nella guida:</h3>
          <ul className="text-sm space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>I 3 errori più comuni nel dimagrimento</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Come l'EMS accelera la perdita di peso</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Piano alimentare di 7 giorni</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Esercizi semplici da fare a casa</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Nome e Cognome"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              type="tel"
              placeholder="Telefono (opzionale)"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Invio...' : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Scarica Ora Gratis
              </>
            )}
          </Button>

          <div className="text-xs text-center text-muted-foreground">
            <p>✓ Download immediato</p>
            <p>✓ Nessun costo nascosto</p>
            <p>✓ Dati protetti secondo GDPR</p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnet;