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
