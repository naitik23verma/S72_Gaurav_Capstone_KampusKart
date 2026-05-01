export interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  description?: string;
  category?: string;
  placeId?: string;
}

export interface MapFilters {
  search: string;
  category: string;
}
