const fs = require('fs');
const path = require('path');

// Create a high-quality SVG specifically for LinkedIn app icon
const createLinkedInAppIcon = () => {
  const svgContent = `<svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background (white with subtle border) -->
  <rect width="512" height="512" fill="#ffffff" rx="100"/>
  <rect width="512" height="512" fill="none" stroke="#f0f0f0" stroke-width="4" rx="100"/>
  
  <!-- Main infinity-like twisted loop (perfectly centered) -->
  <path 
    d="M256,128 
       C332,128 372,168 372,256 
       C372,344 332,384 256,384 
       C180,384 140,344 140,256 
       C140,168 180,128 256,128 
       Z
       M256,180 
       C208,180 192,204 192,256 
       C192,308 208,332 256,332 
       C304,332 320,308 320,256 
       C320,204 304,180 256,180 
       Z" 
    fill="#000000"
    stroke="#000000"
    stroke-width="6"
  />
  
  <!-- Central W letter (perfectly sized and positioned) -->
  <text 
    x="256" 
    y="280" 
    text-anchor="middle" 
    dominant-baseline="middle" 
    font-family="system-ui, -apple-system, 'SF Pro Display', 'Helvetica Neue', sans-serif" 
    font-size="140" 
    font-weight="900" 
    fill="#000000"
    letter-spacing="-0.02em"
  >
    W
  </text>
  
  <!-- Subtle outer ring for professional look -->
  <circle 
    cx="256" 
    cy="256" 
    r="150" 
    stroke="#e8e8e8" 
    stroke-width="3" 
    fill="transparent" 
    opacity="0.4"
  />
</svg>`;

  const outputPath = path.join(__dirname, '..', 'public', 'icons', 'worksync-linkedin-icon.svg');
  fs.writeFileSync(outputPath, svgContent, 'utf8');
  console.log('✅ LinkedIn app icon created:', outputPath);
  
  return outputPath;
};

// Also create a square version for general use
const createSquareAppIcon = () => {
  const svgContent = `<svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Main infinity-like twisted loop -->
  <path 
    d="M200,60 
       C260,60 290,90 290,200 
       C290,310 260,340 200,340 
       C140,340 110,310 110,200 
       C110,90 140,60 200,60 
       Z
       M200,140 
       C160,140 140,160 140,200 
       C140,240 160,260 200,260 
       C240,260 260,240 260,200 
       C260,160 240,140 200,140 
       Z" 
    fill="#000000"
    stroke="#000000"
    stroke-width="5"
  />
  
  <!-- Central W letter -->
  <text 
    x="200" 
    y="220" 
    text-anchor="middle" 
    dominant-baseline="middle" 
    font-family="system-ui, -apple-system, sans-serif" 
    font-size="110" 
    font-weight="900" 
    fill="#000000"
  >
    W
  </text>
</svg>`;

  const outputPath = path.join(__dirname, '..', 'public', 'icons', 'worksync-square-icon.svg');
  fs.writeFileSync(outputPath, svgContent, 'utf8');
  console.log('✅ Square app icon created:', outputPath);
  
  return outputPath;
};

// Run the generation
try {
  createLinkedInAppIcon();
  createSquareAppIcon();
  console.log('\n🎉 App icons generated successfully!');
  console.log('\nTo use for LinkedIn:');
  console.log('1. Open worksync-linkedin-icon.svg in a browser');
  console.log('2. Take a screenshot or use browser dev tools to save as PNG');
  console.log('3. Or use online SVG to PNG converter');
} catch (error) {
  console.error('❌ Error generating icons:', error);
}