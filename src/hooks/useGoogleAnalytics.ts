import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom GA4 Events per MUV Fitness
 * Tracking avanzato conversioni e user journey
 */

export const useGoogleAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location]);
};

// Custom Event Tracking Functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }
};

// Lead Generation Events
export const trackGenerateLead = (source: string, campaign?: string) => {
  trackEvent('generate_lead', {
    source,
    campaign: campaign || 'organic',
    timestamp: new Date().toISOString()
  });
};

// Click Events
export const trackClickWhatsApp = (page: string) => {
  trackEvent('click_whatsapp', {
    page,
    cta_type: 'whatsapp_button'
  });
};

export const trackClickCall = (page: string) => {
  trackEvent('click_call', {
    page,
    cta_type: 'phone_button'
  });
};

export const trackClickCTA = (ctaText: string, ctaLocation: string, destination: string) => {
  trackEvent('click_cta', {
    cta_text: ctaText,
    cta_location: ctaLocation,
    destination
  });
};

// Service Views
export const trackViewService = (serviceName: string) => {
  trackEvent('view_service', {
    service_name: serviceName,
    timestamp: new Date().toISOString()
  });
};

// Pricing Views
export const trackViewPricing = (tier?: string) => {
  trackEvent('view_pricing', {
    tier: tier || 'all',
    timestamp: new Date().toISOString()
  });
};

// Scroll Depth Tracking
export const trackScrollDepth = (depth: number, page: string) => {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    page
  });
};

// Form Interactions
export const trackFormStart = (formName: string, page: string) => {
  trackEvent('form_start', {
    form_name: formName,
    page
  });
};

export const trackFormSubmit = (formName: string, page: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    page,
    success
  });
};

// Navigation Events
export const trackNavigationClick = (linkText: string, destination: string) => {
  trackEvent('navigation_click', {
    link_text: linkText,
    destination
  });
};

// Video/Media Events
export const trackVideoPlay = (videoName: string, page: string) => {
  trackEvent('video_play', {
    video_name: videoName,
    page
  });
};

// Search Events (se implementato)
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount
  });
};

// Social Share Events
export const trackSocialShare = (platform: string, contentUrl: string) => {
  trackEvent('social_share', {
    platform,
    content_url: contentUrl
  });
};

// File Download Events
export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType
  });
};

// ============================================
// HOMEPAGE EVENTS - Percorso contatto veloce
// ============================================

export const trackHomeFormSubmit = (source: string) => {
  trackEvent('home_form_submit', {
    source,
    timestamp: new Date().toISOString()
  });
};

export const trackHomeClickToFunnel = (location: string) => {
  trackEvent('home_click_to_funnel', {
    location,
    timestamp: new Date().toISOString()
  });
};

// ============================================
// PERCORSI PAGE EVENTS
// ============================================

export const trackGenderSelected = (gender: 'donna' | 'uomo') => {
  trackEvent('gender_selected', {
    gender,
    page: '/percorsi',
    timestamp: new Date().toISOString()
  });
};

export const trackPercorsoView = (percorsoName: string, gender?: string) => {
  trackEvent('percorso_view', {
    percorso_name: percorsoName,
    gender: gender || 'not_selected',
    timestamp: new Date().toISOString()
  });
};

// ============================================
// FUNNEL EVENTS - Percorso prenotazione qualificata
// ============================================

export const trackFunnelStep1 = () => {
  trackEvent('funnel_step1', {
    timestamp: new Date().toISOString()
  });
};

export const trackFunnelStep2Complete = (answers: Record<string, string>) => {
  trackEvent('funnel_step2_complete', {
    ...answers,
    timestamp: new Date().toISOString()
  });
};

export const trackFunnelBookingSubmit = (data: { obiettivo?: string; tempo?: string }) => {
  trackEvent('funnel_booking_submit', {
    ...data,
    timestamp: new Date().toISOString()
  });
};

// Custom Scroll Depth Hook
export const useScrollDepthTracking = (pageName: string) => {
  useEffect(() => {
    let depth25Tracked = false;
    let depth50Tracked = false;
    let depth75Tracked = false;
    let depth100Tracked = false;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight * 100;

      if (scrollPercentage >= 25 && !depth25Tracked) {
        trackScrollDepth(25, pageName);
        depth25Tracked = true;
      }
      if (scrollPercentage >= 50 && !depth50Tracked) {
        trackScrollDepth(50, pageName);
        depth50Tracked = true;
      }
      if (scrollPercentage >= 75 && !depth75Tracked) {
        trackScrollDepth(75, pageName);
        depth75Tracked = true;
      }
      if (scrollPercentage >= 95 && !depth100Tracked) {
        trackScrollDepth(100, pageName);
        depth100Tracked = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageName]);
};
