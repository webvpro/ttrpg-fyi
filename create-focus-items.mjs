import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Script to create new item .md files from a focus file if they don't already exist
 * Usage: node create-focus-items.mjs <focus-file> <target-collection> [base-path]
 */

function extractAbilitiesFromTiers(content) {
  const abilities = [];
  
  console.log('🔍 Debug: Starting ability extraction...');
  
  // Find tier headers - handles "Tier One", "Tier 2", etc.
  const tierRegex = /(?:^|\n)\s*Tier\s+(?:One|Two|Three|Four|Five|Six|\d+)\s*$/gmi;
  
  let match;
  const tierMatches = [];
  
  // Find all tier headers and their positions
  while ((match = tierRegex.exec(content)) !== null) {
    const tierText = match[0].trim();
    const tierNumber = extractTierNumber(tierText);
    
    tierMatches.push({
      match: match[0],
      index: match.index,
      tier: tierNumber,
      tierText: tierText
    });
    
    console.log(`🎯 Found tier: "${tierText}" at position ${match.index} (Tier ${tierNumber})`);
  }
  
  if (tierMatches.length === 0) {
    console.log('⚠️  No tier headers found.');
    return abilities;
  }
  
  // Process each tier section
  for (let i = 0; i < tierMatches.length; i++) {
    const currentTier = tierMatches[i];
    const nextTier = tierMatches[i + 1];
    
    // Extract content between this tier and the next (or end of content)
    const startIndex = currentTier.index + currentTier.match.length;
    const endIndex = nextTier ? nextTier.index : content.length;
    const tierSection = content.substring(startIndex, endIndex);
    
    console.log(`\n📋 Processing Tier ${currentTier.tier}:`);
    console.log(`   Section preview: ${tierSection.substring(0, 200)}...`);
    
    // Extract abilities from this tier section
    // Pattern matches "Ability Name: Description" or "1. Ability Name: Description"
    const abilityRegex = /(?:^\s*\d+\.\s+)?([^:\n]+?):\s+([^\n]+(?:\n(?!\s*(?:\d+\.\s+)?[^:\n]+:)[^\n]*)*)/gm;
    
    let abilityMatch;
    while ((abilityMatch = abilityRegex.exec(tierSection)) !== null) {
      const abilityName = abilityMatch[1].trim();
      const abilityDescription = abilityMatch[2].trim();
      
      console.log(`   🔍 Found potential ability: "${abilityName}"`);
      
      if (isValidAbilityName(abilityName)) {
        abilities.push({
          name: abilityName,
          tier: currentTier.tier,
          description: abilityDescription,
          section: tierSection
        });
        console.log(`   ✅ Added ability: "${abilityName}" (Tier ${currentTier.tier})`);
      } else {
        console.log(`   ⏭️  Skipped: "${abilityName}" (invalid)`);
      }
    }
  }
  
  console.log(`\n🎉 Total abilities extracted: ${abilities.length}`);
  abilities.forEach(ability => {
    console.log(`   📝 ${ability.name} (Tier ${ability.tier})`);
  });
  
  return abilities;
}

function extractTierNumber(tierText) {
  const tierMatch = tierText.match(/Tier\s+(?:One|Two|Three|Four|Five|Six|\d+)/i);
  if (!tierMatch) return null;
  
  const tierValue = tierMatch[0].replace(/Tier\s+/i, '').trim().toLowerCase();
  const tierMap = {
    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6
  };
  
  return tierMap[tierValue] || parseInt(tierValue) || null;
}

function isValidAbilityName(name) {
  if (!name || name.length < 3) return false;
  
  const invalidPatterns = [
    /ability choice/i,
    /choose either/i,
    /choose one/i,
    /equipment/i,
    /^\s*\d+\s*$/,
    /^(the|a|an|and|or|but|if|when|then|that|this)$/i,
    /connection/i,
    /minor effect/i,
    /major effect/i,
    /additional equipment/i,
    /either way/i
  ];
  
  return !invalidPatterns.some(pattern => pattern.test(name));
}

