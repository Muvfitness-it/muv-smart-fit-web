
/**
 * Security utilities for input validation and sanitization
 */

export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') return '';
  
  return input
    .trim()
    .substring(0, maxLength)
    .replace(/[<>]/g, '') // Remove angle brackets to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
}

export function validateQuestion(question: string): { isValid: boolean; error?: string } {
  if (!question || typeof question !== 'string') {
    return { isValid: false, error: 'Domanda non valida' };
  }
  
  const sanitized = question.trim();
  
  if (sanitized.length < 3) {
    return { isValid: false, error: 'La domanda deve essere di almeno 3 caratteri' };
  }
  
  if (sanitized.length > 500) {
    return { isValid: false, error: 'La domanda non può superare i 500 caratteri' };
  }
  
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      return { isValid: false, error: 'Contenuto non consentito nella domanda' };
    }
  }
  
  return { isValid: true };
}

export function sanitizeResponse(response: string): string {
  if (!response || typeof response !== 'string') return '';
  
  return response
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, 10000); // Limit response length
}
