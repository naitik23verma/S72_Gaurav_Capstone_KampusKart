# User Journey Map

Detailed user journeys for KampusKart's core use cases.

**Day**: 3 of 30  
**Purpose**: Validate user flows and identify pain points

---

## 👤 User Personas

### Persona 1: Sarah - The Forgetful Student
- **Age**: 20
- **Role**: Undergraduate student
- **Tech Savvy**: High
- **Pain Point**: Frequently loses items (wallet, keys, phone)
- **Goal**: Quickly find lost items or get help from community
- **Motivation**: Avoid stress and cost of replacing items

### Persona 2: Mike - The Good Samaritan
- **Age**: 22
- **Role**: Graduate student
- **Tech Savvy**: Medium
- **Pain Point**: Finds items but doesn't know how to return them
- **Goal**: Easily post found items and connect with owners
- **Motivation**: Help others and build campus community

### Persona 3: Emma - The Campus Admin
- **Age**: 28
- **Role**: Student affairs coordinator
- **Tech Savvy**: Medium
- **Pain Point**: Managing lost & found manually is time-consuming
- **Goal**: Centralized system for campus lost & found
- **Motivation**: Improve student services and reduce workload

---

## 🗺️ Journey 1: Sarah Loses Her Wallet

### Scenario
Sarah realizes her wallet is missing after leaving the library. She's stressed because it contains her student ID, credit cards, and cash.

### Journey Steps

#### 1. Discovery & Panic
**Emotion**: 😰 Stressed, worried  
**Action**: Searches pockets, backpack  
**Thought**: "Where did I leave it? I need to find it fast!"

#### 2. Remembering KampusKart
**Emotion**: 😌 Slight relief  
**Action**: Opens phone, searches for KampusKart  
**Thought**: "Maybe someone found it and posted it!"

#### 3. Opening the App
**Screen**: Landing Page  
**Emotion**: 🤔 Hopeful  
**Action**: Clicks "Get Started" or "Login"  
**Pain Point**: If not registered, needs to sign up first (friction)  
**Solution**: Quick Google OAuth option

#### 4. Quick Registration
**Screen**: Registration Form  
**Emotion**: 😤 Slightly impatient  
**Action**: Clicks "Continue with Google"  
**Thought**: "I don't have time for a long form!"  
**Time**: 10 seconds

#### 5. Landing on Dashboard
**Screen**: Dashboard  
**Emotion**: 👀 Scanning quickly  
**Action**: Looks at recent items, searches for "wallet"  
**Thought**: "Is my wallet here?"

#### 6. Searching for Wallet
**Screen**: Lost & Found List  
**Emotion**: 🔍 Focused  
**Action**: Types "wallet" in search, filters by "Wallet" category  
**Result**: Sees 3 wallet posts

