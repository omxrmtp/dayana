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
  'index.html',
  'asset-manifest.json'
];

let fixed = 0;
filesToFix.forEach(file => {
  const filePath = path.join(buildDir, file);
  if (fs.existsSync(filePath)) {
    if (replaceInFile(filePath, '/patty-/', '/dayana/')) {
      fixed++;
    }
  }
});

console.log(`\n✅ Proceso completado. ${fixed} archivo(s) corregido(s).`);

