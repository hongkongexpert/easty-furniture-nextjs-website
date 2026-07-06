import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { sectors, trendingProducts } from "@/lib/data";
import { categoryLabel, localizedPath, t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const videoImages = [
  "/images/10_ada_training_table_scene.jpg",
  "/images/11_whiteboard_collaboration_scene.png",
  "/images/16_cafeteria_restaurant_scene.jpg",
  "/images/19_factory_equipment_biesse.jpg"
];

const videoLinks = [
  "https://www.youtube.com/watch?v=v6UfTpjRymE",
  "https://www.youtube.com/@furnitureeasty/videos",
  "https://www.youtube.com/@furnitureeasty/playlists",
  "https://www.youtube.com/@furnitureeasty/videos"
];

export default async function Home() {
  const locale = await getLocale();
  const dictionary = t(locale);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex h-[70vh] min-h-[480px] items-center overflow-hidden sm:h-[85vh] sm:min-h-[600px]">
        <Image src="/images/02_home_hero_office_workstation.png" alt="Commercial office furniture environment" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/60 sm:to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="mb-stack-md text-3xl font-bold leading-tight tracking-normal sm:text-5xl sm:leading-[56px]">{dictionary.home.heroTitle}</h1>
            <p className="mb-stack-lg text-sm leading-relaxed text-surface-variant sm:text-lg sm:leading-7">{dictionary.home.heroText}</p>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-stack-md">
              <Button asChild size="lg" className="w-full sm:w-auto"><Link href={localizedPath(locale, "/product-series")}>{dictionary.home.exploreProducts}</Link></Button>
              <Button asChild size="lg" variant="inverse" className="w-full sm:w-auto"><Link href={localizedPath(locale, "/about")}>{dictionary.home.companyProfile}</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-surface py-stack-lg">
        <div className="container">
          <SectionHeading eyebrow={dictionary.home.visualEyebrow} title={dictionary.home.visualTitle} />
          <div className="mt-stack-lg grid grid-cols-2 gap-3 sm:gap-gutter lg:grid-cols-4">
            {dictionary.home.videos.map(([title, text], index) => (
              <a href={videoLinks[index]} target="_blank" rel="noreferrer" aria-label={`Open ${title} on YouTube`} key={title}>
                <Card className="glass-card group h-full cursor-pointer p-stack-md shadow-industrial transition-all hover:-translate-x-0.5 hover:-translate-y-0.5">
                  <div className="relative mb-stack-md aspect-video overflow-hidden bg-surface-container">
                    <Image src={videoImages[index]} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20"><PlayCircle className="size-10 text-white sm:size-12" /></div>
                  </div>
                  <h3 className="mb-stack-sm text-[10px] font-bold uppercase tracking-wider sm:text-xs">{title}</h3>
                  <p className="hidden text-sm leading-5 text-muted-foreground sm:block">{text}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="bg-surface-container-lowest py-stack-lg">
        <div className="container">
          <div className="text-center">
            <SectionHeading eyebrow={dictionary.home.hotEyebrow} title={dictionary.home.hotTitle} className="mx-auto max-w-lg text-center [&>h2]:text-center [&>p]:text-center" />
          </div>
          <div className="mt-stack-lg grid grid-cols-2 gap-3 sm:gap-gutter lg:grid-cols-3">
            {trendingProducts.map((product) => <ProductCard product={product} locale={locale} key={product.id} />)}
          </div>
        </div>
      </section>

      {/* Specialized Sectors */}
      <section className="bg-surface py-stack-lg">
        <div className="container">
          <SectionHeading title={dictionary.home.sectorsTitle}>{dictionary.home.sectorsText}</SectionHeading>
          <div className="mt-stack-lg grid grid-cols-2 gap-3 sm:gap-gutter lg:grid-cols-4">
            {sectors.map((sector) => (
              <Link href={localizedPath(locale, "/product-series")} className="group relative min-h-[180px] overflow-hidden bg-black sm:min-h-[280px] lg:min-h-[340px]" key={sector.title}>
                <Image src={sector.image} alt={sector.title} fill className="object-cover opacity-75 transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-3 text-white sm:p-6">
                  <h3 className="text-base font-semibold sm:text-2xl">{categoryLabel(locale, sector.title)}</h3>
                  <p className="mt-1 hidden text-sm leading-5 text-white/80 sm:block">{sector.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand locale={locale} />
    </main>
  );
}
