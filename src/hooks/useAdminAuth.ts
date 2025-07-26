import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
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

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id')
        .eq('user_id', userId)
        .single();

      return !error && data;
    } catch {
      return false;
    }
  };

  const registerAsAdmin = async (userId: string, email: string) => {
    try {
      // Controlla se è il primo admin
      const { data: existingAdmins } = await supabase
        .from('admin_users')
        .select('id')
        .limit(1);

      const isFirstAdmin = !existingAdmins || existingAdmins.length === 0;

      const { error } = await supabase
        .from('admin_users')
        .insert({
          user_id: userId,
          email: email,
          is_first_admin: isFirstAdmin
        });

      if (!error) {
        setState(prev => ({ ...prev, isAdmin: true }));
        toast({
          title: "Amministratore registrato",
          description: isFirstAdmin 
            ? "Sei il primo amministratore del sistema!"
            : "Richiesta di amministratore inviata",
        });
        return true;
      }
    } catch (error) {
      console.error('Error registering as admin:', error);
    }
    return false;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Errore di accesso",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      return { data };
    } catch (error: any) {
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

      // Se la registrazione è riuscita, prova a registrare come admin
      if (data.user) {
        await registerAsAdmin(data.user.id, email);
      }

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