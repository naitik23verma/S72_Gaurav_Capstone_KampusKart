# Information Architecture

Complete site structure and content organization for KampusKart.

**Day**: 3 of 30  
**Purpose**: Define navigation, content hierarchy, and user paths

---

## 🏗️ Site Structure

```
KampusKart
│
├─ 🏠 Home (Landing Page)
│   ├─ Hero Section
│   ├─ Features Overview
│   ├─ How It Works
│   ├─ Testimonials (future)
│   └─ CTA (Get Started)
│
├─ 🔐 Authentication
│   ├─ Register
│   │   ├─ Email/Password Form
│   │   └─ Google OAuth
│   ├─ Login
│   │   ├─ Email/Password Form
│   │   ├─ Google OAuth
│   │   └─ Forgot Password
│   └─ Password Reset (future)
│
├─ 📊 Dashboard (Authenticated)
│   ├─ Welcome Message
│   ├─ Quick Stats
│   │   ├─ Total Items
│   │   ├─ Resolved Items
│   │   └─ New Today
│   ├─ Recent Lost & Found
│   │   └─ [View All] → Lost & Found List
│   ├─ Campus Updates
│   │   └─ [View All] → Updates Feed
│   └─ Quick Actions
│       └─ [Post Item] → Create Form
│
├─ 📦 Lost & Found
│   ├─ List View
│   │   ├─ Search Bar
│   │   ├─ Filters
│   │   │   ├─ Category Filter
│   │   │   ├─ Status Filter
│   │   │   └─ Sort Options
│   │   ├─ Item Grid
│   │   │   └─ [Item Card] → Detail View
│   │   ├─ Pagination
│   │   └─ [Post New Item] → Create Form
│   │
│   ├─ Detail View
│   │   ├─ Image Gallery
│   │   ├─ Item Information
│   │   ├─ User Profile
│   │   ├─ Actions (Visitor)
│   │   │   └─ [Contact Owner] → Contact Modal
│   │   ├─ Actions (Owner)
│   │   │   ├─ [Edit] → Edit Form
│   │   │   ├─ [Delete] → Confirmation Modal
│   │   │   └─ [Mark Resolved] → Confirmation Modal
│   │   └─ Similar Items
│   │       └─ [Item Card] → Detail View
│   │
│   ├─ Create Form
│   │   ├─ Title Input
│   │   ├─ Description Textarea
│   │   ├─ Category Dropdown
│   │   ├─ Status Radio (Lost/Found)
│   │   ├─ Location Input
│   │   ├─ Date/Time Pickers
│   │   ├─ Image Upload
│   │   ├─ Contact Info
│   │   └─ [Submit] → Success → Detail View
│   │
│   └─ Edit Form
│       └─ (Same as Create, pre-filled)
│
├─ 📢 Campus Updates (future)
│   ├─ Feed View
│   │   ├─ Filter by Category
│   │   ├─ Update Cards
│   │   └─ [Read More] → Detail View
│   └─ Detail View
│       ├─ Full Content
│       ├─ Author Info
│       └─ Comments (future)
│
├─ 👤 Profile (future)
│   ├─ My Profile
│   │   ├─ Profile Info
│   │   ├─ [Edit Profile]
│   │   └─ Account Settings
│   ├─ My Posts
│   │   ├─ Active Posts
│   │   ├─ Resolved Posts
│   │   └─ [View/Edit] → Detail/Edit
│   └─ Messages (future)
│       ├─ Inbox
│       ├─ Sent
│       └─ [Message] → Conversation
│
└─ ⚙️ Settings (future)
    ├─ Account Settings
    ├─ Notification Preferences
    ├─ Privacy Settings
    └─ [Logout]
```

---

## 🧭 Navigation Structure

### Primary Navigation (Top Bar)
```
┌────────────────────────────────────────────────────┐
│ [Logo] [Search] [Lost&Found] [Updates] [@Profile] │
└────────────────────────────────────────────────────┘
```

**Items**:
1. **Logo** → Dashboard (if logged in) or Home (if not)
2. **Search** → Global search (opens search modal)
3. **Lost & Found** → List view
4. **Campus Updates** → Updates feed (future)
5. **Profile Dropdown** → Profile, Settings, Logout

