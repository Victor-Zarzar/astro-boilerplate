// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import AutoImport from "astro-auto-import";
import { filterSitemapByDefaultLocale, i18n } from "astro-i18n-aut/integration";
import icon from "astro-icon";
import aws from "astro-sst";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

// also need to adjust in i18n file -> utils/18n.ts
const defaultLocale = "en";
const locales = {
  en: "en-US", // the `defaultLocale`
  es: "es-ES",
  pt: "pt-BR",
};

// https://astro.build/config
export default defineConfig({
  output: "server",
  outDir: "dist",
  adapter: aws(),
  security: { checkOrigin: true },
  build: {
    format: "file",
  },
  base: "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    i18n({
      locales,
      defaultLocale,
      exclude: ["pages/api/**/*"],
      redirectDefaultLocale: true,
    }),
    AutoImport({
      imports: [],
    }),
    mdx(),
    icon({
      include: {
        tabler: ["*"],
      },
    }),
    sitemap({
      i18n: {
        locales,
        defaultLocale,
      },
      filter: filterSitemapByDefaultLocale({ defaultLocale }),
    }),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
    shikiConfig: {
      themes: {
        dark: "github-dark",
        light: "github-light",
      },
      wrap: true,
    },
  },
});
