import { useMemo } from 'react';
import DOMPurify from 'dompurify';

export const useInputValidation = () => {
  // Rate limiting state for validation attempts
  const rateLimitMap = new Map<string, { count: number; lastAttempt: number }>();

  const checkRateLimit = (identifier: string, maxAttempts = 10, windowMs = 60000) => {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);
    
    if (!record) {
      rateLimitMap.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }
    
    if (now - record.lastAttempt > windowMs) {
      rateLimitMap.set(identifier, { count: 1, lastAttempt: now });
      return true;
    }
    
    if (record.count >= maxAttempts) {
      return false;
    }
    
    record.count++;
    record.lastAttempt = now;
    return true;
  };
  const validators = useMemo(() => ({
    // Email validation
    email: (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && email.length <= 254;
    },

    // Password strength validation
    password: (password: string): { isValid: boolean; message: string } => {
      if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters long' };
      }
      if (!/(?=.*[a-z])/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter' };
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter' };
      }
      if (!/(?=.*\d)/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one number' };
      }
      if (!/(?=.*[@$!%*?&])/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one special character' };
      }
      if (password.length > 128) {
        return { isValid: false, message: 'Password must be less than 128 characters' };
      }
      return { isValid: true, message: 'Password is strong' };
    },

    // Phone number validation
    phone: (phone: string): boolean => {
      const phoneRegex = /^[+]?[\d\s\-\(\)]{10,15}$/;
      return phoneRegex.test(phone);
    },

    // Name validation (no special characters except spaces, hyphens, apostrophes)
    name: (name: string): boolean => {
      const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']{1,50}$/;
      return nameRegex.test(name);
    },

    // General text input validation (prevent XSS)
    text: (text: string, maxLength: number = 1000): { isValid: boolean; sanitized: string } => {
      if (text.length > maxLength) {
        return { isValid: false, sanitized: '' };
      }
      
      // Sanitize HTML content
      const sanitized = DOMPurify.sanitize(text, { 
        ALLOWED_TAGS: [], 
        ALLOWED_ATTR: [] 
      });
      
      return { isValid: true, sanitized };
    },

    // URL validation
    url: (url: string): boolean => {
      try {
        const urlObj = new URL(url);
        return ['http:', 'https:'].includes(urlObj.protocol);
      } catch {
        return false;
      }
    },

    // Slug validation for blog posts
    slug: (slug: string): boolean => {
      const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      return slugRegex.test(slug) && slug.length <= 100;
    }
  }), []);

  const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'blockquote', 'a'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      ALLOW_DATA_ATTR: false
    });
  };

  return {
    validators,
    sanitizeHtml
  };
};