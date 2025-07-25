import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CSRD_ROOT = path.join(__dirname, 'src', 'content', 'compendiums', 'csrd', 'en');
const TABLES_DIR = path.join(CSRD_ROOT, 'tables');
const CYPHERS_DIR = path.join(CSRD_ROOT, 'cyphers');

// Get command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('❌ Usage: node update-categories.mjs <table-file> <category>');
    console.log('   Example: node update-categories.mjs fairytale.md "Fairy-Tale"');
    console.log('   Example: node update-categories.mjs weird-west-cyphers.md "Weird-West"');
    process.exit(1);
}

const tableFileName = args[0];
const categoryToAdd = args[1];

// Function to extract table references from markdown content
function extractTableReferences(content) {
    const references = [];
    
    // Match markdown links like [Adderstone](Adderstone.md)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\.md\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
        const linkText = match[1];
        const filename = match[2];
        
        references.push({
            text: linkText,
            filename: filename,
            // Convert filename to kebab-case for matching
            kebabCase: filename.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        });
    }
    
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

// Function to update cypher categories based on table
function updateCypherCategories(tableName, tableCategory, references) {
    let updatedCount = 0;
    
    console.log(`\nProcessing table: ${tableName}`);
    console.log(`Adding category: "${tableCategory}"`);
    console.log(`Looking for ${references.length} cypher references...`);
    
    for (const ref of references) {
        const cypherPath = path.join(CYPHERS_DIR, `${ref.kebabCase}.md`);
        
        if (fs.existsSync(cypherPath)) {
            try {
                const content = fs.readFileSync(cypherPath, 'utf8');
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
                    fs.writeFileSync(cypherPath, newContent, 'utf8');
                    
                    console.log(`  ✅ Updated ${ref.kebabCase}.md - added category: ${tableCategory}`);
                    updatedCount++;
                } else {
                    console.log(`  ℹ️  ${ref.kebabCase}.md already has category: ${tableCategory}`);
                }
                
            } catch (error) {
                console.error(`  ❌ Error processing ${ref.kebabCase}.md:`, error.message);
            }
        } else {
            console.log(`  ⚠️  Cypher file not found: ${ref.kebabCase}.md`);
        }
    }
    
    return updatedCount;
}

// Main function
function main() {
    console.log('🚀 Starting cypher category updater...');
    console.log(`Tables directory: ${TABLES_DIR}`);
    console.log(`Cyphers directory: ${CYPHERS_DIR}`);
    console.log(`Target table: ${tableFileName}`);
    console.log(`Category to add: "${categoryToAdd}"`);
    
    if (!fs.existsSync(TABLES_DIR)) {
        console.error('❌ Tables directory not found:', TABLES_DIR);
        return;
    }
    
    if (!fs.existsSync(CYPHERS_DIR)) {
        console.error('❌ Cyphers directory not found:', CYPHERS_DIR);
        return;
    }
    
    // Check if table file exists
    const tablePath = path.join(TABLES_DIR, tableFileName);
    if (!fs.existsSync(tablePath)) {
        console.error(`❌ Table file not found: ${tablePath}`);
        console.log('\nAvailable table files:');
        const tableFiles = fs.readdirSync(TABLES_DIR).filter(file => file.endsWith('.md'));
        tableFiles.forEach(file => console.log(`  - ${file}`));
        return;
    }
    
    try {
        const content = fs.readFileSync(tablePath, 'utf8');
        const { frontmatter } = parseFrontmatter(content);
        
        if (!frontmatter) {
            console.log(`⚠️  No frontmatter in ${tableFileName}, continuing anyway...`);
        }
        
        // Extract references from table content
        const references = extractTableReferences(content);
        
        if (references.length === 0) {
            console.log(`❌ No cypher references found in ${tableFileName}`);
            console.log('   Make sure the table contains markdown links like [Cypher Name](Cypher-Name.md)');
            return;
        }
        
        console.log(`\nFound ${references.length} cypher references:`);
        references.slice(0, 5).forEach(ref => console.log(`  - ${ref.text} (${ref.kebabCase}.md)`));
        if (references.length > 5) {
            console.log(`  ... and ${references.length - 5} more`);
        }
        
        // Update cypher categories
        const updated = updateCypherCategories(tableFileName, categoryToAdd, references);
        
        console.log(`\n🎉 Complete! Updated ${updated} cypher files with category "${categoryToAdd}".`);
        
    } catch (error) {
        console.error(`❌ Error processing table ${tableFileName}:`, error.message);
    }
}

// Run the script
main();