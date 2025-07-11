import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import vercel from '@astrojs/vercel';
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

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
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});