import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface GDPRConsentProps {
  onConsentChange: (consented: boolean) => void;
  required?: boolean;
}

const GDPRConsent: React.FC<GDPRConsentProps> = ({ onConsentChange, required = false }) => {
  const [consented, setConsented] = useState(false);

  const handleConsentChange = (checked: boolean) => {
    setConsented(checked);
    onConsentChange(checked);
  };

  return (
    <Card className="p-4 bg-muted/30 border-muted">
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="gdpr-consent"
            checked={consented}
            onCheckedChange={handleConsentChange}
            required={required}
            aria-describedby="gdpr-description"
          />
          <div className="space-y-2">
            <label 
              htmlFor="gdpr-consent" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {required && <span className="text-destructive">* </span>}
              Consenso al trattamento dei dati personali
            </label>
            <p id="gdpr-description" className="text-xs text-muted-foreground leading-relaxed">
              Acconsento al trattamento dei miei dati personali per finalità di contatto e marketing 
              da parte di MUV Fitness, nel rispetto del GDPR (Reg. UE 2016/679). 
              I dati non saranno condivisi con terzi.
            </p>
            <div className="flex items-center space-x-4 text-xs">
              <a 
                href="/privacy" 
                target="_blank"
                className="text-brand-primary hover:underline flex items-center space-x-1"
              >
                <span>Privacy Policy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="/cookie-policy" 
                target="_blank"
                className="text-brand-primary hover:underline flex items-center space-x-1"
              >
                <span>Cookie Policy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
        
        {!consented && required && (
          <p className="text-xs text-destructive mt-2">
            Il consenso è obbligatorio per procedere con l'invio del modulo.
          </p>
        )}
      </div>
    </Card>
  );
};

export default GDPRConsent;