#### 7. Checking Each Result
**Screen**: Item Detail Views  
**Emotion**: 😔 Disappointed (first 2 aren't hers)  
**Action**: Clicks each wallet post, checks photos  
**Thought**: "Not mine... not mine... wait!"

#### 8. Finding Her Wallet!
**Screen**: Item Detail  
**Emotion**: 😃 Excited, relieved!  
**Action**: Recognizes her brown wallet in photo  
**Thought**: "That's it! Someone found it!"

#### 9. Contacting the Finder
**Screen**: Contact Modal  
**Emotion**: 😊 Grateful  
**Action**: Clicks "Contact Owner", sends message  
**Message**: "Hi! This is my wallet! Can we meet to get it back?"  
**Time**: 30 seconds

#### 10. Arranging Pickup
**Emotion**: 😌 Relieved  
**Action**: Receives response, arranges meeting  
**Outcome**: Gets wallet back the same day!

### Journey Metrics
- **Time to Find**: 3 minutes
- **Steps**: 10 steps
- **Friction Points**: 1 (registration)
- **Success Rate**: High (if item is posted)
- **Satisfaction**: ⭐⭐⭐⭐⭐ (5/5)

### Pain Points & Solutions
| Pain Point | Solution |
|------------|----------|
| Registration friction | Google OAuth (1-click) |
| Too many search results | Better filters and search |
| Can't identify item from photo | Encourage detailed photos |
| Slow response from finder | In-app notifications |

---

## 🗺️ Journey 2: Mike Finds Keys

### Scenario
Mike finds a set of keys on a bench near the cafeteria. He wants to help return them to the owner.

### Journey Steps

#### 1. Finding the Keys
**Emotion**: 🤔 Curious  
**Action**: Picks up keys, looks around  
**Thought**: "Someone must be looking for these."

#### 2. Deciding to Help
**Emotion**: 😊 Helpful  
**Action**: Takes photo of keys with phone  
**Thought**: "I should post this somewhere."

#### 3. Remembering KampusKart
**Emotion**: 💡 Idea!  
**Action**: Opens KampusKart app  
**Thought**: "I heard about this app for lost items."

#### 4. Already Logged In
**Screen**: Dashboard  
**Emotion**: 👍 Convenient  
**Action**: Sees "Post Item" button  
**Thought**: "Perfect, I can post these keys."

#### 5. Clicking Post Item
**Screen**: Create Form  
**Emotion**: 📝 Ready to help  
**Action**: Clicks floating "+" button  
**Transition**: Smooth navigation to form

#### 6. Filling Out Form
**Screen**: Create Form  
**Emotion**: 🤔 Thinking  
**Actions**:
- Title: "Found Keys Near Cafeteria"
- Description: "Set of 3 keys with blue keychain. Found on bench outside cafeteria."
- Category: Selects "Keys"
- Status: Selects "Found"
- Location: "Near Cafeteria"
- Time**: 2 minutes

#### 7. Uploading Photo
**Screen**: Image Upload  
**Emotion**: 📸 Careful  
**Action**: Uploads photo of keys  
**Thought**: "I'll blur out any identifying details for security."  
**Time**: 30 seconds

#### 8. Reviewing & Posting
**Screen**: Form Review  
**Emotion**: ✅ Satisfied  
**Action**: Reviews info, clicks "Post Item"  
**Thought**: "Looks good!"

#### 9. Success Confirmation
**Screen**: Success Modal  
**Emotion**: 😊 Accomplished  
**Action**: Sees "Item Posted Successfully!"  
**Thought**: "Hope the owner finds this!"

#### 10. Receiving Contact
**Emotion**: 📧 Notified  
**Action**: Gets notification - someone contacted about keys  
**Outcome**: Arranges to return keys to owner

### Journey Metrics
- **Time to Post**: 3 minutes
- **Steps**: 10 steps
- **Friction Points**: 0 (smooth experience)
- **Success Rate**: High
- **Satisfaction**: ⭐⭐⭐⭐⭐ (5/5)

### Pain Points & Solutions
| Pain Point | Solution |
|------------|----------|
| Form too long | Keep fields minimal, optional fields |
| Photo upload slow | Compress images, show progress |
| Unsure what to write | Placeholder text with examples |
| Security concerns | Guidelines for safe meetups |

---

## 🗺️ Journey 3: Emma Manages Campus Lost & Found

### Scenario
Emma, a campus admin, wants to use KampusKart to centralize the campus lost & found system.

### Journey Steps

#### 1. Hearing About KampusKart
**Emotion**: 🤔 Interested  
**Action**: Hears from students about the platform  
**Thought**: "This could solve our lost & found problem."

#### 2. Exploring the Platform
**Screen**: Landing Page  
**Emotion**: 👀 Evaluating  
**Action**: Reads about features  
**Thought**: "Can this handle our volume?"

#### 3. Creating Admin Account
**Screen**: Registration  
**Emotion**: 📝 Professional  
**Action**: Registers with campus email  
**Note**: Needs admin role assignment

#### 4. Posting Multiple Items
**Screen**: Create Form (repeated)  
**Emotion**: 😓 Tedious  
**Action**: Posts 10 items from physical lost & found  
**Pain Point**: Repetitive data entry  
**Time**: 30 minutes

#### 5. Managing Inquiries
**Screen**: Dashboard + Messages  
**Emotion**: 📧 Busy  
**Action**: Responds to multiple student inquiries  
**Thought**: "This is easier than phone calls!"

#### 6. Marking Items as Resolved
**Screen**: Item Detail (Owner View)  
**Emotion**: ✅ Organized  
**Action**: Marks items as resolved when returned  
**Thought**: "Good to track what's been returned."

#### 7. Viewing Analytics
**Screen**: Dashboard Stats  
**Emotion**: 📊 Analytical  
**Action**: Checks total items, resolved rate  
**Thought**: "We're helping a lot of students!"

### Journey Metrics
- **Time Investment**: 30 min initial, 10 min daily
- **Items Managed**: 50+ per month
- **Efficiency Gain**: 70% vs manual system
- **Satisfaction**: ⭐⭐⭐⭐ (4/5)

### Pain Points & Solutions
| Pain Point | Solution |
|------------|----------|
| Bulk posting tedious | Add bulk upload feature (future) |
| No admin dashboard | Create admin-specific views (future) |
| Can't assign items to students | Add assignment feature (future) |
| No reporting | Add analytics dashboard (future) |

---

## 📊 Journey Comparison

| Metric | Sarah (Lost) | Mike (Found) | Emma (Admin) |
|--------|--------------|--------------|--------------|
| Time to Complete | 3 min | 3 min | 30 min |
| Friction Points | 1 | 0 | 2 |
| Satisfaction | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Repeat Usage | High | Medium | Daily |
| Success Rate | 80% | 95% | 90% |

---

## 🎯 Key Insights

### What Works Well
1. **Quick Registration**: Google OAuth reduces friction
2. **Simple Posting**: Form is straightforward for finders
3. **Visual Search**: Photos help identify items quickly
4. **Direct Contact**: Easy communication between users
5. **Mobile-Friendly**: Works well on phones (primary use case)

### Areas for Improvement
1. **Bulk Operations**: Admins need bulk posting
2. **Notifications**: Real-time alerts for matches
3. **Search Accuracy**: Better matching algorithm
4. **Security**: Guidelines for safe meetups
5. **Verification**: Confirm item ownership before return

---

## 🔄 Critical User Flows

### Flow 1: Lost Item → Found (Success Path)
```
User loses item
  → Opens KampusKart
  → Searches for item
  → Finds matching post
  → Contacts finder
  → Arranges pickup
  → Gets item back
  → Marks as resolved
```

### Flow 2: Found Item → Returned (Success Path)
```
User finds item
  → Opens KampusKart
  → Posts item with photo
  → Owner contacts them
  → Arranges return
  → Returns item
  → Marks as resolved
```

### Flow 3: Lost Item → Not Found (Failure Path)
```
User loses item
  → Opens KampusKart
  → Searches for item
  → No matching posts
  → Posts "Lost" item
  → Waits for contact
  → (Hopefully) Gets contacted
```

---

## 💡 Design Implications

### From Sarah's Journey
- **Fast search** is critical (stressed users)
- **Visual identification** matters (photos)
- **Quick contact** reduces anxiety
- **Mobile-first** (users on the go)

### From Mike's Journey
- **Easy posting** encourages good samaritans
- **Clear guidance** helps first-time users
- **Quick success** feels rewarding
- **Notifications** keep users engaged

### From Emma's Journey
- **Bulk operations** needed for admins
- **Analytics** help justify the platform
- **Role-based features** improve efficiency
- **Integration** with existing systems (future)

---

## ✅ Journey Validation Checklist

- [x] Personas defined with clear goals
- [x] Emotional journey mapped
- [x] Pain points identified
- [x] Solutions proposed
- [x] Metrics established
- [x] Critical flows documented
- [x] Design implications noted

---

## 🚀 Next Steps

1. **Validate** journeys with real users (surveys/interviews)
2. **Prioritize** features based on journey impact
3. **Design** screens to support critical paths
4. **Test** prototypes with persona scenarios
5. **Iterate** based on user feedback

---

**These journeys guide our design decisions and ensure we're solving real problems!**

**Created**: Day 3 of 30-day sprint  
**Last Updated**: January 16, 2026
