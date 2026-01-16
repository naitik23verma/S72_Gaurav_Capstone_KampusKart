# Complete Screen Designs

Detailed specifications for all KampusKart screens.

**Day**: 5 of 30  
**Purpose**: Complete visual design documentation for all screens

---

## 📄 Screen List

1. Landing Page
2. Registration Page
3. Login Page
4. Dashboard
5. Lost & Found List
6. Item Detail
7. Create/Edit Form

---

## 1. Landing Page

### Layout Structure
- Navigation Bar (64px height)
- Hero Section (600px height)
- Features Section (auto height)
- Footer (200px height)

### Navigation Bar
```
Background: White
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Padding: 0 40px

Left: Logo "KampusKart" (H3, Primary/500)
Right: [Login] [Register →] buttons
```

### Hero Section
```
Background: Linear gradient (Primary/50 to White)
Padding: 80px 40px
Display: Flex (row, center aligned)

Left (50%):
- Heading: "Your Campus Community Platform"
  - Font: Display (48px, Bold)
  - Color: Gray/900
  - Margin Bottom: 16px
  
- Subheading: "Find Lost Items • Share Updates • Connect"
  - Font: Body/Large (18px)
  - Color: Gray/700
  - Margin Bottom: 32px
  
- CTA Button: "Get Started →"
  - Type: Primary Button (Large)
  - Width: 200px

Right (50%):
- Hero Illustration
  - Campus scene with students
  - Size: 500px × 400px
```


### Features Section
```
Background: White
Padding: 80px 40px

Heading: "How It Works" (H2, centered)
Margin Bottom: 48px

Feature Cards (3 across):
- Width: 320px each
- Gap: 24px
- White background
- Padding: 32px
- Border Radius: 12px
- Shadow: 0 2px 8px rgba(0,0,0,0.08)

Each Card:
- Icon: 32px (Primary/500)
- Title: H4 (20px, Semibold)
- Description: Body (16px, Gray/700)
- Gap: 16px between elements
```

### Footer
```
Background: Gray/900
Padding: 40px
Color: White

Links: About | How It Works | Privacy | Terms | Contact
Copyright: © 2026 KampusKart
```

---

## 2. Registration Page

### Layout
Split screen (50/50)

### Left Side
```
Background: Primary/50
Padding: 80px 40px
Display: Flex (center aligned)

Illustration:
- Campus scene with students helping each other
- Size: 500px × 600px
```

### Right Side
```
Background: White
Padding: 80px 40px
Display: Flex (center aligned)

Form Container:
- Max Width: 400px
- Centered

Elements:
1. Back Button (top left)
   - Text button: "← Back"
   
2. Heading: "Create Your Account"
   - Font: H2 (30px, Semibold)
   - Margin Bottom: 32px

3. Input: Full Name
   - Label: "Full Name *"
   - Placeholder: "Enter your full name"
   - Margin Bottom: 16px

4. Input: Email Address
   - Label: "Email Address *"
   - Placeholder: "you@campus.edu"
   - Margin Bottom: 16px

5. Input: Password
   - Label: "Password *"
   - Type: password
   - Helper: "Must be at least 8 characters"
   - Margin Bottom: 16px

6. Input: Confirm Password
   - Label: "Confirm Password *"
   - Type: password
   - Margin Bottom: 24px

7. Button: "Create Account"
   - Type: Primary (full width)
   - Margin Bottom: 16px

8. Divider: "OR"
   - Gray/400, 12px
   - Margin: 16px 0

9. Button: "Continue with Google"
   - Type: Secondary (full width)
   - Icon: Google logo (20px)
   - Margin Bottom: 24px

10. Link: "Already have an account? Login here"
    - Font: Body/Small (14px)
    - Color: Primary/500
    - Text Align: center
```

---

## 3. Login Page

### Layout
Same as Registration (split 50/50)

### Right Side Form
```
Form Container: Max Width 400px

Elements:
1. Back Button
2. Heading: "Welcome Back!"
3. Input: Email Address
4. Input: Password
5. Link: "Forgot Password?" (right aligned)
6. Button: "Login" (Primary, full width)
7. Divider: "OR"
8. Button: "Continue with Google" (Secondary)
9. Link: "Don't have an account? Register here"
```

---

## 4. Dashboard

### Navigation Bar
Standard top nav (64px)

### Content Area
```
Background: Gray/50
Padding: 40px

1. Welcome Message
   - Text: "Welcome back, Gaurav! 👋"
   - Font: H2 (30px, Semibold)
   - Margin Bottom: 32px

2. Stats Cards Row
   - Display: Grid (3 columns)
   - Gap: 24px
   - Margin Bottom: 48px
   
   Cards:
   - Total Items: 24
   - Resolved: 18
   - New Today: 5
   
   Each card:
   - Icon: 32px (top)
   - Number: 36px Bold
   - Label: 14px Regular

3. Recent Lost & Found Section
   - Heading: "Recent Lost & Found Items"
   - Action: "View All →" (text button, right)
   - Margin Bottom: 24px
   
   Item Grid:
   - Display: Grid (4 columns)
   - Gap: 24px
   - Margin Bottom: 48px
   
   Each Item Card:
   - Image: 280px × 210px
   - Title: H4
   - Description: Body/Small (2 lines max)
   - Badges: Category + Status
   - Metadata: "2h ago • by @john"

4. Campus Updates Section
   - Heading: "Campus Updates"
   - Action: "View All →"
   - Margin Bottom: 24px
   
   Update Cards:
   - Display: Stack (vertical)
   - Gap: 16px
   
   Each Update:
   - Icon + Title
   - Metadata: "Posted by Admin • 3h ago"
   - Preview text (2 lines)

5. Floating Action Button
   - Position: Fixed bottom-right
   - Size: 60px circle
   - Background: Primary/500
   - Icon: "+" (32px, White)
   - Shadow: Large
```

