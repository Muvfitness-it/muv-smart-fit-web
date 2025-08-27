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
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      const respText = await response.text();
      console.debug('Formspree status:', response.status, 'body:', respText);

      if (response.ok) {
        toast.success('Messaggio inviato con successo! Ti risponderemo presto.');
        form.reset();
      } else {
        // Fallback to native form submission for CORS/403 errors
        console.warn('Fetch failed, using native form submission');
        form.submit();
        return;
      }
    } catch (error) {
      console.error('Errore Formspree:', error);
      // Fallback to native form submission
      console.warn('Fetch error, using native form submission');
      form.submit();
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Invia una Richiesta</h2>
        
        <form 
          onSubmit={handleSubmit} 
          action="https://formspree.io/f/mblklzbq"
          method="POST"
          className="space-y-6 text-left"
        >
          {/* Hidden fields for Formspree */}
          <input type="hidden" name="_subject" value="Nuova richiesta da MUV Fitness" />
          <input type="hidden" name="page" value="Contatti" />
          <input type="hidden" name="_gotcha" style={{ display: 'none' }} />
          
          <div>
            <Label htmlFor="name" className="text-lg font-bold text-muted-foreground">
              Nome Completo
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Es. Mario Rossi"
              className="w-full mt-2 p-4 bg-card border-2 border-border rounded-lg focus:border-primary focus:ring-0 transition text-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-lg font-bold text-muted-foreground">
              Email Migliore
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              placeholder="es. mario.rossi@email.com"
              className="w-full mt-2 p-4 bg-card border-2 border-border rounded-lg focus:border-primary focus:ring-0 transition text-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-lg font-bold text-muted-foreground">
              Numero di Telefono
            </Label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              required
              placeholder="Il tuo numero per essere ricontattato"
              className="w-full mt-2 p-4 bg-card border-2 border-border rounded-lg focus:border-primary focus:ring-0 transition text-lg"
            />
          </div>
          
          <div>
            <Label htmlFor="obiettivo" className="text-lg font-bold text-muted-foreground">
              Qual è il tuo obiettivo?
            </Label>
            <select
              name="obiettivo"
              id="obiettivo"
              required
              defaultValue=""
              className="w-full mt-2 p-4 bg-card border-2 border-border rounded-lg focus:border-primary focus:ring-0 transition text-lg appearance-none"
            >
              <option value="" disabled>Seleziona il tuo obiettivo</option>
              <option value="Dimagrimento">Dimagrimento</option>
              <option value="Tonificazione">Tonificazione</option>
              <option value="Pilates">Pilates</option>
              <option value="Mal di schiena">Mal di schiena</option>
              <option value="Aumento massa muscolare">Aumento massa muscolare</option>
              <option value="Benessere generale">Benessere generale</option>
            </select>
          </div>

          <div>
            <Label htmlFor="message" className="text-lg font-bold text-muted-foreground">
              Messaggio (opzionale)
            </Label>
            <Textarea
              name="message"
              id="message"
              placeholder="Raccontaci di più sui tuoi obiettivi o domande specifiche..."
              className="w-full mt-2 p-4 bg-card border-2 border-border rounded-lg focus:border-primary focus:ring-0 transition text-lg min-h-[100px]"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground py-4 text-xl font-bold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? (
              'Invio in corso...'
            ) : (
              'CANDIDAMI PER LA TRASFORMAZIONE'
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