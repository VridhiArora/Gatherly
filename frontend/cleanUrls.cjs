const fs = require('fs');
const path = require('path');
const files = ['BitsNBytes/BitsNBytes.jsx', 'CN/CN.jsx', 'GFG/GFG.jsx', 'IEEE/IEEE.jsx', 'Iste/Iste.jsx', 'Vibin/Vibin.jsx'];

files.forEach(f => {
  const p = path.join('d:/CSE/BEE/Gatherly/frontend/src/pages', f);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/const getImageUrl = \(img\) => \{[\s\S]*?\};/m, 'const getImageUrl = (img) => {\n  if (!img) return "/event-placeholder.png";\n  return img;\n};');
  fs.writeFileSync(p, content);
});

console.log('Cleaned getImageUrl in club pages');
