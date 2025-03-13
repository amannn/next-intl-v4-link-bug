import { routing } from "./routing";
import { createNavigation } from "next-intl/navigation";

export const {
  Link,
  redirect,
  usePathname,
  useRouter,
  getPathname: getPathnameBase,
} = createNavigation(routing);

export type ExtendedHref = {
  pathname: string;
  query?: { [key: string]: string | string[] | number | undefined };
  params?: { [key: string]: string | string[] | number };
};

export function getPathname({
  locale,
  href,
}: {
  locale: string;
  href: ExtendedHref | string;
}) {
  return getPathnameBase({ locale, href });
}
