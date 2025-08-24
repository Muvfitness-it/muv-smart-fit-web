import { useEffect } from 'react';

const RedirectHandler = () => {
  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    
    // Force canonical domain: https://www.muvfitness.it/
    const shouldRedirect = (
      url.protocol !== 'https:' || 
      url.hostname !== 'www.muvfitness.it' ||
      url.pathname.includes('//')
    );
    
    if (shouldRedirect && !window.location.href.includes('localhost')) {
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
        window.location.replace(canonicalUrl);
      }
    }
  }, []);

  return null;
};

export default RedirectHandler;