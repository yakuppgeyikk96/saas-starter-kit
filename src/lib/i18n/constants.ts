export const LOCALE_COOKIE_NAME = "locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export type Locale = "en" | "tr";

export const LOCALES: Locale[] = ["en", "tr"];

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  tr: "Türkçe",
};
