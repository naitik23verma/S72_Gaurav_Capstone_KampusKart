import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

console.log('\n========================================');
console.log('Copying public assets to dist folder...');
console.log('========================================\n');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const distDir = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('ERROR: dist folder does not exist!');
  console.error('Please run "npm run build" first.');
  process.exit(1);
}

// Files to copy
const files = [
  'Logo.png',
  'google-icon.svg',
  'login-side.jpg',
  'login-side3.jpg',
  'vite.svg',
  '_redirects'
];

// Copy images subdirectory
const imagesDir = path.join(publicDir, 'images');
const distImagesDir = path.join(distDir, 'images');

let successCount = 0;
let failCount = 0;

// Copy individual files
files.forEach(file => {
  const src = path.join(publicDir, file);
  const dest = path.join(distDir, file);
  
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ Copied ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
      successCount++;
    } else {
      console.log(`⚠ Warning: ${file} not found in public folder`);
      failCount++;
    }
  } catch (error) {
    console.error(`✗ Error copying ${file}:`, error.message);
    failCount++;
  }
});

// Copy images directory
if (fs.existsSync(imagesDir)) {
  if (!fs.existsSync(distImagesDir)) {
    fs.mkdirSync(distImagesDir, { recursive: true });
  }
  
  const imageFiles = fs.readdirSync(imagesDir);
  imageFiles.forEach(file => {
    const src = path.join(imagesDir, file);
    const dest = path.join(distImagesDir, file);
    
    try {
      fs.copyFileSync(src, dest);
      const stats = fs.statSync(dest);
      console.log(`✓ Copied images/${file} (${(stats.size / 1024).toFixed(2)} KB)`);
      successCount++;
    } catch (error) {
      console.error(`✗ Error copying images/${file}:`, error.message);
      failCount++;
    }
  });
}

console.log('\n========================================');
console.log(`Copy complete: ${successCount} succeeded, ${failCount} failed`);
console.log('========================================\n');

if (failCount > 0) {
  process.exit(1);
}
