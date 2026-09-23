const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Replace dark:something classes. 
  content = content.replace(/\bdark:[^\s"'`]+/g, '');
  
  // Clean up double spaces left behind inside class strings
  content = content.replace(/className="\s+/g, 'className="');
  content = content.replace(/\s+"/g, '"');
  
  // Clean up double spaces in general, but be careful not to break indentation. 
  // Wait, replacing \s{2,} globally will break all indentation in the TSX file! 
  // That's a terrible idea. I will only target spaces inside class attributes.
  // Actually, replacing double spaces globally is extremely dangerous.
  
  // Instead, let's just do a safer approach:
  // We can just leave double spaces, React doesn't care. Tailwind doesn't care.
  // We'll just remove the class and maybe a leading space.
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log('Modified ' + modifiedCount + ' files.');
