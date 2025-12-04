# 🚀 Quick Start: Make Your Website 24/7 Online

## ⚡ Fast Setup (5 Minutes)

### Step 1: Set Up UptimeRobot (FREE)

1. **Go to:** https://uptimerobot.com
2. **Sign up** (free account)
3. **Click "Add New Monitor"**
4. **Configure:**
   - **Type:** HTTP(s)
   - **URL:** `https://s72-gaurav-capstone.onrender.com/api/health`
   - **Interval:** 5 minutes
   - **Alert Contacts:** Your email
5. **Save**

**That's it!** Your server will now stay online 24/7.

---

## ✅ What's Already Done

- ✅ Internal keep-alive service (pings every 14 minutes)
- ✅ Health check endpoint (`/api/health`)
- ✅ Automatic startup in production

---

## 📋 What You Need to Do

**Only ONE thing:** Set up external monitoring (UptimeRobot)

**Why?** Internal keep-alive only works when the server is running. External monitoring wakes it up if it sleeps.

---

## 🧪 Test Your Setup

```bash
# Test health endpoint
curl https://s72-gaurav-capstone.onrender.com/api/health

# Test keep-alive
cd backend
npm run test-keep-alive

# Setup guide
npm run setup-uptime
```

---

## 📖 Full Documentation

See `KEEP_ALIVE_SETUP.md` for:
- Detailed setup instructions
- Alternative monitoring services
- Troubleshooting guide
- How it all works together

---

## 🎯 Result

Once UptimeRobot is set up:
- ✅ Server stays online 24/7
- ✅ No cold starts (instant responses)
- ✅ Real-time features work continuously
- ✅ Better user experience

**Total Cost: $0 (FREE)**

---

*Need help? Check KEEP_ALIVE_SETUP.md for detailed instructions.*

