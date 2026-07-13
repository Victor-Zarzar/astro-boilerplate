// @ts-check

import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import compress from "astro-compress";

export default defineConfig({
  i18n: {
    locales: ["es", "en", "pt-br"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [
    sitemap(),
    compress({
      css: false,
      html: true,
      js: true,
      img: {
        quality: 80,
      },
      svg: true,
      logger: 1,
    }),
    preact({
      compat: true,
    }),
  ],
});
