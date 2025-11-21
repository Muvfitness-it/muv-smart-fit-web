/**
 * Unified Contact Form Component
 * Single, reusable contact form that replaces all duplicates
 */

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useUnifiedContactForm } from '@/hooks/useUnifiedContactForm';
import GDPRConsent from '@/components/security/GDPRConsent';
import { CheckCircle, AlertCircle, MessageSquare, Mail } from 'lucide-react';

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

  // Estrai errore di submit per mostrarlo
  const submissionError = errors.submit;

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

        {/* Error Banner con Contatti Alternativi */}
        {submissionError && !isSubmitted && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Errore durante l'invio</AlertTitle>
            <AlertDescription>
              <p className="mb-2">{submissionError}</p>
              <p className="text-sm mb-3">
                Se il problema persiste, contattaci direttamente:
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://wa.me/393291070374"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm underline font-medium hover:no-underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp: 329 107 0374
                </a>
                <span className="text-muted-foreground">|</span>
                <a 
                  href="mailto:info@muvfitness.it"
                  className="inline-flex items-center gap-2 text-sm underline font-medium hover:no-underline"
                >
                  <Mail className="w-4 h-4" />
                  Email: info@muvfitness.it
                </a>
              </div>
            </AlertDescription>
          </Alert>
        )}

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
              className={`w-full px-4 py-4 text-lg rounded-lg border-2 transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 min-h-[44px] text-foreground ${
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
              className={`w-full px-4 py-4 text-lg rounded-lg border-2 transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 min-h-[44px] text-foreground ${
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
              className={`w-full px-4 py-4 text-lg rounded-lg border-2 transition-colors focus:outline-none focus:ring-4 focus:ring-primary/20 min-h-[44px] text-foreground ${
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
                className="w-full px-4 py-3 rounded-lg border-2 border-input focus:border-primary transition-colors text-foreground"
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
                className="w-full px-4 py-3 rounded-lg border-2 border-input focus:border-primary transition-colors resize-vertical text-foreground"
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

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Oppure contattaci direttamente
            </span>
          </div>
        </div>

        {/* Contatti Diretti - Sempre Visibili */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <a
            href="https://wa.me/393291070374"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-colors group"
          >
            <MessageSquare className="w-6 h-6 text-green-600 group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-semibold text-sm">WhatsApp</p>
              <p className="text-xs text-muted-foreground">329 107 0374</p>
            </div>
          </a>
          
          <a
            href="mailto:info@muvfitness.it"
            className="flex items-center gap-3 p-4 border border-primary/30 rounded-lg hover:bg-primary/10 transition-colors group"
          >
            <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <div>
              <p className="font-semibold text-sm">Email</p>
              <p className="text-xs text-muted-foreground">info@muvfitness.it</p>
            </div>
          </a>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          📍 <strong>Sede:</strong> Piazzetta Don Walter Soave, 2 - 37045 Legnago (VR)
        </p>
      </CardContent>
    </Card>
  );
};
