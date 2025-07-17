import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { format } from "date-fns";
import { collections as csrdCollections } from './cs-collection-config.ts';


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

export { collections };