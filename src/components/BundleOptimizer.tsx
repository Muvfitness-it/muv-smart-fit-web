import { lazy, Suspense } from 'react';

// Lazy load heavy components
export const LazyAdminDashboard = lazy(() => import('../pages/AdminDashboard'));
export const LazyAnalytics = lazy(() => import('../pages/Analytics'));


// Loading fallback component
export const LoadingSkeleton = () => (
  <div className="min-h-screen bg-background animate-pulse">
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded w-1/3"></div>
        <div className="h-4 bg-muted rounded w-2/3"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Wrapper for lazy loaded components
export const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSkeleton />}>
    {children}
  </Suspense>
);

// Preload function for better UX
export const preloadComponents = () => {
  // Preload admin components if user is likely admin
  const isLikelyAdmin = localStorage.getItem('admin_token') || 
                       window.location.pathname.includes('/admin');
  
  if (isLikelyAdmin) {
    Promise.all([
      import('../pages/AdminDashboard'),
      import('../pages/AdminUserManagement'),
      import('../pages/Analytics')
    ]);
  }

};