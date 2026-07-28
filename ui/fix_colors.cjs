const fs = require('fs');

const path = 'd:/Our Pro 2/ui/src/components/StatsTestimonials.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Change section inline styles
content = content.replace(/backgroundColor:\s*['"]#F4F5F7['"]/, "backgroundColor: '#060C14'");
content = content.replace(/color:\s*['"]#0F172A['"]/, "color: '#FFFFFF'");

// 2. Change ambient veil to darken the keyboard image
content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.35\);/g, "background: rgba(6, 12, 20, 0.85);");

// 3. Change card background and border
content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.42\);/g, "background: rgba(10, 16, 30, 0.6);");
content = content.replace(/border:\s*1\.5px\s*solid\s*rgba\(0,\s*217,\s*255,\s*0\.35\);/g, "border: 1px solid rgba(0, 229, 204, 0.2);");

// 4. Change card hover background and border
content = content.replace(/background:\s*#FFFFFF;/g, "background: #0D1626;");
content = content.replace(/border-color:\s*rgba\(0,\s*217,\s*255,\s*0\.65\);/g, "border-color: #00E5CC;");
content = content.replace(/box-shadow:\s*0\s*15px\s*45px\s*rgba\(0,\s*217,\s*255,\s*0\.12\);/g, "box-shadow: 0 0 30px rgba(0, 229, 204, 0.35);");

// 5. Change Text colors
content = content.replace(/color:\s*#0F172A;/g, "color: #FFFFFF;");
content = content.replace(/color:\s*#00D9FF;/g, "color: #00E5CC;");
content = content.replace(/color:\s*rgba\(15,\s*23,\s*42,\s*0\.58\);/g, "color: rgba(255, 255, 255, 0.6);");

// 6. Change Marquee strokes
content = content.replace(/-webkit-text-stroke:\s*1px\s*rgba\(15,\s*23,\s*42,\s*0\.65\);/g, "-webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);");
content = content.replace(/-webkit-text-stroke:\s*1\.5px\s*rgba\(15,\s*23,\s*42,\s*0\.58\);/g, "-webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.25);");

// 7. Change line gradients
content = content.replace(/background-image:\s*linear-gradient\(#00D9FF,\s*#00D9FF\);/g, "background-image: linear-gradient(#00E5CC, #00E5CC);");
content = content.replace(/#00D9FF/g, "#00E5CC");
content = content.replace(/rgba\(0,\s*217,\s*255,/g, "rgba(0, 229, 204,");

// 8. Testimonials label background
content = content.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.85\);\s*\/\*\s*Premium light backdrop\s*\*\//g, "background: rgba(10, 16, 30, 0.85); /* Premium dark backdrop */");

// 9. Background image overlay
content = content.replace(/backgroundImage:\s*bgLoaded\s*\?\s*`url\('\/images\/page\s*5\s*background\.png'\)`\s*:\s*'none'/g, "backgroundImage: bgLoaded ? `linear-gradient(to bottom, rgba(6, 12, 20, 1) 0%, rgba(6, 12, 20, 0.85) 20%, rgba(6, 12, 20, 0.85) 80%, rgba(6, 12, 20, 1) 100%), url('/images/page 5 background.png')` : 'none'");

fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated StatsTestimonials.jsx colors.');
