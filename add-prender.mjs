import fs from 'fs';
import path from 'path';

const PAGES_DIR = path.join(process.cwd(), 'src', 'pages');
const PRERENDER_LINE = 'export const prerender = true;';

/**
 * Recursively scans a directory and adds 'export const prerender = true;'
 * to any dynamic Astro route ([...slug].astro) that doesn't already have it.
 * @param {string} directory The directory to scan.
 */
function processDirectory(directory) {
  const items = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(directory, item.name);

    if (item.isDirectory()) {
      // It's a folder, go deeper
      processDirectory(fullPath);
    } else if (item.isFile() && item.name.includes('[') && item.name.endsWith('.astro')) {
      // It's a dynamic Astro page, let's process it
      try {
        let content = fs.readFileSync(fullPath, 'utf-8');

        // Check if the line already exists to avoid duplicates
        if (content.includes(PRERENDER_LINE)) {
          console.log(`- Skipping (already present): ${path.relative(process.cwd(), fullPath)}`);
          continue;
        }

        // Find the opening '---' of the frontmatter
        const frontmatterStart = content.indexOf('---');
        if (frontmatterStart !== -1) {
          // Find the position right after the opening '---'
          const insertionPoint = frontmatterStart + 3;

          // Build the new content with the prerender line added
          const newContent =
            content.slice(0, insertionPoint) +
            `\n${PRERENDER_LINE}\n` +
            content.slice(insertionPoint);

          fs.writeFileSync(fullPath, newContent, 'utf-8');
          console.log(`✅ Updated: ${path.relative(process.cwd(), fullPath)}`);
        } else {
          console.warn(`! Could not find frontmatter in: ${path.relative(process.cwd(), fullPath)}`);
        }
      } catch (error) {
        console.error(`❌ Failed to process ${fullPath}:`, error);
      }
    }
  }
}

console.log('🚀 Starting script to add `prerender = true` to dynamic pages...');
console.log('---');

if (fs.existsSync(PAGES_DIR)) {
  processDirectory(PAGES_DIR);
} else {
  console.error(`Error: Directory not found at ${PAGES_DIR}`);
}

console.log('---');
console.log('✨ Script finished.');