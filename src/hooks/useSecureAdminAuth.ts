import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AdminAuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
}

export const useSecureAdminAuth = () => {
  const [authState, setAuthState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    loading: true
  });

  const checkAdminStatus = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as Error };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
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
        return { error };
      }

      // Note: Admin role assignment removed for security
      // Admin roles must be assigned manually via secure backend process
      
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as Error };
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
      return { error };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error as Error };
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        setAuthState(prev => ({ ...prev, session, user: session?.user ?? null }));
        
        // Check admin status after authentication
        if (session?.user) {
          setTimeout(async () => {
            const isAdmin = await checkAdminStatus(session.user.id);
            setAuthState(prev => ({ ...prev, isAdmin, loading: false }));
          }, 0);
        } else {
          setAuthState(prev => ({ ...prev, isAdmin: false, loading: false }));
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(prev => ({ ...prev, session, user: session?.user ?? null }));
      
      if (session?.user) {
        setTimeout(async () => {
          const isAdmin = await checkAdminStatus(session.user.id);
          setAuthState(prev => ({ ...prev, isAdmin, loading: false }));
        }, 0);
      } else {
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAdminStatus]);

  return {
    user: authState.user,
    session: authState.session,
    isAdmin: authState.isAdmin,
    loading: authState.loading,
    signIn,
    signUp,
    signOut,
    // Removed registerAsAdmin for security
  };
};