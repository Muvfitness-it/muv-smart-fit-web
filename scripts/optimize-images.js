const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const srcDir = path.join(__dirname, '../src');

// Image directories to process
const imageDirs = [
  path.join(publicDir, 'images'),
  path.join(publicDir, 'lovable-uploads'),
  path.join(srcDir, 'assets')
];

// Supported formats to convert
const supportedFormats = ['.jpg', '.jpeg', '.png'];

async function convertToWebP(inputPath, outputPath, isLogo = false) {
  try {
    const sharpInstance = sharp(inputPath);
    
    if (isLogo || inputPath.includes('logo') || inputPath.includes('transparent')) {
      // Lossless for logos and transparent images
      await sharpInstance
        .webp({ lossless: true, quality: 100 })
        .toFile(outputPath);
    } else {
      // Lossy compression for photos
      await sharpInstance
        .webp({ quality: 85 })
        .toFile(outputPath);
    }
    
    console.log(`Converted: ${inputPath} -> ${outputPath}`);
  } catch (error) {
    console.error(`Error converting ${inputPath}:`, error);
  }
}

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`Directory ${dir} does not exist, skipping...`);
    return;
  }

  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    
    if (supportedFormats.includes(ext)) {
      const nameWithoutExt = path.basename(file, ext);
      const webpPath = path.join(dir, `${nameWithoutExt}.webp`);
      
      // Skip if WebP already exists
      if (fs.existsSync(webpPath)) {
        console.log(`WebP already exists for ${file}, skipping...`);
        continue;
      }
      
      const isLogo = file.toLowerCase().includes('logo') || 
                     file.toLowerCase().includes('transparent');
      
      await convertToWebP(filePath, webpPath, isLogo);
    }
  }
}

async function main() {
  console.log('Starting image optimization...');
  
  for (const dir of imageDirs) {
    console.log(`Processing directory: ${dir}`);
    await processDirectory(dir);
  }
  
  console.log('Image optimization completed!');
}

main().catch(console.error);