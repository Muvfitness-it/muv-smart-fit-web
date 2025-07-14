import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BookingFormProps {
  onClose?: () => void;
  preSelectedService?: string;
}

const services = [
  { value: 'personal-training', label: 'Personal Training', duration: 60, price: '€80' },
  { value: 'ems', label: 'Allenamento EMS', duration: 45, price: '€60' },
  { value: 'pancafit', label: 'Pancafit', duration: 60, price: '€50' },
  { value: 'pilates', label: 'Pilates Reformer', duration: 55, price: '€45' },
  { value: 'hiit', label: 'HIIT Training', duration: 45, price: '€40' },
  { value: 'small-group', label: 'Small Group (max 4)', duration: 60, price: '€30' },
  { value: 'consulenza', label: 'Consulenza Nutrizionale', duration: 90, price: '€70' },
  { value: 'massoterapia', label: 'Massoterapia', duration: 60, price: '€65' }
];

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
];

const BookingForm = ({ onClose, preSelectedService }: BookingFormProps) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    serviceType: preSelectedService || '',
    preferredDate: '',
    preferredTime: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    message: ''
  });

  const selectedService = services.find(s => s.value === formData.serviceType);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Track conversion event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'booking_started', {
          service_type: formData.serviceType,
          value: selectedService?.price?.replace('€', '') || 0
        });
      }

      const { error } = await supabase
        .from('bookings')
        .insert({
          service_type: formData.serviceType,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone,
          message: formData.message,
          duration_minutes: selectedService?.duration || 60
        });

      if (error) throw error;

      // Track successful booking
      if (typeof gtag !== 'undefined') {
        gtag('event', 'booking_completed', {
          service_type: formData.serviceType,
          value: selectedService?.price?.replace('€', '') || 0
        });
      }

      toast({
        title: "✅ Prenotazione Inviata!",
        description: `Riceverai conferma entro 2 ore per ${selectedService?.label} del ${new Date(formData.preferredDate).toLocaleDateString('it-IT')} alle ${formData.preferredTime}`,
      });

      onClose?.();
    } catch (error: any) {
      toast({
        title: "Errore nell'invio",
        description: error.message || "Riprova più tardi",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.serviceType || !formData.preferredDate || !formData.preferredTime)) {
      toast({
        title: "Completa i campi richiesti",
        description: "Seleziona servizio, data e orario per continuare",
        variant: "destructive"
      });
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // Get next 30 days excluding Sundays
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Exclude Sundays
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
          🚀 Prenota la Tua Trasformazione
        </CardTitle>
        <CardDescription>
          {step === 1 ? "Scegli servizio, data e orario" : "I tuoi dati di contatto"}
        </CardDescription>
        
        {/* Progress indicator */}
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-brand-primary' : 'bg-gray-300'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-brand-primary' : 'bg-gray-300'}`} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              {/* Service Selection */}
              <div className="space-y-2">
                <Label htmlFor="service" className="flex items-center gap-2">
                  <User size={16} /> Seleziona Servizio
                </Label>
                <Select value={formData.serviceType} onValueChange={(value) => setFormData({...formData, serviceType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Che servizio ti interessa?" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {services.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        <div className="flex justify-between items-center w-full">
                          <span>{service.label}</span>
                          <span className="text-brand-primary font-bold ml-4">{service.price}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedService && (
                  <p className="text-sm text-muted-foreground">
                    ⏱️ Durata: {selectedService.duration} minuti | 💰 Prezzo: {selectedService.price}
                  </p>
                )}
              </div>

              {/* Date Selection */}
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar size={16} /> Data Preferita
                </Label>
                <Select value={formData.preferredDate} onValueChange={(value) => setFormData({...formData, preferredDate: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Quando vorresti allenarti?" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {getAvailableDates().map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString('it-IT', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock size={16} /> Orario Preferito
                </Label>
                <Select value={formData.preferredTime} onValueChange={(value) => setFormData({...formData, preferredTime: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="A che ora ti va meglio?" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="button" 
                onClick={nextStep}
                className="w-full btn-brand"
                size="lg"
              >
                Continua con i Tuoi Dati →
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-4 rounded-lg border border-brand-primary/20">
                <h3 className="font-semibold text-brand-primary mb-2">📋 Riepilogo Prenotazione</h3>
                <p><strong>Servizio:</strong> {selectedService?.label}</p>
                <p><strong>Data:</strong> {new Date(formData.preferredDate).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                <p><strong>Orario:</strong> {formData.preferredTime}</p>
                <p><strong>Prezzo:</strong> {selectedService?.price}</p>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User size={16} /> Nome e Cognome *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Il tuo nome completo"
                    value={formData.clientName}
                    onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone size={16} /> Telefono
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+39 123 456 7890"
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({...formData, clientPhone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail size={16} /> Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="la.tua@email.it"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare size={16} /> Note Aggiuntive
                </Label>
                <Textarea
                  id="message"
                  placeholder="Raccontaci i tuoi obiettivi, eventuali problemi fisici o preferenze..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  type="button" 
                  onClick={prevStep}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  ← Indietro
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || !formData.clientName || !formData.clientEmail}
                  className="flex-1 btn-brand"
                  size="lg"
                >
                  {loading ? "Invio..." : "🎯 Conferma Prenotazione"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;