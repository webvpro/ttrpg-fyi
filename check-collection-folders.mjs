import fs from 'fs';
import path from 'path';

const BASE_PATH = 'src/content/compendiums/csrd/en';
const CONFIG_FILE = 'src/content/cs-collection-config.ts';
const PAGES_DIR = 'src/pages/compendium/csrd';

console.log('🔍 Scanning for CSRD collections...\n');

function scanCollections() {
  if (!fs.existsSync(BASE_PATH)) {
    console.log(`❌ Base path does not exist: ${BASE_PATH}`);
    return [];
  }

  const folders = fs.readdirSync(BASE_PATH, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const validCollections = [];

  for (const folder of folders) {
    const folderPath = path.join(BASE_PATH, folder);
    const files = fs.readdirSync(folderPath);
    const mdFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    
    if (mdFiles.length > 0) {
      validCollections.push({
        folderName: folder,
        collectionName: folder.replace(/-/g, '').toLowerCase(),
        fileCount: mdFiles.length
      });
      console.log(`✅ ${folder}: ${mdFiles.length} files → collection: ${folder.replace(/-/g, '').toLowerCase()}`);
    } else {
      console.log(`⚠️  ${folder}: empty (no .md files)`);
    }
  }

  return validCollections;
}

function generateConfigFile(collections) {
  const configContent = `import { glob } from 'astro/loaders';
import { defineCollection, z } from "astro:content";

// More permissive schema for all collections
const baseSchema = z.object({
  title: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  collection: z.string().optional(),
  kind: z.string().optional(),
}).passthrough().transform((data) => {
  // Ensure we always have a title
  if (!data.title && data.id && typeof data.id === 'string') {
    data.title = data.id.replace(/-/g, ' ').replace(/\\b\\w/g, l => l.toUpperCase());
  }
  return data;
});

const createCollection = (basePath, collectionName) => {
  console.log(\`Creating \${collectionName} collection with path: \${basePath}\`);
  return defineCollection({
    schema: baseSchema,
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: basePath,
    })
  });
};

// Auto-generated collections (only folders with .md files)
${collections.map(c => 
  `const ${c.collectionName} = createCollection('src/content/compendiums/csrd/en/${c.folderName}', '${c.collectionName}');`
).join('\n')}

// Export all collections
export const collections = {
${collections.map(c => `  ${c.collectionName},`).join('\n')}
};

console.log('CSRD Collections created:', Object.keys(collections));
`;

  fs.writeFileSync(CONFIG_FILE, configContent, 'utf-8');
  console.log(`\n✅ Generated new config file: ${CONFIG_FILE}`);
}

function createSlugPageTemplate(folderName, collectionName) {
  const displayName = folderName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
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
        ← Back to ${displayName}
      </a>
    </div>
    
    <article class="prose lg:prose-xl max-w-none">
      <h1>{entry.data.title || entry.id}</h1>
      
      {content ? (
        <div set:html={content}></div>
      ) : (
        <div class="bg-yellow-100 border border-yellow-400 p-4 rounded">
          <p class="text-yellow-800">No content available for this entry.</p>
          <details class="mt-2">
            <summary class="cursor-pointer text-sm">Debug Info</summary>
            <pre class="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify({
              id: entry.id,
              hasData: !!entry.data,
              hasRendered: !!entry.rendered,
              hasHtml: !!entry.rendered?.html,
              htmlLength: entry.rendered?.html ? entry.rendered.html.length : 0,
              dataKeys: entry.data ? Object.keys(entry.data) : [],
              entryKeys: Object.keys(entry)
            }, null, 2)}</pre>
          </details>
        </div>
      )}
    </article>
  </div>
</Layout>

<style>
  /* Custom table styling using Tailwind @apply */
  .prose .custom-table {
    @apply mt-4 mb-4 border-collapse w-full;
  }
  
  .prose .custom-table th {
    @apply border-0 p-3 text-left;
  }
  
  .prose .custom-table td {
    @apply border-0 p-3;
  }
  
  /* Override prose table margins specifically for DaisyUI tables */
  .prose .table {
    @apply my-4;
  }
</style>
`;
}

function createListPageTemplate(folderName, collectionName) {
  const displayName = folderName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return `---
