
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSecurityAudit } from '@/hooks/useSecurityAudit';

interface AuthContext {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isEditor: boolean;
  canManageBlog: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [canManageBlog, setCanManageBlog] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { logLoginAttempt } = useSecurityAudit();

  const checkUserRoles = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId);

      if (error) {
        console.error('Error checking user roles:', error);
        return { isAdmin: false, isEditor: false, canManageBlog: false };
      }

      const roles = data?.map(r => r.role) || [];
      const isAdmin = roles.includes('admin');
      const isEditor = roles.includes('editor');
      const canManageBlog = isAdmin || isEditor;

      return { isAdmin, isEditor, canManageBlog };
    } catch (error) {
      console.error('Error checking user roles:', error);
      return { isAdmin: false, isEditor: false, canManageBlog: false };
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check user roles when user is authenticated
          setTimeout(async () => {
            const roles = await checkUserRoles(session.user.id);
            setIsAdmin(roles.isAdmin);
            setIsEditor(roles.isEditor);
            setCanManageBlog(roles.canManageBlog);
          }, 0);
        } else {
          setIsAdmin(false);
          setIsEditor(false);
          setCanManageBlog(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        setTimeout(async () => {
          const roles = await checkUserRoles(session.user.id);
          setIsAdmin(roles.isAdmin);
          setIsEditor(roles.isEditor);
          setCanManageBlog(roles.canManageBlog);
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Log the login attempt
      await logLoginAttempt(!error, email);

      if (error) {
        toast({
          title: "Errore di accesso",
          description: error.message,
          variant: "destructive"
        });
      }

      return { error };
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
      
      const { error } = await supabase.auth.signUp({
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
      } else {
        toast({
          title: "Registrazione completata!",
          description: "Controlla la tua email per confermare l'account",
        });
      }

      return { error };
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
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logout effettuato",
        description: "Sei stato disconnesso con successo",
      });
    } catch (error: any) {
      toast({
        title: "Errore",
        description: "Errore durante il logout",
        variant: "destructive"
      });
    }
  };

  const value = {
    user,
    session,
    isAdmin,
    isEditor,
    canManageBlog,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
