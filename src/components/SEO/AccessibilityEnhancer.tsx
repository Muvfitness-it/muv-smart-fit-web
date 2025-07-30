import React, { useEffect } from 'react';

interface AccessibilityEnhancerProps {
  pageTitle: string;
  mainContentId?: string;
  skipToContentId?: string;
}

const AccessibilityEnhancer: React.FC<AccessibilityEnhancerProps> = ({
  pageTitle,
  mainContentId = 'main-content',
  skipToContentId = 'skip-to-content'
}) => {
  useEffect(() => {
    // Aggiorna il titolo per i screen reader
    document.title = pageTitle;
    
    // Aggiunge landmark per la navigazione
    const main = document.getElementById(mainContentId);
    if (main && !main.hasAttribute('role')) {
      main.setAttribute('role', 'main');
      main.setAttribute('aria-label', 'Contenuto principale');
    }
    
    // Migliora la navigazione da tastiera
    const focusableElements = document.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    focusableElements.forEach((element, index) => {
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    });
    
    // Aggiunge supporto per ESC key per chiudere modali
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const modal = document.querySelector('[role="dialog"]');
        if (modal) {
          const closeButton = modal.querySelector('[aria-label*="chiudi"], [aria-label*="close"]');
          if (closeButton instanceof HTMLElement) {
            closeButton.click();
          }
        }
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [pageTitle, mainContentId]);

  return (
    <>
      {/* Skip to content link per utenti tastiera */}
      <a
        id={skipToContentId}
        href={`#${mainContentId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md"
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
        onFocus={(e) => {
          e.target.style.position = 'fixed';
          e.target.style.left = '10px';
          e.target.style.top = '10px';
          e.target.style.width = 'auto';
          e.target.style.height = 'auto';
          e.target.style.overflow = 'visible';
          e.target.style.zIndex = '9999';
          e.target.style.backgroundColor = '#ec4899';
          e.target.style.color = 'white';
          e.target.style.padding = '8px 16px';
          e.target.style.borderRadius = '4px';
          e.target.style.textDecoration = 'none';
        }}
        onBlur={(e) => {
          e.target.style.position = 'absolute';
          e.target.style.left = '-10000px';
          e.target.style.top = 'auto';
          e.target.style.width = '1px';
          e.target.style.height = '1px';
          e.target.style.overflow = 'hidden';
        }}
      >
        Salta al contenuto principale
      </a>
      
      {/* Live region per annunci dinamici */}
      <div
        id="announcements"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />
      
      {/* Screen reader only content per SEO */}
      <div className="sr-only">
        <h1>MUV Fitness Legnago - Centro Fitness Professionale</h1>
        <p>
          Centro fitness esclusivo a Legnago specializzato in personal training, 
          tecnologie avanzate EMS, Pilates, HIIT, consulenza nutrizionale e benessere. 
          Situato in Via Venti Settembre 5/7, serviamo clienti da tutta la Bassa Veronese.
        </p>
      </div>
    </>
  );
};

export default AccessibilityEnhancer;