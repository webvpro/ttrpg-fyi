import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { format } from "date-fns";
import { collections as csrdCollections } from './cs-collection-config.ts';

// Debug: Log what's happening during build
console.log('=== CONTENT CONFIG DEBUG ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Platform:', process.platform);
console.log('Current working directory:', process.cwd());

// Debug: Check if CSRD collections are imported correctly
console.log('CSRD Collections imported:', Object.keys(csrdCollections || {}));
console.log('Number of CSRD collections:', Object.keys(csrdCollections || {}).length);

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

// Create all collections
const collections = {
  posts: articles,
  ...csrdCollections,
};

// Debug: Log final collection structure
console.log('Final collections:', Object.keys(collections));
console.log('Has characteroptions collection:', 'characteroptions' in collections);
console.log('Has abilities collection:', 'abilities' in collections);

export { collections };