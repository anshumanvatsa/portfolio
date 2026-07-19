const fs = require('fs');

const files = [
  'src/App.tsx',
  'src/components/CaseStudyModal.tsx',
  'src/components/ResumeViewer.tsx',
  'src/components/MlPlayground.tsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/bg-white/g, 'bg-surface-container');
    content = content.replace(/bg-purple-400\/5/g, 'bg-amber-400/5');
    fs.writeFileSync(file, content);
  }
}
console.log("Replaced bg-white with bg-surface-container and fixed purple blobs in components.");
