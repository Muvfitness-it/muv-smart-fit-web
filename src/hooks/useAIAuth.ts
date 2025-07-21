
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAIAuth = () => {
  const { toast } = useToast();

  const authenticateAI = async (email: string, password: string, aiKey: string) => {
    try {
      console.log('Attempting AI authentication for:', email);
      
      const { data, error } = await supabase.functions.invoke('ai-auth', {
        body: {
          email,
          password,
          ai_key: aiKey
        }
      });

      if (error) {
        console.error('AI authentication error:', error);
        toast({
          title: "Errore di autenticazione IA",
          description: error.message || "Errore durante l'autenticazione",
          variant: "destructive"
        });
        return { error, data: null };
      }

      if (data?.error) {
        console.error('AI authentication failed:', data.error);
        toast({
          title: "Accesso negato",
          description: data.error,
          variant: "destructive"
        });
        return { error: data.error, data: null };
      }

      console.log('AI authentication successful:', data);
      toast({
        title: "Autenticazione IA completata",
        description: `Accesso autorizzato per ${data.user.email}`,
      });

      return { error: null, data };
    } catch (error: any) {
      console.error('AI authentication exception:', error);
      toast({
        title: "Errore",
        description: "Errore durante l'autenticazione IA",
        variant: "destructive"
      });
      return { error: error.message, data: null };
    }
  };

  const verifyAIToken = async (aiToken: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-ai-token', {
        body: { ai_token: aiToken }
      });

      if (error || data?.error) {
        return { valid: false, user: null };
      }

      return { valid: data.valid, user: data.user };
    } catch (error) {
      console.error('AI token verification error:', error);
      return { valid: false, user: null };
    }
  };

  return {
    authenticateAI,
    verifyAIToken
  };
};
