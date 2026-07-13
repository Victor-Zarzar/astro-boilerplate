// @ts-check

import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import compress from "astro-compress";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	i18n: {
		locales: ["es", "en", "pt-br"],
		defaultLocale: "en",
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
