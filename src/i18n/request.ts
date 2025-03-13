import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getRequestConfig } from "next-intl/server";
import { locales, localeMappings } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Resolve the generic locale based on the specific locale
  const genericLocale =
    localeMappings[locale as keyof typeof localeMappings] || locale;
  // Import messages from multiple files based on namespaces and generic locale
  return {
    locale,
    messages: (await import(`../../messages/${genericLocale}.json`)).default,
  };
});
