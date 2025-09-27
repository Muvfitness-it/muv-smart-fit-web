// Form Lead MUV - Specifiche: max 3 campi (nome, email, telefono), tutti obbligatori
// Lead magnet: "Guida EMS per dimagrimento" PDF, checkbox GDPR, feedback errori real-time
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Download } from 'lucide-react';

interface FormData {
  nome: string;
  email: string;
  telefono: string;
  gdprConsent: boolean;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefono?: string;
  gdprConsent?: string;
}

const MUVLeadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefono: '',
    gdprConsent: false
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showLeadMagnet, setShowLeadMagnet] = useState(false);

  // Validazione real-time
  const validateField = (name: string, value: string | boolean) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'nome':
        if (!value || (value as string).trim().length < 2) {
          newErrors.nome = 'Il nome deve contenere almeno 2 caratteri';
        } else {
          delete newErrors.nome;
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || !emailRegex.test(value as string)) {
          newErrors.email = 'Inserisci un indirizzo email valido';
        } else {
          delete newErrors.email;
        }
        break;
      case 'telefono':
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!value || !phoneRegex.test(value as string)) {
          newErrors.telefono = 'Inserisci un numero di telefono valido';
        } else {
          delete newErrors.telefono;
        }
        break;
      case 'gdprConsent':
        if (!value) {
          newErrors.gdprConsent = 'Devi accettare la privacy policy per procedere';
        } else {
          delete newErrors.gdprConsent;
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, gdprConsent: checked }));
    validateField('gdprConsent', checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validazione completa
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key as keyof FormData]);
    });
    
    if (Object.keys(errors).length > 0) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulazione invio form (sostituire con chiamata API reale)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSuccess(true);
      setShowLeadMagnet(true);
      
      // Reset form
      setFormData({
        nome: '',
        email: '',
        telefono: '',
        gdprConsent: false
      });
      
    } catch (error) {
      console.error('Errore invio form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadLeadMagnet = () => {
    // Download PDF guida EMS
    const link = document.createElement('a');
    link.href = '/guide/7-segreti-per-dimagrire.pdf';
    link.download = 'Guida-EMS-per-dimagrimento-MUV-Fitness.pdf';
    link.click();
  };

  if (isSuccess && showLeadMagnet) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: 'Poppins' }}>
            Grazie per esserti registrato!
          </h3>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Poppins' }}>
            Scarica la tua guida gratuita "EMS per dimagrimento"
          </p>
          <Button 
            onClick={downloadLeadMagnet}
            className="bg-accent hover:bg-accent/80 text-accent-foreground px-6 py-3 rounded-lg font-medium"
            style={{ fontFamily: 'Poppins', borderRadius: '12px' }}
          >
            <Download className="w-5 h-5 mr-2" />
            Scarica la Guida PDF
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2" style={{ fontFamily: 'Poppins' }}>
            Scarica la Guida Gratuita
          </h2>
          <p className="text-gray-600" style={{ fontFamily: 'Poppins' }}>
            "EMS per dimagrimento" - La tua guida completa
          </p>
        </div>

        {/* Campo Nome */}
        <div>
          <Label htmlFor="nome" className="text-primary font-medium" style={{ fontFamily: 'Poppins' }}>
            Nome *
          </Label>
          <Input
            id="nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleInputChange}
            className={`mt-1 ${errors.nome ? 'border-red-500' : ''}`}
            placeholder="Il tuo nome"
            required
          />
          {errors.nome && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.nome}
            </div>
          )}
        </div>

        {/* Campo Email */}
        <div>
          <Label htmlFor="email" className="text-primary font-medium" style={{ fontFamily: 'Poppins' }}>
            Email *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
            placeholder="la-tua-email@esempio.com"
            required
          />
          {errors.email && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </div>
          )}
        </div>

        {/* Campo Telefono */}
        <div>
          <Label htmlFor="telefono" className="text-primary font-medium" style={{ fontFamily: 'Poppins' }}>
            Telefono *
          </Label>
          <Input
            id="telefono"
            name="telefono"
            type="tel"
            value={formData.telefono}
            onChange={handleInputChange}
            className={`mt-1 ${errors.telefono ? 'border-red-500' : ''}`}
            placeholder="+39 123 456 7890"
            required
          />
          {errors.telefono && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.telefono}
            </div>
          )}
        </div>

        {/* Checkbox GDPR */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="gdpr"
            checked={formData.gdprConsent}
            onCheckedChange={handleCheckboxChange}
            className={errors.gdprConsent ? 'border-red-500' : ''}
          />
          <Label htmlFor="gdpr" className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Poppins' }}>
            Accetto la{' '}
            <a href="/privacy" className="text-primary hover:underline" target="_blank">
              privacy policy
            </a>{' '}
            e autorizzo il trattamento dei miei dati per ricevere la guida gratuita *
          </Label>
        </div>
        {errors.gdprConsent && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.gdprConsent}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="w-full bg-accent hover:bg-accent/80 text-accent-foreground py-3 font-medium transition-all duration-300"
          style={{ 
            fontFamily: 'Poppins',
            fontSize: '18px',
            borderRadius: '12px'
          }}
        >
          {isSubmitting ? 'Invio in corso...' : 'Scarica la Guida Gratuita'}
        </Button>

        <div className="text-center">
          <p className="text-xs text-gray-500" style={{ fontFamily: 'Poppins' }}>
            * Campi obbligatori
          </p>
        </div>
      </form>
    </div>
  );
};

export default MUVLeadForm;