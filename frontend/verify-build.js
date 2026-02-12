// Script to verify that all public assets are copied to dist folder after build
const fs = require('fs');
const path = require('path');

const publicAssets = [
  'Logo.png',
  'google-icon.svg',
  'login-side.jpg',
  'login-side3.jpg',
  'vite.svg',
  '_redirects'
];

const distPath = path.join(__dirname, 'dist');

console.log('Verifying build output...\n');

let allPresent = true;

publicAssets.forEach(asset => {
  const assetPath = path.join(distPath, asset);
  const exists = fs.existsSync(assetPath);
  
  if (exists) {
    const stats = fs.statSync(assetPath);
    console.log(`✓ ${asset} (${(stats.size / 1024).toFixed(2)} KB)`);
  } else {
    console.log(`✗ ${asset} - MISSING!`);
    allPresent = false;
  }
});

if (allPresent) {
  console.log('\n✓ All assets are present in dist folder!');
  process.exit(0);
} else {
  console.log('\n✗ Some assets are missing from dist folder!');
  process.exit(1);
}
