
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  created_at: string;
  email_confirmed_at?: string;
  last_sign_in_at?: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'editor' | 'user';
  created_at: string;
}

interface UserWithRoles extends User {
  roles: UserRole[];
}

export const useUserManagement = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Call the edge function to get users
      const { data, error } = await supabase.functions.invoke('get-users');
      
      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Errore",
          description: "Impossibile caricare gli utenti",
          variant: "destructive"
        });
        return;
      }

      setUsers(data.users);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast({
        title: "Errore",
        description: "Errore durante il caricamento degli utenti",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async (userId: string, role: 'admin' | 'editor' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role });

      if (error) {
        throw error;
      }

      toast({
        title: "Successo",
        description: `Ruolo ${role} assegnato con successo`,
      });

      // Refresh the users list
      fetchUsers();
    } catch (error: any) {
      console.error('Error assigning role:', error);
      toast({
        title: "Errore",
        description: error.message || "Errore durante l'assegnazione del ruolo",
        variant: "destructive"
      });
    }
  };

  const removeRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', roleId);

      if (error) {
        throw error;
      }

      toast({
        title: "Successo",
        description: "Ruolo rimosso con successo",
      });

      // Refresh the users list
      fetchUsers();
    } catch (error: any) {
      console.error('Error removing role:', error);
      toast({
        title: "Errore",
        description: error.message || "Errore durante la rimozione del ruolo",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    assignRole,
    removeRole,
    refetch: fetchUsers
  };
};
