# Day 9 Checklist - POST/PUT/DELETE API for Lost & Found

**Date**: January 16, 2026  
**Focus**: Implement POST, PUT, DELETE API endpoints for Lost & Found items  
**Target Concept**: POST API used (0.5 points)  
**LOC Target**: ≤100 lines

---

## ✅ Tasks Completed

### 1. Controller Functions
- [x] Implement `createLostFound` function
- [x] Implement `updateLostFound` function
- [x] Implement `deleteLostFound` function (soft delete)
- [x] Add proper error handling
- [x] Add user population in responses

### 2. Routes Implementation
- [x] Add POST /api/lost-found route
- [x] Add PUT /api/lost-found/:id route
- [x] Add DELETE /api/lost-found/:id route
- [x] Add validation for required fields
- [x] Add proper error responses
- [x] Prevent updating createdBy field

### 3. Validation
- [x] Validate required fields (title, description, category, type, createdBy)
- [x] Return 400 for missing fields
- [x] Return 404 for non-existent items
- [x] Mongoose validation for field lengths
- [x] Mongoose validation for enums

### 4. Testing
- [x] Test POST endpoint (create item)
- [x] Test POST with missing fields (validation)
- [x] Test POST with invalid category
- [x] Test POST with invalid type
- [x] Test PUT endpoint (update item)
- [x] Test PUT with status change
- [x] Test PUT with non-existent item
- [x] Test DELETE endpoint (soft delete)
- [x] Verify soft delete behavior

### 5. Documentation
- [x] Update backend/README.md with new endpoints
- [x] Add POST/PUT/DELETE examples to test-api.md
- [x] Document validation rules
- [x] Add complete test sequences
- [x] Create Day 9 checklist

---

## 📊 Statistics

- **Files Modified**: 3 (lostFoundController.js, lostFoundRoutes.js, README.md)
- **Files Updated**: 1 (test-api.md)
- **Files Created**: 1 (DAY_9_CHECKLIST.md)
- **Total LOC Added**: ~120 lines
- **New API Endpoints**: 3 (POST, PUT, DELETE)
- **Controller Functions**: 3 new functions
- **Validation Rules**: 5+ validation checks

---

## 🔌 API Endpoints Added

### 1. Create Item
```
POST /api/lost-found
Body: {
  title: String (required, 5-100 chars),
  description: String (required, 10-500 chars),
  category: String (required, enum),
  type: String (required, 'lost' or 'found'),
  location: String (optional),
  lastSeenDate: Date (optional),
  contactInfo: String (optional),
  imageURL: String (optional),
  createdBy: ObjectId (required)
}
```

### 2. Update Item
```
PUT /api/lost-found/:id
Body: { fields to update }
Note: Cannot update createdBy field
```

### 3. Delete Item
```
DELETE /api/lost-found/:id
Note: Soft delete (sets isActive: false)
```

---

## 🧪 Testing Checklist

### Manual Testing

1. **Test Create Item**
```bash
# Get a user ID first
curl http://localhost:5000/api/test/users

# Create item
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Lost Item",
    "description": "This is a test item for API testing",
    "category": "other",
    "type": "lost",
    "location": "Test Location",
    "createdBy": "USER_ID_HERE"
  }'
```

2. **Test Validation**
```bash
# Missing required fields
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{"title": "Test"}'

# Title too short
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Lost",
    "description": "Description here",
    "category": "other",
    "type": "lost",
    "createdBy": "USER_ID"
  }'
```

3. **Test Update Item**
```bash
# Update status
curl -X PUT http://localhost:5000/api/lost-found/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "resolved"}'

# Update multiple fields
curl -X PUT http://localhost:5000/api/lost-found/ITEM_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "description": "Updated description"
  }'
```

4. **Test Delete Item**
```bash
# Soft delete
curl -X DELETE http://localhost:5000/api/lost-found/ITEM_ID

# Verify it's gone from list
curl http://localhost:5000/api/lost-found

# But can still get by ID
curl http://localhost:5000/api/lost-found/ITEM_ID
```

