import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSecurityAudit } from './useSecurityAudit';
import type { User, Session } from '@supabase/supabase-js';

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
}

export const useAdminAuth = () => {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    loading: true
  });
  const { toast } = useToast();
  const { logLoginAttempt, logRoleChange } = useSecurityAudit(state.user);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();

      return !error && data;
    } catch {
      return false;
    }
  };

  // SECURITY FIX: Remove client-side admin bootstrap vulnerability
  const registerAsAdmin = async (userId: string, email: string) => {
    toast({
      title: "Accesso Negato",
      description: "La registrazione di amministratori è disabilitata per motivi di sicurezza. Contattare l'amministratore di sistema.",
      variant: "destructive"
    });
    return false;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        logLoginAttempt(false, email);
        toast({
          title: "Errore di accesso",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      logLoginAttempt(true, email);
      return { data };
    } catch (error: any) {
      logLoginAttempt(false, email);
      toast({
        title: "Errore",
        description: "Errore durante l'accesso",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        toast({
          title: "Errore di registrazione",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      // SECURITY: Removed automatic admin registration
      // Admin privileges must be granted through secure server-side processes
      console.log('User registered successfully. Admin access requires manual approval.');

      toast({
        title: "Registrazione completata",
        description: "Account creato con successo!"
      });

      return { data };
    } catch (error: any) {
      toast({
        title: "Errore",
        description: "Errore durante la registrazione",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      session: null,
      isAdmin: false,
      loading: false
    });
  };

  useEffect(() => {
    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prev => ({ ...prev, session, user: session?.user ?? null }));
        
        if (session?.user) {
          // Check admin status asynchronously
          setTimeout(async () => {
            const isAdmin = await checkAdminStatus(session.user.id);
            setState(prev => ({ ...prev, isAdmin: !!isAdmin, loading: false }));
          }, 0);
        } else {
          setState(prev => ({ ...prev, isAdmin: false, loading: false }));
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({ ...prev, session, user: session?.user ?? null }));
      
      if (session?.user) {
        checkAdminStatus(session.user.id).then(isAdmin => {
          setState(prev => ({ ...prev, isAdmin: !!isAdmin, loading: false }));
        });
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    registerAsAdmin
  };
};