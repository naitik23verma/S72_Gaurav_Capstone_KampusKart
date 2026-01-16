# KampusKart Backend API

Express.js REST API for KampusKart campus community platform.

**Day**: 10 of 30  
**Status**: JWT Authentication implemented  
**Database**: MongoDB with Mongoose

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/kampuskart
# JWT_SECRET=your_secret_key

# Start development server
npm run dev

# Or start production server
npm start
```

Server will run on `http://localhost:5000`

---

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js       # MongoDB connection
├── models/
│   ├── User.js           # User schema
│   └── LostFound.js      # Lost & Found schema
├── controllers/
│   ├── authController.js      # Authentication operations
│   ├── userController.js      # User operations
│   └── lostFoundController.js # Lost & Found operations
├── routes/
│   ├── authRoutes.js          # Auth API routes
│   ├── userRoutes.js          # User API routes
│   └── lostFoundRoutes.js     # Lost & Found API routes
├── middleware/
│   └── auth.js                # JWT authentication & authorization
├── server.js             # Entry point
├── seed-data.js          # Database seeding script
├── package.json          # Dependencies
├── .env.example          # Environment template
└── .gitignore
```

---

## 🗄️ Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required, max 100 chars),
  email: String (required, unique, lowercase),
  passwordHash: String (required, min 8 chars, hashed),
  role: String (enum: ['student', 'faculty', 'admin'], default: 'student'),
  avatar: String (optional),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Features**:
- Password hashing with bcrypt (10 rounds)
- Email validation with regex
- Automatic timestamps
- Password comparison method
- JSON serialization (excludes password)

### LostFound Model

```javascript
{
  _id: ObjectId,
  title: String (required, 5-100 chars),
  description: String (required, 10-500 chars),
  category: String (enum: wallet, keys, phone, documents, electronics, clothing, books, bags, other),
  status: String (enum: open, resolved, default: open),
  type: String (enum: lost, found),
  imageURL: String (optional),
  location: String (max 100 chars),
  lastSeenDate: Date (optional),
  contactInfo: String (max 100 chars),
  createdBy: ObjectId (ref: User),
  isActive: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Features**:
- Category and status validation
- User reference with population
- Virtual itemId field (LF-XXXXXXXX)
- Indexed for fast queries
- Static methods for common queries

---

## 🔌 API Endpoints

### Health & Status

#### Health Check
```
GET /api/health
Response: { status: 'OK', timestamp, uptime }
```

#### Root
```
GET /
Response: { message, version, status, endpoints }
```

### Authentication

#### Register
```
POST /api/auth/register
Body: { name, email, password, role }
Response: { success, message, data: { user, token } }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { success, message, data: { user, token } }
```

#### Get Current User
```
GET /api/auth/me
Headers: Authorization: Bearer TOKEN
Response: { success, data: user }
```

#### Update Profile
```
PUT /api/auth/profile
Headers: Authorization: Bearer TOKEN
Body: { name, avatar }
Response: { success, message, data: user }
```

### User Operations (Test Routes)

#### Create User
```
POST /api/test/users/create
Body: { name, email, password, role }
Response: { success, message, data: user }
```

#### Get All Users
```
GET /api/test/users
Query: ?limit=10
Response: { success, count, data: users[] }
```

#### Get User by ID
```
GET /api/test/users/:id
Response: { success, data: user }
```

#### Get User by Email
```
GET /api/test/users/email/:email
Response: { success, data: user }
```

#### Verify Password
```
POST /api/test/users/verify
Body: { email, password }
Response: { success, message, data: user }
```

### Lost & Found Operations

#### Get All Items
```
GET /api/lost-found
Query: ?category=wallet&status=open&type=lost&search=phone&limit=20&page=1
Response: { success, count, total, page, pages, data: items[] }
```

#### Get Recent Items
```
GET /api/lost-found/recent
Query: ?limit=10
Response: { success, count, data: items[] }
```

#### Get Statistics
```
GET /api/lost-found/statistics
Response: { success, data: { total, open, resolved, lost, found, newToday } }
```

#### Get Items by Category
```
GET /api/lost-found/category/:category
Query: ?limit=10
Response: { success, count, data: items[] }
```

#### Get Items by Status
```
GET /api/lost-found/status/:status
Query: ?limit=10
Response: { success, count, data: items[] }
```

#### Get Items by User
```
GET /api/lost-found/user/:userId
Query: ?limit=10
Response: { success, count, data: items[] }
```

#### Get Single Item
```
GET /api/lost-found/:id
Response: { success, data: item }
```

#### Create Item
```
POST /api/lost-found
Headers: Authorization: Bearer TOKEN
Body: {
  title: String (required, 5-100 chars),
  description: String (required, 10-500 chars),
  category: String (required, enum),
  type: String (required, 'lost' or 'found'),
  location: String (optional),
  lastSeenDate: Date (optional),
  contactInfo: String (optional),
  imageURL: String (optional)
}
Response: { success, message, data: item }
Note: createdBy is automatically set to authenticated user
```

#### Update Item
```
PUT /api/lost-found/:id
Headers: Authorization: Bearer TOKEN
Body: { fields to update }
Response: { success, message, data: item }
Note: Only item owner can update
```

#### Delete Item
```
DELETE /api/lost-found/:id
Headers: Authorization: Bearer TOKEN
Response: { success, message, data: item }
Note: Only item owner can delete (soft delete)
```

### Coming Soon (Day 11+)
- Google OAuth integration
- Image upload to Cloudinary

---

## 🛠️ Tech Stack

- **Framework**: Express.js 4.18+
- **Database**: MongoDB with Mongoose 8.0+
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Environment**: dotenv
- **CORS**: cors middleware
- **Dev Tool**: nodemon

---

## 🔐 Environment Variables

Required variables in `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/kampuskart
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

---

## 📝 Scripts

```bash
# Start server (production)
npm start

# Start with nodemon (development)
npm run dev

# Seed database with test data
npm run seed

# Run tests (coming soon)
npm test
```

---

## ✅ Day 6-10 Checklist

### Day 6
- [x] Initialize npm project
- [x] Install dependencies
- [x] Create .env.example
- [x] Setup database connection
- [x] Create User model
- [x] Setup Express server
- [x] Add CORS middleware
- [x] Add health check endpoint
- [x] Test server startup

### Day 7
- [x] Create user controller
- [x] Implement createUser function
- [x] Implement getUserByEmail function
- [x] Implement getUserById function
- [x] Implement getAllUsers function
- [x] Implement verifyUserPassword function
- [x] Create user routes
- [x] Test database write (create user)
- [x] Test database read (get user)
- [x] Verify password hashing works

### Day 8
- [x] Create LostFound model
- [x] Implement getAllLostFound with filters
- [x] Implement getLostFoundById
- [x] Implement getItemsByUser
- [x] Implement getRecentItems
- [x] Implement getItemsByCategory
- [x] Implement getItemsByStatus
- [x] Implement getStatistics
- [x] Create lost-found routes (7 GET endpoints)
- [x] Create seed-data.js script
- [x] Test all GET endpoints

### Day 9
- [x] Implement createLostFound function
- [x] Implement updateLostFound function
- [x] Implement deleteLostFound function (soft delete)
- [x] Add POST /api/lost-found route
- [x] Add PUT /api/lost-found/:id route
- [x] Add DELETE /api/lost-found/:id route
- [x] Add validation for required fields
- [x] Test POST endpoint (create item)
- [x] Test PUT endpoint (update item)
- [x] Test DELETE endpoint (soft delete)

### Day 10
- [x] Create auth middleware (protect, authorize)
- [x] Create auth controller (register, login, getMe, updateProfile)
- [x] Create auth routes
- [x] Implement JWT token generation
- [x] Protect POST /api/lost-found route
- [x] Protect PUT /api/lost-found/:id route
- [x] Protect DELETE /api/lost-found/:id route
- [x] Add owner-only authorization for update/delete
- [x] Test registration
- [x] Test login
- [x] Test protected routes

---

## 🚀 Next Steps (Day 11)

- Implement Google OAuth
- Add passport.js
- Create OAuth callback routes

---

**Created**: Day 6 of 30-day sprint  
**Last Updated**: January 16, 2026
