import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { sendContactViaWeb3Forms } from '@/utils/mailAdapter';
import { CheckCircle, Clock, Shield, Phone } from 'lucide-react';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  obiettivo: string;
  campaign_name: string;
  source: string;
}

interface EnhancedContactFormProps {
  campaignName?: string;
  source?: string;
  title?: string;
  subtitle?: string;
  showProgress?: boolean;
  className?: string;
}

const EnhancedContactForm: React.FC<EnhancedContactFormProps> = ({
  campaignName = "Website Contact",
  source = "website",
  title = "Prenota la Tua Prova Gratuita",
  subtitle = "Compila il form e ti richiamiamo entro 24 ore",
  showProgress = false,
  className = ""
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    obiettivo: '',
    campaign_name: campaignName,
    source: source
  });

  const totalSteps = 3;

  const objectives = [
    "Dimagrimento rapido",
    "Tonificazione muscolare", 
    "Postura e mal di schiena",
    "Rimessa in forma generale",
    "Allenamento specifico EMS",
    "Trattamento Vacuum",
    "Pilates Reformer",
    "Consulenza nutrizionale",
    "Altro"
  ];

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim().length >= 2 && formData.phone.trim().length >= 10;
      case 2:
        return formData.obiettivo !== '';
      case 3:
        return true; // Message is optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    } else {
      toast.error("Completa tutti i campi obbligatori per continuare");
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const submitLead = async (leadData: LeadFormData) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([leadData])
        .select()
        .single();

      if (error) throw error;

      // Track visitor analytics
      const visitorId = localStorage.getItem('visitor_id') || crypto.randomUUID();
      localStorage.setItem('visitor_id', visitorId);

      await supabase
        .from('visitor_analytics')
        .insert([{
          visitor_id: visitorId,
          page_path: window.location.pathname,
          referrer: document.referrer,
          user_agent: navigator.userAgent,
          conversion: true,
          utm_campaign: campaignName
        }]);

      return data;
    } catch (error) {
      console.error('Error submitting lead:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      toast.error("Completa tutti i campi obbligatori");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send via Formspree (same as other forms)
      const emailResult = await sendContactViaWeb3Forms({
        name: formData.name,
        email: formData.email || "",
        phone: formData.phone,
        message: formData.message || `Prenotazione prova gratuita. Obiettivo: ${formData.obiettivo}`,
        subject: `Prenotazione prova gratuita: ${formData.name}`,
        source: formData.source,
        campaign: formData.campaign_name,
        obiettivo: formData.obiettivo
      });

      if (!emailResult.success) {
        throw new Error(emailResult.message || "Errore nell'invio email");
      }

      // Save to database for analytics (non-critical)
      try {
        await submitLead(formData);
      } catch (dbError) {
        // Database save failed, continue with email success
      }

      setIsSubmitted(true);
      toast.success("✅ Richiesta inviata! Ti contatteremo entro 24 ore.");
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          obiettivo: '',
          campaign_name: campaignName,
          source: source
        });
      }, 5000);

    } catch (error) {
      console.error('Error submitting booking form:', error);
      const message = error instanceof Error ? error.message : 'Errore nell\'invio. Riprova più tardi o contattaci direttamente.';
      toast.error(`❌ ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={`max-w-md mx-auto ${className}`}>
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Richiesta Inviata!</h3>
          <p className="text-muted-foreground mb-4">
            Grazie {formData.name}! Ti contatteremo entro 24 ore per fissare il tuo appuntamento.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Risposta garantita entro 24 ore</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-4 w-4" />
              <span>I tuoi dati sono al sicuro</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Emergenze: 349 123 4567</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`max-w-md mx-auto ${className}`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
        
        {showProgress && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Passo {currentStep} di {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nome e Cognome *</label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Es. Mario Rossi"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Telefono *</label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Es. 349 123 4567"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Email (opzionale)</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Es. mario@email.com"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Qual è il tuo obiettivo principale? *</label>
                <Select 
                  value={formData.obiettivo} 
                  onValueChange={(value) => handleInputChange('obiettivo', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Seleziona il tuo obiettivo" />
                  </SelectTrigger>
                  <SelectContent>
                    {objectives.map((obj) => (
                      <SelectItem key={obj} value={obj}>{obj}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Note aggiuntive (opzionale)</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Scrivi qui eventuali domande o esigenze particolari..."
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div className="bg-muted/50 p-3 rounded text-sm">
                <h4 className="font-medium mb-2">Riepilogo:</h4>
                <p><strong>Nome:</strong> {formData.name}</p>
                <p><strong>Telefono:</strong> {formData.phone}</p>
                {formData.email && <p><strong>Email:</strong> {formData.email}</p>}
                <p><strong>Obiettivo:</strong> {formData.obiettivo}</p>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            {currentStep > 1 && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                className="flex-1"
              >
                Indietro
              </Button>
            )}
            
            {currentStep < totalSteps ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className="flex-1"
                disabled={!validateStep(currentStep)}
              >
                Continua
              </Button>
            ) : (
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting || !validateStep(currentStep)}
              >
                {isSubmitting ? 'Invio...' : 'PRENOTA GRATIS'}
              </Button>
            )}
          </div>

          <div className="text-xs text-center text-muted-foreground pt-2">
            <p>✓ Nessun costo nascosto</p>
            <p>✓ Nessun obbligo di iscrizione</p>
            <p>✓ Dati protetti secondo GDPR</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedContactForm;