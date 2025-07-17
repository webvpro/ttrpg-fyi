import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercel from '@astrojs/vercel'; // Using the unified adapter
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "hybrid", // Using 'hybrid' is recommended with the unified adapter
  adapter: vercel(),
  integrations: [
    mdx(),
    // prettier-ignore
    icon({
      // WARNING: Using a wildcard loads all icons from the set, which can harm performance.
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
