import { API_BASE } from '../../config';
import { NewsItem, NewsFilters } from './types';

export const newsApi = {
  listNews: async (
    token: string,
    filters: NewsFilters,
    itemsPerPage: number
  ): Promise<{ news: NewsItem[]; totalItems?: number; totalPages?: number }> => {
    const params = new URLSearchParams({
      page: String(filters.page),
      limit: String(itemsPerPage),
      ...(filters.category !== 'All' && { category: filters.category }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await fetch(`${API_BASE}/api/news?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch news');
    
    const data = await response.json();
    if (Array.isArray(data)) {
      return { news: data, totalPages: 1 };
    }
    return { news: data.news || [], totalPages: data.totalPages || 1 };
  },

  createNews: async (token: string, formData: FormData): Promise<NewsItem> => {
    const response = await fetch(`${API_BASE}/api/news`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create news');
    return response.json();
  },

  updateNews: async (token: string, id: string, formData: FormData): Promise<NewsItem> => {
    const response = await fetch(`${API_BASE}/api/news/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update news');
    return response.json();
  },

  deleteNews: async (token: string, id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/api/news/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete news');
    return response.json();
  },
};
