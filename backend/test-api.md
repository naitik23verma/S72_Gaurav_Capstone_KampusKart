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


---

# Lost & Found POST/PUT/DELETE Tests (Day 9)

Test the Lost & Found create, update, and delete operations.

---

## Prerequisites

1. Server running: `npm run dev`
2. Database seeded: `npm run seed`
3. Get a user ID from seed data for testing

---

## Get User ID for Testing

```bash
# Get all users to find a user ID
curl http://localhost:5000/api/test/users

# Copy one of the _id values to use as createdBy
```

---

## Test Endpoints

### 1. Create Item (POST)

**Request**:
```bash
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lost Blue Backpack",
    "description": "Blue backpack with laptop inside. Lost near the library on Jan 16. Has a red patch on the front pocket.",
    "category": "bags",
    "type": "lost",
    "location": "Near Library",
    "lastSeenDate": "2026-01-16",
    "contactInfo": "john@campus.edu",
    "createdBy": "USER_ID_HERE"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "_id": "...",
    "title": "Lost Blue Backpack",
    "description": "Blue backpack with laptop inside...",
    "category": "bags",
    "type": "lost",
    "status": "open",
    "location": "Near Library",
    "lastSeenDate": "2026-01-16T00:00:00.000Z",
    "contactInfo": "john@campus.edu",
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

### 2. Create Item - Validation Error

**Request (Missing Required Fields)**:
```bash
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lost Item"
  }'
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Please provide all required fields: title, description, category, type, createdBy"
}
```

---

### 3. Create Item - Invalid Category

**Request**:
```bash
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lost Something",
    "description": "This is a test item with invalid category",
    "category": "invalid_category",
    "type": "lost",
    "createdBy": "USER_ID_HERE"
  }'
```

**Expected Response**:
```json
{
  "success": false,
  "message": "invalid_category is not a valid category"
}
```

---

### 4. Update Item (PUT)

**Request**:
```bash
# First, get an item ID
curl http://localhost:5000/api/lost-found

# Then update that item
curl -X PUT http://localhost:5000/api/lost-found/ITEM_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "description": "Updated description - item has been found!"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "_id": "...",
    "title": "Lost Blue Backpack",
    "description": "Updated description - item has been found!",
    "status": "resolved",
    "updatedAt": "2026-01-16T..."
  }
}
```

---

### 5. Update Item - Change Status to Resolved

**Request**:
```bash
curl -X PUT http://localhost:5000/api/lost-found/ITEM_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "_id": "...",
    "status": "resolved",
    "updatedAt": "2026-01-16T..."
  }
}
```

---

### 6. Update Item - Not Found

**Request**:
```bash
curl -X PUT http://localhost:5000/api/lost-found/000000000000000000000000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved"
  }'
```

**Expected Response**:
```json
{
  "success": false,
  "message": "Item not found"
}
```

---

### 7. Delete Item (Soft Delete)

**Request**:
```bash
curl -X DELETE http://localhost:5000/api/lost-found/ITEM_ID_HERE
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Item deleted successfully",
  "data": {
    "_id": "...",
    "title": "Lost Blue Backpack",
    "isActive": false,
    "updatedAt": "2026-01-16T..."
  }
}
```

---

### 8. Verify Soft Delete

**Request** (Try to get deleted item):
```bash
# Get all items - deleted item should not appear
curl http://localhost:5000/api/lost-found

# Try to get deleted item by ID - should still return it
curl http://localhost:5000/api/lost-found/DELETED_ITEM_ID
```

**Note**: Soft deleted items (isActive: false) are filtered out from list queries but can still be retrieved by ID.

---

## Complete Test Sequence

```bash
# 1. Get a user ID
curl http://localhost:5000/api/test/users
# Copy a user _id

# 2. Create a new item
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Lost Item",
    "description": "This is a test item for API testing purposes",
    "category": "other",
    "type": "lost",
    "location": "Test Location",
    "createdBy": "PASTE_USER_ID_HERE"
  }'
# Copy the returned item _id

# 3. Get the created item
curl http://localhost:5000/api/lost-found/ITEM_ID

# 4. Update the item
curl -X PUT http://localhost:5000/api/lost-found/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "description": "Updated test item - now resolved"
  }'

# 5. Verify update
curl http://localhost:5000/api/lost-found/ITEM_ID

# 6. Delete the item
curl -X DELETE http://localhost:5000/api/lost-found/ITEM_ID

# 7. Verify deletion (should not appear in list)
curl http://localhost:5000/api/lost-found

# 8. Try to get deleted item by ID (should still work)
curl http://localhost:5000/api/lost-found/ITEM_ID
```

---

## Test Different Categories

```bash
# Create items in different categories
categories=("wallet" "keys" "phone" "documents" "electronics" "clothing" "books" "bags" "other")

for category in "${categories[@]}"; do
  curl -X POST http://localhost:5000/api/lost-found \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Test $category Item\",
      \"description\": \"Testing $category category\",
      \"category\": \"$category\",
      \"type\": \"lost\",
      \"createdBy\": \"USER_ID_HERE\"
    }"
done
```

---

## Validation Tests

### Test 1: Title Too Short
```bash
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lost",
    "description": "This title is too short",
    "category": "other",
    "type": "lost",
    "createdBy": "USER_ID_HERE"
  }'
# Expected: Error - Title must be at least 5 characters
```

### Test 2: Description Too Short
```bash
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lost Item",
    "description": "Short",
    "category": "other",
    "type": "lost",
    "createdBy": "USER_ID_HERE"
  }'
# Expected: Error - Description must be at least 10 characters
```

### Test 3: Invalid Type
```bash
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Item",
    "description": "Testing invalid type",
    "category": "other",
    "type": "invalid",
    "createdBy": "USER_ID_HERE"
  }'
# Expected: Error - invalid is not a valid type
```

---

## Verification Checklist

- [ ] Can create item with all required fields
- [ ] Can create item with optional fields
- [ ] Validation works for required fields
- [ ] Validation works for title length (5-100)
- [ ] Validation works for description length (10-500)
- [ ] Validation works for category enum
- [ ] Validation works for type enum (lost/found)
- [ ] Can update item
- [ ] Can update status to resolved
- [ ] Can update multiple fields at once
- [ ] Cannot update createdBy field
- [ ] Can delete item (soft delete)
- [ ] Deleted items don't appear in list
- [ ] Deleted items can still be retrieved by ID
- [ ] 404 error for non-existent item
- [ ] User population works in responses
- [ ] Virtual itemId field appears
- [ ] Timestamps update correctly

---

## Expected Database State

After creating a test item:

```javascript
// kampuskart.lostfounds collection
{
  _id: ObjectId("..."),
  title: "Test Lost Item",
  description: "This is a test item for API testing purposes",
  category: "other",
  status: "open",
  type: "lost",
  location: "Test Location",
  imageURL: null,
  lastSeenDate: null,
  contactInfo: null,
  createdBy: ObjectId("..."),
  isActive: true,
  createdAt: ISODate("2026-01-16T..."),
  updatedAt: ISODate("2026-01-16T...")
}
```

After soft delete:

```javascript
{
  // ... same fields ...
  isActive: false,  // Changed to false
  updatedAt: ISODate("2026-01-16T...")  // Updated timestamp
}
```

---

**All tests passing = POST/PUT/DELETE API working! ✅**

**Created**: Day 9 of 30-day sprint  
**Last Updated**: January 16, 2026
