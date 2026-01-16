# KampusKart API Documentation

## 📚 Overview

Complete API documentation for the KampusKart backend service. This API provides endpoints for user authentication, lost & found item management, and image uploads.

**Base URL (Local)**: `http://localhost:5000/api`  
**Base URL (Production)**: `https://kampuskart-backend.onrender.com/api`

---

## 🔐 Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Token Expiration
- Default: 7 days
- Refresh: Login again to get a new token

---

## 📋 Table of Contents

1. [Health Check](#health-check)
2. [Authentication](#authentication-endpoints)
3. [Lost & Found Items](#lost--found-endpoints)
4. [Image Upload](#upload-endpoints)
5. [Error Handling](#error-handling)
6. [Rate Limiting](#rate-limiting)

---

## Health Check

### GET /api/health

Check if the API server is running.

**Authentication**: None

**Response**:
```json
{
  "status": "OK",
  "timestamp": "2026-01-17T10:30:00.000Z",
  "uptime": 12345.67
}
```

---

## Authentication Endpoints

### 1. Register User

**POST** `/api/auth/register`

Create a new user account.

**Authentication**: None

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Fields**:
- `name` (required): User's full name
- `email` (required): Valid email address
- `password` (required): Minimum 6 characters
- `role` (optional): "student" or "admin" (default: "student")

**Success Response** (201):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "6789abcd1234567890abcdef",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "createdAt": "2026-01-17T10:30:00.000Z"
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "User already exists"
}
```

---

### 2. Login User

**POST** `/api/auth/login`

Authenticate user and receive JWT token.

**Authentication**: None

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "6789abcd1234567890abcdef",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Error Response** (401):
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Get Current User

**GET** `/api/auth/me`

Get the currently authenticated user's profile.

**Authentication**: Required

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "6789abcd1234567890abcdef",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2026-01-17T10:30:00.000Z"
  }
}
```

---

### 4. Update Profile

**PUT** `/api/auth/profile`

Update the authenticated user's profile.

**Authentication**: Required

**Request Body**:
```json
{
  "name": "John Updated",
  "avatar": "https://example.com/new-avatar.jpg"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "6789abcd1234567890abcdef",
    "name": "John Updated",
    "email": "john@example.com",
    "avatar": "https://example.com/new-avatar.jpg"
  }
}
```

---

### 5. Google OAuth

**GET** `/api/auth/google`

Initiate Google OAuth authentication flow.

**Authentication**: None

Redirects to Google login page.

---

### 6. Google OAuth Callback

**GET** `/api/auth/google/callback`

Google OAuth callback endpoint.

**Authentication**: None

Handled automatically by Passport.js. Redirects to frontend with token.

---

## Lost & Found Endpoints

### 1. Get All Items

**GET** `/api/lost-found`

Retrieve all lost & found items with optional filtering and pagination.

**Authentication**: None

**Query Parameters**:
- `limit` (optional): Items per page (default: 20)
- `page` (optional): Page number (default: 1)
- `category` (optional): Filter by category
- `status` (optional): Filter by status (open/resolved)
- `type` (optional): Filter by type (lost/found)
- `search` (optional): Search in title, description, location

**Example**:
```
GET /api/lost-found?limit=10&page=1&category=Electronics&status=open
```

**Success Response** (200):
```json
{
  "success": true,
  "count": 10,
  "total": 45,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "6789abcd1234567890abcdef",
      "title": "Lost iPhone 13",
      "description": "Black iPhone with blue case",
      "category": "Electronics",
      "type": "lost",
      "status": "open",
      "location": "Main Library",
      "lastSeenDate": "2026-01-17T14:30:00.000Z",
      "contactInfo": "john@example.com",
      "imageURL": "https://res.cloudinary.com/...",
      "createdBy": {
        "_id": "user123",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2026-01-17T15:00:00.000Z",
      "updatedAt": "2026-01-17T15:00:00.000Z"
    }
  ]
}
```

**Categories**:
- Electronics
- Clothing
- Books
- Keys
- Accessories
- Documents
- Sports
- Other

---

### 2. Get Item by ID

**GET** `/api/lost-found/:id`

Retrieve a specific item by its ID.

**Authentication**: None

**URL Parameters**:
- `id`: MongoDB ObjectId

**Example**:
```
GET /api/lost-found/6789abcd1234567890abcdef
```

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "_id": "6789abcd1234567890abcdef",
    "title": "Lost iPhone 13",
    "description": "Black iPhone with blue case. Lost near library.",
    "category": "Electronics",
    "type": "lost",
    "status": "open",
    "location": "Main Library, 2nd Floor",
    "lastSeenDate": "2026-01-17T14:30:00.000Z",
    "contactInfo": "john@example.com",
    "imageURL": "https://res.cloudinary.com/...",
    "createdBy": {
      "_id": "user123",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg"
    },
    "createdAt": "2026-01-17T15:00:00.000Z",
    "updatedAt": "2026-01-17T15:00:00.000Z"
  }
}
```

**Error Response** (404):
```json
{
  "success": false,
  "message": "Item not found"
}
```

---

### 3. Create Item

**POST** `/api/lost-found`

Create a new lost or found item report.

**Authentication**: Required

**Request Body**:
```json
{
  "title": "Lost iPhone 13",
  "description": "Black iPhone 13 with blue case. Lost near library.",
  "category": "Electronics",
  "type": "lost",
  "location": "Main Library, 2nd Floor",
  "lastSeenDate": "2026-01-17T14:30:00Z",
  "contactInfo": "john@example.com",
  "imageURL": "https://res.cloudinary.com/example/image.jpg"
}
```

**Fields**:
- `title` (required): Item title (max 100 chars)
- `description` (required): Detailed description
- `category` (required): Item category
- `type` (required): "lost" or "found"
- `location` (optional): Where item was lost/found
- `lastSeenDate` (optional): ISO 8601 date string
- `contactInfo` (optional): Contact information
- `imageURL` (optional): Cloudinary image URL

**Success Response** (201):
```json
{
  "success": true,
  "message": "Item created successfully",
  "data": {
    "_id": "6789abcd1234567890abcdef",
    "title": "Lost iPhone 13",
    "description": "Black iPhone 13 with blue case",
    "category": "Electronics",
    "type": "lost",
    "status": "open",
    "createdBy": "user123",
    "createdAt": "2026-01-17T15:00:00.000Z"
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "Please provide all required fields: title, description, category, type"
}
```

---

### 4. Update Item

**PUT** `/api/lost-found/:id`

Update an existing item. Only the item owner can update.

**Authentication**: Required

**URL Parameters**:
- `id`: MongoDB ObjectId

**Request Body** (partial update supported):
```json
{
  "status": "resolved",
  "description": "Updated description - item has been found!"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Item updated successfully",
  "data": {
    "_id": "6789abcd1234567890abcdef",
    "title": "Lost iPhone 13",
    "status": "resolved",
    "description": "Updated description - item has been found!",
    "updatedAt": "2026-01-17T16:00:00.000Z"
  }
}
```

**Error Response** (403):
```json
{
  "success": false,
  "message": "Not authorized to update this item"
}
```

---

### 5. Delete Item

**DELETE** `/api/lost-found/:id`

Delete an item (soft delete). Only the item owner can delete.

**Authentication**: Required

**URL Parameters**:
- `id`: MongoDB ObjectId

**Success Response** (200):
```json
{
  "success": true,
  "message": "Item deleted successfully",
  "data": {
    "_id": "6789abcd1234567890abcdef",
    "title": "Lost iPhone 13",
    "isDeleted": true
  }
}
```

**Error Response** (403):
```json
{
  "success": false,
  "message": "Not authorized to delete this item"
}
```

---

### 6. Get Recent Items

**GET** `/api/lost-found/recent`

Get the most recently created items.

**Authentication**: None

**Query Parameters**:
- `limit` (optional): Number of items (default: 10)

**Example**:
```
GET /api/lost-found/recent?limit=5
```

**Success Response** (200):
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "6789abcd1234567890abcdef",
      "title": "Lost iPhone 13",
      "category": "Electronics",
      "type": "lost",
      "createdAt": "2026-01-17T15:00:00.000Z"
    }
  ]
}
```

---

### 7. Get Statistics

**GET** `/api/lost-found/statistics`

Get overall statistics for lost & found items.

**Authentication**: None

**Success Response** (200):
```json
{
  "success": true,
  "data": {
    "totalItems": 150,
    "lostItems": 85,
    "foundItems": 65,
    "openItems": 120,
    "resolvedItems": 30,
    "byCategory": {
      "Electronics": 45,
      "Clothing": 30,
      "Books": 25,
      "Keys": 20,
      "Accessories": 15,
      "Documents": 10,
      "Sports": 3,
      "Other": 2
    }
  }
}
```

---

### 8. Get Items by Category

**GET** `/api/lost-found/category/:category`

Get items filtered by category.

**Authentication**: None

**URL Parameters**:
- `category`: Category name

**Query Parameters**:
- `limit` (optional): Number of items (default: 10)

**Example**:
```
GET /api/lost-found/category/Electronics?limit=5
```

---

### 9. Get Items by Status

**GET** `/api/lost-found/status/:status`

Get items filtered by status.

**Authentication**: None

**URL Parameters**:
- `status`: "open" or "resolved"

**Query Parameters**:
- `limit` (optional): Number of items (default: 10)

**Example**:
```
GET /api/lost-found/status/open?limit=20
```

---

### 10. Get Items by User

**GET** `/api/lost-found/user/:userId`

Get items created by a specific user.

**Authentication**: None (should be protected in production)

**URL Parameters**:
- `userId`: User's MongoDB ObjectId

**Query Parameters**:
- `limit` (optional): Number of items (default: 10)

**Example**:
```
GET /api/lost-found/user/6789abcd1234567890abcdef
```

---

## Upload Endpoints

### 1. Upload Image

**POST** `/api/upload`

Upload an image to Cloudinary.

**Authentication**: Required

**Content-Type**: `multipart/form-data`

**Request Body**:
- `image` (file): Image file

**Supported Formats**: JPEG, PNG, GIF, WebP  
**Max Size**: 10MB

**Success Response** (200):
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/kampuskart/image/upload/v1234567890/kampuskart/abc123.jpg",
    "publicId": "kampuskart/abc123",
    "format": "jpg",
    "width": 1920,
    "height": 1080
  }
}
```

**Error Response** (400):
```json
{
  "success": false,
  "message": "No image file provided"
}
```

**Usage Example** (JavaScript):
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

---

### 2. Delete Image

**DELETE** `/api/upload/:publicId`

Delete an image from Cloudinary.

**Authentication**: Required

**URL Parameters**:
- `publicId`: Cloudinary public ID (URL encoded)

**Example**:
```
DELETE /api/upload/kampuskart%2Fabc123
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

---

## Error Handling

### Standard Error Response

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not authenticated)
- `403` - Forbidden (not authorized)
- `404` - Not Found
- `500` - Internal Server Error

### Common Errors

**401 Unauthorized**:
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

**404 Not Found**:
```json
{
  "success": false,
  "message": "Route not found"
}
```

**500 Internal Server Error**:
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. In production, consider:
- 100 requests per 15 minutes per IP
- 1000 requests per hour per authenticated user

---

## CORS

CORS is enabled for:
- Local development: `http://localhost:5173`
- Production: Configured via `FRONTEND_URL` environment variable

---

## Testing the API

### Using Bruno

1. Install Bruno from [usebruno.com](https://www.usebruno.com/)
2. Open the `bruno-collection` folder
3. Select environment (Local or Production)
4. Run requests

### Using cURL

**Register**:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Items**:
```bash
curl http://localhost:5000/api/lost-found?limit=10
```

**Create Item** (with auth):
```bash
curl -X POST http://localhost:5000/api/lost-found \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Lost Phone","description":"Black iPhone","category":"Electronics","type":"lost"}'
```

---

## Postman Collection

A Postman collection is also available. Import `postman-collection.json` into Postman.

---

## Support

For issues or questions:
- GitHub Issues: [Repository URL]
- Email: support@kampuskart.com

---

**Last Updated**: January 17, 2026  
**API Version**: 1.0.0  
**Status**: ✅ Production Ready