---

## 5. Lost & Found List

### Navigation Bar
Standard top nav

### Content Area
```
Background: Gray/50
Padding: 40px

1. Page Header
   - Title: "Lost & Found Items" (H2)
   - Margin Bottom: 24px

2. Search & Filter Bar
   - Display: Flex (row)
   - Gap: 16px
   - Margin Bottom: 32px
   
   Elements:
   - Search Input (flex: 1)
   - Category Dropdown (200px)
   - Status Dropdown (150px)
   - Sort Dropdown (180px)
   - "Post New Item" Button (Primary)

3. Results Count
   - Text: "Showing 24 items"
   - Font: Body/Small (14px, Gray/600)
   - Margin Bottom: 16px

4. Item Grid
   - Display: Grid (4 columns desktop, 2 tablet, 1 mobile)
   - Gap: 24px
   - Margin Bottom: 32px
   
   Each Item Card: (same as dashboard)

5. Pagination
   - Display: Flex (center)
   - Gap: 8px
   
   Elements:
   - "← Previous" button
   - Page numbers (1, 2, 3, 4, 5)
   - "Next →" button
```

---

## 6. Item Detail

### Navigation Bar
Standard top nav

### Content Area
```
Background: Gray/50
Padding: 40px

Layout: Two columns (60% / 40%)

Left Column:
1. Back Button
   - "← Back to List"
   - Margin Bottom: 24px

2. Image Gallery
   - Main Image: 800px × 600px
   - Border Radius: 12px
   - Margin Bottom: 16px
   
   Thumbnails:
   - Display: Flex (row)
   - Gap: 12px
   - Each: 100px × 75px
   - Active: Border 2px Primary/500

3. Description Section
   - Background: White
   - Padding: 24px
   - Border Radius: 12px
   
   Heading: "Description" (H4)
   Text: Full description (Body)

Right Column:
1. Item Info Card
   - Background: White
   - Padding: 24px
   - Border Radius: 12px
   - Shadow: 0 2px 8px rgba(0,0,0,0.08)
   
   Elements:
   - Title: H3
   - Badges: Category + Status
   - Posted: "2 hours ago"
   - Divider
   - User Profile:
     - Avatar (48px)
     - Name (H4)
     - Username (@john)
     - Role (Student)
   - Divider
   - Contact Button (Primary, full width)
   - Or Owner Actions:
     - Edit Button (Secondary)
     - Mark Resolved Button (Success)
     - Delete Button (Error)
   - Divider
   - Location: "📍 Near Library"
   - Last Seen: "🕐 Jan 15, 2:30 PM"
   - Item ID: "#LF-2024-001"

2. Similar Items
   - Heading: "Similar Items"
   - Grid: 2 columns
   - Gap: 16px
   - Mini Item Cards
```

---

## 7. Create/Edit Form

### Navigation Bar
Standard top nav

### Content Area
```
Background: Gray/50
Padding: 40px

Form Container:
- Max Width: 800px
- Centered
- Background: White
- Padding: 40px
- Border Radius: 12px

Elements:
1. Back Button
2. Heading: "Post a Lost or Found Item" (H2)
3. Form Fields (all with labels):
   
   - Item Title *
     - Input: Text
     - Placeholder: "e.g., Lost Brown Wallet"
   
   - Description *
     - Textarea: 100px min height
     - Placeholder: "Provide detailed information..."
     - Character count: "0 / 500"
   
   - Category *
     - Dropdown
     - Options: Wallet, Keys, Phone, Documents, etc.
   
   - Status *
     - Radio buttons: Lost / Found
   
   - Location (Optional)
     - Input: Text
     - Placeholder: "e.g., Near Library"
   
   - Date & Time (Optional)
     - Date picker + Time picker
   
   - Upload Images *
     - Drag & drop area
     - Or click to browse
     - Preview thumbnails
     - Max 5 images
   
   - Contact Info (Optional)
     - Input: Text
     - Helper: "Your profile email will be used by default"

4. Action Buttons
   - Display: Flex (right aligned)
   - Gap: 12px
   
   - Cancel (Secondary)
   - Post Item (Primary)
```

---

## ✅ All Screens Documented

- [x] Landing Page
- [x] Registration Page
- [x] Login Page
- [x] Dashboard
- [x] Lost & Found List
- [x] Item Detail
- [x] Create/Edit Form

---

**Complete screen designs ready for implementation!**

**Created**: Day 5 of 30-day sprint  
**Last Updated**: January 16, 2026
