/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));

const iconSizes = [
  { dir: 'mipmap-mdpi', size: 48 },
  { dir: 'mipmap-hdpi', size: 72 },
  { dir: 'mipmap-xhdpi', size: 96 },
  { dir: 'mipmap-xxhdpi', size: 144 },
  { dir: 'mipmap-xxxhdpi', size: 192 },
];

const resDir = path.join(__dirname, '../android/app/src/main/res');

async function generateIcons() {
  console.log('Generating Android launcher icons from public/favicon.svg...');

  for (const { dir, size } of iconSizes) {
    const targetFolder = path.join(resDir, dir);
    if (!fs.existsSync(targetFolder)) {
      fs.mkdirSync(targetFolder, { recursive: true });
    }

    // Standard Launcher Icon
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(targetFolder, 'ic_launcher.png'));

    // Round Launcher Icon
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(targetFolder, 'ic_launcher_round.png'));

    // Foreground Launcher Icon
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(targetFolder, 'ic_launcher_foreground.png'));

    console.log(`Generated ${dir} (${size}x${size})`);
  }

  // Generate web / PWA 192 and 512 icons
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(__dirname, '../public/icon-192.png'));

  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../public/icon-512.png'));

  console.log('Successfully generated all Android and web icons!');
}

generateIcons().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
