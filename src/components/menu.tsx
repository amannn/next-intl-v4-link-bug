import { getPathname, Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Menu() {
  const locale = await getLocale();
  const t = await getTranslations();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">{t("Menu.home")}</Link>
        </li>
        <li>
          <Link
            locale={locale}
            // href={{
            //   pathname: "/category/[id]/[...slug]/",
            //   params: { id: 1, slug: ["slug", "slug2"] },
            // }} <-- This does not work! Params cannot be passed
            href={getPathname({
              locale,
              href: {
                pathname: "/category/[id]/[...slug]/",
                params: { id: 1, slug: ["slug", "slug2"] },
              },
            })}
          >
            {t("Menu.category", { id: 1 })}
          </Link>
        </li>
        <li>
          <Link
            locale={locale}
            // href={{
            //   pathname: "/category/[id]/[...slug]/",
            //   params: { id: 1, slug: ["slug", "slug2"] },
            // }} <-- This does not work! Params cannot be passed
            href={getPathname({
              locale,
              href: {
                pathname: "/category/[id]/[...slug]/",
                params: { id: 2, slug: ["slug", "slug3"] },
              },
            })} // <-- This works!
          >
            {t("Menu.category", { id: 2 })}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
