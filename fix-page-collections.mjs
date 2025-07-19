import fs from 'fs';
import path from 'path';

// Collection name mappings (folder-name → collection-name)
const COLLECTION_MAPPINGS = {
  'character-options': 'characteroptions',
  'character-arcs': 'characterarcs', 
  'creatures-npcs': 'creaturesnpcs',
  'cypher-shorts-scenarios': 'cyphershortsscenarios',
  'skill-lists': 'skilllists',
  // Add more mappings as needed
};

const PAGES_DIR = 'src/pages/compendium/csrd';

function fixPageFile(filePath, folderName, collectionName) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Pattern to find getCollection calls with wrong collection names
    const oldPatterns = [
      new RegExp(`getCollection\\('${folderName}'\\)`, 'g'),
      new RegExp(`getCollection\\("${folderName}"\\)`, 'g'),
      new RegExp(`CollectionEntry<'${folderName}'>`, 'g'),
      new RegExp(`CollectionEntry<"${folderName}">`, 'g'),
    ];

    // Replace with correct collection name
    for (const pattern of oldPatterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, (match) => {
          if (match.includes('getCollection')) {
            return `getCollection('${collectionName}')`;
          } else {
            return `CollectionEntry<'${collectionName}'>`;
          }
        });
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
      console.log(`   Changed collection name from '${folderName}' to '${collectionName}'`);
    } else {
      console.log(`✓ No changes needed: ${path.relative(process.cwd(), filePath)}`);
    }

  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

function processPages() {
  console.log('🔧 Fixing collection names in page files...\n');

  for (const [folderName, collectionName] of Object.entries(COLLECTION_MAPPINGS)) {
    const pageFolderPath = path.join(PAGES_DIR, folderName);
    
    if (fs.existsSync(pageFolderPath)) {
      console.log(`📁 Processing ${folderName} → ${collectionName}`);
      
      // Check for page files
      const pageFiles = [
        path.join(pageFolderPath, '[...page].astro'),
        path.join(pageFolderPath, '[slug].astro'),
        path.join(pageFolderPath, 'index.astro')
      ];

      for (const pageFile of pageFiles) {
        if (fs.existsSync(pageFile)) {
          fixPageFile(pageFile, folderName, collectionName);
        }
      }
    } else {
      console.log(`⚠️  Page folder not found: ${pageFolderPath}`);
    }
  }
}

processPages();
console.log('\n✨ Page file fixing complete!');