import { defineRouting, Pathnames } from "next-intl/routing";

// Define full locales
const fullLocales = ["cs-CZ", "sk-SK", "de-DE", "en-GB", "de-AT"] as const;

// Extract unique language codes
const baseLocales = ["cs", "en", "sk", "de"] as const;

const simplifiedPathnames = {
  "/": "/",
  "/category/[id]/[...slug]": {
    en: "/category/[id]/[...slug]",
    de: "/kategorie/[id]/[...slug]",
    cs: "/kategorie/[id]/[...slug]",
    sk: "/kategorie/[id]/[...slug]",
  },
};
export const localeMappings: Record<
  (typeof fullLocales)[number],
  (typeof baseLocales)[number]
> = Object.fromEntries(
  fullLocales.map((locale) => {
    const baseLang = locale.split("-")[0];
    return [locale, baseLocales.includes(baseLang as any) ? baseLang : "cs"]; // Default to `cs`
  })
) as Record<(typeof fullLocales)[number], (typeof baseLocales)[number]>;

// this generates pathanmes for all locales based on the simplified pathnames above
const fullPathnames: Pathnames<typeof fullLocales> = Object.fromEntries(
  Object.entries(simplifiedPathnames).map(([path, localizedPaths]) => [
    path,
    typeof localizedPaths === "string"
      ? localizedPaths // Direct string paths remain unchanged
      : (Object.fromEntries(
          fullLocales.map((locale) => [
            locale,
            localizedPaths[
              localeMappings[locale] as keyof typeof localizedPaths
            ],
          ])
        ) as Record<(typeof fullLocales)[number], string>), //
  ])
) as Pathnames<typeof fullLocales>;

export const routing = defineRouting({
  locales: ["cs-CZ", "sk-SK", "de-DE", "en-GB", "de-AT"],
  defaultLocale: "cs-CZ",
  localePrefix: {
    mode: "as-needed",
  },
  domains: [
    {
      domain: "local.example.cz:3000",
      defaultLocale: "cs-CZ",
      locales: ["cs-CZ"],
    },
    {
      domain: "local.example.sk:3000",
      defaultLocale: "sk-SK",
      locales: ["sk-SK"],
    },
    {
      domain: "local.example.at:3000",
      defaultLocale: "de-AT",
      locales: ["de-AT"],
    },
    {
      domain: "local.example.com:3000",
      defaultLocale: "en-GB",
      locales: ["de-DE", "en-GB"],
    },
  ],
  pathnames: fullPathnames,
});

export const { locales, pathnames, localePrefix, domains, defaultLocale } =
  routing;
