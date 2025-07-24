import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to create new item .md files from a character-options file if they don't already exist
 * Usage: node create-character-option-items.mjs <character-options-file> <target-collection> [base-path]
 */

function extractObsidianLinks(content) {
  // Extract Obsidian-style links [[file|text]] or [[file]]
  const wikiLinkRegex = /\[\[([^|\]]+)(?:\|([^\]]+))?\]\]/g;
  const links = [];
  let match;
  
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const filename = match[1].trim();
    const displayText = match[2] ? match[2].trim() : filename;
    
    links.push({
      filename: filename,
      displayText: displayText,
      originalMatch: match[0]
    });
  }
  
  return links;
}

function normalizeId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractTierFromContext(content, linkMatch) {
  // Find the tier section that contains this link for foci/abilities
  const tierRegex = /(?:Tier|##### Tier)\s+(\w+|\d+)/gi;
  const sections = content.split(tierRegex);
  
  for (let i = 1; i < sections.length; i += 2) {
    const tierText = sections[i];
    const sectionContent = sections[i + 1];
    
    if (sectionContent && sectionContent.includes(linkMatch)) {
      // Convert tier text to number
      const tierMap = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6,
        'One': 1, 'Two': 2, 'Three': 3, 'Four': 4, 'Five': 5, 'Six': 6
      };
      return tierMap[tierText] || parseInt(tierText) || null;
    }
  }
  
  return null;
}

function detectContentType(content, linkMatch) {
  // Detect if this is a descriptor, focus, or ability based on context
  const linkIndex = content.indexOf(linkMatch);
  const contextBefore = content.substring(Math.max(0, linkIndex - 500), linkIndex);
  const contextAfter = content.substring(linkIndex, Math.min(content.length, linkIndex + 200));
  const fullContext = contextBefore + contextAfter;
  
  // Check for descriptor patterns
  if (fullContext.includes('Descriptor') || contextBefore.includes('### Weird West Descriptors')) {
    return 'descriptor';
  }
  
  // Check for focus patterns
  if (fullContext.includes('### Foci') || contextBefore.includes('#### [[') || fullContext.includes('Tier')) {
    return 'focus';
  }
  
  // Check for ability patterns (usually within tiers)
  if (fullContext.includes('Tier') && (fullContext.includes('point') || fullContext.includes('Enabler'))) {
    return 'ability';
  }
  
  return 'unknown';
}

function getKindFromCollection(collection) {
  const kindMap = {
    'abilities': 'Ability',
    'descriptors': 'Descriptor',
    'foci': 'Focus',
    'equipment': 'Equipment',
    'artifacts': 'Artifact',
    'creatures': 'Creature',
    'rules': 'Rule'
  };
  
  return kindMap[collection] || 'Item';
}

function createFrontmatterString(frontmatter) {
  let result = '';
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      result += `${key}:\n`;
      value.forEach(item => {
        result += `  - ${item}\n`;
      });
    } else if (value !== null && value !== undefined && value !== '') {
      result += `${key}: ${value}\n`;
    }
  }
  
  return result;
}

function resolveCharacterOptionsFile(inputPath) {
  // If it's already an absolute path or exists as-is, use it
  if (path.isAbsolute(inputPath) || fs.existsSync(inputPath)) {
    return inputPath;
  }
  
  // Try common locations
  const possiblePaths = [
    inputPath, // As provided
    path.join('src/content/compendiums/csrd/en/character-options', inputPath),
    path.join('src/content/compendiums/csrd/en/character-options', `${inputPath}.md`)
  ];
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }
  
  return inputPath; // Return original if nothing found
}

function resolveBasePath(targetCollection) {
  const basePathMap = {
    'abilities': './src/content/compendiums/csrd/en/abilities/',
    'descriptors': './src/content/compendiums/csrd/en/descriptors/',
    'foci': './src/content/compendiums/csrd/en/foci/',
    'equipment': './src/content/compendiums/csrd/en/equipment/',
    'artifacts': './src/content/compendiums/csrd/en/artifacts/',
    'creatures': './src/content/compendiums/csrd/en/creatures/',
    'rules': './src/content/compendiums/csrd/en/rules/'
  };
  
  return basePathMap[targetCollection] || `./src/content/compendiums/csrd/en/${targetCollection}/`;
}

