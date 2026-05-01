# Frontend Features Architecture

## Overview

The frontend has been refactored into a **feature slices** architecture, where each major feature (LostFound, Complaints, Events, Chat, etc.) is organized as a self-contained module with its own types, API calls, hooks, and components.

## Directory Structure

```
frontend/src/
  features/
    lostfound/
      types.ts                # Domain types: LostFoundItem, LostFoundFilters
      api.ts                  # API functions: lostFoundApi.*
      hooks/                  # Custom hooks (TBD)
      components/             # UI components (TBD)
      index.ts                # Main export point
    
    complaints/
      types.ts
      api.ts
      hooks/
      components/
      index.ts
    
    events/
      types.ts
      api.ts
      hooks/
      components/
      index.ts
    
    chat/
      types.ts
      api.ts
      hooks/
      components/
      index.ts
    
    news/
      types.ts
      api.ts
      hooks/
      components/
      index.ts
    
    facilities/
      types.ts
      api.ts
      hooks/
      components/
      index.ts
    
    clubs/
      types.ts
      api.ts
      hooks/
      components/
      index.ts
    
    index.ts                  # Aggregated exports for all features
  
  pages/
    LostFound.tsx            # Route lazy-load wrapper → imports from features
    Complaints.tsx
    Events.tsx
    Chat.tsx
    News.tsx
    Facilities.tsx
    ClubsRecruitment.tsx
    ...
  
  components/                # Original components (kept for compatibility)
    LostFound.tsx
    Complaints.tsx
    ...
```

## File Responsibilities

### `types.ts`
Centralized TypeScript interfaces for the feature domain.

**Example** (`features/lostfound/types.ts`):
```typescript
export interface LostFoundItem {
  _id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  // ... other fields
}

export interface LostFoundFilters {
  type: 'all' | 'lost' | 'found';
  resolved: 'all' | 'resolved' | 'unresolved';
  search: string;
  page: number;
}
```

### `api.ts`
Centralized API call functions for the feature. All `fetch()` calls are here.

**Example** (`features/lostfound/api.ts`):
```typescript
export const lostFoundApi = {
  listItems: async (token: string, filters, itemsPerPage) => { /* ... */ },
  getItemById: async (token: string, id: string) => { /* ... */ },
  createItem: async (token: string, formData: FormData) => { /* ... */ },
  updateItem: async (token: string, id: string, formData: FormData) => { /* ... */ },
  deleteItem: async (token: string, id: string) => { /* ... */ },
};
```

### `hooks/`
Custom hooks for feature-specific logic.

**Planned hooks**:
- `useInfiniteScroll` - Intersection observer for pagination
- `useImageUpload` - Image file handling and validation
- `useFormValidation` - Form state and validation
- `useChatSocket` - Socket.IO event handling

### `components/`
UI components for the feature (TBD - components will be moved here from `src/components/`).

### `index.ts`
Main export point for the feature module. Re-exports key exports for clean imports.

```typescript
export { default } from '../../components/LostFound';  // Currently re-exports from components/
export type { LostFoundItem } from './types';
export { lostFoundApi } from './api';
export type { LostFoundFilters } from './types';
```

## Usage Patterns

### Importing Types
```typescript
import type { LostFoundItem, LostFoundFilters } from '../features/lostfound';
// or from features aggregator
import type { LostFoundItem } from '../features';
```

### Using API Functions
```typescript
import { lostFoundApi } from '../features/lostfound';

const handleFetchItems = async () => {
  const result = await lostFoundApi.listItems(token, filters, itemsPerPage);
  // use result.items, result.totalPages, etc.
};
```

### Using Custom Hooks (Future)
```typescript
import { useInfiniteScroll } from '../features/lostfound/hooks';

function LostFoundPage() {
  const { items, isLoading, loadMore } = useInfiniteScroll(/* ... */);
  return /* ... */;
}
```

## Route/Page Wrappers

The `pages/` directory contains route-level wrappers that:
1. Re-export the main component from the feature
2. Enable lazy loading in `App.tsx`
3. Provide a consistent route structure

**Example** (`pages/LostFound.tsx`):
```typescript
import { default as LostFound } from '../features/lostfound';
export default LostFound;
```

This allows `App.tsx` to use:
```typescript
const LostFound = React.lazy(() => import('./pages/LostFound'));
```

## Migration Status

### Phase 1 - Completed ✓
- [x] Created feature directory structure
- [x] Extracted and organized types.ts for all features
- [x] Extracted and organized api.ts for all features
- [x] Updated page wrappers to import from features
- [x] Validation: Build and tests pass

### Phase 2 - In Progress
- [ ] Move components from `src/components/` into `src/features/{feature}/components/`
- [ ] Create custom hooks in `features/{feature}/hooks/`
- [ ] Break down monolithic components into smaller pieces
- [ ] Update internal imports within moved components

### Phase 3 - Planned
- [ ] Component composition optimization
- [ ] Hook testing
- [ ] E2E validation
- [ ] Performance optimization

## Benefits

1. **Maintainability**: Each feature is self-contained and independent
2. **Scalability**: Easy to add new features following the established pattern
3. **Testing**: API calls are centralized and easier to mock
4. **Type Safety**: Domain types are co-located with feature logic
5. **Performance**: Lazy loading at route level + tree-shaking of unused features
6. **Developer Experience**: Clear folder structure reduces cognitive load

## Current Build Status

- **Build**: ✓ 3830 modules transformed successfully
- **Tests**: ✓ 37 tests passing
- **Type Checking**: ✓ No TypeScript errors
- **Production**: ✓ Ready for deployment

## Next Steps

1. Extract custom hooks from component state logic
2. Move components into feature directories
3. Break down large components (LostFound, Complaints, Chat, Events)
4. Re-run tests and validate functionality
5. Document feature-specific hooks and components

See [frontend-patterns.md](../../memories/repo/frontend-patterns.md) for detailed patterns and conventions.
