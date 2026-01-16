# API Testing Guide

Test the User CRUD operations using curl or Postman.

**Day**: 7 of 30  
**Purpose**: Test database read and write operations

---

## Prerequisites

1. Server running: `npm run dev`
2. MongoDB connected
3. Terminal or Postman ready

---

## Test Endpoints

### 1. Create User

**Request**:
```bash
curl -X POST http://localhost:5000/api/test/users/create \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@campus.edu",
    "password": "password123",
    "role": "student"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@campus.edu",
    "role": "student",
    "isActive": true,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

**Note**: Password is NOT returned (security feature)

---

### 2. Get User by ID

**Request**:
```bash
curl http://localhost:5000/api/test/users/65a1b2c3d4e5f6g7h8i9j0k1
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@campus.edu",
    "role": "student",
    "isActive": true,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

---

### 3. Get User by Email

**Request**:
```bash
curl http://localhost:5000/api/test/users/email/john@campus.edu
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@campus.edu",
    "role": "student",
    "isActive": true,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

---

### 4. Get All Users

**Request**:
```bash
curl http://localhost:5000/api/test/users
```

**Expected Response**:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "John Doe",
      "email": "john@campus.edu",
      "role": "student",
      "isActive": true,
      "createdAt": "2026-01-16T10:30:00.000Z",
      "updatedAt": "2026-01-16T10:30:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "Jane Smith",
      "email": "jane@campus.edu",
      "role": "faculty",
      "isActive": true,
      "createdAt": "2026-01-16T10:31:00.000Z",
      "updatedAt": "2026-01-16T10:31:00.000Z"
    }
  ]
}
```

---

### 5. Verify Password

**Request**:
```bash
curl -X POST http://localhost:5000/api/test/users/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@campus.edu",
    "password": "password123"
  }'
```

**Expected Response (Correct Password)**:
```json
{
  "success": true,
  "message": "Password verified successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "John Doe",
    "email": "john@campus.edu",
    "role": "student",
    "isActive": true,
    "createdAt": "2026-01-16T10:30:00.000Z",
    "updatedAt": "2026-01-16T10:30:00.000Z"
  }
}
```

**Expected Response (Wrong Password)**:
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## Test Sequence

Run these commands in order to test all functionality:

```bash
# 1. Create first user
curl -X POST http://localhost:5000/api/test/users/create \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@campus.edu","password":"password123","role":"student"}'

# 2. Create second user
curl -X POST http://localhost:5000/api/test/users/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@campus.edu","password":"password456","role":"faculty"}'

# 3. Create third user
curl -X POST http://localhost:5000/api/test/users/create \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@campus.edu","password":"admin123","role":"admin"}'

# 4. Get all users
curl http://localhost:5000/api/test/users

# 5. Get user by email
curl http://localhost:5000/api/test/users/email/john@campus.edu

# 6. Verify correct password
curl -X POST http://localhost:5000/api/test/users/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"john@campus.edu","password":"password123"}'

# 7. Verify wrong password (should fail)
curl -X POST http://localhost:5000/api/test/users/verify \
  -H "Content-Type: application/json" \
  -d '{"email":"john@campus.edu","password":"wrongpassword"}'

# 8. Try to create duplicate user (should fail)
curl -X POST http://localhost:5000/api/test/users/create \
  -H "Content-Type: application/json" \
  -d '{"name":"John Duplicate","email":"john@campus.edu","password":"password789"}'
```

---

## Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "KampusKart API - Day 7 Tests",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create User",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@campus.edu\",\n  \"password\": \"password123\",\n  \"role\": \"student\"\n}"
        },
        "url": "http://localhost:5000/api/test/users/create"
      }
    },
    {
      "name": "Get All Users",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/test/users"
      }
    },
    {
      "name": "Get User by Email",
      "request": {
        "method": "GET",
        "url": "http://localhost:5000/api/test/users/email/john@campus.edu"
      }
    },
    {
      "name": "Verify Password",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"john@campus.edu\",\n  \"password\": \"password123\"\n}"
        },
        "url": "http://localhost:5000/api/test/users/verify"
      }
    }
  ]
}
```

---

## Expected Database State

After running all tests, MongoDB should contain:

```javascript
// kampuskart.users collection
[
  {
    _id: ObjectId("..."),
    name: "John Doe",
    email: "john@campus.edu",
    passwordHash: "$2a$10$...", // Hashed password
    role: "student",
    isActive: true,
    createdAt: ISODate("2026-01-16T10:30:00.000Z"),
    updatedAt: ISODate("2026-01-16T10:30:00.000Z")
  },
  {
    _id: ObjectId("..."),
    name: "Jane Smith",
    email: "jane@campus.edu",
    passwordHash: "$2a$10$...", // Hashed password
    role: "faculty",
    isActive: true,
    createdAt: ISODate("2026-01-16T10:31:00.000Z"),
    updatedAt: ISODate("2026-01-16T10:31:00.000Z")
  },
  {
    _id: ObjectId("..."),
    name: "Admin User",
    email: "admin@campus.edu",
    passwordHash: "$2a$10$...", // Hashed password
    role: "admin",
    isActive: true,
    createdAt: ISODate("2026-01-16T10:32:00.000Z"),
    updatedAt: ISODate("2026-01-16T10:32:00.000Z")
  }
]
```

---

## Verification Checklist

- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] Can create user (POST /create)
- [ ] Password is hashed in database
- [ ] Can retrieve user by ID
- [ ] Can retrieve user by email
- [ ] Can get all users
- [ ] Password verification works (correct password)
- [ ] Password verification fails (wrong password)
- [ ] Duplicate email is rejected
- [ ] Password is NOT returned in responses

---

**All tests passing = Database read and write operations working! ✅**

**Created**: Day 7 of 30-day sprint  
**Last Updated**: January 16, 2026


---

# Lost & Found API Tests (Day 8)

Test the Lost & Found GET operations.

---

## Prerequisites

1. Server running: `npm run dev`
2. Database seeded: `npm run seed`
3. Terminal or Postman ready

---

## Seed Database First

```bash
npm run seed
```

This creates:
- 3 users (student, faculty, admin)
- 10 lost & found items (mix of lost/found, open/resolved)

---

## Test Endpoints

### 1. Get All Items

**Request**:
```bash
curl http://localhost:5000/api/lost-found
```

**Expected Response**:
```json
{
  "success": true,
  "count": 10,
  "total": 10,
  "page": 1,
  "pages": 1,
  "data": [
    {
      "_id": "...",
      "title": "Lost Brown Leather Wallet",
      "description": "Brown leather wallet with multiple cards inside...",
      "category": "wallet",
      "type": "lost",
      "status": "open",
      "location": "Near Library",
      "lastSeenDate": "2026-01-15T00:00:00.000Z",
      "createdBy": {
        "_id": "...",
        "name": "John Doe",
        "email": "john@campus.edu",
        "role": "student"
      },
      "isActive": true,
      "createdAt": "2026-01-16T...",
      "updatedAt": "2026-01-16T...",
      "itemId": "LF-XXXXXXXX"
    }
  ]
}
```

---

### 2. Get All Items with Filters

**Filter by Category**:
```bash
curl http://localhost:5000/api/lost-found?category=wallet
```

**Filter by Status**:
```bash
curl http://localhost:5000/api/lost-found?status=open
```

**Filter by Type**:
```bash
curl http://localhost:5000/api/lost-found?type=lost
```

**Search by Text**:
```bash
curl http://localhost:5000/api/lost-found?search=phone
```

**Pagination**:
```bash
curl http://localhost:5000/api/lost-found?limit=5&page=1
curl http://localhost:5000/api/lost-found?limit=5&page=2
```

**Combined Filters**:
```bash
curl "http://localhost:5000/api/lost-found?category=electronics&status=open&type=lost"
```

---

### 3. Get Recent Items

**Request**:
```bash
curl http://localhost:5000/api/lost-found/recent
```

**With Limit**:
```bash
curl http://localhost:5000/api/lost-found/recent?limit=5
```

**Expected Response**:
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "...",
      "title": "Found Wireless Earbuds",
      "description": "White wireless earbuds in charging case...",
      "category": "electronics",
      "type": "found",
      "status": "open",
      "createdBy": {
        "_id": "...",
        "name": "Admin User",
        "email": "admin@campus.edu",
        "role": "admin"
      },
      "createdAt": "2026-01-16T..."
    }
  ]
}
```

---

### 4. Get Statistics

**Request**:
```bash
curl http://localhost:5000/api/lost-found/statistics
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "total": 10,
    "open": 8,
    "resolved": 2,
    "lost": 5,
    "found": 5,
    "newToday": 10
  }
}
```

