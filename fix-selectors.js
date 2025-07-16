const fs = require('fs');
const path = require('path');

function findTsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      findTsFiles(filePath, fileList);
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

const tsFiles = findTsFiles('./projects/lib/src/lib');

tsFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Replace lib- prefix in selectors
  content = content.replace(/selector:\s*'lib-([^']+)'/g, "selector: '$1'");
  
  // Also update any template references to lib- components
  content = content.replace(/<lib-([^>\s]+)/g, "<$1");
  content = content.replace(/<\/lib-([^>]+)>/g, "</$1>");
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  }
});

console.log('✅ All lib- prefixes removed from component selectors');
