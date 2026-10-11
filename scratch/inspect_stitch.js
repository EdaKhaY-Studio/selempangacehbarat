const fs = require('fs');

function inspectHtml(filename) {
  console.log('=== ' + filename + ' ===');
  if (!fs.existsSync(filename)) {
    console.log('File not found');
    return;
  }
  const html = fs.readFileSync(filename, 'utf8');
  const sectionRegex = /<section[^>]*id=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = sectionRegex.exec(html)) !== null) {
    console.log('Found section ID:', match[1]);
  }
  
  // also check h1, h2
  const hRegex = /<(h[12])[^>]*>([\s\S]*?)<\/\1>/gi;
  let hMatch;
  while ((hMatch = hRegex.exec(html)) !== null) {
    const text = hMatch[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (text.length > 0 && text.length < 100) {
      console.log(`  ${hMatch[1]}: ${text}`);
    }
  }
}

inspectHtml('scratch/code.html');
inspectHtml('scratch/tentang_kami_stitch.html');
