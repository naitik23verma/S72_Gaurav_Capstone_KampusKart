# Day 10 Checklist - JWT Authentication

**Date**: January 16, 2026  
**Focus**: Implement JWT authentication and protect routes  
**Target Concept**: Authentication used (0.5 points)  
**LOC Target**: ≤100 lines

---

## ✅ Tasks Completed

### 1. Authentication Middleware
- [x] Create `middleware/auth.js`
- [x] Implement `protect` middleware (JWT verification)
- [x] Implement `authorize` middleware (role-based access)
- [x] Extract token from Authorization header
- [x] Verify token with JWT_SECRET
- [x] Attach user to request object
- [x] Handle invalid/expired tokens
- [x] Check user active status

### 2. Authentication Controller
- [x] Create `controllers/authController.js`
- [x] Implement `generateToken` function
- [x] Implement `register` function
- [x] Implement `login` function
- [x] Implement `getMe` function
- [x] Implement `updateProfile` function
- [x] Add validation for required fields
- [x] Check for duplicate emails
- [x] Verify passwords on login

### 3. Authentication Routes
- [x] Create `routes/authRoutes.js`
- [x] POST /api/auth/register route
- [x] POST /api/auth/login route
- [x] GET /api/auth/me route (protected)
- [x] PUT /api/auth/profile route (protected)

### 4. Protect Lost & Found Routes
- [x] Import protect middleware in lostFoundRoutes
- [x] Protect POST /api/lost-found
- [x] Protect PUT /api/lost-found/:id
- [x] Protect DELETE /api/lost-found/:id
- [x] Auto-set createdBy from authenticated user
- [x] Add owner-only check for update
- [x] Add owner-only check for delete

### 5. Server Integration
- [x] Import auth routes in server.js
- [x] Mount auth routes at /api/auth
- [x] Update root endpoint with auth info

### 6. Testing
- [x] Test user registration
- [x] Test duplicate email rejection
- [x] Test user login
- [x] Test wrong password rejection
- [x] Test protected route access
- [x] Test token validation
- [x] Test profile update
- [x] Test item creation with auth
- [x] Test owner-only update
- [x] Test owner-only delete

### 7. Documentation
- [x] Update backend/README.md
- [x] Add authentication endpoints
- [x] Update protected route docs
- [x] Add auth testing guide to test-api.md
- [x] Create Day 10 checklist

---

## 📊 Statistics

- **Files Created**: 3 (auth.js, authController.js, authRoutes.js)
- **Files Modified**: 3 (lostFoundRoutes.js, server.js, README.md)
- **Files Updated**: 1 (test-api.md)
- **Total LOC Added**: ~350 lines
- **New API Endpoints**: 4 (register, login, getMe, updateProfile)
- **Middleware Functions**: 2 (protect, authorize)
- **Controller Functions**: 4 functions
- **Protected Routes**: 3 (POST, PUT, DELETE lost-found)

---

## 🔌 API Endpoints Added

### 1. Register
```
POST /api/auth/register
Body: { name, email, password, role }
Response: { success, message, data: { user, token } }
```

### 2. Login
```
POST /api/auth/login
Body: { email, password }
Response: { success, message, data: { user, token } }
```

### 3. Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer TOKEN
Response: { success, data: user }
```

### 4. Update Profile
```
PUT /api/auth/profile
Headers: Authorization: Bearer TOKEN
Body: { name, avatar }
Response: { success, message, data: user }
```

---

## 🔒 Security Features

### JWT Authentication
- Token generation with JWT_SECRET
- 7-day token expiration
- Token verification on protected routes
- User ID embedded in token payload

### Password Security
- bcrypt hashing (10 rounds)
- Password never returned in responses
- Password comparison for login

### Authorization
- Owner-only update/delete
- Role-based access control (authorize middleware)
- User active status check

### Protected Routes
- POST /api/lost-found - Requires authentication
- PUT /api/lost-found/:id - Requires authentication + ownership
- DELETE /api/lost-found/:id - Requires authentication + ownership

---

## 🧪 Testing Checklist

### Registration Tests
```bash
# Valid registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@campus.edu",
    "password": "test123"
  }'

# Duplicate email (should fail)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User 2",
    "email": "test@campus.edu",
    "password": "test456"
  }'
```

### Login Tests
```bash
# Valid login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@campus.edu",
    "password": "test123"
  }'

# Wrong password (should fail)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@campus.edu",
    "password": "wrongpassword"
  }'
```

### Protected Route Tests
```bash
# With valid token
TOKEN="your_token_here"
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"

# Without token (should fail)
curl http://localhost:5000/api/auth/me

# With invalid token (should fail)
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer invalid_token"
```

### Owner Authorization Tests
```bash
# Create item as User A
curl -X POST http://localhost:5000/api/lost-found \
  -H "Authorization: Bearer $TOKEN_A" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Item",
    "description": "Testing ownership",
    "category": "other",
    "type": "lost"
  }'

