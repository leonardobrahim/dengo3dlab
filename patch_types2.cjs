const fs = require('fs');

const path = 'src/types/index.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace Product interface
content = content.replace(
  /tags: string\[\];/g,
  `tags: string[];
  origin?: string;`
);

fs.writeFileSync(path, content, 'utf8');
