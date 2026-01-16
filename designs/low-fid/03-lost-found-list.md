# Lost & Found List View Wireframe

## Desktop View (1440px)

```
┌────────────────────────────────────────────────────────────────────────┐
│  [🏠 KampusKart]    [🔍 Search...]    [Lost&Found] [Updates] [@User ▾] │
└────────────────────────────────────────────────────────────────────────┘

    Lost & Found Items

    ┌──────────────────────────────────────────────────────────────────┐
    │  [🔍 Search by title, description...]                            │
    └──────────────────────────────────────────────────────────────────┘

    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ All Items ▾ │  │ Category ▾  │  │  Status ▾   │  │  Sort By ▾  │
    └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘

    Showing 24 items                              ┌──────────────────┐
                                                  │  + Post New Item │
                                                  └──────────────────┘

    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ [Image]     │  │ [Image]     │  │ [Image]     │  │ [Image]     │
    │             │  │             │  │             │  │             │
    │             │  │             │  │             │  │             │
    ├─────────────┤  ├─────────────┤  ├─────────────┤  ├─────────────┤
    │ Lost Wallet │  │ Found Keys  │  │ Lost Phone  │  │ Found ID    │
    │ Brown leath │  │ Set of 3 ke │  │ iPhone 13 P │  │ Student ID  │
    │ er wallet w │  │ ys with blu │  │ ro in black │  │ card with n │
    │ ith cards.. │  │ e keychain  │  │ case near.. │  │ ame John... │
    │             │  │             │  │             │  │             │
    │ [Wallet]    │  │ [Keys]      │  │ [Phone]     │  │ [Documents] │
    │ [Open]      │  │ [Open]      │  │ [Resolved]  │  │ [Open]      │
    │             │  │             │  │             │  │             │
    │ 2 hours ago │  │ 5 hours ago │  │ 1 day ago   │  │ 2 days ago  │
    │ by @john    │  │ by @sarah   │  │ by @mike    │  │ by @emma    │
    └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘

    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ [Image]     │  │ [Image]     │  │ [Image]     │  │ [Image]     │
    │             │  │             │  │             │  │             │
    │             │  │             │  │             │  │             │
    ├─────────────┤  ├─────────────┤  ├─────────────┤  ├─────────────┤
    │ Lost Laptop │  │ Found Watch │  │ Lost Bag    │  │ Found Book  │
    │ MacBook Pro │  │ Silver watc │  │ Black backp │  │ Physics tex │
    │ 13" in blac │  │ h found in  │  │ ack with la │  │ tbook found │
    │ k case...   │  │ cafeteria   │  │ ptop inside │  │ in library  │
    │             │  │             │  │             │  │             │
    │ [Other]     │  │ [Other]     │  │ [Other]     │  │ [Documents] │
    │ [Open]      │  │ [Open]      │  │ [Open]      │  │ [Resolved]  │
    │             │  │             │  │             │  │             │
    │ 3 days ago  │  │ 4 days ago  │  │ 5 days ago  │  │ 1 week ago  │
    │ by @alex    │  │ by @lisa    │  │ by @tom     │  │ by @kate    │
    └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘

    ┌───────────────────────────────────────────────────────────────┐
    │         [← Previous]    1  2  3  4  5    [Next →]             │
    └───────────────────────────────────────────────────────────────┘
```

---

## Filter Dropdown Examples

### Category Filter
```
┌─────────────────┐
│ Category ▾      │
├─────────────────┤
│ ☑ All           │
│ ☐ Wallet        │
│ ☐ Keys          │
│ ☐ Phone         │
│ ☐ Documents     │
│ ☐ Other         │
├─────────────────┤
│ [Apply] [Clear] │
└─────────────────┘
```

### Status Filter
```
┌─────────────────┐
│ Status ▾        │
├─────────────────┤
│ ☑ All           │
│ ☐ Open          │
│ ☐ Resolved      │
├─────────────────┤
│ [Apply] [Clear] │
└─────────────────┘
```

### Sort Options
```
┌─────────────────────┐
│ Sort By ▾           │
├─────────────────────┤
│ • Newest First      │
│ ○ Oldest First      │
│ ○ Most Relevant     │
│ ○ Recently Updated  │
└─────────────────────┘
```

---

## Mobile View (375px)

