# Frontend Utilities & Hooks Guide

## Overview

This guide documents the shared utilities, hooks, and components created to ensure consistency across the KampusKart application.

---

## 📁 Directory Structure

```
frontend/src/
├── utils/
│   ├── statusBadge.ts      # Status badge color utilities
│   ├── validation.ts       # Form validation utilities
│   └── formValidation.ts   # Email, phone, URL validation (existing)
├── hooks/
│   ├── useSuccessMessage.ts   # Success message management
│   ├── useAutocomplete.ts     # Autocomplete functionality
│   └── useInfiniteScroll.ts   # Infinite scroll pagination
└── components/common/
    ├── SuccessMessage.tsx     # Success message banner
    └── StatusBadge.tsx        # Status badge component
```

---

## 🎨 Status Badge Utilities

### File: `utils/statusBadge.ts`

Provides consistent color classes for status badges across all features.

### Functions:

#### `getEventStatusColor(status: EventStatus): string`
Returns Tailwind classes for event status badges.

**Statuses:**
- `Upcoming` → Blue badge
- `Ongoing` → Green badge
- `Completed` → Gray badge
- `Cancelled` → Red badge

**Example:**
```typescript
import { getEventStatusColor } from '@/utils/statusBadge';

const colorClass = getEventStatusColor('Upcoming');
// Returns: 'bg-blue-100 text-blue-800'
```

#### `getComplaintStatusColor(status: ComplaintStatus): string`
Returns Tailwind classes for complaint status badges.

**Statuses:**
- `Open` → Red badge
- `In Progress` → Yellow badge
- `Resolved` → Green badge
- `Closed` → Gray badge

#### `getLostFoundTypeColor(type: LostFoundType): string`
Returns Tailwind classes for lost/found item type badges.

**Types:**
- `lost` → Red badge
- `found` → Green badge

#### `getResolvedStatusColor(resolved: boolean): string`
Returns Tailwind classes for resolved status badges.

**Values:**
- `true` → Blue badge (Resolved)
- `false` → Yellow badge (Unresolved)

#### `getClubStatusColor(status: ClubStatus): string`
Returns Tailwind classes for club recruitment status badges.

**Statuses:**
- `Open` → Green badge
- `Closed` → Gray badge

#### `getPriorityColor(priority: 'Low' | 'Medium' | 'High' | 'Urgent'): string`
Returns Tailwind classes for priority badges.

**Priorities:**
- `Low` → Gray badge
- `Medium` → Blue badge
- `High` → Orange badge
- `Urgent` → Red badge

---

## ✅ Validation Utilities

### File: `utils/validation.ts`

Provides standardized validation functions for form fields.

### Standard Validation Rules:
- **Title**: 3-100 characters
- **Description**: 10-1000 characters
- **Location**: 3-200 characters (optional)

### Functions:

#### `validateTitle(value: string): ValidationResult`
Validates title fields with standard rules.

**Example:**
```typescript
import { validateTitle } from '@/utils/validation';

const result = validateTitle('My Event');
if (!result.isValid) {
  console.error(result.error);
}
```

#### `validateDescription(value: string): ValidationResult`
Validates description fields with standard rules.

#### `validateLocation(value: string, required?: boolean): ValidationResult`
Validates location fields. Optional by default.

#### `validateDate(value: string, allowFuture?: boolean): ValidationResult`
Validates date fields. Can check for past/future dates.

**Parameters:**
- `allowFuture`: `true` for events (no past dates), `false` for lost/found (no future dates)

#### `validateRequired(value: string, fieldName: string): ValidationResult`
Generic required field validation.

#### `validateFields(fields, validators): Record<string, string>`
Validates multiple fields at once and returns errors object.

**Example:**
```typescript
import { validateFields, validateTitle, validateDescription } from '@/utils/validation';

const errors = validateFields(
  { title: 'Hi', description: 'Short' },
  { 
    title: validateTitle, 
    description: validateDescription 
  }
);
// Returns: { title: 'Title must be at least 3 characters', description: '...' }
```

---

## 🎣 Custom Hooks

### 1. useSuccessMessage

**File:** `hooks/useSuccessMessage.ts`

Manages success messages with auto-hide functionality.

**Usage:**
```typescript
import { useSuccessMessage } from '@/hooks/useSuccessMessage';

function MyComponent() {
  const { successMessage, showSuccess, clearSuccess } = useSuccessMessage(3000);

  const handleSave = async () => {
    // ... save logic
    showSuccess('Item saved successfully!');
  };

  return (
    <>
      {successMessage && <SuccessMessage message={successMessage} />}
      {/* ... rest of component */}
    </>
  );
}
```

**API:**
- `successMessage`: Current message (null if none)
- `showSuccess(message)`: Display a success message
- `clearSuccess()`: Manually clear the message
- Duration parameter (default: 3000ms)

---

### 2. useAutocomplete

**File:** `hooks/useAutocomplete.ts`

Provides autocomplete functionality for search inputs.

**Usage:**
```typescript
import { useAutocomplete } from '@/hooks/useAutocomplete';

function MyComponent() {
  const {
    searchInput,
    setSearchInput,
    searchQuery,
    showSuggestions,
    filteredSuggestions,
    searchRef,
    handleSearch,
    handleKeyDown,
    selectSuggestion,
  } = useAutocomplete({
    items: myItems,
    searchFields: ['title', 'description', 'location'],
    minLength: 1,
    maxSuggestions: 5,
  });

  return (
    <div ref={searchRef}>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && (
        <div>
          {filteredSuggestions.map((suggestion) => (
            <div onClick={() => selectSuggestion(suggestion)}>
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Options:**
- `items`: Array of items to search
- `searchFields`: Fields to search in
- `minLength`: Minimum characters before showing suggestions (default: 1)
- `maxSuggestions`: Maximum suggestions to show (default: 5)

---

### 3. useInfiniteScroll

**File:** `hooks/useInfiniteScroll.ts`

Implements infinite scroll pagination using Intersection Observer.

**Usage:**
```typescript
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

function MyComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isFetching, setIsFetching] = useState(false);

  const { lastItemRef } = useInfiniteScroll({
    currentPage,
    totalPages,
    isFetching,
    onLoadMore: () => {
      setIsFetching(true);
      setCurrentPage(prev => prev + 1);
    },
  });

  return (
    <div>
      {items.map((item, idx) => (
        <div 
          key={item.id}
          ref={idx === items.length - 1 ? lastItemRef : undefined}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
```

---

## 🧩 Shared Components

### 1. SuccessMessage

**File:** `components/common/SuccessMessage.tsx`

Reusable success message banner with consistent styling.

**Usage:**
```typescript
import { SuccessMessage } from '@/components/common/SuccessMessage';

<SuccessMessage message={successMessage} />
```

**Props:**
- `message`: string | null - Message to display
- `className?`: string - Additional CSS classes

**Features:**
- Green banner with checkmark icon
- Fade-in animation
- Accessible (ARIA attributes)
- Auto-hides when message is null

---

### 2. StatusBadge

**File:** `components/common/StatusBadge.tsx`

Reusable status badge with consistent styling.

**Usage:**
```typescript
import { StatusBadge } from '@/components/common/StatusBadge';

<StatusBadge status="Upcoming" type="event" />
<StatusBadge status="Open" type="complaint" />
<StatusBadge status="High" type="priority" />
```

**Props:**
- `status`: string - Status value to display
- `type?`: 'event' | 'complaint' | 'lostfound' | 'club' | 'priority' | 'resolved'
- `className?`: string - Additional CSS classes

**Features:**
- Consistent color coding
- Type-safe status values
- Accessible (role="status")

---

## 🔄 Migration Guide

### Migrating to Shared Utilities

#### Before:
```typescript
// Inline validation
if (title.length < 3) {
  setError('Title must be at least 3 characters');
}

// Inline status colors
const colorClass = status === 'Open' ? 'bg-red-100 text-red-800' : '...';

// Manual success message handling
const [successMessage, setSuccessMessage] = useState<string | null>(null);
useEffect(() => {
  if (successMessage) {
    const timer = setTimeout(() => setSuccessMessage(null), 3000);
    return () => clearTimeout(timer);
  }
}, [successMessage]);
```

#### After:
```typescript
import { validateTitle } from '@/utils/validation';
import { getComplaintStatusColor } from '@/utils/statusBadge';
import { useSuccessMessage } from '@/hooks/useSuccessMessage';
import { StatusBadge } from '@/components/common/StatusBadge';
import { SuccessMessage } from '@/components/common/SuccessMessage';

// Validation
const result = validateTitle(title);
if (!result.isValid) {
  setError(result.error);
}

// Status colors
const colorClass = getComplaintStatusColor(status);
// Or use component:
<StatusBadge status={status} type="complaint" />

// Success messages
const { successMessage, showSuccess } = useSuccessMessage();
<SuccessMessage message={successMessage} />
```

---

## 📊 Benefits

### Code Consistency
- All components use the same validation rules
- Status badges have consistent colors
- Success messages behave identically

### Maintainability
- Single source of truth for validation rules
- Easy to update colors across entire app
- Centralized business logic

### Type Safety
- TypeScript types for all utilities
- Compile-time error checking
- Better IDE autocomplete

### Reusability
- DRY principle applied
- Less code duplication
- Faster feature development

### Testing
- Utilities can be unit tested independently
- Easier to mock in component tests
- Better test coverage

---

## 🧪 Testing Examples

### Testing Validation:
```typescript
import { validateTitle, validateDescription } from '@/utils/validation';

describe('Validation Utils', () => {
  it('should validate title correctly', () => {
    expect(validateTitle('Hi').isValid).toBe(false);
    expect(validateTitle('Valid Title').isValid).toBe(true);
  });
});
```

### Testing Hooks:
```typescript
import { renderHook, act } from '@testing-library/react';
import { useSuccessMessage } from '@/hooks/useSuccessMessage';

describe('useSuccessMessage', () => {
  it('should show and auto-hide message', () => {
    const { result } = renderHook(() => useSuccessMessage(1000));
    
    act(() => {
      result.current.showSuccess('Test message');
    });
    
    expect(result.current.successMessage).toBe('Test message');
    
    // Wait for auto-hide
    setTimeout(() => {
      expect(result.current.successMessage).toBeNull();
    }, 1100);
  });
});
```

---

## 📝 Best Practices

1. **Always use shared utilities** instead of inline validation
2. **Import types** from utility files for type safety
3. **Use StatusBadge component** instead of inline color classes
4. **Leverage hooks** for common patterns (success messages, autocomplete)
5. **Keep utilities pure** - no side effects in utility functions
6. **Document custom usage** if you extend these utilities

---

## 🔗 Related Files

- `utils/formValidation.ts` - Email, phone, URL validation (existing)
- `components/common/FeatureModal.tsx` - Modal component
- `components/common/ImageUpload.tsx` - Image upload component
- `components/common/SkeletonLoader.tsx` - Loading skeletons

---

**Last Updated:** March 14, 2026
**Version:** 1.0.0
