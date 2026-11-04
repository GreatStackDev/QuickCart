const sharp = require("sharp");
const path = require("path");

const inputFolder = path.join(__dirname, "assets");
const outputFolder = path.join(__dirname, "assets-optimized");

const images = [
  "header_headphone_image",
  "header_playstation_image",
  "header_macbook_image",
];

async function convertImages() {
  for (const name of images) {
    const input = path.join(inputFolder, `${name}.png`);
    const output = path.join(outputFolder, `${name}.webp`);

    await sharp(input)
      .webp({ quality: 90 })
      .toFile(output);

    console.log(`Updated: ${name}.webp`);
  }
}

convertImages().catch((error) => {
  console.error(error);
  process.exit(1);
});