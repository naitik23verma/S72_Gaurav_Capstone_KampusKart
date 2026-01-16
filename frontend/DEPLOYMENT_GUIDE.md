# Frontend Deployment Guide

Complete guide to deploy KampusKart frontend to Netlify or Vercel.

**Day**: 16 of 30  
**Concept**: Frontend Deployment (0.5 points)  
**Estimated Time**: 30 minutes

---

## 🎯 Deployment Options

### Option 1: Netlify (Recommended)
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS
- ✅ Easy environment variables
- ✅ Great for React/Vite apps
- ✅ Instant rollbacks

### Option 2: Vercel
- ✅ Free tier available
- ✅ Excellent performance
- ✅ Built-in analytics
- ✅ Edge network
- ✅ Zero-config for Vite

---

## 🚀 Netlify Deployment (Step-by-Step)

### Prerequisites
- GitHub account with KampusKart repository
- Backend deployed at https://kampuskart-backend.onrender.com

### Step 1: Create Netlify Account

1. Go to https://www.netlify.com/
2. Click "Sign up" → Choose "GitHub"
3. Authorize Netlify to access your repositories

### Step 2: Import Project

1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Select your repository: `S72_Gaurav_Capstone_KampusKart`
4. Configure build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
   - **Branch**: `main`

### Step 3: Configure Environment Variables

Click "Show advanced" → "Add environment variables":

```env
VITE_API_URL=https://kampuskart-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

**Important**: Use your actual Google Client ID from backend setup.

### Step 4: Deploy

1. Click "Deploy site"
2. Wait 2-3 minutes for build to complete
3. Netlify will assign a URL like: `https://random-name-123.netlify.app`

### Step 5: Custom Domain (Optional)

1. Go to "Site settings" → "Domain management"
2. Click "Add custom domain"
3. Follow DNS configuration steps
4. Or use free subdomain: `kampuskart.netlify.app`

### Step 6: Update Backend CORS

Update your backend `.env` or Render environment variables:

```env
FRONTEND_URL=https://your-site-name.netlify.app
```

Also update Google OAuth redirect URIs:
- Add: `https://your-site-name.netlify.app/auth/callback`

### Step 7: Test Deployment

Visit your Netlify URL and test:
- [ ] Homepage loads
- [ ] Login/Register works
- [ ] Items list displays
- [ ] Create item works
- [ ] Image upload works
- [ ] OAuth login works

---

## 🔷 Vercel Deployment (Alternative)

### Step 1: Create Vercel Account

1. Go to https://vercel.com/
2. Click "Sign up" → Choose "GitHub"
3. Authorize Vercel

### Step 2: Import Project

1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Environment Variables

Add in project settings:

```env
VITE_API_URL=https://kampuskart-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build completion
3. Get URL: `https://your-project.vercel.app`

### Step 5: Update Backend

Same as Netlify - update CORS and OAuth settings.

---

## 📋 Configuration Files

### netlify.toml
Located at `frontend/netlify.toml` - configures:
- Build settings
- SPA routing redirects
- Security headers
- Cache control

### vercel.json
Located at `frontend/vercel.json` - configures:
- Build settings
- Rewrites for SPA routing
- Security headers

---

## 🔧 Build Optimization

### Vite Build Settings

The default Vite config is already optimized, but you can enhance it:

**frontend/vite.config.js**:
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          axios: ['axios']
        }
      }
    }
  }
})
```

### Environment Variables

**Production .env**:
```env
VITE_API_URL=https://kampuskart-backend.onrender.com
VITE_GOOGLE_CLIENT_ID=your_production_client_id
```

**Development .env.local**:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_dev_client_id
```

---

## 🔒 Security Checklist

- [x] HTTPS enabled (automatic on Netlify/Vercel)
- [x] Environment variables configured
- [x] No secrets in code
- [x] CORS configured on backend
- [x] Security headers set (X-Frame-Options, etc.)
- [x] OAuth redirect URIs updated
- [ ] Custom domain with SSL (optional)

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `Module not found`
```bash
# Solution: Install dependencies
npm install
```

**Error**: `VITE_API_URL is not defined`
```bash
# Solution: Add environment variable in Netlify/Vercel dashboard
```

