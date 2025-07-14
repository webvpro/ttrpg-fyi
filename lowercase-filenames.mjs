import fs from 'fs';
import path from 'path';

/**
 * WARNING: This script will permanently rename files and folders to be lowercase.
 * It is highly recommended to commit your files to Git or create a backup before running.
 */

// The starting directory for the script.
const startDir = './src/content';

function processDirectory(directory) {
  const items = fs.readdirSync(directory);

  for (const item of items) {
    const oldPath = path.join(directory, item);
    const newPath = path.join(directory, item.toLowerCase());

    try {
      // Rename the item (file or folder)
      if (oldPath !== newPath) {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${oldPath} -> ${newPath}`);
      }

      // If it's a directory, recurse into it
      if (fs.statSync(newPath).isDirectory()) {
        processDirectory(newPath);
      }
    } catch (error) {
      console.error(`Error processing ${oldPath}:`, error);
    }
  }
}

console.log(`Starting file and folder lowercase conversion in: ${startDir}`);
console.log('---');

if (fs.existsSync(startDir)) {
  processDirectory(startDir);
  console.log('---');
  console.log('✅ Conversion complete.');
} else {
  console.error(`❌ Error: Starting directory not found at ${startDir}`);
}