/**
 * Test script for keep-alive functionality
 * Run with: node scripts/test-keep-alive.js
 */

const axios = require('axios');

const SERVER_URL = process.env.SERVER_URL || 'https://s72-gaurav-capstone.onrender.com';

async function testKeepAlive() {
  console.log('🧪 Testing keep-alive functionality...\n');
  console.log(`📍 Server URL: ${SERVER_URL}\n`);

  try {
    // Test health endpoint
    console.log('1️⃣ Testing /api/health endpoint...');
    const healthResponse = await axios.get(`${SERVER_URL}/api/health`, {
      timeout: 10000,
    });
    
    if (healthResponse.status === 200) {
      console.log('✅ Health check passed!');
      console.log('   Response:', JSON.stringify(healthResponse.data, null, 2));
    } else {
      console.log('❌ Health check failed with status:', healthResponse.status);
    }

    console.log('\n2️⃣ Testing /api/server-status endpoint...');
    const statusResponse = await axios.get(`${SERVER_URL}/api/server-status`, {
      timeout: 10000,
    });
    
    if (statusResponse.status === 200) {
      console.log('✅ Server status check passed!');
      console.log('   Response:', JSON.stringify(statusResponse.data, null, 2));
    } else {
      console.log('❌ Server status check failed with status:', statusResponse.status);
    }

    console.log('\n🎉 All tests passed! Server is awake and responding.');
    
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.log('❌ Server appears to be sleeping (cold start).');
      console.log('   This is normal for Render free tier after inactivity.');
      console.log('   The server will wake up in 30-60 seconds.');
    } else if (error.response) {
      console.log('❌ Server responded with error:', error.response.status);
      console.log('   Message:', error.response.data);
    } else {
      console.log('❌ Error:', error.message);
    }
    process.exit(1);
  }
}

// Run the test
testKeepAlive();

