# Low-Fidelity Wireframes - User Flows

**Date**: January 16, 2026  
**Day**: 2 of 30  
**Concept**: Created a low-fid design (0.5 points)

---

## 🎯 Overview

These wireframes represent the core user journeys in KampusKart. They focus on functionality and user flow rather than visual design, establishing the foundation for high-fidelity designs.

---

## 📱 User Flows Covered

### 1. Authentication Flow
**Purpose**: Allow users to register and login to access the platform

**Screens**:
- Landing page with CTA
- Registration form (name, email, password)
- Login form (email, password)
- Google OAuth option
- Success redirect to dashboard

**User Journey**:
```
Landing → Register → Email Verification (optional) → Login → Dashboard
         ↓
    Google OAuth → Auto-login → Dashboard
```

---

### 2. Dashboard / Home Flow
**Purpose**: Central hub showing overview and quick actions

**Components**:
- Navigation bar (logo, search, profile)
- Quick stats (total items, active posts, resolved)
- Recent lost & found items (card grid)
- Campus updates feed
- Quick action buttons (Post Item, View All)

**User Journey**:
```
Login → Dashboard → View Recent Items
                 → View Campus Updates
                 → Quick Post Item
                 → Navigate to sections
```

---

### 3. Lost & Found List Flow
**Purpose**: Browse and search all lost/found items

**Components**:
- Search bar with filters
- Category filter (wallet, keys, phone, documents, other)
- Status filter (open, resolved)
- Item cards showing:
  - Thumbnail image
  - Title
  - Category badge
  - Status badge
  - Date posted
  - Posted by (name)
- Pagination
- "Post New Item" floating button

**User Journey**:
```
Dashboard → Lost & Found List → Filter by Category
                              → Search by keyword
                              → Click item → Detail View
                              → Post New Item → Create Form
```

---

### 4. Lost & Found Detail Flow
**Purpose**: View complete information about a specific item

**Components**:
- Large image display
- Item title
- Full description
- Category and status badges
- Posted by (user info with avatar)
- Posted date
- Contact button (if not owner)
- Edit button (if owner)
- Delete button (if owner)
- Mark as Resolved button (if owner)
- Back to list button

**User Journey**:
```
List View → Click Item → Detail View → Contact Owner
                                    → Edit (if owner)
                                    → Delete (if owner)
                                    → Mark Resolved (if owner)
                                    → Back to List
```

---

### 5. Create/Edit Item Flow
**Purpose**: Post a new lost/found item or edit existing

**Components**:
- Form fields:
  - Title (text input)
  - Description (textarea)
  - Category (dropdown)
  - Image upload (file picker with preview)
- Validation messages
- Cancel button
- Submit button
- Success confirmation
- Redirect to detail view

**User Journey**:
```
Dashboard/List → Click "Post Item" → Fill Form → Upload Image
                                               → Submit
                                               → Success Message
                                               → View Posted Item

Detail View → Click "Edit" → Pre-filled Form → Update
                                             → Submit
                                             → Success
                                             → View Updated Item
```

---

## 🔄 Navigation Structure

```
┌─────────────────────────────────────┐
│         Top Navigation Bar          │
│  Logo | Search | Profile | Logout   │
└─────────────────────────────────────┘
         │
         ├─ Dashboard (Home)
         │
         ├─ Lost & Found
         │   ├─ List View
         │   ├─ Detail View
         │   └─ Create/Edit Form
         │
         ├─ Campus Updates (future)
         │
         └─ Profile (future)
```

---

## 📐 Wireframe Specifications

### Screen Sizes Considered
- **Desktop**: 1440px width (primary)
- **Tablet**: 768px width
- **Mobile**: 375px width

### Layout Principles
- **Mobile-first**: Start with mobile layout, scale up
- **Responsive grid**: 12-column grid system
- **Consistent spacing**: 8px base unit (8, 16, 24, 32, 40px)
- **Touch targets**: Minimum 44x44px for buttons

### Component Hierarchy
1. **Navigation** (fixed top)
2. **Main content area** (scrollable)
3. **Floating action button** (bottom right, mobile)
4. **Footer** (optional)

---

## 🎨 Design Decisions

### Why These Flows?
- **Auth Flow**: Essential for user identity and security
- **Dashboard**: Provides quick overview and navigation hub
- **List View**: Core feature - browsing lost items
- **Detail View**: Complete information for decision-making
- **Create Form**: Enables user contribution

### Key Interactions
- **Search**: Real-time filtering as user types
- **Filters**: Multi-select with clear visual feedback
- **Cards**: Clickable with hover states
- **Forms**: Inline validation with helpful error messages
- **Images**: Click to enlarge, drag-and-drop upload

### Accessibility Considerations
- Clear visual hierarchy
- Sufficient contrast (will be refined in hi-fid)
- Keyboard navigation support
- Screen reader friendly labels
- Error messages clearly associated with fields

---

## 🔍 User Scenarios

### Scenario 1: Student Lost Their Wallet
```
1. Opens KampusKart
2. Logs in with Google
3. Lands on Dashboard
4. Clicks "Lost & Found" in nav
5. Clicks "Post Item" button
6. Fills form: "Lost Wallet - Brown Leather"
7. Uploads photo
8. Submits
9. Views posted item
10. Waits for contact from finder
```

### Scenario 2: Student Found Keys
```
1. Opens KampusKart
2. Already logged in
3. Dashboard shows recent items
4. Clicks "Post Item"
5. Fills form: "Found Keys - Near Library"
6. Uploads photo of keys
7. Submits
8. Item appears in list
9. Owner contacts via platform
10. Marks as "Resolved" after returning
```

### Scenario 3: Browsing Lost Items
```
1. Opens KampusKart
2. Clicks "Lost & Found"
3. Sees grid of recent items
4. Uses search: "phone"
5. Filters by category: "Phone"
6. Clicks on matching item
7. Views details and photo
8. Clicks "Contact" to reach poster
9. Arranges to return item
```

---

## 📝 Notes for Hi-Fid Design

These wireframes establish:
- ✅ Information architecture
- ✅ User flow logic
- ✅ Component placement
- ✅ Content hierarchy

Next phase (hi-fid) will add:
- 🎨 Visual design (colors, typography)
- 🖼️ Real imagery and icons
- ✨ Micro-interactions and animations
- 📱 Detailed responsive breakpoints

---

## ✅ Wireframe Checklist

- [x] Authentication flow mapped
- [x] Dashboard layout defined
- [x] List view structure created
- [x] Detail view components identified
- [x] Create/edit form designed
- [x] Navigation structure established
- [x] User scenarios documented
- [x] Responsive considerations noted

---

**Ready for Day 3**: Finalize wireframe images and prepare for hi-fid design phase!
