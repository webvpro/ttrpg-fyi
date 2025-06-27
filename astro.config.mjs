import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
import vercelServerless from '@astrojs/vercel/serverless';
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: vercelServerless(),
  integrations: [
    mdx(), 
    vue(), 
    icon({
      include: {
        mdi: ["*"],
        "game-icons": ["*"], // (Default) Loads entire Material Design Icon set
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});