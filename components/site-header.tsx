"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { type Dictionary, type Locale, categoryLabel, localizedPath, switchLocalePath } from "@/lib/i18n";

const nav = [["about", "/about"], ["contact", "/contact"]] as const;

const productMenu = [
  {
    label: "Office Furniture",
    href: "/product-series?category=office-furniture"
  },
  {
    label: "Educational Furniture",
    href: "/product-series?category=educational-furniture"
  },
  {
    label: "Hotel Furniture",
    href: "/product-series?category=hotel-furniture"
  },
  {
    label: "Display Furniture",
    href: "/product-series?category=display-furniture"
  }
];

const languageMenu: { locale: Locale; label: string }[] = [
  { locale: "en", label: "English" },
  { locale: "es", label: "Español" },
  { locale: "ar", label: "العربية" }
];

export function SiteHeader({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-border bg-surface">
      <div className="container flex h-20 items-center justify-between gap-6">
        <Link href={localizedPath(locale, "/")} className="flex h-20 items-center">
          <Image src="/images/01_easty_logo_trimmed.png" alt="EASTY Furniture" width={180} height={61} priority className="h-12 w-auto object-contain" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <div className="group relative">
            <button className="flex cursor-pointer items-center gap-1 bg-transparent text-xs font-bold uppercase tracking-[0.05em] text-muted-foreground outline-none hover:text-primary focus-visible:text-primary group-hover:text-primary" type="button">
              <span>{dictionary.nav.productSeries}</span>
              <ChevronDown className="size-3 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="min-w-52 bg-surface py-2 shadow-sm">
                {productMenu.map((item) => (
                  <Link className="block px-4 py-2 text-xs font-bold uppercase tracking-[0.05em] text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:text-primary" href={localizedPath(locale, item.href)} key={item.label}>
                    {categoryLabel(locale, item.label)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {nav.map(([label, href]) => (
            <Link className="text-xs font-bold uppercase tracking-[0.05em] text-muted-foreground hover:text-primary" href={localizedPath(locale, href)} key={href}>{dictionary.nav[label]}</Link>
          ))}
          <div className="group relative">
            <button className="flex cursor-pointer items-center gap-1 bg-transparent text-xs font-bold uppercase tracking-[0.05em] text-muted-foreground outline-none hover:text-primary focus-visible:text-primary group-hover:text-primary" type="button">
              <span>{dictionary.nav.language}</span>
              <ChevronDown className="size-3 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
            </button>
            <div className="invisible absolute left-0 top-full z-50 pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="min-w-36 bg-surface py-2 shadow-sm">
                {languageMenu.map((item) => (
                  <Link className="block px-4 py-2 text-xs font-bold uppercase tracking-[0.05em] text-muted-foreground hover:text-primary focus-visible:outline-none focus-visible:text-primary" href={switchLocalePath(item.locale, pathname)} key={item.locale}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <Button asChild className="hidden md:inline-flex"><Link href={localizedPath(locale, "/contact")}>{dictionary.nav.requestQuote}</Link></Button>
        <Sheet>
          <SheetTrigger asChild><Button size="icon" variant="ghost" className="md:hidden"><Menu className="size-5" /></Button></SheetTrigger>
          <SheetContent>
            <div className="mb-8 flex items-center">
              <Image src="/images/01_easty_logo_trimmed.png" alt="EASTY Furniture" width={150} height={51} className="h-10 w-auto object-contain" />
            </div>
            <nav className="flex flex-col">
              <SheetClose asChild>
                <Link className="py-3 text-sm font-bold uppercase tracking-[0.08em] text-foreground hover:text-primary transition-colors" href={localizedPath(locale, "/")}>{dictionary.nav.home}</Link>
              </SheetClose>
              <div className="border-t border-border" />

              <p className="pb-2 pt-3 text-sm font-bold uppercase tracking-[0.08em] text-foreground">{dictionary.nav.productSeries}</p>
              <div className="flex flex-col gap-0 pl-2">
                {productMenu.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <Link className="py-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground hover:text-primary transition-colors" href={localizedPath(locale, item.href)}>
                      {categoryLabel(locale, item.label)}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <div className="border-t border-border" />

              {nav.map(([label, href]) => (
                <SheetClose asChild key={href}>
                  <Link className="py-3 text-sm font-bold uppercase tracking-[0.08em] text-foreground hover:text-primary transition-colors" href={localizedPath(locale, href)}>
                    {dictionary.nav[label]}
                  </Link>
                </SheetClose>
              ))}
              <div className="border-t border-border" />

              <p className="pb-2 pt-3 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">{dictionary.nav.language}</p>
              <div className="flex flex-col gap-0 pl-2">
                {languageMenu.map((item) => (
                  <SheetClose asChild key={item.locale}>
                    <Link className="py-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors" href={switchLocalePath(item.locale, pathname)}>
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
              <div className="border-t border-border mt-4" />

              <SheetClose asChild>
                <Link href={localizedPath(locale, "/contact")} className="mt-6 inline-flex items-center justify-center bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.08em] text-primary-foreground transition-opacity hover:opacity-90">
                  {dictionary.nav.requestQuote}
                </Link>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
