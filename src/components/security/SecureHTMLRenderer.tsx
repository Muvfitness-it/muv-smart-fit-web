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
  allowedAttributes = ['href', 'src', 'alt', 'title', 'class']
}: SecureHTMLRendererProps) => {
  const sanitizedHTML = useMemo(() => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: allowedAttributes,
      FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input'],
      FORBID_ATTR: ['onload', 'onerror', 'onclick', 'onmouseover'],
      ADD_ATTR: ['target'],
      RETURN_DOM_FRAGMENT: false,
      RETURN_DOM: false,
      WHOLE_DOCUMENT: false
    });
  }, [html, allowedTags, allowedAttributes]);

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};