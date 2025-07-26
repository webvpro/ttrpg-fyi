import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CSRD_ROOT = path.join(__dirname, 'src', 'content', 'compendiums', 'csrd', 'en');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 3) {
    console.log('❌ Usage: node update-categories.mjs <source-dir> <table-file> <target-dir> [category]');
    console.log('   Examples:');
    console.log('     node update-categories.mjs tables fairytale.md cyphers "Fairy-Tale"');
    console.log('     node update-categories.mjs tables weird-west-artifacts.md artifacts "Weird-West"');
    console.log('     node update-categories.mjs character-options superhero-abilities.md abilities "Superhero"');
    console.log('     node update-categories.mjs rules combat-rules.md rules');
    console.log('   Note: category is optional - if not provided, no categories will be updated');
    process.exit(1);
}

const sourceDir = args[0];
const tableFileName = args[1];
const targetDir = args[2];
const categoryToAdd = args[3]; // Optional

const SOURCE_DIR = path.join(CSRD_ROOT, sourceDir);
const TARGET_DIR = path.join(CSRD_ROOT, targetDir);

// Function to get all available directories in CSRD
function getAvailableDirectories() {
    try {
        return fs.readdirSync(CSRD_ROOT).filter(dir => {
            const dirPath = path.join(CSRD_ROOT, dir);
            return fs.statSync(dirPath).isDirectory();
        });
    } catch (error) {
        return [];
    }
}

// Function to extract table references from markdown content
function extractTableReferences(content) {
    const references = [];
    
    console.log('🔍 Searching for table references...');
    
    // Match markdown links like [Name](filename.md)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\.md\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
        const linkText = match[1];
        const filename = match[2];
        
        console.log(`Found link: "${linkText}" -> "${filename}.md"`);
        
        references.push({
            text: linkText,
            filename: filename,
            // Convert filename to kebab-case for matching
            kebabCase: filename.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        });
    }
    
    console.log(`📊 Total references found: ${references.length}`);
    return references;
}

// Function to read and parse frontmatter
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
        return { frontmatter: null, body: content };
    }
    
    const frontmatterText = match[1];
    const body = match[2];
    
    // Parse YAML-like frontmatter
    const frontmatter = {};
    const lines = frontmatterText.split('\n');
    let currentKey = null;
    let currentArray = null;
    
    for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine.startsWith('- ')) {
            // Array item
            if (currentArray) {
                currentArray.push(trimmedLine.substring(2));
            }
        } else if (trimmedLine.includes(':')) {
            // Key-value pair
            const colonIndex = trimmedLine.indexOf(':');
            const key = trimmedLine.substring(0, colonIndex).trim();
            const value = trimmedLine.substring(colonIndex + 1).trim();
            
            currentKey = key;
            currentArray = null;
            
            if (value === '') {
                // Empty value, might be start of array
                frontmatter[key] = [];
                currentArray = frontmatter[key];
            } else {
                frontmatter[key] = value;
            }
        }
    }
    
    return { frontmatter, body };
}

// Function to serialize frontmatter back to YAML
function serializeFrontmatter(frontmatter) {
    let yaml = '';
    
    for (const [key, value] of Object.entries(frontmatter)) {
        if (Array.isArray(value)) {
            yaml += `${key}:\n`;
            for (const item of value) {
                yaml += `  - ${item}\n`;
            }
        } else {
            yaml += `${key}: ${value}\n`;
        }
    }
    
    return yaml;
}

