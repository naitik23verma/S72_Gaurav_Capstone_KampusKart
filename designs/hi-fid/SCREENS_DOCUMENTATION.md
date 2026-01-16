# Screens Documentation

Complete documentation of all designed screens with specifications.

**Day**: 5 of 30  
**Purpose**: Document all screens for implementation reference

---

## 📄 Screen Inventory

### Public Screens (No Auth Required)
1. Landing Page
2. Registration Page
3. Login Page

### Protected Screens (Auth Required)
4. Dashboard
5. Lost & Found List
6. Lost & Found Detail
7. Create Item Form
8. Edit Item Form

---

## 1. Landing Page

**URL**: `/`  
**Purpose**: Marketing page, first impression, CTA to register

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Navigation Bar (64px)                   │
├─────────────────────────────────────────┤
│ Hero Section (600px)                    │
├─────────────────────────────────────────┤
│ Features Section (auto)                 │
├─────────────────────────────────────────┤
│ Footer (200px)                          │
└─────────────────────────────────────────┘
```

### Navigation Bar
```
Components:
├─ Logo: "KampusKart" (H3, Primary/500)
├─ Spacer: flex-grow
├─ Login Button: Text button
└─ Register Button: Primary button

Styling:
├─ Background: White
├─ Height: 64px
├─ Padding: 0 40px
├─ Shadow: 0 2px 8px rgba(0,0,0,0.08)
└─ Position: fixed top
```

### Hero Section
```
Layout:
├─ Container: 1440px max-width, centered
├─ Padding: 80px 40px
├─ Display: flex (2 columns)
├─ Left: 50% (content)
└─ Right: 50% (illustration)

