/**
 * Shared validation utilities for consistent form validation across components
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Standard title validation (3-100 characters)
 */
export const validateTitle = (value: string): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: 'Title is required' };
  }
  if (value.trim().length < 3) {
    return { isValid: false, error: 'Title must be at least 3 characters' };
  }
  if (value.trim().length > 100) {
    return { isValid: false, error: 'Title must be less than 100 characters' };
  }
  return { isValid: true };
};

/**
 * Standard description validation (10-1000 characters)
 */
export const validateDescription = (value: string): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: 'Description is required' };
  }
  if (value.trim().length < 10) {
    return { isValid: false, error: 'Description must be at least 10 characters' };
  }
  if (value.trim().length > 1000) {
    return { isValid: false, error: 'Description must be less than 1000 characters' };
  }
  return { isValid: true };
};

/**
 * Location validation (optional, but if provided must be 3-200 characters)
 */
export const validateLocation = (value: string, required: boolean = true): ValidationResult => {
  if (!value.trim()) {
    if (required) {
      return { isValid: false, error: 'Location is required' };
    }
    return { isValid: true };
  }
  if (value.trim().length < 3) {
    return { isValid: false, error: 'Location must be at least 3 characters' };
  }
  if (value.trim().length > 200) {
    return { isValid: false, error: 'Location must be less than 200 characters' };
  }
  return { isValid: true };
};

/**
 * Date validation (cannot be in the past for events, cannot be in future for lost/found)
 */
export const validateDate = (value: string, allowFuture: boolean = true): ValidationResult => {
  if (!value) {
    return { isValid: false, error: 'Date is required' };
  }
  
  const selectedDate = new Date(value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (allowFuture && selectedDate < today) {
    return { isValid: false, error: 'Event date cannot be in the past' };
  }
  
  if (!allowFuture && selectedDate > today) {
    return { isValid: false, error: 'Date cannot be in the future' };
  }
  
  return { isValid: true };
};

/**
 * Generic required field validation
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
  if (!value || !value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }
  return { isValid: true };
};

/**
 * Validate all fields and return errors object
 */
export const validateFields = (
  fields: Record<string, string>,
  validators: Record<string, (value: string) => ValidationResult>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.entries(fields).forEach(([fieldName, value]) => {
    const validator = validators[fieldName];
    if (validator) {
      const result = validator(value);
      if (!result.isValid && result.error) {
        errors[fieldName] = result.error;
      }
    }
  });
  
  return errors;
};
