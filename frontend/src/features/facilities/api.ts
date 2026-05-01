import { API_BASE } from '../../config';
import { Facility, FacilityFilters } from './types';

export const facilitiesApi = {
  listFacilities: async (
    token: string,
    filters: FacilityFilters,
    itemsPerPage: number
  ): Promise<{ facilities: Facility[]; totalItems?: number; totalPages?: number }> => {
    const params = new URLSearchParams({
      page: String(filters.page),
      limit: String(itemsPerPage),
      ...(filters.type !== 'All' && { type: filters.type }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await fetch(`${API_BASE}/api/facilities?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch facilities');
    return response.json();
  },
};
