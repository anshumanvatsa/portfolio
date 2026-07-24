const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// 1. Remove number: 'XX', from all projects
code = code.replace(/^\s*number:\s*'\d+',\r?\n/gm, '');

// 2. Change Artful Heaven status to live
code = code.replace(/(title:\s*'Artful Heaven'[\s\S]*?)status:\s*'building'/g, `$1status: 'live'`);

fs.writeFileSync('src/data.ts', code);
console.log('done');
