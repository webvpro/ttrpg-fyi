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
  pools: z.array(z.string()).optional(),
  cost: z.string().optional(),
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

// Cantrips collection
const cantrips = defineCollection({
  loader: glob({ pattern: '**/[^_]*', base: './src/content/compendiums/CSRD/en/Cantrips' }),
  schema: csrdBaseSchema.extend({
    kind: z.literal('Cantrip'),
    pools: z.array(z.enum(['Intellect', 'Might', 'Speed'])).optional(),
    cost: z.string(),
  }),
});

// Abilities collection
const abilities = defineCollection({
  loader: glob({ pattern: '**/[^_]*', base: './src/content/compendiums/CSRD/en/Abilities' }),
  schema: csrdBaseSchema.extend({
    kind: z.literal('Ability'),
    tier: z.number().optional(),
    prerequisite: z.string().optional(),
  }),
});

// Artifacts collection
const artifacts = defineCollection({
  loader: glob({ pattern: '**/[^_]*', base: './src/content/compendiums/CSRD/en/Artifacts' }),
  schema: csrdBaseSchema.extend({
    kind: z.literal('Artifact'),
    level: z.number().optional(),
    form: z.string().optional(),
    effect: z.string().optional(),
    depletion: z.string().optional(),
  }),
});

// Creatures collection
const creatures = defineCollection({
  loader: glob({ pattern: '**/[^_]*', base: './src/content/compendiums/CSRD/en/Creatures' }),
  schema: csrdBaseSchema.extend({
    kind: z.literal('Creature'),
    level: z.number().optional(),
    health: z.number().optional(),
    armor: z.number().optional(),
    damage: z.number().optional(),
    movement: z.string().optional(),
    modifications: z.array(z.string()).optional(),
  }),
});

// Equipment collection
const equipment = defineCollection({
  loader: glob({ pattern: '**/[^_]*', base: './src/content/compendiums/CSRD/en/Equipment' }),
  schema: csrdBaseSchema.extend({
    kind: z.literal('Equipment'),
    category: z.string().optional(),
    price: z.string().optional(),
    weight: z.string().optional(),
  }),
});

// Cyphers collection
const cyphers = defineCollection({
  loader: glob({ pattern: '**/[^_]*', base: './src/content/compendiums/CSRD/en/Cyphers' }),
  schema: csrdBaseSchema.extend({
    kind: z.literal('Cypher'),
    level: z.string().optional(),
    type: z.enum(['Anoetic', 'Occultic']).optional(),
    effect: z.string().optional(),
  }),
});

// Rules collection with references to other collections
const rules = defineCollection({
  loader: glob({ pattern: '**/[^_]*', base: './src/content/compendiums/CSRD/en/Rules' }),
  schema: csrdBaseSchema.extend({
    kind: z.literal('Rule'),
    category: z.string().optional(),
    subcategory: z.string().optional(),
    references: z.object({
      abilities: z.array(z.string()).optional(),
      cantrips: z.array(z.string()).optional(),
      artifacts: z.array(z.string()).optional(),
      creatures: z.array(z.string()).optional(),
      equipment: z.array(z.string()).optional(),
      cyphers: z.array(z.string()).optional(),
    }).optional(),
    relatedRules: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts: articles,
  cantrips,
  abilities,
  artifacts,
  creatures,
  equipment,
  cyphers,
  rules,
};