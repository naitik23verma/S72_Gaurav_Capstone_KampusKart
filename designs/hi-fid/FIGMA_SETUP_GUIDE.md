# Figma Setup Guide

Step-by-step guide to set up your KampusKart Figma file.

**Day**: 4 of 30  
**Time Required**: 30-45 minutes  
**Output**: Professional Figma file with component library

---

## 🚀 Getting Started

### 1. Create Figma Account
1. Go to [figma.com](https://figma.com)
2. Sign up with Google (quick!)
3. Choose "Free" plan (sufficient for this project)

### 2. Create New File
1. Click "New design file"
2. Rename to: **"KampusKart - Hi-Fid Design"**
3. Set canvas size: **1440px width** (desktop first)

---

## 🎨 Step 1: Set Up Color Styles (15 min)

### How to Create Color Styles
1. Select any shape (press **R** for rectangle)
2. In right panel, click **Fill** color
3. Click **Style icon** (four dots)
4. Click **+** to create new style
5. Name it properly (e.g., "Primary/500")
6. Repeat for all colors

### Colors to Create

#### Primary Colors (Blue)
```
Name: Primary/50   | Hex: #E3F2FD
Name: Primary/100  | Hex: #BBDEFB
Name: Primary/500  | Hex: #2196F3  ⭐ Main
Name: Primary/600  | Hex: #1E88E5
Name: Primary/700  | Hex: #1976D2
Name: Primary/900  | Hex: #0D47A1
```

#### Secondary Colors (Green)
```
Name: Secondary/50  | Hex: #E8F5E9
Name: Secondary/500 | Hex: #4CAF50  ⭐ Main
Name: Secondary/700 | Hex: #388E3C
```

#### Semantic Colors
```
Name: Success/Main  | Hex: #4CAF50
Name: Warning/Main  | Hex: #FF9800
Name: Error/Main    | Hex: #F44336
Name: Info/Main     | Hex: #2196F3
```

#### Gray Scale (Most Important!)
```
Name: Gray/50   | Hex: #FAFAFA
Name: Gray/100  | Hex: #F5F5F5
Name: Gray/200  | Hex: #EEEEEE
Name: Gray/300  | Hex: #E0E0E0
Name: Gray/500  | Hex: #9E9E9E
Name: Gray/600  | Hex: #757575
Name: Gray/700  | Hex: #616161
Name: Gray/900  | Hex: #212121
Name: White     | Hex: #FFFFFF
```

#### Category Colors
```
Name: Category/Wallet    | Hex: #9C27B0
Name: Category/Keys      | Hex: #FF9800
Name: Category/Phone     | Hex: #2196F3
Name: Category/Documents | Hex: #009688
Name: Category/Other     | Hex: #757575
```

**Pro Tip**: Organize colors in folders (Primary, Secondary, Gray, etc.)

---

## 🔤 Step 2: Set Up Text Styles (15 min)

### How to Create Text Styles
1. Press **T** for text tool
2. Type some text
3. In right panel, set font properties
4. Click **Style icon** (four dots) next to "Text"
5. Click **+** to create new style
6. Name it properly
7. Repeat for all text styles

### Text Styles to Create

```
Name: Display
├─ Font: System (or Inter/Roboto if available)
├─ Size: 48px
├─ Weight: Bold (700)
├─ Line Height: 120% (57.6px)
└─ Color: Gray/900

Name: H1
├─ Size: 36px
├─ Weight: Bold (700)
├─ Line Height: 120%
└─ Color: Gray/900

Name: H2
├─ Size: 30px
├─ Weight: Semibold (600)
├─ Line Height: 130%
└─ Color: Gray/900

Name: H3
├─ Size: 24px
├─ Weight: Semibold (600)
├─ Line Height: 140%
└─ Color: Gray/900

Name: H4
├─ Size: 20px
├─ Weight: Semibold (600)
├─ Line Height: 140%
└─ Color: Gray/700

Name: Body/Large
├─ Size: 18px
├─ Weight: Regular (400)
├─ Line Height: 160%
└─ Color: Gray/700

Name: Body/Default
├─ Size: 16px
├─ Weight: Regular (400)
├─ Line Height: 150%
└─ Color: Gray/700

Name: Body/Small
├─ Size: 14px
├─ Weight: Regular (400)
├─ Line Height: 150%
└─ Color: Gray/600

Name: Caption
├─ Size: 12px
├─ Weight: Regular (400)
├─ Line Height: 140%
└─ Color: Gray/500

Name: Button/Medium
├─ Size: 16px
├─ Weight: Semibold (600)
├─ Line Height: 120%
└─ Color: White
```

---

## 🎯 Step 3: Create Component Library (20 min)

### Create a New Page: "Components"
1. Click **+** next to page name
2. Rename to: **"Components"**
3. This is where you'll build reusable components

### Component 1: Primary Button

1. **Create Frame** (press **F**)
   - Name: "Button/Primary/Medium"
   - Width: Auto
   - Height: 40px

2. **Add Rectangle** (press **R**)
   - Fill: Primary/500
   - Border Radius: 8px
   - Shadow: 0 2px 4px rgba(0,0,0,0.1)

3. **Add Text** (press **T**)
   - Text: "Button Text"
   - Style: Button/Medium
   - Color: White
   - Center align

4. **Add Padding**
   - Horizontal: 20px
   - Vertical: 10px
   - Use Auto Layout (Shift + A)

5. **Create Component** (Ctrl/Cmd + Alt + K)

6. **Add Variants**
   - Right-click component → "Add variant"
   - Create: Default, Hover, Active, Disabled
   - Hover: Change fill to Primary/600
   - Active: Change fill to Primary/700
   - Disabled: Change fill to Gray/300, text to Gray/500

### Component 2: Secondary Button

Same as Primary, but:
- Fill: White
- Border: 2px solid Primary/500
- Text Color: Primary/500

### Component 3: Text Input

1. **Create Frame**
   - Name: "Input/Text/Default"
   - Width: 320px
   - Height: 40px

2. **Add Rectangle**
   - Fill: White
   - Border: 1px solid Gray/300
   - Border Radius: 8px

3. **Add Placeholder Text**
   - Text: "Enter text..."
   - Style: Body/Default
   - Color: Gray/500
   - Padding: 12px

4. **Create Component**

5. **Add Variants**
   - Default, Focus, Error, Success, Disabled
   - Focus: Border 2px Primary/500, add shadow
   - Error: Border 2px Error/Main
   - Success: Border 2px Success/Main

### Component 4: Item Card

1. **Create Frame**
   - Name: "Card/Item"
   - Width: 280px
   - Height: Auto

2. **Add Image Placeholder**
   - Rectangle: 280px × 210px (4:3 ratio)
   - Fill: Gray/200
   - Border Radius: 12px 12px 0 0

3. **Add Content Section**
   - Frame with Auto Layout
   - Padding: 16px
   - Gap: 8px

4. **Add Elements**
   - Title (H4 style)
   - Description (Body/Small, 2 lines max)
   - Badges (Category + Status)
   - Metadata (time + user)

5. **Create Component**

### Component 5: Badge

1. **Create Frame**
   - Name: "Badge/Status/Open"
   - Height: 24px
   - Width: Auto

2. **Add Rectangle**
   - Fill: Success/100
   - Border Radius: 12px (pill)

3. **Add Text**
   - Text: "Open"
   - Size: 12px, Semibold
   - Color: Success/900
   - Padding: 4px 12px

4. **Create Component**

5. **Add Variants**
   - Open (green)
   - Resolved (blue)

---

## 📄 Step 4: Design First Screen - Landing Page (30 min)

### Create New Page: "Screens"

### Landing Page Layout

1. **Create Frame** (press **F**)
   - Name: "Landing Page"
   - Width: 1440px
   - Height: Auto (will grow)

2. **Add Navigation Bar**
   - Frame: 1440px × 64px
   - Background: White
   - Shadow: 0 2px 8px rgba(0,0,0,0.08)
   - Content:
     - Logo (left): "KampusKart" (H3 style)
     - Buttons (right): "Login" + "Register"

3. **Add Hero Section**
   - Frame: 1440px × 600px
   - Background: Gradient (Primary/50 to White)
   - Content:
     - Heading: "Your Campus Community Platform" (Display style)
     - Subheading: "Find Lost Items • Share Updates • Connect" (Body/Large)
     - CTA Button: "Get Started" (Primary button)
     - Hero Image/Illustration (right side)

4. **Add Features Section**
   - Frame: 1440px × Auto
   - Padding: 80px 40px
   - Background: White
   - Content:
     - Section Heading: "How It Works" (H2)
     - 3 Feature Cards:
       - Icon + Title + Description
       - Use Auto Layout with 24px gap

5. **Add Footer**
   - Frame: 1440px × 200px
   - Background: Gray/900
   - Content:
     - Links: About | How It Works | Privacy | Terms
     - Copyright text
     - Color: White/Gray/300

### Design Tips
- Use **Auto Layout** (Shift + A) for everything
- Maintain **consistent spacing** (16px, 24px, 32px)
- Use **color styles** (don't use raw hex)
- Use **text styles** (don't manually set fonts)
- Add **shadows** for depth
- Keep it **clean and minimal**

---

## 📄 Step 5: Design Auth Screens (30 min)

### Registration Page

1. **Create Frame**: "Registration Page" (1440px)

2. **Layout**:
   - Left side (50%): Illustration/Image
   - Right side (50%): Form

3. **Form Content**:
   - Heading: "Create Your Account" (H2)
   - Input: Full Name
   - Input: Email Address
   - Input: Password
   - Input: Confirm Password
   - Button: "Create Account" (Primary, full width)
   - Divider: "OR"
   - Button: "Continue with Google" (Secondary)
   - Link: "Already have an account? Login here"

4. **Styling**:
   - Form container: 400px width, centered
   - Inputs: 16px gap between
   - Use component instances (not raw shapes)

### Login Page

Similar to Registration, but:
- Heading: "Welcome Back!"
- Only 2 inputs: Email + Password
- Add: "Forgot Password?" link
- Button: "Login"
- Link: "Don't have an account? Register here"

---

## 📄 Step 6: Design Dashboard (Optional - if time)

### Dashboard Layout

1. **Create Frame**: "Dashboard" (1440px)

2. **Add Navigation** (reuse from landing)

3. **Add Content Area**:
   - Welcome message: "Welcome back, Gaurav!" (H2)
   - Stats cards (3 across):
     - Total Items
     - Resolved Items
     - New Today
   - Recent Lost & Found section:
     - Section heading + "View All" link
     - 4 item cards in grid
   - Campus Updates section:
     - Section heading + "View All" link
     - 3 update cards

4. **Add Floating Action Button**:
   - Position: Fixed bottom-right
   - Size: 60px × 60px
   - Icon: "+" (plus)
   - Color: Primary/500
   - Shadow: Large

---

## 🎨 Design Best Practices

### Consistency
- ✅ Use color styles (not raw colors)
- ✅ Use text styles (not manual formatting)
- ✅ Use components (not duplicate shapes)
- ✅ Use Auto Layout (for responsive design)
- ✅ Name layers properly

### Spacing
- ✅ Use 8px grid (8, 16, 24, 32...)
- ✅ Consistent padding in cards (16px or 24px)
- ✅ Consistent gaps between elements
- ✅ Align to pixel grid (no half pixels)

### Typography
- ✅ Clear hierarchy (Display → H1 → H2 → Body)
- ✅ Readable line heights (1.4-1.6 for body)
- ✅ Proper contrast (Gray/900 on White)
- ✅ Limited font sizes (use the scale)

### Colors
- ✅ Use primary color sparingly (buttons, links)
- ✅ Lots of white space (Gray/50 backgrounds)
- ✅ Semantic colors for status (green = success)
- ✅ Sufficient contrast (WCAG AA)

---

## 📤 Exporting & Sharing

### Share Figma Link
1. Click **Share** button (top right)
2. Change to: "Anyone with the link can view"
3. Copy link
4. Add to your repo: `designs/hi-fid/Figma-Link.md`

### Export Screens
1. Select frame
2. Right panel → Export
3. Format: PNG
4. Scale: 2x (for retina)
5. Export to: `designs/hi-fid/screens/`

### Export Components
1. Select component
2. Export as PNG (2x)
3. Save to: `designs/hi-fid/components/`

---

## ✅ Completion Checklist

### Setup
- [ ] Figma account created
- [ ] New file created: "KampusKart - Hi-Fid Design"
- [ ] Color styles created (20+ colors)
- [ ] Text styles created (10+ styles)

### Components
- [ ] Primary button (with variants)
- [ ] Secondary button
- [ ] Text button
- [ ] Text input (with states)
- [ ] Textarea
- [ ] Item card
- [ ] Stats card
- [ ] Status badge
- [ ] Category badge
- [ ] Modal

### Screens
- [ ] Landing page
- [ ] Registration page
- [ ] Login page
- [ ] Dashboard (optional)

### Documentation
- [ ] Figma link shared publicly
- [ ] Screenshots exported
- [ ] Link added to repo

---

## 🎥 Video Proof Checklist

Show in your video:
- [ ] Figma file overview
- [ ] Color styles panel (show all colors)
- [ ] Text styles panel (show all styles)
- [ ] Components page (show all components)
- [ ] Landing page design
- [ ] Registration page design
- [ ] Login page design
- [ ] Component variants (hover, active states)
- [ ] Responsive behavior (if time)

---

## 💡 Pro Tips

1. **Use Plugins**:
   - "Unsplash" - Free stock photos
   - "Iconify" - Free icons
   - "Lorem Ipsum" - Placeholder text

2. **Keyboard Shortcuts**:
   - **F**: Frame
   - **R**: Rectangle
   - **T**: Text
   - **Shift + A**: Auto Layout
   - **Ctrl/Cmd + D**: Duplicate
   - **Ctrl/Cmd + G**: Group
   - **Ctrl/Cmd + Alt + K**: Create Component

3. **Organization**:
   - Page 1: "Components"
   - Page 2: "Screens"
   - Page 3: "Style Guide" (optional)

4. **Naming Convention**:
   - Components: "Category/Name/Variant"
   - Screens: "Screen Name - State"
   - Layers: Descriptive names (not "Rectangle 1")

---

**Follow this guide and you'll have a professional Figma file in 2-3 hours!**

**Created**: Day 4 of 30-day sprint  
**Last Updated**: January 16, 2026
