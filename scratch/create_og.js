const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  const logoPath = path.join(__dirname, '../public/Gambar/LOGOFHD.png');
  const modelPath = path.join(__dirname, '../public/Gambar/male-graduate-suit-full.jpg');
  const bgPath = path.join(__dirname, '../public/Gambar/bg-1.jpg');
  const outputPath = path.join(__dirname, '../public/og-image.jpg');

  // 1. Process background: resize bg-1 to 1200x630 and add dark gradient overlay
  const bgBuffer = await sharp(bgPath)
    .resize(width, height, { fit: 'cover', position: 'center' })
    .modulate({ brightness: 0.35, saturation: 0.8 })
    .toBuffer();

  // 2. Process model image: crop and round
  const modelWidth = 420;
  const modelHeight = 570;
  const modelBuffer = await sharp(modelPath)
    .resize(modelWidth, modelHeight, { fit: 'cover', position: 'top' })
    .toBuffer();

  // 3. Process logo: resize to 110x110
  const logoBuffer = await sharp(logoPath)
    .resize(110, 110, { fit: 'contain' })
    .toBuffer();

  // 4. Create SVG overlay for typography, badges, and glow
  const svgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#090a0f" stop-opacity="0.95" />
          <stop offset="55%" stop-color="#0f172a" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0.3" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde68a" />
          <stop offset="50%" stop-color="#d4af37" />
          <stop offset="100%" stop-color="#996515" />
        </linearGradient>
      </defs>

      <!-- Gradient mask on left -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="url(#bgGrad)" />

      <!-- Top Badge -->
      <g transform="translate(70, 70)">
        <rect x="0" y="0" width="310" height="32" rx="16" fill="rgba(212, 175, 55, 0.15)" stroke="#d4af37" stroke-width="1.2" />
        <text x="15" y="21" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="12" font-weight="700" fill="#fde68a" letter-spacing="1.5">
          SELEMPANG ACEH BARAT (FHD)
        </text>
      </g>

      <!-- Main Headline -->
      <text x="70" y="165" font-family="'Georgia', 'Times New Roman', serif" font-size="44" font-weight="bold" fill="#ffffff" letter-spacing="-0.5">
        Pusat Selempang Wisuda
      </text>
      <text x="70" y="220" font-family="'Georgia', 'Times New Roman', serif" font-size="44" font-weight="bold" fill="url(#goldGrad)" letter-spacing="-0.5">
        &amp; Sewa Jas Formal Meulaboh
      </text>

      <!-- Subtitle Description -->
      <text x="70" y="275" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="17" fill="#cbd5e1" font-weight="400">
        Bordir Kilat 1 Hari Jadi • Setelan Jas Wol &amp; Sepatu Pantofel Pria
      </text>
      <text x="70" y="303" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="16" fill="#94a3b8" font-weight="400">
        Buka Setiap Hari s/d Jam 23:00 WIB • Jln Alpen Meureubo (Dekat UTU &amp; STAIN)
      </text>

      <!-- Feature Badges Row -->
      <g transform="translate(70, 355)">
        <!-- Pill 1 -->
        <rect x="0" y="0" width="180" height="42" rx="10" fill="rgba(255, 255, 255, 0.07)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
        <text x="20" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff">
          ⚡ Bordir 1 Hari Jadi
        </text>

        <!-- Pill 2 -->
        <rect x="195" y="0" width="170" height="42" rx="10" fill="rgba(255, 255, 255, 0.07)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
        <text x="215" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff">
          👔 Fitting Jas Higienis
        </text>

        <!-- Pill 3 -->
        <rect x="380" y="0" width="180" height="42" rx="10" fill="rgba(255, 255, 255, 0.07)" stroke="rgba(255, 255, 255, 0.15)" stroke-width="1" />
        <text x="400" y="26" font-family="'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff">
          ⭐ Rating 5.0 Google Maps
        </text>
      </g>

      <!-- Bottom URL Bar -->
      <g transform="translate(70, 520)">
        <line x1="0" y1="0" x2="620" y2="0" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1" />
        <text x="0" y="32" font-family="'Segoe UI', Roboto, monospace" font-size="16" font-weight="600" fill="#d4af37">
          https://selempangacehbarat.com
        </text>
        <text x="320" y="32" font-family="'Segoe UI', Roboto, sans-serif" font-size="14" fill="#94a3b8">
          Order Online via Web &amp; WhatsApp
        </text>
      </g>

      <!-- Model frame border on right -->
      <rect x="736" y="26" width="${modelWidth + 8}" height="${modelHeight + 8}" rx="24" fill="none" stroke="#d4af37" stroke-width="2" stroke-opacity="0.4" />
    </svg>
  `;

  // Create rounded model with mask
  const roundedModel = await sharp(modelBuffer)
    .composite([
      {
        input: Buffer.from(`
          <svg width="${modelWidth}" height="${modelHeight}">
            <rect x="0" y="0" width="${modelWidth}" height="${modelHeight}" rx="20" ry="20" fill="#fff" />
          </svg>
        `),
        blend: 'dest-in'
      }
    ])
    .toBuffer();

  // Combine everything
  await sharp(bgBuffer)
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0
      },
      {
        input: roundedModel,
        top: 30,
        left: 740
      },
      {
        input: logoBuffer,
        top: 400,
        left: 70
      }
    ])
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  console.log('Successfully generated:', outputPath);
}

createOgImage().catch(err => {
  console.error(err);
  process.exit(1);
});