// This file is auto-generated. Do not edit.
import { getCollection, type CollectionEntry } from 'astro:content';
import Layout from '../../../../layouts/Layout.astro';

export const prerender = true;

export async function getStaticPaths() {
  return [
    { params: { page: undefined } },
  ];
}

// DEBUG: Let's see what's happening
const entries = await getCollection('${collectionName}');
console.log('=== ${displayName.toUpperCase()} PAGE DEBUG ===');
console.log('Entries found:', entries.length);
console.log('First few entries:', entries.slice(0, 3).map(e => ({ id: e.id, title: e.data.title })));

const pageTitle = "${displayName}";
const pageDescription = "A complete list of all ${folderName.replace(/-/g, ' ')}";
---
<Layout title={pageTitle} description={pageDescription}>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6">{pageTitle}</h1>
    
    <!-- DEBUG INFO -->
    <div class="mb-4 p-4 bg-yellow-100 border rounded">
      <p><strong>Debug:</strong> Found {entries.length} ${folderName.replace(/-/g, ' ')}</p>
      {entries.length === 0 && (
        <p class="text-red-600">No ${folderName.replace(/-/g, ' ')} found! Check collection configuration.</p>
      )}
    </div>

    {entries.length > 0 ? (
      <ul class="space-y-2">
        {entries.map((entry: CollectionEntry<'${collectionName}'>) => (
          <li>
            <a href={\`/compendium/csrd/${folderName}/\${entry.id}\`} class="text-lg text-blue-600 hover:underline">
              {entry.data.title || entry.id}
            </a>
          </li>
        ))}
      </ul>
    ) : (
      <div class="p-4 bg-red-100 border border-red-400 rounded">
        <p class="text-red-700">No ${folderName.replace(/-/g, ' ')} found. This could be due to:</p>
        <ul class="list-disc list-inside mt-2 text-red-600">
          <li>Collection configuration error</li>
          <li>File path mismatch</li>
          <li>Invalid frontmatter in markdown files</li>
        </ul>
      </div>
    )}
  </div>
</Layout>
`;
}

function fixPageFile(filePath, folderName, collectionName) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    // Pattern to find getCollection calls with wrong collection names
    const patterns = [
      {
        regex: new RegExp(`getCollection\\('${folderName}'\\)`, 'g'),
        replacement: `getCollection('${collectionName}')`
      },
      {
        regex: new RegExp(`getCollection\\("${folderName}"\\)`, 'g'),
        replacement: `getCollection("${collectionName}")`
      },
      {
        regex: new RegExp(`CollectionEntry<'${folderName}'>`, 'g'),
        replacement: `CollectionEntry<'${collectionName}'>`
      },
      {
        regex: new RegExp(`CollectionEntry<"${folderName}">`, 'g'),
        replacement: `CollectionEntry<"${collectionName}">`
      },
      {
        regex: new RegExp(`getEntry\\('${folderName}',`, 'g'),
        replacement: `getEntry('${collectionName}',`
      },
      {
        regex: new RegExp(`getEntry\\("${folderName}",`, 'g'),
        replacement: `getEntry("${collectionName}",`
      },
      // FIX: Replace wrong URL paths in href attributes
      {
        regex: new RegExp(`/compendium/csrd/${collectionName}/`, 'g'),
        replacement: `/compendium/csrd/${folderName}/`
      },
      {
        regex: new RegExp(`\\\`/compendium/csrd/${collectionName}/\\\$\\{`, 'g'),
        replacement: `\`/compendium/csrd/${folderName}/\${`
      }
    ];

    for (const pattern of patterns) {
      if (pattern.regex.test(content)) {
        content = content.replace(pattern.regex, pattern.replacement);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ Fixed: ${path.relative(process.cwd(), filePath)}`);
      console.log(`   Changed URLs to use folder name '${folderName}' instead of collection name '${collectionName}'`);
      return true;
    } else {
      console.log(`✓ No changes needed: ${path.relative(process.cwd(), filePath)}`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function createMissingPages(collections) {
  console.log('\n🔧 Creating missing page files...\n');
  
  let totalCreated = 0;

  for (const collection of collections) {
    const { folderName, collectionName } = collection;
    
    console.log(`📁 Processing ${folderName} → ${collectionName}`);
    
    const pageFolderPath = path.join(PAGES_DIR, folderName);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(pageFolderPath)) {
      fs.mkdirSync(pageFolderPath, { recursive: true });
      console.log(`   Created directory: ${pageFolderPath}`);
    }

    // Create [slug].astro if it doesn't exist
    const slugPagePath = path.join(pageFolderPath, '[slug].astro');
    if (!fs.existsSync(slugPagePath)) {
      const slugTemplate = createSlugPageTemplate(folderName, collectionName);
      fs.writeFileSync(slugPagePath, slugTemplate, 'utf-8');
      console.log(`   ✅ Created: [slug].astro`);
      totalCreated++;
    }

    // Create [...page].astro if it doesn't exist
    const listPagePath = path.join(pageFolderPath, '[...page].astro');
    if (!fs.existsSync(listPagePath)) {
      const listTemplate = createListPageTemplate(folderName, collectionName);
      fs.writeFileSync(listPagePath, listTemplate, 'utf-8');
      console.log(`   ✅ Created: [...page].astro`);
      totalCreated++;
    }
  }

  console.log(`\n✨ Created ${totalCreated} new page files!`);
}

function fixAllPageFiles(collections) {
  console.log('\n🔧 Fixing existing page files...\n');
  
  let totalFixed = 0;

  for (const collection of collections) {
    const { folderName, collectionName } = collection;
    
    console.log(`📁 Processing ${folderName} → ${collectionName}`);
    
    const pageFolderPath = path.join(PAGES_DIR, folderName);
    
    if (fs.existsSync(pageFolderPath)) {
      const pageFiles = [
        path.join(pageFolderPath, '[...page].astro'),
        path.join(pageFolderPath, '[slug].astro'),
        path.join(pageFolderPath, 'index.astro')
      ];

      for (const pageFile of pageFiles) {
        if (fs.existsSync(pageFile)) {
          if (fixPageFile(pageFile, folderName, collectionName)) {
            totalFixed++;
          }
        }
      }
    }
  }

  console.log(`\n✨ Fixed ${totalFixed} existing page files!`);
}

// Also add a function to fix existing broken slug pages
function fixBrokenSlugPages(collections) {
  console.log('\n🔧 Fixing ALL [slug].astro pages...\n');
  
  let totalFixed = 0;

  for (const collection of collections) {
    const { folderName, collectionName } = collection;
    
    const pageFolderPath = path.join(PAGES_DIR, folderName);
    const slugPagePath = path.join(pageFolderPath, '[slug].astro');
    
    if (fs.existsSync(slugPagePath)) {
      console.log(`🔧 Replacing: ${folderName}/[slug].astro`);
      
      // Always replace with the new template that handles multiple render methods
      const fixedTemplate = createSlugPageTemplate(folderName, collectionName);
      fs.writeFileSync(slugPagePath, fixedTemplate, 'utf-8');
      
      console.log(`✅ Fixed: ${slugPagePath}`);
      totalFixed++;
    }
  }

  console.log(`\n✨ Fixed ${totalFixed} slug pages!`);
}

// Update the main execution part
const validCollections = scanCollections();

if (validCollections.length > 0) {
  console.log(`\n📝 Found ${validCollections.length} valid collections:`);
  validCollections.forEach(c => {
    console.log(`   ${c.collectionName} (${c.folderName}) - ${c.fileCount} files`);
  });
  
  generateConfigFile(validCollections);
  createMissingPages(validCollections);
  fixBrokenSlugPages(validCollections); // Add this line
  fixAllPageFiles(validCollections);
  
  console.log('\n🎉 Config and page files updated!');
  console.log('\n📍 Correct URL Structure:');
  validCollections.forEach(c => {
    console.log(`   📄 List: http://localhost:4321/compendium/csrd/${c.folderName}`);
    console.log(`   📖 Item: http://localhost:4321/compendium/csrd/${c.folderName}/[item-id]`);
    console.log('');
  });
  
  console.log('Now commit and deploy:');
  console.log('  git add .');
  console.log('  git commit -m "fix: correct URLs and fix broken entry.render calls"');
  console.log('  git push');
} else {
  console.log('\n❌ No valid collections found. Check your folder structure.');
}