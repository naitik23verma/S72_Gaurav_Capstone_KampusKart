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
    return response.json();
  },
};
