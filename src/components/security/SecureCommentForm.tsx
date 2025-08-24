import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useInputValidation } from '@/hooks/useInputValidation';

interface SecureCommentFormProps {
  postId: string;
  onCommentSubmitted?: () => void;
}

interface SimpleCaptcha {
  question: string;
  answer: number;
}

interface CommentSubmissionResult {
  success: boolean;
  error?: string;
  message?: string;
  comment_id?: string;
}

const generateCaptcha = (): SimpleCaptcha => {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ['+', '-'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let answer: number;
  let question: string;
  
  if (operation === '+') {
    answer = num1 + num2;
    question = `Quanto fa ${num1} + ${num2}?`;
  } else {
    // Ensure positive result for subtraction
    const larger = Math.max(num1, num2);
    const smaller = Math.min(num1, num2);
    answer = larger - smaller;
    question = `Quanto fa ${larger} - ${smaller}?`;
  }
  
  return { question, answer };
};

export const SecureCommentForm: React.FC<SecureCommentFormProps> = ({
  postId,
  onCommentSubmitted
}) => {
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: ''
  });
  const [captcha, setCaptcha] = useState<SimpleCaptcha>(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [lastSubmission, setLastSubmission] = useState(0);
  const { validators, sanitizeHtml } = useInputValidation();

  // Rate limiting: max 2 comments per hour
  const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
  const MAX_SUBMISSIONS = 2;

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Apply length limits
    let sanitizedValue = value;
    if (name === 'author_name') {
      sanitizedValue = value.slice(0, 50);
    } else if (name === 'author_email') {
      sanitizedValue = value.slice(0, 254);
    } else if (name === 'content') {
      sanitizedValue = value.slice(0, 2000);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }));
  };

  const validateForm = (): boolean => {
    // Check required fields
    if (!formData.author_name.trim() || !formData.author_email.trim() || !formData.content.trim()) {
      toast({
        title: "Errore",
        description: "Tutti i campi sono obbligatori.",
        variant: "destructive"
      });
      return false;
    }

    // Validate name
    if (!validators.name(formData.author_name)) {
      toast({
        title: "Errore",
        description: "Il nome contiene caratteri non validi.",
        variant: "destructive"
      });
      return false;
    }

    // Validate email
    if (!validators.email(formData.author_email)) {
      toast({
        title: "Errore",
        description: "Inserisci un indirizzo email valido.",
        variant: "destructive"
      });
      return false;
    }

    // Validate content length
    if (formData.content.trim().length < 10) {
      toast({
        title: "Errore",
        description: "Il commento deve essere di almeno 10 caratteri.",
        variant: "destructive"
      });
      return false;
    }

    // Validate CAPTCHA
    const userAnswer = parseInt(captchaInput);
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      toast({
        title: "Errore",
        description: "Risposta CAPTCHA non corretta. Riprova.",
        variant: "destructive"
      });
      refreshCaptcha();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const now = Date.now();
    if (lastSubmission && (now - lastSubmission < RATE_LIMIT_WINDOW) && submissionCount >= MAX_SUBMISSIONS) {
      toast({
        title: "Troppi commenti",
        description: "Hai raggiunto il limite di commenti per ora. Riprova più tardi.",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Reset submission count if outside time window
    if (!lastSubmission || (now - lastSubmission >= RATE_LIMIT_WINDOW)) {
      setSubmissionCount(0);
    }

    setIsSubmitting(true);

    try {
      // Use the secure database function instead of direct insert
      const { data, error } = await supabase.rpc('submit_blog_comment', {
        p_post_id: postId,
        p_author_name: formData.author_name.trim(),
        p_author_email: formData.author_email.toLowerCase().trim(),
        p_content: formData.content.trim()
      }) as { data: CommentSubmissionResult | null, error: any };

      if (error) {
        console.error('Error submitting comment:', error);
        toast({
          title: "Errore",
          description: "Impossibile inviare il commento. Riprova più tardi.",
          variant: "destructive"
        });
        return;
      }

      // Check if the function returned an error
      if (data && !data.success) {
        toast({
          title: "Errore",
          description: data.error || "Impossibile inviare il commento.",
          variant: "destructive"
        });
        
        // Refresh captcha on security-related errors
        if (data.error?.includes('Limite') || data.error?.includes('non consentito')) {
          refreshCaptcha();
        }
        return;
      }

      // Track successful submission
      setSubmissionCount(prev => prev + 1);
      setLastSubmission(now);

      toast({
        title: "Commento inviato!",
        description: "Il tuo commento è stato inviato e verrà pubblicato dopo la moderazione.",
      });

      // Reset form
      setFormData({ author_name: '', author_email: '', content: '' });
      setCaptchaInput('');
      refreshCaptcha();
      
      // Notify parent component
      onCommentSubmitted?.();

    } catch (error: any) {
      console.error('Unexpected error submitting comment:', error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore inaspettato. Riprova.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Lascia un commento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="author_name" className="block text-sm font-medium mb-2">
                Nome *
              </label>
              <Input
                id="author_name"
                name="author_name"
                type="text"
                value={formData.author_name}
                onChange={handleInputChange}
                placeholder="Il tuo nome"
                disabled={isSubmitting}
                required
                maxLength={50}
              />
            </div>
            
            <div>
              <label htmlFor="author_email" className="block text-sm font-medium mb-2">
                Email * (non verrà pubblicata)
              </label>
              <Input
                id="author_email"
                name="author_email"
                type="email"
                value={formData.author_email}
                onChange={handleInputChange}
                placeholder="La tua email"
                disabled={isSubmitting}
                required
                maxLength={254}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-2">
              Commento *
            </label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Scrivi il tuo commento... (minimo 10 caratteri)"
              disabled={isSubmitting}
              required
              minLength={10}
              maxLength={2000}
              className="min-h-24"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.content.length}/2000 caratteri
            </p>
          </div>
          
          <div>
            <label htmlFor="captcha" className="block text-sm font-medium mb-2">
              Verifica di sicurezza *
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm">{captcha.question}</span>
              <Input
                id="captcha"
                type="number"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="Risposta"
                disabled={isSubmitting}
                required
                className="w-20"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={refreshCaptcha}
                disabled={isSubmitting}
              >
                Nuova domanda
              </Button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Invio in corso...' : 'Invia Commento'}
          </Button>
          
          <p className="text-xs text-muted-foreground">
            I commenti sono moderati e potrebbero richiedere del tempo prima di essere pubblicati.
            Non condividere informazioni personali sensibili.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};