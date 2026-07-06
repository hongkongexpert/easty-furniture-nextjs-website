import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { dirForLocale, t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { title: "EASTY Furniture | Industrial Commercial Furniture", description: "EASTY Furniture B2B website built from Stitch UI screens." };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const dictionary = t(locale);
  return <html lang={locale} dir={dirForLocale(locale)}><body className={inter.className}><SiteHeader locale={locale} dictionary={dictionary} />{children}<SiteFooter locale={locale} dictionary={dictionary} /></body></html>;
}
