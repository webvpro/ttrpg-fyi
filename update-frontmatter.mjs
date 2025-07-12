import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// --- Configuration ---
// The root directory to start searching for Markdown files.
const rootDir = path.join(process.cwd(), 'src', 'content', 'compendiums');
// --- End Configuration ---

/**
 * Recursively finds all Markdown files in a directory.
 * @param {string} dir - The directory to search in.
 * @returns {string[]} An array of full file paths.
 */
function findMarkdownFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of list) {
    const fullPath = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      results = results.concat(findMarkdownFiles(fullPath));
    } else if (path.extname(file.name) === '.md') {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Processes a single Markdown file to update its frontmatter.
 * @param {string} filePath - The full path to the Markdown file.
 */
function processFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    let wasModified = false;

    // 1. Add 'id' from the filename (without extension)
    const filename = path.basename(filePath, '.md');
    if (frontmatter.id !== filename) {
      frontmatter.id = filename;
      wasModified = true;
    }

    // 2. Add 'title' from the first alias if 'title' doesn't already exist
    if (!frontmatter.title && Array.isArray(frontmatter.aliases) && frontmatter.aliases.length > 0) {
      frontmatter.title = frontmatter.aliases[0];
      wasModified = true;
    }

    // 3. If changes were made, write them back to the file
    if (wasModified) {
      const newFileContent = matter.stringify(content, frontmatter, {
        // Preserve indentation and formatting
        lineWidth: -1, 
        indent: 2,
      });
      fs.writeFileSync(filePath, newFileContent, 'utf8');
      console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)}`);
    } else {
      // console.log(`⚪ No changes needed for: ${path.relative(process.cwd(), filePath)}`);
    }
  } catch (error) {
    console.error(`❌ Error processing file ${filePath}:`, error);
  }
}

/**
 * Main function to run the script.
 */
function main() {
  console.log(`Starting frontmatter update in "${rootDir}"...`);
  if (!fs.existsSync(rootDir)) {
    console.error(`Error: Directory not found at "${rootDir}". Please check the 'rootDir' configuration.`);
    return;
  }

  const allFiles = findMarkdownFiles(rootDir);
  console.log(`Found ${allFiles.length} Markdown files to process.`);

  allFiles.forEach(processFile);

  console.log('\nScript finished.');
}

// Run the script
main();