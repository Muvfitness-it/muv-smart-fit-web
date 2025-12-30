import { useState } from 'react';
import { Mail, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'footer';
}

export default function NewsletterForm({ variant = 'default' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter_subscribers')
        .select('id, status')
        .eq('email', email)
        .maybeSingle();

      if (existing) {
        if (existing.status === 'active') {
          toast.info('Sei già iscritto alla nostra newsletter!');
          setIsLoading(false);
          return;
        }
        // Reactivate subscription
        await supabase
          .from('newsletter_subscribers')
          .update({ 
            status: 'active', 
            name: name || null,
            unsubscribed_at: null 
          })
          .eq('id', existing.id);
      } else {
        // New subscription
        const { error } = await supabase
          .from('newsletter_subscribers')
          .insert({
            email,
            name: name || null,
            source: 'footer_form',
            status: 'active'
          });

        if (error) throw error;
      }

      setIsSuccess(true);
      toast.success('Iscrizione completata! 🎉 Riceverai la nostra newsletter settimanale.');
      setEmail('');
      setName('');
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error('Si è verificato un errore. Riprova più tardi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl animate-fade-in">
        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
        <div>
          <p className="font-semibold text-foreground">Iscrizione completata!</p>
          <p className="text-sm text-muted-foreground">Riceverai la nostra newsletter ogni lunedì.</p>
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">Newsletter Settimanale</h4>
            <p className="text-xs text-muted-foreground">Consigli fitness, offerte esclusive</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 h-10 bg-background/50 text-sm"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="sm"
              className="h-10 px-4 bg-primary hover:bg-primary/90"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Mail className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/70">
            Niente spam. Puoi cancellarti quando vuoi.
          </p>
        </form>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="La tua email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="flex-1 h-10"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="sm"
          className="h-10"
          disabled={isLoading || !email}
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Iscriviti'}
        </Button>
      </form>
    );
  }

  // Default variant
  return (
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-foreground">Newsletter Settimanale</h3>
          <p className="text-sm text-muted-foreground">Consigli fitness, ricette e offerte esclusive</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          placeholder="Il tuo nome (opzionale)"
          value={name}
          onChange={e => setName(e.target.value)}
          className="h-11"
          disabled={isLoading}
        />
        <Input
          type="email"
          placeholder="La tua email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="h-11"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          disabled={isLoading || !email}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Iscriviti Gratis
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Niente spam, promesso. Puoi cancellarti in qualsiasi momento.
        </p>
      </form>
    </div>
  );
}
