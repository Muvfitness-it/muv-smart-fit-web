import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const BookingCancel = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState<any>(null);
  const [tokenValid, setTokenValid] = useState(false);
  const [cancelled, setCancelled] = useState(false);
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
        .eq('token_type', 'cancel')
        .is('used_at', null)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (tokenError || !tokenData) {
        throw new Error('Token non valido o scaduto');
      }

      setTokenValid(true);
      setBooking(tokenData.bookings);
    } catch (error: any) {
      console.error('Error verifying token:', error);
      toast({
        title: "Token non valido",
        description: "Il link di cancellazione non è valido o è scaduto.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async () => {
    if (!token || !booking) return;

    try {
      setLoading(true);

      // Hash del token
      const tokenHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
      const hashString = Array.from(new Uint8Array(tokenHash))
        .map(b => b.toString(16).padStart(2, '0')).join('');

      // Aggiorna lo stato della prenotazione
      const { error: bookingError } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancelled_at: new Date().toISOString()
        })
        .eq('id', booking.id);

      if (bookingError) throw bookingError;

      // Marca il token come usato
      const { error: tokenError } = await supabase
        .from('booking_tokens')
        .update({ used_at: new Date().toISOString() })
        .eq('token_hash', hashString);

      if (tokenError) throw tokenError;

      // Invia email di conferma cancellazione
      try {
        await supabase.functions.invoke('send-booking-email', {
          body: {
            type: 'status_change',
            booking: { ...booking, status: 'cancelled' },
            previous_status: booking.status
          }
        });
      } catch (emailError) {
        console.error('Error sending cancellation email:', emailError);
        // Non blocchiamo il processo se l'email fallisce
      }

      setCancelled(true);
      toast({
        title: "Prenotazione annullata",
        description: "La tua prenotazione è stata annullata con successo. Riceverai una conferma via email.",
      });
    } catch (error: any) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la cancellazione. Contatta il centro per assistenza.",
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
              Il link di cancellazione non è valido o è mancante.
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
              Il link di cancellazione è scaduto o è stato già utilizzato. 
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

  if (cancelled) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
            <CardTitle className="text-green-600">Prenotazione annullata</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              La tua prenotazione è stata annullata con successo. 
              Riceverai una conferma via email.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Speriamo di rivederti presto da MUV Wellness!
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
          <AlertCircle size={48} className="mx-auto text-orange-500 mb-4" />
          <CardTitle className="text-orange-600">Annulla prenotazione</CardTitle>
        </CardHeader>
        <CardContent>
          {booking && (
            <div className="space-y-4 mb-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Dettagli prenotazione:</h3>
                <p><strong>Servizio:</strong> {serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type}</p>
                <p><strong>Cliente:</strong> {booking.client_name}</p>
                <p><strong>Data:</strong> {new Date(booking.preferred_date).toLocaleDateString('it-IT', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
                <p><strong>Orario:</strong> {booking.preferred_time}</p>
              </div>
              
              <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  <strong>Attenzione:</strong> Questa azione non può essere annullata. 
                  Stai per annullare definitivamente la tua prenotazione.
                </p>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Button 
              onClick={cancelBooking}
              variant="destructive" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Annullamento in corso..." : "Conferma annullamento"}
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/">
                <ArrowLeft size={16} className="mr-2" />
                Non annullare, torna alla home
              </Link>
            </Button>
          </div>
          
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

export default BookingCancel;