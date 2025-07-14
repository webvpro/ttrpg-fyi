import fs from 'fs';
import path from 'path';

// --- Configuration ---
const CONFIG_FILE_PATH = path.join(process.cwd(), 'src', 'content', 'cs-collection-config.ts');
const PAGES_BASE_PATH = path.join(process.cwd(), 'src', 'pages', 'compendium', 'csrd');
const LAYOUT_PATH = '../../../../layouts/Layout.astro'; // Relative path from the generated files
// --- End Configuration ---

/**
 * Template for the collection's index page ([...page].astro).
 */
const getIndexPageTemplate = (collectionName) => `---
// This file is auto-generated. Do not edit.
import { getCollection, type CollectionEntry } from 'astro:content';
import Layout from '${LAYOUT_PATH}';

export const prerender = true;

export async function getStaticPaths() {
  return [
    { params: { page: undefined } },
  ];
}

const entries = await getCollection('${collectionName}');
const pageTitle = "${collectionName.charAt(0).toUpperCase() + collectionName.slice(1)}";
const pageDescription = "A complete list of all ${collectionName}";
---
<Layout title={pageTitle} description={pageDescription}>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-6">{pageTitle}</h1>
    <ul class="space-y-2">
      {entries.map((entry: CollectionEntry<'${collectionName}'>) => (
        <li>
          <a href={\`/compendium/csrd/${collectionName}/\${entry.id}\`} class="text-lg text-blue-600 hover:underline">
            {entry.data.title}
          </a>
        </li>
      ))}
    </ul>
  </div>
</Layout>
`;

/**
 * Template for the collection's detail page ([slug].astro).
 */
const getSlugPageTemplate = (collectionName) => `---
// This file is auto-generated. Do not edit.
import { getCollection, getEntry, render } from 'astro:content';
import Layout from '${LAYOUT_PATH}';

export const prerender = true;

export async function getStaticPaths() {
  const entries = await getCollection('${collectionName}');
  return entries.map(entry => ({
    params: { slug: entry.id }, // Changed to use id instead of slug
  }));
}

const { slug } = Astro.params;
const entry = await getEntry('${collectionName}', slug);

if (!entry) {
  return new Response(null, { status: 404 });
}

// Render the entry's content
const { Content } = await render(entry);
---
<Layout title={entry.data.title} description={entry.data.title}>
  <article class="prose lg:prose-xl mx-auto py-8">
    <h1>{entry.data.title}</h1>
    
    {/* Use the Content component to render the markdown */}
    <Content />
    
    <div class="metadata mt-8 border-t pt-4">
      {entry.data.type && <p><strong>Type:</strong> {entry.data.type}</p>}
      {entry.data.level && <p><strong>Level:</strong> {entry.data.level}</p>}
      {entry.data.source && <p><strong>Source:</strong> {entry.data.source}</p>}
    </div>
  </article>
</Layout>
`;

/**
 * Extracts collection names from the config file content.
 */
function getCollectionNames(fileContent) {
  const match = fileContent.match(/export const collections = \{([\s\S]*?)\};/);
  if (!match || !match[1]) {
    console.error('Could not find the "export const collections" block in the config file.');
    return [];
  }
  return match[1].split(',').map(key => key.trim()).filter(Boolean);
}

/**
 * Creates a file with the given content, ensuring the directory exists.
 */
function createFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Force overwrite existing files
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Created/Updated: ${path.relative(process.cwd(), filePath)}`);
}

/**
 * Main function to run the script.
 */
function main() {
  console.log('Starting to create/update collection page directories and files...');

  if (!fs.existsSync(CONFIG_FILE_PATH)) {
    console.error(`Error: Config file not found at "${CONFIG_FILE_PATH}".`);
    return;
  }

  const fileContent = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');
  const collectionNames = getCollectionNames(fileContent);

  if (collectionNames.length === 0) {
    console.warn('Warning: No collection names found in the config file.');
    return;
  }

  console.log(`Found ${collectionNames.length} collections to process.`);

  for (const name of collectionNames) {
    const collectionDirPath = path.join(PAGES_BASE_PATH, name);
    if (!fs.existsSync(collectionDirPath)) {
      fs.mkdirSync(collectionDirPath, { recursive: true });
    }

    const indexPagePath = path.join(collectionDirPath, '[...page].astro');
    createFile(indexPagePath, getIndexPageTemplate(name));

    const slugPagePath = path.join(collectionDirPath, '[slug].astro');
    createFile(slugPagePath, getSlugPageTemplate(name));
  }

  console.log('\nScript finished.');
}

main();