function createCharacterOptionItems(characterOptionsFile, targetCollection, customBasePath = null) {
  try {
    // Read character options file
    const characterOptionsContent = fs.readFileSync(characterOptionsFile, 'utf8');
    const { data: characterOptionsFrontmatter, content } = matter(characterOptionsContent);
    
    // Extract Obsidian links to create entries for
    const obsidianLinks = extractObsidianLinks(content);
    
    if (obsidianLinks.length === 0) {
      console.log('⚠️  No Obsidian links found in the character options file.');
      return;
    }
    
    // Filter links based on target collection if needed
    let filteredLinks = obsidianLinks;
    if (targetCollection === 'descriptors') {
      // For descriptors, only get links from the descriptors section
      filteredLinks = obsidianLinks.filter(link => 
        detectContentType(content, link.originalMatch) === 'descriptor'
      );
    } else if (targetCollection === 'foci') {
      // For foci, get focus names but not individual abilities
      filteredLinks = obsidianLinks.filter(link => {
        const contentType = detectContentType(content, link.originalMatch);
        return contentType === 'focus';
      });
    } else if (targetCollection === 'abilities') {
      // For abilities, get ability links from within focus sections
      filteredLinks = obsidianLinks.filter(link => {
        const contentType = detectContentType(content, link.originalMatch);
        return contentType === 'ability';
      });
    }
    
    // Determine target directory
    const basePath = customBasePath || resolveBasePath(targetCollection);
    const targetDir = path.resolve(basePath);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`📁 Created directory: ${targetDir}`);
    }
    
    console.log(`🎯 Processing character options file: ${path.basename(characterOptionsFile)}`);
    console.log(`📂 Target collection: ${targetCollection}`);
    console.log(`📁 Target directory: ${targetDir}`);
    console.log(`🔗 Found ${filteredLinks.length} relevant links to process:`);
    
    let createdCount = 0;
    let skippedCount = 0;
    
    filteredLinks.forEach((link, index) => {
      const entryFilename = normalizeId(link.filename);
      const targetFile = path.join(targetDir, `${entryFilename}.md`);
      
      // Check if file already exists
      if (fs.existsSync(targetFile)) {
        console.log(`  ⏭️  Skipping ${entryFilename}.md - file already exists`);
        skippedCount++;
        return;
      }
      
      // Extract tier information from the context (for abilities)
      const tier = targetCollection === 'abilities' ? extractTierFromContext(content, link.originalMatch) : null;
      
      // Create frontmatter for the new entry
      const newFrontmatter = {
        aliases: [link.displayText],
        tags: [
          `Compendium/CSRD/en/${targetCollection.charAt(0).toUpperCase() + targetCollection.slice(1)}`,
          ...(characterOptionsFrontmatter.tags || []).filter(tag => 
            !tag.includes('/Character-Options') && !tag.includes('Compendium/CSRD/en/Character-Options')
          )
        ],
        title: link.displayText,
        collection: targetCollection.charAt(0).toUpperCase() + targetCollection.slice(1),
        kind: getKindFromCollection(targetCollection),
        id: link.filename,
        categories: characterOptionsFrontmatter.categories || []
      };
      
      // Add specific fields based on collection type
      if (targetCollection === 'abilities' && tier) {
        newFrontmatter.tier = tier;
      }
      
      // Create the file content
      const frontmatterString = createFrontmatterString(newFrontmatter);
      const fileContent = `---\n${frontmatterString}---\n\n## ${link.displayText}\n\n*[Content to be added from character options: ${characterOptionsFrontmatter.title || path.basename(characterOptionsFile, '.md')}]*\n`;
      
      // Write the file
      fs.writeFileSync(targetFile, fileContent, 'utf8');
      console.log(`  ✅ Created: ${entryFilename}.md ${tier ? `(Tier ${tier})` : ''}`);
      createdCount++;
    });
    
    console.log(`\n🎉 Processing complete:`);
    console.log(`   📝 Created: ${createdCount} new entries`);
    console.log(`   ⏭️  Skipped: ${skippedCount} existing entries`);
    console.log(`   📊 Total processed: ${filteredLinks.length} links`);
    console.log(`   📂 Collection: ${targetCollection}`);
    
  } catch (error) {
    console.error('❌ Error creating character option items:', error.message);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node create-character-option-items.mjs <character-options-file> <target-collection> [base-path]');
    console.error('\nExamples:');
    console.error('  node create-character-option-items.mjs weird-west-character-options abilities');
    console.error('  node create-character-option-items.mjs weird-west-character-options descriptors');
    console.error('  node create-character-option-items.mjs weird-west-character-options foci');
    console.error('  node create-character-option-items.mjs src/content/compendiums/csrd/en/character-options/weird-west-character-options.md abilities');
    console.error('\nSupported collections: abilities, descriptors, foci, equipment, artifacts, creatures, rules');
    console.error('\nNote: The script will automatically skip files that already exist and filter links based on collection type.');
    process.exit(1);
  }
  
  const [characterOptionsFileInput, targetCollection, customBasePath] = args;
  
  // Resolve the character options file path
  const characterOptionsFile = resolveCharacterOptionsFile(characterOptionsFileInput);
  
  if (!fs.existsSync(characterOptionsFile)) {
    console.error(`❌ Character options file not found: ${characterOptionsFile}`);
    console.error('💡 Make sure the file exists or provide the full path');
    process.exit(1);
  }
  
  const validCollections = ['abilities', 'descriptors', 'foci', 'equipment', 'artifacts', 'creatures', 'rules'];
  if (!validCollections.includes(targetCollection)) {
    console.error(`❌ Invalid collection '${targetCollection}'. Valid options: ${validCollections.join(', ')}`);
    process.exit(1);
  }
  
  createCharacterOptionItems(characterOptionsFile, targetCollection, customBasePath);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { createCharacterOptionItems, extractObsidianLinks, normalizeId };