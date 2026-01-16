# High-Fidelity Design Specifications

Complete visual design specifications for KampusKart.

**Day**: 4 of 30  
**Purpose**: Define exact visual design for Figma implementation

---

## 🎨 Color System

### Primary Colors
```
Primary Blue (Main Brand Color)
├─ Primary 50:  #E3F2FD  (Lightest - backgrounds)
├─ Primary 100: #BBDEFB  (Light - hover states)
├─ Primary 200: #90CAF9  (Light)
├─ Primary 300: #64B5F6  (Medium light)
├─ Primary 400: #42A5F5  (Medium)
├─ Primary 500: #2196F3  ⭐ Main (buttons, links)
├─ Primary 600: #1E88E5  (Hover)
├─ Primary 700: #1976D2  (Active)
├─ Primary 800: #1565C0  (Dark)
└─ Primary 900: #0D47A1  (Darkest)
```

### Secondary Colors
```
Green (Success, Found Items)
├─ Secondary 50:  #E8F5E9
├─ Secondary 100: #C8E6C9
├─ Secondary 300: #81C784
├─ Secondary 500: #4CAF50  ⭐ Main
├─ Secondary 700: #388E3C
└─ Secondary 900: #1B5E20
```

### Semantic Colors
```
Success (Resolved, Completed)
├─ Light: #E8F5E9
├─ Main:  #4CAF50  ⭐
└─ Dark:  #2E7D32

Warning (Pending, Attention)
├─ Light: #FFF3E0
├─ Main:  #FF9800  ⭐
└─ Dark:  #E65100

Error (Errors, Delete)
├─ Light: #FFEBEE
├─ Main:  #F44336  ⭐
└─ Dark:  #C62828

Info (Information, Tips)
├─ Light: #E3F2FD
├─ Main:  #2196F3  ⭐
└─ Dark:  #1565C0
```

### Neutral Colors (Gray Scale)
```
Gray Scale
├─ Gray 50:  #FAFAFA  (Page background)
├─ Gray 100: #F5F5F5  (Card background)
├─ Gray 200: #EEEEEE  (Borders, dividers)
├─ Gray 300: #E0E0E0  (Disabled backgrounds)
├─ Gray 400: #BDBDBD  (Disabled text)
├─ Gray 500: #9E9E9E  (Secondary text)
├─ Gray 600: #757575  (Body text)
├─ Gray 700: #616161  (Headings)
├─ Gray 800: #424242  (Dark text)
└─ Gray 900: #212121  (Primary text)

White: #FFFFFF
Black: #000000
```

### Category Colors
```
Category Colors (for badges and icons)
├─ Wallet:    #9C27B0  (Purple)
├─ Keys:      #FF9800  (Orange)
├─ Phone:     #2196F3  (Blue)
├─ Documents: #009688  (Teal)
├─ Electronics: #3F51B5 (Indigo)
├─ Clothing:  #E91E63  (Pink)
├─ Books:     #795548  (Brown)
├─ Bags:      #607D8B  (Blue Gray)
└─ Other:     #757575  (Gray)
```

---

## 🔤 Typography

### Font Family
```css
/* Primary Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Helvetica Neue', Arial, sans-serif;

/* Monospace (for code, IDs) */
font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
```

