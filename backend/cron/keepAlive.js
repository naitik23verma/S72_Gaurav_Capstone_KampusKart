const axios = require('axios');

/**
 * Keep-alive service to prevent Render.com from spinning down the server
 * This pings the server's health endpoint every 5 minutes
 */

const KEEP_ALIVE_INTERVAL = 5 * 60 * 1000; // 5 minutes
const SERVER_URL = process.env.RENDER_EXTERNAL_URL || 
                   process.env.SERVER_URL || 
                   'https://s72-gaurav-capstone.onrender.com';

let keepAliveInterval = null;

/**
 * Ping the server health endpoint
 */
const pingServer = async () => {
  try {
    const response = await axios.get(`${SERVER_URL}/api/health`, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'KampusKart-KeepAlive/1.0'
      }
    });
    
    if (response.status === 200) {
      console.log(`✅ Keep-alive ping successful at ${new Date().toISOString()}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Keep-alive ping failed:`, error.message);
    return false;
  }
};

/**
 * Start the keep-alive service
 */
const startKeepAlive = () => {
  // Only start if we're in production and on Render
  if (process.env.NODE_ENV === 'production' && process.env.RENDER) {
    console.log('🔄 Starting keep-alive service...');
    console.log(`📍 Server URL: ${SERVER_URL}`);
    
    // Ping immediately
    pingServer();
    
    // Then ping every 5 minutes
    keepAliveInterval = setInterval(() => {
      pingServer();
    }, KEEP_ALIVE_INTERVAL);
    
    console.log(`✅ Keep-alive service started (pinging every ${KEEP_ALIVE_INTERVAL / 1000 / 60} minutes)`);
  } else {
    console.log('ℹ️  Keep-alive service disabled (not in production or not on Render)');
  }
};

/**
 * Stop the keep-alive service
 */
const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log('🛑 Keep-alive service stopped');
  }
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
  pingServer
};

