import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import vercelServerless from '@astrojs/vercel/serverless';
import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server",
  adapter: vercelServerless(),
  integrations: [mdx(), icon({
      include: {
        mdi: ["*"],
        "game-icons": ["*"], // (Default) Loads entire Material Design Icon set
      },
    })],
  vite: {
    plugins: [tailwindcss()],
  },
});
