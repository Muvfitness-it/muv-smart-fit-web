
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './useAnalytics';

export const useSiteVisitTracker = () => {
  const location = useLocation();
  const { trackSiteVisit } = useAnalytics();

  useEffect(() => {
    // Track the page visit
    trackSiteVisit(location.pathname);
  }, [location.pathname, trackSiteVisit]);
};