### Font Sizes & Line Heights
```
Display (Hero Text)
├─ Size: 48px
├─ Weight: 700 (Bold)
├─ Line Height: 1.2 (57.6px)
└─ Use: Landing page hero

H1 (Page Headings)
├─ Size: 36px
├─ Weight: 700 (Bold)
├─ Line Height: 1.2 (43.2px)
└─ Use: Main page titles

H2 (Section Headings)
├─ Size: 30px
├─ Weight: 600 (Semibold)
├─ Line Height: 1.3 (39px)
└─ Use: Section titles

H3 (Subsection Headings)
├─ Size: 24px
├─ Weight: 600 (Semibold)
├─ Line Height: 1.4 (33.6px)
└─ Use: Card titles, subsections

H4 (Small Headings)
├─ Size: 20px
├─ Weight: 600 (Semibold)
├─ Line Height: 1.4 (28px)
└─ Use: Small headings, emphasized text

Body Large
├─ Size: 18px
├─ Weight: 400 (Regular)
├─ Line Height: 1.6 (28.8px)
└─ Use: Emphasized body text

Body (Default)
├─ Size: 16px
├─ Weight: 400 (Regular)
├─ Line Height: 1.5 (24px)
└─ Use: Main body text, descriptions

Body Small
├─ Size: 14px
├─ Weight: 400 (Regular)
├─ Line Height: 1.5 (21px)
└─ Use: Secondary text, metadata

Caption
├─ Size: 12px
├─ Weight: 400 (Regular)
├─ Line Height: 1.4 (16.8px)
└─ Use: Labels, timestamps, helper text

Button Text
├─ Size: 16px (large), 14px (medium), 12px (small)
├─ Weight: 600 (Semibold)
├─ Line Height: 1.2
└─ Use: All buttons
```

### Font Weights
```
Regular:  400 - Body text, descriptions
Medium:   500 - Emphasized text (optional)
Semibold: 600 - Subheadings, buttons, labels
Bold:     700 - Main headings, important text
```

---

## 📐 Spacing System

### Base Unit: 8px

```
Spacing Scale
├─ 4px   (0.5 unit) - xs   - Tight spacing
├─ 8px   (1 unit)   - sm   - Small spacing
├─ 12px  (1.5 unit) - md-  - Between sm and md
├─ 16px  (2 units)  - md   - Medium spacing ⭐ Most common
├─ 24px  (3 units)  - lg   - Large spacing
├─ 32px  (4 units)  - xl   - Extra large
├─ 40px  (5 units)  - 2xl  - Huge spacing
├─ 48px  (6 units)  - 3xl  - Maximum spacing
└─ 64px  (8 units)  - 4xl  - Page margins
```

### Component Spacing
```
Button Padding
├─ Small:  8px (vertical) × 16px (horizontal)
├─ Medium: 10px × 20px  ⭐ Default
└─ Large:  12px × 24px

Input Padding
├─ Vertical:   10px
└─ Horizontal: 12px

Card Padding
├─ Mobile:  16px
└─ Desktop: 24px  ⭐

Section Spacing
├─ Between sections: 48px (desktop), 32px (mobile)
└─ Within sections:  24px
```

---

## 🎯 Component Specifications

### Buttons

#### Primary Button
```
Background: Primary 500 (#2196F3)
Text: White (#FFFFFF)
Border: None
Border Radius: 8px
Height: 40px (medium), 48px (large), 32px (small)
Padding: 10px 20px (medium)
Font: 16px, Semibold (600)
Shadow: 0 2px 4px rgba(0,0,0,0.1)

Hover:
├─ Background: Primary 600 (#1E88E5)
└─ Shadow: 0 4px 8px rgba(0,0,0,0.15)

Active:
├─ Background: Primary 700 (#1976D2)
└─ Shadow: 0 1px 2px rgba(0,0,0,0.1)

Disabled:
├─ Background: Gray 300 (#E0E0E0)
├─ Text: Gray 500 (#9E9E9E)
└─ Cursor: not-allowed
```

#### Secondary Button
```
Background: White (#FFFFFF)
Text: Primary 500 (#2196F3)
Border: 2px solid Primary 500
Border Radius: 8px
Height: 40px (medium)
Padding: 10px 20px
Font: 16px, Semibold (600)

Hover:
├─ Background: Primary 50 (#E3F2FD)
└─ Border: Primary 600

Active:
├─ Background: Primary 100 (#BBDEFB)
└─ Border: Primary 700
```

