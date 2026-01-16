# Component Library Documentation

Complete component library for KampusKart with all variants and states.

**Day**: 5 of 30  
**Purpose**: Document all reusable components for implementation

---

## 🎨 Component Overview

This library contains all reusable UI components used throughout KampusKart. Each component is documented with:
- Visual specifications
- All variants and states
- Usage guidelines
- Code-ready CSS specifications

---

## 1. Buttons

### Primary Button

**Purpose**: Main call-to-action buttons

#### Variants

**Medium (Default)**
```
Dimensions: Auto width × 40px height
Padding: 10px (vertical) × 20px (horizontal)
Background: Primary/500 (#2196F3)
Text: White (#FFFFFF)
Font: 16px, Semibold (600)
Border: None
Border Radius: 8px
Shadow: 0 2px 4px rgba(0,0,0,0.1)
Cursor: pointer

States:
├─ Default: As above
├─ Hover: 
│  ├─ Background: Primary/600 (#1E88E5)
│  ├─ Shadow: 0 4px 8px rgba(0,0,0,0.15)
│  └─ Transform: translateY(-1px)
├─ Active:
│  ├─ Background: Primary/700 (#1976D2)
│  ├─ Shadow: 0 1px 2px rgba(0,0,0,0.1)
│  └─ Transform: translateY(0)
├─ Focus:
│  ├─ Outline: 0 0 0 3px rgba(33,150,243,0.3)
│  └─ Outline Offset: 2px
└─ Disabled:
   ├─ Background: Gray/300 (#E0E0E0)
   ├─ Text: Gray/500 (#9E9E9E)
   ├─ Shadow: None
   └─ Cursor: not-allowed
```

**Large**
```
Dimensions: Auto × 48px
Padding: 12px × 24px
Font: 18px, Semibold (600)
(Other properties same as Medium)
```

**Small**
```
Dimensions: Auto × 32px
Padding: 8px × 16px
Font: 14px, Semibold (600)
(Other properties same as Medium)
```

**With Icon**
```
Icon: 20px × 20px (Medium), 24px (Large), 16px (Small)
Icon Position: Left or Right
Gap: 8px between icon and text
Icon Color: Inherits text color
```

#### CSS Implementation
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  background: #2196F3;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 200ms ease-out;
}

.btn-primary:hover {
  background: #1E88E5;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  transform: translateY(-1px);
}

.btn-primary:active {
  background: #1976D2;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  transform: translateY(0);
}

.btn-primary:focus {
  outline: 0 0 0 3px rgba(33,150,243,0.3);
  outline-offset: 2px;
}

