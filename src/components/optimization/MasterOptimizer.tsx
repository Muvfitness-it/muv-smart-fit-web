import React, { useState, useEffect } from 'react';
import ResourcePreloader from './ResourcePreloader';
import GoogleAnalytics from './GoogleAnalytics';
import PerformanceMonitor from './PerformanceMonitor';
import SEOEnhancer from './SEOEnhancer';
import OptimizationReport from './OptimizationReport';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, Image, Globe, BarChart3, Settings } from 'lucide-react';

interface MasterOptimizerProps {
  enableAnalytics?: boolean;
  analyticsId?: string;
  criticalImages?: string[];
  pageTitle?: string;
  pageDescription?: string;
  pageKeywords?: string;
}

const MasterOptimizer = ({ 
  enableAnalytics = true,
  analyticsId = 'G-XXXXXXXXXX', // Replace with your actual GA4 measurement ID
  criticalImages = [
    '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png',
    '/images/fitness-professional-bg.jpg'
  ],
  pageTitle,
  pageDescription,
  pageKeywords
}: MasterOptimizerProps) => {
  const [optimizationEnabled, setOptimizationEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Critical resources for preloading
  const criticalCSS = [
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@400;500;600&display=swap'
  ];

  const criticalFonts = [
    'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJA.woff2',
    'https://fonts.gstatic.com/s/montserrat/v25/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.woff2'
  ];

  const prefetchPages = [
    '/servizi',
    '/contatti',
    '/blog',
    '/chi-siamo'
  ];

  const runAutomaticOptimizations = () => {
    // Apply automatic optimizations
    console.log('Running automatic optimizations...');
    
    // Optimize images
    const images = document.querySelectorAll('img:not([loading])');
    images.forEach((img, index) => {
      if (index > 2) { // Only first 3 images load eagerly
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
    });

    // Add missing alt attributes
    const imagesWithoutAlt = document.querySelectorAll('img:not([alt])');
    imagesWithoutAlt.forEach((img) => {
      img.setAttribute('alt', 'Immagine MUV Fitness');
    });

    // Optimize font loading
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    fontLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (!href.includes('display=swap')) {
        const newHref = href.includes('?') ? `${href}&display=swap` : `${href}?display=swap`;
        link.setAttribute('href', newHref);
      }
    });

    // Remove duplicate H1s
    const h1Elements = document.querySelectorAll('h1');
    if (h1Elements.length > 1) {
      h1Elements.forEach((h1, index) => {
        if (index > 0) {
          (h1 as HTMLElement).style.display = 'none';
        }
      });
    }

    // Add structured data for breadcrumbs if missing
    if (!document.querySelector('script[data-breadcrumb]') && window.location.pathname !== '/') {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.muvfitness.it/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": document.title,
            "item": window.location.href
          }
        ]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-breadcrumb', 'true');
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    }

    console.log('Automatic optimizations completed');
  };

  const cleanupDuplicateFiles = () => {
    // Remove duplicate stylesheets
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const seenHrefs = new Set();
    
    stylesheets.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && seenHrefs.has(href)) {
        link.remove();
      } else if (href) {
        seenHrefs.add(href);
      }
    });

    // Remove duplicate scripts
    const scripts = document.querySelectorAll('script[src]');
    const seenSrcs = new Set();
    
    scripts.forEach((script) => {
      const src = script.getAttribute('src');
      if (src && seenSrcs.has(src)) {
        script.remove();
      } else if (src) {
        seenSrcs.add(src);
      }
    });

    console.log('Cleanup of duplicate files completed');
  };

  useEffect(() => {
    if (optimizationEnabled) {
      // Run initial optimizations after a delay
      setTimeout(() => {
        runAutomaticOptimizations();
        cleanupDuplicateFiles();
      }, 1000);
    }
  }, [optimizationEnabled]);

  return (
    <>
      {/* Background optimization components */}
      {optimizationEnabled && (
        <>
          <ResourcePreloader
            criticalImages={criticalImages}
            criticalCSS={criticalCSS}
            fonts={criticalFonts}
            prefetchPages={prefetchPages}
          />
          {enableAnalytics && (
            <GoogleAnalytics
              measurementId={analyticsId}
              enabled={enableAnalytics}
            />
          )}
          <PerformanceMonitor />
          <SEOEnhancer
            title={pageTitle}
            description={pageDescription}
            keywords={pageKeywords}
          />
        </>
      )}

      {/* Admin interface for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="w-96 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Settings className="w-4 h-4" />
                Ottimizzazioni MUV
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview" className="text-xs">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Report
                  </TabsTrigger>
                  <TabsTrigger value="images" className="text-xs">
                    <Image className="w-3 h-3 mr-1" />
                    Immagini
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="text-xs">
                    <Globe className="w-3 h-3 mr-1" />
                    SEO
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-2">
                  <OptimizationReport 
                    title="Report Performance"
                    onRunOptimization={runAutomaticOptimizations}
                  />
                </TabsContent>
                
                <TabsContent value="images" className="space-y-2">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Ottimizzazioni attive:</span>
                      <span className={optimizationEnabled ? 'text-green-600' : 'text-red-600'}>
                        {optimizationEnabled ? 'SÌ' : 'NO'}
                      </span>
                    </div>
                    <Button 
                      onClick={() => setOptimizationEnabled(!optimizationEnabled)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      {optimizationEnabled ? 'Disabilita' : 'Abilita'} Ottimizzazioni
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="seo" className="space-y-2">
                  <div className="text-xs space-y-1">
                    <div>• H1 unico per pagina</div>
                    <div>• Meta descrizioni ottimizzate</div>
                    <div>• Schema markup LocalBusiness</div>
                    <div>• Canonical URLs</div>
                    <div>• Open Graph tags</div>
                  </div>
                  <Button 
                    onClick={cleanupDuplicateFiles}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Pulisci Duplicati
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default MasterOptimizer;