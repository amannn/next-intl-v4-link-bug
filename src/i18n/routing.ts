import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['cs-CZ', 'sk-SK', 'de-DE', 'en-GB', 'de-AT'],
  defaultLocale: 'cs-CZ',
  localePrefix: {
    mode: 'as-needed'
  },
  domains: [
    {
      domain: 'local.example.cz:3000',
      defaultLocale: 'cs-CZ',
      locales: ['cs-CZ']
    },
    {
      domain: 'local.example.sk:3000',
      defaultLocale: 'sk-SK',
      locales: ['sk-SK']
    },
    {
      domain: 'local.example.at:3000',
      defaultLocale: 'de-AT',
      locales: ['de-AT']
    },
    {
      domain: 'local.example.com:3000',
      defaultLocale: 'en-GB',
      locales: ['de-DE', 'en-GB']
    }
  ],
  pathnames: {
    '/': '/',
    '/category/[id]/[...slug]': {
      'cs-CZ': '/kategorie/[id]/[...slug]',
      'sk-SK': '/kategorie/[id]/[...slug]',
      'de-DE': '/kategorie/[id]/[...slug]',
      'en-GB': '/category/[id]/[...slug]',
      'de-AT': '/kategorie/[id]/[...slug]'
    }
  }
});

export const {locales, pathnames, localePrefix, domains, defaultLocale} =
  routing;
