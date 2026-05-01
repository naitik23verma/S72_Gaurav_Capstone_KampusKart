export interface Club {
  _id: string;
  title: string;
  description: string;
  clubName: string;
  startDate: string;
  endDate: string;
  formUrl: string;
  image?: { public_id?: string; url?: string };
  contactInfo?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  status: 'Open' | 'Closed';
}

export interface ClubFilters {
  status: string;
  search: string;
  page: number;
}