### Expected Results
- ✅ Can create item with valid data
- ✅ Returns 400 for missing required fields
- ✅ Returns 400 for validation errors
- ✅ Can update item fields
- ✅ Cannot update createdBy field
- ✅ Returns 404 for non-existent item
- ✅ Can soft delete item
- ✅ Deleted items filtered from lists
- ✅ User population works
- ✅ Timestamps update correctly

---

## 📝 PR Template

### Title
```
Day 9: Implement POST/PUT/DELETE API for Lost & Found Items
```

### Description
```
Implemented complete CRUD operations for Lost & Found items with POST, PUT, and DELETE endpoints.

**Changes:**
- Added createLostFound, updateLostFound, deleteLostFound controller functions
- Created POST /api/lost-found route with validation
- Created PUT /api/lost-found/:id route
- Created DELETE /api/lost-found/:id route (soft delete)
- Added field validation and error handling
- Updated documentation with examples

**Concept Achieved:** POST API used (0.5 points)

**Files Changed:**
- backend/controllers/lostFoundController.js (updated)
- backend/routes/lostFoundRoutes.js (updated)
- backend/README.md (updated)
- backend/test-api.md (updated)
- docs/DAY_9_CHECKLIST.md (new)

**Testing:**
- Tested POST endpoint with valid data
- Tested validation for required fields
- Tested validation for field lengths
- Tested validation for enums
- Tested PUT endpoint for updates
- Tested DELETE endpoint for soft delete
- Verified soft delete behavior

**API Endpoints:**
1. POST /api/lost-found - Create new item
2. PUT /api/lost-found/:id - Update item
3. DELETE /api/lost-found/:id - Soft delete item

**Validation:**
- Required fields: title, description, category, type, createdBy
- Title: 5-100 characters
- Description: 10-500 characters
- Category: 9 valid options
- Type: lost or found
- Status: open or resolved
```

### Video Proof Checklist
- [ ] Show POST endpoint creating item
- [ ] Show validation error for missing fields
- [ ] Show validation error for invalid data
- [ ] Show PUT endpoint updating item
- [ ] Show status change from open to resolved
- [ ] Show DELETE endpoint soft deleting item
- [ ] Show deleted item not in list
- [ ] Show deleted item still accessible by ID

---

## 🎯 Concept Mapping

**Concept**: POST API used  
**Points**: 0.5  
**Evidence**: 
- POST endpoint implemented and tested
- Creates new items in database
- Validation working correctly
- Returns proper responses
- User population working

**Bonus**: Also implemented PUT and DELETE for complete CRUD

**Total Score After Day 9**: 3.5/14 points

---

## 🔍 Code Quality

### Validation
- Required field validation at route level
- Mongoose schema validation for data types
- Enum validation for category, type, status
- Length validation for title and description
- Proper error messages

### Error Handling
- Try-catch blocks in all functions
- Proper HTTP status codes (200, 201, 400, 404)
- Descriptive error messages
- Consistent response format

### Security Considerations
- Soft delete (preserves data)
- Cannot update createdBy field
- Input validation prevents bad data
- Note: Authentication needed (Day 10+)

---

## 🚀 Next Steps (Day 10)

- Implement JWT authentication
- Create auth middleware
- Protect routes (POST, PUT, DELETE)
- Add owner-only authorization for updates/deletes

---

## 📈 Progress Summary

**Days Completed**: 9/30  
**Backend Progress**: 
- ✅ Database setup (Day 6)
- ✅ User CRUD (Day 7)
- ✅ Lost & Found GET API (Day 8)
- ✅ Lost & Found POST/PUT/DELETE API (Day 9)
- ⏭️ Authentication (Day 10)

**Points Earned**: 3.5/14
- Repository setup: 0.5
- Low-fid design: 0.5
- Hi-fid design: 0.5
- Database schema: 0.5
- Database R/W: 0.5
- GET API: 0.5
- POST API: 0.5

---

**Completed**: January 16, 2026  
**Time Spent**: ~1.5 hours  
**Status**: ✅ Ready for PR
