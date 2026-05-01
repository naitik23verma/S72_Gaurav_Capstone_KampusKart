import { useState, useEffect, useCallback, useMemo } from 'react';
import { Facility, FacilityFilters } from '../types';
import { facilitiesApi } from '../api';

export const useFacilities = (token: string | null) => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<FacilityFilters>({
    type: 'All',
    search: '',
    page: 1,
  });

  const itemsPerPage = 100; // Facilities are usually not too many, can fetch more at once or use pagination

  const fetchFacilities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await facilitiesApi.listFacilities(token || '', filters, itemsPerPage);
      setFacilities(data.facilities || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch facilities');
    } finally {
      setLoading(false);
    }
  }, [token, filters]);

  useEffect(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  const updateFilters = useCallback((newFilters: Partial<FacilityFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const refresh = useCallback(() => {
    fetchFacilities();
  }, [fetchFacilities]);

  const removeFacility = useCallback(async (id: string) => {
    if (!token) return false;
    try {
      await facilitiesApi.deleteFacility(token, id);
      setFacilities(prev => prev.filter(f => f._id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete facility');
      return false;
    }
  }, [token]);

  return {
    facilities,
    loading,
    error,
    filters,
    updateFilters,
    refresh,
    removeFacility,
  };
};