# Try to update as User B (should fail)
curl -X PUT http://localhost:5000/api/lost-found/ITEM_ID \
  -H "Authorization: Bearer $TOKEN_B" \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved"}'

# Update as User A (should succeed)
curl -X PUT http://localhost:5000/api/lost-found/ITEM_ID \
  -H "Authorization: Bearer $TOKEN_A" \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved"}'
```

### Expected Results
- ✅ Registration creates user and returns token
- ✅ Duplicate email rejected
- ✅ Login with correct credentials returns token
- ✅ Login with wrong password rejected
- ✅ Protected routes require valid token
- ✅ Invalid/missing token returns 401
- ✅ Can access own profile
- ✅ Can update own profile
- ✅ Can create item (createdBy auto-set)
- ✅ Can update own item
- ✅ Cannot update other user's item
- ✅ Can delete own item
- ✅ Cannot delete other user's item

---

## 📝 PR Template

### Title
```
Day 10: Implement JWT Authentication and Protect Routes
```

### Description
```
Implemented complete JWT authentication system with registration, login, and protected routes. Added owner-only authorization for update/delete operations.

**Changes:**
- Created authentication middleware (protect, authorize)
- Created authentication controller (register, login, getMe, updateProfile)
- Created authentication routes
- Protected POST/PUT/DELETE lost-found routes
- Added owner-only authorization
- Auto-set createdBy from authenticated user

**Concept Achieved:** Authentication used (0.5 points)

**Files Created:**
- backend/middleware/auth.js (new)
- backend/controllers/authController.js (new)
- backend/routes/authRoutes.js (new)

**Files Modified:**
- backend/routes/lostFoundRoutes.js (protected routes)
- backend/server.js (mounted auth routes)
- backend/README.md (updated docs)
- backend/test-api.md (added auth tests)
- docs/DAY_10_CHECKLIST.md (new)

**Security Features:**
- JWT token generation and verification
- Password hashing with bcrypt
- Protected routes require authentication
- Owner-only authorization for updates/deletes
- Token expiration (7 days)
- User active status check

**API Endpoints:**
1. POST /api/auth/register - Register new user
2. POST /api/auth/login - Login user
3. GET /api/auth/me - Get current user (protected)
4. PUT /api/auth/profile - Update profile (protected)

**Protected Routes:**
- POST /api/lost-found (requires auth)
- PUT /api/lost-found/:id (requires auth + ownership)
- DELETE /api/lost-found/:id (requires auth + ownership)
```

### Video Proof Checklist
- [ ] Show user registration
- [ ] Show token returned on registration
- [ ] Show duplicate email rejection
- [ ] Show user login
- [ ] Show token returned on login
- [ ] Show wrong password rejection
- [ ] Show accessing protected route with token
- [ ] Show 401 error without token
- [ ] Show creating item with auth (createdBy auto-set)
- [ ] Show updating own item
- [ ] Show 403 error when updating other user's item
- [ ] Show deleting own item
- [ ] Show 403 error when deleting other user's item

---

## 🎯 Concept Mapping

**Concept**: Authentication used  
**Points**: 0.5  
**Evidence**: 
- JWT authentication fully implemented
- Register and login endpoints working
- Protected routes require valid token
- Token verification working
- Owner-only authorization working
- All security features tested

**Total Score After Day 10**: 4.0/14 points

---

## 🔍 Code Quality

### Middleware Design
- Reusable protect middleware
- Flexible authorize middleware (role-based)
- Clear error messages
- Proper status codes (401, 403)

### Token Management
- Secure token generation
- Configurable expiration
- Proper verification
- User ID in payload

### Error Handling
- Try-catch blocks
- Descriptive error messages
- Consistent response format
- Security-conscious messages (don't reveal if email exists)

### Authorization Logic
- Owner check before update/delete
- Clear 403 Forbidden responses
- Cannot update createdBy field
- Automatic createdBy from token

---

## 🚀 Next Steps (Day 11)

- Implement Google OAuth
- Add passport.js
- Create OAuth callback routes
- Store OAuth tokens

---

## 📈 Progress Summary

**Days Completed**: 10/30 (33% complete)  
**Backend Progress**: 
- ✅ Database setup (Day 6)
- ✅ User CRUD (Day 7)
- ✅ Lost & Found GET API (Day 8)
- ✅ Lost & Found POST/PUT/DELETE API (Day 9)
- ✅ JWT Authentication (Day 10)
- ⏭️ OAuth (Day 11)

**Points Earned**: 4.0/14
- Repository setup: 0.5
- Low-fid design: 0.5
- Hi-fid design: 0.5
- Database schema: 0.5
- Database R/W: 0.5
- GET API: 0.5
- POST API: 0.5
- Authentication: 0.5

---

**Completed**: January 16, 2026  
**Time Spent**: ~2 hours  
**Status**: ✅ Ready for PR
