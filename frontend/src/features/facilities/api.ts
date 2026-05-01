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
    
    const data = await response.json();
    // API might return array directly or {facilities, ...}
    if (Array.isArray(data)) {
      return { facilities: data, totalPages: 1 };
    }
    return data;
  },

  createFacility: async (token: string, formData: FormData): Promise<Facility> => {
    const response = await fetch(`${API_BASE}/api/facilities`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create facility');
    return response.json();
  },

  updateFacility: async (token: string, id: string, formData: FormData): Promise<Facility> => {
    const response = await fetch(`${API_BASE}/api/facilities/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update facility');
    return response.json();
  },

  deleteFacility: async (token: string, id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/api/facilities/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete facility');
    return response.json();
  },
};
