import React from 'react';
import DOMPurify from 'dompurify';

interface ArticleContentParserProps {
  content: string;
}

// Clean up common markdown-like artifacts (e.g., **bold**, # headings, stray asterisks)
const cleanHTML = (html: string) => {
  // 0) Sanitize first for safety
  let sanitized = DOMPurify.sanitize(html);

  // 1) Light markdown cleanup before DOM processing
  sanitized = sanitized.replace(/<p>\s*([#>*\-]{1,6})\s+/g, '<p>');
  sanitized = sanitized.replace(/<p>\s*\*\*(.+?)\*\*\s*<\/p>/g, '<p><strong>$1<\/strong><\/p>');
  sanitized = sanitized.replace(/<p>\s*__(.+?)__\s*<\/p>/g, '<p><strong>$1<\/strong><\/p>');
  sanitized = sanitized.replace(/<p>\s*[#*\-]+\s*<\/p>/g, '');
  sanitized = sanitized.replace(/(?:<p>\s*<\/p>\s*){2,}/g, '<p></p>');

  try {
    // 2) Parse into a DOM for robust fixes
    const parser = new DOMParser();
    const doc = parser.parseFromString(sanitized, 'text/html');
    const body = doc.body;

    // Ensure all images are lazy and have decoding + alt
    body.querySelectorAll('img').forEach((img) => {
      if (!img.getAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.getAttribute('decoding')) img.setAttribute('decoding', 'async');
      if (!img.getAttribute('alt')) img.setAttribute('alt', 'Immagine articolo MUV Fitness');
      // Remove width/height that break layout if absurdly large strings
      const w = Number(img.getAttribute('width') || 0);
      const h = Number(img.getAttribute('height') || 0);
      if (w > 4096 || h > 4096) {
        img.removeAttribute('width');
        img.removeAttribute('height');
      }
    });

    // Helper to unwrap a node (replace tag with its children)
    const unwrap = (el: Element) => {
      const parent = el.parentNode;
      if (!parent) return;
      while (el.firstChild) parent.insertBefore(el.firstChild, el);
      parent.removeChild(el);
    };

    // 3) Reduce excessive bold inside paragraphs and list items
    body.querySelectorAll('p, li').forEach((el) => {
      const textLen = (el.textContent || '').trim().length;
      const strongs = Array.from(el.querySelectorAll('strong, b'));
      if (strongs.length === 1) {
        const s = strongs[0];
        if ((s.textContent || '').trim() === (el.textContent || '').trim()) {
          // Entire element was bold -> unwrap
          unwrap(s);
          return;
        }
      }
      let strongTotal = 0;
      strongs.forEach((s) => (strongTotal += (s.textContent || '').length));
      strongs.forEach((s) => {
        const len = (s.textContent || '').length;
        // Unwrap very long bold spans or when bold dominates the element
        if (len >= 50 || (textLen > 0 && len / textLen > 0.6) || strongTotal / Math.max(textLen, 1) > 0.7) {
          unwrap(s);
        }
      });
    });

    // 4) Normalize and deduplicate "Prossimi passi" blocks
    const isNextSteps = (txt: string) => /prossimi\s+passi/i.test(txt || '');
    let nextStepsFound = 0;

    // Convert <p><strong>Prossimi passi...</strong></p> into proper <h2>
    body.querySelectorAll('p').forEach((p) => {
      const onlyChild = p.childNodes.length === 1 ? (p.childNodes[0] as Element) : null;
      if (onlyChild && (onlyChild.tagName === 'STRONG' || onlyChild.tagName === 'B')) {
        const text = (onlyChild.textContent || '').trim();
        if (isNextSteps(text)) {
          const h2 = doc.createElement('h2');
          h2.textContent = text;
          p.parentElement?.insertBefore(h2, p);
          p.remove();
        }
      }
    });

    // Deduplicate: keep first heading and remove subsequent heading + immediate list
    Array.from(body.querySelectorAll('h1,h2,h3')).forEach((h) => {
      const text = (h.textContent || '').trim();
      if (isNextSteps(text)) {
        nextStepsFound += 1;
        if (nextStepsFound > 1) {
          const toRemove: Element[] = [h];
          const sib = h.nextElementSibling;
          if (sib && (sib.tagName === 'UL' || sib.tagName === 'OL')) toRemove.push(sib);
          toRemove.forEach((el) => el.remove());
        }
      }
    });

    // 5) Remove consecutive duplicated link lists anywhere
    const lists = Array.from(body.querySelectorAll('ul,ol'));
    for (let i = 1; i < lists.length; i++) {
      const prev = lists[i - 1];
      const curr = lists[i];
      if (prev.outerHTML === curr.outerHTML) curr.remove();
    }

    sanitized = body.innerHTML;
  } catch (e) {
    // Fallbacks with regex if DOMParser fails
    sanitized = sanitized.replace(/<img([^>]*)>/gi, (match, attrs) => {
      let newAttrs = attrs || '';
      if (!/\bloading\s*=/.test(newAttrs)) newAttrs += ' loading="lazy"';
      if (!/\bdecoding\s*=/.test(newAttrs)) newAttrs += ' decoding="async"';
      if (!/\balt\s*=/.test(newAttrs)) newAttrs += ' alt="Immagine articolo MUV Fitness"';
      return `<img${newAttrs}>`;
    });

    // Unwrap very long bold paragraphs
    sanitized = sanitized.replace(/<p>\s*<strong>([\s\S]{60,}?)<\/strong>\s*<\/p>/gi, '<p>$1<\/p>');
    sanitized = sanitized.replace(/<p>\s*<b>([\s\S]{60,}?)<\/b>\s*<\/p>/gi, '<p>$1<\/p>');
    sanitized = sanitized.replace(/<strong>([^<]{50,})<\/strong>/gi, '$1');

    // Deduplicate simple next-steps blocks
    let count = 0;
    sanitized = sanitized.replace(/<h2[^>]*>\s*Prossimi\s+passi[^<]*<\/h2>[\s\S]*?<ul[\s\S]*?<\/ul>/gi, (m) => {
      count++; return count === 1 ? m : ''; 
    });

    sanitized = sanitized.replace(/(\s*<ul[\s\S]*?<\/ul>)(\s*\1)+$/i, '$1');
  }

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