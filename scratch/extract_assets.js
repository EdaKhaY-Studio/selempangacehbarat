const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'tentang_kami_stitch.html'), 'utf8');

// Match all URLs
const regex = /https:\/\/[^"'\\s\)<>]+/g;
const matches = html.match(regex) || [];
const uniqueUrls = [...new Set(matches)];

const assetUrls = uniqueUrls.filter(u => 
  u.includes('googleusercontent.com') ||
  u.includes('images.unsplash.com') ||
  u.includes('.png') ||
  u.includes('.jpg') ||
  u.includes('.jpeg') ||
  u.includes('.webp') ||
  u.includes('.svg')
);

console.log('Total unique asset URLs found in HTML:', assetUrls.length);
assetUrls.forEach((u, i) => console.log(`${i + 1}: ${u}`));

// Save list to JSON
fs.writeFileSync(path.join(__dirname, 'tentang_kami_assets.json'), JSON.stringify(assetUrls, null, 2));
