import { useEffect } from 'react';

const InternalLinkOptimizer = () => {
  useEffect(() => {
    const optimizeInternalLinks = () => {
      // Find and optimize internal links
      const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
      
      internalLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;

        // Add proper ARIA labels where missing
        if (!link.getAttribute('aria-label') && !link.getAttribute('aria-labelledby')) {
          const text = link.textContent?.trim() || '';
          if (text) {
            link.setAttribute('aria-label', `Vai alla pagina: ${text}`);
          }
        }

        // Add title attributes for better UX
        if (!link.getAttribute('title')) {
          const text = link.textContent?.trim() || '';
          if (text) {
            link.setAttribute('title', text);
          }
        }

        // Ensure proper focus styling
        if (!link.classList.contains('focus:outline-none')) {
          link.classList.add('focus:ring-2', 'focus:ring-brand-primary', 'focus:ring-offset-2');
        }
      });
    };

    const addStructuredLinking = () => {
      // Add breadcrumb structured data if not present
      const breadcrumbs = document.querySelector('[data-breadcrumb="true"]');
      if (breadcrumbs && !document.querySelector('script[type="application/ld+json"][data-breadcrumb="true"]')) {
        const links = breadcrumbs.querySelectorAll('a');
        const structuredData = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": Array.from(links).map((link, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": link.textContent,
            "item": `https://www.muvfitness.it${link.getAttribute('href')}`
          }))
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-breadcrumb', 'true');
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    };

    // Run optimizations
    optimizeInternalLinks();
    addStructuredLinking();

    // Re-run when DOM changes (for dynamic content)
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        optimizeInternalLinks();
        addStructuredLinking();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

export default InternalLinkOptimizer;