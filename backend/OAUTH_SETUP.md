# Google OAuth Setup Guide

Complete guide to set up Google OAuth for KampusKart.

---

## 📋 Prerequisites

- Google account
- Backend server running
- Frontend application (for callback)

---

## 🔧 Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "KampusKart"
4. Click "Create"

---

## 🔑 Step 2: Enable Google+ API

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and click "Enable"

---

## 🎫 Step 3: Create OAuth Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure OAuth consent screen first:
   - User Type: External
   - App name: KampusKart
   - User support email: your email
   - Developer contact: your email
   - Click "Save and Continue"
   - Scopes: Add `email` and `profile`
   - Test users: Add your email
   - Click "Save and Continue"

4. Create OAuth Client ID:
   - Application type: Web application
   - Name: KampusKart Web Client
   - Authorized JavaScript origins:
     - `http://localhost:5000`
     - `http://localhost:5173` (frontend)
   - Authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
   - Click "Create"

5. Copy the Client ID and Client Secret

---

## 🔐 Step 4: Configure Environment Variables

Add to your `.env` file:

```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

---

## 📦 Step 5: Install Dependencies

```bash
npm install passport passport-google-oauth20
```

---

## 🧪 Step 6: Test OAuth Flow

### Method 1: Browser Test

1. Start your backend server:
```bash
npm run dev
```

2. Open browser and navigate to:
```
http://localhost:5000/api/auth/google
```

3. You should be redirected to Google's consent screen
4. Sign in with your Google account
5. Grant permissions
6. You'll be redirected to your frontend with a token:
```
http://localhost:5173/auth/callback?token=JWT_TOKEN
```

### Method 2: Postman Test

1. Create a new GET request in Postman
2. URL: `http://localhost:5000/api/auth/google`
3. Click "Send"
4. Postman will show the Google OAuth consent page
5. Complete the OAuth flow

---

## 🔄 OAuth Flow Diagram

```
User clicks "Login with Google"
    ↓
Frontend redirects to: GET /api/auth/google
    ↓
Backend redirects to Google OAuth consent screen
    ↓
User grants permissions
    ↓
Google redirects to: GET /api/auth/google/callback?code=...
    ↓
Backend exchanges code for user profile
    ↓
Backend creates/finds user in database
    ↓
Backend generates JWT token
    ↓
Backend redirects to: {FRONTEND_URL}/auth/callback?token=JWT_TOKEN
    ↓
Frontend stores token and logs user in
```

---

## 🎯 What Happens During OAuth

1. **User Initiation**: User clicks "Login with Google" button
2. **Redirect to Google**: Backend redirects to Google OAuth
3. **User Consent**: User grants permissions (email, profile)
4. **Callback**: Google redirects back with authorization code
5. **Token Exchange**: Backend exchanges code for user profile
6. **User Lookup**: Backend checks if user exists by email
7. **User Creation/Update**: 
   - If user exists: Update googleId if needed
   - If new user: Create user with Google profile data
8. **JWT Generation**: Backend generates JWT token
9. **Frontend Redirect**: Backend redirects to frontend with token
10. **Login Complete**: Frontend stores token and user is logged in

---

## 📝 User Data from Google

Google provides:
- `id`: Google user ID
- `displayName`: Full name
- `emails[0].value`: Email address
- `photos[0].value`: Profile picture URL

We store:
- `googleId`: Google user ID
- `name`: Display name
- `email`: Email (lowercase)
- `avatar`: Profile picture URL
- `role`: Default to 'student'

---

## 🔒 Security Considerations

1. **Client Secret**: Never commit to Git, use environment variables
2. **Callback URL**: Must match exactly in Google Console
3. **HTTPS in Production**: Use HTTPS for production URLs
4. **Token Storage**: Frontend should store JWT securely
5. **Scope Limitation**: Only request necessary scopes (email, profile)

---

## 🐛 Troubleshooting

### Error: "redirect_uri_mismatch"
- Check that callback URL in .env matches Google Console
- Ensure no trailing slashes
- Check for http vs https

### Error: "invalid_client"
- Verify Client ID and Secret are correct
- Check environment variables are loaded

### Error: "access_denied"
- User denied permissions
- Check OAuth consent screen configuration

### User not created
- Check MongoDB connection
- Verify User model has googleId field
- Check passport strategy implementation

---

## 🚀 Production Deployment

When deploying to production:

1. Update Authorized JavaScript origins:
   - Add your production domain
   - Example: `https://kampuskart.com`

2. Update Authorized redirect URIs:
   - Add production callback URL
   - Example: `https://api.kampuskart.com/api/auth/google/callback`

3. Update environment variables:
```env
GOOGLE_CALLBACK_URL=https://api.kampuskart.com/api/auth/google/callback
FRONTEND_URL=https://kampuskart.com
```

4. Verify OAuth consent screen:
   - Add privacy policy URL
   - Add terms of service URL
   - Submit for verification if needed

---

## 📚 Additional Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Passport.js Documentation](http://www.passportjs.org/)
- [Passport Google OAuth20 Strategy](https://www.passportjs.org/packages/passport-google-oauth20/)

---

**Created**: Day 11 of 30-day sprint  
**Last Updated**: January 16, 2026
