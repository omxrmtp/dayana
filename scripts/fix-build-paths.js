const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');

// Función para reemplazar texto en un archivo
function replaceInFile(filePath, search, replace) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(search)) {
      content = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Corregido: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error al procesar ${filePath}:`, error.message);
    return false;
  }
}

// Archivos a corregir
const filesToFix = [
  { file: 'index.html', replacements: [
    { search: '/patty-/', replace: '/dayana/' },
    { search: '../src/corazon.png', replace: '/dayana/corazon.png' }
  ]},
  { file: 'asset-manifest.json', replacements: [
    { search: '/patty-/', replace: '/dayana/' }
  ]},
  { file: 'manifest.json', replacements: [
    { search: '../src/corazon.png', replace: '/dayana/corazon.png' },
    { search: '"logo192.png"', replace: '"/dayana/corazon.png"' },
    { search: '"logo512.png"', replace: '"/dayana/corazon.png"' }
  ]}
];

let fixed = 0;
filesToFix.forEach(({ file, replacements }) => {
  const filePath = path.join(buildDir, file);
  if (fs.existsSync(filePath)) {
    let fileFixed = false;
    replacements.forEach(({ search, replace }) => {
      if (replaceInFile(filePath, search, replace)) {
        fileFixed = true;
      }
    });
    if (fileFixed) {
      fixed++;
    }
  }
});

// Copiar corazon.png al build si no existe
const srcIcon = path.join(__dirname, '..', 'src', 'corazon.png');
const buildIcon = path.join(buildDir, 'corazon.png');
if (fs.existsSync(srcIcon) && !fs.existsSync(buildIcon)) {
  fs.copyFileSync(srcIcon, buildIcon);
  console.log(`✓ Copiado: corazon.png al build`);
}

console.log(`\n✅ Proceso completado. ${fixed} archivo(s) corregido(s).`);

