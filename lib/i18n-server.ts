import { headers } from "next/headers";
import { type Locale, isLocale } from "@/lib/i18n";

export async function getLocale(): Promise<Locale> {
  const headerLocale = (await headers()).get("x-locale") || "en";
  return isLocale(headerLocale) ? headerLocale : "en";
}
