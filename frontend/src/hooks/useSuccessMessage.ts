import { useState, useEffect } from 'react';

/**
 * Custom hook for managing success messages with auto-hide functionality
 * @param duration - Duration in milliseconds before auto-hiding (default: 3000ms)
 */
export const useSuccessMessage = (duration: number = 3000) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [successMessage, duration]);

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
  };

  const clearSuccess = () => {
    setSuccessMessage(null);
  };

  return {
    successMessage,
    showSuccess,
    clearSuccess,
  };
};
