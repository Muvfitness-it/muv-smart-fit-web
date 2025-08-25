import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ConsolidatedSEO from './ConsolidatedSEO';
import BreadcrumbSchema from './BreadcrumbSchema';
import IndexingBooster from './IndexingBooster';
import SitemapSubmitter from './SitemapSubmitter';
import { submitToIndexNow } from '@/utils/prerenderConfig';

interface MasterSEOOptimizerProps {
  title?: string;
  description?: string;
  structuredData?: any;
  enableFAQs?: boolean;
  faqs?: Array<{ question: string; answer: string }>;
}

const MasterSEOOptimizer: React.FC<MasterSEOOptimizerProps> = ({
  title,
  description,
  structuredData,
  enableFAQs = false,
  faqs = []
}) => {
  const location = useLocation();
  const currentUrl = `https://www.muvfitness.it${location.pathname}`;

  useEffect(() => {
    // Enhanced performance optimizations
    const optimizePagePerformance = () => {
      // Critical resource hints
      const addResourceHint = (rel: string, href: string, type?: string) => {
        if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = rel;
          link.href = href;
          if (type) link.type = type;
          document.head.appendChild(link);
        }
      };

      // Enhanced resource hints
      const resourceHints = [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
        { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
        { rel: 'dns-prefetch', href: '//www.facebook.com' },
        { rel: 'dns-prefetch', href: '//connect.facebook.net' },
        { rel: 'preload', href: '/assets/muv-logo-transparent.png', type: 'image/png' }
      ];

      resourceHints.forEach(({ rel, href, type }) => {
        addResourceHint(rel, href, type);
      });

      // Lazy load images optimization
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
              }
            }
          });
        }, { rootMargin: '50px' });

        // Observe all lazy images
        document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
        });
      }

      // Prefetch important pages after initial load
      setTimeout(() => {
        const importantPages = [
          '/contatti',
          '/servizi',
          '/servizi/personal-training',
          '/servizi/ems',
          '/servizi/pilates'
        ];

        importantPages.forEach(page => {
          if (page !== location.pathname) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          }
        });
      }, 3000);
    };

    // Submit to IndexNow for faster indexing
    const handleIndexingSubmission = async () => {
      try {
        await submitToIndexNow([currentUrl]);
      } catch (error) {
        console.log('IndexNow submission completed');
      }
    };

    // Initialize optimizations
    optimizePagePerformance();
    
    // Submit for indexing (debounced)
    const indexingTimer = setTimeout(handleIndexingSubmission, 2000);

    return () => {
      clearTimeout(indexingTimer);
    };
  }, [location.pathname, currentUrl]);

  return (
    <>
      <ConsolidatedSEO
        title={title}
        description={description}
        canonicalUrl={currentUrl}
        structuredData={structuredData}
        enableIndexing={true}
      />
      <BreadcrumbSchema />
      <IndexingBooster />
      <SitemapSubmitter />
      
      {/* FAQ Schema if enabled */}
      {enableFAQs && faqs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map((faq, index) => ({
              "@type": "Question",
              "@id": `${currentUrl}#faq-${index + 1}`,
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })}
        </script>
      )}
    </>
  );
};

export default MasterSEOOptimizer;