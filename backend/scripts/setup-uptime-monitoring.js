/**
 * Setup script to help configure external uptime monitoring
 * This script provides instructions and can test your monitoring setup
 */

const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const SERVER_URL = process.env.SERVER_URL || process.env.RENDER_EXTERNAL_URL || 'https://s72-gaurav-capstone.onrender.com';

console.log('\n🌐 KampusKart Uptime Monitoring Setup\n');
console.log('=' .repeat(50));
console.log(`📍 Server URL: ${SERVER_URL}`);
console.log('=' .repeat(50));

async function testHealthEndpoint() {
  console.log('\n1️⃣ Testing health endpoint...');
  try {
    const response = await axios.get(`${SERVER_URL}/api/health`, {
      timeout: 10000
    });
    
    if (response.status === 200) {
      console.log('✅ Health endpoint is working!');
      console.log('   Response:', JSON.stringify(response.data, null, 2));
      return true;
    } else {
      console.log('❌ Health endpoint returned status:', response.status);
      return false;
    }
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.log('❌ Server appears to be sleeping or unreachable');
      console.log('   This is normal for free tier after inactivity.');
      console.log('   External monitoring will wake it up.');
    } else {
      console.log('❌ Error:', error.message);
    }
    return false;
  }
}

function displayInstructions() {
  console.log('\n2️⃣ External Monitoring Setup Instructions\n');
  console.log('To keep your server online 24/7, set up external monitoring:\n');
  
  console.log('📌 RECOMMENDED: UptimeRobot (Free)');
  console.log('   1. Go to: https://uptimerobot.com');
  console.log('   2. Sign up for free account');
  console.log('   3. Click "Add New Monitor"');
  console.log('   4. Configure:');
  console.log('      - Type: HTTP(s)');
  console.log(`      - URL: ${SERVER_URL}/api/health`);
  console.log('      - Interval: 5 minutes');
  console.log('      - Alert Contacts: Your email');
  console.log('   5. Save and activate\n');
  
  console.log('📌 Alternative: Better Uptime');
  console.log('   - Go to: https://betteruptime.com');
  console.log(`   - Monitor: ${SERVER_URL}/api/health`);
  console.log('   - Interval: 5 minutes\n');
  
  console.log('📌 Alternative: Pingdom');
  console.log('   - Go to: https://pingdom.com');
  console.log(`   - Monitor: ${SERVER_URL}/api/health`);
  console.log('   - Interval: 5 minutes\n');
  
  console.log('📖 For detailed instructions, see: KEEP_ALIVE_SETUP.md\n');
}

function displayStatus() {
  console.log('\n3️⃣ Current Status\n');
  console.log('Internal Keep-Alive:');
  console.log('   - Status: Check Render.com logs');
  console.log('   - Interval: Every 14 minutes');
  console.log('   - Purpose: Prevents sleep during active periods\n');
  
  console.log('External Monitoring:');
  console.log('   - Status: YOU NEED TO SET THIS UP');
  console.log('   - Purpose: Wakes server if it sleeps');
  console.log('   - Required: YES (for true 24/7 uptime)\n');
}

async function main() {
  const healthOk = await testHealthEndpoint();
  displayInstructions();
  displayStatus();
  
  if (healthOk) {
    console.log('✅ Your server is currently online!');
    console.log('   Set up external monitoring to keep it that way 24/7.\n');
  } else {
    console.log('⚠️  Your server may be sleeping.');
    console.log('   External monitoring will wake it up automatically.\n');
  }
  
  console.log('📋 Next Steps:');
  console.log('   1. Set up UptimeRobot (or alternative)');
  console.log('   2. Monitor the dashboard');
  console.log('   3. Test after 15+ minutes of inactivity');
  console.log('   4. Verify no cold starts occur\n');
  
  rl.close();
}

main().catch(console.error);

