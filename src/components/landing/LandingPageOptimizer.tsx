import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LandingPageOptimizer = () => {
  const location = useLocation();

  useEffect(() => {
    const isLandingPage = [
      '/trasformazione-30-giorni',
      '/gravidanza-post-parto', 
      '/riabilitazione-infortuni',
      '/senior-fitness'
    ].includes(location.pathname);

    if (isLandingPage) {
      // Optimize for conversion
      document.body.classList.add('landing-page');
      
      // Track landing page entry
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'landing_page_view', {
          page_path: location.pathname,
          page_title: document.title
        });
      }

      // Remove distractions
      const removeChatWidgets = () => {
        const chatWidgets = document.querySelectorAll('[class*="chat"], [class*="widget"]');
        chatWidgets.forEach(widget => {
          (widget as HTMLElement).style.display = 'none';
        });
      };

      // Optimize CTA visibility
      const optimizeCTAs = () => {
        const ctas = document.querySelectorAll('[data-cta="true"], .cta-button');
        ctas.forEach(cta => {
          cta.setAttribute('aria-label', 'Azione principale - Contattaci ora');
          (cta as HTMLElement).style.minHeight = '44px'; // Touch target
        });
      };

      // Landing page specific optimizations
      setTimeout(() => {
        removeChatWidgets();
        optimizeCTAs();
      }, 500);

      return () => {
        document.body.classList.remove('landing-page');
      };
    }
  }, [location.pathname]);

  return null;
};

export default LandingPageOptimizer;