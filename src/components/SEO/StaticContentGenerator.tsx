
import React, { useEffect } from 'react';

interface StaticContentGeneratorProps {
  pageType: 'home' | 'servizi' | 'contatti' | 'chi-siamo' | 'blog';
  additionalContent?: string;
}

const StaticContentGenerator: React.FC<StaticContentGeneratorProps> = ({
  pageType,
  additionalContent = ''
}) => {
  useEffect(() => {
    const generateStaticContent = () => {
      const staticSection = document.createElement('div');
      staticSection.id = 'static-fallback';
      staticSection.style.display = 'none';
      staticSection.setAttribute('data-purpose', 'crawler-fallback');
      
      let content = '';
      
      switch (pageType) {
        case 'home':
          content = `
            <h1>MUV Fitness - Centro Fitness a Legnago</h1>
            <p>Centro fitness esclusivo a Legnago specializzato in personal training, EMS, Pilates e consulenza nutrizionale. Trasforma il tuo corpo in 30 giorni.</p>
            <h2>Servizi Principali</h2>
            <ul>
              <li>Personal Training One-to-One</li>
              <li>Allenamento EMS</li>
              <li>Pilates e Pilates Reformer</li>
              <li>HIIT Training</li>
              <li>Consulenza Nutrizionale</li>
              <li>Pancafit per problemi posturali</li>
              <li>Massoterapia</li>
              <li>Supporto Psicologico</li>
            </ul>
            <h2>Perché Sceglierci</h2>
            <p>Ambiente esclusivo, tecnologie avanzate, staff qualificato, approccio olistico al benessere. Risultati garantiti in tempi rapidi.</p>
          `;
          break;
        
        case 'servizi':
          content = `
            <h1>Servizi MUV Fitness Legnago</h1>
            <p>Scopri tutti i nostri servizi specializzati per il fitness e il benessere. Ogni servizio è personalizzato per i tuoi obiettivi specifici.</p>
            <h2>Personal Training</h2>
            <p>Allenamenti personalizzati one-to-one con trainer certificati per raggiungere i tuoi obiettivi in modo efficace e sicuro.</p>
            <h2>EMS Training</h2>
            <p>Tecnologia di elettrostimolazione muscolare per massimizzare i risultati in tempi ridotti.</p>
            <h2>Pilates</h2>
            <p>Corsi di Pilates per migliorare postura, flessibilità e forza del core.</p>
            <h2>HIIT</h2>
            <p>Allenamento ad alta intensità per bruciare grassi e migliorare la resistenza.</p>
            <h2>Consulenza Nutrizionale</h2>
            <p>Piani alimentari personalizzati per supportare i tuoi obiettivi di fitness.</p>
          `;
          break;
        
        case 'contatti':
          content = `
            <h1>Contatti MUV Fitness</h1>
            <p>Prenota la tua consulenza gratuita e scopri come possiamo aiutarti a raggiungere i tuoi obiettivi di fitness.</p>
            <h2>Informazioni di Contatto</h2>
            <p>Telefono: +39 351 338 0770</p>
            <p>Email: info@muvfitness.it</p>
            <p>Indirizzo: Via Venti Settembre, 5/7 - 37045 Legnago (VR)</p>
            <h2>Orari di Apertura</h2>
            <p>Lunedì - Venerdì: 08:00 - 21:00</p>
            <p>Sabato: 08:00 - 12:00</p>
            <p>Domenica: Chiuso</p>
          `;
          break;
        
        case 'chi-siamo':
          content = `
            <h1>Chi Siamo - MUV Fitness</h1>
            <p>MUV Fitness è un centro fitness esclusivo a Legnago che offre un approccio personalizzato al benessere e alla forma fisica.</p>
            <h2>La Nostra Missione</h2>
            <p>Aiutare le persone a raggiungere i loro obiettivi di fitness attraverso programmi personalizzati e tecnologie avanzate.</p>
            <h2>Il Nostro Approccio</h2>
            <p>Combiniamo personal training, tecnologie innovative, consulenza nutrizionale e supporto psicologico per un approccio olistico al benessere.</p>
          `;
          break;
        
        case 'blog':
          content = `
            <h1>Blog MUV Fitness</h1>
            <p>Articoli professionali su fitness, nutrizione, benessere e salute. Consigli pratici dai nostri esperti per migliorare il tuo stile di vita.</p>
            <h2>Categorie</h2>
            <ul>
              <li>Allenamento e Fitness</li>
              <li>Nutrizione Sportiva</li>
              <li>Benessere e Salute</li>
              <li>Postura e Riabilitazione</li>
              <li>Psicologia del Fitness</li>
            </ul>
          `;
          break;
      }
      
      // Safe DOM manipulation instead of innerHTML
      staticSection.textContent = content + additionalContent;
      
      // Rimuovi contenuto precedente
      const existing = document.getElementById('static-fallback');
      if (existing) {
        existing.remove();
      }
      
      document.body.appendChild(staticSection);
    };
    
    generateStaticContent();
    
    return () => {
      const staticContent = document.getElementById('static-fallback');
      if (staticContent) {
        staticContent.remove();
      }
    };
  }, [pageType, additionalContent]);

  return null;
};

export default StaticContentGenerator;
