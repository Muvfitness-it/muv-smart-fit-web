import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface GoogleAnalyticsProps {
  measurementId: string;
  enabled?: boolean;
}

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

const GoogleAnalytics = ({ measurementId, enabled = true }: GoogleAnalyticsProps) => {
  const location = useLocation();

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Check for user consent
    const consent = localStorage.getItem('muv_cookie_consent');
    const consentData = consent ? JSON.parse(consent) : null;
    
    if (!consentData?.analytics) {
      console.log('Google Analytics disabled - user consent not given');
      return;
    }

    // Load Google Analytics script only once
    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      window.gtag = gtag;

      gtag('js', new Date());
      gtag('config', measurementId, {
        page_title: document.title,
        page_location: window.location.href,
        consent_mode: {
          analytics_storage: 'granted',
          ad_storage: 'denied'
        }
      });
    }

    return () => {
      // Keep script for performance (single-page app)
    };
  }, [measurementId, enabled]);

  // Track page views on route changes
  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.gtag) return;

    const consent = localStorage.getItem('muv_cookie_consent');
    const consentData = consent ? JSON.parse(consent) : null;
    
    if (!consentData?.analytics) return;

    // Track page view
    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname,
    });

    // Track custom events based on page
    const pageName = location.pathname === '/' ? 'homepage' : location.pathname.replace('/', '');
    
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname,
      page_name: pageName
    });

    // Track specific page events
    if (location.pathname === '/') {
      window.gtag('event', 'view_homepage', {
        event_category: 'engagement',
        event_label: 'homepage_view'
      });
    }

  }, [location, measurementId, enabled]);

  // Expose tracking functions globally for form submissions
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Track CTA clicks
    const trackCTAClick = (ctaType: string, location: string) => {
      if (window.gtag) {
        window.gtag('event', 'click_cta_primary', {
          event_category: 'engagement',
          event_label: `${ctaType}_${location}`,
          cta_type: ctaType,
          cta_location: location
        });
      }
    };

    // Track form events
    const trackFormEvent = (eventType: string, formName: string) => {
      if (window.gtag) {
        window.gtag('event', eventType, {
          event_category: 'form',
          event_label: formName,
          form_name: formName
        });
      }
    };

    // Track WhatsApp clicks
    const trackWhatsAppClick = () => {
      if (window.gtag) {
        window.gtag('event', 'whatsapp_click', {
          event_category: 'engagement',
          event_label: 'whatsapp_contact',
          source: 'website'
        });
      }
    };

    // Make functions available globally
    (window as any).trackCTAClick = trackCTAClick;
    (window as any).trackFormEvent = trackFormEvent;
    (window as any).trackWhatsAppClick = trackWhatsAppClick;

    // Auto-track WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
      link.addEventListener('click', trackWhatsAppClick);
    });

    return () => {
      // Cleanup event listeners
      whatsappLinks.forEach(link => {
        link.removeEventListener('click', trackWhatsAppClick);
      });
    };
  }, [enabled]);

  return null;
};

export default GoogleAnalytics;
