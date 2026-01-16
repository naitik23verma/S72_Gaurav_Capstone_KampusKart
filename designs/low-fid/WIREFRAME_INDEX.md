# KampusKart Wireframe Index

Quick reference guide to all low-fidelity wireframes.

---

## 📋 Overview

**Total Screens**: 15+ unique screens  
**Total Lines**: ~1,693 lines of ASCII wireframes  
**User Flows**: 5 complete flows  
**Responsive**: Desktop, Tablet, Mobile

---

## 🗺️ Wireframe Map

```
KampusKart
│
├─ 🔐 Authentication Flow (01-auth-flow.md)
│   ├─ Landing Page
│   ├─ Registration Form
│   ├─ Login Form
│   └─ Google OAuth
│
├─ 🏠 Dashboard (02-dashboard.md)
│   ├─ Stats Cards (Total, Resolved, New)
│   ├─ Recent Lost & Found Items
│   ├─ Campus Updates Feed
│   └─ Navigation Menu
│
├─ 📦 Lost & Found List (03-lost-found-list.md)
│   ├─ Search Bar
│   ├─ Filter Dropdowns (Category, Status, Sort)
│   ├─ Item Card Grid
│   ├─ Pagination
│   ├─ Empty State
│   └─ Loading State
│
├─ 🔍 Item Detail (04-lost-found-detail.md)
│   ├─ Image Gallery
│   ├─ Item Information
│   ├─ User Profile Card
│   ├─ Contact Modal
│   ├─ Owner Actions (Edit, Delete, Resolve)
│   └─ Similar Items
│
└─ ✏️ Create/Edit Form (05-create-edit-form.md)
    ├─ Title Input
    ├─ Description Textarea
    ├─ Category Dropdown
    ├─ Status Radio (Lost/Found)
    ├─ Location Input
    ├─ Date/Time Pickers
    ├─ Image Upload
    └─ Validation States
```

---

## 📱 Screen Count by Flow

| Flow | Desktop | Tablet | Mobile | Total |
|------|---------|--------|--------|-------|
| Authentication | 4 | 4 | 4 | 12 |
| Dashboard | 1 | 1 | 1 | 3 |
| List View | 1 | 1 | 1 | 3 |
| Detail View | 2 | 2 | 2 | 6 |
| Create/Edit | 2 | 2 | 2 | 6 |
| **Total** | **10** | **10** | **10** | **30** |

---

## 🎯 Quick Navigation

### Start Here
👉 **LOW_FID_FLOW.md** - Read this first for overview and user scenarios

### By User Journey

**New User Registration**
1. 01-auth-flow.md → Landing Page
2. 01-auth-flow.md → Registration Form
3. 01-auth-flow.md → Login Form
4. 02-dashboard.md → Dashboard

**Posting a Lost Item**
1. 02-dashboard.md → Dashboard
2. 05-create-edit-form.md → Create Form
3. 04-lost-found-detail.md → Item Detail (after posting)

**Finding a Lost Item**
1. 02-dashboard.md → Dashboard
2. 03-lost-found-list.md → Browse/Search
3. 04-lost-found-detail.md → View Details
4. 04-lost-found-detail.md → Contact Owner

**Managing Your Posts**
1. 03-lost-found-list.md → Find Your Item
2. 04-lost-found-detail.md → Owner View
3. 05-create-edit-form.md → Edit Form
4. 04-lost-found-detail.md → Mark Resolved/Delete

---

## 🔍 Find Specific Components

### Forms & Inputs
- **Text Inputs**: 05-create-edit-form.md
- **Textareas**: 05-create-edit-form.md
- **Dropdowns**: 03-lost-found-list.md, 05-create-edit-form.md
- **Radio Buttons**: 05-create-edit-form.md
- **File Upload**: 05-create-edit-form.md
- **Date/Time Pickers**: 05-create-edit-form.md

### Navigation
- **Top Nav Bar**: 02-dashboard.md
- **Mobile Menu**: 02-dashboard.md
- **Breadcrumbs**: 04-lost-found-detail.md

### Cards & Lists
- **Item Cards**: 02-dashboard.md, 03-lost-found-list.md
- **User Profile Card**: 04-lost-found-detail.md
- **Stats Cards**: 02-dashboard.md
- **Update Cards**: 02-dashboard.md

### Modals & Overlays
- **Contact Modal**: 04-lost-found-detail.md
- **Delete Confirmation**: 04-lost-found-detail.md
- **Mark Resolved Modal**: 04-lost-found-detail.md
- **Image Lightbox**: 04-lost-found-detail.md
- **Unsaved Changes**: 05-create-edit-form.md

### States
- **Loading**: All files
- **Error**: 01-auth-flow.md, 05-create-edit-form.md
- **Success**: 01-auth-flow.md, 05-create-edit-form.md
- **Empty**: 03-lost-found-list.md
- **Validation**: 01-auth-flow.md, 05-create-edit-form.md

---

## 📊 Complexity Breakdown

| File | Lines | Screens | Complexity |
|------|-------|---------|------------|
| 05-create-edit-form.md | 417 | 6 | High |
| 04-lost-found-detail.md | 332 | 6 | High |
| 03-lost-found-list.md | 275 | 3 | Medium |
| LOW_FID_FLOW.md | 229 | 0 | Documentation |
| 02-dashboard.md | 223 | 3 | Medium |
| 01-auth-flow.md | 184 | 12 | Medium |

---

## ✅ Coverage Checklist

### Core Features
- [x] User registration and login
- [x] Google OAuth integration
- [x] Dashboard with stats
- [x] Browse lost & found items
- [x] Search and filter functionality
- [x] View item details
- [x] Contact item owner
- [x] Post new items
- [x] Edit existing items
- [x] Delete items
- [x] Mark items as resolved
- [x] Image upload and gallery
- [x] Responsive design (3 breakpoints)

### UX Elements
- [x] Loading states
- [x] Error handling
- [x] Success confirmations
- [x] Empty states
- [x] Form validation
- [x] Modals and overlays
- [x] Navigation patterns
- [x] Hover states
- [x] Mobile menu

### Accessibility
- [x] Keyboard navigation noted
- [x] ARIA labels mentioned
- [x] Screen reader considerations
- [x] Focus states documented
- [x] Error announcements planned

---

## 🎨 Design Principles Applied

1. **Mobile-First**: Started with mobile layouts, scaled up
2. **Consistency**: Reusable components across screens
3. **Clarity**: Clear visual hierarchy and labels
4. **Feedback**: Loading, error, and success states
5. **Accessibility**: Keyboard nav and screen reader support
6. **Progressive Disclosure**: Show details on demand
7. **Error Prevention**: Validation and confirmations

---

## 🚀 Next Steps

1. **Review**: Get feedback on wireframes
2. **Iterate**: Make any necessary adjustments
3. **Hi-Fid**: Create Figma designs based on these wireframes
4. **Prototype**: Add interactions in Figma
5. **Implement**: Use as reference during development

---

## 📝 Notes

- ASCII wireframes are intentionally low-detail
- Focus is on structure and flow, not visual design
- Colors, typography, and spacing will be defined in hi-fid
- Some components may be simplified during implementation
- User feedback may require flow adjustments

---

**Created**: Day 2 of 30-day sprint  
**Last Updated**: January 16, 2026
