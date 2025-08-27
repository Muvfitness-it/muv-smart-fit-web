const fs = require('fs');
const path = require('path');

// Check current images and generate WebP conversion report
const imageDirs = [
  path.join(__dirname, 'public/images'),
  path.join(__dirname, 'public/lovable-uploads'),
  path.join(__dirname, 'src/assets')
];

let totalOriginal = 0;
let totalWebP = 0;
let report = [];

console.log('📊 Checking current image status...\n');

imageDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory ${dir} does not exist`);
    return;
  }
  
  console.log(`📁 Checking: ${dir}`);
  const files = fs.readdirSync(dir);
  
  const originalImages = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  const webpImages = files.filter(file => 
    /\.webp$/i.test(file)
  );
  
  totalOriginal += originalImages.length;
  totalWebP += webpImages.length;
  
  console.log(`   Original images: ${originalImages.length}`);
  console.log(`   WebP images: ${webpImages.length}`);
  
  report.push({
    directory: dir,
    originalCount: originalImages.length,
    webpCount: webpImages.length,
    files: {
      original: originalImages,
      webp: webpImages
    }
  });
  
  console.log('');
});

console.log('📈 SUMMARY:');
console.log(`Total original images: ${totalOriginal}`);
console.log(`Total WebP images: ${totalWebP}`);
console.log(`Conversion needed: ${totalOriginal > totalWebP ? 'YES' : 'NO'}`);

// Save detailed report
fs.writeFileSync('image-status-report.json', JSON.stringify(report, null, 2));
console.log('\n📋 Detailed report saved to image-status-report.json');