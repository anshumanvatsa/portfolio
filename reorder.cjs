const fs = require('fs');

const path = 'src/data.ts';
let content = fs.readFileSync(path, 'utf8');

const order = [
  'roadpavement',
  'multi-platform-engagement',
  'carepredict',
  'varuna',
  'bharat-truth-lens',
  'cloudpilot',
  'construction',
  'autostream',
  'heartdisease',
  'documind',
  'selective-encryption',
  'medicine-safety',
  'disease-frontend',
  'safety-vision',
  'social-media-pre'
];

const startIdx = content.indexOf('export const PROJECTS: Project[] = [');
const endIdx = content.indexOf('];', startIdx);
let projectsStr = content.substring(startIdx, endIdx + 2);

const projectRegex = /\{\s+id:\s+'([^']+)',[\s\S]*?(?=\n  \},|\n  \}\n\])/g;

let projectsMap = {};
let match;
while ((match = projectRegex.exec(projectsStr)) !== null) {
  let projStr = match[0] + '\n  }';
  projectsMap[match[1]] = projStr;
}

if (Object.keys(projectsMap).length !== 15) {
  console.error("Found " + Object.keys(projectsMap).length + " projects instead of 15!");
  process.exit(1);
}

let newProjectsStr = 'export const PROJECTS: Project[] = [\n';
for (let i = 0; i < order.length; i++) {
  let id = order[i];
  let p = projectsMap[id];
  let numStr = (i + 1).toString().padStart(2, '0');
  p = p.replace(/number:\s+'\d+'/, "number: '" + numStr + "'");
  newProjectsStr += '  ' + p.trim() + (i === order.length - 1 ? '\n];' : ',\n');
}

let newContent = content.substring(0, startIdx) + newProjectsStr + content.substring(endIdx + 2);
fs.writeFileSync(path, newContent);
console.log("Successfully reordered projects in data.ts");
