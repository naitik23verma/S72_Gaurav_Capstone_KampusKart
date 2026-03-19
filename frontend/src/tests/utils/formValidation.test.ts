import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePhone,
  validateUrl,
  validateRequired,
  validateFileSize,
  validateMultipleRequired,
} from '../../utils/formValidation';

describe('validateEmail', () => {
  it('accepts a valid email', () => {
    expect(validateEmail('user@example.com').isValid).toBe(true);
  });

  it('rejects an email without @', () => {
    expect(validateEmail('notanemail').isValid).toBe(false);
  });

  it('returns valid for empty string (email is optional)', () => {
    expect(validateEmail('').isValid).toBe(true);
  });
});

describe('validatePhone', () => {
  it('accepts a valid 10-digit phone', () => {
    expect(validatePhone('9876543210').isValid).toBe(true);
  });

  it('accepts phone with spaces and dashes', () => {
    expect(validatePhone('+91 98765-43210').isValid).toBe(true);
  });

  it('rejects a phone with fewer than 10 digits', () => {
    expect(validatePhone('12345').isValid).toBe(false);
  });

  it('returns valid for empty string (phone is optional)', () => {
    expect(validatePhone('').isValid).toBe(true);
  });
});

describe('validateUrl', () => {
  it('accepts a valid https URL', () => {
    expect(validateUrl('https://example.com').isValid).toBe(true);
  });

  it('accepts a valid http URL', () => {
    expect(validateUrl('http://example.com/path').isValid).toBe(true);
  });

  it('rejects a malformed URL', () => {
    expect(validateUrl('not a url').isValid).toBe(false);
  });

  it('returns valid for empty string (URL is optional)', () => {
    expect(validateUrl('').isValid).toBe(true);
  });
});

describe('validateRequired', () => {
  it('passes for a non-empty string', () => {
    expect(validateRequired('hello', 'Field').isValid).toBe(true);
  });

  it('fails for an empty string', () => {
    const result = validateRequired('', 'Title');
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Title');
  });

  it('fails for a whitespace-only string', () => {
    expect(validateRequired('   ', 'Name').isValid).toBe(false);
  });
});

describe('validateFileSize', () => {
  const makeFile = (sizeBytes: number) =>
    new File(['x'.repeat(sizeBytes)], 'test.jpg', { type: 'image/jpeg' });

  it('passes for a file under the limit', () => {
    expect(validateFileSize(makeFile(1024 * 1024), 5).isValid).toBe(true); // 1MB < 5MB
  });

  it('fails for a file over the limit', () => {
    expect(validateFileSize(makeFile(6 * 1024 * 1024), 5).isValid).toBe(false); // 6MB > 5MB
  });
});

describe('validateMultipleRequired', () => {
  it('passes when all fields are filled', () => {
    const result = validateMultipleRequired([
      { value: 'Title', name: 'Title' },
      { value: 'Description', name: 'Description' },
    ]);
    expect(result.isValid).toBe(true);
  });

  it('fails and names the first empty field', () => {
    const result = validateMultipleRequired([
      { value: 'Title', name: 'Title' },
      { value: '', name: 'Location' },
    ]);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Location');
  });
});
