import { API_BASE } from '../../config';
import { LostFoundItem, LostFoundFilters } from './types';

export const lostFoundApi = {
  listItems: async (
    token: string,
    filters: LostFoundFilters,
    itemsPerPage: number
  ): Promise<{ items: LostFoundItem[]; totalItems: number; totalPages: number }> => {
    const params = new URLSearchParams({
      page: String(filters.page),
      limit: String(itemsPerPage),
      ...(filters.type !== 'all' && { type: filters.type }),
      ...(filters.resolved !== 'all' && { resolved: filters.resolved === 'resolved' }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await fetch(`${API_BASE}/api/lostfound?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  },

  getSuggestions: async (token: string, query: string): Promise<LostFoundItem[]> => {
    const response = await fetch(`${API_BASE}/api/lostfound/suggestions?query=${encodeURIComponent(query)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch suggestions');
    return response.json();
  },

  getItemById: async (token: string, id: string): Promise<LostFoundItem> => {
    const response = await fetch(`${API_BASE}/api/lostfound/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch item');
    return response.json();
  },

  createItem: async (token: string, formData: FormData): Promise<LostFoundItem> => {
    const response = await fetch(`${API_BASE}/api/lostfound`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create item');
    return response.json();
  },

  updateItem: async (token: string, id: string, formData: FormData): Promise<LostFoundItem> => {
    const response = await fetch(`${API_BASE}/api/lostfound/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update item');
    return response.json();
  },

  deleteItem: async (token: string, id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/api/lostfound/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete item');
    return response.json();
  },

  resolveItem: async (token: string, id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/api/lostfound/${id}/resolve`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to resolve item');
    return response.json();
  },
};
