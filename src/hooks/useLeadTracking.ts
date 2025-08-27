import { useState, useEffect } from 'react';

interface LeadTrackingData {
  sessionId: string;
  ipAddress?: string;
  userAgent: string;
  referrer: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage: string;
  pagesVisited: number;
  timeOnSite: number;
  formSubmissions: number;
  bookingCompleted: boolean;
}

const useLeadTracking = () => {
  const [leadData, setLeadData] = useState<LeadTrackingData>({
    sessionId: '',
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    landingPage: window.location.pathname,
    pagesVisited: 1,
    timeOnSite: 0,
    formSubmissions: 0,
    bookingCompleted: false
  });

  const [startTime] = useState(Date.now());

  useEffect(() => {
    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem('lead_session_id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('lead_session_id', sessionId);
    }

    // Get UTM parameters
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || undefined;
    const utmMedium = urlParams.get('utm_medium') || undefined;
    const utmCampaign = urlParams.get('utm_campaign') || undefined;

    // Get IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setLeadData(prev => ({
          ...prev,
          sessionId,
          ipAddress: data.ip,
          utmSource,
          utmMedium,
          utmCampaign
        }));
      })
      .catch(() => {
        setLeadData(prev => ({
          ...prev,
          sessionId,
          utmSource,
          utmMedium,
          utmCampaign
        }));
      });

    // Track page visits
    const updatePageVisits = () => {
      setLeadData(prev => ({
        ...prev,
        pagesVisited: prev.pagesVisited + 1
      }));
    };

    // Track time on site
    const updateTimeOnSite = () => {
      setLeadData(prev => ({
        ...prev,
        timeOnSite: Math.floor((Date.now() - startTime) / 1000)
      }));
    };

    // Update time every 10 seconds
    const timeInterval = setInterval(updateTimeOnSite, 10000);

    // Listen for route changes (if using React Router)
    const handleRouteChange = () => {
      updatePageVisits();
      updateTimeOnSite();
    };

    window.addEventListener('popstate', handleRouteChange);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('popstate', handleRouteChange);
      updateTimeOnSite(); // Final update
    };
  }, [startTime]);

  const trackFormSubmission = () => {
    setLeadData(prev => ({
      ...prev,
      formSubmissions: prev.formSubmissions + 1
    }));

    // Track in Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'form_submission', {
        session_id: leadData.sessionId,
        form_submissions_count: leadData.formSubmissions + 1
      });
    }
  };

  const trackBookingCompleted = (conversionValue?: number) => {
    setLeadData(prev => ({
      ...prev,
      bookingCompleted: true
    }));

    // Track in Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', {
        transaction_id: leadData.sessionId,
        value: conversionValue || 0,
        currency: 'EUR',
        items: [{
          item_id: 'booking',
          item_name: 'Fitness Booking',
          category: 'fitness',
          quantity: 1,
          price: conversionValue || 0
        }]
      });
    }
  };

  // SECURITY FIX: Remove direct client-side database writes
  // Route through secure edge function instead
  const saveLeadData = async () => {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      const finalTimeOnSite = Math.floor((Date.now() - startTime) / 1000);
      
      // Create HMAC signature for security
      const bodyData = {
        action: 'lead_tracking',
        leadData: {
          ...leadData,
          timeOnSite: finalTimeOnSite
        }
      };
      
      // Call secure edge function instead of direct DB write
      const response = await supabase.functions.invoke('log-visit', {
        body: bodyData
      });

      if (response.error) {
        console.error('Error saving lead data via edge function:', response.error);
      }
    } catch (error) {
      console.error('Error saving lead data:', error);
    }
  };

  // Save data before user leaves
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveLeadData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Also save periodically
    const saveInterval = setInterval(saveLeadData, 30000); // Save every 30 seconds

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(saveInterval);
    };
  }, [leadData]);

  return {
    leadData,
    trackFormSubmission,
    trackBookingCompleted,
    saveLeadData
  };
};

export default useLeadTracking;