### Mobile Navigation (Hamburger Menu)
```
┌──────────────────┐
│ [☰] KampusKart   │
└──────────────────┘
     ↓
┌──────────────────┐
│ 🏠 Dashboard     │
│ 📦 Lost & Found  │
│ 📢 Updates       │
│ 👤 Profile       │
│ ⚙️ Settings      │
│ 🚪 Logout        │
└──────────────────┘
```

### Footer Navigation (Landing Page)
```
┌────────────────────────────────────────────────────┐
│ About | How It Works | Privacy | Terms | Contact  │
└────────────────────────────────────────────────────┘
```

---

## 📄 Page Inventory

### Public Pages (No Auth Required)
| Page | URL | Purpose |
|------|-----|---------|
| Landing | `/` | Marketing, CTA to register |
| Register | `/register` | User signup |
| Login | `/login` | User login |
| About | `/about` | Platform information |
| How It Works | `/how-it-works` | User guide |

### Protected Pages (Auth Required)
| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/dashboard` | User home, overview |
| Lost & Found List | `/lost-found` | Browse all items |
| Item Detail | `/lost-found/:id` | View single item |
| Create Item | `/lost-found/new` | Post new item |
| Edit Item | `/lost-found/:id/edit` | Edit existing item |
| Profile | `/profile` | User profile (future) |
| Settings | `/settings` | Account settings (future) |

---

## 🔍 Search & Filter Architecture

### Global Search
- **Location**: Top navigation bar
- **Scope**: All lost & found items
- **Fields Searched**: Title, description, category, location
- **Results**: Redirects to list view with search applied

### List View Filters
```
Search: [Text input] → Real-time filtering
  ↓
Category: [Dropdown] → Wallet, Keys, Phone, Documents, Other
  ↓
Status: [Dropdown] → All, Open, Resolved
  ↓
Sort: [Dropdown] → Newest, Oldest, Most Relevant
  ↓
Results: [Item Grid] → Filtered and sorted items
```

### Filter Combinations
- **Search + Category**: "wallet" + "Wallet" category
- **Search + Status**: "phone" + "Open" status
- **Category + Status**: "Keys" + "Resolved"
- **All Filters**: Search + Category + Status + Sort

---

## 📊 Content Hierarchy

### Dashboard
```
Level 1: Page Title ("Welcome back, [Name]!")
Level 2: Section Headings ("Recent Lost & Found", "Campus Updates")
Level 3: Card Titles (Item names, Update titles)
Level 4: Card Metadata (Time, user, category)
```

### Lost & Found List
```
Level 1: Page Title ("Lost & Found Items")
Level 2: Filter Section (Search, Category, Status, Sort)
Level 3: Results Count ("Showing 24 items")
Level 4: Item Cards (Title, description, metadata)
```

### Item Detail
```
Level 1: Item Title ("Lost Brown Wallet")
Level 2: Section Headings ("Description", "Location", "Contact")
Level 3: Content (Description text, location, user info)
Level 4: Metadata (Date, time, item ID)
```

---

## 🔗 User Paths

### Path 1: New User Registration
```
Landing Page
  → Click "Get Started"
  → Register Page
  → Fill Form / Google OAuth
  → Dashboard
```

### Path 2: Posting a Lost Item
```
Dashboard
  → Click "Post Item"
  → Create Form
  → Fill Details
  → Upload Image
  → Submit
  → Success Modal
  → Item Detail View
```

### Path 3: Finding a Lost Item
```
Dashboard
  → Click "Lost & Found" in nav
  → List View
  → Search "wallet"
  → Filter by "Wallet"
  → Click matching item
  → Detail View
  → Click "Contact Owner"
  → Send Message
```

### Path 4: Managing Your Post
```
Dashboard
  → Click "Lost & Found"
  → List View
  → Click your item
  → Detail View (Owner)
  → Click "Edit" / "Delete" / "Mark Resolved"
  → Confirmation
  → Updated View
