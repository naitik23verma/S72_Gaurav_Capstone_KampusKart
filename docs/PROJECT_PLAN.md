# KampusKart - Project Plan

**Project Duration**: 30 Days (Jan 16 - Feb 14, 2026)  
**Target Score**: 13-14 points  
**Developer**: Gaurav (S72)

---

## 🎯 Project Scope

### Core Features
1. **User Management**
   - Registration with email/password
   - Login with JWT authentication
   - Google OAuth integration
   - User profile management

2. **Lost & Found System**
   - Create lost/found item posts
   - Upload images (Cloudinary)
   - Search and filter items
   - Update item status (open/resolved)
   - Delete items (owner only)
   - View item details with creator info

3. **Campus Updates**
   - Community feed for announcements
   - Post updates (admin/faculty)
   - View chronological feed

4. **UI/UX**
   - Responsive design (mobile + desktop)
   - Match hi-fidelity Figma designs
   - Intuitive navigation
   - Loading states and error handling

---

## 📅 Milestones

### Phase 1: Setup & Design (Days 1-5)
- ✅ Repository structure
- ✅ Low-fidelity wireframes
- ✅ High-fidelity Figma designs
- ✅ GitHub Projects board setup

### Phase 2: Backend Development (Days 6-13)
- Database schemas (User, LostFound)
- RESTful API endpoints (CRUD)
- Authentication (JWT + OAuth)
- File upload integration
- Backend deployment (Render)

### Phase 3: Frontend Development (Days 14-23)
- React app initialization
- Authentication pages
- Lost & Found pages
- Component library
- Design implementation
- Frontend deployment (Netlify/Vercel)

### Phase 4: Testing & Documentation (Days 24-26)
- API documentation (Bruno)
- Jest unit tests (5+)
- Docker containerization

### Phase 5: Polish & Launch (Days 27-30)
- Get 5+ active users
- Optional: LLM/AI features
- Final documentation
- Proof of work compilation

---

## 🏆 Success Criteria

### Level 1 Concepts (Target: 10.5 points)
- All 21 concepts completed
- Each concept properly documented
- Video proof for each PR
- GitHub Projects tracking

### Level 2 Concepts (Target: 2-3 points)
- Jest testing (5+ unit tests) - 1 point
- Dockerfile support - 1 point
- 5+ active users - 1 point
- Optional: LLM/AI autocomplete - 2 points

### Quality Metrics
- All deployments live and functional
- Zero critical bugs
- Design matches Figma 95%+
- API response time <500ms
- Mobile responsive on all pages

---

## 🛠️ Technical Architecture

### Database Schema

**User Collection**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  passwordHash: String,
  role: String (enum: student/faculty/admin),
  createdAt: Date,
  updatedAt: Date
}
```

**LostFound Collection**
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String (enum),
  status: String (enum: open/resolved),
  imageURL: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### API Endpoints

**Auth Routes**
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/google
- GET /api/auth/google/callback

**Lost & Found Routes**
- GET /api/lost-found (all items)
- GET /api/lost-found/:id (single item)
- POST /api/lost-found (create)
- PUT /api/lost-found/:id (update)
- DELETE /api/lost-found/:id (delete)

**Upload Routes**
- POST /api/upload (image upload)

---

## 📊 Risk Management

| Risk | Impact | Mitigation |
|------|--------|------------|
| Lose momentum mid-sprint | High | Daily 2-hour coding blocks, accountability partner |
| Exceed LOC limits | Medium | Plan small PRs, review before push |
| Design inconsistency | Medium | Keep Figma open, regular comparisons |
| Deployment issues | High | Deploy early (Day 13 & 22), test thoroughly |
| Miss concept mapping | Medium | Use PR template, checklist before submit |
| No video proof | High | Record immediately after feature works |

---

## 🎓 Learning Goals

### Technical Skills
- Full-stack development (MERN)
- RESTful API design
- JWT authentication
- OAuth integration
- Cloud deployment
- Docker containerization
- Unit testing with Jest

### Soft Skills
- Daily consistency and discipline
- Documentation best practices
- Video communication
- Project management
- Time estimation

---

## 📈 Progress Tracking

**Daily Checklist**:
- [ ] Pick 1 issue from backlog
- [ ] Create feature branch
- [ ] Implement feature (≤100 LOC)
- [ ] Test locally
- [ ] Record video proof
- [ ] Create PR with full description
- [ ] Update GitHub Projects board
- [ ] Review and merge

**Weekly Review**:
- Every Sunday: Review week's progress
- Adjust timeline if needed
- Celebrate wins
- Plan next week's PRs

---

## 🚀 Launch Strategy

### Pre-Launch (Day 27-28)
- Share with 10 friends/classmates
- Collect feedback
- Fix critical bugs
- Prepare demo video

### Launch (Day 29)
- Announce in cohort Discord
- Share on LinkedIn
- Get 5+ users to test
- Collect testimonials

### Post-Launch (Day 30)
- Compile proof of work
- Create final documentation
- Submit to evaluator
- Celebrate! 🎉

---

**Last Updated**: January 16, 2026
