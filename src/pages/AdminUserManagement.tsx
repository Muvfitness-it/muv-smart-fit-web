import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useSecurityAudit } from '@/hooks/useSecurityAudit';
import SimpleProtectedRoute from '@/components/blog/SimpleProtectedRoute';
import { Shield, Users, UserPlus, Eye, AlertTriangle } from 'lucide-react';

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user' | 'editor';
  created_at: string;
  created_by?: string;
  profiles?: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

interface SecurityEvent {
  id: string;
  event_type: string;
  event_data: any;
  user_id?: string;
  ip_address?: string;
  created_at: string;
}

const AdminUserManagement: React.FC = () => {
  const { user } = useAdminAuth();
  const { logRoleChange, logDataAccess } = useSecurityAudit(user);
  const [users, setUsers] = useState<UserRole[]>([]);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'moderator' | 'user' | 'editor'>('user');
  const [showSecurityLog, setShowSecurityLog] = useState(false);

  useEffect(() => {
    if (user) {
      loadUsers();
      loadSecurityEvents();
      logDataAccess('user_management', 'view');
    }
  }, [user]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      
      // First get user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('id, user_id, role, created_at, created_by')
        .order('created_at', { ascending: false });

      if (rolesError) {
        throw rolesError;
      }

      // Then get profile data for each user
      const usersWithProfiles = await Promise.all(
        (userRoles || []).map(async (userRole) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('email, first_name, last_name')
            .eq('user_id', userRole.user_id)
            .single();
          
          return {
            ...userRole,
            profiles: profile || { email: 'Email non disponibile' }
          };
        })
      );

      setUsers(usersWithProfiles);
    } catch (error: any) {
      console.error('Error loading users:', error);
      toast({
        title: "Errore",
        description: "Impossibile caricare la lista utenti",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSecurityEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('security_audit_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) {
        throw error;
      }

      setSecurityEvents(data || []);
    } catch (error: any) {
      console.error('Error loading security events:', error);
    }
  };

  const assignRole = async (userId: string, role: 'admin' | 'moderator' | 'user' | 'editor') => {
    try {
      const { error } = await supabase.rpc('assign_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) {
        throw error;
      }

      logRoleChange(userId, role);
      toast({
        title: "Ruolo Assegnato",
        description: `Ruolo ${role} assegnato con successo`
      });

      loadUsers();
    } catch (error: any) {
      console.error('Error assigning role:', error);
      toast({
        title: "Errore",
        description: error.message || "Impossibile assegnare il ruolo",
        variant: "destructive"
      });
    }
  };

  const revokeRole = async (userId: string, role: 'admin' | 'moderator' | 'user' | 'editor') => {
    try {
      const { error } = await supabase.rpc('revoke_user_role', {
        _user_id: userId,
        _role: role
      });

      if (error) {
        throw error;
      }

      logRoleChange(userId, 'user', role);
      toast({
        title: "Ruolo Revocato",
        description: `Ruolo ${role} revocato con successo`
      });

      loadUsers();
    } catch (error: any) {
      console.error('Error revoking role:', error);
      toast({
        title: "Errore",
        description: error.message || "Impossibile revocare il ruolo",
        variant: "destructive"
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'editor':
        return 'default';
      case 'moderator':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'login_failed':
      case 'suspicious_activity':
        return 'text-red-500';
      case 'role_change':
        return 'text-orange-500';
      case 'login_success':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <SimpleProtectedRoute>
      <Helmet>
        <title>Gestione Utenti - Admin Dashboard</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Gestione Utenti</h1>
                <p className="text-muted-foreground">Gestisci ruoli utenti e monitora la sicurezza</p>
              </div>
            </div>
            <Button
              variant={showSecurityLog ? "outline" : "default"}
              onClick={() => setShowSecurityLog(!showSecurityLog)}
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span>{showSecurityLog ? 'Nascondi Log' : 'Mostra Log Sicurezza'}</span>
            </Button>
          </div>

          {/* Role Assignment Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5" />
                <span>Assegna Ruolo Utente</span>
              </CardTitle>
              <CardDescription>
                Assegna ruoli agli utenti esistenti del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Input
                  placeholder="ID Utente"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="flex-1"
                />
                <Select value={newUserRole} onValueChange={(value: any) => setNewUserRole(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Utente</SelectItem>
                    <SelectItem value="moderator">Moderatore</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Amministratore</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => {
                    if (newUserEmail.trim()) {
                      assignRole(newUserEmail.trim(), newUserRole);
                      setNewUserEmail('');
                    }
                  }}
                  disabled={!newUserEmail.trim()}
                >
                  Assegna Ruolo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Users List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Utenti con Ruoli</span>
              </CardTitle>
              <CardDescription>
                Lista di tutti gli utenti con ruoli assegnati
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : users.length === 0 ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Nessun utente con ruoli assegnati trovato.
                  </AlertDescription>
                </Alert>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utente</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Ruolo</TableHead>
                      <TableHead>Assegnato il</TableHead>
                      <TableHead>Azioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((userRole) => (
                      <TableRow key={userRole.id}>
                        <TableCell>
                          {userRole.profiles?.first_name || userRole.profiles?.last_name
                            ? `${userRole.profiles.first_name || ''} ${userRole.profiles.last_name || ''}`.trim()
                            : 'Nome non disponibile'}
                        </TableCell>
                        <TableCell>{userRole.profiles?.email || 'Email non disponibile'}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(userRole.role)}>
                            {userRole.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(userRole.created_at).toLocaleDateString('it-IT')}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => revokeRole(userRole.user_id, userRole.role)}
                            disabled={userRole.user_id === user?.id && userRole.role === 'admin'}
                          >
                            Revoca
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Security Log */}
          {showSecurityLog && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Log Sicurezza</span>
                </CardTitle>
                <CardDescription>
                  Ultimi eventi di sicurezza del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                {securityEvents.length === 0 ? (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Nessun evento di sicurezza registrato.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo Evento</TableHead>
                        <TableHead>IP</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Dettagli</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {securityEvents.map((event) => (
                        <TableRow key={event.id}>
                          <TableCell>
                            <span className={getEventTypeColor(event.event_type)}>
                              {event.event_type}
                            </span>
                          </TableCell>
                          <TableCell>{event.ip_address || 'N/A'}</TableCell>
                          <TableCell>
                            {new Date(event.created_at).toLocaleString('it-IT')}
                          </TableCell>
                          <TableCell>
                            {event.event_data ? (
                              <code className="text-xs bg-muted p-1 rounded">
                                {JSON.stringify(event.event_data, null, 2)}
                              </code>
                            ) : (
                              'Nessun dettaglio'
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SimpleProtectedRoute>
  );
};

export default AdminUserManagement;