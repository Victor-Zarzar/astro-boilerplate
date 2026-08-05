export type SupportedLocale = "en" | "es" | "pt";

const DEFAULT_LOCALE: SupportedLocale = "en";

export const locales: SupportedLocale[] = ["en", "es", "pt"];

export const localeLabels: Record<SupportedLocale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

function extractLocaleFromPathname(pathname: string): SupportedLocale {
  const match = pathname.match(/^\/([^/]+)/);
  if (match) {
    return isSupportedLocale(match[1]) ? match[1] : DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
}

export function getLang(pathname: string): SupportedLocale {
  return extractLocaleFromPathname(pathname);
}

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return (locales as string[]).includes(locale);
}

export function switchLocalePath(
  pathname: string,
  newLocale: SupportedLocale,
): string {
  const currentLocale = getLang(pathname);
  const prefix = `/${currentLocale}`;

  if (pathname.startsWith(prefix)) {
    return pathname.replace(prefix, `/${newLocale}`);
  }

  return `/${newLocale}${pathname}`;
}

export { DEFAULT_LOCALE };
