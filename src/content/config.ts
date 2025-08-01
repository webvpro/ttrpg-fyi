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
      publishDate: z
        .string()
        .transform((str) => format(new Date(str), "MMMM d, yyyy")),
      author: z.string(),
      image: image(),
      imageAlt: z.string(),
      tags: z.array(z.string()),
      category: z.string(),
      difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
      readTime: z.string(),
      featured: z.boolean(),
      series: z.string().optional(),
      relatedArticles: z.array(z.string()).optional(),
      tableOfContents: z.boolean().default(true),
      // Legacy fields for backward compatibility
      date: z
        .string()
        .transform((str) => format(new Date(str), "MMMM d, yyyy"))
        .optional(),
      authorImage: z.string().optional(),
      featuredPost: z.boolean().optional(),
      topArticle: z.boolean().optional(),
    }),
});

// Posts collection for methodology articles
const posts = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z
        .string()
        .transform((str) => format(new Date(str), "MMMM d, yyyy")),
      author: z.string(),
      image: image(),
      imageAlt: z.string(),
      tags: z.array(z.string()),
      category: z.string(),
      difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
      readTime: z.string(),
      featured: z.boolean(),
      series: z.string().optional(),
      relatedArticles: z.array(z.string()).optional(),
      tableOfContents: z.boolean().default(true),
    }),
});

// Create all collections
export const collections = {
  articles: articles, // Legacy articles collection
  posts: posts,       // New methodology posts collection
  ...csrdCollections,
};

// Debug: Log final collections
console.log('Final collections keys:', Object.keys(collections));