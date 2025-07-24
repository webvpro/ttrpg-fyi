import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to extract item links from a table markdown file and update their frontmatter
 * Usage: node update-table-items.mjs <table-file> <content-category> [base-path]
 */

function extractMarkdownLinks(content) {
  // Regex to match both markdown links [text](file) and wiki links [[file|text]]
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  // Updated regex to handle Obsidian-style links [[file|text]] without requiring backslashes
  const wikiLinkRegex = /\[\[([^|\]]+)\|([^\]]+)\]\]/g;
  
  const links = [];
  let match;
  
  // Extract markdown-style links
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    let filename = match[2];
    
    // Normalize the filename (remove hash, decode URL, lowercase, etc.)
    filename = normalizeFilename(filename);
    
    links.push({
      text: match[1],
      file: filename,
      originalFile: match[2],
      type: 'markdown'
    });
  }
  
  // Extract wiki-style links [[Pathfinder-Skills|Pathfinder Skills]]
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    let filename = match[1].trim();
    
    // Remove any trailing backslashes (for backward compatibility)
    filename = filename.replace(/\\+$/, '');
    
    // Normalize the filename (remove hash, decode URL, lowercase, etc.)
    filename = normalizeFilename(filename);
    
    links.push({
      text: match[2].trim(),
      file: filename,
      originalFile: match[1],
      type: 'wiki'
    });
  }
  
  return links;
}

function normalizeFilename(filename) {
  console.log(`  🔧 Normalizing: "${filename}"`);
  
  // Decode URL encoding (e.g., %20 -> space)
  let normalized = decodeURIComponent(filename);
  console.log(`  📝 After decode: "${normalized}"`);
  
  // Remove hash fragments (everything after #) - keep everything before #
  normalized = normalized.split('#')[0];
  console.log(`  🔗 After hash removal: "${normalized}"`);
  
  // Convert to lowercase and replace spaces with dashes
  normalized = normalized
    .toLowerCase()
    .replace(/\s+/g, '-')  // Replace spaces with dashes
    .replace(/[^a-z0-9\-\.]/g, '-')  // Replace other special chars with dashes
    .replace(/-+/g, '-')  // Remove multiple consecutive dashes
    .replace(/^-|-$/g, '');  // Remove leading/trailing dashes
  
  console.log(`  📝 After normalization: "${normalized}"`);
  
  // Only add .md if it doesn't already have it
  if (!normalized.endsWith('.md')) {
    normalized += '.md';
  }
  
  console.log(`  ✅ Final result: "${normalized}"`);
  return normalized;
}

function findActualFile(basePath, originalFilename) {
  console.log(`  🔍 Looking for file: "${originalFilename}"`);
  
  // Since we've already normalized in extractMarkdownLinks, try the normalized version first
  const variations = [
    originalFilename,  // This should already be normalized
    // Also try some fallback variations just in case
    originalFilename.replace(/\.md$/, '') + '.md',  // Ensure .md extension
    originalFilename.toLowerCase(),  // Ensure lowercase (should be redundant)
  ];
  
  console.log(`  📋 Will try these variations: ${variations.join(', ')}`);
  
  // Remove duplicates and try each variation
  for (const variation of [...new Set(variations)]) {
    const fullPath = path.resolve(basePath, variation);
    console.log(`  🔎 Checking: ${fullPath}`);
    if (fs.existsSync(fullPath)) {
      console.log(`  📍 Found file: ${variation}`);
      return fullPath;
    }
  }
  
  console.warn(`  ⚠️  Tried variations: ${[...new Set(variations)].join(', ')}`);
  return null;
}

