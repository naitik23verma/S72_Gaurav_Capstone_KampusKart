# Backend Deployment Guide

Complete guide to deploy KampusKart backend to production.

---

## 🎯 Deployment Options

We'll cover three popular platforms:
1. **Render** (Recommended - Free tier, easy setup)
2. **Railway** (Alternative - Free tier, simple)
3. **Heroku** (Alternative - Paid after free hours)

---

## 🚀 Option 1: Deploy to Render (Recommended)

### Why Render?
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable management
- ✅ Built-in SSL certificates
- ✅ Good performance

### Prerequisites
- GitHub account
- Render account (free)
- MongoDB Atlas database (free)

### Step 1: Prepare Your Code

1. **Ensure package.json has start script:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

2. **Add engines field to package.json:**
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

3. **Commit and push to GitHub:**
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (free tier M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `myFirstDatabase` with `kampuskart`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kampuskart?retryWrites=true&w=majority
```

### Step 3: Create Render Account

1. Go to [Render](https://render.com/)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 4: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your KampusKart repository
4. Configure:
   - **Name**: `kampuskart-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 5: Add Environment Variables

In Render dashboard, go to "Environment" tab and add:

```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/kampuskart?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_make_it_long_and_random
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-url.netlify.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://kampuskart-backend.onrender.com/api/auth/google/callback
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important Notes:**
- Generate a strong JWT_SECRET (use a password generator)
- Update GOOGLE_CALLBACK_URL with your Render URL
- Update FRONTEND_URL when you deploy frontend

### Step 6: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Start your server
3. Wait for deployment (5-10 minutes)
4. Your API will be live at: `https://kampuskart-backend.onrender.com`

### Step 7: Test Deployment

```bash
# Test health endpoint
curl https://kampuskart-backend.onrender.com/api/health

# Test root endpoint
curl https://kampuskart-backend.onrender.com/

# Expected response:
{
  "message": "Welcome to KampusKart API",
  "version": "1.0.0",
  "status": "running"
}
```

### Step 8: Update Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Edit your OAuth 2.0 Client ID
5. Add to "Authorized redirect URIs":
   - `https://kampuskart-backend.onrender.com/api/auth/google/callback`
6. Save

### Step 9: Enable Auto-Deploy

Render automatically deploys when you push to GitHub!

```bash
# Make a change
git add .
git commit -m "Update feature"
git push origin main

# Render will automatically redeploy
```

---

## 🚂 Option 2: Deploy to Railway

### Why Railway?
- ✅ Free tier with $5 credit/month
- ✅ Very simple setup
- ✅ Automatic deployments
- ✅ Good for small projects

### Step 1: Create Railway Account

1. Go to [Railway](https://railway.app/)
2. Sign up with GitHub
3. Authorize Railway

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your KampusKart repository
4. Railway will detect Node.js automatically

### Step 3: Add Environment Variables

1. Click on your service
2. Go to "Variables" tab
3. Add all environment variables (same as Render)

### Step 4: Configure

1. Go to "Settings" tab
2. Set:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
3. Click "Deploy"

### Step 5: Get URL

1. Go to "Settings" tab
2. Click "Generate Domain"
3. Your API will be at: `https://your-app.up.railway.app`

---

## 🎨 Option 3: Deploy to Heroku

### Why Heroku?
- ✅ Mature platform
- ✅ Good documentation
- ⚠️ No free tier anymore (paid plans start at $5/month)

### Step 1: Install Heroku CLI

```bash
# macOS
brew tap heroku/brew && brew install heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

### Step 2: Login

```bash
heroku login
```

### Step 3: Create App

```bash
cd backend
heroku create kampuskart-backend
```

### Step 4: Add MongoDB

```bash
# Option 1: Use MongoDB Atlas (recommended)
# Add MONGODB_URI to config vars

# Option 2: Use Heroku MongoDB addon
heroku addons:create mongolab:sandbox
```

### Step 5: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_secret
heroku config:set JWT_EXPIRE=7d
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set FRONTEND_URL=your_frontend_url
heroku config:set GOOGLE_CLIENT_ID=your_client_id
heroku config:set GOOGLE_CLIENT_SECRET=your_client_secret
heroku config:set GOOGLE_CALLBACK_URL=https://kampuskart-backend.herokuapp.com/api/auth/google/callback
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
heroku config:set CLOUDINARY_API_KEY=your_api_key
heroku config:set CLOUDINARY_API_SECRET=your_api_secret
```

### Step 6: Deploy

```bash
git push heroku main
```

### Step 7: Open App

```bash
heroku open
```

---

## 🔧 Post-Deployment Configuration

### 1. Update CORS

Ensure your CORS configuration allows your frontend domain:

```javascript
// server.js
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### 2. Update Frontend API URL

In your frontend `.env`:
```env
VITE_API_URL=https://kampuskart-backend.onrender.com
```

### 3. Test All Endpoints

```bash
API_URL="https://kampuskart-backend.onrender.com"

# Health check
curl $API_URL/api/health

# Register user
curl -X POST $API_URL/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Login
curl -X POST $API_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# Get items
curl $API_URL/api/lost-found
```

---

## 📊 Monitoring & Logs

### Render
- Dashboard → Your Service → "Logs" tab
- Real-time logs
- Can download logs

### Railway
- Dashboard → Your Service → "Deployments" → Click deployment
- View logs in real-time

### Heroku
```bash
heroku logs --tail
```

---

## 🐛 Troubleshooting

### Issue: "Application Error"
**Solution:**
- Check logs for errors
- Verify all environment variables are set
- Ensure MongoDB connection string is correct
- Check if PORT is set correctly

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Verify MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
- Check connection string format
- Ensure database user has correct permissions

### Issue: "OAuth not working"
**Solution:**
- Update Google OAuth redirect URIs with production URL
- Verify GOOGLE_CALLBACK_URL environment variable
- Check FRONTEND_URL is correct

### Issue: "Image upload failing"
**Solution:**
- Verify Cloudinary credentials
- Check if all three Cloudinary env vars are set
- Test Cloudinary connection

### Issue: "CORS errors"
**Solution:**
- Update FRONTEND_URL environment variable
- Ensure CORS is configured correctly
- Check if credentials: true is set

---

## 🔒 Security Checklist

- [ ] Strong JWT_SECRET (min 32 characters)
- [ ] MongoDB connection string uses strong password
- [ ] Environment variables not committed to Git
- [ ] CORS configured for specific frontend domain
- [ ] HTTPS enabled (automatic on Render/Railway/Heroku)
- [ ] Rate limiting enabled (optional, for production)
- [ ] MongoDB IP whitelist configured
- [ ] Google OAuth redirect URIs updated

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| **Render** | 750 hours/month | $7/month | Small to medium apps |
| **Railway** | $5 credit/month | $5/month | Small apps |
| **Heroku** | None | $5-7/month | Enterprise apps |

**Recommendation:** Start with Render's free tier.

---

## 🚀 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas database created
- [ ] Deployment platform account created
- [ ] Web service created
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] Health endpoint working
- [ ] API endpoints tested
- [ ] Google OAuth redirect URIs updated
- [ ] Frontend URL configured
- [ ] CORS working
- [ ] Logs accessible
- [ ] Monitoring setup

---

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

---

**Created**: Day 13 of 30-day sprint  
**Last Updated**: January 16, 2026
