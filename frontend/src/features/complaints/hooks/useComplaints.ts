import { useState, useEffect, useCallback, useRef } from 'react';
import { Complaint, ComplaintFilters } from '../types';
import { complaintsApi } from '../api';

export const useComplaints = (token: string | null) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  const [filters, setFilters] = useState<ComplaintFilters>({
    status: 'All',
    category: 'all',
    search: '',
    page: 1,
  });

  const itemsPerPage = 9;

  const fetchComplaints = useCallback(async (currentFilters: ComplaintFilters, isMore = false) => {
    if (!token) return;

    try {
      if (!isMore) {
        if (currentFilters.page === 1 && complaints.length === 0) {
          setLoading(true);
        } else {
          setIsFiltering(true);
        }
      } else {
        setIsFetchingMore(true);
      }

      setError(null);
      const data = await complaintsApi.listComplaints(token, currentFilters, itemsPerPage);

      if (isMore) {
        setComplaints(prev => [...prev, ...data.complaints]);
      } else {
        setComplaints(data.complaints);
      }
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch complaints');
    } finally {
      setLoading(false);
      setIsFiltering(false);
      setIsFetchingMore(false);
    }
  }, [token, complaints.length]);

  useEffect(() => {
    fetchComplaints(filters);
  }, [token, filters.status, filters.category, filters.search, fetchComplaints]);

  useEffect(() => {
    if (filters.page > 1) {
      fetchComplaints(filters, true);
    }
  }, [filters.page, fetchComplaints]);

  const setPage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<ComplaintFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const refresh = useCallback(() => {
    fetchComplaints(filters);
  }, [fetchComplaints, filters]);

  const removeComplaint = useCallback(async (id: string) => {
    if (!token) return false;
    try {
      await complaintsApi.deleteComplaint(token, id);
      setComplaints(prev => prev.filter(c => c._id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete complaint');
      return false;
    }
  }, [token]);

  return {
    complaints,
    loading,
    error,
    totalPages,
    isFetchingMore,
    isFiltering,
    filters,
    updateFilters,
    setPage,
    refresh,
    removeComplaint,
  };
};
