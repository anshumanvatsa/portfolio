const fs = require('fs');

const path = 'src/data.ts';
let content = fs.readFileSync(path, 'utf8');

const newProjectStr = `  {
    id: 'artful-heaven',
    number: '01',
    title: 'Artful Heaven',
    subtitle: 'Premium E-Commerce Art Platform',
    shortDesc: 'A highly aesthetic, UI/UX-heavy digital art and e-commerce platform featuring glassmorphism, fluid animations, and premium dark-mode styling.',
    tags: ['React', 'UI/UX', 'Tailwind'],
    fullTags: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'UI/UX Design', 'Frontend', 'E-Commerce'],
    description: 'Artful Heaven is a premium digital art and e-commerce platform with an extreme focus on UI/UX design. It features immersive glassmorphism, dynamic routing, and fluid micro-animations that make discovering art feel luxurious. Built with modern React and Tailwind CSS, it implements complex interactive states and seamless page transitions.',
    challenges: [
      'Designing an ultra-premium dark theme using glassmorphic UI elements and subtle neon accents.',
      'Implementing smooth micro-animations for interactive elements without compromising performance.',
      'Structuring a scalable component system for an e-commerce layout.'
    ],
    achievements: [
      'Highly aesthetic UI/UX design that elevates the standard of frontend presentation.',
      'Responsive, mobile-first layouts with complex grid systems.',
      'Optimized asset delivery for high-resolution digital art.'
    ],
    architecture: 'React Frontend -> Framer Motion Animations -> Custom UI Design System',
    liveUrl: 'http://13.60.57.168:4007',
    githubUrl: 'https://github.com/anshumanvatsa/artful-heaven',
    previewImage: '/artful-heaven-preview.png',
    category: 'fullstack',
    metrics: [
      { label: 'Type', value: 'E-Commerce' },
      { label: 'Design', value: 'UI/UX' },
      { label: 'Status', value: 'Building' }
    ],
    year: '2025',
    status: 'live'
  }`;

const order = [
  'artful-heaven',
  'roadpavement',
  'multi-platform-engagement',
  'carepredict',
  'varuna',
  'bharat-truth-lens',
  'cloudpilot',
  'construction',
  'social-media-pre',
  'autostream',
  'heartdisease',
  'documind',
  'selective-encryption',
  'medicine-safety',
  'safety-vision'
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

projectsMap['artful-heaven'] = newProjectStr;

let newProjectsStr = 'export const PROJECTS: Project[] = [\n';
for (let i = 0; i < order.length; i++) {
  let id = order[i];
  let p = projectsMap[id];
  if (typeof p !== 'string') {
    console.error("p is not a string for id:", id);
    process.exit(1);
  }
  let numStr = (i + 1).toString().padStart(2, '0');
  p = p.replace(/number:\s+'\d+'/, "number: '" + numStr + "'");
  newProjectsStr += '  ' + p.trim() + (i === order.length - 1 ? '\n];' : ',\n');
}

let newContent = content.substring(0, startIdx) + newProjectsStr + content.substring(endIdx + 2);
fs.writeFileSync(path, newContent);
console.log("Successfully updated data.ts");
