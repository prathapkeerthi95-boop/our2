const fs = require('fs');
const path = require('path');

const dir = 'd:/Our Pro 2/ui/src/components';
const filesToProcess = ['About.jsx', 'Services.jsx', 'Process.jsx', 'ZoomHero.jsx', 'Footer.jsx', 'Navbar.jsx', 'Portfolio.jsx'];

const replacements = [
  // Grays to Navy
  { rx: /rgba?\(37,\s*40,\s*48,\s*0\.90\)/g, to: 'rgba(10, 16, 30, 0.90)' },
  { rx: /rgba?\(45,\s*49,\s*60,\s*0\.94\)/g, to: 'rgba(13, 22, 38, 0.94)' },
  { rx: /rgba?\(27,\s*30,\s*36,\s*0\.98\)/g, to: 'rgba(6, 12, 20, 0.98)' },
  { rx: /#606870/g, to: '#0D1626' },
  
  // Bright Cyans to Nuvarox Cyan
  { rx: /#00F0FF/gi, to: '#00E5CC' },
  { rx: /rgba?\(0,\s*163,\s*255/g, to: 'rgba(0, 102, 255' }, // Blue accents
  
  // General dark grays to navy
  { rx: /#0A0A0E/gi, to: '#060C14' },
  { rx: /#12121A/gi, to: '#0A1118' },
  { rx: /#1A1A24/gi, to: '#0D1626' },
  { rx: /#030712/gi, to: '#060C14' },
  { rx: /#000000/g, to: '#060C14' }, // Be careful with pure black, but in this context it's usually backgrounds
  
  // Specific Services.jsx / Process.jsx backgrounds
  { rx: /backgroundColor:\s*['"]#F9FAFB['"]/gi, to: "backgroundColor: '#060C14'" }, // If any light mode slipped in
  { rx: /backgroundColor:\s*['"]#F3F4F6['"]/gi, to: "backgroundColor: '#0A1118'" },
  { rx: /background:\s*['"]#FFFFFF['"]/gi, to: "background: '#0D1626'" },
  { rx: /color:\s*['"]#111827['"]/gi, to: "color: '#FFFFFF'" },
  { rx: /color:\s*['"]#4B5563['"]/gi, to: "color: 'rgba(255, 255, 255, 0.7)'" }
];

filesToProcess.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    replacements.forEach(rep => {
      content = content.replace(rep.rx, rep.to);
    });
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated colors in ${file}`);
    } else {
      console.log(`No changes needed for ${file}`);
    }
  }
});