### 404 on Routes

**Problem**: Direct navigation to `/items` returns 404

**Solution**: Ensure redirects are configured
- Netlify: Check `netlify.toml` exists
- Vercel: Check `vercel.json` exists

### API Calls Fail

**Error**: `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution**: Update backend CORS settings
```javascript
// backend/server.js
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://your-site.netlify.app'
  ],
  credentials: true
};
```

### OAuth Not Working

**Problem**: Google OAuth redirects to wrong URL

**Solution**: Update Google Cloud Console
1. Go to APIs & Services → Credentials
2. Edit OAuth 2.0 Client ID
3. Add authorized redirect URI:
   - `https://your-site.netlify.app/auth/callback`
   - `https://kampuskart-backend.onrender.com/api/auth/google/callback`

### Images Not Loading

**Problem**: Cloudinary images return 404

**Solution**: Check Cloudinary settings
- Verify API keys in backend
- Check image URLs in database
- Test upload endpoint

---

## 📊 Performance Optimization

### Lighthouse Scores Target
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

### Optimization Tips

1. **Code Splitting**: Already handled by Vite
2. **Image Optimization**: Use Cloudinary transformations
3. **Lazy Loading**: Implement for routes
4. **Caching**: Configured in netlify.toml/vercel.json
5. **Compression**: Automatic on both platforms

---

## 🔄 Continuous Deployment

### Automatic Deploys

Both Netlify and Vercel support automatic deploys:

1. **Push to main branch** → Automatic production deploy
2. **Push to feature branch** → Preview deploy (optional)
3. **Pull request** → Deploy preview with unique URL

### Deploy Previews

Enable in settings to get preview URLs for PRs:
- Test changes before merging
- Share with team for review
- Automatic cleanup after merge

---

## 📈 Monitoring

### Netlify Analytics (Optional - Paid)
- Page views
- Unique visitors
- Top pages
- Bandwidth usage

### Vercel Analytics (Free Tier)
- Real user metrics
- Core Web Vitals
- Performance insights

### Custom Monitoring

Add Google Analytics or Plausible:

```html
<!-- public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
```

---

## ✅ Post-Deployment Checklist

- [ ] Site loads at production URL
- [ ] All routes work (no 404s)
- [ ] Login/Register functional
- [ ] API calls succeed
- [ ] Images upload and display
- [ ] OAuth login works
- [ ] Mobile responsive
- [ ] HTTPS enabled
- [ ] Environment variables set
- [ ] Backend CORS updated
- [ ] Google OAuth URIs updated
- [ ] Custom domain configured (optional)
- [ ] Analytics added (optional)

---

## 🎯 Success Criteria

**Concept Point Earned**: 0.5 points

**Requirements**:
- ✅ Frontend deployed to public URL
- ✅ All features working in production
- ✅ Connected to deployed backend
- ✅ HTTPS enabled
- ✅ No console errors

---

## 📝 Update Documentation

After deployment, update:

1. **README.md**: Add production URL
2. **Backend DEPLOYMENT_GUIDE.md**: Add frontend URL
3. **GitHub Projects**: Move card to Done
4. **PR Description**: Include deployment URL

---

## 🔗 Useful Links

- [Netlify Docs](https://docs.netlify.com/)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router Deployment](https://reactrouter.com/en/main/guides/deployment)

---

## 🎬 Video Proof Checklist

Record 2-3 minute video showing:

1. **Netlify/Vercel Dashboard** (20s)
   - Show project settings
   - Show environment variables
   - Show build logs

2. **Live Site** (60s)
   - Navigate to production URL
   - Show homepage
   - Login/Register
   - Create item with image
   - View item details
   - Show responsive design

3. **Network Tab** (20s)
   - Open DevTools
   - Show API calls to backend
   - Show successful responses

4. **Backend Integration** (20s)
   - Show CORS working
   - Show OAuth working
   - Show image upload working

5. **Proof** (20s)
   - Show GitHub commit
   - Show deployment logs
   - Show production URL in browser

---

**Created**: January 17, 2026  
**Last Updated**: January 17, 2026  
**Status**: Ready for Deployment