#### Text Button
```
Background: Transparent
Text: Primary 500 (#2196F3)
Border: None
Padding: 8px 12px
Font: 16px, Semibold (600)

Hover:
├─ Background: Primary 50 (#E3F2FD)
└─ Text: Primary 600

Active:
└─ Text: Primary 700
```

### Input Fields

#### Text Input
```
Background: White (#FFFFFF)
Border: 1px solid Gray 300 (#E0E0E0)
Border Radius: 8px
Height: 40px
Padding: 10px 12px
Font: 16px, Regular (400)
Text Color: Gray 900 (#212121)

Focus:
├─ Border: 2px solid Primary 500 (#2196F3)
├─ Outline: 0 0 0 3px rgba(33, 150, 243, 0.1)
└─ Shadow: 0 0 0 3px rgba(33, 150, 243, 0.1)

Error:
├─ Border: 2px solid Error Main (#F44336)
└─ Outline: 0 0 0 3px rgba(244, 67, 54, 0.1)

Success:
├─ Border: 2px solid Success Main (#4CAF50)
└─ Outline: 0 0 0 3px rgba(76, 175, 80, 0.1)

Disabled:
├─ Background: Gray 100 (#F5F5F5)
├─ Border: Gray 300
└─ Text: Gray 500
```

#### Textarea
```
Same as Text Input, but:
├─ Min Height: 100px
├─ Resize: vertical
└─ Padding: 12px
```

### Cards

#### Item Card
```
Background: White (#FFFFFF)
Border: 1px solid Gray 200 (#EEEEEE)
Border Radius: 12px
Padding: 0 (image full width), 16px (content)
Shadow: 0 2px 8px rgba(0,0,0,0.08)

Image Section:
├─ Aspect Ratio: 4:3
├─ Border Radius: 12px 12px 0 0
└─ Object Fit: cover

Content Section:
├─ Padding: 16px
└─ Gap: 8px between elements

Hover:
├─ Shadow: 0 4px 16px rgba(0,0,0,0.12)
├─ Transform: translateY(-2px)
└─ Border: 1px solid Primary 200

Active:
└─ Transform: translateY(0)
```

#### Stats Card
```
Background: White (#FFFFFF)
Border: 1px solid Gray 200
Border Radius: 12px
Padding: 24px
Shadow: 0 2px 8px rgba(0,0,0,0.08)
Text Align: center

Icon:
├─ Size: 32px
├─ Color: Primary 500
└─ Margin Bottom: 12px

Number:
├─ Font: 36px, Bold (700)
├─ Color: Gray 900
└─ Margin Bottom: 4px

Label:
├─ Font: 14px, Regular (400)
└─ Color: Gray 600
```

### Badges

#### Status Badge
```
Height: 24px
Padding: 4px 12px
Border Radius: 12px (pill shape)
Font: 12px, Semibold (600)
Display: inline-flex
Align Items: center

Open Status:
├─ Background: Success 100 (#C8E6C9)
└─ Text: Success 900 (#1B5E20)

Resolved Status:
├─ Background: Primary 100 (#BBDEFB)
└─ Text: Primary 900 (#0D47A1)
```

#### Category Badge
```
Same as Status Badge, but colors match category:
├─ Wallet: Purple background + dark purple text
├─ Keys: Orange background + dark orange text
└─ etc.
```

### Modals

#### Modal Overlay
```
Background: rgba(0, 0, 0, 0.5)
Position: fixed
Top: 0, Left: 0, Right: 0, Bottom: 0
Z-index: 1000
Display: flex
Align Items: center
Justify Content: center
```

#### Modal Content
```
Background: White (#FFFFFF)
Border Radius: 16px
Max Width: 600px
Width: 90% (mobile)
Padding: 32px
Shadow: 0 20px 60px rgba(0,0,0,0.3)
Position: relative

Header:
├─ Font: 24px, Semibold (600)
├─ Color: Gray 900
└─ Margin Bottom: 16px

Body:
├─ Font: 16px, Regular (400)
├─ Color: Gray 700
└─ Margin Bottom: 24px

Footer:
├─ Display: flex
├─ Gap: 12px
└─ Justify Content: flex-end
```

