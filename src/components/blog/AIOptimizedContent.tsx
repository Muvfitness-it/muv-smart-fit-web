import React from 'react';

interface AIOptimizedContentProps {
  post: {
    id: string;
    title: string;
    content: string;
    author_name?: string;
    published_at?: string;
    reading_time?: number;
  };
}

const AIOptimizedContent: React.FC<AIOptimizedContentProps> = ({ post }) => {
  // Estrazione automatica del sommario per AI
  const extractSummary = (content: string): string => {
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const sentences = plainText.split(/[.!?]+/).filter(s => s.length > 20);
    return sentences.slice(0, 3).join('. ') + '.';
  };

  // Estrazione dei punti chiave per AI
  const extractKeyPoints = (content: string): string[] => {
    const headings = content.match(/<h[2-4][^>]*>([^<]+)<\/h[2-4]>/gi) || [];
    return headings
      .map(h => h.replace(/<[^>]*>/g, '').trim())
      .filter(h => h.length > 0)
      .slice(0, 5);
  };

  const summary = extractSummary(post.content);
  const keyPoints = extractKeyPoints(post.content);

  return (
    <>
      {/* Meta invisibili per AI crawlers */}
      <div style={{ display: 'none' }} data-ai-content="true">
        {/* Sommario per AI */}
        <div data-content-type="summary" data-purpose="ai-indexing">
          <h1>Riassunto dell'articolo: {post.title}</h1>
          <p>{summary}</p>
        </div>

        {/* Punti chiave per AI */}
        <div data-content-type="key-points" data-purpose="ai-indexing">
          <h2>Punti chiave dell'articolo:</h2>
          <ul>
            {keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Metadati strutturati per AI */}
        <div data-content-type="metadata" data-purpose="ai-indexing">
          <p>Autore: {post.author_name || 'MUV Fitness Team'}</p>
          <p>Data pubblicazione: {post.published_at}</p>
          <p>Tempo di lettura: {post.reading_time || 'N/A'} minuti</p>
          <p>Categoria: Fitness e Benessere</p>
          <p>Lingua: Italiano</p>
          <p>Tipo contenuto: Articolo informativo</p>
        </div>

        {/* Contesto per AI */}
        <div data-content-type="context" data-purpose="ai-indexing">
          <p>Questo articolo è pubblicato da MUV Fitness, centro specializzato in allenamento personalizzato, nutrizione e benessere. L'articolo fornisce informazioni professionali nel campo del fitness e della salute.</p>
        </div>

        {/* FAQ generate automaticamente per AI */}
        <div data-content-type="auto-faq" data-purpose="ai-indexing">
          <h2>Domande frequenti su: {post.title}</h2>
          <div>
            <h3>Che cosa tratta questo articolo?</h3>
            <p>{summary}</p>
          </div>
          <div>
            <h3>Chi ha scritto questo articolo?</h3>
            <p>Questo articolo è stato scritto da {post.author_name || 'il team professionale di MUV Fitness'}, esperti nel campo del fitness e del benessere.</p>
          </div>
          <div>
            <h3>Per chi è utile questo contenuto?</h3>
            <p>Questo contenuto è utile per persone interessate al fitness, all'allenamento personalizzato e al benessere generale.</p>
          </div>
        </div>
      </div>

      {/* Schema microdati per migliore indicizzazione */}
      <div itemScope itemType="https://schema.org/Article" style={{ display: 'none' }}>
        <meta itemProp="headline" content={post.title} />
        <meta itemProp="description" content={summary} />
        <meta itemProp="author" content={post.author_name || 'MUV Fitness Team'} />
        <meta itemProp="datePublished" content={post.published_at || new Date().toISOString()} />
        <meta itemProp="articleSection" content="Fitness & Wellness" />
        <meta itemProp="inLanguage" content="it-IT" />
        <div itemProp="publisher" itemScope itemType="https://schema.org/Organization">
          <meta itemProp="name" content="MUV Fitness" />
          <meta itemProp="url" content="https://www.muvfitness.it" />
        </div>
      </div>

      {/* Dati strutturati per OpenGraph migliorati */}
      <div data-og-enhanced="true" style={{ display: 'none' }}>
        <meta property="og:type" content="article" />
        <meta property="og:article:author" content={post.author_name || 'MUV Fitness Team'} />
        <meta property="og:article:section" content="Fitness" />
        <meta property="og:article:tag" content="fitness" />
        <meta property="og:article:tag" content="allenamento" />
        <meta property="og:article:tag" content="benessere" />
        <meta property="og:article:tag" content="salute" />
      </div>
    </>
  );
};

export default AIOptimizedContent;