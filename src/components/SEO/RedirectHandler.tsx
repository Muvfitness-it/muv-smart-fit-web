import { useEffect } from 'react';

const RedirectHandler = () => {
  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    
    // Skip redirect on localhost and Lovable preview domains
    const isPreviewDomain = (
      url.hostname.includes('localhost') ||
      url.hostname.includes('lovable.app') ||
      url.hostname.includes('127.0.0.1') ||
      url.hostname.includes('preview--')
    );
    
    if (isPreviewDomain) {
      console.log('RedirectHandler: Skipping redirect on preview domain:', url.hostname);
      return;
    }
    
    // Force canonical domain: https://www.muvfitness.it/ only on production
    const shouldRedirect = (
      url.protocol !== 'https:' || 
      url.hostname !== 'www.muvfitness.it' ||
      url.pathname.includes('//')
    );
    
    if (shouldRedirect) {
      let canonicalUrl = `https://www.muvfitness.it${url.pathname}`;
      
      // Clean double slashes
      canonicalUrl = canonicalUrl.replace(/\/+/g, '/').replace('http:/', 'https://');
      
      // Remove UTM params from canonical but preserve others
      const searchParams = new URLSearchParams(url.search);
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid'].forEach(param => {
        searchParams.delete(param);
      });
      
      if (searchParams.toString()) {
        canonicalUrl += `?${searchParams.toString()}`;
      }
      
      // Redirect with 301
      if (canonicalUrl !== currentUrl) {
        console.log('RedirectHandler: Redirecting from', currentUrl, 'to', canonicalUrl);
        window.location.replace(canonicalUrl);
      }
    }
  }, []);

  return null;
};

export default RedirectHandler;