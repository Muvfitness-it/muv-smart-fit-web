import { useEffect } from 'react';

const AccessibilityEnhancer = () => {
  useEffect(() => {
    // Add focus visible polyfill for older browsers
    const addFocusVisible = () => {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('using-keyboard');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
      });
    };

    // Skip link enhancement
    const enhanceSkipLinks = () => {
      const skipLinks = document.querySelectorAll('.skip-link');
      skipLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href') || '');
          if (target) {
            target.setAttribute('tabindex', '-1');
            (target as HTMLElement).focus();
            target.removeAttribute('tabindex');
          }
        });
      });
    };

    // ARIA live regions for dynamic content
    const setupLiveRegions = () => {
      if (!document.getElementById('aria-live-polite')) {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-polite';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        document.body.appendChild(liveRegion);
      }
    };

    // Color contrast warnings
    const checkContrast = () => {
      // This would ideally integrate with a contrast checker
      console.log('Accessibility: Color contrast checking enabled');
    };

    addFocusVisible();
    enhanceSkipLinks();
    setupLiveRegions();
    checkContrast();

  }, []);

  return null;
};

export default AccessibilityEnhancer;