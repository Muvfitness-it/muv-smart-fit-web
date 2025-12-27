import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollMilestone {
  depth: number;
  tracked: boolean;
}

const useScrollDepthTracking = () => {
  const location = useLocation();
  const milestonesRef = useRef<ScrollMilestone[]>([
    { depth: 25, tracked: false },
    { depth: 50, tracked: false },
    { depth: 75, tracked: false },
    { depth: 100, tracked: false }
  ]);
  
  const trackScrollDepth = useCallback((depth: number) => {
    // Track with Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'scroll_depth', {
        event_category: 'engagement',
        event_label: `${depth}%`,
        page_path: window.location.pathname,
        scroll_depth_threshold: depth,
        non_interaction: true
      });
    }

    // Track with Microsoft Clarity custom event
    if (typeof window !== 'undefined' && (window as any).clarity) {
      (window as any).clarity('set', 'scroll_depth', `${depth}%`);
    }

    console.log(`[Scroll Tracking] User reached ${depth}% of page`);
  }, []);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollPosition = window.scrollY;
    const scrollPercentage = Math.round((scrollPosition / scrollHeight) * 100);

    milestonesRef.current.forEach((milestone) => {
      if (!milestone.tracked && scrollPercentage >= milestone.depth) {
        milestone.tracked = true;
        trackScrollDepth(milestone.depth);
      }
    });
  }, [trackScrollDepth]);

  // Reset milestones when route changes
  useEffect(() => {
    milestonesRef.current = [
      { depth: 25, tracked: false },
      { depth: 50, tracked: false },
      { depth: 75, tracked: false },
      { depth: 100, tracked: false }
    ];
  }, [location.pathname]);

  useEffect(() => {
    // Debounced scroll handler
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);

  return {
    trackScrollDepth
  };
};

export default useScrollDepthTracking;
