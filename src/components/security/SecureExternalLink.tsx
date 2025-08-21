import React from 'react';

interface SecureExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const SecureExternalLink: React.FC<SecureExternalLinkProps> = ({
  href,
  children,
  className,
  title
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={className}
      title={title}
      // Security: Prevent window.opener access and referrer leakage
      onClick={(e) => {
        // Additional security check for malicious URLs
        try {
          const url = new URL(href);
          const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
          if (!allowedProtocols.includes(url.protocol)) {
            e.preventDefault();
            console.warn('Blocked potentially unsafe URL:', href);
            return false;
          }
        } catch (error) {
          e.preventDefault();
          console.warn('Invalid URL blocked:', href);
          return false;
        }
      }}
    >
      {children}
    </a>
  );
};