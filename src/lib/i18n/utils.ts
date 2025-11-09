import { headers } from "next/headers";
import { type Locale } from "./constants";

export async function getLocaleFromRequest(): Promise<Locale> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  if (acceptLanguage) {
    const locale = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
    return locale as Locale;
  }

  const cookies = headersList.get("cookie");
  if (cookies) {
    const localeMatch = cookies.match(/locale=([^;]+)/);
    if (localeMatch) {
      const locale = localeMatch[1];
      if (locale === "tr" || locale === "en") {
        return locale as Locale;
      }
    }
  }

  return "en" as Locale;
}
