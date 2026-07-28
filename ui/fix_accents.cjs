const fs = require('fs');
const path = require('path');

const dir = 'd:/Our Pro 2/ui/src/components';
const filesToProcess = ['Process.jsx', 'Footer.jsx', 'Navbar.jsx', 'ZoomHero.jsx', 'CTABanner.jsx'];

const replacements = [
  { rx: /#FF2A54/gi, to: '#00E5CC' },
  { rx: /#7000FF/gi, to: '#0066FF' },
  { rx: /#00D9FF/gi, to: '#00E5CC' },
  { rx: /#00E5FF/gi, to: '#00E5CC' }
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
      console.log(`Updated accent colors in ${file}`);
    } else {
      console.log(`No changes needed for ${file}`);
    }
  }
});
