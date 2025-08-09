import React from 'react';
import DOMPurify from 'dompurify';

interface ArticleContentParserProps {
  content: string;
}

// Pulizia conservativa dei simboli markdown preservando tutto il contenuto HTML
const cleanHTML = (html: string) => {
  // Sanitize first for safety
  let sanitized = DOMPurify.sanitize(html);

  // Solo se il contenuto sembra essere markdown puro (non HTML strutturato)
  if (!sanitized.includes('<p>') && !sanitized.includes('<div>') && !sanitized.includes('<h')) {
    // Converti **testo** in <strong>testo</strong> solo se isolato
    sanitized = sanitized.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    
    // Converti __testo__ in <strong>testo</strong> solo se isolato
    sanitized = sanitized.replace(/__([^_\n]+)__/g, '<strong>$1</strong>');
    
    // Aggiungi struttura HTML se è testo puro
    const lines = sanitized.split('\n').filter(line => line.trim());
    sanitized = lines.map(line => `<p>${line.trim()}</p>`).join('');
  } else {
    // Per contenuto già HTML, rimuovi solo simboli markdown chiaramente isolati
    
    // Rimuovi solo asterischi isolati all'inizio o fine di paragrafo
    sanitized = sanitized.replace(/<p>\s*\*+\s*/g, '<p>');
    sanitized = sanitized.replace(/\s*\*+\s*<\/p>/g, '</p>');
    
    // Rimuovi solo hashtag isolati all'inizio di paragrafo
    sanitized = sanitized.replace(/<p>\s*#{1,6}\s*/g, '<p>');
    
    // Rimuovi trattini isolati solo all'inizio di paragrafo
    sanitized = sanitized.replace(/<p>\s*[-*]\s+/g, '<p>');
    
    // Converti pattern **testo** rimanenti in <strong> se chiaramente markdown
    sanitized = sanitized.replace(/\*\*([^*<>]+)\*\*/g, '<strong>$1</strong>');
    sanitized = sanitized.replace(/__([^_<>]+)__/g, '<strong>$1</strong>');
  }

  // Rimuovi solo paragrafi completamente vuoti
  sanitized = sanitized.replace(/<p>\s*<\/p>/g, '');
  
  // Normalizza spazi eccessivi
  sanitized = sanitized.replace(/\s{2,}/g, ' ');

  return sanitized;
};

const ArticleContentParser: React.FC<ArticleContentParserProps> = ({ content }) => {
  const cleaned = cleanHTML(content);
  return (
    <div 
      className="prose prose-lg dark:prose-invert max-w-none
        prose-headings:text-foreground prose-headings:font-bold prose-headings:scroll-mt-24
        prose-h1:text-3xl prose-h1:mb-6 prose-h1:text-primary prose-h1:border-b prose-h1:border-border prose-h1:pb-3
        prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-primary prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
        prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-primary prose-h3:font-semibold
        prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4 prose-h4:text-foreground prose-h4:font-medium
        prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
        prose-strong:text-primary prose-strong:font-semibold
        prose-em:text-muted-foreground prose-em:italic
        prose-a:text-primary prose-a:underline prose-a:decoration-primary/50 hover:prose-a:decoration-primary prose-a:transition-colors
        prose-ul:text-foreground prose-ul:space-y-2 prose-li:mb-1 prose-li:leading-relaxed
        prose-ol:text-foreground prose-ol:list-decimal prose-ol:space-y-2
        prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50
        prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-muted-foreground
        prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:overflow-x-auto
        prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-img:rounded-lg prose-img:shadow-lg prose-img:mb-6 prose-img:w-full prose-img:h-auto
        prose-table:border prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden
        prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
        prose-td:p-3 prose-td:border-t prose-td:border-border prose-td:text-foreground
        selection:bg-primary/20"
      dangerouslySetInnerHTML={{ __html: cleaned }}
    />
  );
};
export default ArticleContentParser;