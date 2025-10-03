const sass = require('sass');
const fs = require('fs');
const path = require('path');

// Input and output paths
const inputFile = path.join(__dirname, 'src/styles/styles.scss');
const outputFile = path.join(__dirname, 'src/dist/styles.css');
const mapFile = path.join(__dirname, 'src/dist/styles.css.map');

// Ensure the dist directory exists
if (!fs.existsSync(path.dirname(outputFile))) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
}

// Compile SCSS to CSS
try {
  const result = sass.compile(inputFile, {
    style: 'expanded',
    sourceMap: true,
  });

  // Write CSS file
  fs.writeFileSync(outputFile, result.css);
  console.log(`SCSS compiled successfully to ${outputFile}`);

  // Write source map if available
  if (result.sourceMap) {
    fs.writeFileSync(mapFile, JSON.stringify(result.sourceMap));
    console.log(`Source map written to ${mapFile}`);
  }
} catch (error) {
  console.error('SCSS compilation failed:', error);
  process.exit(1);
}