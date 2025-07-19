import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from '@astrojs/vercel';
import icon from "astro-icon";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [
    mdx(),
    vue(), // Add Vue integration
    // prettier-ignore
    icon({
      include: {
        mdi: ["*"],
        "game-icons": ["*"],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
