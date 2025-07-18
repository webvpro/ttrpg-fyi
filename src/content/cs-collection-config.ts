import { glob } from 'astro/loaders';
import { defineCollection, z } from "astro:content";
import fs from 'fs';
import path from 'path';

// Debug: Check if content directories actually exist
console.log('=== CS COLLECTION CONFIG DEBUG ===');
const baseContentPath = 'src/content/compendiums/csrd/en';
console.log('Checking base path:', baseContentPath);
console.log('Base path exists:', fs.existsSync(baseContentPath));

if (fs.existsSync(baseContentPath)) {
  const directories = fs.readdirSync(baseContentPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  console.log('Available directories:', directories);
}

// A generic base schema that allows for common fields and any other fields.
// This provides flexibility while ensuring core fields like 'title' are present.
const baseSchema = z.object({
    title: z.string(),
    aliases: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    collection: z.string().optional(),
    kind: z.string().optional(),
  }).passthrough(); // .passthrough() allows any other fields without validation.


// Debug each collection as it's created
const createDebugCollection = (name, basePath) => {
  const fullPath = path.join(process.cwd(), basePath);
  console.log(`Creating collection "${name}" from: ${basePath}`);
  console.log(`Full path: ${fullPath}`);
  console.log(`Path exists: ${fs.existsSync(fullPath)}`);
  
  if (fs.existsSync(fullPath)) {
    const files = fs.readdirSync(fullPath).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    console.log(`Files found in ${name}:`, files.length);
  }

  return defineCollection({
    schema: baseSchema,
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: basePath,
    })
  });
};

// Collection for: abilities
const abilities = createDebugCollection('abilities', 'src/content/compendiums/csrd/en/abilities');
// Collection for: artifacts
const artifacts = createDebugCollection('artifacts', 'src/content/compendiums/csrd/en/artifacts');
// Collection for: cantrips
const cantrips = createDebugCollection('cantrips', 'src/content/compendiums/csrd/en/cantrips');
// Collection for: character-arcs
const characterarcs = createDebugCollection('characterarcs', 'src/content/compendiums/csrd/en/character-arcs');
// Collection for: character-options
const characteroptions = createDebugCollection('characteroptions', 'src/content/compendiums/csrd/en/character-options');
// Collection for: creatures-npcs
const creaturesnpcs = createDebugCollection('creaturesnpcs', 'src/content/compendiums/csrd/en/creatures-npcs');
// Collection for: cypher-shorts-scenarios
const cyphershortsscenarios = createDebugCollection('cyphershortsscenarios', 'src/content/compendiums/csrd/en/cypher-shorts-scenarios');
// Collection for: cyphers
const cyphers = createDebugCollection('cyphers', 'src/content/compendiums/csrd/en/cyphers');
// Collection for: descriptors
const descriptors = createDebugCollection('descriptors', 'src/content/compendiums/csrd/en/descriptors');
// Collection for: equipment
const equipment = createDebugCollection('equipment', 'src/content/compendiums/csrd/en/equipment');
// Collection for: flavors
const flavors = createDebugCollection('flavors', 'src/content/compendiums/csrd/en/flavors');
// Collection for: foci
const foci = createDebugCollection('foci', 'src/content/compendiums/csrd/en/foci');
// Collection for: rituals
const rituals = createDebugCollection('rituals', 'src/content/compendiums/csrd/en/rituals');
// Collection for: rules
const rules = createDebugCollection('rules', 'src/content/compendiums/csrd/en/rules');
// Collection for: skill-lists
const skilllists = createDebugCollection('skilllists', 'src/content/compendiums/csrd/en/skill-lists');
// Collection for: stats
const stats = createDebugCollection('stats', 'src/content/compendiums/csrd/en/stats');
// Collection for: tables
const tables = createDebugCollection('tables', 'src/content/compendiums/csrd/en/tables');
// Collection for: types
const types = createDebugCollection('types', 'src/content/compendiums/csrd/en/types');

// Export all the generated collections for Astro.
export const collections = {
  abilities,
  artifacts,
  cantrips,
  characterarcs,
  characteroptions,
  creaturesnpcs,
  cyphershortsscenarios,
  cyphers,
  descriptors,
  equipment,
  flavors,
  foci,
  rituals,
  rules,
  skilllists,
  stats,
  tables,
  types,
};

console.log('CS Collections exported:', Object.keys(collections));