// Function to update item categories based on table
function updateItemCategories(tableName, tableCategory, references, targetDirName) {
    let updatedCount = 0;
    
    console.log(`\nProcessing table: ${tableName}`);
    console.log(`Target directory: ${targetDirName}`);
    if (tableCategory) {
        console.log(`Adding category: "${tableCategory}"`);
    } else {
        console.log('No category to add - just checking references');
    }
    console.log(`Looking for ${references.length} file references...`);
    
    for (const ref of references) {
        const itemPath = path.join(TARGET_DIR, `${ref.kebabCase}.md`);
        
        console.log(`  🔍 Checking: ${ref.kebabCase}.md`);
        
        if (fs.existsSync(itemPath)) {
            if (!tableCategory) {
                console.log(`  ✅ Found ${ref.kebabCase}.md`);
                continue;
            }
            
            try {
                const content = fs.readFileSync(itemPath, 'utf8');
                const { frontmatter, body } = parseFrontmatter(content);
                
                if (!frontmatter) {
                    console.log(`  ⚠️  No frontmatter found in ${ref.kebabCase}.md`);
                    continue;
                }
                
                // Initialize categories if it doesn't exist
                if (!frontmatter.categories) {
                    frontmatter.categories = [];
                } else if (!Array.isArray(frontmatter.categories)) {
                    frontmatter.categories = [frontmatter.categories];
                }
                
                // Add the table category if not already present
                if (!frontmatter.categories.includes(tableCategory)) {
                    frontmatter.categories.push(tableCategory);
                    
                    // Reconstruct the file
                    const newContent = `---\n${serializeFrontmatter(frontmatter)}---\n${body}`;
                    fs.writeFileSync(itemPath, newContent, 'utf8');
                    
                    console.log(`  ✅ Updated ${ref.kebabCase}.md - added category: ${tableCategory}`);
                    updatedCount++;
                } else {
                    console.log(`  ℹ️  ${ref.kebabCase}.md already has category: ${tableCategory}`);
                }
                
            } catch (error) {
                console.error(`  ❌ Error processing ${ref.kebabCase}.md:`, error.message);
            }
        } else {
            console.log(`  ⚠️  File not found: ${ref.kebabCase}.md`);
            
            // Try to find similar files
            try {
                const files = fs.readdirSync(TARGET_DIR);
                const similarFiles = files.filter(file => 
                    file.toLowerCase().includes(ref.kebabCase.substring(0, 5)) ||
                    ref.kebabCase.includes(file.replace('.md', '').substring(0, 5))
                );
                
                if (similarFiles.length > 0) {
                    console.log(`    💡 Similar files found: ${similarFiles.slice(0, 3).join(', ')}`);
                }
            } catch (e) {
                // Ignore errors when looking for similar files
            }
        }
    }
    
    return updatedCount;
}

// Main function
function main() {
    console.log('🚀 Starting CSRD reference updater...');
    console.log(`CSRD root: ${CSRD_ROOT}`);
    console.log(`Source directory: ${sourceDir}`);
    console.log(`Table file: ${tableFileName}`);
    console.log(`Target directory: ${targetDir}`);
    if (categoryToAdd) {
        console.log(`Category to add: "${categoryToAdd}"`);
    } else {
        console.log('Mode: Reference checking only (no category updates)');
    }
    
    // Check if source directory exists
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`❌ Source directory not found: ${SOURCE_DIR}`);
        console.log('Available directories:');
        const availableDirs = getAvailableDirectories();
        availableDirs.forEach(dir => console.log(`  - ${dir}`));
        return;
    }
    
    // Check if target directory exists
    if (!fs.existsSync(TARGET_DIR)) {
        console.error(`❌ Target directory not found: ${TARGET_DIR}`);
        console.log('Available directories:');
        const availableDirs = getAvailableDirectories();
        availableDirs.forEach(dir => console.log(`  - ${dir}`));
        return;
    }
    
    // Check if table file exists
    const tablePath = path.join(SOURCE_DIR, tableFileName);
    if (!fs.existsSync(tablePath)) {
        console.error(`❌ Table file not found: ${tablePath}`);
        console.log(`\nAvailable files in ${sourceDir}:`);
        try {
            const files = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith('.md'));
            files.forEach(file => console.log(`  - ${file}`));
        } catch (error) {
            console.log('  Unable to read directory');
        }
        return;
    }
    
    try {
        console.log(`📖 Reading table file: ${tablePath}`);
        const content = fs.readFileSync(tablePath, 'utf8');
        const { frontmatter } = parseFrontmatter(content);
        
        // Extract references from table content
        const references = extractTableReferences(content);
        
        if (references.length === 0) {
            console.log(`❌ No file references found in ${tableFileName}`);
            console.log(`   Make sure the table contains markdown links like [Item Name](Item-Name.md)`);
            
            // Show a sample of the content for debugging
            console.log('\n📝 Table content sample:');
            const lines = content.split('\n').slice(0, 10);
            lines.forEach((line, i) => console.log(`${i + 1}: ${line}`));
            
            return;
        }
        
        console.log(`\nFound ${references.length} file references:`);
        references.slice(0, 5).forEach(ref => console.log(`  - ${ref.text} (${ref.kebabCase}.md)`));
        if (references.length > 5) {
            console.log(`  ... and ${references.length - 5} more`);
        }
        
        // Update item categories
        const updated = updateItemCategories(tableFileName, categoryToAdd, references, targetDir);
        
        if (categoryToAdd) {
            console.log(`\n🎉 Complete! Updated ${updated} files with category "${categoryToAdd}".`);
        } else {
            console.log(`\n🎉 Complete! Checked ${references.length} file references.`);
        }
        
    } catch (error) {
        console.error(`❌ Error processing table ${tableFileName}:`, error.message);
        console.error('Stack trace:', error.stack);
    }
}

// Run the script
main();