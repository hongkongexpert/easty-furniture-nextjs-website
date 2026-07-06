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
    <main className="pt-20">
      <section className="relative flex min-h-[720px] items-center overflow-hidden">
        <Image src="/images/19_factory_equipment_biesse.jpg" alt="EASTY manufacturing facility" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        <div className="container relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-[56px]">{about.heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85">{about.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg"><Link href={localizedPath(locale, "/contact")}>{about.exploreFacility}</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"><a href="/pdfs/easty-company-profile-about-2026.pdf" target="_blank" rel="noreferrer">{about.viewPdf}</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container grid items-center gap-16 md:grid-cols-2">
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">{about.heritage}</span>
            <h2 className="text-4xl font-bold leading-10">{about.storyTitle}</h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">{about.story.map((item) => <p key={item}>{item}</p>)}</div>
          </div>
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 bg-primary/10" />
            <div className="relative aspect-[4/3] overflow-hidden border border-border bg-surface-container shadow-industrial">
              <Image src="/images/05_office_chair_series.png" alt="EASTY furniture production detail" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">{about.productSystemEyebrow}</span>
            <h2 className="text-4xl font-bold leading-10">{about.productSystemTitle}</h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">{about.productSystemText}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {about.productSystems.map((item) => <div className="border border-border bg-white p-5 text-sm font-bold uppercase tracking-[0.06em]" key={item}>{item}</div>)}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-4xl font-bold leading-10">{about.statsTitle}</h2>
            <p className="mt-4 text-muted-foreground">{about.statsText}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {about.stats.map(([value, label, text], index) => {
              const Icon = statIcons[index];
              const isPrimary = statClasses[index].includes("primary");
              return (
                <div className={`border border-border p-10 ${statClasses[index]}`} key={label}>
                  <Icon className={`mb-6 size-9 ${isPrimary ? "text-primary-foreground" : "text-primary"}`} />
                  <strong className="block text-4xl font-extrabold">{value}</strong>
                  <span className="mt-2 block text-xs font-bold uppercase tracking-widest">{label}</span>
                  <p className="mt-6 text-sm leading-6 opacity-80">{text}</p>
                </div>
              );
            })}
            <div className="relative min-h-64 overflow-hidden border border-border md:col-span-2">
              <Image src="/images/02_home_hero_office_workstation.png" alt="EASTY commercial furniture production scale" fill className="object-cover" />
            </div>
            <div className="flex items-center gap-6 border border-border bg-surface-container p-10 md:col-span-2">
              <strong className="text-5xl font-extrabold">180+</strong>
              <span className="h-14 w-1 bg-primary" />
              <span className="text-xs font-bold uppercase leading-5 tracking-widest text-muted-foreground">{about.patent}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container grid gap-12 md:grid-cols-3">
          {about.values.map(([title, text], index) => {
            const Icon = valueIcons[index];
            return (
              <div className="text-center" key={title}>
                <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded border border-border bg-surface-container-low">
                  <Icon className="size-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="container">
          <div className="mb-12 max-w-3xl">
            <span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">{about.referencesEyebrow}</span>
            <h2 className="text-4xl font-bold leading-10">{about.referencesTitle}</h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">{about.referencesText}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {about.projectSectors.map((item) => <div className="bg-white px-4 py-5 text-sm font-semibold" key={item}>{item}</div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface-container-low py-24">
        <div className="container grid items-center gap-16 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold leading-10">{about.networkTitle}</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">{about.networkText}</p>
            <div className="mt-10 space-y-8">
              <div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="text-xs font-bold uppercase tracking-widest">{about.hqTitle}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{about.hqText}</p></div></div>
              <div className="flex gap-4"><Factory className="mt-1 size-5 shrink-0 text-primary" /><div><h3 className="text-xs font-bold uppercase tracking-widest">{about.baseTitle}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{about.baseText}</p></div></div>
            </div>
          </div>
          <div className="flex min-h-[400px] items-center justify-center border border-border bg-surface-container-high text-muted-foreground">
            <div className="text-center"><Map className="mx-auto mb-4 size-16 opacity-40" /><p className="text-xs font-bold uppercase tracking-widest">{about.mapText}</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="container">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><span className="mb-4 block text-xs font-bold uppercase tracking-widest text-primary">{about.docsEyebrow}</span><h2 className="text-4xl font-bold leading-10">{about.docsTitle}</h2></div>
            <p className="max-w-xl text-sm leading-6 text-muted-foreground">{about.docsText}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {about.resources.map(([title, text, size], index) => (
              <a className="group flex min-h-56 flex-col justify-between border border-border bg-surface-container-low p-8 transition-colors hover:border-primary hover:bg-white" href={resourceHrefs[index]} target="_blank" rel="noreferrer" key={title}>
                <div><div className="mb-6 flex items-center justify-between"><FileText className="size-8 text-primary" /><span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{size}</span></div><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{text}</p></div>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary"><Download className="size-4" />{about.openPdf}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="bg-primary px-8 py-16 text-center text-white md:px-20">
            <h2 className="text-4xl font-bold leading-10">{about.finalCtaTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/80">{about.finalCtaText}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="inverse"><Link href={localizedPath(locale, "/contact")}>{about.partner}</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"><Link href={localizedPath(locale, "/contact")}>{about.requestTour}</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
