import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n========================================');
console.log('Verifying assets in dist folder...');
console.log('========================================\n');

const distDir = path.join(__dirname, 'dist');

// Critical assets that must exist
const criticalAssets = [
  'Logo.png',
  'google-icon.svg',
  'login-side.jpg',
  'login-side3.jpg',
  'vite.svg',
  '_redirects',
  'index.html'
];

let allPresent = true;

criticalAssets.forEach(asset => {
  const assetPath = path.join(distDir, asset);
  const exists = fs.existsSync(assetPath);
  
  if (exists) {
    const stats = fs.statSync(assetPath);
    console.log(`✓ ${asset} (${(stats.size / 1024).toFixed(2)} KB)`);
  } else {
    console.error(`✗ MISSING: ${asset}`);
    allPresent = false;
  }
});

// Check images directory
const imagesDir = path.join(distDir, 'images');
if (fs.existsSync(imagesDir)) {
  const imageFiles = fs.readdirSync(imagesDir);
  console.log(`\n✓ images/ directory (${imageFiles.length} files)`);
  imageFiles.forEach(file => {
    console.log(`  - ${file}`);
  });
} else {
  console.error('\n✗ MISSING: images/ directory');
  allPresent = false;
}

console.log('\n========================================');
if (allPresent) {
  console.log('✅ All assets verified successfully!');
  console.log('========================================\n');
  process.exit(0);
} else {
  console.error('❌ Some assets are missing!');
  console.log('========================================\n');
  process.exit(1);
}
