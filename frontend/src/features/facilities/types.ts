export interface Facility {
  _id: string;
  name: string;
  description: string;
  location: string;
  type: 'Academic' | 'Food' | 'Service' | 'Accommodation';
  icon: string;
  images?: { public_id?: string; url?: string }[];
  createdAt?: string;
  createdBy?: {
    _id: string;
    name?: string;
    email?: string;
  };
}

export interface FacilityFilters {
  type: string;
  search: string;
  page: number;
}
