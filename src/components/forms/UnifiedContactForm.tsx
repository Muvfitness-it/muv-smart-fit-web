/**
 * Unified Contact Form Component
 * Single, reusable contact form that replaces all duplicates
 */

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUnifiedContactForm } from '@/hooks/useUnifiedContactForm';
import GDPRConsent from '@/components/security/GDPRConsent';
import { CheckCircle } from 'lucide-react';

interface UnifiedContactFormProps {
  title?: string;
  subtitle?: string;
  campaign?: string;
  source?: string;
  defaultObjective?: string;
  onSuccess?: () => void;
  className?: string;
  showMessage?: boolean;
  showObjective?: boolean;
  enableAIData?: boolean;
}

export const UnifiedContactForm: React.FC<UnifiedContactFormProps> = ({
  title = "Contattaci",
  subtitle = "Compila il modulo per essere ricontattato",
  campaign = "Website Contact",
  source = "website",
  defaultObjective = "",
  onSuccess,
  className = "",
  showMessage = true,
  showObjective = true,
  enableAIData = false
}) => {
  const {
    formData,
    isSubmitting,
    isSubmitted,
    errors,
    handleChange,
    handleConsentChange,
    handleBlur,
    handleSubmit
  } = useUnifiedContactForm({
    campaign,
    source,
    defaultObjective,
    onSuccess,
    enableAIData
  });

  if (isSubmitted) {
    return (
      <Card className={`glass-card ${className}`}>
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h3 className="text-heading-md mb-2">Grazie!</h3>
          <p className="text-body-lg">
            Il nostro staff ti contatterà al più presto.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`glass-card ${className}`}>
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-heading-md mb-2">{title}</h2>
          <p className="text-body-md">{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Honeypot field */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ 
              position: 'absolute', 
              left: '-9999px',
              opacity: 0,
              pointerEvents: 'none'
            }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="name" className="text-label block mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Mario Rossi"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.name 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-input focus:border-primary'
              }`}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="text-label block mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="mario.rossi@email.com"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.email 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-input focus:border-primary'
              }`}
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="text-label block mb-2">
              Telefono *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+39 123 456 7890"
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.phone 
                  ? 'border-destructive focus:border-destructive' 
                  : 'border-input focus:border-primary'
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          {showObjective && (
            <div>
              <label htmlFor="obiettivo" className="text-label block mb-2">
                Il tuo obiettivo <span className="text-muted-foreground">(opzionale)</span>
              </label>
              <select
                id="obiettivo"
                name="obiettivo"
                value={formData.obiettivo}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-input focus:border-primary transition-colors"
              >
                <option value="">Seleziona il tuo obiettivo</option>
                <option value="Dimagrimento">Dimagrimento</option>
                <option value="Tonificazione">Tonificazione</option>
                <option value="Pilates">Pilates</option>
                <option value="Mal di schiena">Mal di schiena</option>
                <option value="Aumento massa muscolare">Aumento massa muscolare</option>
                <option value="Benessere generale">Benessere generale</option>
                <option value="Fitness per gravidanza/post-parto">Fitness per gravidanza/post-parto</option>
                <option value="Fitness over 65">Fitness over 65</option>
                <option value="Riabilitazione">Riabilitazione</option>
                <option value="Cellulite e ritenzione">Cellulite e ritenzione</option>
                <option value="Preparazione atletica">Preparazione atletica</option>
              </select>
            </div>
          )}

          {showMessage && (
            <div>
              <label htmlFor="message" className="text-label block mb-2">
                Messaggio <span className="text-muted-foreground">(opzionale)</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Raccontaci i tuoi obiettivi..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border-2 border-input focus:border-primary transition-colors resize-vertical"
              />
            </div>
          )}

          <GDPRConsent 
            onConsentChange={handleConsentChange}
            required={true}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-accent w-full text-lg py-4"
          >
            {isSubmitting ? 'INVIO IN CORSO...' : 'INVIA RICHIESTA'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
