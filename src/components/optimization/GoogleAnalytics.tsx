import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface GoogleAnalyticsProps {
  measurementId: string;
  enabled?: boolean;
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

    // Load Google Analytics script
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
    });

    return () => {
      // Remove script if component unmounts
      const scripts = document.querySelectorAll(`script[src*="${measurementId}"]`);
      scripts.forEach(script => script.remove());
    };
  }, [measurementId, enabled]);

  // Track page views on route changes
  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || !window.gtag) return;

    const consent = localStorage.getItem('muv_cookie_consent');
    const consentData = consent ? JSON.parse(consent) : null;
    
    if (!consentData?.analytics) return;

    window.gtag('config', measurementId, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname,
    });

    // Track custom event for navigation
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: location.pathname,
    });
  }, [location, measurementId, enabled]);

  return null;
};

export default GoogleAnalytics;