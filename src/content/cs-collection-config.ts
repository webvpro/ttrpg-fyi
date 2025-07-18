import { glob } from 'astro/loaders';
import { defineCollection, z } from "astro:content";

// A generic base schema that allows for common fields and any other fields.
// This provides flexibility while ensuring core fields like 'title' are present.
const baseSchema = z.object({
    title: z.string(),
    aliases: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    collection: z.string().optional(),
    kind: z.string().optional(),
  }).passthrough(); // .passthrough() allows any other fields without validation.


// Simple collection creation without fs operations
const createCollection = (basePath) => {
  return defineCollection({
    schema: baseSchema,
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: basePath,
    })
  });
};

// Collection for: abilities
const abilities = createCollection('src/content/compendiums/csrd/en/abilities');
// Collection for: artifacts
const artifacts = createCollection('src/content/compendiums/csrd/en/artifacts');
// Collection for: cantrips
const cantrips = createCollection('src/content/compendiums/csrd/en/cantrips');
// Collection for: character-arcs
const characterarcs = createCollection('src/content/compendiums/csrd/en/character-arcs');
// Collection for: character-options
const characteroptions = createCollection('src/content/compendiums/csrd/en/character-options');
// Collection for: creatures-npcs
const creaturesnpcs = createCollection('src/content/compendiums/csrd/en/creatures-npcs');
// Collection for: cypher-shorts-scenarios
const cyphershortsscenarios = createCollection('src/content/compendiums/csrd/en/cypher-shorts-scenarios');
// Collection for: cyphers
const cyphers = createCollection('src/content/compendiums/csrd/en/cyphers');
// Collection for: descriptors
const descriptors = createCollection('src/content/compendiums/csrd/en/descriptors');
// Collection for: equipment
const equipment = createCollection('src/content/compendiums/csrd/en/equipment');
// Collection for: flavors
const flavors = createCollection('src/content/compendiums/csrd/en/flavors');
// Collection for: foci
const foci = createCollection('src/content/compendiums/csrd/en/foci');
// Collection for: rituals
const rituals = createCollection('src/content/compendiums/csrd/en/rituals');
// Collection for: rules
const rules = createCollection('src/content/compendiums/csrd/en/rules');
// Collection for: skill-lists
const skilllists = createCollection('src/content/compendiums/csrd/en/skill-lists');
// Collection for: stats
const stats = createCollection('src/content/compendiums/csrd/en/stats');
// Collection for: tables
const tables = createCollection('src/content/compendiums/csrd/en/tables');
// Collection for: types
const types = createCollection('src/content/compendiums/csrd/en/types');

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

