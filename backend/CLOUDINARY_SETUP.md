# Cloudinary Setup Guide

Complete guide to set up Cloudinary for image uploads in KampusKart.

---

## 📋 What is Cloudinary?

Cloudinary is a cloud-based image and video management service that provides:
- Image upload and storage
- Automatic image optimization
- Image transformations (resize, crop, format conversion)
- CDN delivery for fast loading
- Free tier: 25 GB storage, 25 GB bandwidth/month

---

## 🔧 Step 1: Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Click "Sign Up for Free"
3. Fill in your details or sign up with Google/GitHub
4. Verify your email address
5. Complete the onboarding

---

## 🔑 Step 2: Get API Credentials

1. After logging in, you'll see your Dashboard
2. Find the "Account Details" section
3. You'll see three important values:
   - **Cloud Name**: Your unique cloud identifier
   - **API Key**: Your API key
   - **API Secret**: Your API secret (click "eye" icon to reveal)

4. Copy these values - you'll need them for configuration

---

## 🔐 Step 3: Configure Environment Variables

Add to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=kampuskart-demo
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

---

## 📦 Step 4: Install Dependencies

```bash
npm install cloudinary multer streamifier
```

**Dependencies:**
- `cloudinary`: Cloudinary SDK for Node.js
- `multer`: Middleware for handling multipart/form-data (file uploads)
- `streamifier`: Convert buffer to stream for Cloudinary upload

---

## 🧪 Step 5: Test Image Upload

### Using curl

```bash
# Get authentication token first
TOKEN="your_jwt_token_here"

# Upload image
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer $TOKEN" \
  -F "image=@/path/to/your/image.jpg"
```

### Using Postman

1. Create new POST request
2. URL: `http://localhost:5000/api/upload`
3. Headers:
   - `Authorization`: `Bearer YOUR_TOKEN`
4. Body:
   - Select "form-data"
   - Key: `image` (change type to "File")
   - Value: Select your image file
5. Click "Send"

### Expected Response

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/kampuskart/lost-found/abc123.jpg",
    "publicId": "kampuskart/lost-found/abc123",
    "width": 800,
    "height": 600,
    "format": "jpg",
    "size": 245678
  }
}
```

---

## 🖼️ Image Upload Flow

```
User selects image file
    ↓
Frontend sends multipart/form-data to POST /api/upload
    ↓
Multer middleware validates file (type, size)
    ↓
File stored in memory as buffer
    ↓
Controller converts buffer to stream
    ↓
Stream piped to Cloudinary upload
    ↓
Cloudinary processes image:
  - Stores in kampuskart/lost-found folder
  - Resizes to max 1000x1000
  - Optimizes quality
  - Converts to best format (WebP if supported)
    ↓
Cloudinary returns secure URL and metadata
    ↓
Backend returns URL to frontend
    ↓
Frontend displays image and stores URL
```

---

## 🎨 Image Transformations

Our configuration automatically applies:

1. **Size Limit**: Max 1000x1000 pixels (maintains aspect ratio)
2. **Quality**: Auto-optimized for best quality/size ratio
3. **Format**: Auto-converted to best format (WebP for modern browsers)

### Custom Transformations

You can modify transformations in `uploadController.js`:

```javascript
transformation: [
  { width: 1000, height: 1000, crop: 'limit' }, // Max dimensions
  { quality: 'auto' }, // Auto quality
  { fetch_format: 'auto' } // Auto format
]
```

**Other options:**
- `{ width: 500, height: 500, crop: 'fill' }` - Fill exact dimensions
- `{ width: 500, height: 500, crop: 'thumb', gravity: 'face' }` - Thumbnail with face detection
- `{ effect: 'blur:300' }` - Blur effect
- `{ quality: 80 }` - Specific quality (1-100)

---

## 📁 Folder Structure

Images are organized in Cloudinary:

```
kampuskart/
└── lost-found/
    ├── image1.jpg
    ├── image2.png
    └── image3.webp
```

You can view and manage these in your Cloudinary Media Library.

---

## 🗑️ Delete Images

### Delete by Public ID

```bash
# URL encode the public ID
PUBLIC_ID="kampuskart%2Flost-found%2Fabc123"

curl -X DELETE http://localhost:5000/api/upload/$PUBLIC_ID \
  -H "Authorization: Bearer $TOKEN"
```

### In JavaScript

```javascript
// Get public ID from URL
const url = "https://res.cloudinary.com/.../kampuskart/lost-found/abc123.jpg";
const publicId = "kampuskart/lost-found/abc123";

// URL encode for API call
const encodedId = encodeURIComponent(publicId);

// Delete
fetch(`/api/upload/${encodedId}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 🔒 Security Features

1. **Authentication Required**: All upload/delete operations require JWT token
2. **File Type Validation**: Only images allowed (jpeg, jpg, png, gif, webp)
3. **File Size Limit**: Maximum 5MB per file
4. **Folder Organization**: Images stored in specific folders
5. **Secure URLs**: HTTPS URLs for all images

---

## 💰 Cloudinary Free Tier Limits

- **Storage**: 25 GB
- **Bandwidth**: 25 GB/month
- **Transformations**: 25 credits/month
- **Images**: Unlimited

**Tips to stay within limits:**
- Delete unused images
- Use transformations wisely
- Optimize images before upload
- Monitor usage in Cloudinary dashboard

---

## 🐛 Troubleshooting

### Error: "Invalid API credentials"
- Check CLOUDINARY_CLOUD_NAME, API_KEY, API_SECRET in .env
- Ensure no extra spaces in values
- Verify credentials in Cloudinary dashboard

### Error: "File too large"
- Max file size is 5MB
- Compress image before upload
- Or increase limit in `middleware/upload.js`

### Error: "Invalid file type"
- Only images allowed: jpeg, jpg, png, gif, webp
- Check file extension
- Check MIME type

### Error: "Not authorized"
- Ensure JWT token is valid
- Include token in Authorization header
- Format: `Bearer YOUR_TOKEN`

### Image not displaying
- Check URL is correct
- Verify image exists in Cloudinary Media Library
- Check CORS settings if loading from different domain

---

## 🚀 Production Considerations

### 1. Environment Variables
Ensure all Cloudinary credentials are set in production environment.

### 2. CORS Configuration
If frontend is on different domain, configure CORS in Cloudinary:
- Go to Settings → Security
- Add your frontend domain to "Allowed fetch domains"

### 3. Signed Uploads (Optional)
For extra security, use signed uploads:
```javascript
{
  folder: 'kampuskart/lost-found',
  resource_type: 'image',
  signed: true,
  timestamp: Math.round(new Date().getTime() / 1000)
}
```

### 4. Webhooks (Optional)
Set up webhooks to get notified of upload events:
- Go to Settings → Webhooks
- Add notification URL
- Select events to monitor

---

## 📚 Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Node.js SDK Guide](https://cloudinary.com/documentation/node_integration)
- [Image Transformations](https://cloudinary.com/documentation/image_transformations)
- [Upload API Reference](https://cloudinary.com/documentation/image_upload_api_reference)

---

## 🎯 Usage in Lost & Found

When creating a lost/found item:

1. User selects image
2. Frontend uploads to `/api/upload`
3. Backend returns Cloudinary URL
4. Frontend includes URL in item creation:
```javascript
{
  title: "Lost Red Backpack",
  description: "...",
  category: "bags",
  type: "lost",
  imageURL: "https://res.cloudinary.com/.../abc123.jpg" // From upload
}
```

5. Item is created with image URL
6. Image displays in item details

---

**Created**: Day 12 of 30-day sprint  
**Last Updated**: January 16, 2026
