const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');
code = code.replace(/(\/\/ ─+ PROJECTS.*?─+)[^\w]*\{/s, '$1\nexport const PROJECTS: Project[] = [\n  {');
fs.writeFileSync('src/data.ts', code);
console.log('Fixed syntax error in data.ts');
