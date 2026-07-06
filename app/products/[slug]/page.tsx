import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, PackageCheck } from "lucide-react";
import { CtaBand } from "@/components/cta-band";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryLabel, localizedPath, t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { getProduct, getProducts } from "@/lib/woocommerce";
import { products as staticProducts } from "@/lib/data";

export async function generateStaticParams() {
  return staticProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const locale = await getLocale();
  const dictionary = t(locale);
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const relatedProducts = (await getProducts(100)).filter((item) => item.slug !== product.slug).slice(0, 4);
  const gallery = product.gallery.length ? product.gallery : [product.image];

  return (
    <main>
      <div className="container">
        <div className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <Link href={localizedPath(locale, "/")}>{dictionary.nav.home}</Link>
          <span>/</span>
          <Link href={localizedPath(locale, "/product-series")}>{dictionary.productDetail.productSeries}</Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </div>

        <section className="mb-20 grid grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ProductGallery images={gallery} productName={product.name} />
          </div>

          <aside className="lg:col-span-5">
            <Badge>{categoryLabel(locale, product.category)}</Badge>
            <h1 className="mt-2 text-[32px] font-bold leading-10">{product.name === "Office Workstation" ? "Office Workstation Series" : product.name}</h1>
            {product.shortDescription ? (
              <div className="mt-4 text-base leading-6 text-muted-foreground [&_a]:text-primary [&_li]:mb-1 [&_ul]:list-disc [&_ul]:pl-5" dangerouslySetInnerHTML={{ __html: product.shortDescription }} />
            ) : product.summary ? (
              <p className="mt-4 text-base leading-6 text-muted-foreground">{product.summary}</p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={localizedPath(locale, "/contact")}>{dictionary.productDetail.request}</Link>
              </Button>
              <Button variant="outline">
                <Download className="size-4" /> {dictionary.productDetail.download}
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded border border-border bg-surface-container-low p-4 text-sm">
              <PackageCheck className="size-5 text-secondary" /> {dictionary.productDetail.procurement}
            </div>
          </aside>
        </section>

        {product.description ? (
          <section className="border-t border-border py-20">
            <h2 className="mb-stack-lg text-[32px] font-bold leading-10">Product Description</h2>
            <div className="max-w-4xl text-base leading-7 text-muted-foreground [&_a]:text-primary [&_h1]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:p-3 [&_th]:border [&_th]:border-border [&_th]:p-3 [&_ul]:list-disc [&_ul]:pl-6" dangerouslySetInnerHTML={{ __html: product.description }} />
          </section>
        ) : null}

        <section className="border-t border-border py-20">
          <h2 className="mb-stack-lg text-[32px] font-bold leading-10">{dictionary.productDetail.related}</h2>
          <div className="grid gap-gutter md:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard product={item} locale={locale} square key={item.id} />
            ))}
          </div>
        </section>
      </div>
      <CtaBand locale={locale} />
    </main>
  );
}
