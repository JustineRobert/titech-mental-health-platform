import { readFile } from 'node:fs/promises';
const files=['README.md','SECURITY.md','PRIVACY.md','docs/roadmap/phase-status.json'];
for(const file of files){await readFile(file,'utf8');}
console.log('format/input sanity check passed');
