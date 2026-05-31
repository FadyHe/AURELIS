const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "public", "images");

const pngFiles = fs.readdirSync(folder)
  .filter(file => file.toLowerCase().endsWith(".png"));

for (const file of pngFiles) {
  fs.unlinkSync(path.join(folder, file));
  console.log(`🗑️ Deleted ${file}`);
}

console.log("🎉 All PNG files removed.");