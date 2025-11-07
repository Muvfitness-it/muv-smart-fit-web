/**
 * Contact Service Layer
 * Unified service for handling all contact form submissions
 */

import { sendContactViaWeb3Forms, type ContactFormPayload } from '@/utils/mailAdapter';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  obiettivo?: string;
  honeypot?: string;
  gdprConsent: boolean;
  campaign?: string;
  source?: string;
}

export interface ContactServiceResult {
  success: boolean;
  message?: string;
  error?: string;
}

export class ContactService {
  /**
   * Validate contact form data
   */
  static validate(data: ContactFormData): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Nome deve contenere almeno 2 caratteri');
    }
    if (data.name && data.name.trim().length > 100) {
      errors.push('Nome deve essere inferiore a 100 caratteri');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.push('Inserisci un indirizzo email valido');
    }

    // Phone validation - accetta formati italiani standard
    const phone = data.phone?.trim() || '';
    if (phone) {
      const digits = phone.replace(/\D/g, '');
      // Accetta: 329XXXXXXX (9 cifre), +39329XXXXXXX (11 cifre), 00393XXXXXXXX
      if (digits.length < 9 || digits.length > 16) {
        errors.push('Inserisci un numero di telefono valido (es: 329 107 0374)');
      }
      
      // Verifica che inizi con prefisso italiano valido
      const startsWithValid = /^(00393|393|\+393|3|00390|390|\+390|0)/.test(digits);
      if (!startsWithValid) {
        errors.push('Inserisci un numero italiano valido');
      }
    } else {
      errors.push('Il numero di telefono è obbligatorio');
    }

    // GDPR consent validation
    if (!data.gdprConsent) {
      errors.push('Devi accettare il trattamento dei dati per procedere');
    }

    // Bot detection
    if (data.honeypot && data.honeypot.length > 0) {
      errors.push('Bot detected');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Submit contact form
   */
  static async submit(data: ContactFormData): Promise<ContactServiceResult> {
    try {
      // Validate first
      const validation = this.validate(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors[0]
        };
      }

      // Prepare message
      const message = data.message && data.message.trim().length >= 10
        ? data.message
        : `Richiesta contatto dal sito.\nNome: ${data.name}\nTelefono: ${data.phone}\nObiettivo: ${data.obiettivo || 'Non specificato'}`;

      // Prepare payload
      const payload: ContactFormPayload = {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        message,
        obiettivo: data.obiettivo || '',
        subject: `Nuova richiesta - ${data.name}`,
        campaign: data.campaign || 'Website Contact',
        source: data.source || 'website',
        botcheck: data.honeypot || ''
      };

      // Submit via mail adapter
      const result = await sendContactViaWeb3Forms(payload);

      if (result.success) {
        return {
          success: true,
          message: 'Richiesta inviata con successo! Ti contatteremo presto.'
        };
      } else {
        throw new Error(result.message || 'Errore durante l\'invio');
      }
    } catch (error) {
      console.error('Contact service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore nell\'invio del modulo'
      };
    }
  }

  /**
   * Submit lead magnet request
   */
  static async submitLeadMagnet(data: ContactFormData): Promise<ContactServiceResult> {
    try {
      const validation = this.validate(data);
      if (!validation.isValid) {
        return {
          success: false,
          error: validation.errors[0]
        };
      }

      const payload: ContactFormPayload = {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        phone: data.phone.trim(),
        message: 'Richiesta guida gratuita EMS per dimagrimento',
        subject: `Richiesta Lead Magnet - ${data.name}`,
        campaign: 'Lead Magnet - Guida EMS',
        source: 'lead-magnet-form',
        botcheck: data.honeypot || ''
      };

      const result = await sendContactViaWeb3Forms(payload);

      if (result.success) {
        return {
          success: true,
          message: 'Grazie! Scarica la tua guida gratuita.'
        };
      } else {
        throw new Error(result.message || 'Errore durante l\'invio');
      }
    } catch (error) {
      console.error('Lead magnet service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Errore nell\'invio della richiesta'
      };
    }
  }
}
