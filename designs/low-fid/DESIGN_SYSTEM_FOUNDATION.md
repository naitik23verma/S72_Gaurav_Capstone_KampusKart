# Design System Foundation

Low-fidelity design system establishing the foundation for KampusKart's UI.

**Day**: 3 of 30  
**Purpose**: Define core design principles before hi-fid implementation

---

## 🎨 Layout System

### Grid System
- **Columns**: 12-column grid
- **Gutter**: 24px (desktop), 16px (mobile)
- **Margins**: 40px (desktop), 16px (mobile)
- **Max Width**: 1440px (centered)

### Spacing Scale (8px base unit)
```
4px   - xs   - Tight spacing (icon padding)
8px   - sm   - Small spacing (between related items)
16px  - md   - Medium spacing (component padding)
24px  - lg   - Large spacing (section padding)
32px  - xl   - Extra large (major sections)
40px  - 2xl  - Huge spacing (page margins)
48px  - 3xl  - Maximum spacing
```

### Breakpoints
```
Mobile:  375px  - 767px   (1 column)
Tablet:  768px  - 1023px  (2-3 columns)
Laptop:  1024px - 1439px  (3-4 columns)
Desktop: 1440px+          (4 columns)
```

---

## 📐 Component Sizing

### Buttons
```
Small:   32px height, 12px padding
Medium:  40px height, 16px padding (default)
Large:   48px height, 20px padding
```

### Input Fields
```
Height:  40px (default)
Padding: 12px horizontal, 10px vertical
Border:  1px solid
Radius:  4px (subtle rounding)
```

### Cards
```
Padding:    16px (mobile), 24px (desktop)
Border:     1px solid
Radius:     8px
Shadow:     Subtle elevation
Min Height: 200px (item cards)
```

### Icons
```
Small:  16px × 16px
Medium: 24px × 24px (default)
Large:  32px × 32px
```

---

## 🔤 Typography Hierarchy

### Font Families
```
Primary:   System font stack
           -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
           "Helvetica Neue", Arial, sans-serif

Monospace: "SF Mono", Monaco, "Cascadia Code", "Courier New", monospace
```

### Font Sizes
```
xs:   12px  - Captions, labels
sm:   14px  - Body text (small), secondary info
base: 16px  - Body text (default)
lg:   18px  - Emphasized text
xl:   20px  - Subheadings
2xl:  24px  - Section headings
3xl:  30px  - Page headings
4xl:  36px  - Hero text
```

### Font Weights
```
Regular:  400 - Body text
Medium:   500 - Emphasized text
Semibold: 600 - Subheadings
Bold:     700 - Headings
```

### Line Heights
```
Tight:  1.2  - Headings
Normal: 1.5  - Body text (default)
Loose:  1.8  - Long-form content
```

---

## 🎨 Color Palette (Conceptual)

### Primary Colors
```
Primary:   Blue tones (trust, reliability)
           - Light: #E3F2FD
           - Main:  #2196F3
           - Dark:  #1565C0

Secondary: Green tones (success, found items)
           - Light: #E8F5E9
           - Main:  #4CAF50
           - Dark:  #2E7D32
```

### Semantic Colors
```
Success:   Green (#4CAF50) - Resolved items, success messages
Warning:   Orange (#FF9800) - Warnings, pending actions
Error:     Red (#F44336) - Errors, delete actions
Info:      Blue (#2196F3) - Information, links
```

### Neutral Colors
```
Gray Scale:
  - Gray 50:  #FAFAFA (backgrounds)
  - Gray 100: #F5F5F5 (subtle backgrounds)
  - Gray 200: #EEEEEE (borders)
  - Gray 300: #E0E0E0 (dividers)
  - Gray 400: #BDBDBD (disabled)
  - Gray 500: #9E9E9E (secondary text)
  - Gray 600: #757575 (body text)
  - Gray 700: #616161 (headings)
  - Gray 800: #424242 (dark text)
  - Gray 900: #212121 (primary text)
```

### Category Colors
```
Wallet:    Purple (#9C27B0)
Keys:      Orange (#FF9800)
Phone:     Blue (#2196F3)
Documents: Teal (#009688)
Other:     Gray (#757575)
```

---

## 🎯 Component Patterns

### Navigation Bar
```
Height:     64px (desktop), 56px (mobile)
Position:   Fixed top
Background: White with shadow
Z-index:    1000
```

### Item Cards
```
Aspect Ratio: 4:3 (image)
Layout:       Image top, content bottom
Hover:        Slight elevation + border highlight
Click:        Navigate to detail
```

### Forms
```
Label Position: Above input
Required Mark:  Red asterisk (*)
Error Display:  Below input, red text
Success:        Green checkmark icon
```

### Modals
```
Max Width:   600px
Padding:     24px
Background:  White
Overlay:     Semi-transparent black (0.5 opacity)
Animation:   Fade in + scale up
```

### Badges
```
Height:      24px
Padding:     4px 8px
Border:      None
Radius:      12px (pill shape)
Font Size:   12px
Font Weight: 600
```

---

## 🔄 Interaction States

### Buttons
```
Default:  Solid background, clear text
Hover:    Slightly darker background
Active:   Even darker, slight scale down
Disabled: Gray background, reduced opacity
Loading:  Spinner icon, disabled state
```

### Links
```
Default:  Blue text, no underline
Hover:    Underline appears
Active:   Darker blue
Visited:  Purple (optional)
```

