const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// 1. Remove number: 'XX', from all projects
code = code.replace(/^\s*number:\s*'\d+',\r?\n/gm, '');

// 2. Change Artful Heaven status to live
code = code.replace(/(title:\s*'Artful Heaven'[\s\S]*?)status:\s*'building'/g, `$1status: 'live'`);

// 3. Swap multi-platform-engagement and roadpavement
let proj1Regex = /\{\s*id:\s*'roadpavement'[\s\S]*?status:\s*'live',\s*\},\s*/;
let proj2Regex = /\{\s*id:\s*'multi-platform-engagement'[\s\S]*?status:\s*'open-source',\s*\},\s*/;

let proj1Match = code.match(proj1Regex);
let proj2Match = code.match(proj2Regex);

if (proj1Match && proj2Match) {
  code = code.replace(proj1Regex, ''); // remove proj1
  code = code.replace(proj2Regex, proj2Match[0] + proj1Match[0]); // put proj1 after proj2
} else {
  console.log("Could not find projects to swap");
}

fs.writeFileSync('src/data.ts', code);
console.log('done');
