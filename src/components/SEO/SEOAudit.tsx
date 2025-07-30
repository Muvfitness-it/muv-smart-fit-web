import React, { useEffect, useState } from 'react';

interface SEOAuditResults {
  missingAltTexts: number;
  emptyTitles: number;
  duplicateH1s: number;
  missingMetaDescription: boolean;
  missingCanonical: boolean;
  totalImages: number;
  totalHeadings: number;
}

const SEOAudit: React.FC = () => {
  const [auditResults, setAuditResults] = useState<SEOAuditResults | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const runSEOAudit = () => {
    const results: SEOAuditResults = {
      missingAltTexts: 0,
      emptyTitles: 0,
      duplicateH1s: 0,
      missingMetaDescription: false,
      missingCanonical: false,
      totalImages: 0,
      totalHeadings: 0
    };

    // Controlla immagini senza alt text
    const images = document.querySelectorAll('img');
    results.totalImages = images.length;
    images.forEach(img => {
      if (!img.alt || img.alt.trim() === '') {
        results.missingAltTexts++;
        // Aggiunge automaticamente alt text generico se mancante
        if (!img.alt) {
          img.alt = 'Immagine MUV Fitness Legnago - Centro fitness e benessere';
        }
      }
    });

    // Controlla titoli vuoti
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    results.totalHeadings = headings.length;
    headings.forEach(heading => {
      if (!heading.textContent || heading.textContent.trim() === '') {
        results.emptyTitles++;
      }
    });

    // Controlla H1 duplicati
    const h1s = document.querySelectorAll('h1');
    if (h1s.length > 1) {
      results.duplicateH1s = h1s.length - 1;
    }

    // Controlla meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    results.missingMetaDescription = !metaDescription || !metaDescription.getAttribute('content');

    // Controlla canonical
    const canonical = document.querySelector('link[rel="canonical"]');
    results.missingCanonical = !canonical || !canonical.getAttribute('href');

    setAuditResults(results);
  };

  useEffect(() => {
    // Esegue l'audit dopo che il DOM è completamente caricato
    const timer = setTimeout(() => {
      runSEOAudit();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Mostra i risultati solo in sviluppo
  useEffect(() => {
    setIsVisible(process.env.NODE_ENV === 'development');
  }, []);

  if (!isVisible || !auditResults) return null;

  const hasIssues = auditResults.missingAltTexts > 0 || 
                   auditResults.emptyTitles > 0 || 
                   auditResults.duplicateH1s > 0 || 
                   auditResults.missingMetaDescription || 
                   auditResults.missingCanonical;

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: hasIssues ? '#dc2626' : '#16a34a',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        maxWidth: '300px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        🔍 SEO Audit {hasIssues ? '⚠️' : '✅'}
      </div>
      <div>
        📸 Immagini: {auditResults.totalImages - auditResults.missingAltTexts}/{auditResults.totalImages} con ALT
      </div>
      <div>
        📝 H1: {auditResults.duplicateH1s > 0 ? `${auditResults.duplicateH1s} duplicati` : 'OK'}
      </div>
      <div>
        🏷️ Meta Description: {auditResults.missingMetaDescription ? 'Mancante' : 'OK'}
      </div>
      <div>
        🔗 Canonical: {auditResults.missingCanonical ? 'Mancante' : 'OK'}
      </div>
      <button 
        onClick={runSEOAudit}
        style={{
          marginTop: '5px',
          padding: '3px 6px',
          fontSize: '10px',
          border: 'none',
          background: 'rgba(255,255,255,0.2)',
          color: 'white',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        🔄 Ricontrolla
      </button>
    </div>
  );
};

export default SEOAudit;