import { glob } from 'astro/loaders';
import { defineCollection, z } from "astro:content";

// More permissive schema
const baseSchema = z.object({
  title: z.string().optional(), // Make title optional in case some files don't have it
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

const createCollection = (basePath) => {
  return defineCollection({
    schema: baseSchema,
    loader: glob({
      pattern: '**/*.{md,mdx}',
      base: basePath,
    })
  });
};

// Make sure path is exactly right
const abilities = createCollection('src/content/compendiums/csrd/en/abilities');

// Export with debug
console.log('Creating abilities collection with path: src/content/compendiums/csrd/en/abilities');

export const collections = {
  abilities,
  // ... other collections
};

