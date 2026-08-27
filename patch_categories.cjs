const fs = require('fs');
const path = 'src/mocks/categories.ts';
let content = fs.readFileSync(path, 'utf8');

const imageMap = {
  'cat-religiosos': '/products/sagrada-familia/01.jpg',
  'cat-escritorio': '/products/suporte-ferramentas/01.jpg',
  'cat-papelaria': '/products/marcador-barquinho/01.jpg',
  'cat-organizadores': '/products/caixa-cogumelo/01.jpg',
  'cat-louca': '/products/aneis-abelha/01.jpg',
  'cat-brinquedos': '/products/botao-foda-se/01.jpg',
  'cat-souvenirs': '/products/cofrinho/01.jpg',
  'cat-beleza': '/products/porta-gloss/01.jpg',
};

for (const [id, imageUrl] of Object.entries(imageMap)) {
  const regex = new RegExp(`id: '${id}',[\\s\\S]*?imageUrl: '.*?',`, 'g');
  content = content.replace(regex, (match) => {
    return match.replace(/imageUrl: '.*?'/, `imageUrl: '${imageUrl}'`);
  });
}

fs.writeFileSync(path, content, 'utf8');
