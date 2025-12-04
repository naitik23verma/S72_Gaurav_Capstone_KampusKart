# 🔄 Keep-Alive Setup for 24/7 Uptime

This guide explains how to keep your KampusKart backend running 24/7 on Render.com's free tier.

## 🎯 Problem

Render.com's free tier automatically spins down services after 15 minutes of inactivity. This causes:
- Slow first request (cold start takes 30-60 seconds)
- Poor user experience
- Service unavailability

## ✅ Solution

We've implemented multiple keep-alive strategies to prevent spin-down:

### 1. **Internal Keep-Alive (Automatic)** ✅

The backend now includes an automatic keep-alive service that pings itself every 5 minutes. This is **already enabled** and will work automatically when deployed.

**How it works:**
- Runs only in production on Render
- Pings `/api/health` endpoint every 5 minutes
- Prevents the server from going to sleep

**No action needed** - this is already configured!

### 2. **External Keep-Alive Services (Recommended)**

For maximum reliability, use external services to ping your server:

#### Option A: UptimeRobot (You Already Have This!) 🎉

You're already using UptimeRobot! To make it keep your server alive:

1. Go to your UptimeRobot dashboard
2. Edit your monitor: `s72-gaurav-capstone.onrender.com`
3. Set **Monitoring Interval** to **5 minutes** (minimum)
4. This will ping your server every 5 minutes, keeping it awake

**Current Status:** Your monitor is set up at:
- URL: `https://s72-gaurav-capstone.onrender.com/health`
- This should already be keeping your server awake!

#### Option B: cron-job.org (Free)

1. Go to https://cron-job.org
2. Sign up for a free account
3. Create a new cron job:
   - **URL:** `https://s72-gaurav-capstone.onrender.com/api/health`
   - **Schedule:** Every 5 minutes (`*/5 * * * *`)
   - **Method:** GET
4. Save and activate

#### Option C: EasyCron (Free Tier Available)

1. Go to https://www.easycron.com
2. Create a free account
3. Add a new cron job:
   - **URL:** `https://s72-gaurav-capstone.onrender.com/api/health`
   - **Schedule:** Every 5 minutes
4. Save

#### Option D: GitHub Actions (Free)

Create `.github/workflows/keep-alive.yml`:

```yaml
name: Keep Alive

on:
  schedule:
    - cron: '*/5 * * * *'  # Every 5 minutes
  workflow_dispatch:

jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Server
        run: |
          curl -f https://s72-gaurav-capstone.onrender.com/api/health || exit 1
```

### 3. **Render.com Paid Plan** 💰

For guaranteed 24/7 uptime without any workarounds:
- Upgrade to Render's **Starter Plan** ($7/month)
- Services never spin down
- Better performance and reliability

## 📊 Monitoring Your Server

### Health Check Endpoints

Your server has two health check endpoints:

1. **`/api/health`** - Basic health check
   ```
   GET https://s72-gaurav-capstone.onrender.com/api/health
   ```

2. **`/api/server-status`** - Detailed server status
   ```
   GET https://s72-gaurav-capstone.onrender.com/api/server-status
   ```

### Check Server Status

You can manually check if your server is awake:

```bash
curl https://s72-gaurav-capstone.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Server is running",
  "timestamp": "2024-12-04T20:07:00.000Z",
  "uptime": 3600
}
```

## 🚀 Quick Setup Checklist

- [x] Internal keep-alive service (already configured)
- [ ] Configure UptimeRobot to ping every 5 minutes
- [ ] (Optional) Set up additional external keep-alive service
- [ ] Test that server stays awake

## 🔍 Troubleshooting

### Server Still Spinning Down?

1. **Check UptimeRobot settings:**
   - Ensure monitoring interval is 5 minutes or less
   - Verify the URL is correct: `https://s72-gaurav-capstone.onrender.com/health`

2. **Check Render logs:**
   - Go to Render dashboard → Your service → Logs
   - Look for keep-alive ping messages

3. **Verify environment variables:**
   - `NODE_ENV=production` (required for keep-alive)
   - `RENDER=true` (automatically set by Render)

4. **Test manually:**
   ```bash
   curl https://s72-gaurav-capstone.onrender.com/api/health
   ```

### Cold Start Still Happening?

- First request after spin-down takes 30-60 seconds
- This is normal for Render free tier
- Consider upgrading to paid plan for instant responses

## 📝 Notes

- **Free tier limitations:** Render free tier can still have occasional cold starts
- **Best practice:** Use multiple keep-alive services for redundancy
- **Recommended:** UptimeRobot (monitoring) + Internal keep-alive (automatic)

## 🎉 Current Status

✅ Internal keep-alive: **ENABLED**  
✅ UptimeRobot: **CONFIGURED** (set to 5-minute interval)  
✅ Health endpoints: **AVAILABLE**

Your server should now stay awake 24/7! 🚀

