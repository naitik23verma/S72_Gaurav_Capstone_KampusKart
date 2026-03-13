const axios = require('axios');
const cron = require('node-cron');

/**
 * Keep-alive service to prevent Render.com from spinning down the server
 * This pings the server's health endpoint every 14 minutes (Render free tier spins down after 15 min inactivity)
 * 
 * IMPORTANT: This internal keep-alive only works when the server is already running.
 * For true 24/7 uptime, you MUST also set up external monitoring services like:
 * - UptimeRobot (https://uptimerobot.com) - Free, monitors every 5 minutes
 * - Pingdom (https://pingdom.com) - Free tier available
 * - Better Uptime (https://betteruptime.com) - Free tier available
 * 
 * These external services will wake up your server if it goes to sleep.
 */

const KEEP_ALIVE_INTERVAL = 14 * 60 * 1000; // 14 minutes (before Render's 15 min timeout)
const SERVER_URL = process.env.RENDER_EXTERNAL_URL || 
                   process.env.SERVER_URL || 
                   'https://s72-gaurav-capstone.onrender.com';

let keepAliveInterval = null;
let cronJob = null;
let pingCount = 0;
let successCount = 0;
let failCount = 0;

/**
 * Ping the server health endpoint
 */
const pingServer = async () => {
  pingCount++;
  const timestamp = new Date().toISOString();
  
  try {
    const response = await axios.get(`${SERVER_URL}/api/health`, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'KampusKart-KeepAlive/1.0',
        'X-Keep-Alive': 'true'
      }
    });
    
    if (response.status === 200) {
      successCount++;
      console.log(`✅ [${timestamp}] Keep-alive ping #${pingCount} successful (${successCount} success, ${failCount} failed)`);
      return true;
    } else {
      failCount++;
      console.warn(`⚠️  [${timestamp}] Keep-alive ping #${pingCount} returned status ${response.status}`);
      return false;
    }
  } catch (error) {
    failCount++;
    const errorMsg = error.code || error.message;
    console.error(`❌ [${timestamp}] Keep-alive ping #${pingCount} failed: ${errorMsg}`);
    
    // If server is sleeping, log helpful message
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.warn('   ⚠️  Server appears to be sleeping. External monitoring service will wake it up.');
    }
    
    return false;
  }
};

/**
 * Start the keep-alive service
 * Uses both setInterval (for immediate pings) and cron (for scheduled pings)
 */
const startKeepAlive = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isRender = process.env.RENDER || process.env.RENDER_EXTERNAL_URL;
  const forceEnable = process.env.ENABLE_KEEP_ALIVE === 'true';
  
  // Enable if in production on Render, or if explicitly enabled
  if ((isProduction && isRender) || forceEnable) {
    console.log('🔄 Starting keep-alive service...');
    console.log(`📍 Server URL: ${SERVER_URL}`);
    console.log(`⏰ Ping interval: ${KEEP_ALIVE_INTERVAL / 1000 / 60} minutes`);
    
    // Ping immediately
    pingServer();
    
    // Use setInterval for regular pings
    keepAliveInterval = setInterval(() => {
      pingServer();
    }, KEEP_ALIVE_INTERVAL);
    
    console.log(`✅ Keep-alive service started`);
    console.log(`   - setInterval: Every ${KEEP_ALIVE_INTERVAL / 1000 / 60} minutes`);
    console.log(`\n📌 IMPORTANT: For true 24/7 uptime, set up external monitoring:`);
    console.log(`   - UptimeRobot: https://uptimerobot.com (Free, 5-min intervals)`);
    console.log(`   - Monitor URL: ${SERVER_URL}/api/health`);
    console.log(`   - See KEEP_ALIVE_SETUP.md for detailed instructions\n`);
  } else {
    console.log('ℹ️  Keep-alive service disabled');
    console.log('   Set ENABLE_KEEP_ALIVE=true to force enable');
    console.log('   Or ensure NODE_ENV=production and RENDER env var is set');
  }
};

/**
 * Stop the keep-alive service
 */
const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
  }
  
  if (cronJob) {
    cronJob.stop();
    cronJob = null;
  }
  
  console.log('🛑 Keep-alive service stopped');
  console.log(`   Total pings: ${pingCount} (${successCount} success, ${failCount} failed)`);
};

/**
 * Get keep-alive statistics
 */
const getStats = () => {
  return {
    pingCount,
    successCount,
    failCount,
    successRate: pingCount > 0 ? ((successCount / pingCount) * 100).toFixed(2) + '%' : '0%',
    serverUrl: SERVER_URL,
    isRunning: !!(keepAliveInterval || cronJob)
  };
};

// Handle graceful shutdown
process.on('SIGTERM', () => {
  stopKeepAlive();
  process.exit(0);
});

process.on('SIGINT', () => {
  stopKeepAlive();
  process.exit(0);
});

module.exports = {
  startKeepAlive,
  stopKeepAlive,
  pingServer,
  getStats
};