function normalizeId(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
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

function resolveFocusFile(inputPath) {
  // If it's already an absolute path or exists as-is, use it
  if (path.isAbsolute(inputPath) || fs.existsSync(inputPath)) {
    return inputPath;
  }
  
  // Try common locations
  const possiblePaths = [
    inputPath, // As provided
    path.join('src/content/compendiums/csrd/en/foci', inputPath),
    path.join('src/content/compendiums/csrd/en/foci', `${inputPath}.md`)
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
    'equipment': './src/content/compendiums/csrd/en/equipment/',
    'artifacts': './src/content/compendiums/csrd/en/artifacts/',
    'creatures': './src/content/compendiums/csrd/en/creatures/',
    'rules': './src/content/compendiums/csrd/en/rules/'
  };
  
  return basePathMap[targetCollection] || `./src/content/compendiums/csrd/en/${targetCollection}/`;
}

function createFocusItems(focusFile, targetCollection, customBasePath = null) {
  try {
    // Read focus file
    const focusContent = fs.readFileSync(focusFile, 'utf8');
    const { data: focusFrontmatter, content } = matter(focusContent);
    
    console.log(`📖 Reading focus file: ${focusFile}`);
    console.log(`📏 Content length: ${content.length} characters`);
    
    // Extract abilities from tier sections
    const abilities = extractAbilitiesFromTiers(content);
    
    if (abilities.length === 0) {
      console.log('⚠️  No abilities found under tier headers in the focus file.');
      return;
    }
    
    // Determine target directory
    const basePath = customBasePath || resolveBasePath(targetCollection);
    const targetDir = path.resolve(basePath);
    
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`📁 Created directory: ${targetDir}`);
    }
    
    console.log(`\n🎯 Processing focus file: ${path.basename(focusFile)}`);
    console.log(`📂 Target collection: ${targetCollection}`);
    console.log(`📁 Target directory: ${targetDir}`);
    console.log(`🔗 Found ${abilities.length} abilities to process:`);
    
    let createdCount = 0;
    let skippedCount = 0;
    
    abilities.forEach((ability, index) => {
      const entryFilename = normalizeId(ability.name);
      const targetFile = path.join(targetDir, `${entryFilename}.md`);
      
      console.log(`  📋 Processing: ${ability.name} (Tier ${ability.tier || 'Unknown'})`);
      
      // Check if file already exists
      if (fs.existsSync(targetFile)) {
        console.log(`  ⏭️  Skipping ${entryFilename}.md - file already exists`);
        skippedCount++;
        return;
      }
      
      // Create frontmatter for the new entry
      const newFrontmatter = {
        aliases: [ability.name],
        tags: [
          `Compendium/CSRD/en/${targetCollection.charAt(0).toUpperCase() + targetCollection.slice(1)}`,
          ...(focusFrontmatter.tags || []).filter(tag => 
            !tag.includes('/Foci') && !tag.includes('Focus/') && !tag.includes('Compendium/')
          )
        ],
        title: ability.name,
        collection: targetCollection.charAt(0).toUpperCase() + targetCollection.slice(1),
        kind: getKindFromCollection(targetCollection),
        id: normalizeId(ability.name),
        categories: focusFrontmatter.categories || []
      };
      
      // Add tier for abilities
      if (targetCollection === 'abilities' && ability.tier) {
        newFrontmatter.tier = ability.tier;
      }
      
      // Create the file content with the actual ability description
      const frontmatterString = createFrontmatterString(newFrontmatter);
      const fileContent = `---\n${frontmatterString}---\n\n## ${ability.name}\n\n${ability.description}\n\n**Tier:** ${ability.tier || 'Unknown'}\n`;
      
      // Write the file
      fs.writeFileSync(targetFile, fileContent, 'utf8');
      console.log(`  ✅ Created: ${entryFilename}.md (Tier ${ability.tier || 'Unknown'})`);
      createdCount++;
    });
    
    console.log(`\n🎉 Processing complete:`);
    console.log(`   📝 Created: ${createdCount} new entries`);
    console.log(`   ⏭️  Skipped: ${skippedCount} existing entries`);
    console.log(`   📊 Total processed: ${abilities.length} abilities`);
    console.log(`   📂 Collection: ${targetCollection}`);
    
  } catch (error) {
    console.error('❌ Error creating focus items:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node create-focus-items.mjs <focus-file> <target-collection> [base-path]');
    console.error('\nExamples:');
    console.error('  node create-focus-items.mjs rides-like-the-wind abilities');
    console.error('  node create-focus-items.mjs src/content/compendiums/csrd/en/foci/rides-like-the-wind.md abilities');
    console.error('  node create-focus-items.mjs my-focus.md abilities ./custom/path/');
    console.error('\nSupported collections: abilities, descriptors, equipment, artifacts, creatures, rules');
    console.error('\nNote: The script will automatically skip files that already exist and only processes abilities under Tier headers.');
    process.exit(1);
  }
  
  const [focusFileInput, targetCollection, customBasePath] = args;
  
  // Resolve the focus file path
  const focusFile = resolveFocusFile(focusFileInput);
  
  if (!fs.existsSync(focusFile)) {
    console.error(`❌ Focus file not found: ${focusFile}`);
    console.error('💡 Make sure the file exists or provide the full path');
    process.exit(1);
  }
  
  const validCollections = ['abilities', 'descriptors', 'equipment', 'artifacts', 'creatures', 'rules'];
  if (!validCollections.includes(targetCollection)) {
    console.error(`❌ Invalid collection '${targetCollection}'. Valid options: ${validCollections.join(', ')}`);
    process.exit(1);
  }
  
  createFocusItems(focusFile, targetCollection, customBasePath);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { createFocusItems, extractAbilitiesFromTiers, normalizeId };