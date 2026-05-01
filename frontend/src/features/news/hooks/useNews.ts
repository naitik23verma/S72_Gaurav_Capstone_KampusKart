import { useState, useEffect, useCallback } from 'react';
import { NewsItem, NewsFilters } from '../types';
import { newsApi } from '../api';

export const useNews = (token: string | null) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<NewsFilters>({
    category: 'All',
    search: '',
    page: 1,
  });

  const itemsPerPage = 100;

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsApi.listNews(token || '', filters, itemsPerPage);
      setNews(data.news || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, [token, filters]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const updateFilters = useCallback((newFilters: Partial<NewsFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const refresh = useCallback(() => {
    fetchNews();
  }, [fetchNews]);

  const removeNews = useCallback(async (id: string) => {
    if (!token) return false;
    try {
      await newsApi.deleteNews(token, id);
      setNews(prev => prev.filter(n => n._id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete news');
      return false;
    }
  }, [token]);

  return {
    news,
    loading,
    error,
    filters,
    updateFilters,
    refresh,
    removeNews,
  };
};
