import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, CheckCircle, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BookingModify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [modified, setModified] = useState(false);
  const [formData, setFormData] = useState({
    preferred_date: '',
    preferred_time: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      // Hash del token ricevuto
      const tokenHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
      const hashString = Array.from(new Uint8Array(tokenHash))
        .map(b => b.toString(16).padStart(2, '0')).join('');

      // Verifica il token nel database
      const { data: tokenData, error: tokenError } = await supabase
        .from('booking_tokens')
        .select('*, bookings(*)')
        .eq('token_hash', hashString)
        .eq('token_type', 'modify')
        .is('used_at', null)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (tokenError || !tokenData) {
        throw new Error('Token non valido o scaduto');
      }

      setTokenValid(true);
      setBooking(tokenData.bookings);
      setFormData({
        preferred_date: tokenData.bookings.preferred_date,
        preferred_time: tokenData.bookings.preferred_time,
        message: tokenData.bookings.message || ''
      });
    } catch (error: any) {
      console.error('Error verifying token:', error);
      toast({
        title: "Token non valido",
        description: "Il link di modifica non è valido o è scaduto.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const modifyBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !booking) return;

    try {
      setLoading(true);

      // Hash del token
      const tokenHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
      const hashString = Array.from(new Uint8Array(tokenHash))
        .map(b => b.toString(16).padStart(2, '0')).join('');

      // Aggiorna la prenotazione
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ 
          preferred_date: formData.preferred_date,
          preferred_time: formData.preferred_time,
          message: formData.message,
          status: 'pending', // Rimette in attesa per conferma admin
          updated_at: new Date().toISOString()
        })
        .eq('id', booking.id);

      if (bookingError) throw bookingError;

      // Marca il token come usato
      const { error: tokenError } = await supabase
        .from('booking_tokens')
        .update({ used_at: new Date().toISOString() })
        .eq('token_hash', hashString);

      if (tokenError) throw tokenError;

      // Invia email di notifica all'admin
      try {
        await supabase.functions.invoke('send-booking-email', {
          body: {
            type: 'status_change',
            booking: { 
              ...booking, 
              preferred_date: formData.preferred_date,
              preferred_time: formData.preferred_time,
              message: formData.message,
              status: 'pending'
            },
            previous_status: booking.status
          }
        });
      } catch (emailError) {
        console.error('Error sending modification email:', emailError);
        // Non blocchiamo il processo se l'email fallisce
      }

      setModified(true);
      toast({
        title: "Prenotazione modificata",
        description: "La tua richiesta di modifica è stata inviata. Riceverai conferma via email.",
      });
    } catch (error: any) {
      console.error('Error modifying booking:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la modifica. Contatta il centro per assistenza.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const serviceLabels = {
    'personal-training': 'Personal Training',
    'ems': 'Allenamento EMS',
    'pancafit': 'Pancafit',
    'pilates': 'Pilates Reformer',
    'hiit': 'HIIT Training',
    'small-group': 'Small Group',
    'consulenza': 'Consulenza Nutrizionale',
    'massoterapia': 'Massoterapia'
  };

  // Ottieni data minima (domani)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Verifica in corso...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle size={48} className="mx-auto text-destructive mb-4" />
            <CardTitle className="text-destructive">Link non valido</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Il link di modifica non è valido o è mancante.
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" />
                Torna alla home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!tokenValid && !loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle size={48} className="mx-auto text-destructive mb-4" />
            <CardTitle className="text-destructive">Token scaduto</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Il link di modifica è scaduto o è stato già utilizzato. 
              Contatta il centro per assistenza.
            </p>
            <Button asChild>
              <Link to="/contatti">
                Contattaci
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (modified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <CardTitle className="text-green-600">Modifica inviata</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              La tua richiesta di modifica è stata inviata con successo. 
              Il nostro team la esaminerà e ti confermerà il nuovo appuntamento.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Riceverai una conferma via email entro 2 ore.
            </p>
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/servizi">
                  Scopri i nostri servizi
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  <ArrowLeft size={16} className="mr-2" />
                  Torna alla home
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Calendar size={48} className="mx-auto text-primary mb-4" />
          <CardTitle className="text-primary">Modifica prenotazione</CardTitle>
        </CardHeader>
        <CardContent>
          {booking && (
            <div className="space-y-4 mb-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Prenotazione attuale:</h3>
                <p><strong>Servizio:</strong> {serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type}</p>
                <p><strong>Cliente:</strong> {booking.client_name}</p>
                <p><strong>Data:</strong> {new Date(booking.preferred_date).toLocaleDateString('it-IT')}</p>
                <p><strong>Orario:</strong> {booking.preferred_time}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={modifyBooking} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="preferred_date">
                <Calendar size={16} className="inline mr-2" />
                Nuova data preferita
              </Label>
              <Input
                id="preferred_date"
                type="date"
                min={getMinDate()}
                value={formData.preferred_date}
                onChange={(e) => setFormData({...formData, preferred_date: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferred_time">
                <Clock size={16} className="inline mr-2" />
                Nuovo orario preferito
              </Label>
              <Input
                id="preferred_time"
                type="time"
                min="08:00"
                max="20:00"
                value={formData.preferred_time}
                onChange={(e) => setFormData({...formData, preferred_time: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Note aggiuntive (opzionale)</Label>
              <Textarea
                id="message"
                placeholder="Eventuali note o richieste specifiche..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={3}
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Nota:</strong> La tua richiesta di modifica sarà esaminata dal nostro team. 
                Riceverai conferma del nuovo appuntamento via email.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button 
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Invio modifica..." : "Invia richiesta di modifica"}
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  <ArrowLeft size={16} className="mr-2" />
                  Annulla e torna alla home
                </Link>
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Hai bisogno di aiuto? <Link to="/contatti" className="text-primary hover:underline">Contattaci</Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingModify;