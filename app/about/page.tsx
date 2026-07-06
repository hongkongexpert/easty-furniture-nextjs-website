import Image from "next/image";
import Link from "next/link";
import { Cog, Download, Factory, FileText, Globe2, Lightbulb, Map, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { localizedPath, t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const statIcons = [Factory, Cog, Globe2];
const statClasses = ["md:col-span-2 bg-surface-container", "bg-white", "bg-primary text-primary-foreground"];
const valueIcons = [Lightbulb, Cog, ShieldCheck];
const resourceHrefs = [
  "/pdfs/easty-company-profile-about-2026.pdf",
  "/pdfs/easty-product-line-overview-summary.pdf",
  "/pdfs/easty-client-reference-sectors-2026.pdf",
  "/pdfs/easty-production-equipment-advantages.pdf"
];

export default async function AboutPage() {
  const locale = await getLocale();
  const dictionary = t(locale);
  const about = dictionary.about;

  return (
    <main>
      <section className="relative flex min-h-[480px] items-center overflow-hidden sm:min-h-[720px]">
        <Image src="/images/19_factory_equipment_biesse.jpg" alt="EASTY manufacturing facility" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container relative z-10 py-12 text-white sm:py-0">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl sm:leading-[56px]">{about.heroTitle}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg sm:leading-8">{about.heroText}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto"><Link href={localizedPath(locale, "/contact")}>{about.exploreFacility}</Link></Button>
              <Button asChild size="lg" variant="outline" className="w-full border-white bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"><a href="/pdfs/easty-company-profile-about-2026.pdf" target="_blank" rel="noreferrer">{about.viewPdf}</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-24">
        <div className="container grid items-center gap-8 sm:gap-16 md:grid-cols-2">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary sm:mb-4">{about.heritage}</span>
            <h2 className="text-2xl font-bold leading-tight sm:text-4xl sm:leading-10">{about.storyTitle}</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base sm:leading-7">{about.story.map((item) => <p key={item}>{item}</p>)}</div>
          </div>
          <div className="relative">
            <div className="absolute -left-4 -top-4 hidden h-24 w-24 bg-primary/10 sm:block" />
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface-container shadow-industrial">
              <Image src="/images/05_office_chair_series.png" alt="EASTY furniture production detail" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-12 sm:py-24">
        <div className="container grid gap-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary sm:mb-4">{about.productSystemEyebrow}</span>
            <h2 className="text-2xl font-bold leading-tight sm:text-4xl sm:leading-10">{about.productSystemTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base sm:leading-7">{about.productSystemText}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {about.productSystems.map((item) => <div className="border border-border bg-white p-3 text-[10px] font-bold uppercase tracking-[0.06em] sm:p-5 sm:text-sm" key={item}>{item}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-12 sm:py-24">
        <div className="container">
          <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-16">
            <h2 className="text-2xl font-bold leading-tight sm:text-4xl sm:leading-10">{about.statsTitle}</h2>
            <p className="mt-3 text-sm text-muted-foreground sm:mt-4 sm:text-base">{about.statsText}</p>
          </div>
          <div className="grid gap-3 sm:gap-6 md:grid-cols-4">
            {about.stats.map(([value, label, text], index) => {
              const Icon = statIcons[index];
              const isPrimary = statClasses[index].includes("primary");
              return (
                <div className={`border border-border p-5 sm:p-10 ${statClasses[index]}`} key={label}>
                  <Icon className={`mb-4 size-7 sm:mb-6 sm:size-9 ${isPrimary ? "text-primary-foreground" : "text-primary"}`} />
                  <strong className="block text-2xl font-extrabold sm:text-4xl">{value}</strong>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest sm:mt-2 sm:text-xs">{label}</span>
                  <p className="mt-3 text-xs leading-5 opacity-80 sm:mt-6 sm:text-sm sm:leading-6">{text}</p>
                </div>
              );
            })}
            <div className="relative min-h-44 overflow-hidden border border-border sm:min-h-64 md:col-span-2">
              <Image src="/images/02_home_hero_office_workstation.png" alt="EASTY commercial furniture production scale" fill className="object-cover" />
            </div>
            <div className="flex items-center gap-4 border border-border bg-surface-container p-5 sm:gap-6 sm:p-10 md:col-span-2">
              <strong className="text-3xl font-extrabold sm:text-5xl">180+</strong>
              <span className="h-10 w-1 bg-primary sm:h-14" />
              <span className="text-[10px] font-bold uppercase leading-4 tracking-widest text-muted-foreground sm:text-xs sm:leading-5">{about.patent}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-24">
        <div className="container grid gap-8 sm:gap-12 md:grid-cols-3">
          {about.values.map(([title, text], index) => {
            const Icon = valueIcons[index];
            return (
              <div className="text-center" key={title}>
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded border border-border bg-surface-container-low sm:mb-8 sm:size-20">
                  <Icon className="size-6 text-primary sm:size-8" />
                </div>
                <h3 className="text-lg font-semibold sm:text-2xl">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-muted-foreground sm:mt-4 sm:text-sm sm:leading-6">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-surface-container-lowest py-12 sm:py-24">
        <div className="container">
          <div className="mb-8 max-w-3xl sm:mb-12">
            <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary sm:mb-4">{about.referencesEyebrow}</span>
            <h2 className="text-2xl font-bold leading-tight sm:text-4xl sm:leading-10">{about.referencesTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base sm:leading-7">{about.referencesText}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-5">
            {about.projectSectors.map((item) => <div className="bg-white px-3 py-3 text-xs font-semibold sm:px-4 sm:py-5 sm:text-sm" key={item}>{item}</div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-container-low py-12 sm:py-24">
        <div className="container grid items-center gap-8 sm:gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold leading-tight sm:text-4xl sm:leading-10">{about.networkTitle}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">{about.networkText}</p>
            <div className="mt-6 space-y-6 sm:mt-10 sm:space-y-8">
              <div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="text-xs font-bold uppercase tracking-widest">{about.hqTitle}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{about.hqText}</p></div></div>
              <div className="flex gap-4"><Factory className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="text-xs font-bold uppercase tracking-widest">{about.baseTitle}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{about.baseText}</p></div></div>
            </div>
          </div>
          <div className="flex min-h-[220px] items-center justify-center border border-border bg-surface-container-high text-muted-foreground sm:min-h-[400px]">
            <div className="text-center"><Map className="mx-auto mb-4 size-12 opacity-40 sm:size-16" /><p className="text-xs font-bold uppercase tracking-widest">{about.mapText}</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-24">
        <div className="container">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:mb-12 sm:gap-6 md:flex-row md:items-end">
            <div><span className="mb-3 block text-xs font-bold uppercase tracking-widest text-primary sm:mb-4">{about.docsEyebrow}</span><h2 className="text-2xl font-bold leading-tight sm:text-4xl sm:leading-10">{about.docsTitle}</h2></div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">{about.docsText}</p>
          </div>
          <div className="grid gap-3 sm:gap-6 md:grid-cols-2">
            {about.resources.map(([title, text, size], index) => (
              <a className="group flex flex-col justify-between border border-border bg-surface-container-low p-4 transition-colors hover:border-primary hover:bg-white sm:min-h-56 sm:p-8" href={resourceHrefs[index]} target="_blank" rel="noreferrer" key={title}>
                <div><div className="mb-3 flex items-center justify-between sm:mb-6"><FileText className="size-6 text-primary sm:size-8" /><span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground sm:text-xs">{size}</span></div><h3 className="text-lg font-semibold sm:text-2xl">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground sm:mt-4 sm:text-sm sm:leading-6">{text}</p></div>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:mt-8 sm:text-xs"><Download className="size-4" />{about.openPdf}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-24">
        <div className="container">
          <div className="bg-primary px-5 py-10 text-center text-white sm:px-8 sm:py-16 md:px-20">
            <h2 className="text-2xl font-bold leading-tight sm:text-4xl sm:leading-10">{about.finalCtaTitle}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:mt-4 sm:text-lg sm:leading-8">{about.finalCtaText}</p>
            <div className="mt-6 grid grid-cols-2 justify-center gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:gap-4">
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto"><Link href={localizedPath(locale, "/contact")}>{about.partner}</Link></Button>
              <Button asChild size="lg" variant="outline" className="w-full border-white bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"><Link href={localizedPath(locale, "/contact")}>{about.requestTour}</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
