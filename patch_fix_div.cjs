const fs = require('fs');

const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// I should probably just add an extra </div> before Stock Availability Alert, or see if we are missing one.
// Let's count divs!
let divs = (content.match(/<div/g) || []).length;
let endDivs = (content.match(/<\/div>/g) || []).length;
console.log('divs:', divs, 'endDivs:', endDivs);
