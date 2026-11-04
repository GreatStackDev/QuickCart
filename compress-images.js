const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(__dirname, "assets");
const outputFolder = path.join(__dirname, "assets-optimized");

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

const files = fs.readdirSync(inputFolder);

async function compressImages() {
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();

    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      continue;
    }

    const inputPath = path.join(inputFolder, file);
    const outputName = path.basename(file, ext) + ".webp";
    const outputPath = path.join(outputFolder, outputName);

    try {
      await sharp(inputPath)
        .resize(1200, 1200, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 80,
        })
        .toFile(outputPath);

      console.log(`✓ ${file} → ${outputName}`);
    } catch (error) {
      console.error(`✗ Failed: ${file}`, error);
    }
  }

  console.log("\nDone! Optimized images are in assets-optimized/");
}

compressImages();