function updateFrontmatter(filePath, contentCategory) {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found: ${filePath}`);
      return false;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContent);
    
    // Add/update categories array
    if (!parsed.data.categories) {
      parsed.data.categories = [];
    }
    
    // Add content category if not already present
    if (!parsed.data.categories.includes(contentCategory)) {
      parsed.data.categories.push(contentCategory);
    }
    
    // Also add/update other useful metadata
    if (!parsed.data.collection) {
      parsed.data.collection = 'Artifacts'; // Default for artifacts
    }
    
    if (!parsed.data.kind) {
      parsed.data.kind = 'Artifact'; // Default kind
    }
    
    // Add tags if they don't exist
    if (!parsed.data.tags) {
      parsed.data.tags = [];
    }
    
    // Add content category tag (keeping the Content/ prefix for tags)
    const categoryTag = `Content/${contentCategory}`;
    if (!parsed.data.tags.includes(categoryTag)) {
      parsed.data.tags.push(categoryTag);
    }
    
    // Reconstruct the file with updated frontmatter
    const updatedContent = matter.stringify(parsed.content, parsed.data);
    
    // Write back to file
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Updated: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

function resolveTableFile(inputPath) {
  // If it's already an absolute path or exists as-is, use it
  if (path.isAbsolute(inputPath) || fs.existsSync(inputPath)) {
    return inputPath;
  }
  
  // Try common locations
  const possiblePaths = [
    inputPath, // As provided
    path.join('src/content/compendiums/csrd/en/tables', inputPath),
    path.join('src/content/compendiums/csrd/en/tables', `${inputPath}.md`)
  ];
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }
  
  return inputPath; // Return original if nothing found
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node update-table-items.mjs <table-file> <content-category> [base-path]');
    console.error('Examples:');
    console.error('  node update-table-items.mjs modern-magic-artifacts "Modern Magic Artifacts"');
    console.error('  node update-table-items.mjs src/content/compendiums/csrd/en/tables/modern-magic-artifacts.md "Modern Magic Artifacts" src/content/compendiums/csrd/en/artifacts/');
    process.exit(1);
  }
  
  const tableFileInput = args[0];
  const contentCategory = args[1];
  const basePath = args[2] || './src/content/compendiums/csrd/en/artifacts/';
  
  // Resolve the table file path
  const tableFile = resolveTableFile(tableFileInput);
  
  console.log(`📖 Processing table file: ${tableFile}`);
  console.log(`🏷️  Content category: ${contentCategory}`);
  console.log(`📁 Base path: ${basePath}`);
  
  try {
    // Check if table file exists
    if (!fs.existsSync(tableFile)) {
      console.error(`❌ Table file not found: ${tableFile}`);
      console.error('💡 Make sure the file exists or provide the full path');
      process.exit(1);
    }
    
    // Read the table file
    const tableContent = fs.readFileSync(tableFile, 'utf8');
    
    // Extract markdown links
    const links = extractMarkdownLinks(tableContent);
    console.log(`🔗 Found ${links.length} markdown links`);
    
    if (links.length === 0) {
      console.warn('⚠️  No markdown links found in the table file');
      console.log('📄 File content preview:');
      console.log(tableContent.substring(0, 500) + '...');
      return;
    }
    
    // Show found links for verification
    console.log('\n🔍 Found links:');
    links.forEach((link, index) => {
      console.log(`  ${index + 1}. ${link.text} -> ${link.originalFile} (will try: ${link.file})`);
    });
    
    // Process each link
    let successCount = 0;
    let failureCount = 0;
    
    for (const link of links) {
      console.log(`\n🔄 Processing: ${link.text} -> ${link.file}`);
      
      // Try to find the actual file with different naming conventions
      const actualFilePath = findActualFile(basePath, link.file);
      
      if (actualFilePath) {
        const success = updateFrontmatter(actualFilePath, contentCategory);
        if (success) {
          successCount++;
        } else {
          failureCount++;
        }
      } else {
        console.warn(`  ❌ Could not find file: ${link.file}`);
        failureCount++;
      }
    }
    
    // Summary
    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully updated: ${successCount} files`);
    console.log(`❌ Failed to update: ${failureCount} files`);
    console.log(`📝 Total processed: ${links.length} files`);
    
  } catch (error) {
    console.error('❌ Error reading table file:', error.message);
    console.error('💡 Current working directory:', process.cwd());
    process.exit(1);
  }
}

// Run the script
main();

// ES Module exports
export {
  extractMarkdownLinks,
  updateFrontmatter,
  normalizeFilename
};