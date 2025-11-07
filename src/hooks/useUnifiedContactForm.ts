/**
 * Unified Contact Form Hook
 * Single hook for all contact form variations
 */

import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ContactService, type ContactFormData } from '@/services/contact.service';

interface UseContactFormOptions {
  campaign?: string;
  source?: string;
  defaultObjective?: string;
  onSuccess?: () => void;
  enableAIData?: boolean;
}

export const useUnifiedContactForm = (options: UseContactFormOptions = {}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    obiettivo: options.defaultObjective || '',
    honeypot: '',
    gdprConsent: false,
    campaign: options.campaign,
    source: options.source
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load AI assistant data if enabled
  useEffect(() => {
    if (!options.enableAIData) return;

    const aiData = localStorage.getItem('muvAssistantData');
    if (aiData) {
      try {
        const parsedData = JSON.parse(aiData);
        setFormData(prev => ({
          ...prev,
          name: parsedData.name || prev.name,
          message: parsedData.problem 
            ? `🤖 Dall'Assistente AI:\nProblema: ${parsedData.problem}\n${parsedData.service ? `Servizio suggerito: ${parsedData.service}\n` : ''}\n${parsedData.notes ? `Note:\n${parsedData.notes}\n\n` : ''}---\nMessaggio:\n${prev.message}`
            : prev.message,
          obiettivo: parsedData.service || prev.obiettivo
        }));
        
        toast({
          title: "Dati caricati",
          description: "Informazioni dalla chat AI caricate nel form",
        });
        
        localStorage.removeItem('muvAssistantData');
      } catch (error) {
        console.error('Error loading AI data:', error);
      }
    }
  }, [options.enableAIData, toast]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleConsentChange = (consented: boolean) => {
    setFormData(prev => ({ ...prev, gdprConsent: consented }));
    if (errors.gdprConsent) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.gdprConsent;
        return newErrors;
      });
    }
  };

  const validateField = (name: string, value: string | boolean): string | null => {
    switch (name) {
      case 'name':
        if (!value || (typeof value === 'string' && value.trim().length < 2)) {
          return 'Nome deve contenere almeno 2 caratteri';
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value || (typeof value === 'string' && !emailRegex.test(value))) {
          return 'Email non valida';
        }
        break;
      case 'phone':
        // Normalize phone: extract only digits
        const digits = typeof value === 'string' ? value.replace(/\D/g, '') : '';
        if (digits.length < 8 || digits.length > 16) {
          return 'Inserisci un numero di telefono valido';
        }
        break;
      case 'gdprConsent':
        if (!value) {
          return 'Devi accettare il trattamento dei dati';
        }
        break;
    }
    return null;
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔍 LOG FASE 1: Dati form all'invio
    console.group('📝 FORM SUBMIT - Phase 1: Initial Data');
    console.log('FormData completo:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      obiettivo: formData.obiettivo,
      gdprConsent: formData.gdprConsent,
      gdprConsentType: typeof formData.gdprConsent,
      honeypot: formData.honeypot,
      campaign: formData.campaign,
      source: formData.source
    });
    console.groupEnd();

    // Bot detection
    if (formData.honeypot) {
      console.warn('🤖 BOT DETECTED - Honeypot filled:', formData.honeypot);
      return;
    }

    // 🔍 LOG FASE 2: Validazione
    console.group('🔍 FORM SUBMIT - Phase 2: Validation');
    const validation = ContactService.validate(formData);
    console.log('Validation Result:', {
      isValid: validation.isValid,
      errors: validation.errors,
      errorCount: validation.errors.length
    });
    console.groupEnd();

    if (!validation.isValid) {
      console.error('❌ VALIDATION FAILED:', validation.errors);
      const fieldErrors: Record<string, string> = {};
      validation.errors.forEach(errorMsg => {
        if (errorMsg.toLowerCase().includes('nome')) fieldErrors.name = errorMsg;
        else if (errorMsg.toLowerCase().includes('email')) fieldErrors.email = errorMsg;
        else if (errorMsg.toLowerCase().includes('telefono')) fieldErrors.phone = errorMsg;
        else if (errorMsg.toLowerCase().includes('gdpr') || errorMsg.toLowerCase().includes('dati')) {
          fieldErrors.gdprConsent = errorMsg;
        }
      });
      setErrors(fieldErrors);
      
      toast({
        title: "Errore di Validazione",
        description: validation.errors[0],
        variant: "destructive",
        duration: 5000
      });
      return;
    }

    setIsSubmitting(true);

    console.group('📤 FORM SUBMIT - Phase 3: Sending to Edge Function');
    console.log('Calling ContactService.submit with:', {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      hasMessage: !!formData.message,
      hasObiettivo: !!formData.obiettivo,
      campaign: formData.campaign,
      source: formData.source,
      timestamp: new Date().toISOString()
    });

    try {
      const result = await ContactService.submit(formData);
      
      console.log('✅ SUBMIT SUCCESS:', result);
      console.groupEnd();

      if (result.success) {
        setIsSubmitted(true);
        
        // GA4 Tracking - Lead Generation
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'generate_lead', {
            event_category: 'Contact_Form',
            event_label: formData.obiettivo || 'General_Contact',
            campaign: options.campaign || 'organic',
            source: options.source || 'website',
            value: 1
          });
          
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-10873340722/CONVERSION_LABEL',
            value: 1.0,
            currency: 'EUR'
          });
        }
        
        toast({
          title: "Successo!",
          description: result.message || "Richiesta inviata con successo",
        });
        
        options.onSuccess?.();
        
        // Redirect to thank you page after 1.5 seconds
        setTimeout(() => {
          window.location.href = '/grazie';
        }, 1500);
      } else {
        throw new Error(result.error || 'Errore durante l\'invio');
      }
    } catch (error: any) {
      console.group('❌ FORM SUBMIT - Phase 4: ERROR');
      console.error('Error Details:', {
        message: error.message,
        name: error.name,
        stack: error.stack,
        fullError: error
      });
      console.groupEnd();
      
      setErrors({ submit: error.message || 'Errore durante l\'invio' });
      toast({
        title: "Errore Invio",
        description: error.message || "Errore nell'invio. Riprova o contattaci su WhatsApp.",
        variant: "destructive",
        duration: 7000
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      obiettivo: options.defaultObjective || '',
      honeypot: '',
      gdprConsent: false,
      campaign: options.campaign,
      source: options.source
    });
    setIsSubmitted(false);
    setErrors({});
  };

  return {
    formData,
    isSubmitting,
    isSubmitted,
    errors,
    handleChange,
    handleConsentChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
};
