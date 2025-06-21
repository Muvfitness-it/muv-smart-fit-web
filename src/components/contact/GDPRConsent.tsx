
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

interface GDPRConsentProps {
  consents: {
    privacy: boolean;
    marketing: boolean;
  };
  onConsentChange: (type: 'privacy' | 'marketing', checked: boolean) => void;
  isSubmitting: boolean;
}

const GDPRConsent = ({ consents, onConsentChange, isSubmitting }: GDPRConsentProps) => {
  return (
    <div className="space-y-4 border-t border-gray-600 pt-6">
      <h3 className="text-lg font-semibold text-white mb-4">Consenso al Trattamento dei Dati</h3>
      
      <div className="flex items-start space-x-3">
        <Checkbox 
          id="privacy-consent"
          checked={consents.privacy}
          onCheckedChange={(checked) => onConsentChange('privacy', checked as boolean)}
          className="mt-1"
          disabled={isSubmitting}
        />
        <label htmlFor="privacy-consent" className="text-sm text-gray-300 leading-relaxed">
          <span className="text-red-400">*</span> Ho letto e accetto l'{" "}
          <Link to="/privacy" className="text-pink-600 hover:text-pink-500 underline">
            informativa sulla privacy
          </Link>{" "}
          e autorizzo il trattamento dei miei dati personali per rispondere alla mia richiesta di contatto.
        </label>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox 
          id="marketing-consent"
          checked={consents.marketing}
          onCheckedChange={(checked) => onConsentChange('marketing', checked as boolean)}
          className="mt-1"
          disabled={isSubmitting}
        />
        <label htmlFor="marketing-consent" className="text-sm text-gray-300 leading-relaxed">
          Acconsento al trattamento dei miei dati personali per l'invio di comunicazioni commerciali, 
          newsletter e promozioni relative ai servizi di MUV Fitness. Questo consenso è facoltativo 
          e può essere revocato in qualsiasi momento.
        </label>
      </div>

      <p className="text-xs text-gray-400 leading-relaxed">
        I tuoi dati saranno trattati in conformità al Regolamento UE 2016/679 (GDPR). 
        Puoi esercitare i tuoi diritti contattandoci all'indirizzo info@muvfitness.it.
      </p>
    </div>
  );
};

export default GDPRConsent;
