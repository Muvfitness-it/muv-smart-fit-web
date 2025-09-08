import React from 'react';
import BreadcrumbNavigation from '@/components/SEO/BreadcrumbNavigation';

interface PageLayoutProps {
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  showBreadcrumbs = true, 
  className = "" 
}) => {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      {showBreadcrumbs && <BreadcrumbNavigation />}
      {children}
    </div>
  );
};

export default PageLayout;