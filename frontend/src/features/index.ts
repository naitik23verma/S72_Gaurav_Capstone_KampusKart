// Features Module - Central export point
export * from './lostfound';
export * from './complaints';
export * from './events';
export * from './news';
export * from './facilities';
export * from './clubs';
export * from './chat';

// Types aggregation
export type { LostFoundItem, LostFoundFilters } from './lostfound/types';
export type { Complaint, ComplaintFilters } from './complaints/types';
export type { Event, EventFilters } from './events/types';
export type { ChatMessage, ChatUser } from './chat/types';
export type { NewsItem, NewsFilters } from './news/types';
export type { Facility, FacilityFilters } from './facilities/types';
export type { Club, ClubFilters } from './clubs/types';

// API aggregation
export { lostFoundApi } from './lostfound/api';
export { complaintsApi } from './complaints/api';
export { eventsApi } from './events/api';
export { chatApi } from './chat/api';
export { newsApi } from './news/api';
export { facilitiesApi } from './facilities/api';
export { clubsApi } from './clubs/api';
