const fs = require('fs');

function processData() {
  const code = fs.readFileSync('src/data.ts', 'utf8');
  const lines = code.split('\n');
  const outLines = [];
  
  let i = 0;
  let inProjects = false;
  let objects = [];
  let currentObjLines = [];
  let braceDepth = 0;

  for (const line of lines) {
    if (line.includes('export const PROJECTS: Project[] = [')) {
      inProjects = true;
      outLines.push(line);
      continue;
    }
    
    if (inProjects) {
      // If we see a top-level `  },`, it might be the end of an object.
      // But let's just count braces to extract objects.
      if (line.includes('{')) braceDepth += (line.match(/\{/g) || []).length;
      if (line.includes('}')) braceDepth -= (line.match(/\}/g) || []).length;
      
      currentObjLines.push(line);
      
      if (braceDepth === 0 && line.trim() === '},' || line.trim() === '}') {
        // End of array
        if (line.trim() === '}') {
           // this is the end of the array, `];` is probably next or it's `];`
           currentObjLines.pop(); // remove `]`
           outLines.push(...currentObjLines);
           break; // Done processing array objects this way
        }
      }
    } else {
      outLines.push(line);
    }
  }
}

// Actually, simpler:
let text = fs.readFileSync('src/data.ts', 'utf8');

// 1. Remove number: 'XX',
text = text.replace(/^\s*number:\s*'\d+',\r?\n/gm, '');

// 2. Change building to live
text = text.replace(/(title:\s*'Artful Heaven'[\s\S]*?)status:\s*'building'/g, `$1status: 'live'`);

// 3. Swap the first two objects.
// Let's find the exact string of roadpavement.
let startIndexRoad = text.indexOf("  {\r\n    id: 'roadpavement',");
if (startIndexRoad === -1) startIndexRoad = text.indexOf("  {\n    id: 'roadpavement',");

let startIndexMulti = text.indexOf("  {\r\n    id: 'multi-platform-engagement',");
if (startIndexMulti === -1) startIndexMulti = text.indexOf("  {\n    id: 'multi-platform-engagement',");

let startIndexCare = text.indexOf("  {\r\n    id: 'carepredict',");
if (startIndexCare === -1) startIndexCare = text.indexOf("  {\n    id: 'carepredict',");

if (startIndexRoad !== -1 && startIndexMulti !== -1 && startIndexCare !== -1) {
    let roadStr = text.substring(startIndexRoad, startIndexMulti);
    let multiStr = text.substring(startIndexMulti, startIndexCare);
    
    // Replace the combined section
    let before = text.substring(0, startIndexRoad);
    let after = text.substring(startIndexCare);
    
    text = before + multiStr + roadStr + after;
}

fs.writeFileSync('src/data.ts', text);
console.log('done');
