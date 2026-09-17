import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de rutas por defecto
const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_INPUT_DIR = path.join(ROOT_DIR, 'public', 'images', 'catalogo-pre-optimizador');
const DEFAULT_OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'images', 'catalogo');

// Configuración de optimización de imagen
const CONFIG = {
  maxWidth: 1400,              // Ancho máximo (si es mayor, se redimensiona proporcionalmente)
  maxHeight: 1400,             // Alto máximo
  webpQuality: 82,             // Calidad de compresión WebP (1-100)
  watermarkRatio: 0.14,        // Tamaño del logo respecto al ancho de la imagen (14%)
  watermarkOpacity: 0.55,      // Opacidad del logo (0.0 a 1.0)
  watermarkMarginRatio: 0.035, // Margen de separación desde el borde (3.5%)
  watermarkPosition: 'bottom-right', // 'bottom-right', 'bottom-left', etc.
};

/**
 * Convierte cualquier texto o nombre de archivo a formato web estándar kebab-case
 * Ejemplo: "Foto de portada.jpg" -> "foto-de-portada.webp"
 */
function standardizeFilename(filename) {
  const parsed = path.parse(filename);
  const cleanName = parsed.name
    .normalize('NFD')                     // Separa acentos de letras
    .replace(/[\u0300-\u036f]/g, '')     // Remueve acentos y diacríticos
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')            // Remueve caracteres especiales (paréntesis, comas, etc.)
    .trim()
    .replace(/[\s_-]+/g, '-')            // Reemplaza espacios y guiones bajos por un solo guión
    .replace(/^-+|-+$/g, '');            // Elimina guiones sobrantes al inicio/fin

  return `${cleanName || 'imagen'}.webp`;
}


/**
 * Procesa una única imagen: estandariza nombre, redimensiona, aplica watermark y comprime a WebP
 */
export async function processImage(inputPath, outputPath) {
  const originalStats = fs.statSync(inputPath);
  const originalSizeKb = (originalStats.size / 1024).toFixed(1);

  // Leer metadatos de la imagen original
  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Calcular dimensiones finales respetando aspecto
  let targetWidth = metadata.width || CONFIG.maxWidth;
  let targetHeight = metadata.height || CONFIG.maxHeight;

  if (targetWidth > CONFIG.maxWidth || targetHeight > CONFIG.maxHeight) {
    const ratio = Math.min(CONFIG.maxWidth / targetWidth, CONFIG.maxHeight / targetHeight);
    targetWidth = Math.round(targetWidth * ratio);
    targetHeight = Math.round(targetHeight * ratio);
  }

  // Asegurar que la carpeta de destino exista
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Procesar imagen completa: redimensionar proporcionalmente y convertir a WebP sin marca de agua
  await sharp(inputPath)
    .resize(targetWidth, targetHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: CONFIG.webpQuality })
    .toFile(outputPath);

  const finalStats = fs.statSync(outputPath);
  const finalSizeKb = (finalStats.size / 1024).toFixed(1);
  const savings = (((originalStats.size - finalStats.size) / originalStats.size) * 100).toFixed(1);

  return {
    inputPath,
    outputPath,
    dimensions: `${targetWidth}x${targetHeight}`,
    originalSizeKb: `${originalSizeKb} KB`,
    finalSizeKb: `${finalSizeKb} KB`,
    savings: `${savings}%`,
  };
}

/**
 * Escanea recursivamente una carpeta para encontrar todas las imágenes
 */
function getAllImageFiles(dir) {
  const allowedExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp']);
  const results = [];

  function scan(currentDir) {
    if (!fs.existsSync(currentDir)) return;
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (allowedExtensions.has(ext)) {
          results.push(fullPath);
        }
      }
    }
  }

  scan(dir);
  return results;
}

// Ejecución directa por CLI
async function main() {
  const args = process.argv.slice(2);
  const isAllMode = args.includes('--all');

  if (isAllMode) {
    console.log('🚀 Modo por lotes activado (--all)');
    console.log(`📁 Carpeta de origen:  ${DEFAULT_INPUT_DIR}`);
    console.log(`📁 Carpeta de destino: ${DEFAULT_OUTPUT_DIR}\n`);

    const images = getAllImageFiles(DEFAULT_INPUT_DIR);
    if (images.length === 0) {
      console.log('⚠️ No se encontraron imágenes en la carpeta de origen.');
      return;
    }

    console.log(`Encontradas ${images.length} imágenes para procesar.\n`);
    let count = 0;

    for (const imgPath of images) {
      count++;
      const relativePath = path.relative(DEFAULT_INPUT_DIR, imgPath);
      const relativeDir = path.dirname(relativePath);
      const newFilename = standardizeFilename(path.basename(imgPath));
      const outputFullPath = path.join(DEFAULT_OUTPUT_DIR, relativeDir, newFilename);

      try {
        const res = await processImage(imgPath, outputFullPath);
        console.log(`[${count}/${images.length}] ✅ ${path.basename(imgPath)} -> ${newFilename} (${res.originalSizeKb} -> ${res.finalSizeKb}, ${res.savings})`);
      } catch (err) {
        console.error(`[${count}/${images.length}] ❌ Error en ${relativePath}:`, err.message);
      }
    }

    console.log(`\n🎉 ¡Proceso finalizado! ${count} imágenes procesadas en public/images/catalogo.`);
    return;
  }

  // Modo archivo individual
  const targetRelativePath = args[0] || 'grua-hidraulica/Foto de portada.jpg';

  const inputFullPath = path.isAbsolute(targetRelativePath)
    ? targetRelativePath
    : path.join(DEFAULT_INPUT_DIR, targetRelativePath);

  if (!fs.existsSync(inputFullPath)) {
    console.error(`❌ Error: No existe el archivo de origen: ${inputFullPath}`);
    process.exit(1);
  }

  const relativeDir = path.relative(DEFAULT_INPUT_DIR, path.dirname(inputFullPath));
  const newFilename = standardizeFilename(path.basename(inputFullPath));
  const outputFullPath = path.join(DEFAULT_OUTPUT_DIR, relativeDir, newFilename);

  console.log('🚀 Iniciando optimización...');
  console.log(`📁 Origen:  ${inputFullPath}`);
  console.log(`📁 Destino: ${outputFullPath}`);

  const result = await processImage(inputFullPath, outputFullPath);

  console.log('\n✅ ¡Imagen procesada exitosamente!');
  console.log(`  • Dimensiones finales: ${result.dimensions}`);
  console.log(`  • Peso original:       ${result.originalSizeKb}`);
  console.log(`  • Peso WebP final:     ${result.finalSizeKb}`);
  console.log(`  • Ahorro de peso:      ${result.savings}`);
  console.log(`  • Archivo generado:    ${result.outputPath}`);
}

// Ejecutar si se llama directamente
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error('❌ Error durante el procesamiento:', err);
    process.exit(1);
  });
}
