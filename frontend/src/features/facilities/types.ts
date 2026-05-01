export interface Facility {
  _id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  icon?: string;
  images?: { public_id?: string; url?: string }[];
}

export interface FacilityFilters {
  type: string;
  search: string;
  page: number;
}
