import { API_BASE } from '../../config';
import { Club, ClubFilters } from './types';

export const clubsApi = {
  listClubs: async (
    token: string,
    filters: ClubFilters,
    itemsPerPage: number
  ): Promise<{ clubs: Club[]; totalItems?: number; totalPages?: number }> => {
    const params = new URLSearchParams({
      page: String(filters.page),
      limit: String(itemsPerPage),
      ...(filters.status !== 'all' && { status: filters.status }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await fetch(`${API_BASE}/api/clubs?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch clubs');
    
    const data = await response.json();
    if (Array.isArray(data)) {
      return { clubs: data, totalPages: 1 };
    }
    return { clubs: data.clubs || [], totalPages: data.totalPages || 1 };
  },

  createClub: async (token: string, formData: FormData): Promise<Club> => {
    const response = await fetch(`${API_BASE}/api/clubs`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create club recruitment');
    return response.json();
  },

  updateClub: async (token: string, id: string, formData: FormData): Promise<Club> => {
    const response = await fetch(`${API_BASE}/api/clubs/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update club recruitment');
    return response.json();
  },

  deleteClub: async (token: string, id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/api/clubs/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete club recruitment');
    return response.json();
  },
};
