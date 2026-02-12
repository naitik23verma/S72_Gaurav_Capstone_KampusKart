# Deployment Checklist for Image Loading Issues

## Pre-Deployment Steps

### 1. Verify All Images Exist
Run these commands to verify images are in the public folder:

```bash
cd S72_Gaurav_Capstone_KampusKart/frontend
ls -la public/Logo.png
ls -la public/google-icon.svg
ls -la public/login-side.jpg
```

### 2. Clean Build
```bash
# Remove old build artifacts
rm -rf dist
rm -rf node_modules/.vite

# Rebuild
npm run build
```

### 3. Verify Build Output
```bash
# Run verification script
npm run verify-build

# Manually check dist folder
ls -la dist/Logo.png
ls -la dist/google-icon.svg
ls -la dist/login-side.jpg
```

### 4. Test Locally
```bash
npm run preview
```
Open http://localhost:4173 and verify:
- Logo appears in header
- Favicon appears in browser tab
- Login page side image loads
- Google icon appears on sign-in button

## Deployment to Netlify

### Option 1: Git Push (Recommended)
```bash
git add .
git commit -m "Fix: Update Vite config and Netlify settings for image loading"
git push origin main
```

Netlify will automatically detect the push and rebuild.

### Option 2: Manual Deploy
1. Build locally: `npm run build`
2. Go to Netlify dashboard
3. Drag and drop the `dist` folder

## Post-Deployment Verification

### 1. Check Deployment Log
- Go to Netlify dashboard → Deploys
- Click on the latest deploy
- Check for any errors in the build log
- Verify "Build complete" message

### 2. Test Live Site
Visit your deployed URL and check:
- [ ] Logo in header loads
- [ ] Favicon in browser tab loads
- [ ] Login page background image loads
- [ ] Signup page background image loads
- [ ] Google sign-in icon loads

### 3. Check Browser Console
- Open DevTools (F12)
- Go to Console tab
- Look for any 404 errors on image requests
- Check Network tab for failed image requests

## Troubleshooting

### Images Return 404
**Possible causes:**
1. Files not copied to dist during build
2. Case sensitivity issues (Logo.png vs logo.png)
3. Netlify asset optimization interfering

**Solutions:**
```bash
# Rebuild with clean cache
rm -rf dist node_modules/.vite
npm install
npm run build
npm run verify-build
```

### Images Load Locally But Not in Production
**Possible causes:**
1. Environment-specific path issues
2. Netlify caching old version
3. Base URL misconfiguration

**Solutions:**
1. Clear Netlify cache:
   - Netlify dashboard → Deploys → Trigger deploy → Clear cache and deploy site

2. Check Netlify asset optimization:
   - Site settings → Asset optimization
   - Disable "Pretty URLs" if enabled

3. Verify base URL in vite.config.ts is set to '/'

### Images Load But Are Broken/Corrupted
**Possible causes:**
1. Wrong content-type headers
2. File corruption during upload

**Solutions:**
1. Check file integrity:
   ```bash
   file public/Logo.png
   file public/login-side.jpg
   ```

2. Re-upload images if corrupted

3. Verify content-type headers in Netlify dashboard

### Favicon Not Loading
**Possible causes:**
1. Browser caching old favicon
2. Path issue in index.html

**Solutions:**
1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Verify path in index.html: `<link rel="icon" type="image/png" href="/Logo.png" />`

## Environment Variables Check

Verify these are NOT interfering with image paths:
```bash
# Check .env files
cat .env
cat .env.development
```

Make sure there's no `VITE_BASE_URL` or similar variable that might override the base path.

## Netlify Configuration

Verify `netlify.toml` has:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Common Mistakes to Avoid

1. ❌ Don't use relative paths like `./Logo.png` or `../public/Logo.png`
2. ❌ Don't import images in components (for public folder assets)
3. ❌ Don't change the base URL in vite.config.ts
4. ❌ Don't add public/ prefix in image paths (`/public/Logo.png` is wrong)
5. ✅ Do use absolute paths starting with `/` (`/Logo.png` is correct)

## Quick Fix Commands

If images still don't load, run these in order:

```bash
# 1. Clean everything
cd S72_Gaurav_Capstone_KampusKart/frontend
rm -rf dist node_modules/.vite

# 2. Verify images exist
ls -la public/*.{png,jpg,svg}

# 3. Rebuild
npm run build

# 4. Verify build
npm run verify-build

# 5. Test locally
npm run preview

# 6. If local works, clear Netlify cache and redeploy
git add .
git commit -m "Rebuild with clean cache"
git push origin main
```

## Contact Support

If issues persist after following all steps:
1. Check Netlify community forums
2. Review Vite documentation on static assets
3. Check browser console for specific error messages
4. Verify network requests in DevTools Network tab
