import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getRequestConfig} from 'next-intl/server';
import {locales} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  const language = new Intl.Locale(locale).language;

  return {
    locale,
    messages: (await import(`../../messages/${language}.json`)).default
  };
});