Background:
└─ Gradient: Primary/50 (#E3F2FD) to White

Left Content:
├─ Heading:
│   ├─ Text: "Your Campus Community Platform"
│   ├─ Font: Display (48px, Bold)
│   ├─ Color: Gray/900
│   └─ Margin Bottom: 16px
│
├─ Subheading:
│   ├─ Text: "Find Lost Items • Share Updates • Connect"
│   ├─ Font: Body/Large (18px, Regular)
│   ├─ Color: Gray/700
│   └─ Margin Bottom: 32px
│
└─ CTA Button:
    ├─ Text: "Get Started →"
    ├─ Type: Primary button, Large
    └─ Action: Navigate to /register

Right Content:
├─ Illustration: Campus scene
├─ Size: 600px × 450px
└─ Style: Modern, friendly, colorful
```

### Features Section
```
Layout:
├─ Container: 1440px max-width
├─ Padding: 80px 40px
├─ Background: White
└─ Display: flex (3 columns)

Heading:
├─ Text: "How It Works"
├─ Font: H2 (30px, Semibold)
├─ Color: Gray/900
├─ Text Align: center
└─ Margin Bottom: 48px

Feature Cards (3):
├─ Width: 33.33% each
├─ Gap: 24px
├─ Padding: 32px
├─ Background: White
├─ Border: 1px solid Gray/200
├─ Border Radius: 12px
└─ Shadow: 0 2px 8px rgba(0,0,0,0.08)

Each Card:
├─ Icon: 32px, Primary/500, centered
├─ Title: H4 (20px, Semibold), centered
├─ Description: Body (16px, Regular), Gray/700
└─ Gap: 16px between elements

Cards Content:
1. "Post Items"
   - Icon: 📦
   - "Easily post lost or found items with photos"

2. "Search Fast"
   - Icon: 🔍
   - "Find lost items with powerful search and filters"

3. "Get Results"
   - Icon: ✅
   - "Connect and recover your belongings quickly"
```

### Footer
```
Layout:
├─ Background: Gray/900
├─ Height: 200px
├─ Padding: 40px
└─ Color: White

Content:
├─ Logo: "KampusKart" (White)
├─ Links: About | How It Works | Privacy | Terms | Contact
│   ├─ Color: Gray/300
│   ├─ Hover: White
│   └─ Gap: 24px
└─ Copyright: "© 2026 KampusKart. All rights reserved."
    ├─ Font: 14px, Regular
    └─ Color: Gray/500
```

### Responsive (Mobile)
```
Hero Section:
├─ Stack vertically (1 column)
├─ Illustration: 100% width, below text
└─ Padding: 40px 16px

Features:
├─ Stack vertically (1 column)
└─ Cards: 100% width each
```

---

## 2. Registration Page

**URL**: `/register`  
**Purpose**: User signup

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Simple Nav (64px)                       │
├─────────────────────────────────────────┤
│ Split Layout (100vh - 64px)             │
│ ├─ Left: Illustration (50%)             │
│ └─ Right: Form (50%)                    │
└─────────────────────────────────────────┘
```

### Simple Navigation
```
Components:
├─ Back Button: "← Back" (Text button)
└─ Logo: "KampusKart" (H3, Primary/500)

Styling:
├─ Background: White
├─ Height: 64px
├─ Padding: 0 40px
└─ Border Bottom: 1px solid Gray/200
```

### Left Side (Illustration)
```
Layout:
├─ Width: 50%
├─ Background: Primary/50
├─ Padding: 80px
└─ Display: flex, center

Content:
├─ Illustration: Campus scene with students
├─ Size: 500px × 500px
└─ Style: Friendly, welcoming
```

### Right Side (Form)
```
Layout:
├─ Width: 50%
├─ Background: White
├─ Padding: 80px
├─ Display: flex, center
└─ Max Width: 400px

Heading:
├─ Text: "Create Your Account"
├─ Font: H2 (30px, Semibold)
├─ Color: Gray/900
└─ Margin Bottom: 32px

Form Fields:
├─ Full Name:
│   ├─ Label: "Full Name *"
│   ├─ Input: Text input
│   ├─ Placeholder: "Enter your full name"
│   └─ Required: true
│
├─ Email Address:
│   ├─ Label: "Email Address *"
│   ├─ Input: Text input, type="email"
│   ├─ Placeholder: "your@email.com"
│   └─ Required: true
│
├─ Password:
│   ├─ Label: "Password *"
│   ├─ Input: Text input, type="password"
│   ├─ Placeholder: "••••••••"
│   ├─ Helper: "Must be at least 8 characters"
│   └─ Required: true
│
└─ Confirm Password:
    ├─ Label: "Confirm Password *"
    ├─ Input: Text input, type="password"
    ├─ Placeholder: "••••••••"
    └─ Required: true

Gap: 16px between fields

Submit Button:
├─ Text: "Create Account"
├─ Type: Primary button, Large
├─ Width: 100%
└─ Margin Top: 24px

Divider:
├─ Text: "OR"
├─ Style: Horizontal line with text
├─ Color: Gray/400
└─ Margin: 24px 0

Google Button:
├─ Text: "[G] Continue with Google"
├─ Type: Secondary button, Large
├─ Width: 100%
└─ Icon: Google logo, 20px

Footer Link:
├─ Text: "Already have an account? [Login here]"
├─ Font: Body/Small (14px)
├─ Color: Gray/600
├─ Link: Primary/500
└─ Margin Top: 24px
```

### Responsive (Mobile)
```
Layout:
├─ Stack vertically
├─ Hide illustration
└─ Form: 100% width, padding 24px
```

---

## 3. Login Page

**URL**: `/login`  
**Purpose**: User authentication

### Layout
Same as Registration Page, but:

### Form Content
```
Heading:
└─ Text: "Welcome Back!"

Form Fields:
├─ Email Address *
└─ Password *

Forgot Password:
├─ Text: "Forgot Password?"
├─ Type: Text button
├─ Position: Right-aligned
└─ Margin: 8px 0 24px

Submit Button:
└─ Text: "Login"

Footer Link:
└─ Text: "Don't have an account? [Register here]"
```

---

## 4. Dashboard

**URL**: `/dashboard`  
**Purpose**: User home, overview

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Navigation Bar (64px)                   │
├─────────────────────────────────────────┤
│ Content Area (auto)                     │
│ ├─ Welcome Section                      │
│ ├─ Stats Cards                          │
│ ├─ Recent Items                         │
│ └─ Campus Updates                       │
├─────────────────────────────────────────┤
│ Floating Action Button                  │
└─────────────────────────────────────────┘
```

### Navigation Bar
```
Components:
├─ Logo: "🏠 KampusKart" (Primary/500)
├─ Search: Input field, 400px
├─ Nav Links:
│   ├─ "Lost & Found" (Gray/700)
│   └─ "Updates" (Gray/700)
└─ User Menu:
    ├─ Avatar: 40px circle
    ├─ Name: "Gaurav"
    └─ Dropdown: Profile, Settings, Logout

Styling:
├─ Background: White
├─ Height: 64px
├─ Padding: 0 40px
├─ Shadow: 0 2px 8px rgba(0,0,0,0.08)
└─ Position: fixed top
```

### Content Area
```
Container:
├─ Max Width: 1440px
├─ Padding: 40px
├─ Background: Gray/50
└─ Margin Top: 64px (nav height)
```

### Welcome Section
```
Heading:
├─ Text: "Welcome back, Gaurav! 👋"
├─ Font: H2 (30px, Semibold)
├─ Color: Gray/900
└─ Margin Bottom: 32px
```

### Stats Cards
```
Layout:
├─ Display: flex
├─ Gap: 24px
└─ Margin Bottom: 48px

Cards (3):
├─ Width: 33.33% each
├─ Component: Stats Card
└─ Content:
    1. Total Items: 24
    2. Resolved: 18
    3. New Today: 5
```

### Recent Items Section
```
Header:
├─ Display: flex, space-between
├─ Title: "Recent Lost & Found Items" (H3)
├─ Link: "View All →" (Text button)
└─ Margin Bottom: 24px

Grid:
├─ Display: grid
├─ Columns: 4 (desktop), 2 (tablet), 1 (mobile)
├─ Gap: 24px
└─ Cards: Item Card component (4 items)
```

### Campus Updates Section
```
Header:
├─ Title: "Campus Updates" (H3)
├─ Link: "View All →"
└─ Margin Bottom: 24px

List:
├─ Display: flex, column
├─ Gap: 16px
└─ Cards: Update Card component (3 items)
```

### Floating Action Button
```
Position:
├─ Fixed: bottom-right
├─ Bottom: 32px
├─ Right: 32px
└─ Z-index: 50

Styling:
├─ Size: 60px × 60px
├─ Background: Primary/500
├─ Border Radius: 50% (circle)
├─ Shadow: 0 8px 24px rgba(0,0,0,0.16)
├─ Icon: "+" (plus), 32px, White
└─ Hover: Scale 1.1, Shadow larger

Action:
└─ Navigate to /lost-found/new
```

---

## 5. Lost & Found List

**URL**: `/lost-found`  
**Purpose**: Browse all items

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Navigation Bar (64px)                   │
├─────────────────────────────────────────┤
│ Page Header                             │
├─────────────────────────────────────────┤
│ Search & Filters                        │
├─────────────────────────────────────────┤
│ Results Grid                            │
├─────────────────────────────────────────┤
│ Pagination                              │
└─────────────────────────────────────────┘
```

### Page Header
```
Layout:
├─ Display: flex, space-between
├─ Padding: 32px 40px 24px
└─ Background: White

Title:
├─ Text: "Lost & Found Items"
├─ Font: H1 (36px, Bold)
└─ Color: Gray/900

Button:
├─ Text: "+ Post New Item"
├─ Type: Primary button
└─ Action: Navigate to /lost-found/new
```

### Search & Filters
```
Layout:
├─ Padding: 0 40px 24px
├─ Background: White
├─ Display: flex
└─ Gap: 16px

Search Bar:
├─ Width: 100%
├─ Placeholder: "Search by title, description..."
└─ Icon: 🔍 (left)

Filters:
├─ Category Dropdown: "All Categories"
├─ Status Dropdown: "All Status"
└─ Sort Dropdown: "Newest First"

Each: 200px width
```

### Results Grid
```
Layout:
├─ Padding: 24px 40px
├─ Background: Gray/50
├─ Display: grid
├─ Columns: 4 (desktop), 2 (tablet), 1 (mobile)
└─ Gap: 24px

Results Count:
├─ Text: "Showing 24 items"
├─ Font: Body/Small (14px)
├─ Color: Gray/600
└─ Margin Bottom: 16px

Cards:
└─ Component: Item Card (12 per page)
```

### Pagination
```
Layout:
├─ Padding: 24px 40px
├─ Display: flex, center
└─ Gap: 8px

Components:
├─ Previous Button: "← Previous"
├─ Page Numbers: 1, 2, 3, 4, 5
├─ Next Button: "Next →"
└─ Current: Primary/500, others Gray/700
```

---

## 6. Lost & Found Detail

**URL**: `/lost-found/:id`  
**Purpose**: View single item

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Navigation Bar (64px)                   │
├─────────────────────────────────────────┤
│ Back Button                             │
├─────────────────────────────────────────┤
│ Content (2 columns)                     │
│ ├─ Left: Image Gallery (60%)           │
│ └─ Right: Details (40%)                │
├─────────────────────────────────────────┤
│ Similar Items                           │
└─────────────────────────────────────────┘
```

### Back Button
```
Component:
├─ Text: "← Back to List"
├─ Type: Text button
├─ Padding: 24px 40px
└─ Action: Navigate to /lost-found
```

### Left Column (Image)
```
Layout:
├─ Width: 60%
├─ Padding: 0 40px 40px

Main Image:
├─ Width: 100%
├─ Height: 600px
├─ Object Fit: cover
├─ Border Radius: 12px
└─ Background: Gray/200

Thumbnails:
├─ Display: flex
├─ Gap: 12px
├─ Margin Top: 16px
└─ Each: 100px × 75px, clickable
```

### Right Column (Details)
```
Layout:
├─ Width: 40%
├─ Padding: 0 40px 40px
└─ Position: sticky, top: 80px

Title:
├─ Font: H1 (36px, Bold)
├─ Color: Gray/900
└─ Margin Bottom: 16px

Badges:
├─ Display: flex
├─ Gap: 8px
├─ Margin Bottom: 16px
└─ Components: Category badge + Status badge

Posted Info:
├─ Text: "Posted 2 hours ago"
├─ Font: Body/Small (14px)
├─ Color: Gray/500
└─ Margin Bottom: 24px

User Card:
├─ Display: flex
├─ Gap: 12px
├─ Padding: 16px
├─ Background: Gray/50
├─ Border Radius: 8px
├─ Margin Bottom: 24px
└─ Content:
    ├─ Avatar: 48px circle
    ├─ Name: "John Doe" (H4)
    └─ Role: "Student" (Caption)

Contact Button:
├─ Text: "📧 Contact Owner"
├─ Type: Primary button, Large
├─ Width: 100%
└─ Margin Bottom: 24px

Description Section:
├─ Heading: "Description" (H3)
├─ Text: Full description
├─ Font: Body (16px)
├─ Color: Gray/700
└─ Margin Bottom: 24px

Details List:
├─ Location: "📍 Near Library"
├─ Date: "🕐 Jan 15, 2:30 PM"
└─ ID: "🆔 #LF-2024-001"

Each:
├─ Font: Body/Small (14px)
├─ Color: Gray/600
└─ Margin: 8px 0
```

### Owner View (Additional Actions)
```
If current user is owner, show:

Action Buttons:
├─ Edit Button: "✏️ Edit Post" (Secondary)
├─ Mark Resolved: "✓ Mark Resolved" (Success)
└─ Delete Button: "🗑️ Delete Post" (Error)

Stats:
├─ Views: 24
└─ Contacts: 3
```

### Similar Items
```
Layout:
├─ Padding: 40px
├─ Background: Gray/50

Heading:
├─ Text: "Similar Items You Might Be Looking For"
├─ Font: H3 (24px, Semibold)
└─ Margin Bottom: 24px

Grid:
├─ Display: grid
├─ Columns: 4
├─ Gap: 24px
└─ Cards: Item Card (4 items)
```

---

## 7. Create Item Form

**URL**: `/lost-found/new`  
**Purpose**: Post new item

### Layout Structure
```
┌─────────────────────────────────────────┐
│ Navigation Bar (64px)                   │
├─────────────────────────────────────────┤
│ Back Button                             │
├─────────────────────────────────────────┤
│ Form Container (centered, 800px)        │
└─────────────────────────────────────────┘
```

### Form Container
```
Layout:
├─ Max Width: 800px
├─ Margin: 0 auto
├─ Padding: 40px
├─ Background: White
├─ Border Radius: 12px
└─ Shadow: 0 2px 8px rgba(0,0,0,0.08)

Heading:
├─ Text: "Post a Lost or Found Item"
├─ Font: H2 (30px, Semibold)
├─ Color: Gray/900
└─ Margin Bottom: 32px

Form Fields:
├─ Item Title * (Text input)
├─ Description * (Textarea, 500 char limit)
├─ Category * (Dropdown)
├─ Status * (Radio: Lost / Found)
├─ Location (Text input, optional)
├─ Date & Time (Date + Time pickers, optional)
├─ Upload Images * (File upload, 1-5 images)
└─ Contact Info (Text input, optional)

Gap: 24px between fields

Actions:
├─ Cancel Button: Secondary, left
└─ Post Item Button: Primary, right
```

### Image Upload
```
Component:
├─ Drag & drop area
├─ Size: 100% × 200px
├─ Border: 2px dashed Gray/300
├─ Border Radius: 8px
├─ Background: Gray/50
└─ Text: "Drag and drop images here or click to browse"

Preview:
├─ Display: grid
├─ Columns: 4
├─ Gap: 12px
└─ Each: 150px × 150px with remove button
```

---

## 8. Edit Item Form

**URL**: `/lost-found/:id/edit`  
**Purpose**: Edit existing item

### Layout
Same as Create Form, but:
- Heading: "Edit Your Post"
- Fields: Pre-filled with existing data
- Button: "Save Changes" instead of "Post Item"

---

## ✅ Screens Checklist

- [x] Landing Page
- [x] Registration Page
- [x] Login Page
- [x] Dashboard
- [x] Lost & Found List
- [x] Lost & Found Detail
- [x] Create Item Form
- [x] Edit Item Form

---

**All screens documented and ready for implementation!**

**Created**: Day 5 of 30-day sprint  
**Last Updated**: January 16, 2026
