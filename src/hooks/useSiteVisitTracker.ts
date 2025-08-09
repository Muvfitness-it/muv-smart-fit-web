
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './useAnalytics';

export const useSiteVisitTracker = () => {
  const location = useLocation();
  const { trackSiteVisit } = useAnalytics();

  useEffect(() => {
    const consentRaw = typeof window !== 'undefined' ? localStorage.getItem('muv_cookie_consent') : null;
    const consent = consentRaw ? JSON.parse(consentRaw) : null;

    if (consent?.analytics) {
      trackSiteVisit(location.pathname);
    }
  }, [location.pathname, trackSiteVisit]);
};
