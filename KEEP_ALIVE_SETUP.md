# 24/7 Uptime Setup Guide

This guide will help you keep your KampusKart website online 24/7, even on free hosting tiers.

## 🎯 Why This Matters

Free hosting services (like Render.com free tier) automatically spin down your server after **15 minutes of inactivity** to save resources. This means:
- First request after inactivity takes 30-60 seconds (cold start)
- Users experience delays
- Real-time features may disconnect

## ✅ Solution Overview

We use a **two-pronged approach**:

1. **Internal Keep-Alive** (Already implemented)
   - Pings your server every 14 minutes
   - Only works when server is already running
   - Prevents sleep during active periods

2. **External Monitoring** (YOU NEED TO SET THIS UP)
   - External service pings your server from outside
   - Wakes up server if it goes to sleep
   - Provides true 24/7 uptime

---

## 🚀 Step 1: Internal Keep-Alive (Already Done ✅)

The internal keep-alive service is already configured and will:
- Ping `/api/health` every 14 minutes
- Start automatically in production
- Log all ping attempts

**To verify it's working:**
```bash
cd backend
npm run test-keep-alive
```

---

## 🌐 Step 2: Set Up External Monitoring (REQUIRED)

### Option A: UptimeRobot (Recommended - FREE)

**Why UptimeRobot?**
- ✅ Completely free
- ✅ Monitors every 5 minutes
- ✅ 50 monitors free
- ✅ Email/SMS alerts
- ✅ Easy setup

**Setup Steps:**

1. **Sign up at [UptimeRobot.com](https://uptimerobot.com)**
   - Free account is sufficient

2. **Add a New Monitor:**
   - Click "Add New Monitor"
   - Monitor Type: **HTTP(s)**
   - Friendly Name: `KampusKart Backend`
   - URL: `https://s72-gaurav-capstone.onrender.com/api/health`
   - Monitoring Interval: **5 minutes** (minimum)
   - Alert Contacts: Add your email

3. **Save and Activate**
   - Your monitor will start pinging immediately
   - Server will stay awake 24/7!

**Monitor URL Format:**
```
https://YOUR-RENDER-URL.onrender.com/api/health
```

---

### Option B: Better Uptime (Alternative - FREE)

1. **Sign up at [BetterUptime.com](https://betteruptime.com)**
2. **Add Monitor:**
   - URL: Your server's `/api/health` endpoint
   - Check interval: 5 minutes
3. **Done!**

---

### Option C: Pingdom (Alternative - FREE)

1. **Sign up at [Pingdom.com](https://pingdom.com)**
2. **Add Check:**
   - Type: HTTP
   - URL: Your server's `/api/health` endpoint
   - Interval: 5 minutes (free tier limit)
3. **Save**

---

## 🔧 Step 3: Environment Variables

Make sure these are set in your Render.com dashboard:

```env
NODE_ENV=production
RENDER_EXTERNAL_URL=https://s72-gaurav-capstone.onrender.com
ENABLE_KEEP_ALIVE=true  # Optional: Force enable keep-alive
```

---

## 📊 Step 4: Verify It's Working

### Check Internal Keep-Alive Logs:
```bash
# View Render.com logs
# You should see messages like:
# ✅ Keep-alive ping #1 successful
```

### Check External Monitor:
1. Log into your UptimeRobot dashboard
2. Verify monitor shows "UP" status
3. Check that it's pinging every 5 minutes

### Test Health Endpoint:
```bash
curl https://s72-gaurav-capstone.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

---

## 🎯 How It Works Together

```
┌─────────────────────────────────────────┐
│  External Monitor (UptimeRobot)        │
│  Pings every 5 minutes                  │
│  └─> Wakes server if sleeping          │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│  Your Server (Render.com)               │
│  ┌───────────────────────────────────┐  │
│  │ Internal Keep-Alive               │  │
│  │ Pings every 14 minutes            │  │
│  │ └─> Prevents sleep during active  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Timeline:**
- **0:00** - External monitor pings (wakes server if needed)
- **0:14** - Internal keep-alive pings
- **0:28** - Internal keep-alive pings
- **0:42** - Internal keep-alive pings
- **5:00** - External monitor pings again
- **Repeat...**

This ensures your server **never sleeps**!

---

## 🚨 Troubleshooting

### Server Still Sleeping?

1. **Check External Monitor:**
   - Is it actually pinging? (Check UptimeRobot dashboard)
   - Is the URL correct?
   - Is the monitor status "UP"?

2. **Check Internal Keep-Alive:**
   ```bash
   # Check Render.com logs for keep-alive messages
   # Should see pings every 14 minutes
   ```

3. **Verify Environment Variables:**
   - `NODE_ENV=production` must be set
   - `RENDER_EXTERNAL_URL` should be your server URL

4. **Test Health Endpoint:**
   ```bash
   curl https://YOUR-URL.onrender.com/api/health
   ```

### Cold Start Still Happening?

- **Normal:** First request after 15+ min inactivity may take 30-60 seconds
- **Solution:** External monitor pings every 5 minutes, so this shouldn't happen
- **If it does:** Check that external monitor is actually running

---

## 📈 Monitoring & Alerts

### Set Up Alerts:

1. **UptimeRobot:**
   - Go to Alert Contacts
   - Add your email/phone
   - Enable alerts for downtime

2. **Get Notified When:**
   - Server goes down
   - Server takes too long to respond
   - Health check fails

---

## 💰 Cost

**Total Cost: $0 (FREE)**

- Internal Keep-Alive: Free (built-in)
- UptimeRobot: Free (50 monitors)
- Render.com: Free tier (with limitations)

---

## ✅ Checklist

- [ ] Internal keep-alive is running (check logs)
- [ ] External monitor is set up (UptimeRobot/BetterUptime)
- [ ] Monitor is pinging every 5 minutes
- [ ] Monitor status shows "UP"
- [ ] Alerts are configured
- [ ] Health endpoint responds correctly
- [ ] Tested after 15+ minutes of inactivity

---

## 🎉 Result

Once set up, your website will:
- ✅ Stay online 24/7
- ✅ Respond instantly (no cold starts)
- ✅ Maintain real-time connections
- ✅ Provide better user experience

**Your server will never sleep again!** 🚀

---

## 📞 Support

If you encounter issues:
1. Check Render.com logs
2. Check UptimeRobot dashboard
3. Test health endpoint manually
4. Verify environment variables

---

*Last Updated: 2024*
