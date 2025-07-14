import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  message?: string;
  status: string;
  created_at: string;
  duration_minutes: number;
}

const BookingManager = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const statusConfig = {
    pending: { label: 'In Attesa', color: 'bg-yellow-500', icon: AlertCircle },
    confirmed: { label: 'Confermata', color: 'bg-green-500', icon: CheckCircle },
    cancelled: { label: 'Annullata', color: 'bg-red-500', icon: XCircle },
    completed: { label: 'Completata', color: 'bg-blue-500', icon: CheckCircle }
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

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      toast({
        title: "Errore nel caricamento",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const updateData: any = { status: newStatus };
      
      if (newStatus === 'confirmed') {
        updateData.confirmed_at = new Date().toISOString();
      } else if (newStatus === 'cancelled') {
        updateData.cancelled_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', bookingId);

      if (error) throw error;

      await fetchBookings();
      
      toast({
        title: "Stato aggiornato",
        description: `Prenotazione ${statusConfig[newStatus as keyof typeof statusConfig]?.label.toLowerCase()}`,
      });
    } catch (error: any) {
      toast({
        title: "Errore nell'aggiornamento",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-2">
          📋 Gestione Prenotazioni
        </h1>
        <p className="text-muted-foreground">
          Visualizza e gestisci tutte le prenotazioni ricevute
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Nessuna prenotazione</h3>
            <p className="text-muted-foreground">
              Non ci sono prenotazioni da visualizzare al momento.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => {
            const status = statusConfig[booking.status as keyof typeof statusConfig];
            const StatusIcon = status?.icon || AlertCircle;
            
            return (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-brand-primary">
                        {serviceLabels[booking.service_type as keyof typeof serviceLabels] || booking.service_type}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Prenotazione #{booking.id.slice(0, 8)}
                      </p>
                    </div>
                    <Badge className={`${status?.color} text-white`}>
                      <StatusIcon size={14} className="mr-1" />
                      {status?.label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Client Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-brand-primary" />
                      <span className="font-medium">{booking.client_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-brand-secondary" />
                      <a href={`mailto:${booking.client_email}`} className="text-brand-accent hover:underline">
                        {booking.client_email}
                      </a>
                    </div>
                    {booking.client_phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-green-500" />
                        <a href={`tel:${booking.client_phone}`} className="hover:underline">
                          {booking.client_phone}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Appointment Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-brand-primary" />
                      <span>{new Date(booking.preferred_date).toLocaleDateString('it-IT', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-brand-secondary" />
                      <span>{booking.preferred_time} ({booking.duration_minutes} min)</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ricevuta: {new Date(booking.created_at).toLocaleDateString('it-IT')}
                    </div>
                  </div>

                  {/* Message */}
                  {booking.message && (
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm">
                        <strong>Note del cliente:</strong> {booking.message}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  {booking.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                        className="bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Conferma
                      </Button>
                      <Button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                        variant="destructive"
                        size="sm"
                      >
                        <XCircle size={16} className="mr-1" />
                        Annulla
                      </Button>
                    </div>
                  )}
                  
                  {booking.status === 'confirmed' && (
                    <Button
                      onClick={() => updateBookingStatus(booking.id, 'completed')}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <CheckCircle size={16} className="mr-1" />
                      Segna come Completata
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingManager;