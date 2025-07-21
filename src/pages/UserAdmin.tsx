
import React from 'react';
import { Helmet } from 'react-helmet';
import UserManagement from '@/components/admin/UserManagement';
import ProtectedRoute from '@/components/blog/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';

const UserAdmin = () => {
  const { user, signOut } = useAuth();
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background pt-[var(--header-height)] py-8">
        <Helmet>
          <title>Gestione Utenti - Admin | MUV Fitness</title>
          <meta name="description" content="Pannello di amministrazione per la gestione degli utenti e dei ruoli" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="container mx-auto px-4">
          {/* Header with logout */}
          <div className="flex justify-between items-center mb-6">
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/blog/admin">Blog Admin</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Gestione Utenti</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* User info and logout */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={signOut}
                className="text-destructive hover:text-destructive"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>

          <UserManagement />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserAdmin;
