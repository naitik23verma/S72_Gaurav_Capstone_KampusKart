import { useState, useEffect, useCallback } from 'react';
import { Club, ClubFilters } from '../types';
import { clubsApi } from '../api';

export const useClubs = (token: string | null) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<ClubFilters>({
    status: 'all',
    search: '',
    page: 1,
  });

  const itemsPerPage = 100;

  const fetchClubs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clubsApi.listClubs(token || '', filters, itemsPerPage);
      setClubs(data.clubs || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch clubs');
    } finally {
      setLoading(false);
    }
  }, [token, filters]);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const updateFilters = useCallback((newFilters: Partial<ClubFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const refresh = useCallback(() => {
    fetchClubs();
  }, [fetchClubs]);

  const removeClub = useCallback(async (id: string) => {
    if (!token) return false;
    try {
      await clubsApi.deleteClub(token, id);
      setClubs(prev => prev.filter(c => c._id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete club');
      return false;
    }
  }, [token]);

  return {
    clubs,
    loading,
    error,
    filters,
    updateFilters,
    refresh,
    removeClub,
  };
};
