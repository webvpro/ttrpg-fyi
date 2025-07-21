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

const entries = await getCollection('${collectionName}');

// Transform the entries to simple data objects
const entriesData = entries.map(entry => ({
  id: entry.id,
  title: entry.data.title,
  rendered: entry.rendered, // IMPORTANT: Include rendered content
  ...entry.data // spread any other data properties
}));

const pageTitle = "${displayName}";
const pageDescription = "A complete list of all ${folderName.replace(/-/g, ' ')}";
---

<Layout title={pageTitle} description={pageDescription}>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-6">{pageTitle}</h1>
    
    <CollectionList 
      entries={entriesData}
      collectionName="${collectionName}"
      folderName="${folderName}"
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      showDebug={import.meta.env.DEV}
      client:load
    />
  </div>
</Layout>
`;
}

function createSlugPageTemplate(folderName, collectionName) {
  return `---
import { getCollection, type CollectionEntry } from 'astro:content';
import Layout from '../../../../layouts/Layout.astro';

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('${collectionName}');
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

type Props = {
  entry: CollectionEntry<'${collectionName}'>;
};

const { entry } = Astro.props;

// For glob-loaded collections, access the rendered HTML
let content = entry.rendered.html || '';

// Add simple DaisyUI table classes if content contains tables
if (content && content.includes('<table')) {
  content = content.replace(/<table([^>]*?)>/g, '<table$1 class="table table-zebra custom-table">');
}
---
<Layout title={entry.data.title || entry.id} description={String(entry.data.description || \`Details about \${entry.data.title || entry.id}\`)}>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-6">
      <a href="/compendium/csrd/${folderName}" class="text-blue-600 hover:underline">
        ← Back to ${folderName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </a>
    </div>
    
    <article class="prose lg:prose-xl max-w-none">
      <h1>{entry.data.title || entry.id}</h1>
      
      {content ? (
        <div set:html={content}></div>
      ) : (
        <div class="bg-yellow-100 border border-yellow-400 p-4 rounded">
          <p class="text-yellow-800">No content available for this entry.</p>
        </div>
      )}
    </article>
  </div>
</Layout>

<style>
  .prose .custom-table {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-collapse: collapse;
    width: 100%;
  }
</style>
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
      
      // Remove hyphens and spaces from collection name
      const collectionName = folderName.replace(/[-\s]/g, '');
      console.log(`  📝 Collection name: ${folderName} → ${collectionName}`);
      
      const pageDir = join(pagesDir, folderName);
      const listPagePath = join(pageDir, '[...page].astro');
      const slugPagePath = join(pageDir, '[slug].astro');
      
      try {
        const listPageContent = createListPageTemplate(folderName, collectionName);
        await writeFile(listPagePath, listPageContent, 'utf8');
        console.log(`  ✅ Updated: ${listPagePath}`);
        successCount++;
      } catch (error) {
        console.error(`  ❌ Failed to update ${folderName}: ${error.message}`);
        errorCount++;
      }
      
      try {
        const slugPageContent = createSlugPageTemplate(folderName, collectionName);
        await writeFile(slugPagePath, slugPageContent, 'utf8');
        console.log(`  ✅ Updated: ${slugPagePath}`);
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
    
  } catch (error) {
    console.error('❌ Error reading CSRD directory:', error);
    console.log(`Make sure this path exists: ${pagesDir}`);
  }
}

// Run the script
updateAllCSRDPages();