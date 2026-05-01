export interface NewsItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  images?: { public_id?: string; url?: string }[];
}

export interface NewsFilters {
  category: string;
  search: string;
  page: number;
}
