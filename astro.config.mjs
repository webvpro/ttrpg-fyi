import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import vercel from '@astrojs/vercel/serverless';
import icon from "astro-icon";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    mdx(), 
    vue(), 
    icon({
      include: {
        mdi: ["*"],
        "game-icons": ["*"], // Loads game icon set
      },
    }),
  ],
});