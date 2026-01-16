/**
 * Helper Functions Tests
 * Testing utility functions used throughout the application
 */

// Helper function to format dates
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

// Helper function to truncate text
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Helper function to capitalize first letter
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Helper function to validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to get item badge color
export const getItemBadgeClass = (type) => {
  return type === 'lost' ? 'badge-lost' : 'badge-found';
};

describe('Helper Functions', () => {
  describe('formatDate', () => {
    test('formats valid date string', () => {
      const date = '2026-01-17T00:00:00.000Z';
      const formatted = formatDate(date);
      
      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
    });

    test('returns empty string for null', () => {
      expect(formatDate(null)).toBe('');
    });

    test('returns empty string for undefined', () => {
      expect(formatDate(undefined)).toBe('');
    });

    test('returns empty string for empty string', () => {
      expect(formatDate('')).toBe('');
    });
  });

  describe('truncateText', () => {
    test('truncates text longer than maxLength', () => {
      const text = 'This is a very long text that needs to be truncated';
      const result = truncateText(text, 20);
      
      expect(result).toBe('This is a very long ...');
      expect(result.length).toBe(23); // 20 + '...'
    });

    test('returns original text if shorter than maxLength', () => {
      const text = 'Short text';
      const result = truncateText(text, 20);
      
      expect(result).toBe('Short text');
    });

    test('returns empty string for null', () => {
      expect(truncateText(null, 10)).toBe('');
    });

    test('returns empty string for undefined', () => {
      expect(truncateText(undefined, 10)).toBe('');
    });

    test('handles exact length match', () => {
      const text = 'Exactly twenty chars';
      const result = truncateText(text, 20);
      
      expect(result).toBe('Exactly twenty chars');
    });
  });

  describe('capitalizeFirst', () => {
    test('capitalizes first letter of lowercase string', () => {
      expect(capitalizeFirst('hello')).toBe('Hello');
    });

    test('keeps already capitalized string', () => {
      expect(capitalizeFirst('Hello')).toBe('Hello');
    });

    test('handles single character', () => {
      expect(capitalizeFirst('a')).toBe('A');
    });

    test('returns empty string for null', () => {
      expect(capitalizeFirst(null)).toBe('');
    });

    test('returns empty string for undefined', () => {
      expect(capitalizeFirst(undefined)).toBe('');
    });

    test('handles all caps string', () => {
      expect(capitalizeFirst('HELLO')).toBe('HELLO');
    });
  });

  describe('isValidEmail', () => {
    test('validates correct email format', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.com')).toBe(true);
    });

    test('rejects invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('invalid@.com')).toBe(false);
      expect(isValidEmail('invalid @example.com')).toBe(false);
    });

    test('rejects empty string', () => {
      expect(isValidEmail('')).toBe(false);
    });

    test('rejects null', () => {
      expect(isValidEmail(null)).toBe(false);
    });

    test('rejects undefined', () => {
      expect(isValidEmail(undefined)).toBe(false);
    });
  });

  describe('getItemBadgeClass', () => {
    test('returns correct class for lost items', () => {
      expect(getItemBadgeClass('lost')).toBe('badge-lost');
    });

    test('returns correct class for found items', () => {
      expect(getItemBadgeClass('found')).toBe('badge-found');
    });

    test('returns found class for unknown type', () => {
      expect(getItemBadgeClass('unknown')).toBe('badge-found');
    });

    test('returns found class for empty string', () => {
      expect(getItemBadgeClass('')).toBe('badge-found');
    });
  });
});
