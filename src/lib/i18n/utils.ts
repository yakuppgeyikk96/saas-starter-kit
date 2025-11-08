import { headers } from "next/headers";

export async function getLocaleFromRequest(): Promise<string> {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language");

  if (acceptLanguage) {
    const locale = acceptLanguage.split(",")[0].split("-")[0].toLowerCase();
    return locale;
  }

  const cookies = headersList.get("cookie");
  if (cookies) {
    const localeMatch = cookies.match(/locale=([^;]+)/);
    if (localeMatch) {
      const locale = localeMatch[1];
      if (locale === "tr" || locale === "en") {
        return locale;
      }
    }
  }

  return "en";
}