.btn-primary:disabled {
  background: #E0E0E0;
  color: #9E9E9E;
  box-shadow: none;
  cursor: not-allowed;
}
```

---

### Secondary Button

**Purpose**: Secondary actions, cancel buttons

```
Dimensions: Auto × 40px (Medium)
Padding: 10px × 20px
Background: White (#FFFFFF)
Text: Primary/500 (#2196F3)
Font: 16px, Semibold (600)
Border: 2px solid Primary/500 (#2196F3)
Border Radius: 8px
Shadow: None
Cursor: pointer

States:
├─ Default: As above
├─ Hover:
│  ├─ Background: Primary/50 (#E3F2FD)
│  └─ Border: Primary/600 (#1E88E5)
├─ Active:
│  ├─ Background: Primary/100 (#BBDEFB)
│  └─ Border: Primary/700 (#1976D2)
├─ Focus:
│  └─ Outline: 0 0 0 3px rgba(33,150,243,0.3)
└─ Disabled:
   ├─ Background: White
   ├─ Text: Gray/400 (#BDBDBD)
   ├─ Border: Gray/300 (#E0E0E0)
   └─ Cursor: not-allowed
```

---

### Text Button

**Purpose**: Tertiary actions, links

```
Dimensions: Auto × Auto
Padding: 8px × 12px
Background: Transparent
Text: Primary/500 (#2196F3)
Font: 16px, Semibold (600)
Border: None
Border Radius: 8px
Cursor: pointer

States:
├─ Default: As above
├─ Hover:
│  ├─ Background: Primary/50 (#E3F2FD)
│  └─ Text: Primary/600 (#1E88E5)
├─ Active:
│  ├─ Background: Primary/100 (#BBDEFB)
│  └─ Text: Primary/700 (#1976D2)
└─ Disabled:
   ├─ Text: Gray/400 (#BDBDBD)
   └─ Cursor: not-allowed
```

---

## 2. Input Fields

### Text Input

**Purpose**: Single-line text entry

```
Dimensions: 100% width × 40px height
Padding: 10px × 12px
Background: White (#FFFFFF)
Text: Gray/900 (#212121)
Font: 16px, Regular (400)
Border: 1px solid Gray/300 (#E0E0E0)
Border Radius: 8px
Placeholder: Gray/500 (#9E9E9E)

States:
├─ Default: As above
├─ Focus:
│  ├─ Border: 2px solid Primary/500 (#2196F3)
│  ├─ Outline: 0 0 0 3px rgba(33,150,243,0.1)
│  └─ Padding: 9px × 11px (adjust for thicker border)
├─ Error:
│  ├─ Border: 2px solid Error/Main (#F44336)
│  └─ Outline: 0 0 0 3px rgba(244,67,54,0.1)
├─ Success:
│  ├─ Border: 2px solid Success/Main (#4CAF50)
│  └─ Outline: 0 0 0 3px rgba(76,175,80,0.1)
└─ Disabled:
   ├─ Background: Gray/100 (#F5F5F5)
   ├─ Border: Gray/300 (#E0E0E0)
   ├─ Text: Gray/500 (#9E9E9E)
   └─ Cursor: not-allowed
```

**With Label**
```
Label:
├─ Font: 14px, Semibold (600)
├─ Color: Gray/700 (#616161)
├─ Margin Bottom: 8px
└─ Required Indicator: Red asterisk (*)

Helper Text:
├─ Font: 12px, Regular (400)
├─ Color: Gray/500 (#9E9E9E)
├─ Margin Top: 4px

Error Message:
├─ Font: 12px, Regular (400)
├─ Color: Error/Main (#F44336)
├─ Margin Top: 4px
├─ Icon: ⚠️ (16px)
```

---

### Textarea

**Purpose**: Multi-line text entry

```
Same as Text Input, but:
├─ Min Height: 100px
├─ Max Height: 300px
├─ Resize: vertical
└─ Padding: 12px
```

---

### Dropdown/Select

**Purpose**: Select from options

```
Dimensions: 100% width × 40px height
Padding: 10px × 12px
Background: White (#FFFFFF)
Text: Gray/900 (#212121)
Font: 16px, Regular (400)
Border: 1px solid Gray/300 (#E0E0E0)
Border Radius: 8px
Icon: Chevron down (16px, Gray/600)
Icon Position: Right, 12px from edge

States:
├─ Default: As above
├─ Open:
│  ├─ Border: 2px solid Primary/500
│  └─ Icon: Chevron up
├─ Focus: Same as Text Input
└─ Disabled: Same as Text Input

Dropdown Menu:
├─ Background: White
├─ Border: 1px solid Gray/200
├─ Border Radius: 8px
├─ Shadow: 0 8px 24px rgba(0,0,0,0.15)
├─ Max Height: 300px
├─ Overflow: auto
└─ Z-index: 1000

Menu Item:
├─ Padding: 12px × 16px
├─ Font: 16px, Regular (400)
├─ Hover: Background Gray/50
├─ Selected: Background Primary/50, Text Primary/700
└─ Active: Background Primary/100
```

---

## 3. Cards

### Item Card

**Purpose**: Display lost & found items in grid

```
Dimensions: 280px width × Auto height
Background: White (#FFFFFF)
Border: 1px solid Gray/200 (#EEEEEE)
Border Radius: 12px
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Overflow: hidden

Structure:
├─ Image Section:
│  ├─ Dimensions: 280px × 210px (4:3 ratio)
│  ├─ Border Radius: 12px 12px 0 0
│  ├─ Object Fit: cover
│  └─ Background: Gray/200 (placeholder)
│
└─ Content Section:
   ├─ Padding: 16px
   ├─ Gap: 8px (between elements)
   │
   ├─ Title:
   │  ├─ Font: 20px, Semibold (600)
   │  ├─ Color: Gray/900
   │  ├─ Max Lines: 1
   │  └─ Overflow: ellipsis
   │
   ├─ Description:
   │  ├─ Font: 14px, Regular (400)
   │  ├─ Color: Gray/600
   │  ├─ Max Lines: 2
   │  └─ Overflow: ellipsis
   │
   ├─ Badges Row:
   │  ├─ Display: flex
   │  ├─ Gap: 8px
   │  └─ Contains: Category badge + Status badge
   │
   └─ Metadata:
      ├─ Font: 12px, Regular (400)
      ├─ Color: Gray/500
      └─ Format: "2h ago • by @username"

States:
├─ Default: As above
├─ Hover:
│  ├─ Shadow: 0 4px 16px rgba(0,0,0,0.12)
│  ├─ Transform: translateY(-2px)
│  ├─ Border: 1px solid Primary/200
│  └─ Transition: all 300ms ease-out
└─ Active:
   └─ Transform: translateY(0)
```

---

### Stats Card

**Purpose**: Display dashboard statistics

```
Dimensions: Flexible width × Auto height
Background: White (#FFFFFF)
Border: 1px solid Gray/200 (#EEEEEE)
Border Radius: 12px
Padding: 24px
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Text Align: center

Structure:
├─ Icon:
│  ├─ Size: 32px × 32px
│  ├─ Color: Primary/500
│  └─ Margin Bottom: 12px
│
├─ Number:
│  ├─ Font: 36px, Bold (700)
│  ├─ Color: Gray/900
│  └─ Margin Bottom: 4px
│
└─ Label:
   ├─ Font: 14px, Regular (400)
   └─ Color: Gray/600

States:
├─ Default: As above
└─ Hover:
   ├─ Background: Gray/50
   └─ Cursor: pointer (if clickable)
```

---

### Update Card

**Purpose**: Display campus updates

```
Dimensions: 100% width × Auto height
Background: White (#FFFFFF)
Border: 1px solid Gray/200
Border Radius: 8px
Padding: 16px
Shadow: 0 2px 8px rgba(0,0,0,0.08)

Structure:
├─ Header Row:
│  ├─ Icon: 24px (emoji or icon)
│  ├─ Title: H4 (20px, Semibold)
│  └─ Gap: 12px
│
├─ Metadata:
│  ├─ Font: 12px, Regular (400)
│  ├─ Color: Gray/500
│  ├─ Format: "Posted by [Author] • [Time]"
│  └─ Margin: 4px 0
│
└─ Preview Text:
   ├─ Font: 14px, Regular (400)
   ├─ Color: Gray/700
   ├─ Max Lines: 2
   └─ Overflow: ellipsis

States:
├─ Default: As above
└─ Hover:
   ├─ Background: Gray/50
   └─ Cursor: pointer
```

---

## 4. Badges

### Status Badge

**Purpose**: Show item status (Open/Resolved)

```
Dimensions: Auto width × 24px height
Padding: 4px × 12px
Border Radius: 12px (pill shape)
Font: 12px, Semibold (600)
Display: inline-flex
Align Items: center

Variants:
├─ Open:
│  ├─ Background: Success/100 (#C8E6C9)
│  └─ Text: Success/900 (#1B5E20)
│
└─ Resolved:
   ├─ Background: Primary/100 (#BBDEFB)
   └─ Text: Primary/900 (#0D47A1)
```

---

### Category Badge

**Purpose**: Show item category

```
Same structure as Status Badge, but colors vary:

├─ Wallet:
│  ├─ Background: rgba(156,39,176,0.1)
│  └─ Text: #6A1B9A
│
├─ Keys:
│  ├─ Background: rgba(255,152,0,0.1)
│  └─ Text: #E65100
│
├─ Phone:
│  ├─ Background: rgba(33,150,243,0.1)
│  └─ Text: #0D47A1
│
├─ Documents:
│  ├─ Background: rgba(0,150,136,0.1)
│  └─ Text: #004D40
│
└─ Other:
   ├─ Background: rgba(117,117,117,0.1)
   └─ Text: #424242
```

---

## 5. Navigation

### Top Navigation Bar

**Purpose**: Main site navigation

```
Dimensions: 100% width × 64px height
Background: White (#FFFFFF)
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Position: fixed top
Z-index: 1000
Padding: 0 40px (desktop), 0 16px (mobile)

Structure:
├─ Logo (Left):
│  ├─ Text: "KampusKart"
│  ├─ Font: 24px, Semibold (600)
│  ├─ Color: Primary/500
│  └─ Cursor: pointer
│
├─ Search Bar (Center, desktop only):
│  ├─ Width: 400px
│  ├─ Height: 40px
│  ├─ Background: Gray/50
│  ├─ Border: 1px solid Gray/200
│  ├─ Border Radius: 8px
│  ├─ Placeholder: "Search items..."
│  └─ Icon: Search (20px, Gray/500)
│
└─ Actions (Right):
   ├─ Nav Links (desktop):
   │  ├─ Font: 16px, Regular (400)
   │  ├─ Color: Gray/700
   │  ├─ Hover: Color Primary/500
   │  └─ Gap: 24px
   │
   └─ Profile Dropdown:
      ├─ Avatar: 40px circle
      ├─ Name: 16px, Semibold
      └─ Chevron: 16px
```

---

### Mobile Menu (Hamburger)

**Purpose**: Mobile navigation

```
Trigger Button:
├─ Size: 40px × 40px
├─ Icon: Hamburger (24px)
├─ Color: Gray/700
└─ Position: Top left

Drawer:
├─ Width: 280px
├─ Height: 100vh
├─ Background: White
├─ Shadow: 0 0 24px rgba(0,0,0,0.2)
├─ Position: fixed left
├─ Z-index: 2000
└─ Animation: Slide in from left (300ms)

Menu Items:
├─ Padding: 16px × 24px
├─ Font: 16px, Regular (400)
├─ Color: Gray/700
├─ Hover: Background Gray/50
├─ Active: Background Primary/50, Text Primary/700
└─ Icon: 24px (left aligned)
```

---

## 6. Modals

### Standard Modal

**Purpose**: Dialogs, confirmations, forms

```
Overlay:
├─ Background: rgba(0,0,0,0.5)
├─ Position: fixed (full screen)
├─ Z-index: 3000
├─ Display: flex
├─ Align: center
└─ Justify: center

Modal Container:
├─ Background: White (#FFFFFF)
├─ Border Radius: 16px
├─ Max Width: 600px
├─ Width: 90% (mobile)
├─ Padding: 32px
├─ Shadow: 0 20px 60px rgba(0,0,0,0.3)
└─ Position: relative

Structure:
├─ Close Button (Top Right):
│  ├─ Size: 32px × 32px
│  ├─ Icon: X (20px)
│  ├─ Color: Gray/600
│  ├─ Hover: Background Gray/100
│  └─ Position: absolute, top 16px, right 16px
│
├─ Header:
│  ├─ Font: 24px, Semibold (600)
│  ├─ Color: Gray/900
│  └─ Margin Bottom: 16px
│
├─ Body:
│  ├─ Font: 16px, Regular (400)
│  ├─ Color: Gray/700
│  ├─ Line Height: 1.5
│  └─ Margin Bottom: 24px
│
└─ Footer:
   ├─ Display: flex
   ├─ Gap: 12px
   ├─ Justify: flex-end
   └─ Contains: Cancel + Confirm buttons

Animation:
├─ Enter: Fade in + Scale up (300ms)
└─ Exit: Fade out + Scale down (200ms)
```

---

## 7. Loading States

### Spinner

**Purpose**: Loading indicator

```
Size: 40px × 40px (medium)
Border: 4px solid Gray/200
Border Top: 4px solid Primary/500
Border Radius: 50%
Animation: Spin 1s linear infinite

Variants:
├─ Small: 24px
├─ Medium: 40px (default)
└─ Large: 64px
```

### Skeleton Loader

**Purpose**: Content placeholder

```
Background: Gray/200
Border Radius: 8px
Animation: Pulse (1.5s ease-in-out infinite)

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

Usage:
├─ Text Line: Height 16px, Width 100%
├─ Image: Aspect ratio 4:3
└─ Card: Full card dimensions
```

---

## ✅ Component Checklist

- [x] Buttons (Primary, Secondary, Text)
- [x] Input Fields (Text, Textarea, Dropdown)
- [x] Cards (Item, Stats, Update)
- [x] Badges (Status, Category)
- [x] Navigation (Top Bar, Mobile Menu)
- [x] Modals
- [x] Loading States (Spinner, Skeleton)

---

**All components documented and ready for implementation!**

**Created**: Day 5 of 30-day sprint  
**Last Updated**: January 16, 2026
