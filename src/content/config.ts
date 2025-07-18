import { defineCollection, z } from "astro:content";
import { format } from "date-fns";
import { collections as csrdCollections } from './cs-collection-config.ts';

// Debug: Log what's being imported
console.log('CSRD Collections keys:', Object.keys(csrdCollections));
console.log('Has abilities collection:', 'abilities' in csrdCollections);

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
export const collections = {
  posts: articles,
  ...csrdCollections,
};

// Debug: Log final collections
console.log('Final collections keys:', Object.keys(collections));