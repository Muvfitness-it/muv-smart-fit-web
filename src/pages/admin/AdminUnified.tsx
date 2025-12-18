import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AdminUnifiedSidebar } from '@/components/admin/AdminUnifiedSidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

// Lazy load admin sections
import { lazy, Suspense } from 'react';

const AdminBlogList = lazy(() => import('./AdminBlogList'));
const AdminBlogDrafts = lazy(() => import('./AdminBlogDrafts'));
const AdminBlogCreateAI = lazy(() => import('./AdminBlogCreateAI'));
const AdminBlogCreateManual = lazy(() => import('./AdminBlogCreateManual'));
const AdminCategories = lazy(() => import('./AdminCategories'));
const AdminSmallGroupSchedule = lazy(() => import('./AdminSmallGroupSchedule'));
const SEOMonitorDashboard = lazy(() => import('./SEOMonitorDashboard'));
const LocalSEODashboard = lazy(() => import('./LocalSEODashboard'));
const ContentManagement = lazy(() => import('./ContentManagement'));
const AdminUserManagement = lazy(() => import('../AdminUserManagement'));

const SectionLoading = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const AdminUnified = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const section = searchParams.get('section') || 'blog';
  const { signOut, user } = useAdminAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const renderSection = () => {
    switch (section) {
      case 'blog':
        return <AdminBlogList />;
      case 'bozze':
        return <AdminBlogDrafts />;
      case 'crea-ai':
        return <AdminBlogCreateAI />;
      case 'crea-manuale':
        return <AdminBlogCreateManual />;
      case 'categorie':
        return <AdminCategories />;
      case 'seo-monitor':
        return <SEOMonitorDashboard />;
      case 'local-seo':
        return <LocalSEODashboard />;
      case 'contenuti':
        return <ContentManagement />;
      case 'utenti':
        return <AdminUserManagement />;
      case 'small-group':
        return <AdminSmallGroupSchedule />;
      default:
        return <AdminBlogList />;
    }
  };

  const getSectionTitle = () => {
    const titles: Record<string, string> = {
      'blog': 'Gestione Articoli',
      'bozze': 'Bozze',
      'crea-ai': 'Crea Articolo con AI',
      'crea-manuale': 'Crea Articolo Manualmente',
      'categorie': 'Categorie Blog',
      'seo-monitor': 'Monitor SEO',
      'local-seo': 'SEO Locale',
      'contenuti': 'Gestione Contenuti',
      'utenti': 'Gestione Utenti',
      'small-group': 'Orari Small Group',
    };
    return titles[section] || 'Admin';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Helmet>
          <title>{getSectionTitle()} - Admin MUV Fitness</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <AdminUnifiedSidebar currentSection={section} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
            <div>
              <h1 className="text-lg font-semibold text-foreground">{getSectionTitle()}</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6">
            <Suspense fallback={<SectionLoading />}>
              {renderSection()}
            </Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminUnified;
