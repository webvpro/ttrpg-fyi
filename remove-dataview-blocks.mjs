import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - FIXED: Use lowercase 'csrd'
const CSRD_CONTENT_DIR = './src/content/compendiums/csrd';

// Updated pattern to match dataview blocks more accurately
const DATAVIEW_PATTERN = />\s*```dataview[\s\S]*?```/gm;

function processFile(filePath) {
  try {
    console.log(`🔍 Scanning: ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Debug: Show first few lines of content
    const previewLines = content.split('\n').slice(0, 5).join('\n');
    console.log(`   Preview: ${previewLines.substring(0, 100)}...`);
    
    // Check if file contains dataview blocks
    const matches = content.match(DATAVIEW_PATTERN);
    if (!matches) {
      console.log(`   ⚪ No dataview blocks found`);
      return { processed: false, removed: 0 };
    }
    
    console.log(`   📝 Found ${matches.length} dataview blocks:`);
    matches.forEach((match, index) => {
      console.log(`      Block ${index + 1}: ${match.substring(0, 50).replace(/\n/g, '\\n')}...`);
    });
    
    // Remove dataview blocks
    const cleanedContent = content.replace(DATAVIEW_PATTERN, '');
    
    // Write back to file
    fs.writeFileSync(filePath, cleanedContent, 'utf8');
    
    console.log(`✅ Processed: ${filePath} (removed ${matches.length} dataview blocks)`);
    return { processed: true, removed: matches.length };
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return { processed: false, removed: 0, error: error.message };
  }
}

function processDirectory(dirPath) {
  const stats = {
    totalFiles: 0,
    processedFiles: 0,
    totalDataviewBlocks: 0,
    errors: []
  };
  
  function walkDirectory(currentPath) {
    console.log(`📂 Entering directory: ${currentPath}`);
    const items = fs.readdirSync(currentPath);
    console.log(`   Found ${items.length} items: ${items.join(', ')}`);
    
    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const itemStats = fs.statSync(itemPath);
      
      if (itemStats.isDirectory()) {
        // Recursively process subdirectories
        walkDirectory(itemPath);
      } else if (itemStats.isFile() && item.endsWith('.md')) {
        // Process markdown files
        stats.totalFiles++;
        const result = processFile(itemPath);
        
        if (result.processed) {
          stats.processedFiles++;
          stats.totalDataviewBlocks += result.removed;
        }
        
        if (result.error) {
          stats.errors.push({ file: itemPath, error: result.error });
        }
      } else {
        console.log(`   ⏭️  Skipping non-markdown file: ${item}`);
      }
    }
  }
  
  walkDirectory(dirPath);
  return stats;
}

function main() {
  console.log('🧹 Removing dataview blocks from CSRD content files...\n');
  
  // Debug: Show current working directory
  console.log(`📍 Current working directory: ${process.cwd()}`);
  console.log(`📍 Looking for directory: ${CSRD_CONTENT_DIR}`);
  console.log(`📍 Absolute path: ${path.resolve(CSRD_CONTENT_DIR)}`);
  
  // Check if directory exists
  if (!fs.existsSync(CSRD_CONTENT_DIR)) {
    console.error(`❌ Directory not found: ${CSRD_CONTENT_DIR}`);
    console.log('💡 Make sure you are running this script from the project root directory.');
    
    // Debug: List what's in the current directory
    console.log('\n📋 Current directory contents:');
    try {
      const currentDirItems = fs.readdirSync('./');
      currentDirItems.forEach(item => {
        const itemPath = `./${item}`;
        const isDir = fs.statSync(itemPath).isDirectory();
        console.log(`   ${isDir ? '📁' : '📄'} ${item}`);
      });
    } catch (e) {
      console.log('   Could not read current directory');
    }
    
    process.exit(1);
  }
  
  const startTime = Date.now();
  const stats = processDirectory(CSRD_CONTENT_DIR);
  const endTime = Date.now();
  
  // Print summary
  console.log('\n📊 Summary:');
  console.log(`   Total files scanned: ${stats.totalFiles}`);
  console.log(`   Files modified: ${stats.processedFiles}`);
  console.log(`   Dataview blocks removed: ${stats.totalDataviewBlocks}`);
  console.log(`   Processing time: ${endTime - startTime}ms`);
  
  if (stats.errors.length > 0) {
    console.log(`\n❌ Errors (${stats.errors.length}):`);
    stats.errors.forEach(({ file, error }) => {
      console.log(`   ${file}: ${error}`);
    });
  }
  
  console.log('\n✅ Done!');
}

// Simplified execution - just run main() directly
console.log('🚀 Starting script...');
main();

export { processFile, processDirectory };