import DOMPurify from 'dompurify';
import { useMemo } from 'react';

interface SecureHTMLRendererProps {
  html: string;
  className?: string;
  allowedTags?: string[];
  allowedAttributes?: string[];
}

export const SecureHTMLRenderer = ({ 
  html, 
  className = '',
  allowedTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'strong', 'em', 'u', 'i',
    'ul', 'ol', 'li',
    'a', 'img',
    'blockquote', 'code', 'pre'
  ],
  allowedAttributes = ['href', 'src', 'alt', 'title', 'class', 'loading', 'decoding']
}: SecureHTMLRendererProps) => {
  const sanitizedHTML = useMemo(() => {
    const cleanHTML = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: allowedAttributes,
      FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
      FORBID_ATTR: ['onload', 'onerror', 'onclick', 'onmouseover'],
      ADD_ATTR: ['target'],
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM: false,
      WHOLE_DOCUMENT: false
    });

    // Post-process to ensure all external links have proper security attributes
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cleanHTML;
    
    // Fix external links
    const links = tempDiv.querySelectorAll('a[target="_blank"]');
    links.forEach(link => {
      link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Fix image URLs - ensure Supabase storage images have correct URLs
    const images = tempDiv.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        // If it's a Supabase storage URL but doesn't include the full domain, fix it
        if (src.startsWith('/storage/v1/object/public/immagini/') || 
            src.includes('supabase.co/storage/v1/object/public/immagini/')) {
          // URL is already correct
        } else if (src.startsWith('blog/') || src.includes('immagini/blog/')) {
          // Convert relative storage path to full URL
          const cleanPath = src.replace(/^.*?blog\//, 'blog/');
          const fullUrl = `https://baujoowgqeyraqnukkmw.supabase.co/storage/v1/object/public/immagini/${cleanPath}`;
          img.setAttribute('src', fullUrl);
        }
        
        // Add performance attributes if not present
        if (!img.getAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.getAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      }
    });
    
    return tempDiv.innerHTML;
  }, [html, allowedTags, allowedAttributes]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};