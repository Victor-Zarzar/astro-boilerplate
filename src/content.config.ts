import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const commonPageTypes = z.object({
  header1: z.string(),
  header2: z.string().optional(),
  sub: z.string(),
  text: z.string(),
});

const test = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/test" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    en: commonPageTypes,
    es: commonPageTypes,
    fr: commonPageTypes,
    de: commonPageTypes,
    it: commonPageTypes,
    ja: commonPageTypes,
    zh: commonPageTypes,
    th: commonPageTypes,
    hi: commonPageTypes,
    ko: commonPageTypes,
  }),
});

const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// ---- Sections collection (schemas iguais aos que já montamos) ----

const buttonSchema = z.object({
  enable: z.boolean(),
  label: z.string(),
  link: z.string(),
});

const landingLangSchema = z.object({
  title: z.string(),
  label: z.string(),
  label2: z.string(),
  description: z.string(),
});

const landingSchema = z.object({
  enable: z.boolean(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  primaryButton: buttonSchema,
  secondaryButton: buttonSchema,
  en: landingLangSchema,
  fr: landingLangSchema.optional(),
  es: landingLangSchema.optional(),
  de: landingLangSchema.optional(),
  ja: landingLangSchema.optional(),
  it: landingLangSchema.optional(),
  ar: landingLangSchema.optional(),
  hi: landingLangSchema.optional(),
  th: landingLangSchema.optional(),
  zh: landingLangSchema.optional(),
  ko: landingLangSchema.optional(),
});

const heroSchema = z.object({
  enable: z.boolean(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
  primaryButton: buttonSchema,
  secondaryButton: buttonSchema,
});

const callToActionSchema = z.object({
  enable: z.boolean(),
  title: z.string(),
  image: z.string().optional(),
  description: z.string(),
  button: buttonSchema,
});

const featuresSchema = z.object({
  enable: z.boolean(),
  title: z.string(),
  description: z.string(),
  features: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      color: z.string(),
    }),
  ),
});

const testimonialSchema = z.object({
  enable: z.boolean(),
  title: z.string(),
  description: z.string(),
  members: z.array(
    z.object({
      name: z.string(),
      designation: z.string(),
      avatar: z.string(),
      content: z.string(),
    }),
  ),
});

const sectionsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sections" }),
  schema: z.union([
    landingSchema,
    heroSchema,
    callToActionSchema,
    featuresSchema,
    testimonialSchema,
  ]),
});

export const collections = {
  pages: pagesCollection,
  sections: sectionsCollection,
  test: test,
};
