# Day 6: Database Schema - User Model ✅

**Date**: January 16, 2026  
**Concept**: Database schema created (0.5 points)  
**Status**: READY FOR PR

---

## ✅ Completed Tasks

### 1. Backend Project Setup
- [x] Created `backend/` folder structure
- [x] Initialized npm project (`package.json`)
- [x] Installed dependencies:
  - express (web framework)
  - mongoose (MongoDB ODM)
  - dotenv (environment variables)
  - bcryptjs (password hashing)
  - jsonwebtoken (JWT auth)
  - cors (CORS middleware)
  - nodemon (dev tool)

### 2. Configuration Files
- [x] Created `.env.example` with all required variables
- [x] Created `.gitignore` for backend
- [x] Created `config/database.js` for MongoDB connection

### 3. User Model
- [x] Created `models/User.js` with complete schema
- [x] Defined fields:
  - name (required, max 100 chars)
  - email (required, unique, validated)
  - passwordHash (required, min 8 chars)
  - role (enum: student/faculty/admin)
  - avatar (optional)
  - isActive (boolean)
  - timestamps (auto)
- [x] Added password hashing middleware (bcrypt)
- [x] Added password comparison method
- [x] Added JSON serialization (excludes password)

### 4. Express Server
- [x] Created `server.js` with Express setup
- [x] Added CORS middleware
- [x] Added JSON body parser
- [x] Created health check endpoint
- [x] Added error handling
- [x] Added 404 handler

### 5. Documentation
- [x] Updated `backend/README.md` with:
  - Quick start guide
  - Project structure
  - Database schema documentation
  - API endpoints list
  - Tech stack
  - Environment variables
  - Scripts

---

## 📊 PR Statistics

**Files Created**: 8 files  
**Total Lines**: ~250 LOC  
**Coverage**: Complete backend foundation

### File Breakdown:
- package.json: ~30 lines
- .env.example: ~15 lines
- config/database.js: ~20 lines
- models/User.js: ~90 lines
- server.js: ~50 lines
- .gitignore: ~25 lines
- README.md: ~120 lines

---

## 🎯 What This Achieves

### Database Schema
- ✅ User model with all required fields
- ✅ Password hashing (bcrypt, 10 rounds)
- ✅ Email validation (regex)
- ✅ Role-based access (student/faculty/admin)
- ✅ Automatic timestamps
- ✅ Secure password handling

### Backend Foundation
- ✅ Express server configured
- ✅ MongoDB connection ready
- ✅ CORS enabled
- ✅ Error handling
- ✅ Health check endpoint
- ✅ Environment variables

### Ready For
- ✅ User CRUD operations (Day 7)
- ✅ Authentication (Day 12)
- ✅ Lost & Found API (Day 8-11)
- ✅ Deployment (Day 13)

---

## 🎯 PR Description Template

