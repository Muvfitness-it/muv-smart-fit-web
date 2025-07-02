
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminRoleAssigner = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const assignAdminRole = async () => {
      if (!user || isAdmin) return;

      try {
        // Controlla se esistono già admin
        const { data: existingAdmins, error: adminCheckError } = await supabase
          .from('user_roles')
          .select('id')
          .eq('role', 'admin')
          .limit(1);

        if (adminCheckError) {
          console.error('Error checking existing admins:', adminCheckError);
          return;
        }

        // Se non ci sono admin, assegna il ruolo al primo utente
        if (!existingAdmins || existingAdmins.length === 0) {
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({
              user_id: user.id,
              role: 'admin'
            });

          if (roleError) {
            console.error('Error assigning admin role:', roleError);
            toast({
              title: "Informazione",
              description: "Non è stato possibile assegnare automaticamente il ruolo di admin. Contatta l'amministratore del sistema.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Ruolo Assegnato",
              description: "Ti è stato assegnato il ruolo di amministratore come primo utente del sistema.",
            });
            // Ricarica la pagina per aggiornare lo stato dell'admin
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Error in admin role assignment:', error);
      }
    };

    assignAdminRole();
  }, [user, isAdmin, toast]);

  return null; // Questo componente non renderizza nulla
};

export default AdminRoleAssigner;
