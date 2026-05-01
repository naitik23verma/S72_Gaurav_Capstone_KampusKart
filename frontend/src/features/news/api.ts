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
    return response.json();
  },
};
