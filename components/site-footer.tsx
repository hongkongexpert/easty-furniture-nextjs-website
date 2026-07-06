import Image from "next/image";
import Link from "next/link";
import { Globe2, Mail, Network } from "lucide-react";
import { type Dictionary, type Locale, categoryLabel, localizedPath } from "@/lib/i18n";

const productLinks = [
  ["Office Furniture", "/product-series?category=office-furniture"],
  ["Educational Furniture", "/product-series?category=educational-furniture"],
  ["Hotel Furniture", "/product-series?category=hotel-furniture"],
  ["Display Furniture", "/product-series?category=display-furniture"]
] as const;

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="container grid gap-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div><Image src="/images/01_easty_logo_trimmed.png" alt="EASTY Furniture" width={160} height={54} className="h-11 w-auto object-contain" /><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{dictionary.footer.intro}</p><div className="mt-4 flex gap-3 text-muted-foreground"><Network /><Globe2 /><Mail /></div></div>
        <div className="grid gap-2 text-sm text-muted-foreground"><p className="font-bold text-foreground">{dictionary.nav.products}</p>{productLinks.map(([label, href]) => <Link href={localizedPath(locale, href)} key={label}>{categoryLabel(locale, label)}</Link>)}</div>
        <div className="grid gap-2 text-sm text-muted-foreground"><p className="font-bold text-foreground">{dictionary.nav.company}</p><Link href={localizedPath(locale, "/about")}>{dictionary.nav.about}</Link><Link href={localizedPath(locale, "/contact")}>{dictionary.footer.contactSupport}</Link></div>
        <div><p className="font-bold text-foreground">{dictionary.nav.procurement}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{dictionary.footer.support}</p></div>
      </div>
    </footer>
  );
}
