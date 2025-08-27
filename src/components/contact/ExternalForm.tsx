import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

const ExternalForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mblklzbq', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Messaggio inviato con successo! Ti risponderemo presto.');
        form.reset();
      } else {
        throw new Error('Errore nell\'invio');
      }
    } catch (error) {
      toast.error('Errore nell\'invio del messaggio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Invia una Richiesta</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <p className="text-muted-foreground leading-relaxed">
            Compila il nostro modulo di contatto per ricevere informazioni dettagliate sui nostri servizi.
            Ti risponderemo entro 10 minuti negli orari di apertura.
          </p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                La tua email *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1"
                placeholder="esempio@email.com"
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-sm font-medium">
                Il tuo messaggio *
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                className="mt-1 min-h-[120px]"
                placeholder="Scrivi qui la tua richiesta..."
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? (
              'Invio in corso...'
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Invia Messaggio
              </>
            )}
          </Button>
          
          <div className="text-center text-muted-foreground">oppure</div>
          
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
        </form>
        
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h3 className="text-foreground font-semibold mb-2">Contatto Diretto</h3>
          <p className="text-muted-foreground text-sm">
            <strong>Telefono:</strong> +39 329 107 0374<br/>
            <strong>Email:</strong> info@muvfitness.it
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExternalForm;