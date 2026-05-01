import { useState, useEffect, useCallback } from 'react';
import { Event, EventFilters } from '../types';
import { eventsApi } from '../api';

export const useEvents = (token: string | null) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  
  const [filters, setFilters] = useState<EventFilters>({
    status: 'All',
    search: '',
    page: 1,
  });

  const itemsPerPage = 9;

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Note: If token is null, we might still be able to list events (public)
      // but some actions might require it.
      const data = await eventsApi.listEvents(token || '', filters, itemsPerPage);
      
      if (Array.isArray(data)) {
        // Fallback for when API returns array directly instead of {events, totalPages}
        setEvents(data);
        setTotalPages(1);
      } else {
        setEvents(data.events || []);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  }, [token, filters]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const updateFilters = useCallback((newFilters: Partial<EventFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const refresh = useCallback(() => {
    fetchEvents();
  }, [fetchEvents]);

  const removeEvent = useCallback(async (id: string) => {
    if (!token) return false;
    try {
      await eventsApi.deleteEvent(token, id);
      setEvents(prev => prev.filter(e => e._id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete event');
      return false;
    }
  }, [token]);

  return {
    events,
    loading,
    error,
    totalPages,
    filters,
    updateFilters,
    setPage,
    refresh,
    removeEvent,
  };
};
