import { Download, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { applications, categories } from "@/lib/data";
import { categoryLabel, localizedPath, t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getProducts } from "@/lib/woocommerce";

function categorySlug(category: string) {
  return category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default async function ProductSeriesPage({ searchParams }: { searchParams?: Promise<{ category?: string }> }) {
  const locale = await getLocale();
  const dictionary = t(locale);
  const params = await searchParams;
  const activeCategory = params?.category || "all-products";
  const productList = await getProducts(100, locale);
  const filteredProducts = activeCategory === "all-products" ? productList : productList.filter((product) => categorySlug(product.category) === activeCategory);

  const filterLinks = (
    <div className="space-y-stack-lg">
      <section>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{dictionary.productSeries.category}</h3>
        <ul className="space-y-1">
          {categories.map((category) => {
            const slug = categorySlug(category);
            const isActive = activeCategory === slug;
            return (
              <li key={category}>
                <Link
                  className={isActive ? "active-filter block w-full py-1.5 text-left text-sm font-semibold" : "block w-full py-1.5 text-left text-sm text-foreground hover:text-primary"}
                  href={localizedPath(locale, slug === "all-products" ? "/product-series" : `/product-series?category=${slug}`)}
                >
                  {categoryLabel(locale, category)}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      <section>
        <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">{dictionary.productSeries.application}</h3>
        <div className="flex flex-wrap gap-2">{applications.map((app) => <Badge key={app}>{app}</Badge>)}</div>
      </section>
      <Button variant="outline" className="w-full"><Download className="size-4" /> {dictionary.productSeries.download}</Button>
    </div>
  );

  const activeLabel = categoryLabel(locale, categories.find(c => categorySlug(c) === activeCategory) || "All Products");

  return (
    <main className="container py-stack-lg">
      <header className="mb-stack-lg">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <span>{dictionary.nav.home}</span><span>/</span><span className="text-primary">{dictionary.productSeries.crumb}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight sm:text-5xl sm:leading-[56px]">{dictionary.productSeries.title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{dictionary.productSeries.text}</p>
      </header>

      <div className="flex flex-col gap-gutter md:flex-row">
        {/* Desktop sidebar */}
        <aside className="hidden w-full shrink-0 md:block md:w-64">
          {filterLinks}
        </aside>

        <section className="flex-1 min-w-0">
          <div className="mb-6 flex items-center justify-between border-b border-[#e3e3e3] pb-4">
            <p className="text-sm text-muted-foreground">{filteredProducts.length} {dictionary.productSeries.count}</p>
            {/* Mobile filter trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <SlidersHorizontal className="size-4" />
                  {dictionary.productSeries.category}
                  <span className="ml-1 font-normal text-muted-foreground">— {activeLabel}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 overflow-y-auto">
                <div className="mb-6 text-sm font-bold uppercase tracking-widest">{dictionary.productSeries.category}</div>
                <div className="space-y-stack-lg">
                  <ul className="space-y-1">
                    {categories.map((category) => {
                      const slug = categorySlug(category);
                      const isActive = activeCategory === slug;
                      return (
                        <li key={category}>
                          <SheetClose asChild>
                            <Link
                              className={isActive ? "active-filter block w-full py-2 text-left text-sm font-semibold" : "block w-full py-2 text-left text-sm text-foreground hover:text-primary transition-colors"}
                              href={localizedPath(locale, slug === "all-products" ? "/product-series" : `/product-series?category=${slug}`)}
                            >
                              {categoryLabel(locale, category)}
                            </Link>
                          </SheetClose>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-border pt-4">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{dictionary.productSeries.application}</h3>
                    <div className="flex flex-wrap gap-2">{applications.map((app) => <Badge key={app}>{app}</Badge>)}</div>
                  </div>
                  <Button variant="outline" className="w-full"><Download className="size-4" /> {dictionary.productSeries.download}</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-gutter xl:grid-cols-3">
            {filteredProducts.map((product) => <ProductCard product={product} locale={locale} key={product.id} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
