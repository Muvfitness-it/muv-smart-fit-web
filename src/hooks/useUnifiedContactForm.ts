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
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,15}$/;
        if (!value || (typeof value === 'string' && !phoneRegex.test(value))) {
          return 'Numero di telefono non valido';
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

    // Bot detection
    if (formData.honeypot) {
      return;
    }

    // Validate all fields
    const validation = ContactService.validate(formData);
    if (!validation.isValid) {
      toast({
        title: "Errore",
        description: validation.errors[0],
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await ContactService.submit(formData);

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Successo!",
          description: result.message || "Richiesta inviata con successo",
        });
        options.onSuccess?.();
      } else {
        throw new Error(result.error || 'Errore durante l\'invio');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Errore",
        description: "Errore nell'invio. Riprova o contattaci direttamente.",
        variant: "destructive"
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
