# KampusKart Backend API

Express.js REST API for KampusKart campus community platform.

**Day**: 6 of 30  
**Status**: Initial setup complete  
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
│   └── User.js           # User schema
├── controllers/          # Business logic (coming soon)
├── routes/               # API routes (coming soon)
├── middleware/           # Auth, validation (coming soon)
├── server.js             # Entry point
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

### Coming Soon (Day 8+)
- GET /api/lost-found - Get all items
- POST /api/lost-found - Create item
- And more...

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

# Run tests (coming soon)
npm test
```

---

## ✅ Day 6-7 Checklist

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

---

## 🚀 Next Steps (Day 8)

- Create LostFound model
- Implement GET API for lost & found items
- Create lost-found routes
- Test API endpoints

---

**Created**: Day 6 of 30-day sprint  
**Last Updated**: January 16, 2026