```
┌──────────────────────────┐
│ [☰] Lost & Found [@User▾]│
├──────────────────────────┤
│ [🔍 Search items...]     │
├──────────────────────────┤
│                          │
│ ┌──────┐ ┌──────┐ ┌────┐│
│ │Cat ▾ │ │Stat▾ │ │Srt▾││
│ └──────┘ └──────┘ └────┘│
│                          │
│ 24 items    [+ Post New] │
│                          │
│ ┌──────────────────────┐ │
│ │ [Image]              │ │
│ │                      │ │
│ ├──────────────────────┤ │
│ │ Lost Wallet          │ │
│ │ Brown leather wallet │ │
│ │ with cards inside... │ │
│ │                      │ │
│ │ [Wallet] [Open]      │ │
│ │ 2h ago • @john       │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ [Image]              │ │
│ │                      │ │
│ ├──────────────────────┤ │
│ │ Found Keys           │ │
│ │ Set of 3 keys with   │ │
│ │ blue keychain...     │ │
│ │                      │ │
│ │ [Keys] [Open]        │ │
│ │ 5h ago • @sarah      │ │
│ └──────────────────────┘ │
│                          │
│ ┌──────────────────────┐ │
│ │ [Image]              │ │
│ │                      │ │
│ ├──────────────────────┤ │
│ │ Lost Phone           │ │
│ │ iPhone 13 Pro in     │ │
│ │ black case near...   │ │
│ │                      │ │
│ │ [Phone] [Resolved]   │ │
│ │ 1d ago • @mike       │ │
│ └──────────────────────┘ │
│                          │
│ [Load More Items]        │
│                          │
└──────────────────────────┘
```

---

## Search Active State

```
┌──────────────────────────────────────────────────────────────────┐
│  [🔍 wallet                                              ] [✕]    │
└──────────────────────────────────────────────────────────────────┘

    Searching for "wallet"...

    ┌─────────────┐  ┌─────────────┐
    │ [Image]     │  │ [Image]     │
    │             │  │             │
    │ Lost Wallet │  │ Found Walle │
    │ Brown leath │  │ Black leath │
    │ [Wallet]    │  │ [Wallet]    │
    │ 2 hours ago │  │ 1 day ago   │
    └─────────────┘  └─────────────┘

    Found 2 results
```

---

## Empty State (No Results)

```
┌────────────────────────────────────────────────┐
│                                                │
│              [Empty Box Icon]                  │
│                                                │
│         No items found                         │
│                                                │
│    Try adjusting your search or filters        │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │           Clear All Filters              │  │
│  └──────────────────────────────────────────┘  │
│                                                │
│  ┌──────────────────────────────────────────┐  │
│  │         Post a New Item                  │  │
│  └──────────────────────────────────────────┘  │
│                                                │
└────────────────────────────────────────────────┘
```

---

## Loading State

```
┌────────────────────────────────────────────────┐
│                                                │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│    │ [Shim]  │  │ [Shim]  │  │ [Shim]  │      │
│    │         │  │         │  │         │      │
│    │ ▓▓▓▓▓▓  │  │ ▓▓▓▓▓▓  │  │ ▓▓▓▓▓▓  │      │
│    │ ▓▓▓▓    │  │ ▓▓▓▓    │  │ ▓▓▓▓    │      │
│    └─────────┘  └─────────┘  └─────────┘      │
│                                                │
│    ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│    │ [Shim]  │  │ [Shim]  │  │ [Shim]  │      │
│    │         │  │         │  │         │      │
│    │ ▓▓▓▓▓▓  │  │ ▓▓▓▓▓▓  │  │ ▓▓▓▓▓▓  │      │
│    │ ▓▓▓▓    │  │ ▓▓▓▓    │  │ ▓▓▓▓    │      │
│    └─────────┘  └─────────┘  └─────────┘      │
│                                                │
└────────────────────────────────────────────────┘
```

---

## Item Card States

### Default
```
┌─────────────┐
│ [Image]     │
│             │
├─────────────┤
│ Title       │
│ Description │
│ [Category]  │
│ [Status]    │
│ Time • User │
└─────────────┘
```

### Hover
```
┌─────────────┐ ← Shadow elevated
│ [Image]     │ ← Slight scale up
│             │
├─────────────┤
│ Title       │ ← Cursor: pointer
│ Description │
│ [Category]  │
│ [Status]    │
│ Time • User │
└─────────────┘
```

### Resolved (Grayed Out)
```
┌─────────────┐
│ [Image]     │ ← 50% opacity
│             │
├─────────────┤
│ Title       │ ← Gray text
│ Description │
│ [Category]  │
│ [✓Resolved] │ ← Green badge
│ Time • User │
└─────────────┘
```

---

## Responsive Breakpoints

- **Desktop**: 1440px - 4 columns
- **Laptop**: 1024px - 3 columns
- **Tablet**: 768px - 2 columns
- **Mobile**: 375px - 1 column (full width)

---

## Interactions

### Click Actions
- **Item Card** → Navigate to detail view
- **Post New Item** → Open create form
- **Filter Dropdown** → Show filter options
- **Search Input** → Real-time search
- **Pagination** → Load next/previous page
- **Category Badge** → Filter by that category
- **User Avatar** → View user profile

### Keyboard Navigation
- **Tab** → Navigate through cards
- **Enter** → Open selected card
- **Arrow Keys** → Navigate grid
- **Esc** → Close filters/search

---

## Performance Considerations

- **Lazy Loading**: Load images as user scrolls
- **Pagination**: 12 items per page (desktop), 8 (mobile)
- **Infinite Scroll**: Alternative to pagination (optional)
- **Debounced Search**: Wait 300ms after typing
- **Cached Results**: Store recent searches
