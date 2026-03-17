import { useState, useEffect, useCallback } from 'react';
import { API_BASE } from '../config';

interface ServerStatus {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  checkStatus: () => Promise<void>;
}

export const useServerStatus = (): ServerStatus => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE}/api/server-status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setIsReady(true);
        setError(null);
      } else {
        setError('Server not ready');
        setIsReady(false);
      }
    } catch (err) {
      setError('Server is starting up...');
      setIsReady(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkStatus();
  }, [checkStatus]);

  return {
    isReady,
    isLoading,
    error,
    checkStatus,
  };
}; 