---

### 5. Get Items by Category

**Request**:
```bash
curl http://localhost:5000/api/lost-found/category/wallet
curl http://localhost:5000/api/lost-found/category/electronics
curl http://localhost:5000/api/lost-found/category/keys
```

**Expected Response**:
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "title": "Lost MacBook Pro",
      "category": "electronics",
      "type": "lost",
      "status": "open"
    },
    {
      "_id": "...",
      "title": "Found Wireless Earbuds",
      "category": "electronics",
      "type": "found",
      "status": "open"
    }
  ]
}
```

---

### 6. Get Items by Status

**Request**:
```bash
curl http://localhost:5000/api/lost-found/status/open
curl http://localhost:5000/api/lost-found/status/resolved
```

**Expected Response**:
```json
{
  "success": true,
  "count": 8,
  "data": [
    {
      "_id": "...",
      "title": "Lost Brown Leather Wallet",
      "status": "open"
    }
  ]
}
```

---

### 7. Get Items by User

**Request** (replace USER_ID with actual ID from seed data):
```bash
# First, get a user ID from the users endpoint
curl http://localhost:5000/api/test/users

# Then use that ID
curl http://localhost:5000/api/lost-found/user/USER_ID
```

**Expected Response**:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "title": "Lost Brown Leather Wallet",
      "createdBy": "USER_ID"
    }
  ]
}
```

---

### 8. Get Single Item by ID

**Request** (replace ITEM_ID with actual ID):
```bash
# First, get an item ID from the list
curl http://localhost:5000/api/lost-found

# Then get that specific item
curl http://localhost:5000/api/lost-found/ITEM_ID
```

**Expected Response**:
```json
{
  "success": true,
  "data": {
    "_id": "ITEM_ID",
    "title": "Lost Brown Leather Wallet",
    "description": "Brown leather wallet with multiple cards inside...",
    "category": "wallet",
    "type": "lost",
    "status": "open",
    "location": "Near Library",
    "lastSeenDate": "2026-01-15T00:00:00.000Z",
    "createdBy": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@campus.edu",
      "role": "student"
    },
    "isActive": true,
    "createdAt": "2026-01-16T...",
    "updatedAt": "2026-01-16T...",
    "itemId": "LF-XXXXXXXX"
  }
}
```

---

## Complete Test Sequence

```bash
# 1. Seed database
npm run seed

# 2. Get all items
curl http://localhost:5000/api/lost-found

# 3. Get recent items
curl http://localhost:5000/api/lost-found/recent?limit=5

# 4. Get statistics
curl http://localhost:5000/api/lost-found/statistics

# 5. Filter by category
curl http://localhost:5000/api/lost-found?category=electronics

# 6. Filter by status
curl http://localhost:5000/api/lost-found?status=open

# 7. Filter by type
curl http://localhost:5000/api/lost-found?type=lost

# 8. Search by text
curl http://localhost:5000/api/lost-found?search=wallet

# 9. Test pagination
curl http://localhost:5000/api/lost-found?limit=3&page=1
curl http://localhost:5000/api/lost-found?limit=3&page=2

# 10. Get by category endpoint
curl http://localhost:5000/api/lost-found/category/wallet

# 11. Get by status endpoint
curl http://localhost:5000/api/lost-found/status/open

# 12. Combined filters
curl "http://localhost:5000/api/lost-found?category=electronics&status=open&type=found"
```

---

## Verification Checklist

- [ ] Seed script runs successfully
- [ ] Can get all items
- [ ] Category filter works
- [ ] Status filter works
- [ ] Type filter works
- [ ] Search filter works
- [ ] Pagination works (limit & page)
- [ ] Recent items endpoint works
- [ ] Statistics endpoint works
- [ ] Get by category endpoint works
- [ ] Get by status endpoint works
- [ ] Get by user endpoint works
- [ ] Get single item works
- [ ] User population works (createdBy field)
- [ ] Virtual itemId field appears
- [ ] Combined filters work
- [ ] 404 error for invalid item ID

---

## Categories Available

- wallet
- keys
- phone
- documents
- electronics
- clothing
- books
- bags
- other

---

## Status Values

- open
- resolved

---

## Type Values

- lost
- found

---

**All tests passing = GET API working! ✅**

**Created**: Day 8 of 30-day sprint  
**Last Updated**: January 16, 2026