### Input Fields
```
Default:  Gray border
Focus:    Blue border, subtle glow
Error:    Red border, error message
Success:  Green border, checkmark
Disabled: Gray background, no interaction
```

### Cards
```
Default:  Flat with subtle border
Hover:    Elevated shadow, border highlight
Active:   Pressed state (slight scale)
Selected: Blue border or background tint
```

---

## 📱 Responsive Behavior

### Mobile-First Approach
1. Design for mobile (375px) first
2. Add complexity for tablet (768px)
3. Optimize for desktop (1440px)

### Layout Shifts
```
Mobile:   Single column, stacked
Tablet:   2 columns, side-by-side
Desktop:  3-4 columns, grid layout
```

### Navigation
```
Mobile:   Hamburger menu (drawer)
Tablet:   Collapsed menu with icons
Desktop:  Full horizontal menu
```

### Typography
```
Mobile:   Smaller font sizes (14px base)
Tablet:   Medium font sizes (15px base)
Desktop:  Full font sizes (16px base)
```

---

## ♿ Accessibility Guidelines

### Color Contrast
- **Text**: Minimum 4.5:1 ratio (WCAG AA)
- **Large Text**: Minimum 3:1 ratio
- **UI Components**: Minimum 3:1 ratio

### Touch Targets
- **Minimum Size**: 44px × 44px (mobile)
- **Spacing**: 8px between targets
- **Desktop**: 32px × 32px minimum

### Keyboard Navigation
- **Tab Order**: Logical flow
- **Focus Indicators**: Visible outline (2px blue)
- **Skip Links**: "Skip to main content"
- **Escape Key**: Close modals/dropdowns

### Screen Readers
- **Alt Text**: All images
- **ARIA Labels**: Interactive elements
- **Headings**: Proper hierarchy (h1 → h6)
- **Landmarks**: nav, main, aside, footer

---

## 🎭 Animation Principles

### Timing
```
Fast:     150ms - Hover effects, tooltips
Medium:   300ms - Modals, dropdowns (default)
Slow:     500ms - Page transitions
```

### Easing
```
Ease-out:     Elements entering (default)
Ease-in:      Elements exiting
Ease-in-out:  Elements moving
```

### Types
```
Fade:         Opacity 0 → 1
Slide:        Transform translateY
Scale:        Transform scale
Bounce:       Spring animation (optional)
```

---

## 📦 Component Library (To Build)

### Atoms (Basic Elements)
- Button (primary, secondary, text, icon)
- Input (text, email, password, textarea)
- Checkbox, Radio, Toggle
- Badge, Tag, Chip
- Icon, Avatar, Image
- Link, Text, Heading

### Molecules (Simple Components)
- Search Bar (input + icon + button)
- Form Field (label + input + error)
- Card Header (title + actions)
- Dropdown Menu (trigger + menu)
- Pagination (prev + numbers + next)
- Breadcrumb (links with separators)

### Organisms (Complex Components)
- Navigation Bar (logo + menu + actions)
- Item Card (image + content + actions)
- Form (multiple fields + validation)
- Modal (overlay + content + actions)
- Data Table (headers + rows + pagination)
- Filter Panel (multiple filters + apply)

### Templates (Page Layouts)
- Auth Layout (centered form)
- Dashboard Layout (nav + sidebar + content)
- List Layout (filters + grid + pagination)
- Detail Layout (image + content + sidebar)

---

## 🔍 Design Decisions

### Why These Choices?

**8px Spacing System**
- Mathematical consistency
- Easy mental math (8, 16, 24, 32...)
- Aligns with common screen densities

**12-Column Grid**
- Flexible (divisible by 2, 3, 4, 6)
- Industry standard
- Works across breakpoints

**System Fonts**
- Fast loading (no web fonts)
- Native feel per platform
- Excellent readability

**Subtle Shadows**
- Modern, clean aesthetic
- Clear hierarchy without clutter
- Accessible (not relying on color alone)

**4px Border Radius**
- Friendly but professional
- Not too rounded (childish)
- Not too sharp (harsh)

---

## 📝 Implementation Notes

### CSS Variables (Recommended)
```css
:root {
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  
  /* Typography */
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  
  /* Colors (to be defined in hi-fid) */
  --color-primary: #2196F3;
  --color-success: #4CAF50;
  --color-error: #F44336;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

### Tailwind Config (If Using Tailwind)
```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      borderRadius: {
        'card': '8px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0,0,0,0.1)',
      }
    }
  }
}
```

---

## ✅ Design System Checklist

- [x] Grid system defined
- [x] Spacing scale established
- [x] Breakpoints documented
- [x] Component sizing specified
- [x] Typography hierarchy created
- [x] Color palette conceptualized
- [x] Component patterns defined
- [x] Interaction states documented
- [x] Responsive behavior planned
- [x] Accessibility guidelines noted
- [x] Animation principles established
- [x] Component library outlined

---

## 🚀 Next Steps

1. **Hi-Fid Design** (Day 4-5)
   - Apply this system in Figma
   - Define exact colors and typography
   - Create component library
   - Design all screens

2. **Implementation** (Day 14+)
   - Set up CSS variables or Tailwind config
   - Build component library
   - Follow spacing and sizing guidelines
   - Implement responsive breakpoints

3. **Testing** (Day 25+)
   - Test accessibility
   - Verify responsive behavior
   - Check color contrast
   - Validate touch targets

---

**This foundation ensures consistency across all screens and makes implementation faster!**

**Created**: Day 3 of 30-day sprint  
**Last Updated**: January 16, 2026