```markdown
# [Day 6] Database Schema - User Model

## What changed?
Created complete backend foundation with Express server, MongoDB connection, and User model. Implemented password hashing, email validation, role-based access, and automatic timestamps. Setup project structure with all necessary configuration files.

## Which Kalvium Concept(s)?
- **Database schema created** (0.5 points)

## How to test?
1. Navigate to `backend/` folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` with MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/kampuskart
   JWT_SECRET=test_secret_key
   ```
5. Start server:
   ```bash
   npm run dev
   ```
6. Test endpoints:
   ```bash
   # Health check
   curl http://localhost:5000/api/health
   
   # Root endpoint
   curl http://localhost:5000/
   ```
7. Verify MongoDB connection in console logs
8. Review User model in `models/User.js`

## Video Proof
[🎥 INSERT YOUR LOOM LINK HERE]

**What to show in video (2-3 min)**:
- Show `backend/` folder structure
- Open `package.json` - show dependencies
- Open `models/User.js`:
  - Show schema fields
  - Highlight password hashing middleware
  - Show password comparison method
- Open `config/database.js` - show connection logic
- Open `server.js` - show Express setup
- Open terminal:
  - Run `npm install`
  - Run `npm run dev`
  - Show server starting
  - Show MongoDB connection success
  - Test health check endpoint with curl/Postman
- Show console logs confirming connection

## Proof of Work
- ✅ 8 files created
- ✅ ~250 lines of code
- ✅ User model with complete schema
- ✅ Password hashing implemented
- ✅ MongoDB connection configured
- ✅ Express server running
- ✅ Health check endpoint working
- ✅ GitHub Projects card: "Day 6 - Database Schema" → Done
- ✅ Video proof recorded and linked

## Technical Decisions

**Why Mongoose?**
- Schema validation out of the box
- Middleware support (pre/post hooks)
- Built-in methods and virtuals
- Better TypeScript support
- Active community

**Why bcrypt?**
- Industry standard for password hashing
- Automatic salt generation
- Configurable rounds (10 = good balance)
- Resistant to rainbow table attacks

**Password Hashing**
- Pre-save middleware hashes password automatically
- Only hashes if password is modified
- 10 rounds (2^10 iterations)
- Salt generated per password

**User Schema Design**
- Email validation with regex
- Role-based access (student/faculty/admin)
- Soft delete with isActive flag
- Automatic timestamps (createdAt/updatedAt)
- Password excluded from JSON by default

**Express Setup**
- CORS enabled for frontend communication
- JSON body parser for API requests
- Error handling middleware
- 404 handler for unknown routes
- Health check for monitoring

## Database Schema

```javascript
User {
  _id: ObjectId (auto)
  name: String (required, max 100)
  email: String (required, unique, validated)
  passwordHash: String (required, min 8, hashed)
  role: String (enum: student/faculty/admin, default: student)
  avatar: String (optional)
  isActive: Boolean (default: true)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## Next Steps (Day 7)
- Create user controller with CRUD operations
- Implement createUser, getUserByEmail, getUserById
- Create test routes for database operations
- Test database read and write
- Verify password hashing works
```

---

## 🎥 Video Recording Script

**Opening** (15 seconds):
> "Hey! Day 6 of KampusKart. Today I set up the backend foundation with Express, MongoDB, and created the User model with password hashing. Let me show you what's working."

**Demo** (2.5 minutes):

1. **Show folder structure** (20 sec)
   - Open `backend/` folder
   - Show files: package.json, server.js, models/, config/
   - "Complete backend structure ready"

2. **Show User Model** (40 sec)
   - Open `models/User.js`
   - Highlight schema fields:
     - name, email, passwordHash, role
     - timestamps
   - Show password hashing middleware:
     - "Automatically hashes password before saving"
     - "Uses bcrypt with 10 rounds"
   - Show comparePassword method:
     - "For login authentication"

3. **Show Configuration** (30 sec)
   - Open `config/database.js`
   - Show MongoDB connection logic
   - Open `.env.example`
   - Show required environment variables

4. **Show Server Setup** (30 sec)
   - Open `server.js`
   - Show Express initialization
   - Show CORS middleware
   - Show health check endpoint
   - Show error handling

5. **Run Server** (50 sec)
   - Open terminal in `backend/` folder
   - Run `npm install` (show installing)
   - Create `.env` file (show copying from example)
   - Run `npm run dev`
   - Show console output:
     - "Server running on port 5000"
     - "MongoDB Connected: localhost"
     - "Database: kampuskart"
   - Open browser/Postman
   - Test `http://localhost:5000/api/health`
   - Show JSON response: `{ status: 'OK', ... }`

**Wrap Up** (10 seconds):
> "Backend foundation complete! User model with password hashing, MongoDB connected, Express server running. Tomorrow I'll add CRUD operations!"

---

## 📝 Git Commands

```bash
# Check status
git status

# Stage new files
git add backend/
git add docs/DAY_6_CHECKLIST.md

# Commit
git commit -m "feat: Day 6 - Database schema and backend setup

- Initialized Node.js backend with Express
- Created User model with password hashing (bcrypt)
- Setup MongoDB connection with Mongoose
- Configured CORS and middleware
- Added health check endpoint
- Implemented password comparison method
- Added automatic timestamps

Concept: Database schema created (0.5 points)"

# Create feature branch
git checkout -b feature/day-6-database-schema

# Push
git push origin feature/day-6-database-schema
```

---

## ✅ Backend Setup Complete!

### What's Working
- ✅ Express server running on port 5000
- ✅ MongoDB connection established
- ✅ User model with complete schema
- ✅ Password hashing (bcrypt)
- ✅ Email validation
- ✅ Role-based access
- ✅ Health check endpoint
- ✅ Error handling

### Database Schema
- ✅ User model fully defined
- ✅ 8 fields (name, email, password, role, avatar, isActive, timestamps)
- ✅ Validation rules
- ✅ Password hashing middleware
- ✅ Password comparison method
- ✅ JSON serialization (excludes password)

---

## 📈 Progress Update

**Completed Concepts**: 5 / 21  
**Points Earned**: 2.0 / 14 target  
**Days Completed**: 6 / 30  
**On Track**: ✅ YES (20% complete!)

```
✅ Day 1: Repository Setup (0.5 pts)
✅ Day 2: Low-fid Wireframes (0.25 pts)
✅ Day 3: Low-fid Completion (0.25 pts)
✅ Day 4: Hi-fid Design Specs (0.25 pts)
✅ Day 5: Hi-fid Completion (0.25 pts)
✅ Day 6: Database Schema (0.5 pts)
📅 Day 7: Database Read/Write (0.5 pts)
📅 Day 8: GET API (0.5 pts)
```

---

## 🚀 Tomorrow (Day 7)

**Task**: Database read and write operations

**What to do**:
1. Create `controllers/userController.js`
2. Implement functions:
   - createUser(name, email, password)
   - getUserByEmail(email)
   - getUserById(id)
3. Create `routes/userRoutes.js` with test endpoints
4. Test creating users
5. Test reading users
6. Verify password hashing works

**Time Estimate**: 1-2 hours

---

## 💡 Key Achievements

1. **Backend Foundation**: Complete Express + MongoDB setup
2. **User Model**: Professional schema with validation
3. **Security**: Password hashing with bcrypt
4. **Best Practices**: Middleware, error handling, environment variables
5. **Documentation**: Clear README and code comments

---

**Excellent work! Backend foundation complete. Ready for CRUD operations! 🚀**
