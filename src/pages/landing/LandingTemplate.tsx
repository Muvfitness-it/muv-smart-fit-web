
import React from 'react';
import { useEffect } from 'react';
import PageSEO from '@/components/SEO/PageSEO';

interface LandingTemplateProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  campaignName: string;
}

const LandingTemplate: React.FC<LandingTemplateProps> = ({
  children,
  title,
  description,
  keywords,
  campaignName
}) => {
  useEffect(() => {
    // Track landing page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: window.location.href,
        campaign_name: campaignName
      });
    }
  }, [title, campaignName]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <PageSEO 
        title={title}
        description={description}
        keywords={keywords}
        noIndex={false}
      />
      <main className="landing-page">
        {children}
      </main>
    </div>
  );
};

export default LandingTemplate;
