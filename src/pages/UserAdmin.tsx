
import React from 'react';
import { Helmet } from 'react-helmet';
import UserManagement from '@/components/admin/UserManagement';
import ProtectedRoute from '@/components/blog/ProtectedRoute';
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
  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background pt-[var(--header-height)] py-8">
        <Helmet>
          <title>Gestione Utenti - Admin | MUV Fitness</title>
          <meta name="description" content="Pannello di amministrazione per la gestione degli utenti e dei ruoli" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
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

          <UserManagement />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserAdmin;
