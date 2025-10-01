import { useState, FormEvent, ChangeEvent } from 'react';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  nome: string;
  email: string;
  telefono: string;
}

export const useContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefono: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() || !formData.telefono.trim()) {
      toast({
        title: "Errore",
        description: "Per favore compila tutti i campi",
        variant: "destructive"
      });
      return;
    }

    try {
      // TODO: Implement actual form submission logic
      setIsSubmitted(true);
      toast({
        title: "Messaggio inviato!",
        description: "Ti contatteremo presto per fissare la tua visita gratuita.",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({ nome: '', email: '', telefono: '' });
    setIsSubmitted(false);
  };

  return {
    formData,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm
  };
};