---

## 🎭 Shadows & Elevation

```
Shadow System (Material Design inspired)
├─ Shadow 1 (Subtle):     0 1px 3px rgba(0,0,0,0.12)
├─ Shadow 2 (Card):       0 2px 8px rgba(0,0,0,0.08)
├─ Shadow 3 (Hover):      0 4px 16px rgba(0,0,0,0.12)
├─ Shadow 4 (Modal):      0 8px 32px rgba(0,0,0,0.16)
└─ Shadow 5 (Dropdown):   0 12px 48px rgba(0,0,0,0.2)
```

---

## 🎨 Border Radius

```
Border Radius Scale
├─ Small:  4px  - Badges, small elements
├─ Medium: 8px  - Buttons, inputs ⭐ Default
├─ Large:  12px - Cards
├─ XLarge: 16px - Modals
└─ Pill:   999px - Badges, tags
```

---

## 🎬 Animations

### Timing Functions
```css
/* Ease Out (elements entering) */
transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);

/* Ease In (elements exiting) */
transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);

/* Ease In Out (elements moving) */
transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
```

### Duration
```
Fast:   150ms - Hover effects, tooltips
Medium: 300ms - Modals, dropdowns ⭐ Default
Slow:   500ms - Page transitions
```

### Common Animations
```css
/* Button Hover */
transition: all 200ms ease-out;
transform: translateY(-2px);

/* Card Hover */
transition: all 300ms ease-out;
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0,0,0,0.12);

/* Modal Enter */
animation: fadeIn 300ms ease-out;
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Loading Spinner */
animation: spin 1s linear infinite;
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

---

## 📱 Responsive Breakpoints

```
Breakpoints
├─ Mobile:  375px - 767px   (1 column)
├─ Tablet:  768px - 1023px  (2-3 columns)
├─ Laptop:  1024px - 1439px (3-4 columns)
└─ Desktop: 1440px+         (4 columns)

Container Max Width: 1440px
Container Padding: 40px (desktop), 16px (mobile)
```

---

## 🎯 Design Tokens (for Figma)

### Create These as Figma Variables

```
Colors
├─ color/primary/500
├─ color/secondary/500
├─ color/success/500
├─ color/warning/500
├─ color/error/500
├─ color/gray/50-900
└─ color/category/*

Spacing
├─ space/xs (4px)
├─ space/sm (8px)
├─ space/md (16px)
├─ space/lg (24px)
├─ space/xl (32px)
└─ space/2xl (40px)

Typography
├─ font/size/display (48px)
├─ font/size/h1 (36px)
├─ font/size/h2 (30px)
├─ font/size/h3 (24px)
├─ font/size/body (16px)
└─ font/size/caption (12px)

Border Radius
├─ radius/sm (4px)
├─ radius/md (8px)
├─ radius/lg (12px)
└─ radius/xl (16px)

Shadows
├─ shadow/sm
├─ shadow/md
├─ shadow/lg
└─ shadow/xl
```

---

## ✅ Design Checklist

- [ ] Create Figma file: "KampusKart Hi-Fid"
- [ ] Set up color styles (all colors above)
- [ ] Set up text styles (all typography above)
- [ ] Create component library:
  - [ ] Buttons (primary, secondary, text)
  - [ ] Inputs (text, textarea, dropdown)
  - [ ] Cards (item card, stats card)
  - [ ] Badges (status, category)
  - [ ] Modals
- [ ] Design screens:
  - [ ] Landing page
  - [ ] Registration page
  - [ ] Login page
  - [ ] Dashboard (if time)

---

**Use these exact specifications in Figma for pixel-perfect consistency!**

**Created**: Day 4 of 30-day sprint  
**Last Updated**: January 16, 2026
