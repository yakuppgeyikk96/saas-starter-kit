"use server";

import { cookies } from "next/headers";
import {
  THEME_COOKIE_MAX_AGE,
  THEME_COOKIE_NAME,
  type Theme,
} from "./constants";

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  const theme = cookieStore.get(THEME_COOKIE_NAME)?.value as Theme;

  if (theme === "light" || theme === "dark") {
    return theme;
  }

  return "light";
}

export async function setTheme(theme: Theme): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(THEME_COOKIE_NAME, theme, {
    maxAge: THEME_COOKIE_MAX_AGE,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
  });
}
