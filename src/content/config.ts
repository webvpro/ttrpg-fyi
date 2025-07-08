import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { format } from "date-fns";


// Base schema for CSRD content
const csrdBaseSchema = z.object({
  title: z.string(),
  aliases: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  collection: z.string().optional(),
  kind: z.string().optional(),
});

// Blog articles collection
const articles = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z
        .string()
        .transform((str) => format(new Date(str), "MMMM d, yyyy")),
      image: image(),
      author: z.string(),
      authorImage: z.string(),
      category: z.string(),
      featuredPost: z.boolean(),
      topArticle: z.boolean(),
    }),
});

// Simple collection creator
function createCSRDCollection(collectionName: string) {
  return defineCollection({
    loader: glob({ pattern: '**/[^_]*', base: `./src/content/compendiums/CSRD/en/${collectionName}` }),
    schema: csrdBaseSchema.extend({
      // Common optional fields for all collections
      category: z.string().optional(),
      level: z.union([z.string(), z.number()]).optional(),
      effect: z.string().optional(),
      prerequisite: z.string().optional(),
      // Arrays for relationships
      pools: z.array(z.string()).optional(),
      references: z.array(z.string()).optional(),
      components: z.array(z.string()).optional(),
      steps: z.array(z.string()).optional(),
      // Specific fields
      tier: z.string().optional(),
      health: z.union([z.string(), z.number()]).optional(),
      armor: z.union([z.string(), z.number()]).optional(),
      damage: z.union([z.string(), z.number()]).optional(),
      cost: z.union([z.string(), z.number()]).optional(),
      duration: z.union([z.string(), z.number()]).optional(),
    }),
  });
}

// Create all collections
const collections = {
  posts: articles,
  abilities: createCSRDCollection('Abilities'),
  artifacts: createCSRDCollection('Artifacts'),
  cantrips: createCSRDCollection('Cantrips'),
  characterarcs: createCSRDCollection('Character-Arcs'),
  characteroptions: createCSRDCollection('Character-Options'),
  creatures: createCSRDCollection('Creatures-NPCs'),
  cyphers: createCSRDCollection('Cyphers'),
  equipment: createCSRDCollection('Equipment'),
  rituals: createCSRDCollection('Rituals'),
  descriptors: createCSRDCollection('Descriptors'),
  foci: createCSRDCollection('Foci'),
  types: createCSRDCollection('Types'),
};

export { collections };