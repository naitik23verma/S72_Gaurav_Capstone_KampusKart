/**
 * HTML Sanitization Utilities
 * Prevents XSS attacks by sanitizing user-generated content
 */

/**
 * Sanitizes HTML content by removing potentially dangerous tags and attributes
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (html: string): string => {
  if (!html) return '';
  
  // Create a temporary div to parse HTML
  const temp = document.createElement('div');
  temp.textContent = html; // This automatically escapes HTML
  return temp.innerHTML;
};

/**
 * Sanitizes text for display (escapes HTML entities)
 * @param text - The text to sanitize
 * @returns Sanitized text
 */
export const sanitizeText = (text: string): string => {
  if (!text) return '';
  
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/**
 * Validates and sanitizes URLs to prevent javascript: protocol injection
 * @param url - The URL to validate
 * @returns Sanitized URL or empty string if invalid
 */
export const sanitizeURL = (url: string): string => {
  if (!url) return '';
  
  const trimmedUrl = url.trim().toLowerCase();
  
  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  if (dangerousProtocols.some(protocol => trimmedUrl.startsWith(protocol))) {
    console.warn('Blocked dangerous URL protocol:', url);
    return '';
  }
  
  // Allow http, https, mailto, tel
  const allowedProtocols = ['http://', 'https://', 'mailto:', 'tel:'];
  const hasAllowedProtocol = allowedProtocols.some(protocol => 
    trimmedUrl.startsWith(protocol)
  );
  
  // If no protocol, assume https
  if (!hasAllowedProtocol && !trimmedUrl.includes('://')) {
    return `https://${url.trim()}`;
  }
  
  return hasAllowedProtocol ? url.trim() : '';
};

/**
 * Sanitizes user input for safe display
 * @param input - The user input to sanitize
 * @returns Sanitized input
 */
export const sanitizeUserInput = (input: string): string => {
  if (!input) return '';
  
  // Remove any HTML tags
  const withoutTags = input.replace(/<[^>]*>/g, '');
  
  // Escape special characters
  return sanitizeText(withoutTags);
};
