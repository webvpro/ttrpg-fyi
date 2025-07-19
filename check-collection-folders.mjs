import { readdir, writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the pages directory
const pagesDir = join(__dirname, 'src', 'pages', 'compendium', 'csrd');

function createListPageTemplate(folderName, collectionName) {
  const displayName = folderName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return `---
// This file is auto-generated. Do not edit.
import { getCollection } from 'astro:content';
import Layout from '../../../../layouts/Layout.astro';
import CollectionList from '../../../../components/ttrpg/CollectionList.vue';

export const prerender = true;

export async function getStaticPaths() {
  return [
    { params: { page: undefined } },
  ];
}

const entries = await getCollection('${collectionName.toLowerCase().replace(/[-\s]/g, '')}');

// Transform the entries to simple data objects
const entriesData = entries.map(entry => ({
  id: entry.id,
  title: entry.data.title,
  ...entry.data // spread any other data properties
}));

const pageTitle = "${displayName}";
const pageDescription = "A complete list of all ${folderName.replace(/-/g, ' ')}";
---

<Layout title={pageTitle} description={pageDescription}>
       
    <h1 class="text-4xl font-bold mb-6">{pageTitle}</h1>
    

  <CollectionList 
    entries={entriesData}
    collectionName="${collectionName.toLowerCase()}"
    folderName="${folderName}"
    pageTitle={pageTitle}
    pageDescription={pageDescription}
    showDebug={import.meta.env.DEV}
    client:load
  />
</Layout>
`;
}

async function updateAllCSRDPages() {
  try {
    console.log('🔍 Finding all CSRD collection directories...');
    
    // Read all items in the CSRD pages directory
    const items = await readdir(pagesDir, { withFileTypes: true });
    
    // Filter for directories only
    const collectionDirs = items
      .filter(item => item.isDirectory())
      .map(item => item.name);
    
    console.log(`📁 Found ${collectionDirs.length} collection directories:`, collectionDirs);
    
    let successCount = 0;
    let errorCount = 0;
    
    // Process each directory
    for (const folderName of collectionDirs) {
      console.log(`\n📂 Processing: ${folderName}`);
      
      const collectionName = folderName; // Use folder name as collection name
      const pageDir = join(pagesDir, folderName);
      const listPagePath = join(pageDir, '[...page].astro');
      
      try {
        const listPageContent = createListPageTemplate(folderName, collectionName);
        await writeFile(listPagePath, listPageContent, 'utf8');
        console.log(`  ✅ Updated: ${listPagePath}`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Failed to update ${folderName}: ${error.message}`);
        errorCount++;
      }
    }
    
    console.log(`\n🎉 Update complete!`);
    console.log(`  ✅ Successfully updated: ${successCount} files`);
    if (errorCount > 0) {
      console.log(`  ❌ Failed updates: ${errorCount} files`);
    }
    
    console.log(`\n📋 Updated pages:`);
    for (const folderName of collectionDirs) {
      console.log(`  • /compendium/csrd/${folderName} - [${folderName}]`);
    }
    
  } catch (error) {
    console.error('❌ Error reading CSRD directory:', error);
    console.log(`Make sure this path exists: ${pagesDir}`);
  }
}

// Run the script
updateAllCSRDPages();