```

---

## 🏷️ Content Types

### Lost & Found Item
```
Fields:
- ID (auto-generated)
- Title (required, 5-100 chars)
- Description (required, 10-500 chars)
- Category (required, enum)
- Status (required, Lost/Found)
- Location (optional, 100 chars)
- Date/Time (optional, datetime)
- Images (required, 1-5 images)
- Contact Info (optional, email/phone)
- Created By (auto, user reference)
- Created At (auto, timestamp)
- Updated At (auto, timestamp)
- Resolved (boolean)
- Resolved At (timestamp)
```

### User
```
Fields:
- ID (auto-generated)
- Name (required)
- Email (required, unique)
- Password Hash (required, if not OAuth)
- Role (enum: student, faculty, admin)
- Avatar (optional, image URL)
- Created At (auto, timestamp)
- Last Login (timestamp)
```

### Campus Update (future)
```
Fields:
- ID (auto-generated)
- Title (required)
- Content (required)
- Category (enum)
- Author (user reference)
- Created At (timestamp)
- Updated At (timestamp)
```

---

## 🎯 Taxonomy

### Item Categories
```
📦 Lost & Found Categories
├─ 💼 Wallet
├─ 🔑 Keys
├─ 📱 Phone
├─ 📄 Documents
├─ 💻 Electronics
├─ 👕 Clothing
├─ 📚 Books
├─ 🎒 Bags
└─ 🔧 Other
```

### Item Status
```
Status Options
├─ 🔓 Open (active, not resolved)
└─ ✅ Resolved (found owner, returned)
```

### User Roles
```
User Roles
├─ 👨‍🎓 Student (default)
├─ 👨‍🏫 Faculty
└─ 👨‍💼 Admin (special permissions)
```

---

## 📱 Mobile-Specific IA

### Simplified Navigation
- **Bottom Tab Bar** (alternative to hamburger)
  - Home (Dashboard)
  - Search (Lost & Found)
  - Post (Create Form)
  - Profile

### Collapsed Filters
- **Filter Button** → Opens filter drawer
- **Applied Filters** → Chips with X to remove
- **Quick Filters** → Category icons for one-tap filtering

### Swipe Gestures
- **Swipe Left** → Next item (in detail view)
- **Swipe Right** → Previous item
- **Pull Down** → Refresh list

---

## 🔐 Permission Levels

### Public (Not Logged In)
- ✅ View landing page
- ✅ View about/how it works
- ❌ View dashboard
- ❌ View lost & found items
- ❌ Post items

### Authenticated User
- ✅ View dashboard
- ✅ View all lost & found items
- ✅ Post new items
- ✅ Edit own items
- ✅ Delete own items
- ✅ Contact other users
- ❌ Edit others' items
- ❌ Delete others' items

### Admin (future)
- ✅ All user permissions
- ✅ Edit any item
- ✅ Delete any item
- ✅ View analytics
- ✅ Manage users
- ✅ Post campus updates

---

## 🔄 State Management

### Application States
```
App States
├─ Loading (initial load, data fetching)
├─ Authenticated (user logged in)
├─ Unauthenticated (user logged out)
├─ Error (API errors, network issues)
└─ Offline (no internet connection)
```

### Page States
```
List View States
├─ Loading (fetching items)
├─ Empty (no items found)
├─ Results (items displayed)
└─ Error (failed to load)

Detail View States
├─ Loading (fetching item)
├─ Loaded (item displayed)
├─ Not Found (404)
└─ Error (failed to load)

Form States
├─ Idle (ready for input)
├─ Validating (checking fields)
├─ Submitting (posting data)
├─ Success (item posted)
└─ Error (submission failed)
```

---

## 📈 Analytics & Tracking

### Key Metrics to Track
- **User Engagement**: Daily active users, session duration
- **Item Activity**: Items posted, items resolved, resolution rate
- **Search Behavior**: Popular searches, filter usage
- **User Paths**: Most common navigation flows
- **Conversion**: Registration rate, post rate

### Events to Track
- Page views (all pages)
- User registration (email vs OAuth)
- Item posted (category, status)
- Item viewed (detail page)
- Contact initiated (owner contacted)
- Item resolved (marked as resolved)
- Search performed (query, filters)

---

## ✅ IA Validation Checklist

- [x] Site structure defined
- [x] Navigation patterns established
- [x] Page inventory created
- [x] Search & filter architecture planned
- [x] Content hierarchy documented
- [x] User paths mapped
- [x] Content types defined
- [x] Taxonomy established
- [x] Mobile IA considered
- [x] Permissions defined
- [x] State management planned
- [x] Analytics strategy outlined

---

## 🚀 Next Steps

1. **Validate** IA with card sorting exercise
2. **Test** navigation with users (tree testing)
3. **Refine** based on feedback
4. **Document** in hi-fid designs
5. **Implement** in code (Day 14+)

---

**This IA ensures users can find what they need quickly and intuitively!**

**Created**: Day 3 of 30-day sprint  
**Last Updated**: January 16, 2026
