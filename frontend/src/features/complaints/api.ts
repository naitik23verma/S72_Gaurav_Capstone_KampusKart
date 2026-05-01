import { API_BASE } from '../../config';
import { Complaint, ComplaintFilters } from './types';

export const complaintsApi = {
  listComplaints: async (
    token: string,
    filters: ComplaintFilters,
    itemsPerPage: number
  ): Promise<{ complaints: Complaint[]; totalItems: number; totalPages: number }> => {
    const params = new URLSearchParams({
      page: String(filters.page),
      limit: String(itemsPerPage),
      ...(filters.status !== 'All' && { status: filters.status }),
      ...(filters.category !== 'all' && { category: filters.category }),
      ...(filters.search && { search: filters.search }),
    });

    const response = await fetch(`${API_BASE}/api/complaints?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch complaints');
    return response.json();
  },

  createComplaint: async (token: string, formData: FormData): Promise<Complaint> => {
    const response = await fetch(`${API_BASE}/api/complaints`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to create complaint');
    return response.json();
  },

  updateComplaint: async (token: string, id: string, formData: FormData): Promise<Complaint> => {
    const response = await fetch(`${API_BASE}/api/complaints/${id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error('Failed to update complaint');
    return response.json();
  },

  deleteComplaint: async (token: string, id: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE}/api/complaints/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to delete complaint');
    return response.json();
  },
};
