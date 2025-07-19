import { glob } from 'astro/loaders';
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
    data.title = data.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  return data;
});

const createCollection = (basePath, collectionName) => {
  console.log(`Creating ${collectionName} collection with path: ${basePath}`);
  return defineCollection({
    schema: baseSchema,
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: basePath,
    })
  });
};

// Auto-generated collections (only folders with .md files)
const abilities = createCollection('src/content/compendiums/csrd/en/abilities', 'abilities');
const artifacts = createCollection('src/content/compendiums/csrd/en/artifacts', 'artifacts');
const cantrips = createCollection('src/content/compendiums/csrd/en/cantrips', 'cantrips');
const characterarcs = createCollection('src/content/compendiums/csrd/en/character-arcs', 'characterarcs');
const characteroptions = createCollection('src/content/compendiums/csrd/en/character-options', 'characteroptions');
const creaturesnpcs = createCollection('src/content/compendiums/csrd/en/creatures-npcs', 'creaturesnpcs');
const cyphershortsscenarios = createCollection('src/content/compendiums/csrd/en/cypher-shorts-scenarios', 'cyphershortsscenarios');
const cyphers = createCollection('src/content/compendiums/csrd/en/cyphers', 'cyphers');
const descriptors = createCollection('src/content/compendiums/csrd/en/descriptors', 'descriptors');
const equipment = createCollection('src/content/compendiums/csrd/en/equipment', 'equipment');
const flavors = createCollection('src/content/compendiums/csrd/en/flavors', 'flavors');
const foci = createCollection('src/content/compendiums/csrd/en/foci', 'foci');
const rituals = createCollection('src/content/compendiums/csrd/en/rituals', 'rituals');
const rules = createCollection('src/content/compendiums/csrd/en/rules', 'rules');
const skilllists = createCollection('src/content/compendiums/csrd/en/skill-lists', 'skilllists');
const stats = createCollection('src/content/compendiums/csrd/en/stats', 'stats');
const tables = createCollection('src/content/compendiums/csrd/en/tables', 'tables');
const types = createCollection('src/content/compendiums/csrd/en/types', 'types');

// Export all collections
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

console.log('CSRD Collections created:', Object.keys(collections));
