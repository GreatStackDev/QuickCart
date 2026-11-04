const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputFolder = path.join(__dirname, "assets-optimized");

fs.readdirSync(inputFolder).forEach(async (file) => {
  if (!file.toLowerCase().endsWith(".png")) return;

  const inputPath = path.join(inputFolder, file);
  const outputPath = path.join(
    inputFolder,
    path.basename(file, ".png") + ".webp"
  );

  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`Converted: ${file} → ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`Failed: ${file}`, error);
  }
});