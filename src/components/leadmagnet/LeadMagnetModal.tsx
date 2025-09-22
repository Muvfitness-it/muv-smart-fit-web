import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Download, Mail, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { sendContactViaWeb3Forms } from '@/utils/mailAdapter';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  magnet: {
    title: string;
    description: string;
    benefits: string[];
    downloadUrl: string;
    preview?: string;
  };
}

const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose, magnet }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error('Inserisci nome ed email per ricevere la guida');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: name,
        email: email,
        phone: '',
        message: `Richiesta download: ${magnet.title}`,
        telefono: '',
        obiettivo: 'Download guida gratuita',
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
        subject: `Download Lead Magnet - ${magnet.title} - ${name}`,
        from_name: name,
        honeypot: ''
      };

      const result = await sendContactViaWeb3Forms(payload);
      
      if (result.success) {
        toast.success('🎉 Perfetto! Puoi scaricare la tua guida gratuita');
        setHasDownloaded(true);
        
        // Track conversion
        if (typeof gtag !== 'undefined') {
          gtag('event', 'lead_magnet_download', {
            event_category: 'Lead Generation',
            event_label: magnet.title,
            value: 1
          });
        }
      } else {
        throw new Error(result.message || 'Errore invio');
      }
    } catch (error) {
      console.error('Lead magnet submission error:', error);
      toast.error('Errore nell\'invio. Riprova o contattaci direttamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    // Create download link and trigger download
    const link = document.createElement('a');
    link.href = magnet.downloadUrl;
    link.download = magnet.title.replace(/[^a-z0-9]/gi, '-').toLowerCase() + '.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download iniziato! Controlla la cartella Download');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Gift className="text-brand-primary" size={24} />
            <DialogTitle className="text-xl font-bold text-brand-primary">
              Guida Gratuita
            </DialogTitle>
          </div>
          <DialogDescription asChild>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {magnet.title}
              </h3>
              <p className="text-muted-foreground">
                {magnet.description}
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        {!hasDownloaded ? (
          <Card className="border-brand-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-foreground">Cosa troverai nella guida:</h4>
                <ul className="space-y-2">
                  {magnet.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Il tuo nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-brand-primary/30 focus:border-brand-primary"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="La tua email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-brand-primary/30 focus:border-brand-primary"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-brand-primary hover:bg-brand-primary/90"
                >
                  <Mail className="mr-2" size={16} />
                  {isSubmitting ? 'Invio...' : 'Ricevi la Guida Gratuita'}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                🔒 I tuoi dati sono al sicuro. Niente spam, solo contenuti utili.
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-green-500/20 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h4 className="font-semibold text-green-700 mb-2">
                Perfetto! La tua guida è pronta
              </h4>
              <p className="text-green-600 text-sm mb-6">
                Clicca il pulsante per scaricare la tua guida gratuita
              </p>
              
              <Button 
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Download className="mr-2" size={16} />
                Scarica la Guida PDF
              </Button>
              
              <p className="text-xs text-green-600 mt-4">
                Ti abbiamo anche inviato il link via email per accessi futuri
              </p>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetModal;