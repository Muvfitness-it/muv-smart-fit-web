import React from 'react';
import DOMPurify from 'dompurify';

interface ArticleContentParserProps {
  content: string;
}

// Clean up common markdown-like artifacts (e.g., **bold**, # headings, stray asterisks)
const cleanHTML = (html: string) => {
  // Sanitize first for safety
  let sanitized = DOMPurify.sanitize(html);

  // Remove markdown heading/bullet markers that slipped into paragraphs
  sanitized = sanitized.replace(/<p>\s*([#>*\-]{1,6})\s+/g, '<p>');

  // Convert simple **bold** or __bold__ patterns inside paragraphs to <strong>
  sanitized = sanitized.replace(/<p>\s*\*\*(.+?)\*\*\s*<\/p>/g, '<p><strong>$1<\/strong><\/p>');
  sanitized = sanitized.replace(/<p>\s*__(.+?)__\s*<\/p>/g, '<p><strong>$1<\/strong><\/p>');

  // Remove paragraphs that contain only marker characters
  sanitized = sanitized.replace(/<p>\s*[#*\-]+\s*<\/p>/g, '');

  // Collapse excessive empty paragraphs
  sanitized = sanitized.replace(/(?:<p>\s*<\/p>\s*){2,}/g, '<p></p>');

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