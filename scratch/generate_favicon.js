const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const logoPath = path.join(__dirname, '../public/Gambar/LOGOFHD.png');
  const icoPath = path.join(__dirname, '../public/favicon.ico');
  const appIconPath = path.join(__dirname, '../src/app/icon.png');

  // 1. Generate src/app/icon.png (512x512 square)
  await sharp(logoPath)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(appIconPath);
  console.log('Generated src/app/icon.png (512x512)');

  // 2. Generate multi-resolution PNG buffers (16x16, 32x32, 48x48)
  const sizes = [16, 32, 48];
  const pngBuffers = [];
  for (const size of sizes) {
    const buf = await sharp(logoPath)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push({ size, buf });
  }

  // 3. Build ICO binary buffer
  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 for icon
  header.writeUInt16LE(sizes.length, 4); // number of images

  // Directory entries: 16 bytes per image
  let offset = 6 + (16 * sizes.length);
  const dirEntries = [];
  for (const { size, buf } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    offset += buf.length;
    dirEntries.push(entry);
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers.map(p => p.buf)]);
  fs.writeFileSync(icoPath, icoBuffer);
  console.log('Generated public/favicon.ico with sizes:', sizes, 'Total size:', icoBuffer.length, 'bytes');
}

generateFavicon().catch(err => {
  console.error(err);
  process.exit(1);
});
