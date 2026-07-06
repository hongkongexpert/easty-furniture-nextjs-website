import Link from "next/link";
import { Download, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Locale, localizedPath, t } from "@/lib/i18n";

export function CtaBand({ locale = "en" }: { locale?: Locale }) {
  const dictionary = t(locale);
  return (
    <section className="bg-[#2f3131] py-stack-lg text-surface">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div><h2 className="text-[32px] font-bold leading-10">{dictionary.cta.title}</h2><p className="mt-2 max-w-2xl text-base leading-6 opacity-80">{dictionary.cta.text}</p></div>
        <div className="flex flex-wrap gap-3"><Button asChild><Link href={localizedPath(locale, "/contact")}><Send className="size-4" /> {dictionary.cta.request}</Link></Button><Button asChild variant="inverse"><Link href={localizedPath(locale, "/product-series")}><Download className="size-4" /> {dictionary.cta.catalog}</Link></Button></div>
      </div>
    </section>
  );
}
