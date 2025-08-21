const { createCanvas, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

async function generateLinkedInPNG() {
  console.log('🎨 Generating LinkedIn PNG icon...');
  
  // Create a high-resolution canvas (512x512)
  const canvas = createCanvas(512, 512);
  const ctx = canvas.getContext('2d');
  
  // Enable high-quality rendering
  ctx.antialias = 'default';
  ctx.patternQuality = 'best';
  ctx.textDrawingMode = 'path';
  
  // Background with rounded corners (white)
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 512);
  
  // Create rounded rectangle background
  ctx.beginPath();
  ctx.roundRect(0, 0, 512, 512, 100);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  
  // Add subtle border
  ctx.strokeStyle = '#f0f0f0';
  ctx.lineWidth = 4;
  ctx.stroke();
  
  // Main infinity-like twisted loop
  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 6;
  
  // Outer loop
  ctx.beginPath();
  ctx.ellipse(256, 256, 116, 128, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  
  // Inner loop (cut out)
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.ellipse(256, 256, 64, 76, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
  
  // Subtle outer ring for professional look
  ctx.strokeStyle = 'rgba(232, 232, 232, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(256, 256, 150, 0, 2 * Math.PI);
  ctx.stroke();
  
  // Central W letter
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 140px system-ui, -apple-system, "SF Pro Display", "Helvetica Neue", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '-0.02em';
  
  // Add text shadow for better definition
  ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
  ctx.shadowBlur = 2;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  
  ctx.fillText('W', 256, 280);
  
  // Save PNG
  const outputPath = path.join(__dirname, '..', 'public', 'icons', 'worksync-linkedin-icon.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  
  console.log('✅ LinkedIn PNG icon created:', outputPath);
  console.log('📏 Size: 512x512px');
  console.log('📦 File size:', Math.round(buffer.length / 1024), 'KB');
  
  return outputPath;
}

async function generateSquarePNG() {
  console.log('🎨 Generating square PNG icon...');
  
  // Create a square canvas (400x400)
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext('2d');
  
  // Enable high-quality rendering
  ctx.antialias = 'default';
  ctx.patternQuality = 'best';
  
  // Transparent background
  ctx.clearRect(0, 0, 400, 400);
  
  // Main infinity-like twisted loop
  ctx.fillStyle = '#000000';
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 5;
  
  // Outer loop
  ctx.beginPath();
  ctx.ellipse(200, 200, 90, 140, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  
  // Inner loop (cut out)
  ctx.globalCompositeOperation = 'destination-out';
  ctx.beginPath();
  ctx.ellipse(200, 200, 40, 60, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Reset composite operation
  ctx.globalCompositeOperation = 'source-over';
  
  // Central W letter
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 110px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  ctx.fillText('W', 200, 220);
  
  // Save PNG
  const outputPath = path.join(__dirname, '..', 'public', 'icons', 'worksync-square-icon.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  
  console.log('✅ Square PNG icon created:', outputPath);
  console.log('📏 Size: 400x400px');
  console.log('📦 File size:', Math.round(buffer.length / 1024), 'KB');
  
  return outputPath;
}

// Run the generation
async function main() {
  try {
    await generateLinkedInPNG();
    await generateSquarePNG();
    
    console.log('\n🎉 PNG icons generated successfully!');
    console.log('\nFiles created:');
    console.log('• public/icons/worksync-linkedin-icon.png (512x512, for LinkedIn)');
    console.log('• public/icons/worksync-square-icon.png (400x400, general use)');
    console.log('\nReady to upload to LinkedIn Developer Console! 🚀');
  } catch (error) {
    console.error('❌ Error generating PNG icons:', error);
    process.exit(1);
  }
}

main();